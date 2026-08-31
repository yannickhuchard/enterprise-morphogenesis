(() => {
  const toggle = document.querySelector(".toc-toggle");
  const panel = document.querySelector("#mobile-toc");
  if (toggle && panel) {
    toggle.addEventListener("click", () => {
      const open = panel.hasAttribute("hidden");
      panel.toggleAttribute("hidden", !open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    panel.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        panel.setAttribute("hidden", "");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const links = [...document.querySelectorAll(".rail-toc a")];
  const ids = links
    .map((a) => document.getElementById(decodeURIComponent(a.hash.slice(1))))
    .filter(Boolean);

  if (!ids.length || !("IntersectionObserver" in window)) return;

  const map = new Map(ids.map((el, i) => [el.id, links[i]]));
  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      links.forEach((a) => a.removeAttribute("aria-current"));
      const link = map.get(visible.target.id);
      if (link) link.setAttribute("aria-current", "true");
    },
    { rootMargin: "-20% 0px -65% 0px", threshold: [0, 0.2, 0.6] }
  );
  ids.forEach((el) => io.observe(el));
})();
