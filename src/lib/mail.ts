import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Until a verified sending domain is set up in Resend, mail must be sent
// from this shared testing address (any real "from" address will be
// rejected by Resend for an unverified domain).
export const MAIL_FROM = "Valentina Vulcano <onboarding@resend.dev>";

export function mailRecipient() {
  return process.env.CONTACT_EMAIL_TO || siteConfig.email;
}
