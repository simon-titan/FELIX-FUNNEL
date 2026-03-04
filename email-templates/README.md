# E-Mail-Vorlagen

## Outseta Bestätigungs-Mail (`outseta-confirmation-email.html`)

**Verwendung in Outseta:**
1. In Outseta: **Settings → Emails** (bzw. wo eure E-Mail-Templates verwaltet werden).
2. Die entsprechende „Confirmation“ / „Welcome“-E-Mail bearbeiten.
3. In den HTML-/Source-Modus wechseln und den **gesamten Inhalt** von `outseta-confirmation-email.html` einfügen (oder den bestehenden Inhalt ersetzen).
4. Speichern.

**Wichtig:** Die Variable `{{ ConfirmationUrl }}` darf nicht geändert werden – sie ist der Link, mit dem Nutzer ihr Passwort setzen und sich einloggen.

**Stil:** Angelehnt an die Funnel-Landing-Page: Inter, Grün (#22c55e) als Akzentfarbe, weißer Inhalt-Block, abgerundeter CTA-Button.
