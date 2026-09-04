export type ContactEntry = {
  name: string;
  role: string;
  email: string;
};

/** Single source of truth for the direct contact cards shown across the site. */
export const CONTACTS: ContactEntry[] = [
  { name: "Sales Enquiry", role: "Sales & Quotations", email: "enquiry@rationalengineers.com" },
  { name: "Career", role: "JOB OPPORTUNITY", email: "hr@rationalengineers.com" },
  { name: "Information Desk", role: "Product Information", email: "info@rationalengineers.com" },
];

export const CONTACT_PHONE = "+91 91686 43114";
export const CONTACT_PHONE_HREF = "tel:+919168643114";
