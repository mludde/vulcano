import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { checkBot, clean } from "@/lib/bot-check";
import { MAIL_FROM, mailRecipient, resend } from "@/lib/mail";
import { siteConfig } from "@/lib/site-config";
import { writeClient } from "@/sanity/lib/write-client";

const LIMITS = { name: 80, text: 1200 };
const MIN_TEXT = 10;

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
  const text = clean(body.text, LIMITS.text);
  const rating = Number(body.rating);

  if (!name || text.length < MIN_TEXT) {
    return NextResponse.json(
      { ok: false, error: "Inserisci il tuo nome e scrivi almeno qualche parola di recensione." },
      { status: 400 },
    );
  }
  if (!Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json(
      { ok: false, error: "Scegli una valutazione da 1 a 5 stelle." },
      { status: 400 },
    );
  }

  if (!process.env.SANITY_API_WRITE_TOKEN) {
    console.error("SANITY_API_WRITE_TOKEN is not set: cannot save reviews.");
    return NextResponse.json(
      { ok: false, error: "Al momento non è possibile inviare recensioni. Riprova più tardi." },
      { status: 503 },
    );
  }

  const id = randomUUID();

  try {
    // The "drafts." prefix saves it as an unpublished draft: it stays hidden
    // from the site until Valentina reviews it and presses Publish in the Studio.
    await writeClient.create({
      _id: `drafts.${id}`,
      _type: "review",
      authorName: name,
      rating,
      text,
      date: new Date().toISOString().slice(0, 10),
      featured: false,
    });
  } catch (error) {
    console.error("Could not save the review draft:", error);
    return NextResponse.json(
      { ok: false, error: "Invio non riuscito. Riprova più tardi." },
      { status: 502 },
    );
  }

  const studioLink = `${siteConfig.studioUrl}/intent/edit/id=${id};type=review/`;
  const { error: mailError } = await resend.emails.send({
    from: MAIL_FROM,
    to: mailRecipient(),
    subject: "Nuova recensione da pubblicare",
    text: [
      "Ciao Valentina,",
      "",
      "è arrivata una nuova recensione sul tuo sito. L'ho salvata come bozza: per ora non è visibile a nessuno.",
      "",
      `Da: ${name}`,
      `Valutazione: ${rating}/5`,
      "",
      `«${text}»`,
      "",
      "Per leggerla e pubblicarla apri il link qui sotto ed esegui Publish:",
      studioLink,
      "",
      "Se non vuoi pubblicarla, puoi ignorarla o eliminarla dallo Studio.",
    ].join("\n"),
  });

  if (mailError) {
    // The draft is saved, so don't fail the visitor's submission.
    console.error("Could not send the new-review notification:", mailError);
  }

  return NextResponse.json({ ok: true });
}
