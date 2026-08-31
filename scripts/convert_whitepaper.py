#!/usr/bin/env python3
"""Convert the publication Word manuscript into GitHub Pages Markdown and HTML."""

from __future__ import annotations

import html
import json
import re
import shutil
import zipfile
from dataclasses import dataclass, field
from pathlib import Path

from lxml import etree

ROOT = Path(__file__).resolve().parents[1]
DOCX = ROOT / "Enterprise_Morphogenesis_White_Paper_Yannick_Huchard_v1_0_Publication.docx"
DOCS = ROOT / "docs"
FIGURES = DOCS / "assets" / "images" / "figures"
TEMPLATE = Path(__file__).resolve().parent / "page_template.html"
WORD_DOWNLOAD = "Enterprise_Morphogenesis_v1_0.docx"
AUTHOR_URL = "https://yannickhuchard.com"
PAPER_URL = "https://yannickhuchard.github.io/enterprise-morphogenesis/"
REPO_URL = "https://github.com/yannickhuchard/enterprise-morphogenesis"
LICENSE_URL = "https://creativecommons.org/licenses/by/4.0/"

W = "{http://schemas.openxmlformats.org/wordprocessingml/2006/main}"
M = "{http://schemas.openxmlformats.org/officeDocument/2006/math}"
A = "{http://schemas.openxmlformats.org/drawingml/2006/main}"
R = "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}"
WP = "{http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing}"
REL = "{http://schemas.openxmlformats.org/package/2006/relationships}"
XML = "{http://www.w3.org/XML/1998/namespace}"

STYLE_MAP = {
    "Heading1": 1,
    "Heading2": 2,
    "Heading3": 3,
    "Heading4": 4,
}


@dataclass
class Inline:
    kind: str
    text: str = ""
    href: str = ""
    children: list["Inline"] = field(default_factory=list)


@dataclass
class Block:
    kind: str
    text: str = ""
    level: int = 0
    ident: str = ""
    inlines: list[Inline] = field(default_factory=list)
    rows: list[list[str]] = field(default_factory=list)
    caption: str = ""
    src: str = ""
    alt: str = ""
    latex: str = ""


def local(tag: str) -> str:
    return etree.QName(tag).localname


def text_content(el) -> str:
    return "".join(el.xpath(".//w:t/text()", namespaces={"w": W[1:-1]})).replace("\u00a0", " ")


def p_style(p) -> str:
    s = p.find(f"{W}pPr/{W}pStyle")
    return s.get(f"{W}val") if s is not None else "Normal"


def val(el, attr: str = "val") -> str | None:
    if el is None:
        return None
    return el.get(f"{W}{attr}") or el.get(f"{M}{attr}")


def slugify(text: str) -> str:
    text = text.lower().replace("’", "").replace("'", "")
    text = re.sub(r"[^\w\s-]", "", text, flags=re.UNICODE)
    text = re.sub(r"[-\s]+", "-", text).strip("-")
    return text or "section"


def md_escape(text: str) -> str:
    return (
        text.replace("\\", "\\\\")
        .replace("*", "\\*")
        .replace("[", "\\[")
        .replace("]", "\\]")
        .replace("`", "\\`")
    )


# --- OMML to LaTeX ----------------------------------------------------------

def omml_children(el):
    return [c for c in el if isinstance(c.tag, str)]


def omml_join(parts: list[str]) -> str:
    return "".join(parts)


