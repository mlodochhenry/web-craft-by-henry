import { Editable } from "@/components/Editable";
import { EditModeBar } from "@/components/EditModeBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const Impressum = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="container py-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" /> Zurück
          </Link>
        </Button>
      </header>

      <section className="container max-w-3xl py-10 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Impressum</h1>
        <p className="mt-3 text-muted-foreground">
          Im Bearbeitungsmodus kannst du jeden Eintrag direkt anklicken und ändern.
        </p>

        <div className="mt-10 space-y-10">
          <div>
            <h2 className="text-xl font-semibold">Angaben gemäß § 5 TMG</h2>
            <div className="mt-3 space-y-1">
              <Editable as="p" contentKey="impressum.name" defaultValue="Henry Mlodoch" />
              <Editable as="p" contentKey="impressum.firma" defaultValue="Mlodoch Web" />
              <Editable as="p" contentKey="impressum.strasse" defaultValue="Musterstraße 1" />
              <Editable as="p" contentKey="impressum.ort" defaultValue="12345 Musterstadt" />
              <Editable as="p" contentKey="impressum.land" defaultValue="Deutschland" />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Kontakt</h2>
            <div className="mt-3 space-y-1">
              <p>
                Telefon:{" "}
                <Editable as="span" contentKey="impressum.telefon" defaultValue="+49 000 0000000" />
              </p>
              <p>
                E-Mail:{" "}
                <Editable
                  as="span"
                  contentKey="impressum.email"
                  defaultValue="henry.mlodoch@icloud.com"
                />
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Verantwortlich für den Inhalt</h2>
            <div className="mt-3 space-y-1">
              <Editable
                as="p"
                contentKey="impressum.verantwortlich"
                defaultValue="Henry Mlodoch (Anschrift wie oben)"
              />
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold">Umsatzsteuer-ID</h2>
            <Editable
              as="p"
              multiline
              contentKey="impressum.ustid"
              defaultValue="Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG: –"
              className="mt-3"
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold">Haftungshinweis</h2>
            <Editable
              as="p"
              multiline
              contentKey="impressum.haftung"
              defaultValue="Trotz sorgfältiger inhaltlicher Kontrolle übernehme ich keine Haftung für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich deren Betreiber verantwortlich."
              className="mt-3 text-muted-foreground leading-relaxed"
            />
          </div>
        </div>
      </section>

      <EditModeBar />
    </main>
  );
};

export default Impressum;
