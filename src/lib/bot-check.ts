import { verifyTurnstile } from "@/lib/turnstile";

const MIN_FILL_MS = 2500;

type Guard = { website?: unknown; startedAt?: unknown; turnstileToken?: unknown };

export type BotVerdict =
  | { pass: true }
  | { pass: false; silent: true }
  | { pass: false; silent: false; status: number; error: string };

export async function checkBot(body: Guard, request: Request): Promise<BotVerdict> {
  // Honeypot: real visitors never see or fill this field. Pretend success.
  if (typeof body.website === "string" && body.website.length > 0) {
    return { pass: false, silent: true };
  }

  // Humans need more than a couple of seconds to fill a form.
  if (typeof body.startedAt !== "number" || Date.now() - body.startedAt < MIN_FILL_MS) {
    return {
      pass: false,
      silent: false,
      status: 400,
      error: "Hai inviato troppo in fretta, riprova tra un attimo.",
    };
  }

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const token = typeof body.turnstileToken === "string" ? body.turnstileToken : undefined;
  if (!(await verifyTurnstile(token, ip))) {
    return {
      pass: false,
      silent: false,
      status: 400,
      error: "Verifica di sicurezza non riuscita. Ricarica la pagina e riprova.",
    };
  }

  return { pass: true };
}

export function clean(value: unknown, max: number) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}
