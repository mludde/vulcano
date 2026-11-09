import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

export const resend = new Resend(process.env.RESEND_API_KEY);

// Until a verified sending domain is set up in Resend, mail must be sent
// from the shared testing address below (any real "from" address is rejected
// by Resend for an unverified domain). Once the domain is verified, set
// MAIL_FROM on Vercel, e.g. "Valentina Vulcano <info@vulcanovalentina.it>".
export const MAIL_FROM =
  process.env.MAIL_FROM || "Valentina Vulcano <onboarding@resend.dev>";

export function mailRecipient() {
  return process.env.CONTACT_EMAIL_TO || siteConfig.email;
}
