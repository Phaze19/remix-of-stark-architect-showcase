import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { Loader2, Search, CheckCircle2, Clock, FileText, PackageCheck, XCircle } from "lucide-react";
import Navigation from "@/components/Navigation";
import PageTopSpacer from "@/components/PageTopSpacer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { normalizeQuoteReference } from "@/lib/quoteReference";

interface QuoteStatusRow {
  reference: string;
  status: string;
  status_note: string | null;
  product_title: string | null;
  quantity: string | null;
  created_at: string;
  updated_at: string;
}

const STAGES = [
  { key: "received", label: "Received", icon: FileText, blurb: "Your enquiry has reached our sales desk." },
  { key: "in_review", label: "Under Review", icon: Clock, blurb: "Our technical team is validating specifications." },
  { key: "quoted", label: "Quote Sent", icon: CheckCircle2, blurb: "Pricing and lead times have been shared by email." },
  { key: "closed", label: "Closed", icon: PackageCheck, blurb: "This request has been completed." },
];

const stageIndex = (status: string) => {
  const i = STAGES.findIndex((s) => s.key === status);
  return i === -1 ? 0 : i;
};

const formatDate = (value: string) =>
  new Date(value).toLocaleString(undefined, {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

const QuoteStatus = () => {
  const [params] = useSearchParams();
  const [reference, setReference] = useState(params.get("ref") ?? "");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<QuoteStatusRow | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLookup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    setNotFound(false);
    setError(null);

    const { data, error: rpcError } = await supabase.rpc("get_quote_status", {
      _reference: normalizeQuoteReference(reference),
      _email: email.trim(),
    });

    setLoading(false);

    if (rpcError) {
      setError("We could not check your request right now. Please try again shortly.");
      return;
    }

    const row = (data as QuoteStatusRow[] | null)?.[0];
    if (!row) {
      setNotFound(true);
      return;
    }
    setResult(row);
  };

  const activeIndex = result ? stageIndex(result.status) : 0;
  const isCancelled = result?.status === "cancelled";

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageTopSpacer />

      <section className="py-16 md:py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl mx-auto">
            <p className="text-minimal text-muted-foreground mb-4 tracking-widest">QUOTE TRACKING</p>
            <h1 className="text-4xl md:text-5xl font-light text-foreground mb-4">
              Track your quote request
            </h1>
            <p className="text-muted-foreground mb-10 max-w-xl">
              Enter the reference code from your submission confirmation along with the email
              address you used. Only you can view your request.
            </p>

            <form
              onSubmit={handleLookup}
              className="bg-muted rounded-lg p-6 md:p-8 grid md:grid-cols-[1fr_1fr_auto] gap-4 items-end"
            >
              <div className="space-y-2">
                <Label htmlFor="reference">Reference code *</Label>
                <Input
                  id="reference"
                  placeholder="REL-2609-A1B2C3"
                  value={reference}
                  onChange={(e) => setReference(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email used *</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" className="h-10 md:h-10" disabled={loading}>
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Search className="h-4 w-4" />
                )}
                <span className="ml-2">Track</span>
              </Button>
            </form>

            {error && (
              <p className="mt-6 text-sm text-destructive">{error}</p>
            )}

            {notFound && (
              <div className="mt-8 border border-dashed border-border rounded-lg p-6">
                <p className="font-medium mb-1">No request found</p>
                <p className="text-sm text-muted-foreground">
                  Check the reference code and make sure the email matches the one used on the
                  form. Still stuck?{" "}
                  <a className="underline" href="mailto:info@rationalengineers.com">
                    Email our team
                  </a>
                  .
                </p>
              </div>
            )}

            {result && (
              <div className="mt-10 border border-border rounded-lg overflow-hidden">
                <div className="p-6 md:p-8 border-b border-border">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <div>
                      <p className="text-minimal text-muted-foreground mb-1">REFERENCE</p>
                      <p className="text-2xl font-medium tracking-wide">{result.reference}</p>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Submitted {formatDate(result.created_at)}
                    </p>
                  </div>

                  <dl className="mt-6 grid sm:grid-cols-2 gap-6 text-sm">
                    <div>
                      <dt className="text-muted-foreground mb-1">Product</dt>
                      <dd className="font-medium">{result.product_title ?? "—"}</dd>
                    </div>
                    <div>
                      <dt className="text-muted-foreground mb-1">Quantity</dt>
                      <dd className="font-medium">{result.quantity ?? "—"}</dd>
                    </div>
                  </dl>
                </div>

                <div className="p-6 md:p-8">
                  {isCancelled ? (
                    <div className="flex items-start gap-3">
                      <XCircle className="h-5 w-5 text-destructive mt-0.5" />
                      <div>
                        <p className="font-medium">Request cancelled</p>
                        <p className="text-sm text-muted-foreground">
                          {result.status_note ?? "This request is no longer active."}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <ol className="space-y-6">
                      {STAGES.map((stage, i) => {
                        const Icon = stage.icon;
                        const done = i <= activeIndex;
                        const current = i === activeIndex;
                        return (
                          <li key={stage.key} className="flex items-start gap-4">
                            <span
                              className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border ${
                                done
                                  ? "bg-primary text-primary-foreground border-primary"
                                  : "border-border text-muted-foreground"
                              }`}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <div>
                              <p className={`font-medium ${done ? "" : "text-muted-foreground"}`}>
                                {stage.label}
                                {current && (
                                  <span className="ml-3 text-xs uppercase tracking-widest text-primary">
                                    Current
                                  </span>
                                )}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {current && result.status_note ? result.status_note : stage.blurb}
                              </p>
                            </div>
                          </li>
                        );
                      })}
                    </ol>
                  )}

                  <p className="mt-8 text-xs text-muted-foreground">
                    Last updated {formatDate(result.updated_at)}
                  </p>
                </div>
              </div>
            )}

            <p className="mt-12 text-sm text-muted-foreground">
              Need to raise a new enquiry?{" "}
              <Link to="/contact" className="underline">
                Request a quote
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default QuoteStatus;
