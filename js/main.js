(function () {
  "use strict";

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

  // Text from third-party APIs (GitHub, Medium) must never be parsed as HTML.
  function esc(str) {
    return String(str == null ? "" : str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  // Medium article bodies are HTML; keep the markup but drop anything executable
  // and the tracking pixel Medium appends to every feed item.
  function sanitize(html) {
    var doc = new DOMParser().parseFromString(html || "", "text/html");
    doc.querySelectorAll("script,style,iframe,object,embed,form,img[src*='/_/stat']").forEach(function (n) {
      n.parentNode.removeChild(n);
    });
    doc.querySelectorAll("*").forEach(function (n) {
      Array.prototype.slice.call(n.attributes).forEach(function (a) {
        if (/^on/i.test(a.name) || /^\s*javascript:/i.test(a.value)) n.removeAttribute(a.name);
      });
      if (n.tagName === "A") { n.setAttribute("target", "_blank"); n.setAttribute("rel", "noopener"); }
    });
    return doc.body.innerHTML;
  }

  // Remember what had focus before a panel opened so closing it can hand focus back.
  var lastFocus = null;
  function openPanel(panel, overlay, focusEl) {
    lastFocus = document.activeElement;
    if (panel) panel.classList.add("open");
    if (overlay) overlay.classList.add("open");
    document.body.style.overflow = "hidden";
    if (focusEl) focusEl.focus();
  }
  function closePanel(panel, overlay) {
    if (!panel || !panel.classList.contains("open")) return;
    panel.classList.remove("open");
    if (overlay) overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (lastFocus && lastFocus.focus) lastFocus.focus();
    lastFocus = null;
  }

  // ==========================================
  // SCROLL REVEAL
  // ==========================================
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });

  $$(".reveal").forEach(function (el) { observer.observe(el); });

  // ==========================================
  // NAV — scroll indicator only, never hides
  // ==========================================
  var lastScroll = 0;
  var navbar = $("#navbar");

  window.addEventListener("scroll", function () {
    var c = window.pageYOffset;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (navbar) {
      navbar.classList.toggle("scrolled", c > 40);
      // REMOVED: navbar.classList.toggle("hidden", ...) — nav is always visible
    }
    lastScroll = c;
    var prog = $("#progress");
    if (prog && h > 0) prog.style.width = (c / h * 100) + "%";
  });

  var hamburger = $("#hamburger");
  var navLinks = $("#navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      hamburger.setAttribute("aria-expanded", navLinks.classList.toggle("open"));
    });
    navLinks.querySelectorAll("a").forEach(function (l) {
      l.addEventListener("click", function () {
        navLinks.classList.remove("open");
        hamburger.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ==========================================
  // TAB SWITCHING
  // ==========================================
  $$(".proj-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      $$(".proj-tab").forEach(function (t) { t.classList.remove("active"); t.setAttribute("aria-selected", "false"); });
      $$(".proj-pane").forEach(function (p) { p.classList.remove("active"); });
      tab.classList.add("active");
      tab.setAttribute("aria-selected", "true");
      var pane = $("#pane-" + tab.dataset.tab);
      if (pane) {
        pane.classList.add("active");
        if (tab.dataset.tab === "oss" && !window._ghLoaded) loadGitHub();
      }
    });
  });

  // ==========================================
  // CASE STUDY MODAL
  // ==========================================
  function openCaseStudy(i) {
    if (typeof CASE_STUDIES === "undefined" || !CASE_STUDIES[i]) return;
    var cs = CASE_STUDIES[i];
    var html = '<div class="cs-meta">' + cs.meta + '</div><h2 class="cs-title">' + cs.title + '</h2>';
    cs.sections.forEach(function (s) {
      if (s.type === "metrics") {
        html += '<div class="cs-section"><h3>' + s.heading + '</h3><div class="cs-metric-grid">';
        s.metrics.forEach(function (m) {
          html += '<div class="cs-metric"><div class="cs-metric-num">' + m.num + '</div><div class="cs-metric-label">' + m.label + '</div></div>';
        });
        html += '</div></div>';
      } else if (s.type === "timeline") {
        html += '<div class="cs-section"><h3>' + s.heading + '</h3><div class="cs-timeline">';
        s.items.forEach(function (it) {
          html += '<div class="cs-tl-item"><div class="cs-tl-phase">' + it.phase + '</div><div class="cs-tl-desc">' + it.desc + '</div></div>';
        });
        html += '</div></div>';
      } else if (s.tags) {
        html += '<div class="cs-section"><h3>' + s.heading + '</h3><div class="cs-tags">';
        s.tags.forEach(function (t) { html += '<span>' + t + '</span>'; });
        html += '</div></div>';
      } else {
        html += '<div class="cs-section"><h3>' + s.heading + '</h3>' + s.content + '</div>';
      }
      html += '<hr class="cs-divider">';
    });
    var csBody = $("#csBody");
    if (csBody) csBody.innerHTML = html;
    var csModal = $("#csModal");
    if (csModal) csModal.scrollTop = 0;
    openPanel(csModal, $("#csOverlay"), $("#csClose"));
  }

  function closeCaseStudy() { closePanel($("#csModal"), $("#csOverlay")); }

  var csClose = $("#csClose");
  var csOverlayEl = $("#csOverlay");
  if (csClose) csClose.addEventListener("click", closeCaseStudy);
  if (csOverlayEl) csOverlayEl.addEventListener("click", closeCaseStudy);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".proj-expand");
    if (btn) openCaseStudy(parseInt(btn.dataset.cs, 10));
  });

  // ==========================================
  // BLOG DRAWER
  // ==========================================
  function openDrawer(i) {
    var items = window._mediumItems;
    if (!items || !items[i]) return;
    var item = items[i];
    var date = new Date(item.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
    var cats = (item.categories || []).slice(0, 3).join(" · ") || "Article";
    var drawerBody = $("#drawerBody");
    if (drawerBody) {
      drawerBody.innerHTML =
        '<div class="drawer-cat">' + esc(cats) + '</div>' +
        '<h2 class="drawer-title" id="drawerTitle">' + esc(item.title) + '</h2>' +
        '<div class="drawer-date">' + date + ' · ' + esc(PROFILE.name) + '</div>' +
        '<div class="drawer-content">' + sanitize(item.content) + '</div>' +
        '<a href="' + esc(item.link) + '" target="_blank" rel="noopener" class="drawer-external">Read on Medium ↗</a>';
    }
    var drawer = $("#drawer");
    if (drawer) drawer.scrollTop = 0;
    openPanel(drawer, $("#drawerOverlay"), $("#drawerCloseBtn"));
  }

  function closeDrawer() { closePanel($("#drawer"), $("#drawerOverlay")); }

  var drawerCloseBtn = $("#drawerCloseBtn");
  var drawerOvEl = $("#drawerOverlay");
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
  if (drawerOvEl) drawerOvEl.addEventListener("click", closeDrawer);

  document.addEventListener("click", function (e) {
    var card = e.target.closest(".blog-card[data-index]");
    if (card) openDrawer(parseInt(card.dataset.index, 10));
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Enter" && e.key !== " ") return;
    var card = e.target.closest && e.target.closest(".blog-card[data-index]");
    if (card) { e.preventDefault(); openDrawer(parseInt(card.dataset.index, 10)); }
  });

  // Theme toggle: flip whatever is showing now and remember the choice.
  var themeToggle = $("#themeToggle");
  if (themeToggle) themeToggle.addEventListener("click", function () {
    var root = document.documentElement;
    var current = root.dataset.theme || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    root.dataset.theme = current === "light" ? "dark" : "light";
    try { localStorage.setItem("theme", root.dataset.theme); } catch (e) {}
  });

  // ==========================================
  // ESCAPE KEY
  // ==========================================
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeDrawer(); closeCaseStudy(); }
  });

  // ==========================================
  // ALL DATA RENDERING — gated on PROFILE
  // ==========================================
  if (typeof PROFILE === "undefined") return;
  var P = PROFILE;

  // -- Hero Tags --
  var heroTagsEl = $("#heroTags");
  if (heroTagsEl && P.heroTags) {
    P.heroTags.forEach(function (tag) {
      var span = document.createElement("span");
      span.textContent = tag;
      heroTagsEl.appendChild(span);
    });
  }

  // -- Stats (hero card and resume card share one source) --
  function statsHtml(numCls, labelCls) {
    return (P.stats || []).map(function (s) {
      return '<div><div class="' + numCls + '">' + s.num + (s.unit ? '<span>' + s.unit + '</span>' : '') + '</div>' +
        '<div class="' + labelCls + '">' + s.label + '</div></div>';
    }).join("");
  }
  var heroStatsEl = $("#heroStats");
  if (heroStatsEl) heroStatsEl.innerHTML = statsHtml("stat-number", "stat-label");

  // -- About Meta --
  var aboutMetaEl = $("#aboutMeta");
  if (aboutMetaEl && P.meta) {
    aboutMetaEl.innerHTML = P.meta.map(function (row) {
      return '<div class="meta-row">' +
        '<span class="meta-key">' + row.key + '</span>' +
        '<span class="meta-val"' + (row.color ? ' style="color:' + row.color + '"' : '') + '>' + row.val + '</span>' +
        '</div>';
    }).join("");
  }

  // -- Skills Grid --
  var skillsGrid = $("#skillsGrid");
  if (skillsGrid && P.skills) {
    skillsGrid.innerHTML = P.skills.map(function (group) {
      var tagsHtml = group.items.map(function (item, i) {
        var isHot = group.hot && group.hot.indexOf(i) !== -1;
        return '<span class="skill-tag' + (isHot ? ' hot' : '') + '">' + item + '</span>';
      }).join("");
      return '<div class="skill-group reveal">' +
        '<div class="skill-cat">' + group.cat + '</div>' +
        '<div class="skill-items">' + tagsHtml + '</div>' +
        '</div>';
    }).join("");
    skillsGrid.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  // -- Experience List (improved) --
  var expList = $("#expList");
  if (expList && P.experience) {
    expList.innerHTML = P.experience.map(function (job, idx) {
      var isLive = !!job.live;
      var leftHtml = isLive
        ? '<div class="exp-live"><span class="exp-live-dot"></span>Current</div>'
        : "";

      var tagsHtml = job.tags
        ? '<div class="exp-tags">' + job.tags.map(function (t) {
            return '<span class="exp-tag">' + t + '</span>';
          }).join("") + '</div>'
        : "";

      return '<div class="exp-row' + (isLive ? ' exp-live-row' : '') + ' reveal" style="transition-delay:' + (idx * .07) + 's">' +
        '<div class="exp-left">' +
          leftHtml +
          '<div class="exp-period">' + job.period + '</div>' +
        '</div>' +
        '<div class="exp-right">' +
          '<div class="exp-role">' + job.role + '</div>' +
          '<div class="exp-co">' + job.company + '</div>' +
          bulletsHtml(job.bullets) +
          tagsHtml +
        '</div>' +
        '</div>';
    }).join("");
    expList.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  // Long roles show their first three bullets; the rest sit behind a native <details>.
  function bulletsHtml(list) {
    function ul(items) { return '<ul class="exp-bullets">' + items.map(function (b) { return '<li>' + b + '</li>'; }).join("") + '</ul>'; }
    if (list.length <= 4) return ul(list);
    return ul(list.slice(0, 3)) +
      '<details class="exp-more"><summary>Show ' + (list.length - 3) + ' more</summary>' + ul(list.slice(3)) + '</details>';
  }

  // -- Work Projects --
  var workGrid = $("#workGrid");
  if (workGrid && P.projects) {
    workGrid.innerHTML = P.projects.map(function (proj, i) {
      var tagsHtml = proj.tags.map(function (t) { return '<span class="proj-tag">' + t + '</span>'; }).join("");
      var csBtn = typeof proj.caseStudy === "number"
        ? '<button class="proj-expand" data-cs="' + proj.caseStudy + '">Case study →</button>'
        : "";
      return '<div class="proj-card reveal" style="transition-delay:' + (i * .06) + 's">' +
        '<div class="proj-title">' + proj.title + '</div>' +
        '<div class="proj-desc">' + proj.desc + '</div>' +
        (proj.impact ? '<div class="proj-impact">↑ ' + proj.impact + '</div>' : '') +
        '<div class="proj-tags">' + tagsHtml + '</div>' +
        '<div class="proj-foot">' +
          '<span class="proj-cat">' + proj.cat + '</span>' +
          '<div class="proj-actions">' + csBtn + '</div>' +
        '</div>' +
        '</div>';
    }).join("");
    workGrid.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  // -- Contact Links --
  var contactLinks = $("#contactLinks");
  if (contactLinks && P.contact) {
    contactLinks.innerHTML = P.contact.map(function (c) {
      var isExternal = c.href.startsWith("http");
      return '<a class="contact-link reveal" href="' + c.href + '"' +
        (isExternal ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<div>' +
          '<div class="cl-label">' + c.label + '</div>' +
          '<div class="cl-val">' + c.val + '</div>' +
        '</div>' +
        '<span class="c-arrow">→</span>' +
        '</a>';
    }).join("");
    contactLinks.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  // -- Footer --
  var footerCopy = $("#footerCopy");
  if (footerCopy) {
    footerCopy.textContent = "© " + new Date().getFullYear() + " " + P.name + " — " + P.location;
  }
  var footerLinks = $("#footerLinks");
  if (footerLinks) {
    footerLinks.innerHTML = [
      { label: "LinkedIn", href: P.linkedin },
      { label: "GitHub", href: P.github },
      { label: "Medium", href: P.medium }
    ].map(function (l) {
      return '<a href="' + l.href + '" target="_blank" rel="noopener">' + l.label + '</a>';
    }).join("");
  }

  // ==========================================
  // RESUME — clean card (no full inline CV)
  // ==========================================
  var resumeBody = $("#resumeBody");
  if (resumeBody) {
    var certHtml = (P.certifications || []).map(function (c) {
      return '<div class="rc-cert">' +
        '<span class="rc-cert-name">' + c.name + '</span>' +
        '<a href="' + c.url + '" target="_blank" class="rc-cert-link">Verify ↗</a>' +
        '</div>';
    }).join("");

    var eduHtml = (P.education || []).map(function (e) {
      return '<div class="rc-edu-item">' +
        '<div class="rc-edu-deg">' + e.degree + '</div>' +
        '<div class="rc-edu-sch">' + e.school + '</div>' +
        '</div>';
    }).join("");

    resumeBody.innerHTML =
      '<div class="resume-card">' +
        '<div class="rc-left"><div class="rc-section-lbl">Education</div>' + eduHtml + '</div>' +
        '<div class="rc-right"><div class="rc-section-lbl">Certification</div>' + certHtml + '</div>' +
      '</div>';
  }

  // -- Open source contributions (curated) --
  var ossGrid = $("#ossGrid");
  if (ossGrid && P.openSource) {
    ossGrid.innerHTML = P.openSource.map(function (o, i) {
      return '<div class="proj-card reveal" style="transition-delay:' + (i * .05) + 's">' +
        '<div class="proj-num">' + o.role + '</div>' +
        '<div class="proj-title">' + o.title + '</div>' +
        '<div class="proj-desc">' + o.desc + '</div>' +
        '<div class="proj-tags">' + o.tags.map(function (t) { return '<span class="proj-tag">' + t + '</span>'; }).join("") + '</div>' +
        '<div class="proj-foot"><span></span>' +
          '<a class="proj-expand" href="' + o.href + '" target="_blank" rel="noopener">View ↗</a>' +
        '</div></div>';
    }).join("");
    ossGrid.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  // ==========================================
  // GITHUB REPOS (lazy — only on tab click)
  // ==========================================
  window._ghLoaded = false;
  function loadGitHub() {
    window._ghLoaded = true;
    var ghGrid = $("#ghGrid");
    if (!ghGrid || !P.githubUser) return;
    var langColors = {
      JavaScript: "#f1e05a", TypeScript: "#3178c6", Python: "#3572A5",
      Go: "#00ADD8", Shell: "#89e051", HTML: "#e34c26", CSS: "#563d7c",
      Dockerfile: "#384d54", HCL: "#844FBA"
    };
    fetch("https://api.github.com/users/" + P.githubUser + "/repos?sort=updated&per_page=30")
      .then(function (r) { return r.json(); })
      .then(function (repos) {
        if (!Array.isArray(repos) || !repos.length) throw new Error("empty");
        ghGrid.innerHTML = repos.filter(function (r) { return !r.fork; }).slice(0, 9).map(function (r, i) {
          var dotColor = langColors[r.language] || "#888";
          var langDot = r.language
            ? '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:' + dotColor + ';vertical-align:middle;margin-right:5px"></span>' + esc(r.language)
            : "—";
          return '<div class="proj-card reveal" style="transition-delay:' + (i * .05) + 's">' +
            '<div class="proj-title">' + esc(r.name.replace(/-/g, " ")) + '</div>' +
            '<div class="proj-desc">' + esc(r.description || "No description provided.") + '</div>' +
            '<div class="proj-foot">' +
              '<div style="font-family:var(--mono);font-size:.78rem;color:var(--ink-muted);display:flex;gap:.75rem;align-items:center">' +
                '<span>' + langDot + '</span>' +
                '<span>★ ' + r.stargazers_count + '</span>' +
                '<span>⑂ ' + r.forks_count + '</span>' +
              '</div>' +
              '<a class="proj-expand" href="' + esc(r.html_url) + '" target="_blank" rel="noopener">View on GitHub ↗</a>' +
            '</div></div>';
        }).join("");
        ghGrid.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
      })
      .catch(function () {
        ghGrid.innerHTML = '<div class="loading-cell"><div class="loading-text">Could not load repos. <a href="' + P.github + '" target="_blank" style="color:var(--accent)">View on GitHub →</a></div></div>';
      });
  }

  // ==========================================
  // MEDIUM FEED
  // ==========================================
  var blogGrid = $("#blogGrid");
  if (blogGrid) {
    fetch("https://api.rss2json.com/v1/api.json?rss_url=" + encodeURIComponent("https://medium.com/feed/@" + P.mediumUser))
      .then(function (r) { return r.json(); })
      .then(function (data) {
        if (data.status !== "ok" || !data.items || !data.items.length) throw new Error("no items");
        var items = data.items.slice(0, 6);
        window._mediumItems = items;

        blogGrid.innerHTML = items.map(function (item, i) {
          var cat = esc((item.categories || [])[0] || "Article");
          var date = new Date(item.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
          var words = (item.content || "").replace(/<[^>]*>/g, "").split(/\s+/).length;
          var readTime = Math.max(1, Math.round(words / 200));
          var excerpt = esc(new DOMParser().parseFromString(item.description || "", "text/html").body.textContent.trim().substring(0, 120)) + "…";

          // Best-effort thumbnail extraction
          var thumb = item.thumbnail
            || (item.enclosure && item.enclosure.link)
            || ((item.content || "").match(/<img[^>]+src="([^">]+)"/) || [])[1]
            || "";

          // Only show thumb if we actually have one — otherwise use compact placeholder
          var mediaHtml = thumb
            ? '<div class="bc-thumb"><img src="' + esc(thumb) + '" alt="" loading="lazy" onerror="this.parentElement.style.display=\'none\'"></div>'
            : '<div class="bc-ph"><span>' + esc(item.title.charAt(0).toUpperCase()) + '</span></div>';

          return '<div class="blog-card reveal" role="button" tabindex="0" aria-label="Read: ' + esc(item.title) + '" data-index="' + i + '" style="transition-delay:' + (i * .05) + 's">' +
            mediaHtml +
            '<div class="bc-body">' +
              '<div class="bc-meta">' +
                '<span>' + cat + '</span>' +
                '<span class="bc-sep">·</span>' +
                '<span>' + date + '</span>' +
                '<span class="bc-sep">·</span>' +
                '<span>' + readTime + ' min read</span>' +
              '</div>' +
              '<div class="bc-title">' + esc(item.title) + '</div>' +
              '<div class="bc-excerpt">' + excerpt + '</div>' +
            '</div>' +
            '<div class="bc-foot">' +
              '<span class="bc-read">Read article</span>' +
              '<span class="bc-arrow">↗</span>' +
            '</div>' +
            '</div>';
        }).join("");

        blogGrid.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
      })
      .catch(function () {
        blogGrid.innerHTML = '<div class="loading-cell">' +
          '<div class="loading-text">Could not load feed. ' +
          '<a href="' + P.medium + '" target="_blank" style="color:var(--accent)">Read on Medium →</a>' +
          '</div></div>';
      });
  }

})();
