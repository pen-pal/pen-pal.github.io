(function () {
  "use strict";

  const P = PROFILE;
  const year = new Date().getFullYear();

  // ==========================================
  // UTILITIES
  // ==========================================
  function $(sel) { return document.querySelector(sel) }
  function $$(sel) { return document.querySelectorAll(sel) }
  function el(tag, attrs, children) {
    const e = document.createElement(tag);
    if (attrs) Object.entries(attrs).forEach(([k, v]) => {
      if (k === "class") e.className = v;
      else if (k === "html") e.innerHTML = v;
      else e.setAttribute(k, v);
    });
    if (children) children.forEach(c => {
      if (typeof c === "string") e.appendChild(document.createTextNode(c));
      else if (c) e.appendChild(c);
    });
    return e;
  }

  // ==========================================
  // RENDER: HERO
  // ==========================================
  const heroTags = ("#heroTags");
  P.heroTags.forEach(t => {
    heroTags.appendChild(el("span", { class: "hero-tag" }, [t]));
  });

  // ==========================================
  // RENDER: MARQUEE
  // ==========================================
  const marquee = $("#marquee");
  const marqueeHTML = [...P.marqueeItems, ...P.marqueeItems].map(m => `<span>${m}</span>`).join("");
  marquee.innerHTML = marqueeHTML;

  // ==========================================
  // RENDER: ABOUT META
  // ==========================================
  const aboutMeta = $("#aboutMeta");
  P.meta.forEach(m => {
    const row = el("div", { class: "a-row" });
    row.appendChild(el("div", { class: "a-key" }, [m.key]));
    const val = el("div", { class: "a-val" }, [m.val]);
    if (m.color) val.style.color = m.color;
    row.appendChild(val);
    aboutMeta.appendChild(row);
  });

  // ==========================================
  // RENDER: SKILLS
  // ==========================================
  const skillsGrid = $("#skillsGrid");
  P.skills.forEach((s, i) => {
    const cell = el("div", { class: "reveal" });
    cell.style.transitionDelay = `${i * 0.04}s`;
    cell.innerHTML = `
      <div class="skill-cat">${s.cat}</div>
      <div class="skill-items">
        ${s.items.map((item, j) =>
          `<span class="skill-item${s.hot && s.hot.includes(j) ? " hot" : ""}">${item}</span>`
        ).join("")}
      </div>`;
    skillsGrid.appendChild(cell);
  });

  // ==========================================
  // RENDER: EXPERIENCE
  // ==========================================
  const expList = $("#expList");
  P.experience.forEach((e, i) => {
    const row = el("div", { class: "exp-row reveal" });
    row.style.transitionDelay = `${i * 0.06}s`;
    row.innerHTML = `
      <div>
        ${e.live ? '<div class="exp-live"><span class="exp-live-dot"></span>Current</div>' : ""}
        <div class="exp-date">${e.period}</div>
        <div class="exp-badge">${e.badge}</div>
      </div>
      <div>
        <div class="exp-role">${e.role}</div>
        <div class="exp-co">${e.company}</div>
        <ul class="exp-bullets">${e.bullets.map(b => `<li>${b}</li>`).join("")}</ul>
        <div class="exp-tags">${e.tags.map(t => `<span class="exp-tag">${t}</span>`).join("")}</div>
      </div>
      <div class="exp-ghost" aria-hidden="true">0${i + 1}</div>`;
    expList.appendChild(row);
  });

  // ==========================================
  // RENDER: PROJECTS
  // ==========================================
  const workGrid = $("#workGrid");
  P.projects.forEach((p, i) => {
    const card = el("div", { class: "proj-card reveal" });
    card.style.transitionDelay = `${i * 0.06}s`;
    card.innerHTML = `
      <div class="proj-num">${p.num}</div>
      <div class="proj-title">${p.title}</div>
      <div class="proj-desc">${p.desc}</div>
      <div class="proj-impact">${p.impact}</div>
      <div class="proj-tags">${p.tags.map(t => `<span class="proj-tag">${t}</span>`).join("")}</div>
      <div class="proj-foot">
        <span class="proj-cat">${p.cat}</span>
        <button class="proj-expand" data-cs="${p.caseStudy}">Case study →</button>
      </div>`;
    workGrid.appendChild(card);
  });

  // Case study buttons
  document.addEventListener("click", e => {
    const btn = e.target.closest(".proj-expand");
    if (btn) openCaseStudy(parseInt(btn.dataset.cs));
  });

  // ==========================================
  // RENDER: RESUME
  // ==========================================
  const resumeBody = $("#resumeBody");

  // Sidebar
  const sidebar = el("div", { class: "resume-sidebar" });
  sidebar.innerHTML = `
    <div class="rs-title">Core Competencies</div>
    ${P.skillsResume.map(s => `
      <div class="skill-bar-row">
        <div class="skill-bar-top">
          <span class="skill-bar-name">${s.name}</span>
          <span class="skill-bar-pct">${s.pct}%</span>
        </div>
        <div class="skill-bar-track"><div class="skill-bar-fill" style="width:${s.pct}%"></div></div>
      </div>`).join("")}
    <div class="rs-section" style="margin-top:2rem">
      <div class="rs-title">Languages</div>
      ${P.languages.map(l => `<div class="lang-item"><span>${l.lang}</span><span class="lang-lv">${l.level}</span></div>`).join("")}
    </div>
    <div class="rs-section" style="margin-top:2rem">
      <div class="rs-title">Education</div>
      ${P.education.map(e => `<div class="edu-item"><div class="edu-deg">${e.degree}</div><div class="edu-school">${e.school}</div></div>`).join("")}
    </div>
    <div class="rs-section" style="margin-top:2rem">
      <div class="rs-title">Certifications</div>
      ${P.certifications.map(c => `
        <div class="cert-item">
          <span class="cert-name">${c.name}</span>
          <a href="${c.url}" target="_blank" class="cert-link">Verify →</a>
        </div>`).join("")}
    </div>`;
  resumeBody.appendChild(sidebar);

  // Main experience
  const main = el("div");
  P.resumeExp.forEach((e, i) => {
    const item = el("div", { class: "resume-exp reveal" });
    item.style.transitionDelay = `${i * 0.05}s`;
    item.innerHTML = `
      <div class="re-head">
        <span class="re-role">${e.role}</span>
        <span class="re-dates">${e.dates}</span>
      </div>
      <div class="re-company">${e.company}</div>
      <ul class="re-bullets">${e.bullets.map(b => `<li>${b}</li>`).join("")}</ul>`;
    main.appendChild(item);
  });
  resumeBody.appendChild(main);

  // ==========================================
  // RENDER: CONTACT
  // ==========================================
  const contactLinks = $("#contactLinks");
  P.contact.forEach((c, i) => {
    const link = el("a", { class: "c-link reveal", href: c.href });
    if (c.href.startsWith("http")) link.target = "_blank";
    link.style.transitionDelay = `${i * 0.05}s`;
    link.innerHTML = `
      <div>
        <div class="c-label">${c.label}</div>
        <div class="c-val">${c.val}</div>
      </div>
      <span class="c-arrow">↗</span>`;
    contactLinks.appendChild(link);
  });

  // ==========================================
  // RENDER: FOOTER
  // ==========================================
  $("#footerCopy").textContent = `© ${year} ${P.name} · ${P.location}`;
  $("#footerLinks").innerHTML = `
    <a href="${P.github}" target="_blank">GitHub</a>
    <a href="${P.linkedin}" target="_blank">LinkedIn</a>
    <a href="${P.medium}" target="_blank">Medium</a>
    <a href="mailto:${P.email}">Email</a>`;

  // ==========================================
  // SCROLL REVEAL
  // ==========================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

  $$$$(".reveal").forEach(el => observer.observe(el));

  // ==========================================
  // NAV BEHAVIOR
  // ==========================================
  let lastScroll = 0;
  const navbar = $("#navbar");

  window.addEventListener("scroll", () => {
    const c = window.pageYOffset;
    const h = document.documentElement.scrollHeight - window.innerHeight;
    navbar.classList.toggle("scrolled", c > 40);
    navbar.classList.toggle("hidden", c > lastScroll && c > 100);
    lastScroll = c;
    $("#progress").style.width = (c / h * 100) + "%";
  });

  // Hamburger
  const hamburger = $("#hamburger");
  const navLinks = $("#navLinks");
  hamburger.addEventListener("click", () => navLinks.classList.toggle("open"));
  navLinks.querySelectorAll("a").forEach(l =>
    l.addEventListener("click", () => navLinks.classList.remove("open"))
  );

  // ==========================================
  // TAB SWITCHING
  // ==========================================
  $$(".proj-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      $$(".proj-tab").forEach(t => t.classList.remove("active"));
      $$(".proj-pane").forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      $(`#pane-${tab.dataset.tab}`).classList.add("active");
    });
  });

  // ==========================================
  // GITHUB REPOS
  // ==========================================
  fetch(`https://api.github.com/users/${P.githubUser}/repos?sort=updated&per_page=6`)
    .then(r => r.json())
    .then(repos => {
      const grid = $("#ghGrid");
      if (!Array.isArray(repos) || repos.length === 0) {
        grid.innerHTML = `<div class="loading-cell"><div class="loading-text">No public repos. <a href="${P.github}" target="_blank" style="color:var(--accent)">View on GitHub →</a></div></div>`;
        return;
      }
      const langColors = {
        JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
        Go: "#00ADD8", Shell: "#89e051", HTML: "#e34c26", CSS: "#563d7c",
        Dockerfile: "#384d54", HCL: "#844FBA"
      };
      grid.innerHTML = repos.filter(r => !r.fork).slice(0, 6).map((r, i) => `
        <div class="proj-card reveal" style="animation-delay:${i * .06}s">
          <div class="proj-num">${r.language || "—"}</div>
          <div class="proj-title">${r.name.replace(/-/g, " ")}</div>
          <div class="proj-desc">${r.description || "No description provided."}</div>
          <div class="proj-foot">
            <div style="display:flex;gap:1rem;font-family:var(--mono);font-size:.68rem;color:var(--ink-muted)">
              ${r.language ? `<span><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${langColors[r.language] || "#888"};vertical-align:middle;margin-right:4px"></span>${r.language}</span>` : ""}
              <span>★ ${r.stargazers_count}</span>
              <span>⑂ ${r.forks_count}</span>
            </div>
            <a href="${r.html_url}" target="_blank" style="font-family:var(--mono);font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);text-decoration:none">View →</a>
          </div>
        </div>`).join("");
      grid.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    })
    .catch(() => {
      $("#ghGrid").innerHTML = `<div class="loading-cell"><div class="loading-text">Could not load repos. <a href="${P.github}" target="_blank" style="color:var(--accent)">View on GitHub →</a></div></div>`;
    });

  // ==========================================
  // MEDIUM FEED
  // ==========================================
  fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${P.mediumUser}`)
    .then(r => r.json())
    .then(data => {
      const grid = $("#blogGrid");
      if (data.status !== "ok" || !data.items?.length) {
        grid.innerHTML = `<div class="loading-cell"><div class="loading-text">Could not load feed. <a href="${P.medium}" target="_blank" style="color:var(--accent)">Read on Medium →</a></div></div>`;
        return;
      }
      const items = data.items.slice(0, 6);
      grid.innerHTML = items.map((item, i) => {
        const cat = (item.categories || [])[0] || "Article";
        const date = new Date(item.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
        const excerpt = item.description.replace(/<[^>]*>/g, "").substring(0, 120).trim() + "…";
        const thumb = item.thumbnail || (item.content.match(/<img[^>]+src="([^">]+)"/) || [])[1] || "";
        return `
          <div class="blog-card reveal" style="animation-delay:${i * .06}s" data-index="${i}">
            ${thumb
              ? `<div class="bc-thumb"><img src="${thumb}" alt="" loading="lazy" onerror="this.parentElement.innerHTML='<div class=bc-ph><span>MK</span></div>'"></div>`
              : '<div class="bc-ph"><span>MK</span></div>'}
            <div class="bc-body">
              <div class="bc-cat">${cat}</div>
              <h3 class="bc-title">${item.title}</h3>
              <p class="bc-excerpt">${excerpt}</p>
            </div>
            <div class="bc-foot"><span class="bc-date">${date}</span><span class="bc-read">Read →</span></div>
          </div>`;
      }).join("");
      window._mediumItems = items;
      grid.querySelectorAll(".reveal").forEach(el => observer.observe(el));
    })
    .catch(() => {
      $("#blogGrid").innerHTML = `<div class="loading-cell"><div class="loading-text">Could not load articles. <a href="${P.medium}" target="_blank" style="color:var(--accent)">Read on Medium →</a></div></div>`;
    });

  // Blog card click
  document.addEventListener("click", e => {
    const card = e.target.closest(".blog-card[data-index]");
    if (card) openDrawer(parseInt(card.dataset.index));
  });

  // ==========================================
  // BLOG DRAWER
  // ==========================================
  function openDrawer(i) {
    const item = window._mediumItems?.[i];
    if (!item) return;
    const date = new Date(item.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    $("#drawerBody").innerHTML = `
      <div class="drawer-cat">${(item.categories || []).slice(0, 3).join(" · ") || "Article"}</div>
      <h2 class="drawer-title">${item.title}</h2>
      <div class="drawer-date">${date} · ${P.name}</div>
      <div class="drawer-content">${item.content}</div>
      <a href="${item.link}" target="_blank" class="drawer-external">Read on Medium ↗</a>`;
    $("#drawer").classList.add("open");
    $("#drawerOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    $("#drawer").classList.remove("open");
    $("#drawerOverlay").classList.remove("open");
    document.body.style.overflow = "";
  }

  $("#drawerCloseBtn").addEventListener("click", closeDrawer);
  $("#drawerOverlay").addEventListener("click", closeDrawer);

  // ==========================================
  // CASE STUDY MODAL
  // ==========================================
  function openCaseStudy(i) {
    const cs = CASE_STUDIES[i];
    if (!cs) return;
    let html = `<div class="cs-meta">${cs.meta}</div><h2 class="cs-title">${cs.title}</h2>`;
    cs.sections.forEach(s => {
      if (s.type === "metrics") {
        html += `<div class="cs-section"><h3>${s.heading}</h3><div class="cs-metric-grid">${s.metrics.map(m => `<div class="cs-metric"><div class="cs-metric-num">${m.num}</div><div class="cs-metric-label">${m.label}</div></div>`).join("")}</div></div>`;
      } else if (s.type === "timeline") {
        html += `<div class="cs-section"><h3>${s.heading}</h3><div class="cs-timeline">${s.items.map(it => `<div class="cs-tl-item"><div class="cs-tl-phase">${it.phase}</div><div class="cs-tl-desc">${it.desc}</div></div>`).join("")}</div></div>`;
      } else if (s.tags) {
        html += `<div class="cs-section"><h3>${s.heading}</h3><div class="cs-tags">${s.tags.map(t => `<span>${t}</span>`).join("")}</div></div>`;
      } else {
        html += `<div class="cs-section"><h3>${s.heading}</h3>${s.content}</div>`;
      }
      html += '<hr class="cs-divider">';
    });
    $("#csBody").innerHTML = html;
    $("#csModal").classList.add("open");
    $("#csOverlay").classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCaseStudy() {
    $("#csModal").classList.remove("open");
    $("#csOverlay").classList.remove("open");
    document.body.style.overflow = "";
  }

  $("#csClose").addEventListener("click", closeCaseStudy);
  $("#csOverlay").addEventListener("click", closeCaseStudy);

  // ==========================================
  // PRINT
  // ==========================================
  $("#printBtn").addEventListener("click", () => window.print());

  // ==========================================
  // ESCAPE KEY
  // ==========================================
  document.addEventListener("keydown", e => {
    if (e.key === "Escape") { closeDrawer(); closeCaseStudy(); }
  });

})();

