/* sky-background.js — QQQ standard background (day / night / pink). Classic script, no build step.
 * User decision 2026-11-06: "빨리 우리 스킬의 기본 재료로 써. 낮 배경은 무조건 비행기야"
 * The day (light) background is always the airplane sky. Pair with references/sky-background.css.
 * Ported from the published deck teacher-manager-intro.html (same clouds, routes, plane shape and timings).
 *
 *   QQQSky.skyOf(theme)          -> "day" | "night" | "pink"   (light, warm, missing -> day; dark -> night; bling -> pink)
 *   QQQSky.nodes(theme, width)   -> plain description of the layer's children (used by both renderers and by tests)
 *   QQQSky.Background            -> React component: <QQQSky.Background theme={theme}/>  (needs window.React)
 *   QQQSky.mount(el, theme)      -> draws the layer into el without React (galleries, plain pages); returns {set(theme), destroy()}
 *
 * The plane is drawn here as inline SVG paths. No image files, no network.
 */
(function (root) {
  "use strict";

  // [anchor, anchorAt(vh), side, sideAt(vw), size(vh), orbit, period(s), reverse, rgb, alpha, blend]
  var DAY_CLOUDS = [
    ["top", -12, "left", -8, 56, "orbit1", 24, false, "255,255,255", 0.9, "normal"],
    ["bottom", -16, "right", -6, 62, "orbit2", 30, false, "255,255,255", 0.84, "normal"],
    ["top", 26, "right", 16, 40, "orbit3", 30, false, "146,190,226", 0.5, "multiply"],
    ["bottom", 8, "left", 12, 44, "orbit1", 40, true, "255,255,255", 0.82, "normal"],
    ["top", -6, "right", 28, 34, "orbit2", 25, false, "255,255,255", 0.78, "normal"],
    ["bottom", 22, "left", 40, 38, "orbit3", 40, true, "163,203,233", 0.44, "multiply"],
    ["top", 6, "left", 8, 42, "orbit2", 30, true, "255,255,255", 0.62, "normal"],
    ["top", -16, "right", 36, 48, "orbit3", 40, false, "255,255,255", 0.56, "normal"],
    ["bottom", 0, "left", 28, 38, "orbit3", 25, true, "255,255,255", 0.6, "normal"],
    ["bottom", -10, "right", 18, 52, "orbit1", 30, false, "255,255,255", 0.58, "normal"],
    ["top", 30, "left", 30, 34, "orbit2", 40, true, "255,255,255", 0.42, "normal"]
  ];
  // [x1 (<0 = left edge, else right edge), y1(px), x2, y2(px), plane size(px)]
  var DAY_ROUTES = [
    [-60, 812, 1980, 108, 28],
    [1980, 150, -60, 210, 24],
    [-60, 220, 1980, 780, 26],
    [1980, 660, -60, 130, 27],
    [-60, 470, 1980, 92, 25],
    [1980, 110, -60, 700, 24],
    [-60, 830, 1980, 560, 26],
    [1980, 400, -60, 810, 27],
    [-60, 640, 1980, 380, 28],
    [1980, 300, -60, 340, 25]
  ];
  // airliner seen from above, nose to the right: fuselage, two wings, two tailplanes (viewBox -55 -42 110 84)
  var PLANE_PATHS = [
    "M 50 0 C 44 -6 26 -9 -30 -8 C -40 -8 -46 -5 -46 0 C -46 5 -40 8 -30 8 C 26 9 44 6 50 0 Z",
    "M 16 -4 L -6 -38 L -20 -38 L -8 -4 Z",
    "M 16 4 L -6 38 L -20 38 L -8 4 Z",
    "M -34 -4 L -44 -19 L -52 -19 L -46 -4 Z",
    "M -34 4 L -44 19 L -52 19 L -46 4 Z"
  ];
  var PLANE_FILL = ["#5E86AC", "#4C7398"];   // fuselage, wings
  var FIELD_CLOUDS = [
    ["top", -12, "left", -8, 56, "orbit1", 26, false],
    ["bottom", -16, "right", -6, 62, "orbit2", 32, false],
    ["top", 26, "right", 16, 40, "orbit3", 30, false],
    ["bottom", 8, "left", 12, 44, "orbit1", 38, true],
    ["top", -6, "right", 28, 34, "orbit2", 28, false],
    ["bottom", 22, "left", 40, 38, "orbit3", 34, true]
  ];
  var FIELD_COLOURS = {
    pink: ["rgba(244,114,182,.55)", "rgba(20,184,166,.6)", "rgba(251,113,133,.5)", "rgba(139,92,246,.54)", "rgba(245,158,11,.46)", "rgba(14,165,233,.54)"],
    night: ["rgba(59,130,246,.42)", "rgba(14,165,233,.36)", "rgba(244,63,94,.3)", "rgba(139,92,246,.34)", "rgba(245,158,11,.24)", "rgba(14,165,233,.34)"]
  };
  // [top, left, size(px), duration(s), delay(s)]
  var SPARKS = [
    ["18%", "12%", 6, 6, 0], ["32%", "82%", 5, 7, 1.2], ["62%", "20%", 7, 6.5, 0.6], ["74%", "70%", 5, 8, 2.1],
    ["44%", "48%", 4, 5.5, 1.7], ["12%", "60%", 6, 7.5, 0.3], ["84%", "40%", 5, 6.8, 2.6], ["52%", "88%", 4, 7.2, 1],
    ["26%", "34%", 5, 6.2, 2.3], ["68%", "54%", 6, 7.8, 0.9], ["8%", "26%", 4, 5.2, 1.5], ["15%", "44%", 5, 6.9, 3.1],
    ["22%", "70%", 3, 5.8, 0.4], ["38%", "8%", 6, 7.6, 2], ["40%", "92%", 4, 6.1, 1.1], ["56%", "36%", 3, 5.4, 2.8],
    ["58%", "74%", 5, 7, 0.8], ["70%", "12%", 4, 6.4, 3.3], ["78%", "58%", 6, 8.2, 1.9], ["88%", "78%", 4, 6.7, 0.2],
    ["90%", "22%", 5, 7.4, 2.5], ["30%", "58%", 3, 5.6, 1.4], ["48%", "64%", 4, 6.3, 3], ["64%", "44%", 5, 7.9, 0.5]
  ];
  // [top, left, size(px), opacity]
  var NIGHT_DUST = [
    ["6%", "8%", 2, 0.9], ["10%", "18%", 1, 0.6], ["9%", "27%", 2, 0.85], ["14%", "13%", 1, 0.5], ["13%", "33%", 2, 0.95],
    ["17%", "24%", 1, 0.55], ["16%", "42%", 2, 0.8], ["20%", "36%", 1, 0.6], ["12%", "48%", 1, 0.7], ["22%", "50%", 2, 0.9],
    ["8%", "38%", 1, 0.5], ["24%", "20%", 1, 0.55], ["26%", "44%", 2, 0.75], ["19%", "58%", 1, 0.65], ["27%", "60%", 2, 0.85],
    ["23%", "66%", 1, 0.5], ["30%", "54%", 1, 0.6], ["31%", "70%", 2, 0.8], ["18%", "6%", 1, 0.5], ["33%", "38%", 1, 0.55],
    ["29%", "30%", 1, 0.6], ["35%", "62%", 1, 0.7], ["11%", "55%", 1, 0.5], ["25%", "12%", 1, 0.6], ["21%", "74%", 2, 0.75],
    ["34%", "48%", 1, 0.5], ["15%", "64%", 1, 0.55], ["28%", "78%", 1, 0.6]
  ];
  // [top, left, delay(s), duration(s)]
  var NIGHT_SHOOTERS = [
    ["3%", "68%", 0, 4], ["-3%", "90%", 0.9, 4.6], ["11%", "80%", 1.7, 3.6], ["5%", "56%", 2.5, 5], ["17%", "95%", 3.3, 4.2],
    ["1%", "44%", 4.1, 5.4], ["9%", "72%", 1.2, 4.8], ["20%", "62%", 2.9, 3.8], ["-1%", "52%", 5, 4.4], ["14%", "86%", 3.7, 5.6],
    ["7%", "34%", 0.5, 4], ["4%", "78%", 2.2, 5], ["19%", "50%", 3, 3.6], ["-2%", "66%", 1.4, 4.6], ["12%", "40%", 4.6, 5.2],
    ["2%", "24%", 2.7, 4.2], ["16%", "58%", 0.2, 5.4], ["8%", "92%", 3.9, 3.8]
  ];

  function skyOf(theme) {
    if (theme === "dark" || theme === "night") return "night";
    if (theme === "bling" || theme === "pink") return "pink";
    return "day";   // light, warm, day, missing: the day background is always the airplane sky
  }

  function cloudStyle(anchorAt, sideAt, size, period, reverse, background, blend) {
    var s = { "--anchor": anchorAt, "--side": sideAt, "--size": size, "--period": period + "s",
      "--direction": reverse ? "reverse" : "normal", "background": background };
    if (blend) s["mix-blend-mode"] = blend;
    return s;
  }

  // Children of .bg-layer as plain objects: {key, cls, data, style, paths?}. Style keys are CSS property names.
  function nodes(theme, width) {
    var sky = skyOf(theme), W = width || 1920, out = [];
    var edge = function (x) { return x < 0 ? -60 : W + 60; };
    out.push({ key: "a1", cls: "aurora" }, { key: "a2", cls: "aurora b" });
    if (sky === "day") {
      DAY_CLOUDS.forEach(function (c, i) {
        var rgb = c[8], alpha = c[9];
        var at = function (share) { return "rgba(" + rgb + "," + (alpha * share).toFixed(3) + ")"; };
        var bg = "radial-gradient(circle, " + at(1) + " 0%, " + at(0.94) + " 26%, " + at(0.72) + " 45%, " + at(0.36) + " 64%, " + at(0.1) + " 80%, " + at(0) + " 92%)";
        out.push({ key: "c" + i, cls: "cloud", data: { anchor: c[0], side: c[2], orbit: c[5] },
          style: cloudStyle(c[1], c[3], c[4], c[6], c[7], bg, c[10]) });
      });
      DAY_ROUTES.forEach(function (r, i) {
        var x1 = edge(r[0]), y1 = r[1], x2 = edge(r[2]), y2 = r[3];
        var len = Math.round(Math.hypot(x2 - x1, y2 - y1));
        out.push({ key: "f" + i, cls: "flight", paths: PLANE_PATHS, style: {
          "--delay": i * 12 + "s", "--rv": (i < 5 ? -(3 + i * 2) : 0) + "s", "--plane-size": r[4], "--len": len,
          "offset-path": 'path("M ' + x1 + " " + y1 + " L " + x2 + " " + y2 + '")' } });
      });
    } else {
      FIELD_CLOUDS.forEach(function (c, i) {
        var bg = "radial-gradient(circle, " + FIELD_COLOURS[sky][i] + " 0%, transparent " + (sky === "night" ? "72%" : "70%") + ")";
        out.push({ key: "c" + i, cls: "cloud", data: { anchor: c[0], side: c[2], orbit: c[5] },
          style: cloudStyle(c[1], c[3], c[4], c[6], c[7], bg, null) });
      });
      if (sky === "night") {
        out.push({ key: "mw", cls: "milkyway" });
        NIGHT_DUST.forEach(function (d, i) {
          out.push({ key: "d" + i, cls: "mwdust", style: { top: d[0], left: d[1], width: d[2] + "px", height: d[2] + "px", opacity: d[3] } });
        });
        NIGHT_SHOOTERS.forEach(function (s, i) {
          out.push({ key: "s" + i, cls: "shoot", style: { top: s[0], left: s[1], "--delay": s[2] + "s", "--duration": s[3] + "s" } });
        });
      }
      SPARKS.forEach(function (p, i) {
        out.push({ key: "p" + i, cls: "spark", style: { top: p[0], left: p[1], width: p[2] + "px", height: p[2] + "px",
          "--duration": p[3] + "s", "--delay": p[4] + "s" } });
      });
    }
    return out;
  }

  var camel = function (k) { return k.indexOf("--") === 0 ? k : k.replace(/-([a-z])/g, function (_, c) { return c.toUpperCase(); }); };

  function toReact(R, n) {
    var style = {}, props = { key: n.key, className: n.cls };
    if (n.style) Object.keys(n.style).forEach(function (k) { style[camel(k)] = n.style[k]; });
    props.style = style;
    if (n.data) Object.keys(n.data).forEach(function (k) { props["data-" + k] = n.data[k]; });
    if (!n.paths) return R.createElement("div", props);
    return R.createElement("div", props, R.createElement("svg", { viewBox: "-55 -42 110 84" },
      n.paths.map(function (d, j) { return R.createElement("path", { key: j, d: d, fill: PLANE_FILL[j === 0 ? 0 : 1] }); })));
  }

  function Background(props) {
    var R = root.React;
    var st = R.useState(typeof innerWidth === "number" ? innerWidth : 1920), W = st[0], setW = st[1];
    R.useEffect(function () {
      var onResize = function () { setW(innerWidth); };
      onResize();
      addEventListener("resize", onResize);
      return function () { removeEventListener("resize", onResize); };
    }, []);
    var sky = skyOf(props.theme);
    return R.createElement("div", { className: "bg-layer", "data-sky": sky, "aria-hidden": "true" },
      nodes(props.theme, W).map(function (n) { return toReact(R, n); }));
  }

  function mount(el, theme) {
    var doc = el.ownerDocument, layer = doc.createElement("div"), cur = theme;
    layer.className = "bg-layer";
    layer.setAttribute("aria-hidden", "true");
    var draw = function () {
      layer.setAttribute("data-sky", skyOf(cur));
      layer.textContent = "";
      nodes(cur, (doc.defaultView || root).innerWidth).forEach(function (n) {
        var d = doc.createElement("div");
        d.className = n.cls;
        if (n.style) Object.keys(n.style).forEach(function (k) { d.style.setProperty(k, String(n.style[k])); });
        if (n.data) Object.keys(n.data).forEach(function (k) { d.setAttribute("data-" + k, n.data[k]); });
        if (n.paths) {
          var NS = "http://www.w3.org/2000/svg", svg = doc.createElementNS(NS, "svg");
          svg.setAttribute("viewBox", "-55 -42 110 84");
          n.paths.forEach(function (p, j) {
            var path = doc.createElementNS(NS, "path");
            path.setAttribute("d", p); path.setAttribute("fill", PLANE_FILL[j === 0 ? 0 : 1]);
            svg.appendChild(path);
          });
          d.appendChild(svg);
        }
        layer.appendChild(d);
      });
    };
    draw();
    el.insertBefore(layer, el.firstChild);
    var win = doc.defaultView || root;
    win.addEventListener("resize", draw);
    return { layer: layer, set: function (t) { cur = t; draw(); },
      destroy: function () { win.removeEventListener("resize", draw); layer.remove(); } };
  }

  var api = { DAY_CLOUDS: DAY_CLOUDS, DAY_ROUTES: DAY_ROUTES, PLANE_PATHS: PLANE_PATHS, FIELD_CLOUDS: FIELD_CLOUDS,
    FIELD_COLOURS: FIELD_COLOURS, SPARKS: SPARKS, NIGHT_DUST: NIGHT_DUST, NIGHT_SHOOTERS: NIGHT_SHOOTERS,
    skyOf: skyOf, nodes: nodes, Background: Background, mount: mount };
  root.QQQSky = api;
  if (typeof module === "object" && module.exports) module.exports = api;
})(typeof window !== "undefined" ? window : globalThis);
