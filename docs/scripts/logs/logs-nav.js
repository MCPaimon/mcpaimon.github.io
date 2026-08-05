/*
 * The release log picker.
 *
 * Every log page used to carry its own copy of the version list, so publishing
 * one release meant editing every page that already existed — and the list was
 * only ever as correct as the least recently touched page. The releases now
 * live in this file only; a log page carries an empty <aside> saying which
 * entry it is, and the picker is rendered into it.
 *
 * Publishing a release is therefore one entry at the top of the right group
 * here, plus the two pages the release itself needs.
 *
 * Only five entries are visible at a time. A product with more than five
 * releases gets a scrollable list rather than a longer sidebar, so the picker
 * stays the same height however long the history grows.
 *
 * A page declares:
 *
 *   data-root     the relative path back to the site root
 *   data-current  "<product>:<version>", the entry to mark as current
 *   data-back     optional href for the "back to latest" link, relative to root
 */
(function () {
  "use strict";

  /* How many entries are visible before the list starts scrolling. */
  var VISIBLE = 5;

  /*
   * Every published release, newest first within each product.
   *
   * The first entry of a group is that product's latest: it carries the
   * "Latest" pill and points at the product's log index, because that index
   * mirrors it.
   */
  var PRODUCTS = [
    {
      product: "MCAgents",
      index: "logs/",
      versions: [
        { version: "6.0.0", href: "logs/6/0/0/" },
        { version: "5.1.0", href: "logs/5/1/0/" },
        { version: "5.0.0", href: "logs/5/0/0/" },
        { version: "4.0.0", href: "logs/4/0/0/" },
        { version: "3.1.0", href: "logs/3/1/0/" },
        { version: "3.0.0", href: "logs/3/0/0/" },
        { version: "2.0.0", href: "logs/2/0/0/" },
        { version: "1.0.0", href: "logs/1/0/0/" }
      ]
    },
    {
      product: "MCAgentsChat",
      index: "logs/chat/",
      versions: [
        { version: "0.0.0", href: "logs/chat/0/0/0/" }
      ]
    },
    {
      product: "MCAgentsNPC",
      index: "logs/npc/",
      versions: [
        { version: "0.0.0", href: "logs/npc/0/0/0/" }
      ]
    }
  ];

  /**
   * Builds one entry of the picker.
   *
   * The newest release of a product points at that product's log index rather
   * than at its own permalink, because the index shows the same content.
   */
  function entry(root, group, release, isLatest, currentKey) {
    var item = document.createElement("li");

    var a = document.createElement("a");
    a.href = root + (isLatest ? group.index : release.href);
    a.appendChild(document.createTextNode(release.version));

    if (isLatest) {
      var pill = document.createElement("span");
      pill.className = "latest";
      pill.textContent = "Latest";
      a.appendChild(document.createTextNode(" "));
      a.appendChild(pill);
    }

    if (currentKey === group.product + ":" + release.version) {
      a.className = "is-current";
      a.setAttribute("aria-current", "page");
    }

    item.appendChild(a);
    return item;
  }

  /**
   * Builds one product's heading and list.
   */
  function groupOf(root, group, currentKey) {
    var fragment = document.createDocumentFragment();

    var heading = document.createElement("h4");
    heading.textContent = group.product;
    fragment.appendChild(heading);

    var list = document.createElement("ul");
    if (group.versions.length > VISIBLE) {
      // Past five releases the list scrolls instead of growing, so the picker
      // stays the same height however long the history gets.
      list.className = "is-scrollable";
    }

    group.versions.forEach(function (release, index) {
      list.appendChild(entry(root, group, release, index === 0, currentKey));
    });

    fragment.appendChild(list);
    return fragment;
  }

  var containers = document.querySelectorAll("[data-logs-nav]");
  if (containers.length === 0) {
    return;
  }

  var root = document.body.getAttribute("data-root") || "./";

  Array.prototype.forEach.call(containers, function (container) {
    var currentKey = container.getAttribute("data-current") || "";
    var back = container.getAttribute("data-back");

    container.textContent = "";

    PRODUCTS.forEach(function (group) {
      container.appendChild(groupOf(root, group, currentKey));
    });

    if (back) {
      var paragraph = document.createElement("p");
      paragraph.className = "back";
      var a = document.createElement("a");
      a.href = root + back;
      a.textContent = "← Back to latest";
      paragraph.appendChild(a);
      container.appendChild(paragraph);
    }
  });
})();