def omml_to_latex(el) -> str:
    name = local(el.tag)
    if name in {"oMath", "oMathPara", "e", "sub", "sup", "num", "den", "lim", "deg"}:
        return omml_join(omml_to_latex(c) for c in omml_children(el))

    if name == "r":
        lit = el.find(f"{M}rPr/{M}lit") is not None or el.find(f"{M}rPr/{M}nor") is not None
        scr = val(el.find(f"{M}rPr/{M}scr"))
        raw = "".join(t.text or "" for t in el.findall(f"{M}t"))
        raw = raw.replace("\u00a0", " ")
        if not raw:
            return ""
        mapped = (
            raw            .replace("≠", "\\neq ")
            .replace("≤", "\\leq ")
            .replace("≥", "\\geq ")
            .replace("≳", "\\geq ")
            .replace("≲", "\\leq ")
            .replace("×", "\\times ")
            .replace("·", "\\cdot ")
            .replace("−", "-")
            .replace("→", "\\rightarrow ")
            .replace("↔", "\\leftrightarrow ")
            .replace("∈", "\\in ")
            .replace("⊂", "\\subset ")
            .replace("∪", "\\cup ")
            .replace("∩", "\\cap ")
            .replace("∀", "\\forall ")
            .replace("∃", "\\exists ")
            .replace("∑", "\\sum ")
            .replace("∏", "\\prod ")
            .replace("∞", "\\infty ")
            .replace("∂", "\\partial ")
            .replace("∇", "\\nabla ")
            .replace("π", "\\pi ")
            .replace("Π", "\\Pi ")
            .replace("Φ", "\\Phi ")
            .replace("φ", "\\phi ")
            .replace("ψ", "\\psi ")
            .replace("Ψ", "\\Psi ")
            .replace("ε", "\\varepsilon ")
            .replace("δ", "\\delta ")
            .replace("Δ", "\\Delta ")
            .replace("λ", "\\lambda ")
            .replace("μ", "\\mu ")
            .replace("σ", "\\sigma ")
            .replace("θ", "\\theta ")
            .replace("ω", "\\omega ")
            .replace("Ω", "\\Omega ")
        )
        if lit:
            return "\\mathrm{" + mapped.replace(" ", "\\ ") + "}"
        if scr in {"script", "cal"}:
            return "\\mathcal{" + mapped + "}"
        return mapped

    if name == "sSub":
        base = omml_to_latex(el.find(f"{M}e")) if el.find(f"{M}e") is not None else ""
        sub = omml_to_latex(el.find(f"{M}sub")) if el.find(f"{M}sub") is not None else ""
        return f"{{{base}}}_{{{sub}}}"

    if name == "sSup":
        base = omml_to_latex(el.find(f"{M}e")) if el.find(f"{M}e") is not None else ""
        sup = omml_to_latex(el.find(f"{M}sup")) if el.find(f"{M}sup") is not None else ""
        return f"{{{base}}}^{{{sup}}}"

    if name == "sSubSup":
        base = omml_to_latex(el.find(f"{M}e")) if el.find(f"{M}e") is not None else ""
        sub = omml_to_latex(el.find(f"{M}sub")) if el.find(f"{M}sub") is not None else ""
        sup = omml_to_latex(el.find(f"{M}sup")) if el.find(f"{M}sup") is not None else ""
        return f"{{{base}}}_{{{sub}}}^{{{sup}}}"

    if name == "f":
        num = omml_to_latex(el.find(f"{M}num")) if el.find(f"{M}num") is not None else ""
        den = omml_to_latex(el.find(f"{M}den")) if el.find(f"{M}den") is not None else ""
        return f"\\frac{{{num}}}{{{den}}}"

    if name == "d":
        pair = {"(": ")", "[": "]", "{": "}", "|": "|", "⟨": "⟩"}
        beg = val(el.find(f"{M}dPr/{M}begChr")) or "("
        end = val(el.find(f"{M}dPr/{M}endChr")) or pair.get(beg, ")")
        sep = val(el.find(f"{M}dPr/{M}sepChr")) or ","
        inner = (sep + " ").join(omml_to_latex(c) for c in el.findall(f"{M}e"))
        left = {"(": "(", "[": "[", "{": "\\{", "|": "|", "⟨": "\\langle ", "": ""}.get(beg, beg)
        right = {")": ")", "]": "]", "}": "\\}", "|": "|", "⟩": "\\rangle ", "": ""}.get(end, end)
        return f"\\left{left} {inner} \\right{right}"

    if name == "nary":
        chr_ = val(el.find(f"{M}naryPr/{M}chr")) or "∑"
        op = {
            "∑": "\\sum",
            "∏": "\\prod",
            "∫": "\\int",
            "⋃": "\\bigcup",
            "⋂": "\\bigcap",
        }.get(chr_, chr_)
        sub_el = el.find(f"{M}sub")
        sup_el = el.find(f"{M}sup")
        hide_sub = val(el.find(f"{M}naryPr/{M}subHide")) in {"1", "on"}
        hide_sup = val(el.find(f"{M}naryPr/{M}supHide")) in {"1", "on"}
        bits = [op]
        if sub_el is not None and not hide_sub:
            bits.append("_{" + omml_to_latex(sub_el) + "}")
        if sup_el is not None and not hide_sup:
            bits.append("^{" + omml_to_latex(sup_el) + "}")
        bits.append(" " + (omml_to_latex(el.find(f"{M}e")) if el.find(f"{M}e") is not None else ""))
        return "".join(bits)

    if name == "m":
        rows = []
        for mr in el.findall(f"{M}mr"):
            cells = [omml_to_latex(e) for e in mr.findall(f"{M}e")]
            rows.append(" & ".join(cells))
        body = " \\\\ ".join(rows)
        beg = val(el.find(f"{M}mPr/{M}mcs")) 
        return f"\\begin{{matrix}}{body}\\end{{matrix}}"

    if name in {"func", "fName"}:
        return omml_join(omml_to_latex(c) for c in omml_children(el))

    if name in {"rPr", "ctrlPr", "dPr", "fPr", "naryPr", "sSubPr", "sSupPr", "mPr", "argPr"}:
        return ""

    return omml_join(omml_to_latex(c) for c in omml_children(el))


def latex_tidy(tex: str) -> str:
    tex = re.sub(r"\s+", " ", tex).strip()
    tex = tex.replace(" \\right", "\\right")
    tex = tex.replace("\\left ", "\\left")
    return tex


# --- Inlines ----------------------------------------------------------------

def run_flags(r) -> tuple[bool, bool]:
    rpr = r.find(f"{W}rPr")
    bold = italic = False
    if rpr is not None:
        b = rpr.find(f"{W}b")
        i = rpr.find(f"{W}i")
        bold = b is not None and val(b) != "0"
        italic = i is not None and val(i) != "0"
        if rpr.find(f"{W}bCs") is not None and val(rpr.find(f"{W}bCs")) != "0":
            bold = True
        if rpr.find(f"{W}iCs") is not None and val(rpr.find(f"{W}iCs")) != "0":
            italic = True
    return bold, italic


def parse_run(r) -> list[Inline]:
    out: list[Inline] = []
    bold, italic = run_flags(r)
    for child in r:
        name = local(child.tag)
        if name == "t":
            txt = (child.text or "").replace("\u00a0", " ")
            if txt:
                kind = "text"
                if bold and italic:
                    kind = "bolditalic"
                elif bold:
                    kind = "bold"
                elif italic:
                    kind = "italic"
                out.append(Inline(kind, txt))
        elif name == "tab":
            out.append(Inline("text", " "))
        elif name == "br":
            out.append(Inline("text", " "))
        elif name == "drawing":
            out.extend(parse_drawing(child))
        elif name == "object":
            math = child.find(f".//{M}oMath")
            if math is not None:
                out.append(Inline("math", latex_tidy(omml_to_latex(math))))
    return out


