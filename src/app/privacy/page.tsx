import type { Metadata } from "next";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/lib/site-config";

const title = "Privacy e Cookie Policy";
const description =
  "Informativa sul trattamento dei dati personali e sull'uso dei cookie sul sito Vulcano Immobiliare.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="border-b border-border">
          <div className="mx-auto max-w-3xl px-6 py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">
              Informativa
            </p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-balance md:text-5xl font-display">
              Privacy e Cookie Policy
            </h1>
            <p className="mt-4 text-sm text-muted">
              Ultimo aggiornamento: 21 agosto 2026
            </p>
          </div>
        </section>

        <section className="mx-auto max-w-3xl px-6 py-16">
          <div className="flex flex-col gap-10 text-sm leading-relaxed text-foreground [&_h2]:font-display [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-balance [&_p]:text-muted [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:text-muted [&_ul]:flex [&_ul]:flex-col [&_ul]:gap-1">
            <div>
              <h2>Titolare del trattamento</h2>
              <p className="mt-3">
                Il titolare del trattamento dei dati raccolti tramite questo
                sito è <strong>[Nome e Cognome / Ragione Sociale — da
                completare]</strong>, P.IVA/C.F. [da completare], contattabile
                all&apos;indirizzo email {siteConfig.email}.
              </p>
            </div>

            <div>
              <h2>Quali dati raccogliamo</h2>
              <p className="mt-3">
                Raccogliamo dati personali esclusivamente quando compili
                volontariamente il modulo di contatto presente nella pagina{" "}
                <em>Contatti</em>:
              </p>
              <ul className="mt-3">
                <li>Nome e cognome</li>
                <li>Indirizzo email</li>
                <li>Numero di telefono (facoltativo)</li>
                <li>Il contenuto del messaggio che invii</li>
              </ul>
              <p className="mt-3">
                Il sito non utilizza account utente, non richiede
                registrazione e non raccoglie dati tramite cookie di
                tracciamento (vedi sezione Cookie più sotto).
              </p>
            </div>

            <div>
              <h2>Perché li usiamo</h2>
              <p className="mt-3">
                I dati inseriti nel modulo di contatto sono utilizzati
                esclusivamente per rispondere alla tua richiesta (es.
                informazioni su un immobile, richiesta di consulenza). La
                base giuridica è l&apos;esecuzione di misure precontrattuali
                richieste da te (art. 6.1.b GDPR) e, dove applicabile, il tuo
                consenso esplicito (art. 6.1.a GDPR).
              </p>
            </div>

            <div>
              <h2>Come vengono trattati</h2>
              <p className="mt-3">
                Quando invii il modulo di contatto, i dati vengono trasmessi
                tramite il servizio di invio email{" "}
                <a
                  href="https://resend.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent"
                >
                  Resend
                </a>{" "}
                direttamente alla casella email del titolare. Non
                conserviamo una copia separata delle richieste su database
                propri: il messaggio resta unicamente nella posta elettronica
                del titolare, con le stesse garanzie di sicurezza e
                conservazione della sua normale corrispondenza.
              </p>
              <p className="mt-3">
                Il sito è ospitato su infrastruttura{" "}
                <a
                  href="https://vercel.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent"
                >
                  Vercel
                </a>{" "}
                e i contenuti (immobili, recensioni) sono gestiti tramite{" "}
                <a
                  href="https://www.sanity.io"
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent"
                >
                  Sanity
                </a>
                . Questi fornitori agiscono come responsabili del trattamento
                per gli aspetti tecnici di hosting e invio email, e possono
                trattare dati su infrastrutture situate anche fuori
                dall&apos;Unione Europea, con garanzie adeguate previste dai
                rispettivi fornitori (clausole contrattuali standard).
              </p>
            </div>

            <div>
              <h2>Quanto conserviamo i dati</h2>
              <p className="mt-3">
                Conserviamo i dati ricevuti tramite il modulo di contatto solo
                per il tempo necessario a gestire la tua richiesta, salvo
                obblighi di legge diversi o un rapporto contrattuale
                successivo tra le parti.
              </p>
            </div>

            <div>
              <h2>I tuoi diritti</h2>
              <p className="mt-3">
                In qualsiasi momento puoi richiedere al titolare l&apos;accesso
                ai tuoi dati, la rettifica, la cancellazione, la limitazione
                del trattamento, la portabilità dei dati o opporti al
                trattamento, scrivendo a {siteConfig.email}. Hai inoltre
                diritto di presentare reclamo al Garante per la protezione
                dei dati personali (www.garanteprivacy.it) qualora ritenga
                che il trattamento avvenga in violazione della normativa
                vigente.
              </p>
            </div>

            <div>
              <h2 id="cookie">Cookie</h2>
              <p className="mt-3">
                Questo sito, allo stato attuale, <strong>non utilizza cookie
                di analisi, tracciamento o profilazione</strong>, propri o di
                terze parti. Vengono impiegati esclusivamente eventuali
                cookie tecnici strettamente necessari al funzionamento del
                sito, che non richiedono consenso ai sensi della normativa
                vigente.
              </p>
              <p className="mt-3">
                Se in futuro dovessimo introdurre strumenti di analisi del
                traffico o altri cookie non tecnici, questa pagina verrà
                aggiornata e comparirà un banner per raccogliere il tuo
                consenso prima dell&apos;attivazione di tali strumenti.
              </p>
            </div>

            <div>
              <h2>Modifiche a questa informativa</h2>
              <p className="mt-3">
                Questa informativa può essere aggiornata nel tempo, ad
                esempio in seguito a modifiche normative o a cambiamenti nei
                servizi utilizzati dal sito. La data di ultimo aggiornamento
                è indicata in cima alla pagina.
              </p>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
