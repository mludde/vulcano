"use client";

import { useState, type FormEvent } from "react";
import { siteConfig } from "@/lib/site-config";

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `Richiesta da ${name}`;
    const body = [
      `Nome: ${name}`,
      `Email: ${email}`,
      phone ? `Telefono: ${phone}` : null,
      "",
      message,
    ]
      .filter(Boolean)
      .join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
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
      <button
        type="submit"
        className="self-start rounded-sm bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground hover:opacity-90"
      >
        Invia richiesta
      </button>
    </form>
  );
}