def parse_drawing(drawing) -> list[Inline]:
    blip = drawing.find(f".//{A}blip")
    docpr = drawing.find(f".//{WP}docPr")
    if blip is None:
        return []
    rid = blip.get(f"{R}embed")
    alt = ""
    if docpr is not None:
        alt = docpr.get("descr") or docpr.get("title") or docpr.get("name") or ""
    return [Inline("image", href=rid or "", text=alt)]


def parse_container(el, rels: dict[str, str]) -> list[Inline]:
    out: list[Inline] = []
    for child in el:
        if not isinstance(child.tag, str):
            continue
        name = local(child.tag)
        if name == "r":
            out.extend(parse_run(child))
        elif name == "hyperlink":
            rid = child.get(f"{R}id")
            href = rels.get(rid or "", "")
            anchor = child.get(f"{W}anchor")
            if not href and anchor and not anchor.startswith("_Toc"):
                href = "#" + anchor
            kids = parse_container(child, rels)
            label = "".join(k.text for k in kids if k.kind != "math")
            out.append(Inline("link", text=label or href, href=href, children=kids))
        elif name == "oMath":
            out.append(Inline("math", latex_tidy(omml_to_latex(child))))
        elif name == "oMathPara":
            math = child.find(f"{M}oMath")
            if math is not None:
                out.append(Inline("displaymath", latex_tidy(omml_to_latex(math))))
        elif name == "drawing":
            out.extend(parse_drawing(child))
        elif name in {"ins", "del", "smartTag", "sdt", "sdtContent", "fldSimple", "hyperlink"}:
            out.extend(parse_container(child, rels))
        elif name == "p":
            out.extend(parse_container(child, rels))
    return out


def inlines_text(inlines: list[Inline]) -> str:
    parts = []
    for item in inlines:
        if item.kind == "link":
            parts.append(item.text)
        elif item.kind in {"math", "displaymath"}:
            parts.append(item.text)
        elif item.kind != "image":
            parts.append(item.text)
    return "".join(parts).strip()


def paragraph_bookmarks(p) -> list[str]:
    names = []
    for b in p.findall(f".//{W}bookmarkStart"):
        name = b.get(f"{W}name") or ""
        if name.startswith("ref-") or (
            name
            and not name.startswith("_")
            and not name.startswith("X")
        ):
            names.append(name)
    return names


def collapse_inlines(inlines: list[Inline]) -> list[Inline]:
    out: list[Inline] = []
    for item in inlines:
        if out and item.kind == out[-1].kind and item.kind in {"text", "bold", "italic", "bolditalic"}:
            out[-1].text += item.text
        else:
            out.append(item)
    return out


def tidy_glossary_inlines(inlines: list[Inline]) -> list[Inline]:
    """Keep the term bold and prevent bold/math splits around the following period."""
    if not inlines:
        return inlines
    out: list[Inline] = []
    i = 0
    while i < len(inlines):
        item = inlines[i]
        nxt = inlines[i + 1] if i + 1 < len(inlines) else None
        nxt2 = inlines[i + 2] if i + 2 < len(inlines) else None
        if (
            item.kind == "bold"
            and nxt
            and nxt.kind == "math"
            and nxt2
            and nxt2.kind == "bold"
            and nxt2.text.strip().startswith(".")
        ):
            item.text = item.text.rstrip()
            out.append(item)
            out.append(Inline("text", " "))
            out.append(nxt)
            out.append(Inline("text", ". "))
            i += 3
            continue
        if item.kind == "bold":
            item.text = re.sub(r"\s+\.\s*$", ".", item.text)
        out.append(item)
        i += 1
    rest = collapse_inlines(out)
    if rest and rest[0].kind == "bold" and ". " in rest[0].text:
        term, after = rest[0].text.split(". ", 1)
        rest[0].text = term.strip() + "."
        remainder = after.strip()
        if remainder:
            rest.insert(1, Inline("text", " " + remainder))
    if rest and rest[0].kind == "bold" and rest[0].text.endswith(".") and len(rest) > 1:
        nxt = rest[1]
        if nxt.kind == "text" and not nxt.text.startswith(" "):
            nxt.text = " " + nxt.text.lstrip()
        elif nxt.kind != "text":
            rest.insert(1, Inline("text", " "))
    return rest


# --- Document walk ----------------------------------------------------------

def load_rels(zf: zipfile.ZipFile) -> tuple[dict[str, str], dict[str, str]]:
    root = etree.fromstring(zf.read("word/_rels/document.xml.rels"))
    targets: dict[str, str] = {}
    hyper: dict[str, str] = {}
    for rel in root:
        rid = rel.get("Id")
        tgt = rel.get("Target")
        typ = rel.get("Type") or ""
        if not rid or not tgt:
            continue
        if "hyperlink" in typ:
            hyper[rid] = tgt
        else:
            targets[rid] = tgt
    return targets, hyper


def table_rows(tbl) -> list[list[str]]:
    rows = []
    for tr in tbl.findall(f"{W}tr"):
        row = []
        for tc in tr.findall(f"{W}tc"):
            paras = []
            for p in tc.findall(f"{W}p"):
                t = text_content(p).strip()
                if t:
                    paras.append(t)
            row.append(" ".join(paras))
        rows.append(row)
    return rows


