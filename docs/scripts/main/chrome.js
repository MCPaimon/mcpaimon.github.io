/*
 * Site chrome — the header and footer every page shares.
 *
 * The navigation used to be copied into every page, which meant adding one
 * section was an edit to all of them and a chance for one to be missed. The
 * links now live in this file only; a page carries an empty placeholder and
 * says where it sits, and the chrome is rendered into it.
 *
 * A page declares two things on <body>:
 *
 *   data-page  the id of the nav entry to mark as the current page
 *   data-root  the relative path back to the site root ("./", "../",
 *              "../../../../")
 *
 * Relative roots rather than absolute paths, so the site still works when it
 * is served from somewhere other than a domain root — a local preview, or a
 * pull request build.
 *
 * This runs synchronously at the end of <body>, before the page transition
 * script binds its click handlers, so the rendered links are already in the
 * document when that script looks for them.
 */
(function () {
  "use strict";

  /* The main navigation, in the order it is shown. */
  var NAV = [
    { id: "mcagents", label: "MCAgents", href: "" },
    { id: "chat", label: "MCAgentsChat", href: "chat/" },
    { id: "npc", label: "MCAgentsNPC", href: "npc/" },
    { id: "logs", label: "Logs", href: "logs/" },
    { id: "github", label: "GitHub", href: "https://github.com/MCPaimon", external: true }
  ];

  /* The footer links, in the order they are shown. */
  var FOOTER = [
    { label: "MCAgents", href: "https://github.com/MCPaimon/mcagents", external: true },
    { label: "MCAgentsChat", href: "https://github.com/MCPaimon/mcagents-chat", external: true },
    { label: "MCAgentsNPC", href: "https://github.com/MCPaimon/mcagents-npc", external: true },
    { label: "Logs", href: "logs/" },
    { label: "Central Server", href: "https://github.com/MCEngine/server-expressjs", external: true }
  ];

  var COPYRIGHT = "© 2026 MCPaimon";

  /**
   * Resolves one nav or footer href against the page's own depth.
   */
  function resolve(root, href, external) {
    if (external) {
      return href;
    }
    return root + href;
  }

  /**
   * Builds one anchor.
   */
  function link(root, item, currentId) {
    var a = document.createElement("a");
    a.href = resolve(root, item.href, item.external);
    a.textContent = item.label;

    if (item.external) {
      a.target = "_blank";
      a.rel = "noopener";
    } else if (item.id && item.id === currentId) {
      a.setAttribute("aria-current", "page");
    }
    return a;
  }

  /**
   * Renders the sticky header into its placeholder.
   */
  function renderHeader(header, root, currentId) {
    var inner = document.createElement("div");
    inner.className = "inner";

    var brand = document.createElement("a");
    brand.className = "brand";
    brand.href = root;
    var mark = document.createElement("span");
    mark.className = "mark";
    mark.setAttribute("aria-hidden", "true");
    brand.appendChild(mark);
    brand.appendChild(document.createTextNode("MCPaimon"));

    var nav = document.createElement("nav");
    nav.className = "site-nav";
    nav.setAttribute("aria-label", "Main navigation");
    NAV.forEach(function (item) {
      nav.appendChild(link(root, item, currentId));
    });

    inner.appendChild(brand);
    inner.appendChild(nav);
    header.appendChild(inner);
  }

  /**
   * Renders the footer into its placeholder.
   */
  function renderFooter(footer, root) {
    var inner = document.createElement("div");
    inner.className = "inner";

    var copyright = document.createElement("span");
    copyright.textContent = COPYRIGHT;

    var links = document.createElement("span");
    FOOTER.forEach(function (item, index) {
      if (index > 0) {
        links.appendChild(document.createTextNode(" · "));
      }
      links.appendChild(link(root, item, null));
    });

    inner.appendChild(copyright);
    inner.appendChild(links);
    footer.appendChild(inner);
  }

  var body = document.body;
  var root = body.getAttribute("data-root") || "./";
  var currentId = body.getAttribute("data-page") || "";

  var header = document.querySelector("[data-site-header]");
  if (header) {
    renderHeader(header, root, currentId);
  }

  var footer = document.querySelector("[data-site-footer]");
  if (footer) {
    renderFooter(footer, root);
  }
})();
