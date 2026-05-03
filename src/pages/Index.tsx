import { Editable, EditableImage } from "@/components/Editable";
import { EditModeBar } from "@/components/EditModeBar";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-abstract.jpg";
import { ArrowRight, Code2, Sparkles, LifeBuoy, Mail, GraduationCap, Copy, Check } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const Index = () => {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      {/* NAV */}
      <header className="relative z-20">
        <nav className="container flex items-center justify-between py-6">
          <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary to-accent shadow-glow" />
            <Editable contentKey="brand" defaultValue="Mlodoch Web" className="text-lg" />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#leistungen" className="hover:text-foreground transition-smooth">Leistungen</a>
            <a href="#ueber" className="hover:text-foreground transition-smooth">Über mich</a>
            <a href="#kontakt" className="hover:text-foreground transition-smooth">Kontakt</a>
          </div>
          <Button asChild variant="secondary" size="sm" className="hidden sm:inline-flex">
            <a href="#kontakt">Anfragen</a>
          </Button>
        </nav>
      </header>

      {/* HERO */}
      <section id="top" className="relative bg-hero">
        <div
          aria-hidden
          className="absolute inset-0 -z-10 opacity-40"
          style={{
            backgroundImage: `url(${heroImg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
        <div className="container py-24 md:py-36 relative">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-secondary/60 border border-border text-muted-foreground mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <Editable contentKey="hero.badge" defaultValue="Webseiten von einem jungen Entwickler" />
            </span>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05]">
              <Editable as="span" contentKey="hero.title1" defaultValue="Moderne Webseiten," className="block" />
              <Editable
                as="span"
                contentKey="hero.title2"
                defaultValue="ehrlich gemacht."
                className="block text-gradient"
              />
            </h1>
            <Editable
              as="p"
              multiline
              contentKey="hero.subtitle"
              defaultValue="Hi, ich bin Henry Mlodoch. Ich entwerfe, baue und betreue Webseiten für kleine Unternehmen und Privatpersonen – persönlich, schnell und zu fairen Preisen."
              className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto"
            />
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="lg" className="shadow-glow">
                <a href="#kontakt">
                  Webseite anfragen <ArrowRight className="ml-2 h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href="#leistungen">Mehr erfahren</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* HINWEIS / SCHÜLER */}
      <section className="container py-16">
        <div className="relative max-w-4xl mx-auto rounded-2xl gradient-border bg-card/60 backdrop-blur p-8 md:p-10 shadow-card">
          <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
              <GraduationCap className="h-6 w-6" />
            </div>
            <div>
              <Editable
                as="h2"
                contentKey="note.title"
                defaultValue="Ehrlich gesagt: Ich bin Schüler – und neu in dem Feld."
                className="text-2xl md:text-3xl font-semibold tracking-tight"
              />
              <Editable
                as="p"
                multiline
                contentKey="note.body"
                defaultValue="Ich lerne diesen Beruf gerade von Grund auf und stehe noch am Anfang. Genau deshalb bekommst du bei mir volle Aufmerksamkeit, faire Preise und jemanden, der wirklich etwas richtig machen will. Wenn du einer der Ersten bist, profitierst du besonders."
                className="mt-3 text-muted-foreground leading-relaxed"
              />
            </div>
          </div>
        </div>
      </section>

      {/* LEISTUNGEN */}
      <section id="leistungen" className="container py-20">
        <div className="max-w-2xl mb-14">
          <Editable as="h2" contentKey="services.kicker" defaultValue="LEISTUNGEN" className="text-sm font-semibold tracking-[0.2em] text-primary" />
          <Editable as="h3" contentKey="services.title" defaultValue="Was ich für dich machen kann" className="mt-3 text-3xl md:text-5xl font-bold tracking-tight" />
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: Code2,
              k: "service1",
              title: "Webseite erstellen",
              body: "Von der Idee bis zur fertigen, modernen Webseite – sauber gebaut, mobilfreundlich und auf dich zugeschnitten.",
            },
            {
              icon: Sparkles,
              k: "service2",
              title: "Design & Inhalte",
              body: "Ich gestalte deine Seite so, dass sie zu dir passt: Texte, Bilder und Layout aus einem Guss.",
            },
            {
              icon: LifeBuoy,
              k: "service3",
              title: "Betreuung & Updates",
              body: "Auch nach dem Launch bin ich da: Änderungen, Pflege und kleine Erweiterungen jederzeit möglich.",
            },
          ].map(({ icon: Icon, k, title, body }) => (
            <div
              key={k}
              className="group relative rounded-2xl bg-card border border-border p-7 hover:border-primary/40 transition-smooth hover:-translate-y-1"
            >
              <div className="h-11 w-11 rounded-xl bg-secondary flex items-center justify-center text-primary group-hover:shadow-glow transition-smooth">
                <Icon className="h-5 w-5" />
              </div>
              <Editable as="h4" contentKey={`${k}.title`} defaultValue={title} className="mt-5 text-xl font-semibold" />
              <Editable as="p" multiline contentKey={`${k}.body`} defaultValue={body} className="mt-2 text-muted-foreground leading-relaxed" />
            </div>
          ))}
        </div>
      </section>

      {/* ÜBER */}
      <section id="ueber" className="container py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <Editable as="h2" contentKey="about.kicker" defaultValue="ÜBER MICH" className="text-sm font-semibold tracking-[0.2em] text-primary" />
            <Editable as="h3" contentKey="about.title" defaultValue="Henry Mlodoch" className="mt-3 text-3xl md:text-5xl font-bold tracking-tight" />
            <Editable
              as="p"
              multiline
              contentKey="about.body"
              defaultValue="Ich bin Schüler und beschäftige mich mit Webentwicklung und Design. Mlodoch Web ist mein Einzelunternehmen, mit dem ich Erfahrung sammle und gleichzeitig anderen hilft, mit einer eigenen Webseite online zu gehen. Du bekommst direkten Kontakt zu mir – kein Agentur-Hin-und-Her."
              className="mt-5 text-muted-foreground leading-relaxed text-lg"
            />
            <ul className="mt-6 space-y-2 text-muted-foreground">
              <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Persönlicher Ansprechpartner</li>
              <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Faire Einsteigerpreise</li>
              <li className="flex items-center gap-3"><span className="h-1.5 w-1.5 rounded-full bg-primary" /> Lernfreudig & motiviert</li>
            </ul>
          </div>
          <div className="relative aspect-[4/5] rounded-3xl gradient-border overflow-hidden shadow-card animate-float">
            <EditableImage
              contentKey="about.image"
              defaultSrc={heroImg}
              alt="Henry Mlodoch – Webentwickler"
              className="absolute inset-0 rounded-3xl"
            />
          </div>
        </div>
      </section>

      {/* KONTAKT / CTA */}
      <section id="kontakt" className="container py-24">
        <div className="relative max-w-4xl mx-auto text-center rounded-3xl bg-gradient-to-br from-secondary/80 to-card p-10 md:p-16 gradient-border shadow-card">
          <Editable as="h2" contentKey="cta.title" defaultValue="Lust auf eine eigene Webseite?" className="text-3xl md:text-5xl font-bold tracking-tight" />
          <Editable
            as="p"
            multiline
            contentKey="cta.body"
            defaultValue="Schreib mir einfach eine E-Mail. Wir besprechen unverbindlich, was du brauchst – und ich melde mich mit einem Vorschlag bei dir."
            className="mt-4 text-muted-foreground text-lg max-w-xl mx-auto"
          />
          <a
            href="mailto:henry.mlodoch@icloud.com"
            className="mt-8 inline-flex items-center gap-3 px-6 py-4 rounded-full bg-primary text-primary-foreground font-semibold shadow-glow hover:scale-[1.02] transition-smooth"
          >
            <Mail className="h-5 w-5" />
            henry.mlodoch@icloud.com
          </a>
          <Editable
            as="p"
            contentKey="cta.note"
            defaultValue="Antwort meistens innerhalb von 1–2 Tagen."
            className="mt-4 text-sm text-muted-foreground"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border">
        <div className="container py-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-muted-foreground">
          <Editable contentKey="footer.copy" defaultValue="© 2026 Henry Mlodoch · Mlodoch Web" />
          <a href="mailto:henry.mlodoch@icloud.com" className="hover:text-foreground transition-smooth">
            henry.mlodoch@icloud.com
          </a>
        </div>
      </footer>

      <EditModeBar />
    </main>
  );
};

export default Index;