def build_blocks(zf: zipfile.ZipFile) -> list[Block]:
    root = etree.fromstring(zf.read("word/document.xml"))
    media_rels, hyper_rels = load_rels(zf)
    body = root.find(f"{W}body")
    blocks: list[Block] = []
    started = False
    in_glossary = False
    figure_index = 0
    skip_next_caption = False
    used_ids: dict[str, int] = {}

    def unique_id(text: str) -> str:
        base = slugify(text)
        n = used_ids.get(base, 0) + 1
        used_ids[base] = n
        return base if n == 1 else f"{base}-{n}"

    children = [c for c in body if isinstance(c.tag, str)]
    i = 0
    while i < len(children):
        child = children[i]
        name = local(child.tag)
        i += 1

        if name == "sdt":
            if started:
                blocks.append(Block("toc"))
            continue
        if name == "tbl":
            rows = table_rows(child)
            caption = ""
            if i < len(children) and local(children[i].tag) == "p" and p_style(children[i]) == "Caption":
                caption = text_content(children[i]).strip()
                i += 1
            blocks.append(Block("table", rows=rows, caption=caption))
            continue
        if name != "p":
            continue

        style = p_style(child)
        inlines = collapse_inlines(parse_container(child, hyper_rels))
        raw = inlines_text(inlines)
        images = [x for x in inlines if x.kind == "image"]
        display = [x for x in inlines if x.kind == "displaymath"]
        bookmarks = paragraph_bookmarks(child)
        ref_id = next((n for n in bookmarks if n.startswith("ref-")), "")
        heading_id = next((n for n in bookmarks if not n.startswith("ref-")), "")

        if not started:
            if raw == "Abstract":
                started = True
                blocks.append(Block("heading", text="Abstract", level=1, ident="abstract"))
            continue

        if skip_next_caption:
            skip_next_caption = False
            continue

        if images:
            for img in images:
                figure_index += 1
                target = media_rels.get(img.href, "")
                src_name = Path(target).name
                dest_name = f"figure-{figure_index:02d}{Path(src_name).suffix.lower() or '.png'}"
                src_bytes = zf.read("word/" + target.replace("\\", "/"))
                FIGURES.mkdir(parents=True, exist_ok=True)
                (FIGURES / dest_name).write_bytes(src_bytes)
                caption = ""
                alt = img.text.strip()
                if i < len(children) and local(children[i].tag) == "p":
                    nxt = text_content(children[i]).strip()
                    nstyle = p_style(children[i])
                    if nstyle in {"Normal", "Caption", "CaptionText", "BodyText"} and nxt:
                        caption = nxt
                        skip_next_caption = True
                blocks.append(
                    Block(
                        "figure",
                        src=f"assets/images/figures/{dest_name}",
                        alt=alt or caption,
                        caption=caption or alt,
                    )
                )
            rest = [x for x in inlines if x.kind not in {"image"}]
            if inlines_text(rest):
                blocks.append(Block("paragraph", inlines=rest, text=inlines_text(rest)))
            continue

        if style in STYLE_MAP:
            ident = heading_id or unique_id(raw)
            used_ids[ident] = used_ids.get(ident, 0) + 1
            if raw == "Glossary":
                in_glossary = True
            elif in_glossary:
                in_glossary = False
            blocks.append(
                Block("heading", text=raw, level=STYLE_MAP[style], ident=ident, inlines=inlines)
            )
            continue

        if style == "MorphogeneticCallout":
            blocks.append(Block("callout", text=raw, inlines=inlines))
            continue

        if style == "Caption":
            blocks.append(Block("caption", text=raw))
            continue

        if not raw and not display:
            continue

        if display and not raw.replace(display[0].text, "").strip() and len(display) == 1:
            blocks.append(Block("display_math", latex=display[0].text))
            continue

        if style in {"Normal", "BodyText", "BodyText2", "LeadParagraph", "Quote", "IntenseQuote"}:
            kind = "paragraph"
            if style in {"Quote", "IntenseQuote"}:
                kind = "quote"
            elif in_glossary:
                kind = "glossary"
                inlines = tidy_glossary_inlines(inlines)
            blocks.append(Block(kind, text=raw, inlines=inlines, ident=ref_id))
            continue

        kind = "glossary" if in_glossary else "paragraph"
        if kind == "glossary":
            inlines = tidy_glossary_inlines(inlines)
        blocks.append(Block(kind, text=raw, inlines=inlines, ident=ref_id))

    return blocks


# --- Renderers --------------------------------------------------------------

def render_inlines_md(inlines: list[Inline]) -> str:
    parts = []
    for item in inlines:
        if item.kind == "text":
            parts.append(md_escape(item.text))
        elif item.kind == "bold":
            parts.append(f"**{md_escape(item.text)}**")
        elif item.kind == "italic":
            parts.append(f"*{md_escape(item.text)}*")
        elif item.kind == "bolditalic":
            parts.append(f"***{md_escape(item.text)}***")
        elif item.kind == "link":
            label = md_escape(item.text) if item.text else item.href
            parts.append(f"[{label}]({item.href})")
        elif item.kind == "math":
            parts.append(f"${item.text}$")
        elif item.kind == "displaymath":
            parts.append(f"\n\n$$\n{item.text}\n$$\n\n")
    return "".join(parts)


def render_inlines_html(inlines: list[Inline]) -> str:
    parts = []
    for item in inlines:
        if item.kind == "text":
            parts.append(html.escape(item.text))
        elif item.kind == "bold":
            parts.append(f"<strong>{html.escape(item.text)}</strong>")
        elif item.kind == "italic":
            parts.append(f"<em>{html.escape(item.text)}</em>")
        elif item.kind == "bolditalic":
            parts.append(f"<strong><em>{html.escape(item.text)}</em></strong>")
        elif item.kind == "link":
            href = html.escape(item.href, quote=True)
            label = html.escape(item.text) if item.text else href
            parts.append(f'<a href="{href}">{label}</a>')
        elif item.kind == "math":
            parts.append(f"\\({html.escape(item.text)}\\)")
        elif item.kind == "displaymath":
            parts.append(f"<div class='display-math'>\\[{html.escape(item.text)}\\]</div>")
    return "".join(parts)


