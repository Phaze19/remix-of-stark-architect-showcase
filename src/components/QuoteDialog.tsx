import { Mail, Phone, ArrowRight, Copy, Check } from "lucide-react";
import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { CONTACTS } from "@/data/contacts";

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

type Contact = {
  name: string;
  role: string;
  email: string;
};



const QuoteDialog = ({ open, onOpenChange, productTitle, specifications = [] }: QuoteDialogProps) => {
  const { toast } = useToast();
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!open) setCopied(null);
  }, [open]);

  const keySpecs = specifications.slice(0, 6);

  const copyEmail = async (email: string) => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(email);
      toast({ title: "Email address copied", description: email });
      setTimeout(() => setCopied((c) => (c === email ? null : c)), 2000);
    } catch {
      toast({ title: "Could not copy", description: "Please copy the address manually.", variant: "destructive" });
    }
  };

  const mailtoFor = (contact: Contact) => {
    const subject = productTitle
      ? `Quotation request — ${productTitle}`
      : "Quotation request — RATIONAL ENGINEERS LIMITED";
    const body = productTitle
      ? `Dear ${contact.name},%0D%0A%0D%0AI would like a quotation for ${productTitle}.%0D%0A%0D%0APlease share pricing, lead time and minimum order quantity.%0D%0A%0D%0ARegards,%0D%0A`
      : `Dear ${contact.name},%0D%0A%0D%0AI would like a quotation for your copper conductor products.%0D%0A%0D%0ARegards,%0D%0A`;
    return `mailto:${contact.email}?subject=${encodeURIComponent(subject)}&body=${body}`;
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
              ? `Reach out to our team about ${productTitle}. Your email client will open with the product details pre-filled.`
              : "Reach out to our team directly — pick the contact that fits your enquiry best."}
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

        <div className="space-y-3">
          {CONTACTS.map((contact) => (
            <div
              key={contact.email}
              className="flex flex-col gap-3 border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-foreground">{contact.name}</p>
                <p className="text-[11px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                  {contact.role}
                </p>
                <a
                  href={`mailto:${contact.email}`}
                  className="mt-1 inline-flex items-center gap-2 text-sm text-foreground/80 transition-colors hover:text-rational-red"
                >
                  <Mail className="h-3.5 w-3.5 shrink-0" />
                  <span className="truncate">{contact.email}</span>
                </a>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => copyEmail(contact.email)}
                  className="rounded-none"
                >
                  {copied === contact.email ? (
                    <>
                      <Check className="mr-1.5 h-3.5 w-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="mr-1.5 h-3.5 w-3.5" /> Copy
                    </>
                  )}
                </Button>
                <a href={mailtoFor(contact)} className="inline-flex">
                  <Button
                    type="button"
                    size="sm"
                    className="rounded-none bg-rational-red text-white hover:bg-foreground"
                  >
                    Email
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-2 flex items-center gap-3 border-t border-border pt-4 text-sm text-muted-foreground">
          <Phone className="h-4 w-4 shrink-0 text-rational-red" />
          <span>Prefer to call? Reach us at </span>
          <a href="tel:+919168643114" className="font-medium text-foreground hover:text-rational-red">
            +91 91686 43114
          </a>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default QuoteDialog;
