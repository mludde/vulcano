import { NextResponse } from "next/server";
import { Resend } from "resend";
import { siteConfig } from "@/lib/site-config";

const resend = new Resend(process.env.RESEND_API_KEY);

// Until a verified sending domain is set up in Resend, mail must be sent
// from this shared testing address (any real "from" address will be
// rejected by Resend for an unverified domain).
const FROM = "Vulcano Immobiliare <onboarding@resend.dev>";

export async function POST(request: Request) {
  const body = await request.json();
  const { name, email, phone, message } = body as Record<string, string>;

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Nome, email e messaggio sono obbligatori." },
      { status: 400 },
    );
  }

  const to = process.env.CONTACT_EMAIL_TO || siteConfig.email;

  const { error } = await resend.emails.send({
    from: FROM,
    to,
    replyTo: email,
    subject: `Richiesta dal sito da ${name}`,
    text: [
      `Nome: ${name}`,
      `Email: ${email}`,
      phone ? `Telefono: ${phone}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  if (error) {
    return NextResponse.json(
      { ok: false, error: "Invio non riuscito. Riprova più tardi." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