def heading_list(blocks: list[Block]) -> list[Block]:
    return [b for b in blocks if b.kind == "heading"]


def render_toc_md(heads: list[Block]) -> str:
    lines = ["## Contents", ""]
    for h in heads:
        if h.ident == "abstract":
            continue
        indent = "  " * max(h.level - 1, 0)
        lines.append(f"{indent}- [{h.text}](#{h.ident})")
    lines.append("")
    return "\n".join(lines)


def render_toc_html(heads: list[Block]) -> str:
    items = []
    for h in heads:
        cls = f"toc-l{h.level}"
        items.append(
            f'<li class="{cls}"><a href="#{html.escape(h.ident)}">{html.escape(h.text)}</a></li>'
        )
    return "<ol class='toc'>\n" + "\n".join(items) + "\n</ol>"


def md_table(rows: list[list[str]]) -> str:
    if not rows:
        return ""
    def cell(c: str) -> str:
        return md_escape(c).replace("|", "\\|").replace("\n", " ")
    header = rows[0]
    body = rows[1:]
    lines = [
        "| " + " | ".join(cell(c) for c in header) + " |",
        "| " + " | ".join("---" for _ in header) + " |",
    ]
    for row in body:
        padded = row + [""] * (len(header) - len(row))
        lines.append("| " + " | ".join(cell(c) for c in padded[: len(header)]) + " |")
    return "\n".join(lines)


def html_table(rows: list[list[str]], caption: str) -> str:
    if not rows:
        return ""
    thead = "<tr>" + "".join(f"<th>{html.escape(c)}</th>" for c in rows[0]) + "</tr>"
    body_rows = []
    for row in rows[1:]:
        padded = row + [""] * (len(rows[0]) - len(row))
        body_rows.append(
            "<tr>" + "".join(f"<td>{html.escape(c)}</td>" for c in padded[: len(rows[0])]) + "</tr>"
        )
    cap = f"<caption>{html.escape(caption)}</caption>" if caption else ""
    return (
        f'<div class="table-wrap"><table>{cap}<thead>{thead}</thead>'
        f'<tbody>{"".join(body_rows)}</tbody></table></div>'
    )


def render_markdown(blocks: list[Block]) -> str:
    heads = heading_list(blocks)
    parts = [
        "---",
        "title: \"Enterprise Morphogenesis: how strategy becomes a target form, and how that form is generated, scaled, and kept viable under continuous change.\"",
        "author: Yannick Huchard",
        "date: August 2026",
        "version: \"1.0\"",
        "description: >",
        "  Enterprise Architecture as the morphogenetic system of the enterprise:",
        "  how strategy becomes a target form, and how that form is generated,",
        "  scaled, and kept viable under continuous change.",
        "citation:",
        "  type: White paper",
        "  author: Huchard, Yannick",
        "  year: 2026",
        "  month: August",
        "  url: https://yannickhuchard.github.io/enterprise-morphogenesis/",
        "  bibtex: citation.bib",
        "  ris: citation.ris",
        "  cff: CITATION.cff",
        "---",
        "",
        "# Enterprise Morphogenesis",
        "",
        "*Enterprise Architecture as the morphogenetic system of the enterprise: how strategy becomes a target form, and how that form is generated, scaled, and kept viable under continuous change.*",
        "",
        "**[Yannick Huchard](https://yannickhuchard.com)** · Enterprise Architecture  ",
        "Version 1.0 · August 2026",
        "",
        "---",
        "",
    ]
    for block in blocks:
        if block.kind == "heading":
            parts.append("#" * block.level + f" {block.text}")
            parts.append("")
        elif block.kind == "toc":
            parts.append(render_toc_md(heads))
        elif block.kind == "paragraph":
            prefix = f'<a id="{block.ident}"></a>\n\n' if block.ident else ""
            parts.append(prefix + (render_inlines_md(block.inlines) if block.inlines else md_escape(block.text)))
            parts.append("")
        elif block.kind == "glossary":
            parts.append(render_inlines_md(block.inlines) if block.inlines else md_escape(block.text))
            parts.append("")
        elif block.kind == "quote":
            body = render_inlines_md(block.inlines) if block.inlines else md_escape(block.text)
            parts.append("> " + body.replace("\n", "\n> "))
            parts.append("")
        elif block.kind == "callout":
            body = render_inlines_md(block.inlines) if block.inlines else md_escape(block.text)
            parts.append(f'<aside class="callout">\n\n{body}\n\n</aside>')
            parts.append("")
        elif block.kind == "display_math":
            parts.append(f"$$\n{block.latex}\n$$")
            parts.append("")
        elif block.kind == "figure":
            parts.append(f'![{md_escape(block.alt)}]({block.src})')
            if block.caption:
                parts.append("")
                parts.append(f'*{md_escape(block.caption)}*')
            parts.append("")
        elif block.kind == "table":
            parts.append(md_table(block.rows))
            parts.append("")
            if block.caption:
                parts.append(f'*{md_escape(block.caption)}*')
                parts.append("")
        elif block.kind == "caption":
            parts.append(f'*{md_escape(block.text)}*')
            parts.append("")
    parts.extend([
        "",
        "## How to cite this paper",
        "",
        "Huchard, Y. (2026). *Enterprise Morphogenesis: how strategy becomes a target form, and how that form is generated, scaled, and kept viable under continuous change.* (Version 1.0) [White paper]. https://yannickhuchard.github.io/enterprise-morphogenesis/",
        "",
        "The GitHub Pages site is the canonical location of this white paper. The author's website is https://yannickhuchard.com.",
        "",
        "```bibtex",
        "@techreport{huchard2026enterprise-morphogenesis,",
        "  author      = {Huchard, Yannick},",
        "  title       = {Enterprise Morphogenesis: how strategy becomes a target form, and how that form is generated, scaled, and kept viable under continuous change.},",
        "  year        = {2026},",
        "  month       = aug,",
        "  version     = {1.0},",
        "  type        = {White paper},",
        "  url         = {https://yannickhuchard.github.io/enterprise-morphogenesis/}",
        "}",
        "```",
        "",
        "Machine-readable files: [CITATION.cff](CITATION.cff), [citation.bib](citation.bib), [citation.ris](citation.ris).",
        "Language models: [llms-full.txt](llms-full.txt), [llms.txt](llms.txt), [index.md](index.md).",
        "License: [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/).",
        "",
    ])
    return "\n".join(parts).rstrip() + "\n"


