import { NextResponse } from "next/server";
import { checkBot, clean } from "@/lib/bot-check";
import { MAIL_FROM, mailRecipient, resend } from "@/lib/mail";

const LIMITS = { name: 120, email: 200, phone: 40, subject: 200, message: 5000 };

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Richiesta non valida." }, { status: 400 });
  }

  const verdict = await checkBot(body, request);
  if (!verdict.pass) {
    return verdict.silent
      ? NextResponse.json({ ok: true })
      : NextResponse.json({ ok: false, error: verdict.error }, { status: verdict.status });
  }

  const name = clean(body.name, LIMITS.name);
  const email = clean(body.email, LIMITS.email);
  const phone = clean(body.phone, LIMITS.phone);
  const subject = clean(body.subject, LIMITS.subject).replace(/[\r\n]+/g, " ");
  const message = clean(body.message, LIMITS.message);

  if (!name || !email || !phone || !message) {
    return NextResponse.json(
      { ok: false, error: "Nome, email, telefono e messaggio sono obbligatori." },
      { status: 400 },
    );
  }

  const { error } = await resend.emails.send({
    from: MAIL_FROM,
    to: mailRecipient(),
    replyTo: email,
    subject: subject || `Richiesta dal sito da ${name}`,
    text: [`Nome: ${name}`, `Email: ${email}`, `Telefono: ${phone}`, "", message].join("\n"),
  });

  if (error) {
    // Visible in the Vercel function logs (e.g. unverified sending domain).
    console.error("Resend could not send the contact email:", error);
    return NextResponse.json(
      { ok: false, error: "Invio non riuscito. Riprova più tardi." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
