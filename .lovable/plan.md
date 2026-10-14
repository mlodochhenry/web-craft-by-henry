# Lovable-Badge ausblenden

## Ziel
Das "Edit with Lovable"-Badge soll nicht mehr sichtbar sein.

## Was passiert
Die Regel `#lovable-badge { display: none !important; }` wird ans Ende der globalen Stylesheet-Datei `src/index.css` gesetzt. Damit wird das Badge im Vorschaufenster und auf der veröffentlichten Seite unterdrückt, sofern es im normalen Seiten-DOM steckt.

```text
src/index.css
  ...bestehende Regeln (Tailwind, Tokens, Utilities, Animationen)...
  +
  #lovable-badge { display: none !important; }
```

## Technische Details
- Einfügen als letzte Regel in `src/index.css`, außerhalb der `@layer`-Blöcke, damit die `!important`-Wertung nicht von Layer-Reihenfolgen abhängt.
- Kein Eingriff in `src/App.tsx`, `index.html` oder Komponenten – nur reine Style-Ergänzung.
- Der Selector bleibt exakt so, wie angegeben (`#lovable-badge`), keine zusätzlichen Selektoren.

## Hinweis zur Alternative
Es gibt zusätzlich eine eingebaute Einstellung "Badge ausblenden". Die ist aktuell auf "sichtbar" und lässt sich nur über die Projekt-Einstellungen (bzw. mit Plan ab Pro) umschalten. Die CSS-Regel ist unabhängig davon und wirkt sofort in der Vorschau. Falls das Badge nach dem Einbau trotzdem zu sehen ist (weil es z. B. in einem eigenen Rahmen oder Shadow-DOM gerendert wird), wird die eingebaute Einstellung als nächster Schritt genutzt.

## Prüfung
- Vorschau neu laden, Badge unten links/rechts prüfen.
- Build-Log auf Fehler kontrollieren.
