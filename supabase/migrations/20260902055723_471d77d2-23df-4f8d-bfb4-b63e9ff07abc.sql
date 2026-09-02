ALTER TABLE public.quote_requests
  ADD COLUMN IF NOT EXISTS reference text,
  ADD COLUMN IF NOT EXISTS status text NOT NULL DEFAULT 'received',
  ADD COLUMN IF NOT EXISTS status_note text,
  ADD COLUMN IF NOT EXISTS updated_at timestamptz NOT NULL DEFAULT now();

CREATE OR REPLACE FUNCTION public.generate_quote_reference()
RETURNS text
LANGUAGE sql
VOLATILE
AS $$
  SELECT 'REL-' || to_char(now(), 'YYMM') || '-' || upper(substr(replace(gen_random_uuid()::text, '-', ''), 1, 6));
$$;

UPDATE public.quote_requests SET reference = public.generate_quote_reference() WHERE reference IS NULL;

ALTER TABLE public.quote_requests ALTER COLUMN reference SET DEFAULT public.generate_quote_reference();
ALTER TABLE public.quote_requests ALTER COLUMN reference SET NOT NULL;

CREATE UNIQUE INDEX IF NOT EXISTS quote_requests_reference_key ON public.quote_requests (reference);

CREATE OR REPLACE FUNCTION public.touch_quote_requests_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS quote_requests_touch_updated_at ON public.quote_requests;
CREATE TRIGGER quote_requests_touch_updated_at
BEFORE UPDATE ON public.quote_requests
FOR EACH ROW EXECUTE FUNCTION public.touch_quote_requests_updated_at();

-- Public lookup: requires BOTH reference and matching email, returns only status fields.
CREATE OR REPLACE FUNCTION public.get_quote_status(_reference text, _email text)
RETURNS TABLE (
  reference text,
  status text,
  status_note text,
  product_title text,
  quantity text,
  created_at timestamptz,
  updated_at timestamptz
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT q.reference, q.status, q.status_note, q.product_title, q.quantity, q.created_at, q.updated_at
  FROM public.quote_requests q
  WHERE upper(trim(q.reference)) = upper(trim(_reference))
    AND lower(trim(q.email)) = lower(trim(_email))
  LIMIT 1;
$$;

REVOKE ALL ON FUNCTION public.get_quote_status(text, text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.get_quote_status(text, text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.generate_quote_reference() TO anon, authenticated, service_role;