def render_article(blocks: list[Block]) -> str:
    heads = heading_list(blocks)
    html_parts = []
    for block in blocks:
        if block.kind == "heading":
            tag = f"h{block.level}"
            html_parts.append(
                f'<{tag} id="{html.escape(block.ident)}">{html.escape(block.text)}</{tag}>'
            )
        elif block.kind == "toc":
            html_parts.append(
                '<nav class="contents" aria-label="Table of contents">'
                "<h2 id='contents'>Contents</h2>"
                + render_toc_html(heads)
                + "</nav>"
            )
        elif block.kind == "paragraph":
            ident = f' id="{html.escape(block.ident)}"' if block.ident else ""
            html_parts.append(f"<p{ident}>{render_inlines_html(block.inlines)}</p>")
        elif block.kind == "glossary":
            html_parts.append(f'<p class="glossary-item">{render_inlines_html(block.inlines)}</p>')
        elif block.kind == "quote":
            html_parts.append(f"<blockquote>{render_inlines_html(block.inlines)}</blockquote>")
        elif block.kind == "callout":
            html_parts.append(
                f'<aside class="callout">{render_inlines_html(block.inlines)}</aside>'
            )
        elif block.kind == "display_math":
            html_parts.append(f'<div class="display-math">\\[{html.escape(block.latex)}\\]</div>')
        elif block.kind == "figure":
            cap = f"<figcaption>{html.escape(block.caption)}</figcaption>" if block.caption else ""
            html_parts.append(
                f'<figure><img src="{html.escape(block.src)}" alt="{html.escape(block.alt)}">{cap}</figure>'
            )
        elif block.kind == "table":
            html_parts.append(html_table(block.rows, block.caption))
        elif block.kind == "caption":
            html_parts.append(f'<p class="caption">{html.escape(block.text)}</p>')
    return "\n".join(html_parts)


def render_nav(blocks: list[Block]) -> str:
    items = []
    for h in heading_list(blocks):
        items.append(
            f'<li class="toc-l{h.level}"><a href="#{html.escape(h.ident)}">{html.escape(h.text)}</a></li>'
        )
    return "\n".join(items)


BARE_URL = re.compile(r"https?://[^\s<>\]]+")

# Publisher, DOI or institutional pages for references that the Word file did not hyperlink.
REFERENCE_LINKS = (
    ("An introduction to cybernetics", "https://archive.org/details/introductiontocy00ashb"),
    ("Brain of the firm", "https://www.wiley.com/en-us/Brain+of+the+Firm%2C+2nd+Edition-p-9780471948391"),
    ("Diagnosing the system for organizations", "https://www.wiley.com/en-us/Diagnosing+the+System+for+Organizations-p-9780471951360"),
    ("The enterprise architect profession: An empirical study", "https://research.chalmers.se/en/publication/224263"),
    ("Shared mental models in expert team decision making", "https://doi.org/10.4324/9780203772744-20"),
    ("The living company", "https://hbsp.harvard.edu/product/8202-PBK-ENG"),
    ("Building evolutionary architectures", "https://www.oreilly.com/library/view/building-evolutionary-architectures/9781492097532/"),
    ("Hidden order", "https://openlibrary.org/books/OL1272638M/Hidden_order"),
    ("ISO/IEC/IEEE 42010:2022", "https://www.iso.org/standard/74393.html"),
    ("The image of the city", "https://mitpress.mit.edu/9780262120043/the-image-of-the-city/"),
    ("The influence of shared mental models on team process", "https://doi.org/10.1037/0021-9010.85.2.273"),
    ("voyage au centre des organisations", "https://www.dunod.com/entreprise-economie/management-voyage-au-centre-des-organisations"),
    ("The hippocampus as a cognitive map", "https://discovery.ucl.ac.uk/id/eprint/10103569/"),
    ("Toward a theory of psychological ownership", "https://doi.org/10.5465/amr.2001.4378028"),
    ("Organizational culture and leadership", "https://www.wiley.com/en-us/Organizational+Culture+and+Leadership%2C+4th+Edition-p-9780470190609"),
    ("A leader’s framework for decision making", "https://hbr.org/2007/11/a-leaders-framework-for-decision-making"),
    ("ArchiMate", "https://pubs.opengroup.org/architecture/archimate32-doc/"),
    ("Cognitive maps in rats and men", "https://doi.org/10.1037/h0061626"),
    ("Canalization of development", "https://doi.org/10.1038/150563a0"),
    ("Genetic assimilation of an acquired character", "https://doi.org/10.1111/j.1558-5646.1953.tb00070.x"),
)


