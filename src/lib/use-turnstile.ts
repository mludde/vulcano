"use client";

import { useCallback, useRef } from "react";

type TurnstileApi = {
  render: (element: HTMLElement, options: Record<string, unknown>) => string;
  reset: (widgetId?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

// Cloudflare's public test key (always passes). Used only outside production.
const TEST_SITE_KEY = "1x00000000000000000000AA";
const SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ??
  (process.env.NODE_ENV !== "production" ? TEST_SITE_KEY : undefined);

let scriptPromise: Promise<void> | null = null;

function loadScript() {
  if (!scriptPromise) {
    scriptPromise = new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.onload = () => resolve();
      script.onerror = () => {
        scriptPromise = null;
        reject(new Error("turnstile"));
      };
      document.head.appendChild(script);
    });
  }
  return scriptPromise;
}

export function useTurnstile() {
  const boxRef = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | undefined>(undefined);
  const token = useRef<string | null>(null);
  const waiters = useRef<((value: string | null) => void)[]>([]);

  const settle = useCallback((value: string | null) => {
    token.current = value;
    waiters.current.splice(0).forEach((resolve) => resolve(value));
  }, []);

  const ensureWidget = useCallback(() => {
    if (!SITE_KEY || widgetId.current !== undefined) return;
    widgetId.current = "";
    loadScript()
      .then(() => {
        if (!boxRef.current || !window.turnstile) return;
        widgetId.current = window.turnstile.render(boxRef.current, {
          sitekey: SITE_KEY,
          appearance: "interaction-only",
          language: "it",
          callback: (value: string) => settle(value),
          "expired-callback": () => {
            token.current = null;
          },
          "error-callback": () => settle(null),
        });
      })
      .catch(() => {
        widgetId.current = undefined;
        settle(null);
      });
  }, [settle]);

  const waitForToken = useCallback(() => {
    if (token.current) return Promise.resolve(token.current);
    ensureWidget();
    return new Promise<string | null>((resolve) => {
      waiters.current.push(resolve);
      setTimeout(() => resolve(null), 20000);
    });
  }, [ensureWidget]);

  const reset = useCallback(() => {
    token.current = null;
    if (widgetId.current && window.turnstile) window.turnstile.reset(widgetId.current);
  }, []);

  return { enabled: Boolean(SITE_KEY), boxRef, ensureWidget, waitForToken, reset };
}
