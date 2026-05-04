import { Editable } from "@/components/Editable";
import { EditModeBar } from "@/components/EditModeBar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Star, Plus, Trash2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useEditable } from "@/hooks/useEditableContent";
import { useMemo } from "react";

interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
}

const defaultReviews: Review[] = [
  {
    id: "r1",
    name: "Zufriedener Kunde",
    rating: 5,
    text: "Henry hat meine Webseite schnell und genau nach meinen Wünschen umgesetzt. Sehr empfehlenswert!",
  },
];

const REVIEWS_KEY = "reviews.list";

const Bewertungen = () => {
  const { isEditing, get, set } = useEditable();

  const reviews: Review[] = useMemo(() => {
    try {
      const raw = get(REVIEWS_KEY, JSON.stringify(defaultReviews));
      const parsed = JSON.parse(raw);
      return Array.isArray(parsed) ? parsed : defaultReviews;
    } catch {
      return defaultReviews;
    }
  }, [get]);

  const reviewLink = get("reviews.link", "");

  const updateReviews = (next: Review[]) => set(REVIEWS_KEY, JSON.stringify(next));

  const addReview = () => {
    updateReviews([
      ...reviews,
      { id: `r${Date.now()}`, name: "Name", rating: 5, text: "Bewertungstext" },
    ]);
  };

  const removeReview = (id: string) => {
    updateReviews(reviews.filter((r) => r.id !== id));
  };

  const setRating = (id: string, rating: number) => {
    updateReviews(reviews.map((r) => (r.id === id ? { ...r, rating } : r)));
  };

  const updateField = (id: string, field: "name" | "text", value: string) => {
    updateReviews(reviews.map((r) => (r.id === id ? { ...r, [field]: value } : r)));
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <header className="container py-6">
        <Button asChild variant="ghost" size="sm">
          <Link to="/">
            <ArrowLeft className="h-4 w-4" /> Zurück
          </Link>
        </Button>
      </header>

      <section className="container max-w-4xl py-10 md:py-16">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight">Bewertungen</h1>
        <Editable
          as="p"
          multiline
          contentKey="reviews.intro"
          defaultValue="Was meine Kundinnen und Kunden über meine Arbeit sagen."
          className="mt-3 text-muted-foreground text-lg"
        />

        {/* Bewertungs-Link */}
        <div className="mt-8 rounded-2xl border border-border bg-card p-6">
          {isEditing ? (
            <div className="space-y-2">
              <label className="text-sm font-medium">Link zum Bewerten (nur du siehst dieses Feld)</label>
              <input
                type="url"
                defaultValue={reviewLink}
                onBlur={(e) => set("reviews.link", e.currentTarget.value)}
                placeholder="https://… (z. B. Google-Bewertungslink)"
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary/40"
              />
              <p className="text-xs text-muted-foreground">
                Nur du kannst diesen Link setzen. Besucher sehen den Button unten.
              </p>
            </div>
          ) : (
            reviewLink && (
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <p className="text-muted-foreground">Du hattest mit mir zu tun? Hinterlasse gerne eine Bewertung.</p>
                <Button asChild>
                  <a href={reviewLink} target="_blank" rel="noopener noreferrer">
                    Jetzt bewerten <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </div>
            )
          )}
        </div>

        {/* Reviews */}
        <div className="mt-10 grid md:grid-cols-2 gap-5">
          {reviews.map((r) => (
            <div key={r.id} className="rounded-2xl border border-border bg-card p-6 shadow-card relative">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    disabled={!isEditing}
                    onClick={() => setRating(r.id, n)}
                    aria-label={`${n} Sterne`}
                  >
                    <Star
                      className={`h-5 w-5 ${
                        n <= r.rating ? "fill-primary text-primary" : "text-muted-foreground"
                      } ${isEditing ? "cursor-pointer hover:scale-110 transition-transform" : ""}`}
                    />
                  </button>
                ))}
              </div>
              <p
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => updateField(r.id, "text", e.currentTarget.innerText)}
                className={`mt-4 text-foreground leading-relaxed ${
                  isEditing ? "outline-none ring-1 ring-primary/40 rounded-md px-1 -mx-1" : ""
                }`}
              >
                {r.text}
              </p>
              <p
                contentEditable={isEditing}
                suppressContentEditableWarning
                onBlur={(e) => updateField(r.id, "name", e.currentTarget.innerText.replace(/\n/g, " "))}
                className={`mt-4 text-sm font-semibold text-muted-foreground ${
                  isEditing ? "outline-none ring-1 ring-primary/40 rounded-md px-1 -mx-1" : ""
                }`}
              >
                — {r.name}
              </p>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => removeReview(r.id)}
                  className="absolute top-3 right-3 p-2 rounded-md hover:bg-destructive/10 text-destructive"
                  aria-label="Bewertung löschen"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>
          ))}
        </div>

        {isEditing && (
          <div className="mt-6">
            <Button onClick={addReview} variant="secondary">
              <Plus className="h-4 w-4" /> Bewertung hinzufügen
            </Button>
          </div>
        )}
      </section>

      <EditModeBar />
    </main>
  );
};

export default Bewertungen;