def block_has_http(block: Block) -> bool:
    if "http" in (block.text or ""):
        return True
    return any(
        (item.href or "").startswith("http") or "http" in (item.text or "")
        for item in block.inlines
    )


def linkify_bare_urls(inlines: list[Inline]) -> list[Inline]:
    out: list[Inline] = []
    for item in inlines:
        if item.kind != "text" or "http" not in item.text:
            out.append(item)
            continue
        pos = 0
        for match in BARE_URL.finditer(item.text):
            if match.start() > pos:
                out.append(Inline("text", item.text[pos : match.start()]))
            url = match.group(0).rstrip(".,;:)")
            out.append(Inline("link", text=url, href=url))
            pos = match.end()
        if pos < len(item.text):
            out.append(Inline("text", item.text[pos:]))
    return out


def lookup_reference_url(text: str) -> str | None:
    lowered = text.casefold()
    for needle, url in REFERENCE_LINKS:
        if needle.casefold() in lowered:
            return url
    return None


def enrich_references(blocks: list[Block]) -> None:
    in_refs = False
    for block in blocks:
        if block.kind == "heading" and block.text.strip().casefold() == "references":
            in_refs = True
            continue
        if not in_refs:
            continue
        if block.kind == "heading":
            break
        if block.kind != "paragraph" or not block.inlines:
            continue
        block.inlines = linkify_bare_urls(block.inlines)
        if block_has_http(block):
            continue
        url = lookup_reference_url(block.text or inlines_text(block.inlines))
        if not url:
            continue
        block.inlines.append(Inline("text", " "))
        block.inlines.append(Inline("link", text=url, href=url))
        block.text = (block.text + " " + url).strip()


AI_CRAWLERS = (
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "anthropic-ai",
    "Googlebot",
    "Google-Extended",
    "Bingbot",
    "msnbot",
    "PerplexityBot",
    "Perplexity-User",
    "Applebot",
    "Applebot-Extended",
    "Amazonbot",
    "cohere-ai",
    "Meta-ExternalAgent",
    "YouBot",
    "DuckDuckBot",
    "CCBot",
)


def write_robots_txt() -> str:
    lines = [
        "# Indexing and retrieval are allowed for search engines and language-model crawlers.",
        "# ChatGPT, Claude, Gemini, Grok, Perplexity, and Copilot may fetch this white paper.",
        "",
        "User-agent: *",
        "Allow: /",
        "",
    ]
    for agent in AI_CRAWLERS:
        lines.extend([f"User-agent: {agent}", "Allow: /", ""])
    lines.append(f"Sitemap: {PAPER_URL}sitemap.xml")
    lines.append("")
    return "\n".join(lines)


def write_llms_txt() -> str:
    return "\n".join(
        [
            "# Enterprise Morphogenesis",
            "",
            "> White paper by Yannick Huchard (Version 1.0, August 2026). Enterprise Architecture as the morphogenetic system of the enterprise: how strategy becomes a target form, and how that form is generated, scaled, and kept viable under continuous change.",
            "",
            f"Canonical HTML: {PAPER_URL}",
            f"Author: {AUTHOR_URL}",
            f"Source repository: {REPO_URL}",
            f"License: CC BY 4.0 ({LICENSE_URL}). There is no DOI.",
            "",
            "Use the Markdown or llms-full.txt files for retrieval, RAG, custom GPTs, Claude projects, Gemini Gems, Grok, Perplexity, and Copilot.",
            "",
            "## Full text",
            "",
            f"- [Markdown manuscript]({PAPER_URL}index.md): complete paper; preferred structured source",
            f"- [llms-full.txt]({PAPER_URL}llms-full.txt): complete paper as UTF-8 text",
            f"- [HTML]({PAPER_URL}): formatted reading copy",
            f"- [Word]({PAPER_URL}{WORD_DOWNLOAD}): publication Word file",
            f"- [Machine card]({PAPER_URL}paper.json): title, abstract, URLs",
            "",
            "## Citation",
            "",
            f"- [CITATION.cff]({PAPER_URL}CITATION.cff)",
            f"- [BibTeX]({PAPER_URL}citation.bib)",
            f"- [RIS]({PAPER_URL}citation.ris)",
            "",
            "## Agent skill",
            "",
            f"- [SKILL.md]({REPO_URL}/blob/main/skills/enterprise-morphogenesis/SKILL.md): operate as the morphogenetic system described in the paper",
            "",
        ]
    )


def write_sitemap() -> str:
    paths = [
        "",
        "index.md",
        "llms.txt",
        "llms-full.txt",
        "paper.json",
        "atom.xml",
        "LICENSE",
        "CITATION.cff",
        "citation.bib",
        "citation.ris",
        WORD_DOWNLOAD,
    ]
    urls = []
    for path in paths:
        loc = PAPER_URL if path == "" else f"{PAPER_URL}{path}"
        urls.append(
            "  <url>\n"
            f"    <loc>{loc}</loc>\n"
            "    <lastmod>2026-08-01</lastmod>\n"
            "    <changefreq>yearly</changefreq>\n"
            "  </url>"
        )
    return (
        '<?xml version="1.0" encoding="UTF-8"?>\n'
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'
        + "\n".join(urls)
        + "\n</urlset>\n"
    )


