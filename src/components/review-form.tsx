"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useTurnstile } from "@/lib/use-turnstile";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "rounded-2xl border border-border bg-background px-5 py-3.5 text-[1.1042rem] font-normal text-foreground outline-none transition focus:border-accent focus:bg-surface";
const labelClass = "flex flex-col gap-2 text-[0.9792rem] font-semibold text-muted";

export function ReviewForm() {
  const [name, setName] = useState("");
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [text, setText] = useState("");
  const [website, setWebsite] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const startedAt = useRef(0);
  const turnstile = useTurnstile();

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");

    if (rating < 1) {
      setStatus("error");
      setErrorMessage("Scegli una valutazione da 1 a 5 stelle.");
      return;
    }

    setStatus("sending");

    try {
      let turnstileToken: string | null = null;
      if (turnstile.enabled) {
        turnstileToken = await turnstile.waitForToken();
        if (!turnstileToken) {
          throw new Error("Verifica di sicurezza non riuscita. Ricarica la pagina e riprova.");
        }
      }

      const response = await fetch("/api/review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          rating,
          text,
          consent,
          website,
          startedAt: startedAt.current,
          turnstileToken,
        }),
      });
      const data = await response.json();

      if (!response.ok || !data.ok) {
        throw new Error(data.error || "Invio non riuscito.");
      }

      setStatus("sent");
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Invio non riuscito.");
    } finally {
      turnstile.reset();
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-surface-2 p-6 text-[1.1042rem] leading-7">
        Grazie! La tua recensione è stata inviata: la leggerò e la pubblicherò sul sito a breve.
      </div>
    );
  }

  const shown = hover || rating;

  return (
    <form onSubmit={handleSubmit} onFocus={turnstile.ensureWidget} className="flex flex-col gap-5">
      <label className={labelClass}>
        Nome e cognome
        <input
          required
          maxLength={80}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={fieldClass}
        />
      </label>

      <div className={labelClass}>
        <span id="rating-label">Valutazione</span>
        <div
          role="radiogroup"
          aria-labelledby="rating-label"
          className="flex gap-1"
          onMouseLeave={() => setHover(0)}
        >
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={rating === value}
              aria-label={`${value} ${value === 1 ? "stella" : "stelle"}`}
              onClick={() => setRating(value)}
              onMouseEnter={() => setHover(value)}
              className="rounded-md p-1 transition hover:scale-110"
            >
              <svg
                viewBox="0 0 20 20"
                className={`h-9 w-9 transition ${value <= shown ? "fill-pink" : "fill-border"}`}
              >
                <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6z" />
              </svg>
            </button>
          ))}
        </div>
      </div>

      <label className={labelClass}>
        La tua recensione
        <textarea
          required
          rows={5}
          minLength={10}
          maxLength={1200}
          value={text}
          onChange={(event) => setText(event.target.value)}
          className={`resize-none ${fieldClass}`}
        />
      </label>

      <label className="flex items-start gap-3 text-sm leading-6 text-muted">
        <input
          required
          type="checkbox"
          checked={consent}
          onChange={(event) => setConsent(event.target.checked)}
          className="mt-1 h-4 w-4 shrink-0 accent-[#d9a2a7]"
        />
        <span>
          Acconsento alla pubblicazione sul sito della mia recensione con il
          nome indicato e confermo di aver letto l&apos;
          <Link
            href="/privacy"
            target="_blank"
            className="text-foreground underline decoration-accent decoration-2 underline-offset-4"
          >
            informativa privacy
          </Link>
          . Posso chiederne la rimozione in qualsiasi momento.
        </span>
      </label>

      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Sito web
          <input
            tabIndex={-1}
            autoComplete="off"
            name="website"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
          />
        </label>
      </div>

      <div ref={turnstile.boxRef} className="empty:hidden" />

      {status === "error" && <p className="text-sm text-[#b3472f]">{errorMessage}</p>}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary self-start disabled:opacity-60"
      >
        {status === "sending" ? "Invio in corso…" : "Invia la recensione"}
      </button>
    </form>
  );
}
