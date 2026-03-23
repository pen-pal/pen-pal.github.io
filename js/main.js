(function () {
  "use strict";

  function $(sel) { return document.querySelector(sel); }
  function $$(sel) { return document.querySelectorAll(sel); }

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

  $$(".reveal").forEach(function (el) { observer.observe(el); });   // FIX: was $$$$ 

  // ==========================================
  // NAV
  // ==========================================
  var lastScroll = 0;
  var navbar = $("#navbar");

  window.addEventListener("scroll", function () {
    var c = window.pageYOffset;
    var h = document.documentElement.scrollHeight - window.innerHeight;
    if (navbar) {
      navbar.classList.toggle("scrolled", c > 40);
      navbar.classList.toggle("hidden", c > lastScroll && c > 100);
    }
    lastScroll = c;
    var prog = $("#progress");
    if (prog && h > 0) prog.style.width = (c / h * 100) + "%";
  });

  var hamburger = $("#hamburger");
  var navLinks = $("#navLinks");
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
    navLinks.querySelectorAll("a").forEach(function (l) {
      l.addEventListener("click", function () { navLinks.classList.remove("open"); });
    });
  }

  // ==========================================
  // TAB SWITCHING
  // ==========================================
  $$(".proj-tab").forEach(function (tab) {
    tab.addEventListener("click", function () {
      $$(".proj-tab").forEach(function (t) { t.classList.remove("active"); });
      $$(".proj-pane").forEach(function (p) { p.classList.remove("active"); }); // FIX: was truncated
      tab.classList.add("active");
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
        html += '<div class="cs-section"><h3>' + s.heading + '</h3><div class="cs-metric-grid">'; // FIX: corrupted </h3>
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
    var csOverlay = $("#csOverlay");
    if (csModal) csModal.classList.add("open");
    if (csOverlay) csOverlay.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeCaseStudy() {
    var csModal = $("#csModal");
    var csOverlay = $("#csOverlay");
    if (csModal) csModal.classList.remove("open");
    if (csOverlay) csOverlay.classList.remove("open");
    document.body.style.overflow = "";
  }

  var csClose = $("#csClose");
  var csOverlayEl = $("#csOverlay");
  if (csClose) csClose.addEventListener("click", closeCaseStudy);
  if (csOverlayEl) csOverlayEl.addEventListener("click", closeCaseStudy);

  document.addEventListener("click", function (e) {
    var btn = e.target.closest(".proj-expand");
    if (btn) openCaseStudy(parseInt(btn.dataset.cs));
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
        '<div class="drawer-cat">' + cats + '</div>' +
        '<h2 class="drawer-title">' + item.title + '</h2>' +
        '<div class="drawer-date">' + date + ' · Manish Khadka</div>' +
        '<div class="drawer-content">' + item.content + '</div>' +
        '<a href="' + item.link + '" target="_blank" class="drawer-external">Read on Medium ↗</a>';
    }
    var drawer = $("#drawer");
    var drawerOv = $("#drawerOverlay");
    if (drawer) drawer.classList.add("open");
    if (drawerOv) drawerOv.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    var drawer = $("#drawer");
    var drawerOv = $("#drawerOverlay");
    if (drawer) drawer.classList.remove("open");
    if (drawerOv) drawerOv.classList.remove("open");
    document.body.style.overflow = "";
  }

  var drawerCloseBtn = $("#drawerCloseBtn");
  var drawerOvEl = $("#drawerOverlay");
  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
  if (drawerOvEl) drawerOvEl.addEventListener("click", closeDrawer);

  document.addEventListener("click", function (e) {
    var card = e.target.closest(".blog-card[data-index]");
    if (card) openDrawer(parseInt(card.dataset.index));
  });

  // ==========================================
  // PRINT
  // ==========================================
  var printBtn = $("#printBtn");
  if (printBtn) printBtn.addEventListener("click", function () { window.print(); });

  // ==========================================
  // ESCAPE KEY
  // ==========================================
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeDrawer(); closeCaseStudy(); }
  });

  // ==========================================
  // DATA RENDERING (all gated on PROFILE)
  // ==========================================
  if (typeof PROFILE === "undefined") return;
  var P = PROFILE;

  // -- Hero Tags --
  var heroTagsEl = $("#heroTags"); // FIX: was shadowing PROFILE.heroTags array
  if (heroTagsEl && P.heroTags) {
    P.heroTags.forEach(function (tag) {
      var span = document.createElement("span");
      span.textContent = tag;
      heroTagsEl.appendChild(span);
    });
  }

  // -- Marquee --
  var marqueeEl = $("#marquee");
  if (marqueeEl && P.marqueeItems) {
    var items = P.marqueeItems.concat(P.marqueeItems); // duplicate for seamless loop
    marqueeEl.innerHTML = items.map(function (item) {
      return '<span class="marquee-item">' + item + '</span>';
    }).join('<span class="marquee-sep">·</span>');
  }

  // -- About Meta --
  var aboutMeta = $("#aboutMeta");
  if (aboutMeta && P.meta) {
    aboutMeta.innerHTML = P.meta.map(function (row) {
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
      var itemsHtml = group.items.map(function (item, i) {
        var hot = group.hot && group.hot.indexOf(i) !== -1;
        return '<span class="skill-tag' + (hot ? ' hot' : '') + '">' + item + '</span>';
      }).join("");
      return '<div class="skill-group reveal">' +
        '<div class="skill-cat">' + group.cat + '</div>' +
        '<div class="skill-items">' + itemsHtml + '</div>' +
        '</div>';
    }).join("");
    skillsGrid.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  // -- Experience List --
  var expList = $("#expList");
  if (expList && P.experience) {
    expList.innerHTML = P.experience.map(function (job, i) {
      var liveHtml = job.live
        ? '<div class="exp-live"><span class="live-dot"></span>Current</div>'
        : '<div class="exp-dot"></div>';
      var tagsHtml = job.tags
        ? '<div class="exp-tags">' + job.tags.map(function (t) { return '<span>' + t + '</span>'; }).join("") + '</div>'
        : "";
      return '<div class="exp-row reveal" style="transition-delay:' + (i * 0.08) + 's">' +
        '<div class="exp-left">' + liveHtml +
        '<div class="exp-period">' + job.period + '</div>' +
        '<div class="exp-badge">' + job.badge + '</div>' +
        '</div>' +
        '<div class="exp-right">' +
        '<div class="exp-role">' + job.role + '</div>' +
        '<div class="exp-company">' + job.company + '</div>' +
        '<ul class="exp-bullets">' +
        job.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join("") +
        '</ul>' + tagsHtml +
        '</div>' +
        '<div class="exp-ghost" aria-hidden="true">0' + (i + 1) + '</div>' +
        '</div>';
    }).join("");
    expList.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  // -- Work Projects Grid --
  var workGrid = $("#workGrid");
  if (workGrid && P.projects) {
    workGrid.innerHTML = P.projects.map(function (proj, i) {
      var tagsHtml = proj.tags.map(function (t) { return '<span>' + t + '</span>'; }).join("");
      var csBtn = (typeof proj.caseStudy === "number")
        ? '<button class="proj-expand" data-cs="' + proj.caseStudy + '">Case Study →</button>'
        : "";
      return '<div class="proj-card reveal" style="transition-delay:' + (i * 0.06) + 's">' +
        '<div class="proj-num">' + proj.num + '</div>' +
        '<div class="proj-title">' + proj.title + '</div>' +
        '<div class="proj-desc">' + proj.desc + '</div>' +
        (proj.impact ? '<div class="proj-impact">↑ ' + proj.impact + '</div>' : '') +
        '<div class="proj-foot">' +
        '<div class="proj-tags">' + tagsHtml + '</div>' +
        '<div class="proj-actions">' +
        '<span class="proj-cat">' + proj.cat + '</span>' +
        csBtn +
        '</div>' +
        '</div>' +
        '</div>';
    }).join("");
    workGrid.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  // -- Contact Links --
  var contactLinks = $("#contactLinks");
  if (contactLinks && P.contact) {
    contactLinks.innerHTML = P.contact.map(function (c) {
      return '<a class="contact-link reveal" href="' + c.href + '"' + (c.href.startsWith("http") ? ' target="_blank" rel="noopener"' : '') + '>' +
        '<div>' +
        '<div class="cl-label">' + c.label + '</div>' +
        '<div class="cl-val">' + c.val + '</div>' +
        '</div>' +
        '<span class="cl-arrow">→</span>' +
        '</a>';
    }).join("");
    contactLinks.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
  }

  // -- Footer --
  var footerCopy = $("#footerCopy");
  if (footerCopy) footerCopy.textContent = "© " + new Date().getFullYear() + " " + P.name + " — " + P.location;
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

  // -- Resume --
  var resumeBody = $("#resumeBody");
  if (resumeBody) {
    var skillBarsHtml = (P.skillsResume || []).map(function (s) {
      return '<div class="res-skill-row">' +
        '<div class="res-skill-meta"><span>' + s.name + '</span><span>' + s.pct + '%</span></div>' +
        '<div class="res-skill-track"><div class="res-skill-fill" data-w="' + s.pct + '" style="width:0%"></div></div>' +
        '</div>';
    }).join("");

    var expHtml = (P.resumeExp || []).map(function (e) {
      return '<div class="res-exp-item">' +
        '<div class="res-exp-head"><span class="res-exp-role">' + e.role + '</span><span class="res-exp-dates">' + e.dates + '</span></div>' +
        '<div class="res-exp-co">' + e.company + '</div>' +
        '<ul class="res-exp-bullets">' + e.bullets.map(function (b) { return '<li>' + b + '</li>'; }).join("") + '</ul>' +
        '</div>';
    }).join("");

    var certHtml = (P.certifications || []).map(function (c) {
      return '<div class="res-cert"><span>' + c.name + '</span><a href="' + c.url + '" target="_blank">Verify ↗</a></div>';
    }).join("");

    var eduHtml = (P.education || []).map(function (e) {
      return '<div class="res-edu-item"><div class="res-edu-deg">' + e.degree + '</div><div class="res-edu-school">' + e.school + '</div></div>';
    }).join("");

    var langHtml = (P.languages || []).map(function (l) {
      return '<div class="res-lang-row"><span>' + l.lang + '</span><span>' + l.level + '</span></div>';
    }).join("");

    var contactInfoHtml = [
      P.email, P.phone, P.location, P.linkedin.replace("https://", ""), P.github.replace("https://", "")
    ].map(function (v) { return '<span>' + v + '</span>'; }).join("");

    resumeBody.innerHTML =
      '<div class="res-sidebar">' +
        '<div class="res-avatar">MK</div>' +
        '<div class="res-name">' + P.name + '</div>' +
        '<div class="res-title-badge">' + P.title + '</div>' +
        '<div class="res-divider"></div>' +
        '<div class="res-section-lbl">Contact</div>' +
        '<div class="res-contact-info">' + contactInfoHtml + '</div>' +
        '<div class="res-divider"></div>' +
        '<div class="res-section-lbl">Core Skills</div>' +
        '<div id="resSkilBars">' + skillBarsHtml + '</div>' +
        '<div class="res-divider"></div>' +
        '<div class="res-section-lbl">Languages</div>' +
        '<div class="res-langs">' + langHtml + '</div>' +
      '</div>' +
      '<div class="res-main">' +
        '<div class="res-block">' +
          '<div class="res-block-lbl">Summary</div>' +
          '<p class="res-summary">Senior DevOps Engineer with 7+ years of experience designing, building, and operating complex cloud infrastructures across AWS, GCP, and Azure. Specializes in Kubernetes orchestration, GitOps workflows, CI/CD automation, and multi-cloud migrations. Track record of achieving up to 50% cost reductions while elevating security posture and compliance readiness. AWS Certified DevOps Engineer — Professional.</p>' +
        '</div>' +
        '<div class="res-block"><div class="res-block-lbl">Experience</div>' + expHtml + '</div>' +
        '<div class="res-block"><div class="res-block-lbl">Certifications</div>' + certHtml + '</div>' +
        '<div class="res-block"><div class="res-block-lbl">Education</div>' + eduHtml + '</div>' +
      '</div>';

    // Animate skill bars on scroll
    var skillBarIO = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll(".res-skill-fill").forEach(function (bar) {
            bar.style.width = bar.dataset.w + "%";
          });
          skillBarIO.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    var sbContainer = $("#resSkilBars");
    if (sbContainer) skillBarIO.observe(sbContainer);
  }

  // ==========================================
  // GITHUB REPOS
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
    fetch("https://api.github.com/users/" + P.githubUser + "/repos?sort=updated&per_page=9")
      .then(function (r) { return r.json(); })
      .then(function (repos) {
        if (!Array.isArray(repos) || !repos.length) throw new Error("empty");
        ghGrid.innerHTML = repos.filter(function (r) { return !r.fork; }).slice(0, 9).map(function (r, i) {
          var dot = r.language
            ? '<span style="display:inline-block;width:7px;height:7px;border-radius:50%;background:' + (langColors[r.language] || "#888") + ';vertical-align:middle;margin-right:5px"></span>'
            : "";
          return '<div class="proj-card reveal" style="transition-delay:' + (i * .05) + 's">' +
            '<div class="proj-num">' + (i < 9 ? "0" + (i + 1) : i + 1) + '</div>' +
            '<div class="proj-title">' + r.name.replace(/-/g, " ") + '</div>' +
            '<div class="proj-desc">' + (r.description || "No description provided.") + '</div>' +
            '<div class="proj-foot">' +
            '<div style="display:flex;gap:.75rem;font-family:var(--mono);font-size:.65rem;color:var(--ink-muted)">' +
            (r.language ? '<span>' + dot + r.language + '</span>' : '') +
            '<span>★ ' + r.stargazers_count + '</span>' +
            '<span>⑂ ' + r.forks_count + '</span>' +
            '</div>' +
            '<a href="' + r.html_url + '" target="_blank" rel="noopener" style="font-family:var(--mono);font-size:.65rem;letter-spacing:.1em;text-transform:uppercase;color:var(--accent);text-decoration:none">View →</a>' +
            '</div></div>';
        }).join("");
        ghGrid.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
      })
      .catch(function () {
        ghGrid.innerHTML = '<div class="loading-cell"><div class="loading-text">Could not load repos. <a href="' + P.github + '" target="_blank" style="color:var(--accent)">View on GitHub →</a></div></div>';
      });
  }

  // ==========================================
  // MEDIUM FEED  (FIX: was truncated mid-line)
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
          var cat = (item.categories || [])[0] || "Article";
          var date = new Date(item.pubDate).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
          var readTime = Math.max(1, Math.round((item.content || "").replace(/<[^>]*>/g, "").split(/\s+/).length / 200));
          var excerpt = (item.description || "").replace(/<[^>]*>/g, "").substring(0, 120).trim() + "…";
          var thumb = item.thumbnail
            || (item.enclosure && item.enclosure.link)
            || ((item.content || "").match(/<img[^>]+src="([^">]+)"/) || [])[1]
            || "";
          var thumbHtml = thumb
            ? '<div class="bc-thumb"><img src="' + thumb + '" alt="" loading="lazy" onerror="this.parentElement.style.display=\'none\'"></div>'
            : '<div class="bc-ph"><span>' + item.title.charAt(0).toUpperCase() + '</span></div>';
          return '<div class="blog-card reveal" data-index="' + i + '" style="transition-delay:' + (i * .05) + 's">' +
            thumbHtml +
            '<div class="bc-body">' +
            '<div class="bc-meta"><span>' + cat + '</span><span class="bc-sep">·</span><span>' + date + '</span><span class="bc-sep">·</span><span>' + readTime + ' min</span></div>' +
            '<div class="bc-title">' + item.title + '</div>' +
            '<div class="bc-excerpt">' + excerpt + '</div>' +
            '</div>' +
            '<div class="bc-foot"><span class="bc-read">Read article</span><span class="bc-arrow">↗</span></div>' +
            '</div>';
        }).join("");
        blogGrid.querySelectorAll(".reveal").forEach(function (el) { observer.observe(el); });
      })
      .catch(function () {
        blogGrid.innerHTML = '<div class="loading-cell"><div class="loading-text">Could not load feed. ' +
          '<a href="' + P.medium + '" target="_blank" style="color:var(--accent)">Read on Medium →</a></div></div>';
      });
  }

})();
//
//(function () {
//  "use strict";
//
//  function $(sel) { return document.querySelector(sel); }
//  function $$(sel) { return document.querySelectorAll(sel); }
//
//  // Year
//  var yearEl = document.getElementById("year");
//  if (yearEl) yearEl.textContent = new Date().getFullYear();
//
//  // SCROLL REVEAL
//  var observer = new IntersectionObserver(function (entries) {
//    entries.forEach(function (entry) {
//      if (entry.isIntersecting) {
//        entry.target.classList.add("visible");
//        observer.unobserve(entry.target);
//      }
//    });
//  }, { threshold: 0.08, rootMargin: "0px 0px -30px 0px" });
//
//  $$(".reveal").forEach(function (el) { observer.observe(el); });
//
//  // NAV
//  var lastScroll = 0;var navbar = document.getElementById("navbar");
//
//  window.addEventListener("scroll", function () {
//    var c = window.pageYOffset;
//    var h = document.documentElement.scrollHeight - window.innerHeight;
//    if (navbar) {
//      navbar.classList.toggle("scrolled", c > 40);
//      navbar.classList.toggle("hidden", c > lastScroll && c > 100);
//    }
//    lastScroll = c;
//    var prog = document.getElementById("progress");
//    if (prog && h > 0) prog.style.width = (c /h * 100) + "%";
//  });
//
//  var hamburger = document.getElementById("hamburger");
//  var navLinks = document.getElementById("navLinks");
//  if (hamburger && navLinks) {
//    hamburger.addEventListener("click", function () {
//      navLinks.classList.toggle("open");
//    });
//    navLinks.querySelectorAll("a").forEach(function (l) {
//      l.addEventListener("click", function () {
//        navLinks.classList.remove("open");
//      });
//    });
//  }
//
//  // TAB SWITCHING
//  $$(".proj-tab").forEach(function (tab) {
//    tab.addEventListener("click", function () {
//      $$(".proj-tab").forEach(function (t) {
//        t.classList.remove("active");
//      });
//      $$(".proj-pane").forEach(function (p) {
//        p.classList.remove("active");
//      });
//      tab.classList.add("active");
//      var pane = document.getElementById("pane-" + tab.dataset.tab);
//      if (pane) pane.classList.add("active");
//    });
//  });
//
//  // CASE STUDY MODAL
//  function openCaseStudy(i) {
//    if (typeof CASE_STUDIES === "undefined" || !CASE_STUDIES[i]) return;
//    var cs = CASE_STUDIES[i];
//    var html = '<div class="cs-meta">' + cs.meta + '</div>';
//    html += '<h2 class="cs-title">' + cs.title + '</h2>';
//    cs.sections.forEach(function (s) {
//      if (s.type === "metrics") {
//        html += '<div class="cs-section"><h3>' + s.heading + '</h3><div class="cs-metric-grid">';
//        s.metrics.forEach(function (m) {
//          html += '<div class="cs-metric">';
//          html += '<div class="cs-metric-num">' + m.num + '</div>';
//          html += '<div class="cs-metric-label">' + m.label + '</div>';
//          html += '</div>';
//        });
//        html += '</div></div>';
//      } else if (s.type === "timeline") {
//        html += '<div class="cs-section"><h3>' + s.heading + '</h3><div class="cs-timeline">';
//        s.items.forEach(function (it) {
//          html += '<div class="cs-tl-item">';
//          html += '<div class="cs-tl-phase">' + it.phase + '</div>';
//          html += '<div class="cs-tl-desc">' + it.desc + '</div>';
//          html += '</div>';
//        });
//        html += '</div></div>';
//      } else if (s.tags) {
//        html += '<div class="cs-section"><h3>' + s.heading + '</h3><div class="cs-tags">';
//        s.tags.forEach(function (t) {
//          html += '<span>' + t + '</span>';
//        });
//        html += '</div></div>';
//      } else {
//        html += '<div class="cs-section"><h3>' + s.heading + '</h3>' + s.content + '</div>';
//      }
//      html += '<hr class="cs-divider">';
//    });
//    var csBody = document.getElementById("csBody");
//    if (csBody) csBody.innerHTML = html;
//    var csModal = document.getElementById("csModal");
//    var csOverlay = document.getElementById("csOverlay");
//    if (csModal) csModal.classList.add("open");
//    if (csOverlay) csOverlay.classList.add("open");
//    document.body.style.overflow = "hidden";
//  }
//
//  function closeCaseStudy () {
//    var csModal = document.getElementById ("csModal");
//    var csOverlay = document.getElementById ("csOverlay");
//    if (csModal) csModal.classList.remove ("open");
//    if (csOverlay) csOverlay.classList.remove ("open");
//    document.body.style.overflow = "";
//  }
//
//  var csClose = document.getElementById ("csClose");
//  var csOverlayEl = document.getElementById ("csOverlay");
//  if (csClose) csClose.addEventListener ("click", closeCaseStudy);
//  if (csOverlayEl) csOverlayEl.addEventListener ("click", closeCaseStudy);
//
//  document.addEventListener ("click", function (e) {
//    var btn = e.target.closest (".proj-expand");
//    if (btn) openCaseStudy (parseInt (btn.dataset.cs));
//  });// BLOG DRAWER
//  function openDrawer (i) {
//    var items = window._mediumItems;
//    if (!items || !items[i]) return;
//    var item = items[i];
//    var date = new Date(item.pubDate).toLocaleDateString("en-US", {
//      year: "numeric",
//      month: "long",
//      day: "numeric"
//    });
//    var cats = (item.categories || []).slice(0, 3).join(" · ") || "Article";
//    var drawerBody = document.getElementById("drawerBody");
//    if (drawerBody) {
//      drawerBody.innerHTML = '<div class="drawer-cat">' + cats + '</div>'
//        + '<h2 class="drawer-title">' + item.title + '</h2>'
//        + '<div class="drawer-date">' + date + ' · Manish Khadka</div>'
//        + '<div class="drawer-content">' + item.content + '</div>'
//        + '<a href="' + item.link + '" target="_blank" class="drawer-external">Read on Medium ↗</a>';
//    }
//    var drawer = document.getElementById("drawer");
//    var drawerOv = document.getElementById("drawerOverlay");
//    if (drawer) drawer.classList.add("open");
//    if (drawerOv) drawerOv.classList.add("open");
//    document.body.style.overflow = "hidden";
//  }
//
//  function closeDrawer() {
//    var drawer = document.getElementById("drawer");
//    var drawerOv = document.getElementById("drawerOverlay");
//    if (drawer) drawer.classList.remove("open");
//    if (drawerOv) drawerOv.classList.remove("open");
//    document.body.style.overflow = "";
//  }
//
//  var drawerCloseBtn = document.getElementById("drawerCloseBtn");
//  var drawerOvEl = document.getElementById("drawerOverlay");
//  if (drawerCloseBtn) drawerCloseBtn.addEventListener("click", closeDrawer);
//  if (drawerOvEl) drawerOvEl.addEventListener("click", closeDrawer);
//
//  document.addEventListener("click", function (e) {
//    var card = e.target.closest(".blog-card[data-index]");
//    if (card) openDrawer(parseInt(card.dataset.index));
//  });
//
//  // PRINT
//  var printBtn = document.getElementById("printBtn");
//  if (printBtn) printBtn.addEventListener("click", function () {
//    window.print();
//  });
//
//  // ESCAPE KEY
//  document.addEventListener("keydown", function (e) {
//    if (e.key === "Escape") {
//      closeDrawer();
//      closeCaseStudy();
//    }
//  });
//
//  // GITHUB REPOS
//  if (typeof PROFILE !== "undefined") {
//    var P = PROFILE;
//    var ghGrid = document.getElementById("ghGrid");
//    if (ghGrid && P.githubUser) {
//      fetch("https://api.github.com/users/" + P.githubUser + "/repos?sort=updated&per_page=6")
//        .then(function (r) { return r.json(); })
//        .then(function (repos) {
//          if (!Array.isArray(repos) || repos.length === 0) {
//            ghGrid.innerHTML = '<div class="loading-cell"><div class="loading-text">No public repos. <a href="' + P.github + '" target="_blank" style="color:var(--accent)">View on GitHub →</a></div></div>';
//            return;}
//          var langColors = {
//            JavaScript: "#f1e05a",
//            TypeScript: "#3178c6",
//            Python: "#3572A5",
//            Go: "#00ADD8",
//            Shell: "#89e051",
//            HTML: "#e34c26",
//            CSS: "#563d7c",
//            Dockerfile: "#384d54",
//            HCL: "#844FBA"
//          };
//          var html = "";
//          repos.filter(function (r) { return !r.fork; }).slice(0, 6).forEach(function (r, i) {
//            var langDot = r.language
//              ? '<span><span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:' + (langColors[r.language] || "#888") + ';vertical-align:middle;margin-right:4px"></span>' + r.language + '</span>'
//              : '';
//            html += '<div class="proj-card reveal" style="animation-delay:' + (i * 0.06) + 's">';
//            html += '<div class="proj-num">' + (r.language || "—") + '</div>';
//            html += '<div class="proj-title">' + r.name.replace(/-/g, " ") + '</div>';
//            html += '<div class="proj-desc">' + (r.description || "No description provided.") + '</div>';
//            html += '<div class="proj-foot">';
//            html += '<div style="display:flex;gap:1rem;font-family:var(--mono);font-size:.68rem;color:var(--ink-muted)">';html += langDot;
//            html += '<span>★ ' + r.stargazers_count + '</span>';
//            html += '<span>⑂ ' + r.forks_count + '</span>';
//            html += '</div>';
//            html += '<a href="' + r.html_url + '" target="_blank" style="font-family:var(--mono);;text-transform:uppercase;color:var(--accent);text-decoration:none">View →</a>';
//            html += '</div></div>';
//          });
//          ghGrid.innerHTML = html;
//          ghGrid.querySelectorAll(".reveal").forEach(function (el) {
//            observer.observe(el);
//          });
//        })
//        .catch(function () {
//          ghGrid.innerHTML = '<div class="loading-cell"><div class="loading-text">Could not load repos. <a href="' + P.github + '" target="_blank" style="color:var(--accent)">View on GitHub →</a></div></div>';
//        });
//    }
//  }
//
//  // MEDIUM FEED
//  var blogGrid = document.getElementById("blogGrid");
//  if (blogGrid) {
//    fetch("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@palpen")
//      .then(function (r) { return r.json(); })
//      .then(function (data) {
//        if (data.status !== "ok" || !data.items || !data.items.length) {
//          blogGrid.innerHTML = '<div class="loading-cell"><div class="loading-text">Could not load feed. <a href="https://palpen.medium.com" target="_blank" style="color:var(--accent)">Read on Medium →</a></div></div>';
//          return;
//        }
//        var items = data.items.slice(0, 6);
//        var html = "";
//        items.forEach(function (item, i) {
//          var cat = (item.categories || [])[0] || "Article";
//          var date = new Date(item.pubDate).toLocaleDateString("en-US", {
//            year: "numeric",
//            month: "short",
//            day: "numeric"
//          });
//          var excerpt = item.description.replace(/<[^>]*>/g, "").substring(0, 120).trim() + "…";
//          var thumb = item.thumbnail || (item.content.match(/<img[^>]+src="([^">]+)"/) || [])[1] || "";
//          var thumbHtml = thumb
//            ? '<div class="bc-thumb"><img src="' + thumb + '" alt="" loading="lazy" onerror="this.parentElement.innerHTML=\'<div class=bc-ph><span>MK</span></div>\'"></div>'
//            : '<div class="bc-ph"><span>MK</span></div>';
//          html += '<div class="blog-card reveal" style="animation-delay:' + (i * 0.06) + 's" data-index="' + i + '">';
//          html += thumbHtml;
//          html += '<div class="bc-body"><div class="bc-cat">' + cat + '</div>';
//          html += '<h3 class="bc-title">' + item.title + '</h3>';
//          html += '<p class="bc-excerpt">' + excerpt + '</p></div>';
//          html += '<div class="bc-foot"><span class="bc-date">' + date + '</span>';
//          html += '<span class="bc-read">Read →</span></div></div>';
//        });
//        blogGrid.innerHTML = html;
//        window._mediumItems = items;
//        blogGrid.querySelectorAll(".reveal").forEach(function (el) {
//          observer.observe(el);
//        });
//      })
//      .catch(function () {
//        blogGrid.innerHTML = '<div class="loading-cell"><div class="loading-text">Could not load articles. <a href="https://palpen.medium.com" target="_blank" style="color:var(--accent)">Read on Medium →</a></div></div>';
//      });
//  }
//
//})();