def write_atom() -> str:
    return f"""<?xml version="1.0" encoding="utf-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>Enterprise Morphogenesis</title>
  <subtitle>White paper by Yannick Huchard. Enterprise Architecture as the morphogenetic system of the enterprise.</subtitle>
  <link href="{PAPER_URL}" rel="alternate" type="text/html"/>
  <link href="{PAPER_URL}atom.xml" rel="self" type="application/atom+xml"/>
  <id>{PAPER_URL}</id>
  <updated>2026-08-01T00:00:00Z</updated>
  <author>
    <name>Yannick Huchard</name>
    <uri>{AUTHOR_URL}</uri>
  </author>
  <rights>Copyright (c) 2026 Yannick Huchard. Licensed under CC BY 4.0.</rights>
  <entry>
    <title>Enterprise Morphogenesis: how strategy becomes a target form, and how that form is generated, scaled, and kept viable under continuous change.</title>
    <link href="{PAPER_URL}" rel="alternate" type="text/html"/>
    <link href="{PAPER_URL}index.md" rel="alternate" type="text/markdown"/>
    <link href="{PAPER_URL}llms-full.txt" rel="alternate" type="text/plain"/>
    <id>{PAPER_URL}</id>
    <updated>2026-08-01T00:00:00Z</updated>
    <published>2026-08-01T00:00:00Z</published>
    <summary>Enterprise Architecture as the morphogenetic system of the enterprise: how strategy becomes a target form, and how that form is generated, scaled, and kept viable under continuous change.</summary>
  </entry>
</feed>
"""


def write_paper_json() -> str:
    card = {
        "@context": "https://schema.org",
        "@type": "ScholarlyArticle",
        "name": "Enterprise Morphogenesis: how strategy becomes a target form, and how that form is generated, scaled, and kept viable under continuous change.",
        "headline": "Enterprise Morphogenesis",
        "genre": "White paper",
        "version": "1.0",
        "datePublished": "2026-08",
        "inLanguage": "en-US",
        "isAccessibleForFree": True,
        "url": PAPER_URL,
        "author": {"@type": "Person", "name": "Yannick Huchard", "url": AUTHOR_URL},
        "abstract": (
            "Enterprise Architecture as the morphogenetic system of the enterprise: "
            "how strategy becomes a target form, and how that form is generated, "
            "scaled, and kept viable under continuous change."
        ),
        "encoding": [
            {"@type": "MediaObject", "encodingFormat": "text/html", "url": PAPER_URL},
            {
                "@type": "MediaObject",
                "encodingFormat": "text/markdown",
                "url": f"{PAPER_URL}index.md",
            },
            {
                "@type": "MediaObject",
                "encodingFormat": "text/plain",
                "url": f"{PAPER_URL}llms-full.txt",
            },
        ],
        "citation": (
            "Huchard, Y. (2026). Enterprise Morphogenesis: how strategy becomes a "
            "target form, and how that form is generated, scaled, and kept viable "
            "under continuous change. (Version 1.0) [White paper]. "
            f"{PAPER_URL}"
        ),
        "license": LICENSE_URL,
    }
    return json.dumps(card, indent=2, ensure_ascii=False) + "\n"


def write_discovery_files(md: str) -> None:
    well_known = DOCS / ".well-known"
    well_known.mkdir(parents=True, exist_ok=True)
    llms = write_llms_txt()
    (DOCS / "robots.txt").write_text(write_robots_txt(), encoding="utf-8")
    (DOCS / "llms.txt").write_text(llms, encoding="utf-8")
    (well_known / "llms.txt").write_text(llms, encoding="utf-8")
    (DOCS / "llms-full.txt").write_text(md, encoding="utf-8")
    (DOCS / "sitemap.xml").write_text(write_sitemap(), encoding="utf-8")
    (DOCS / "atom.xml").write_text(write_atom(), encoding="utf-8")
    (DOCS / "paper.json").write_text(write_paper_json(), encoding="utf-8")
    shutil.copy2(ROOT / "LICENSE", DOCS / "LICENSE")


def main() -> None:
    if not DOCX.exists():
        raise SystemExit(f"Missing source document: {DOCX}")
    FIGURES.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(DOCX) as zf:
        blocks = build_blocks(zf)
    enrich_references(blocks)

    md = render_markdown(blocks)
    (DOCS / "index.md").write_text(md, encoding="utf-8")

    article = render_article(blocks)
    nav = render_nav(blocks)
    template = TEMPLATE.read_text(encoding="utf-8")
    page = (
        template.replace("{{ARTICLE}}", article)
        .replace("{{NAV}}", nav)
    )
    (DOCS / "index.html").write_text(page, encoding="utf-8")
    (DOCS / ".nojekyll").write_text("", encoding="utf-8")
    shutil.copy2(DOCX, DOCS / WORD_DOWNLOAD)
    for name in ("CITATION.cff", "citation.bib", "citation.ris"):
        shutil.copy2(ROOT / name, DOCS / name)
    write_discovery_files(md)

    heads = heading_list(blocks)
    figs = [b for b in blocks if b.kind == "figure"]
    tables = [b for b in blocks if b.kind == "table"]
    mathn = sum(1 for b in blocks if b.kind == "display_math")
    print(f"Wrote {DOCS / 'index.md'} ({len(md):,} chars)")
    print(f"Wrote {DOCS / 'index.html'} ({len(page):,} chars)")
    print(f"Copied {WORD_DOWNLOAD}, CITATION.cff, citation.bib, citation.ris into docs/")
    print("Wrote robots.txt, llms.txt, llms-full.txt, sitemap.xml, atom.xml, paper.json, LICENSE")
    print(f"Headings {len(heads)} | figures {len(figs)} | tables {len(tables)} | display math {mathn} | blocks {len(blocks)}")


if __name__ == "__main__":
    main()
