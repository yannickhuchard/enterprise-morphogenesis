#!/usr/bin/env python3
"""Build docs/landing from the Design canvas source in design/landing.dc.html.

Writes docs/landing/index.html, docs/assets/css/landing.css and
docs/assets/js/landing.js. Run it again after updating the design source.
"""

from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "design" / "landing.dc.html"
RUNTIME = ROOT / "scripts" / "landing_runtime.js"
DOCS = ROOT / "docs"
SITE = "https://yannickhuchard.github.io/enterprise-morphogenesis/"

# Slide previews uploaded to the canvas, mapped to their copies in the site.
BLOBS = {
    "e3ee2d613431dc5c7e593ba0428b9dd3": "wide-02", "c5f05016494d5cfb77970bcbc0573fa0": "wide-03",
    "ffec830a39a1b81f48412157f754c4c5": "wide-04", "60323199a30fa5e69cd07637ebb346ee": "wide-06",
    "17001a2194d9762c12aa50b86dcc73dc": "wide-07", "27590930e757fae04f4509b1e37bc864": "wide-10",
    "68507d0d98cb1dbd82a541ec8f243093": "wide-11", "1e7fea4a2b3401784ad9cb865a771fcf": "wide-13",
    "70a7b32b6b928bb2a4b6560a309dd6c5": "specialists-02", "13fbdfccebd50446063a6e181bc9e51d": "specialists-03",
    "d2c613bfca8306184f01c01d1471b7e5": "specialists-04", "e1fb9676edc9018f4a5043d870e0e139": "specialists-06",
    "d43201d923aa5a6a54bf869f33280602": "specialists-07", "0d49794290f548f9e14c965425e97564": "specialists-10",
    "cce2a593af3df6ea805ecee998d8863e": "specialists-11", "6650eb5ead63dd75aefa771ec20a8670": "specialists-13",
}

PAGE = """<!doctype html>
<html lang="fr">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Enterprise Morphogenesis — Quand l’IA accélère tout, qui garde votre entreprise sur sa trajectoire ?</title>
  <meta name="description" content="Une approche pour garder l’entreprise cohérente pendant qu’elle change, y compris avec des agents IA. White paper de Yannick Huchard, en français et en anglais.">
  <meta name="author" content="Yannick Huchard">
  <meta name="theme-color" content="#fafbfc">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Quand l’IA accélère tout, qui garde votre entreprise sur sa trajectoire ?">
  <meta property="og:description" content="Enterprise Morphogenesis : un système qui garde l’entreprise cohérente pendant qu’elle change. White paper, synthèse et présentations.">
  <meta property="og:url" content="{site}landing/">
  <meta name="twitter:card" content="summary">
  <link rel="canonical" href="{site}landing/">
  <link rel="icon" type="image/svg+xml" href="../assets/images/yh-mark.svg">
  <link rel="license" href="https://creativecommons.org/licenses/by/4.0/">
{fonts}
  <link rel="stylesheet" href="../assets/css/landing.css">
  <script defer src="../assets/js/landing.js"></script>
</head>
<body>
  <div id="landing"></div>
  <noscript>
    <main style="max-width: 640px; margin: 64px auto; padding: 0 16px; font-family: Georgia, serif; line-height: 1.6">
      <p><strong>Enterprise Morphogenesis</strong> — Yannick Huchard</p>
      <p>Quand l’IA accélère tout, qui garde votre entreprise sur sa trajectoire ? Cette page animée demande JavaScript.</p>
      <p><a href="../">Lire le white paper</a> · <a href="../discover/">Version sans animation</a> · <a href="../presentations/Enterprise_Morphogenesis_Wide_Adoption_v1_0.pptx">Présentation pour tous</a> · <a href="../presentations/Enterprise_Morphogenesis_Specialists_v1_0.pptx">Présentation pour les spécialistes</a></p>
    </main>
  </noscript>
  <template id="landing-template">
{body}
  </template>
</body>
</html>
"""


def between(text: str, start: str, end: str) -> str:
    i = text.index(start) + len(start)
    return text[i:text.index(end, i)]


def localize(text: str) -> str:
    for blob, name in BLOBS.items():
        text = text.replace(f"/_blob/{blob}", f"../assets/images/decks/{name}.png")
    text = text.replace(SITE + "presentations/", "../presentations/")
    if "/_blob/" in text:
        raise SystemExit("An uploaded asset has no local copy in BLOBS")
    return text


def main() -> None:
    source = SOURCE.read_text(encoding="utf-8")
    helmet = between(source, "<helmet>", "</helmet>")
    css = between(helmet, "<style>", "</style>").strip() + "\n"
    fonts = "\n".join("  " + line.strip() for line in helmet.splitlines() if line.strip().startswith("<link"))
    fonts = fonts.replace('crossorigin="anonymous"', "crossorigin")
    body = between(source, "</helmet>", "</x-dc>").strip()
    code = between(source, "data-dc-script", "</script>")
    code = code[code.index(">") + 1:].strip()
    runtime = RUNTIME.read_text(encoding="utf-8")

    (DOCS / "assets/css/landing.css").write_text(css, encoding="utf-8")
    (DOCS / "assets/js/landing.js").write_text(runtime.replace("/*COMPONENT*/", localize(code)), encoding="utf-8")
    page = PAGE.replace("{site}", SITE).replace("{fonts}", fonts).replace("{body}", localize(body))
    (DOCS / "landing").mkdir(exist_ok=True)
    (DOCS / "landing/index.html").write_text(page, encoding="utf-8")
    print("Built docs/landing/index.html")


if __name__ == "__main__":
    main()
