import { useState } from "react";
import { useEditable } from "@/hooks/useEditableContent";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Lock, LogOut, RotateCcw, Pencil } from "lucide-react";
import { toast } from "sonner";

export const EditModeBar = () => {
  const { isEditing, enterEditing, exitEditing, resetAll } = useEditable();
  const [open, setOpen] = useState(false);
  const [pwd, setPwd] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (enterEditing(pwd)) {
      toast.success("Bearbeitungsmodus aktiv");
      setOpen(false);
      setPwd("");
    } else {
      toast.error("Falsches Passwort");
    }
  };

  if (isEditing) {
    return (
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 px-4 py-3 rounded-full bg-card/90 backdrop-blur-xl border border-primary/40 shadow-glow animate-fade-up">
        <span className="flex items-center gap-2 text-sm font-medium text-primary px-2">
          <Pencil className="h-4 w-4" /> Bearbeitungsmodus
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            if (confirm("Alle Änderungen zurücksetzen?")) {
              resetAll();
              toast.success("Zurückgesetzt");
            }
          }}
        >
          <RotateCcw className="h-4 w-4 mr-1" /> Reset
        </Button>
        <Button variant="secondary" size="sm" onClick={exitEditing}>
          <LogOut className="h-4 w-4 mr-1" /> Beenden
        </Button>
      </div>
    );
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        aria-label="Admin-Bereich"
        className="fixed bottom-5 right-5 z-50 h-10 w-10 rounded-full bg-card/60 backdrop-blur border border-border hover:border-primary/60 hover:text-primary text-muted-foreground transition-smooth flex items-center justify-center"
      >
        <Lock className="h-4 w-4" />
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Admin-Login</DialogTitle>
            <DialogDescription>
              Gib das Passwort ein, um Texte und Bilder zu bearbeiten.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Passwort"
              value={pwd}
              onChange={(e) => setPwd(e.target.value)}
              autoFocus
            />
            <DialogFooter>
              <Button type="submit" className="w-full">Entsperren</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
