"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { useTurnstile } from "@/lib/use-turnstile";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "rounded-2xl border border-border bg-background px-5 py-3.5 text-[1.1042rem] font-normal text-foreground outline-none transition focus:border-accent focus:bg-surface";
const labelClass = "flex flex-col gap-2 text-[0.9792rem] font-semibold text-muted";

export function ContactForm({
  defaultSubject = "",
}: {
  defaultSubject?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const startedAt = useRef(0);
  const turnstile = useTurnstile();

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      let turnstileToken: string | null = null;
      if (turnstile.enabled) {
        turnstileToken = await turnstile.waitForToken();
        if (!turnstileToken) {
          throw new Error("Verifica di sicurezza non riuscita. Ricarica la pagina e riprova.");
        }
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          subject: defaultSubject,
          message,
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
      setName("");
      setEmail("");
      setPhone("");
      setMessage("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Invio non riuscito.",
      );
    } finally {
      turnstile.reset();
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-2xl border border-border bg-surface-2 p-6 text-sm">
        Richiesta inviata, grazie!
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      onFocus={turnstile.ensureWidget}
      className="flex flex-col gap-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className={labelClass}>
          Nome e cognome
          <input
            required
            maxLength={120}
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClass}
          />
        </label>
        <label className={labelClass}>
          Email
          <input
            required
            type="email"
            maxLength={200}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClass}
          />
        </label>
      </div>
      <label className={labelClass}>
        Telefono
        <input
          required
          type="tel"
          maxLength={40}
          minLength={6}
          autoComplete="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className={fieldClass}
        />
      </label>
      <label className={labelClass}>
        Oggetto
        <input
          readOnly
          value={defaultSubject}
          className="cursor-not-allowed rounded-2xl border border-border bg-surface-2 px-5 py-3.5 text-[1.1042rem] font-normal text-foreground outline-none"
        />
      </label>
      <label className={labelClass}>
        Messaggio
        <textarea
          required
          rows={5}
          maxLength={5000}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className={`resize-none ${fieldClass}`}
        />
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

      <p className="text-sm leading-6 text-muted">
        Inviando la richiesta confermi di aver letto l&apos;
        <Link
          href="/privacy"
          target="_blank"
          className="text-foreground underline decoration-accent decoration-2 underline-offset-4"
        >
          informativa privacy
        </Link>
        . Userò i tuoi dati solo per rispondere alla tua richiesta.
      </p>

      {status === "error" && (
        <p className="text-sm text-[#b3472f]">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-primary self-start disabled:opacity-60"
      >
        {status === "sending" ? "Invio in corso…" : "Invia richiesta"}
      </button>
    </form>
  );
}
