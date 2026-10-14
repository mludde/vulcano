"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm({
  defaultSubject = "",
}: {
  defaultSubject?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, subject: defaultSubject, message }),
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
    }
  }

  if (status === "sent") {
    return (
      <div className="rounded-sm border border-border bg-surface-2 p-6 text-sm">
        Richiesta inviata, grazie!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-[0.9792rem] font-semibold text-muted">
          Nome e cognome
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-2xl border border-border bg-background px-5 py-3.5 text-[1.1042rem] font-normal text-foreground outline-none transition focus:border-accent focus:bg-surface"
          />
        </label>
        <label className="flex flex-col gap-2 text-[0.9792rem] font-semibold text-muted">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-2xl border border-border bg-background px-5 py-3.5 text-[1.1042rem] font-normal text-foreground outline-none transition focus:border-accent focus:bg-surface"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-[0.9792rem] font-semibold text-muted">
        Telefono (facoltativo)
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="rounded-2xl border border-border bg-background px-5 py-3.5 text-[1.1042rem] font-normal text-foreground outline-none transition focus:border-accent focus:bg-surface"
        />
      </label>
      <label className="flex flex-col gap-2 text-[0.9792rem] font-semibold text-muted">
        Oggetto
        <input
          readOnly
          value={defaultSubject}
          className="cursor-not-allowed rounded-2xl border border-border bg-surface-2 px-5 py-3.5 text-[1.1042rem] font-normal text-foreground outline-none"
        />
      </label>
      <label className="flex flex-col gap-2 text-[0.9792rem] font-semibold text-muted">
        Messaggio
        <textarea
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="resize-none rounded-2xl border border-border bg-background px-5 py-3.5 text-[1.1042rem] font-normal text-foreground outline-none transition focus:border-accent focus:bg-surface"
        />
      </label>
      {status === "error" && (
        <p className="text-sm text-accent">{errorMessage}</p>
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
