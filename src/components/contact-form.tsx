"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
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
        body: JSON.stringify({ name, email, phone, message }),
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
        Richiesta inviata, grazie! Ti risponderò entro un giorno lavorativo.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Nome e cognome
          <input
            required
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="rounded-sm border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-accent"
          />
        </label>
        <label className="flex flex-col gap-1.5 text-sm font-medium">
          Email
          <input
            required
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="rounded-sm border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-accent"
          />
        </label>
      </div>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Telefono (facoltativo)
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          className="rounded-sm border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-accent"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium">
        Messaggio
        <textarea
          required
          rows={5}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          className="resize-none rounded-sm border border-border bg-surface px-4 py-2.5 text-foreground outline-none focus:border-accent"
        />
      </label>
      {status === "error" && (
        <p className="text-sm text-accent">{errorMessage}</p>
      )}
      <button
        type="submit"
        disabled={status === "sending"}
        className="self-start rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90 disabled:opacity-60"
      >
        {status === "sending" ? "Invio in corso…" : "Invia richiesta"}
      </button>
    </form>
  );
}
