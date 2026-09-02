import { useEffect, useMemo, useState } from "react";
import { z } from "zod";
import { Loader2, Send } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { generateQuoteReference } from "@/lib/quoteReference";

export interface QuoteSpec {
  label: string;
  value: string;
}

interface QuoteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productTitle?: string;
  specifications?: QuoteSpec[];
}

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  company: z.string().trim().max(150, "Company must be under 150 characters"),
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .email("Enter a valid email address")
    .max(255, "Email must be under 255 characters"),
  phone: z.string().trim().max(40, "Phone must be under 40 characters"),
  quantity: z.string().trim().max(100, "Quantity must be under 100 characters"),
  message: z
    .string()
    .trim()
    .min(1, "Message is required")
    .max(2000, "Message must be under 2000 characters"),
});

type FieldErrors = Partial<Record<keyof z.infer<typeof quoteSchema>, string>>;

const buildSpecSummary = (specs: QuoteSpec[]) =>
  specs.map((s) => `• ${s.label}: ${s.value}`).join("\n");

const QuoteDialog = ({
  open,
  onOpenChange,
  productTitle,
  specifications = [],
}: QuoteDialogProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    quantity: "",
    message: "",
  });

  const keySpecs = useMemo(() => specifications.slice(0, 6), [specifications]);

  const prefilledMessage = useMemo(() => {
    if (!productTitle) {
      return "Please share pricing, lead time and MOQ for the products I am interested in.";
    }
    const specBlock = keySpecs.length
      ? `\n\nKey specifications:\n${buildSpecSummary(keySpecs)}`
      : "";
    return `I would like a quotation for ${productTitle}.${specBlock}\n\nPlease share pricing, lead time and minimum order quantity.`;
  }, [productTitle, keySpecs]);

  // Re-prefill whenever the dialog is opened for a (new) product
  useEffect(() => {
    if (open) {
      setErrors({});
      setForm((prev) => ({ ...prev, message: prefilledMessage }));
    }
  }, [open, prefilledMessage]);

  const setField = (key: keyof typeof form) => (value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = quoteSchema.safeParse(form);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0] as keyof FieldErrors;
        if (key && !next[key]) next[key] = issue.message;
      }
      setErrors(next);
      return;
    }

    setSubmitting(true);
    const reference = generateQuoteReference();
    const { error } = await supabase.from("quote_requests").insert({
      reference,
      name: parsed.data.name,
      company: parsed.data.company || null,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      quantity: parsed.data.quantity || null,
      product_title: productTitle ?? null,
      product_specs: keySpecs.length ? buildSpecSummary(keySpecs) : null,
      message: parsed.data.message,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Could not send your request",
        description: "Please try again, or email us directly.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Quote request sent",
      description: `Reference ${reference} — track it any time at /quote-status.`,
    });

    setForm({ name: "", company: "", email: "", phone: "", quantity: "", message: "" });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl font-bold uppercase tracking-tight">
            Request a quote
          </DialogTitle>
          <DialogDescription>
            {productTitle
              ? `Your enquiry is pre-filled for ${productTitle}. Edit anything before sending.`
              : "Tell us what you need and our team will respond within one business day."}
          </DialogDescription>
        </DialogHeader>

        {productTitle && (
          <div className="border-l-2 border-rational-red bg-muted p-4">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Selected product
            </p>
            <p className="mt-1 text-sm font-medium text-foreground">{productTitle}</p>
            {keySpecs.length > 0 && (
              <dl className="mt-3 grid gap-x-6 gap-y-1 sm:grid-cols-2">
                {keySpecs.map((spec) => (
                  <div key={spec.label} className="flex justify-between gap-3 text-xs">
                    <dt className="text-muted-foreground">{spec.label}</dt>
                    <dd className="text-right font-medium text-foreground">{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="quote-name">Name *</Label>
              <Input
                id="quote-name"
                value={form.name}
                maxLength={100}
                onChange={(e) => setField("name")(e.target.value)}
              />
              {errors.name && <p className="text-xs text-rational-red">{errors.name}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-company">Company</Label>
              <Input
                id="quote-company"
                value={form.company}
                maxLength={150}
                onChange={(e) => setField("company")(e.target.value)}
              />
              {errors.company && <p className="text-xs text-rational-red">{errors.company}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-email">Email *</Label>
              <Input
                id="quote-email"
                type="email"
                value={form.email}
                maxLength={255}
                onChange={(e) => setField("email")(e.target.value)}
              />
              {errors.email && <p className="text-xs text-rational-red">{errors.email}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="quote-phone">Phone</Label>
              <Input
                id="quote-phone"
                value={form.phone}
                maxLength={40}
                onChange={(e) => setField("phone")(e.target.value)}
              />
              {errors.phone && <p className="text-xs text-rational-red">{errors.phone}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-quantity">Required quantity</Label>
            <Input
              id="quote-quantity"
              placeholder="e.g. 5 MT per month"
              value={form.quantity}
              maxLength={100}
              onChange={(e) => setField("quantity")(e.target.value)}
            />
            {errors.quantity && <p className="text-xs text-rational-red">{errors.quantity}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="quote-message">Message *</Label>
            <Textarea
              id="quote-message"
              rows={8}
              value={form.message}
              maxLength={2000}
              onChange={(e) => setField("message")(e.target.value)}
            />
            {errors.message && <p className="text-xs text-rational-red">{errors.message}</p>}
          </div>

          <Button
            type="submit"
            disabled={submitting}
            className="w-full bg-rational-red text-white hover:bg-foreground"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" /> Send request
              </>
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
