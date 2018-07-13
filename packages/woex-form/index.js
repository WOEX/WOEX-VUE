console.log("START WEEX VUE RENDER: 1.0.17, Build 2018-01-31 21:42."), function(e, t) {
  "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : e.WeexVueRender = t()
}(this, function() {
  "use strict";

  function e(e, t) {
    if ("undefined" == typeof document) return t;
    e = e || "";
    var n = document.head || document.getElementsByTagName("head")[0],
      i = document.createElement("style");
    return i.type = "text/css", n.appendChild(i), i.styleSheet ? i.styleSheet.cssText = e : i.appendChild(document.createTextNode(e)), t
  }
  function t(e, t) {
    return t = {
      exports: {}
    }, e(t, t.exports), t.exports
  }
  function n(e, t) {
    for (var n = e; n;) {
      if (n.contains(t) || n == t) return n;
      n = n.parentNode
    }
    return null
  }
  function i(e, t, n) {
    var i = ii.createEvent("HTMLEvents");
    if (i.initEvent(t, !0, !0), "object" == typeof n) for (var r in n) i[r] = n[r];
    i._for = "weex", e.dispatchEvent(i)
  }
  function r(e) {
    for (var t = 0; t < e.changedTouches.length; t++) {
      var r = e.changedTouches[t];
      if (!(v = ai[r.identifier])) return;
      v.lastTouch || (v.lastTouch = v.startTouch), v.lastTime || (v.lastTime = v.startTime), v.velocityX || (v.velocityX = 0), v.velocityY || (v.velocityY = 0), v.duration || (v.duration = 0);
      var o = Date.now() - v.lastTime,
        a = (r.clientX - v.lastTouch.clientX) / o,
        s = (r.clientY - v.lastTouch.clientY) / o;
      o > 70 && (o = 70), v.duration + o > 70 && (v.duration = 70 - o), v.velocityX = (v.velocityX * v.duration + a * o) / (v.duration + o), v.velocityY = (v.velocityY * v.duration + s * o) / (v.duration + o), v.duration += o, v.lastTouch = {};
      for (var c in r) v.lastTouch[c] = r[c];
      v.lastTime = Date.now();
      var l = r.clientX - v.startTouch.clientX,
        u = r.clientY - v.startTouch.clientY,
        d = Math.sqrt(Math.pow(l, 2) + Math.pow(u, 2)),
        h = !(Math.abs(l) > Math.abs(u)),
        f = h ? u >= 0 ? "down" : "up" : l >= 0 ? "right" : "left";
      ("tapping" === v.status || "pressing" === v.status) && d > 10 && (v.status = "panning", v.isVertical = h, v.direction = f, i(v.element, "panstart", {
        touch: r,
        touches: e.touches,
        changedTouches: e.changedTouches,
        touchEvent: e,
        isVertical: v.isVertical,
        direction: f
      })), "panning" === v.status && (v.panTime = Date.now(), i(v.element, "panmove", {
        displacementX: l,
        displacementY: u,
        touch: r,
        touches: e.touches,
        changedTouches: e.changedTouches,
        touchEvent: e,
        isVertical: v.isVertical,
        direction: f
      }))
    }
    if (2 == Object.keys(ai).length) {
      var p, m = [],
        g = [],
        w = [];
      for (t = 0; t < e.touches.length; t++) {
        r = e.touches[t];
        var v = ai[r.identifier];
        m.push([v.startTouch.clientX, v.startTouch.clientY]), g.push([r.clientX, r.clientY])
      }
      for (var c in ai) w.push(ai[c].element);
      p = function(e, t, n, i, r, o, a, s) {
        var c = Math.atan2(s - o, a - r) - Math.atan2(i - t, n - e),
          l = Math.sqrt((Math.pow(s - o, 2) + Math.pow(a - r, 2)) / (Math.pow(i - t, 2) + Math.pow(n - e, 2))),
          u = [r - l * e * Math.cos(c) + l * t * Math.sin(c), o - l * t * Math.cos(c) - l * e * Math.sin(c)];
        return {
          rotate: c,
          scale: l,
          translate: u,
          matrix: [
            [l * Math.cos(c), -l * Math.sin(c), u[0]],
            [l * Math.sin(c), l * Math.cos(c), u[1]],
            [0, 0, 1]
          ]
        }
      }(m[0][0], m[0][1], m[1][0], m[1][1], g[0][0], g[0][1], g[1][0], g[1][1]), i(n(w[0], w[1]), "dualtouch", {
        transform: p,
        touches: e.touches,
        touchEvent: e
      })
    }
  }
  function o(e) {
    if (2 == Object.keys(ai).length) {
      var t = [];
      for (var s in ai) t.push(ai[s].element);
      i(n(t[0], t[1]), "dualtouchend", {
        touches: oi.call(e.touches),
        touchEvent: e
      })
    }
    for (var c = 0; c < e.changedTouches.length; c++) {
      var l = e.changedTouches[c],
        u = l.identifier,
        d = ai[u];
      if (d) {
        if (d.pressingHandler && (clearTimeout(d.pressingHandler), d.pressingHandler = null), "tapping" === d.status && (d.timestamp = Date.now(), i(d.element, "weex$tap", {
            touch: l,
            touchEvent: e
          }), si && d.timestamp - si.timestamp < 300 && i(d.element, "doubletap", {
            touch: l,
            touchEvent: e
          }), si = d), "panning" === d.status) {
          var h = Date.now(),
            f = h - d.startTime,
            p = l.clientX - d.startTouch.clientX,
            m = l.clientY - d.startTouch.clientY,
            g = Math.sqrt(d.velocityY * d.velocityY + d.velocityX * d.velocityX) > .5 && h - d.lastTime < 100,
            w = {
              duration: f,
              isSwipe: g,
              velocityX: d.velocityX,
              velocityY: d.velocityY,
              displacementX: p,
              displacementY: m,
              touch: l,
              touches: e.touches,
              changedTouches: e.changedTouches,
              touchEvent: e,
              isVertical: d.isVertical,
              direction: d.direction
            };
          i(d.element, "panend", w), g && i(d.element, "swipe", w)
        }
        "pressing" === d.status && i(d.element, "pressend", {
          touch: l,
          touchEvent: e
        }), delete ai[u]
      }
    }
    0 === Object.keys(ai).length && (ri.removeEventListener("touchmove", r, !1), ri.removeEventListener("touchend", o, !1), ri.removeEventListener("touchcancel", a, !1))
  }
  function a(e) {
    if (2 == Object.keys(ai).length) {
      var t = [];
      for (var s in ai) t.push(ai[s].element);
      i(n(t[0], t[1]), "dualtouchend", {
        touches: oi.call(e.touches),
        touchEvent: e
      })
    }
    for (var c = 0; c < e.changedTouches.length; c++) {
      var l = e.changedTouches[c],
        u = l.identifier,
        d = ai[u];
      d && (d.pressingHandler && (clearTimeout(d.pressingHandler), d.pressingHandler = null), "panning" === d.status && i(d.element, "panend", {
        touch: l,
        touches: e.touches,
        changedTouches: e.changedTouches,
        touchEvent: e
      }), "pressing" === d.status && i(d.element, "pressend", {
        touch: l,
        touchEvent: e
      }), delete ai[u])
    }
    0 === Object.keys(ai).length && (ri.removeEventListener("touchmove", r, !0), ri.removeEventListener("touchend", o, !0), ri.removeEventListener("touchcancel", a, !0))
  }
  function s(e) {
    Object.defineProperty(this, "val", {
      value: e.toString(),
      enumerable: !0
    }), this.gt = function(e) {
      return s.compare(this, e) > 0
    }, this.gte = function(e) {
      return s.compare(this, e) >= 0
    }, this.lt = function(e) {
      return s.compare(this, e) < 0
    }, this.lte = function(e) {
      return s.compare(this, e) <= 0
    }, this.eq = function(e) {
      return 0 === s.compare(this, e)
    }
  }
  function c(e) {
    return bi.call(e) === yi
  }
  function l(e) {
    return bi.call(e) === xi
  }
  function u(e) {
    return "string" == typeof value || "number" == typeof value || "symbol" == typeof value || "boolean" == typeof value
  }
  function d(e) {
    return void 0 !== e && null !== e
  }
  function h(e) {
    for (var t = [], n = arguments.length - 1; n-- > 0;) t[n] = arguments[n + 1];
    return !t || t.length <= 0 ? e : (t.forEach(function(t) {
      if ("object" == typeof t) for (var n in t) e[n] = t[n]
    }), e)
  }
  function f(e) {
    for (var t = [], n = arguments.length - 1; n-- > 0;) t[n] = arguments[n + 1];
    return !t || t.length <= 0 ? e : (t.forEach(function(t) {
      if ("object" == typeof t) {
        var n;
        for (var i in t)!(n = t[i]) && "" !== n && 0 !== n || "undefined" === n || (e[i] = n)
      }
    }), e)
  }
  function p(e, t) {
    var n;
    return function() {
      for (var i = [], r = arguments.length; r--;) i[r] = arguments[r];
      clearTimeout(n), n = setTimeout(function() {
        n = null, e.apply(null, i)
      }, t)
    }
  }
  function m(e, t, n) {
    var i = 0,
      r = null,
      o = t + (t > 25 ? t : 25);
    return function() {
      for (var a = [], s = arguments.length; s--;) a[s] = arguments[s];
      var c = this,
        l = (new Date).getTime();
      l - i > t && (n && (r && clearTimeout(r), r = setTimeout(function() {
        r = null, e.apply(c, a)
      }, o)), e.apply(c, a), i = l)
    }
  }
  function g(e) {
    var t = Object.create(null);
    return function(n) {
      return t[n] || (t[n] = e(n))
    }
  }
  function w(e) {
    var t = {};
    for (var n in e) {
      t[ki(n).replace(Ei, function(e) {
        return "-" + e
      })] = e[n]
    }
    return t
  }
  function v(e, t, n) {
    var i = document.getElementById(t);
    i && n && (i.parentNode.removeChild(i), i = null), i || ((i = document.createElement("style")).type = "text/css", t && (i.id = t), document.getElementsByTagName("head")[0].appendChild(i)), i.appendChild(document.createTextNode(e))
  }
  function b(e) {
    for (var t = [], n = arguments.length - 1; n-- > 0;) t[n] = arguments[n + 1];
    return !t || t.length <= 0 ? e : (t.forEach(function(t) {
      if ("object" == typeof t) for (var n in t) e[n] = t[n]
    }), e)
  }
  function y(e, t, n) {
    var i = new Event(t, {
      bubbles: !1
    });
    if (b(i, n), -1 !== window.navigator.userAgent.toLowerCase().indexOf("phantomjs")) return i;
    try {
      Object.defineProperty(i, "target", {
        enumerable: !0,
        value: e
      })
    } catch (t) {
      return b({}, i, {
        target: e
      })
    }
    return i
  }
  function x(e, t, n) {
    e.dispatchEvent(y(e, t, n))
  }
  function _(e) {
    if ("boolean" == typeof e._insideA) return e._insideA;
    for (var t = e.parentElement, n = [], i = function(t) {
      return e._insideA = t, function(e) {
        for (var t = 0, i = n.length; t < i; t++) n[t]._insideA = e
      }(t), t
    }; t !== document.body;) {
      if ("a" === t.tagName.toLowerCase()) return i(!0);
      if ("boolean" == typeof t._insideA) return i(t._insideA);
      n.push(t), t = t.parentElement
    }
    return i(!1)
  }
  function S(e) {
    function t(n) {
      if (n) return Fi.scrollableTypes.indexOf(n.weexType) > -1 ? (e._parentScroller = n, n) : t(n.$parent)
    }
    return e ? e._parentScroller ? e._parentScroller : t(e.$parent) : null
  }
  function T(e) {
    function t(n) {
      if (n) {
        var i = n.tagName.toLowerCase();
        return "body" === i || "main" === i && Fi.scrollableTypes.indexOf(n.getAttribute("weex-type")) > -1 ? (e._parentScroller = n, n) : t(n.parentElement)
      }
    }
    if (!e) return null;
    var n = e instanceof HTMLElement ? e : e.$el;
    if (n && 1 === n.nodeType) return e._parentScroller ? e._parentScroller : t(n)
  }
  function C(e, t, n, i) {
    var r = "up" === (n = n || "up") || "down" === n;
    if (("left" === n || "right" === n) && !
        function(e, t) {
          return e.top < t.bottom && e.bottom > t.top
        }(e, t)) return [!1, !1];
    if (r && !
        function(e, t) {
          return e.left < t.right && e.right > t.left
        }(e, t)) return [!1, !1];
    switch (i = i ? parseInt(i) * weex.config.env.scale : 0, n) {
      case "up":
        return [e.top < t.bottom && e.bottom > t.top, e.top < t.bottom + i && e.bottom > t.top - i];
      case "down":
        return [e.bottom > t.top && e.top < t.bottom, e.bottom > t.top - i && e.top < t.bottom + i];
      case "left":
        return [e.left < t.right && e.right > t.left, e.left < t.right + i && e.right > t.left - i];
      case "right":
        return [e.right > t.left && e.left < t.right, e.right > t.left - i && e.left < t.right + i]
    }
  }
  function k(e, t, n, i) {
    if (!e.getBoundingClientRect) return !1;
    var r = {
        top: 0,
        left: 0,
        bottom: window.innerHeight,
        right: window.innerWidth
      },
      o = t === window || t === document.body ? r : t ? t.getBoundingClientRect() : r;
    return C(e.getBoundingClientRect(), o, n, i)
  }
  function E(e, t, n) {
    x(e, t, {
      direction: n
    })
  }
  function I(e) {
    return e && e.getAttribute("appear-offset")
  }
  function O(e, t) {
    var n = e && e.$el;
    if (n && 1 === n.nodeType) {
      var i = !1,
        r = T(e);
      if (r) {
        r === document.body && (i = !0);
        var o = r._scrollHandler;
        o || (o = r._scrollHandler = function(e) {
          !
            function(e) {
              e._watchAppearList = Array.prototype.slice.call(e.querySelectorAll("[weex-appear]"))
            }(r);
          var t = i ? window.pageYOffset : r.scrollTop,
            n = r._lastScrollTop;
          r._lastScrollTop = t;
          var o = (t < n ? "down" : t > n ? "up" : r._prevDirection) || null;
          r._prevDirection = o;
          for (var a = r._watchAppearList || [], s = a.length, c = 0; c < s; c++) {
            var l = a[c],
              u = I(l);
            N(l, k(l, r, o, u), o)
          }
        }, r.addEventListener("scroll", m(o, 100, !0))), t && e.$nextTick(o)
      }
    }
  }
  function N(e, t, n, i) {
    if (void 0 === n && (n = null), e) {
      var r = t[0],
        o = t[1];
      if ((e._appearedOnce || r) && e._visible !== r) {
        var a = r ? "appear" : "disappear";
        "" === e.getAttribute("data-evt-" + a) && (e._appearedOnce || (e._appearedOnce = !0), e._visible = r, E(e, a, n))
      }
      if ((e._offsetAppearedOnce || o) && e._offsetVisible !== o) {
        var s = o ? ["offset-appear", "offsetAppear"] : ["offset-disappear", "offsetDisappear"];
        "" === e.getAttribute("data-evt-" + s[0]) && (e._offsetAppearedOnce || (e._offsetAppearedOnce = !0), e._offsetVisible = o, E(e, s[1], n))
      }
    }
  }
  function A(e, t, n) {
    var i = new Image;
    i.onload = t ? t.bind(i) : null, i.onerror = n ? n.bind(i) : null, i.src = e
  }
  function L(e, t, n) {
    function i() {
      delete e._src_loading
    }
    t && (window._processImgSrc && (t = window._processImgSrc(t, e), n && (n = window._processImgSrc(n, e))), e._src_loading !== t && (e.style.backgroundImage = "url(" + (t || "") + ")", e.removeAttribute(Di), e._src_loading = t, A(t, function(n) {
      e.style.backgroundImage = "url(" + (t || "") + ")";
      var r = this.width,
        o = this.height;
      x(e, "load", {
        success: !0,
        size: {
          naturalWidth: r,
          naturalHeight: o
        }
      }), i()
    }, function(t) {
      x(e, "load", {
        success: !1,
        size: {
          naturalWidth: 0,
          naturalHeight: 0
        }
      }), n && A(n, function() {
        e.style.backgroundImage = "url(" + (n || "") + ")"
      }), i()
    })))
  }
  function j(e) {
    if (e) {
      var t = e._ptScroller;
      if (!t) {
        for (var n = e.parentElement; n && n !== document.body;) {
          if ((n.className + "" || "").match(/weex-list|weex-scroller|weex-waterfall/)) {
            t = n;
            break
          }
          n = n.parentElement
        }
        t = n, e._ptScroller = n
      }
      return t
    }
  }
  function $(e, t) {
    if (Array.isArray(e)) return e.forEach(function(e) {
      return $(e)
    });
    if (e = e || document.body) {
      var n = (e || document.body).querySelectorAll("[" + Di + "]");
      e.getAttribute(Di) && (n = [e]);
      for (var i = 0; i < n.length; i++) {
        var r = n[i];
        "boolean" == typeof t && t ? L(r, r.getAttribute(Di), r.getAttribute(Vi)) : k(r, j(e))[0] && L(r, r.getAttribute(Di), r.getAttribute(Vi))
      }
    }
  }
  function P(e, t) {
    void 0 === e && (e = 16), void 0 === t && (t = document.body);
    var n = +(t && t.dataset.throttleId);
    (isNaN(n) || n <= 0) && (n = Ui++, t && t.setAttribute("data-throttle-id", n + "")), !Yi[n] && (Yi[n] = {});
    return Yi[n][e] || (Yi[n][e] = m($.bind(this, t), parseFloat(e), !0))
  }
  function z() {
    if (void 0 === Hi) {
      var e = window.devicePixelRatio;
      if (e && e >= 2 && document.documentElement) {
        var t = document.documentElement,
          n = document.createElement("div"),
          i = document.createElement("body"),
          r = t.firstElementChild || t.firstChild;
        n.style.border = "0.5px solid transparent", i.appendChild(n), t.insertBefore(i, r), Hi = 1 === n.offsetHeight, t.removeChild(i)
      } else Hi = !1
    }
    return Hi
  }
  function R(e) {
    var t = {};
    if (!e) return t;
    var n = e.style.webkitTransform || e.style.mozTransform || e.style.transform;
    return n && n.match(/(?: *(?:translate|rotate|scale)[^(]*\([^(]+\))+/i) && (t = n.trim().replace(/, +/g, ",").split(" ").reduce(function(e, t) {
      return ["translate", "scale", "rotate"].forEach(function(n) {
        new RegExp(n, "i").test(t) && (e[n] = t)
      }), e
    }, {})), t
  }
  function M(e) {
    return Object.keys(e).reduce(function(t, n) {
      return t + e[n] + " "
    }, "")
  }
  function B(e) {
    for (var t = e.length, n = 0, i = 0; i < t; i++) n += e[i].getBoundingClientRect().width;
    return n
  }
  function F(e, t) {
    return e.replace(/([+-]?\d+(?:.\d*)?)([p|w]x)/g, function(e, n, i) {
      if ("wx" === i) return n + "px";
      var r = parseFloat(n),
        o = r > 0 ? 1 : r < 0 ? -1 : 0;
      return Math.abs(r) <= 1 ? z() ? .5 * o + "px" : 1 * o + "px" : r / (t || window.weex.config.env.rem) + "rem"
    })
  }
  function W(e) {
    var t = e.data || {};
    return f({}, t.staticStyle, t.style)
  }
  function H(e) {
    var t = e && e.$vnode;
    if (!t) return {};
    for (var n = {}; t;) h(n, W(t)), t = t.parent;
    return n
  }
  function D(e, t) {
    return function(e, n, i, r, o) {
      return (l(n) || u()) && (r = i, i = n, n = {}), d(n) || (n = {}), d(n.is) && (e = n.is), "string" == typeof e ? (n = q(this, n, e), e = V(this, e)) : n = q(this, n, void 0), t.call(this, e, n, i, r, o)
    }.bind(e)
  }
  function V(e, t) {
    return rr[t] || t
  }
  function Y(e, t, n, i, r) {
    for (var o in t) {
      var a = nr[o];
      if (a) n["data-evt-" + a] = "", r.value || (r.value = !0, n["weex-appear"] = "");
      else if (n["data-evt-" + o] = "", "click" !== o) {
        var s = t[o];
        l(t[o]) ? s.unshift(e.$stopPropagation) : t[o] = [e.$stopPropagation, s]
      }
    }
    t.click && (t.weex$tap = t.click, t.click = e.$stopOuterA), t.scroll && (t.weex$scroll = t.scroll, delete t.scroll)
  }
  function U(e, t, n) {
    var i = t.style;
    if (i) {
      var r = er(function(e) {
        return or[e] || e
      }(n));
      t.style = r ? e._px2rem(r.transform(i), 75) : e._px2rem(i, 75)
    }
  }
  function q(e, t, n) {
    if (l(t)) return t;
    var i = function(e) {
      return Fi.weexBuiltInComponents.indexOf(e) > -1
    }(n);
    return i &&
    function(e, t) {
      var n = e.class,
        i = ar[t];
      n || (n = e.class = []), n && l(n) ? e.class = n.concat(Object.keys(i)) : "object" == typeof n && Object.assign(n, i)
    }(t, n), U(e, t, n), i &&
    function(e, t) {
      var n = e.attrs,
        i = e.directives;
      if (n || (n = e.attrs = {}), n["weex-type"] = t, "image" === t) {
        var r = n.src,
          o = n.resize;
        r && (n["data-img-src"] = r), o && (i || (i = e.directives = []), i.push({
          name: "weex-resize",
          value: n.resize
        }))
      }
    }(t, n), function(e, t, n) {
      var i = t.on,
        r = t.nativeOn;
      tr.indexOf(n) > -1 && (r = null, delete t.nativeOn), d(weex._components[n]) && (delete t.nativeOn, r = null, i && (r = t.nativeOn = i), i = null, delete t.on);
      var o = t.attrs;
      o || (o = t.attrs = {});
      var a = {
        value: !1
      };
      if (i && Y(e, i, o, 0, a), r && Y(e, r, o, 0, a), "a" === n) {
        i || (i = t.on = {});
        var s = i.weex$tap;
        s ? Array.isArray(s) ? s.unshift(e.$stopPropagation) : s = [e.$stopPropagation, s] : i.weex$tap = e.$stopPropagation
      }
    }(e, t, n), t
  }
  function K(e) {
    if (!e) throw new Error("[Vue Render] Vue not found. Please make sure vue 2.x runtime is imported.");
    global.weex.__vue__ || (global.weex.__vue__ = e, weex.install(yr), console.log("[Vue Render] install Vue " + e.version + "."))
  }
  function X(e) {
    if (!xr) {
      xr = !0, K(e), e.prototype.$getConfig = function() {
        return console.warn('[Vue Render] "this.$getConfig" is deprecated, please use "weex.config" instead.'), weex.config
      };
      var t = /^html:/i;
      e.config.isReservedTag = function(e) {
        return t.test(e)
      }, e.config.parsePlatformTagName = function(e) {
        return e.replace(t, "")
      };
      var n = e.config.getTagNamespace;
      e.config.getTagNamespace = function(e) {
        if (!
            function(e) {
              return void 0 !== weex._components[e]
            }(e)) return n(e)
      }, e.mixin(fr), e.mixin(pr), e.mixin(gr), e.mixin(vr)
    }
  }
  function G(e) {
    var t = H(e),
      n = t.placeholderColor || t["placeholder-color"];
    return n &&
    function(e, t) {
      if (t) {
        var n = ["::-webkit-input-placeholder", ":-moz-placeholder", "::-moz-placeholder", ":-ms-input-placeholder", ":placeholder-shown"],
          i = e._id;
        Sr(n.map(function(e, r) {
          return "#" + Cr + i + n[r] + "{color:" + t + ";}"
        }).join(""), "" + Tr + i, !0)
      }
    }(e, n), t
  }
  function Q(e, t) {
    !
      function(e) {
        e._styleSheet || (e._styleSheet = Ar("weex-cmp-loading-indicator"))
      }(e);
    for (var n = function(e) {
      if (!e) return;
      for (var t = ["0em -1.3em 0em 0em", "0.9em -0.9em 0 0em", "1.25em 0em 0 0em", "0.875em 0.875em 0 0em", "0em 1.25em 0 0em", "-0.9em 0.9em 0 0em", "-1.3em 0em 0 0em", "-0.9em -0.9em 0 0em"], n = ["1", "0.2", "0.2", "0.2", "0.2", "0.2", "0.5", "0.7"].map(function(t) {
        return "rgba(" + e.r + "," + e.g + "," + e.b + "," + t + ")"
      }), i = [], r = function(e) {
        var r = Nr(n, e, "r");
        i.push(t.map(function(e, t) {
          return e + " " + r[t]
        }).join(", "))
      }, o = 0; o < t.length; o++) r(o);
      return i
    }(t), i = e._styleSheet.rules || e._styleSheet.cssRules, r = 0, o = i.length; r < o; r++) {
      var a = i.item(r);
      if ((a.type === CSSRule.KEYFRAMES_RULE || a.type === CSSRule.WEBKIT_KEYFRAMES_RULE) && "weex-spinner" === a.name) for (var s = a.cssRules, c = 0, l = s.length; c < l; c++) {
        var u = s[c];
        u.type !== CSSRule.KEYFRAME_RULE && u.type !== CSSRule.WEBKIT_KEYFRAME_RULE || (u.style.boxShadow = n[c])
      }
    }
  }
  function Z(e, t) {
    var n = {},
      i = t ? e.itemSelectedColor || e["item-selected-color"] : e.itemColor || e["item-color"];
    return n["background-color"] = i, n.width = n.height = e.itemSize || e["item-size"], n
  }
  function J(e, t, n) {
    e.performCallback(t, {
      result: fo,
      data: n || mo
    })
  }
  function ee(e, t) {
    e.performCallback(t, {
      result: fo,
      data: "localStorage is disabled or not supported."
    })
  }
  function te(e, t) {
    return t.encode ? t.strict ? _o(e) : encodeURIComponent(e) : e
  }
  function ne() {
    return (window.performance && window.performance.now ? window.performance.now.bind(window.performance) : Date.now)()
  }
  function ie(e, t) {
    if (this === document.body || this === window && window.scrollTo) return window.scrollTo(0, t);
    this["scroll" + e] = t
  }
  function re(e) {
    e.frame = window.requestAnimationFrame(re.bind(window, e));
    var t = (ne() - e.startTime) / 468,
      n = function(e) {
        return .5 * (1 - Math.cos(Math.PI * e))
      }(t = t > 1 ? 1 : t),
      i = e.startPosition + (e.position - e.startPosition) * n;
    e.method.call(e.scrollable, e.dSuffix, i), ~~i != ~~e.position || window.cancelAnimationFrame(e.frame)
  }
  function oe() {
    this.wrap = document.querySelector(na), this.node = document.querySelector(ia), this.wrap || this.createWrap(), this.node || this.createNode(), this.clearNode(), this.createNodeContent(), this.bindEvents()
  }
  function ae(e) {
    this.msg = e.message || "", this.callback = e.callback, this.okTitle = e.okTitle || "OK", oe.call(this), this.node.classList.add("weex-alert")
  }
  function se(e) {
    this.msg = e.message || "", this.callback = e.callback, this.okTitle = e.okTitle || "OK", this.cancelTitle = e.cancelTitle || "Cancel", oe.call(this), this.node.classList.add("weex-confirm")
  }
  function ce(e) {
    this.msg = e.message || "", this.defaultMsg = e.
      default ||"", this.callback = e.callback, this.okTitle = e.okTitle || "OK", this.cancelTitle = e.cancelTitle || "Cancel", oe.call(this), this.node.classList.add("weex-prompt")
  }
  e('/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * "License"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n \n.weex-root,\n.weex-root * {\n  color: initial;\n  cursor: initial;\n  direction: initial;\n  font: initial;\n  font-family: initial;\n  font-size: initial;\n  font-style: initial;\n  font-variant: initial;\n  font-weight: initial;\n  line-height: initial;\n  text-align: initial;\n  text-indent: initial;\n  visibility: initial;\n  white-space: initial;\n  word-spacing: initial;\n  font-family: BlinkMacSystemFont, \'Source Sans Pro\', \'Helvetica Neue\', Helvetica, Arial, sans-serif;\n}\n\n.weex-root,\n.weex-root *,\n.weex-root *::before,\n.weex-root *::after {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  -webkit-text-size-adjust: none;\n     -moz-text-size-adjust: none;\n      -ms-text-size-adjust: none;\n          text-size-adjust: none;\n}\n\n.weex-root a,\n.weex-root button,\n.weex-root [role="button"],\n.weex-root input,\n.weex-root label,\n.weex-root select,\n.weex-root textarea {\n      touch-action: manipulation;\n}\n\n.weex-root p,\n.weex-root ol,\n.weex-root ul,\n.weex-root dl,\n.weex-root figure {\n  margin: 0;\n  padding: 0;\n}\n\n.weex-root li {\n  list-style: none;\n}\n\n.weex-root figure {\n  margin: 0;\n}\n\n.weex-root textarea {\n  resize: none;\n}\n\n/* show no scroll bar. */\n::-webkit-scrollbar {\n  display: none;\n}\n', void 0), e('/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * "License"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n \n.weex-root * {\n  border-width: 0;\n  border-color: inherit;\n  border-style: solid;\n}\n\ndiv.weex-root {\n  min-height: 100%;\n}\n\n/**\n * slider will overflow in horizontal axis, which will cause container\n * horizontally expanding. below styles will prevent this from happening.\n */\n.weex-root {\n  width: 100%;\n  overflow-x: hidden;\n}\n\n.weex-root figure {\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n}\n\n.weex-flex-ct {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n}\n\n.weex-ct {\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: flex;\n  position: relative;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-flex-shrink: 0;\n          flex-shrink: 0;\n  -webkit-box-flex: 0;\n  -webkit-flex-grow: 0;\n          flex-grow: 0;\n  -webkit-flex-basis: auto;\n          flex-basis: auto;\n  -webkit-box-align: stretch;\n  -webkit-align-items: stretch;\n          align-items: stretch;\n  -webkit-align-content: flex-start;\n          align-content: flex-start;\n  border: 0 solid black;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n\n.weex-ct.horizontal {\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n\n.weex-el {\n  display: block;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n  position: relative;\n  -webkit-flex-shrink: 0;\n          flex-shrink: 0;\n  -webkit-box-flex: 0;\n  -webkit-flex-grow: 0;\n          flex-grow: 0;\n  -webkit-flex-basis: auto;\n          flex-basis: auto;\n  border: 0 solid black;\n  margin: 0;\n  padding: 0;\n  min-width: 0;\n}\n\n.weex-text {\n  display: -webkit-box;\n  display: -moz-box;\n  -webkit-box-orient: vertical;\n  position: relative;\n  white-space: pre-wrap;  /* not using \'pre\': support auto line feed. */\n  font-size: 0.4266666666666667rem;\n  word-wrap: break-word;\n  overflow: hidden; /* it\'ll be clipped if the height is not high enough. */\n}\n\n.weex-image {\n  background-repeat: no-repeat;\n  background-position: 50% 50%;\n  background-size: 100% 100%;\n}\n\n.weex-a {\n  text-decoration: none;\n}\n\n.weex-ios-sticky {\n  position: -webkit-sticky !important;\n  position: sticky !important;\n  z-index: 9999;\n  top: 0;\n}\n\n.weex-fixed {\n  position: fixed;\n  z-index: 1;\n}\n\n.weex-sticky {\n  position: fixed;\n  top: 0;\n  z-index: 9999;\n}\n', void 0);
  var le = Math.ceil,
    ue = Math.floor,
    de = function(e) {
      return isNaN(e = +e) ? 0 : (e > 0 ? ue : le)(e)
    },
    he = function(e) {
      if (void 0 == e) throw TypeError("Can't call method on  " + e);
      return e
    },
    fe = t(function(e) {
      var t = e.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
      "number" == typeof __g && (__g = t)
    }),
    pe = t(function(e) {
      var t = e.exports = {
        version: "2.5.2"
      };
      "number" == typeof __e && (__e = t)
    }),
    me = (pe.version, function(e) {
      return "object" == typeof e ? null !== e : "function" == typeof e
    }),
    ge = function(e) {
      if (!me(e)) throw TypeError(e + " is not an object!");
      return e
    },
    we = function(e) {
      try {
        return !!e()
      } catch (e) {
        return !0
      }
    },
    ve = !we(function() {
      return 7 != Object.defineProperty({}, "a", {
        get: function() {
          return 7
        }
      }).a
    }),
    be = fe.document,
    ye = me(be) && me(be.createElement),
    xe = function(e) {
      return ye ? be.createElement(e) : {}
    },
    _e = !ve && !we(function() {
      return 7 != Object.defineProperty(xe("div"), "a", {
        get: function() {
          return 7
        }
      }).a
    }),
    Se = function(e, t) {
      if (!me(e)) return e;
      var n, i;
      if (t && "function" == typeof(n = e.toString) && !me(i = n.call(e))) return i;
      if ("function" == typeof(n = e.valueOf) && !me(i = n.call(e))) return i;
      if (!t && "function" == typeof(n = e.toString) && !me(i = n.call(e))) return i;
      throw TypeError("Can't convert object to primitive value")
    },
    Te = Object.defineProperty,
    Ce = {
      f: ve ? Object.defineProperty : function(e, t, n) {
        if (ge(e), t = Se(t, !0), ge(n), _e) try {
          return Te(e, t, n)
        } catch (e) {}
        if ("get" in n || "set" in n) throw TypeError("Accessors not supported!");
        return "value" in n && (e[t] = n.value), e
      }
    },
    ke = function(e, t) {
      return {
        enumerable: !(1 & e),
        configurable: !(2 & e),
        writable: !(4 & e),
        value: t
      }
    },
    Ee = ve ?
      function(e, t, n) {
        return Ce.f(e, t, ke(1, n))
      } : function(e, t, n) {
        return e[t] = n, e
      }, Ie = {}.hasOwnProperty, Oe = function(e, t) {
      return Ie.call(e, t)
    }, Ne = 0, Ae = Math.random(), Le = function(e) {
      return "Symbol(".concat(void 0 === e ? "" : e, ")_", (++Ne + Ae).toString(36))
    }, je = t(function(e) {
      var t = Le("src"),
        n = "toString",
        i = Function[n],
        r = ("" + i).split(n);
      pe.inspectSource = function(e) {
        return i.call(e)
      }, (e.exports = function(e, n, i, o) {
        var a = "function" == typeof i;
        a && (Oe(i, "name") || Ee(i, "name", n)), e[n] !== i && (a && (Oe(i, t) || Ee(i, t, e[n] ? "" + e[n] : r.join(String(n)))), e === fe ? e[n] = i : o ? e[n] ? e[n] = i : Ee(e, n, i) : (delete e[n], Ee(e, n, i)))
      })(Function.prototype, n, function() {
        return "function" == typeof this && this[t] || i.call(this)
      })
    }), $e = function(e) {
      if ("function" != typeof e) throw TypeError(e + " is not a function!");
      return e
    }, Pe = function(e, t, n) {
      if ($e(e), void 0 === t) return e;
      switch (n) {
        case 1:
          return function(n) {
            return e.call(t, n)
          };
        case 2:
          return function(n, i) {
            return e.call(t, n, i)
          };
        case 3:
          return function(n, i, r) {
            return e.call(t, n, i, r)
          }
      }
      return function() {
        return e.apply(t, arguments)
      }
    }, ze = "prototype", Re = function(e, t, n) {
      var i, r, o, a, s = e & Re.F,
        c = e & Re.G,
        l = e & Re.S,
        u = e & Re.P,
        d = e & Re.B,
        h = c ? fe : l ? fe[t] || (fe[t] = {}) : (fe[t] || {})[ze],
        f = c ? pe : pe[t] || (pe[t] = {}),
        p = f[ze] || (f[ze] = {});
      c && (n = t);
      for (i in n) o = ((r = !s && h && void 0 !== h[i]) ? h : n)[i], a = d && r ? Pe(o, fe) : u && "function" == typeof o ? Pe(Function.call, o) : o, h && je(h, i, o, e & Re.U), f[i] != o && Ee(f, i, a), u && p[i] != o && (p[i] = o)
    };
  fe.core = pe, Re.F = 1, Re.G = 2, Re.S = 4, Re.P = 8, Re.B = 16, Re.W = 32, Re.U = 64, Re.R = 128;
  var Me = Re,
    Be = {},
    Fe = {}.toString,
    We = function(e) {
      return Fe.call(e).slice(8, -1)
    },
    He = Object("z").propertyIsEnumerable(0) ? Object : function(e) {
      return "String" == We(e) ? e.split("") : Object(e)
    },
    De = function(e) {
      return He(he(e))
    },
    Ve = Math.min,
    Ye = function(e) {
      return e > 0 ? Ve(de(e), 9007199254740991) : 0
    },
    Ue = Math.max,
    qe = Math.min,
    Ke = "__core-js_shared__",
    Xe = fe[Ke] || (fe[Ke] = {}),
    Ge = function(e) {
      return Xe[e] || (Xe[e] = {})
    },
    Qe = Ge("keys"),
    Ze = function(e) {
      return Qe[e] || (Qe[e] = Le(e))
    },
    Je = function(e) {
      return function(t, n, i) {
        var r, o = De(t),
          a = Ye(o.length),
          s = function(e, t) {
            return (e = de(e)) < 0 ? Ue(e + t, 0) : qe(e, t)
          }(i, a);
        if (e && n != n) {
          for (; a > s;) if ((r = o[s++]) != r) return !0
        } else for (; a > s; s++) if ((e || s in o) && o[s] === n) return e || s || 0;
        return !e && -1
      }
    }(!1),
    et = Ze("IE_PROTO"),
    tt = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(","),
    nt = Object.keys ||
      function(e) {
        return function(e, t) {
          var n, i = De(e),
            r = 0,
            o = [];
          for (n in i) n != et && Oe(i, n) && o.push(n);
          for (; t.length > r;) Oe(i, n = t[r++]) && (~Je(o, n) || o.push(n));
          return o
        }(e, tt)
      }, it = ve ? Object.defineProperties : function(e, t) {
      ge(e);
      for (var n, i = nt(t), r = i.length, o = 0; r > o;) Ce.f(e, n = i[o++], t[n]);
      return e
    }, rt = fe.document, ot = rt && rt.documentElement, at = Ze("IE_PROTO"), st = function() {}, ct = "prototype", lt = function() {
      var e, t = xe("iframe"),
        n = tt.length;
      for (t.style.display = "none", ot.appendChild(t), t.src = "javascript:", (e = t.contentWindow.document).open(), e.write("<script>document.F=Object<\/script>"), e.close(), lt = e.F; n--;) delete lt[ct][tt[n]];
      return lt()
    }, ut = Object.create ||
    function(e, t) {
      var n;
      return null !== e ? (st[ct] = ge(e), n = new st, st[ct] = null, n[at] = e) : n = lt(), void 0 === t ? n : it(n, t)
    }, dt = t(function(e) {
      var t = Ge("wks"),
        n = fe.Symbol,
        i = "function" == typeof n;
      (e.exports = function(e) {
        return t[e] || (t[e] = i && n[e] || (i ? n : Le)("Symbol." + e))
      }).store = t
    }), ht = Ce.f, ft = dt("toStringTag"), pt = function(e, t, n) {
      e && !Oe(e = n ? e : e.prototype, ft) && ht(e, ft, {
        configurable: !0,
        value: t
      })
    }, mt = {};
  Ee(mt, dt("iterator"), function() {
    return this
  });
  var gt = function(e) {
      return Object(he(e))
    },
    wt = Ze("IE_PROTO"),
    vt = Object.prototype,
    bt = Object.getPrototypeOf ||
      function(e) {
        return e = gt(e), Oe(e, wt) ? e[wt] : "function" == typeof e.constructor && e instanceof e.constructor ? e.constructor.prototype : e instanceof Object ? vt : null
      }, yt = dt("iterator"), xt = !([].keys && "next" in [].keys()), _t = "values", St = function() {
      return this
    }, Tt = function(e, t, n, i, r, o, a) {
      !
        function(e, t, n) {
          e.prototype = ut(mt, {
            next: ke(1, n)
          }), pt(e, t + " Iterator")
        }(n, t, i);
      var s, c, l, u = function(e) {
          if (!xt && e in p) return p[e];
          switch (e) {
            case "keys":
            case _t:
              return function() {
                return new n(this, e)
              }
          }
          return function() {
            return new n(this, e)
          }
        },
        d = t + " Iterator",
        h = r == _t,
        f = !1,
        p = e.prototype,
        m = p[yt] || p["@@iterator"] || r && p[r],
        g = m || u(r),
        w = r ? h ? u("entries") : g : void 0,
        v = "Array" == t ? p.entries || m : m;
      if (v && (l = bt(v.call(new e))) !== Object.prototype && l.next && (pt(l, d, !0), Oe(l, yt) || Ee(l, yt, St)), h && m && m.name !== _t && (f = !0, g = function() {
          return m.call(this)
        }), (xt || f || !p[yt]) && Ee(p, yt, g), Be[t] = g, Be[d] = St, r) if (s = {
          values: h ? g : u(_t),
          keys: o ? g : u("keys"),
          entries: w
        }, a) for (c in s) c in p || je(p, c, s[c]);
      else Me(Me.P + Me.F * (xt || f), t, s);
      return s
    }, Ct = function(e) {
      return function(t, n) {
        var i, r, o = String(he(t)),
          a = de(n),
          s = o.length;
        return a < 0 || a >= s ? e ? "" : void 0 : (i = o.charCodeAt(a)) < 55296 || i > 56319 || a + 1 === s || (r = o.charCodeAt(a + 1)) < 56320 || r > 57343 ? e ? o.charAt(a) : i : e ? o.slice(a, a + 2) : r - 56320 + (i - 55296 << 10) + 65536
      }
    }(!0);
  Tt(String, "String", function(e) {
    this._t = String(e), this._i = 0
  }, function() {
    var e, t = this._t,
      n = this._i;
    return n >= t.length ? {
      value: void 0,
      done: !0
    } : (e = Ct(t, n), this._i += e.length, {
      value: e,
      done: !1
    })
  });
  var kt = function(e, t, n, i) {
      try {
        return i ? t(ge(n)[0], n[1]) : t(n)
      } catch (t) {
        var r = e.
          return;
        throw void 0 !== r && ge(r.call(e)), t
      }
    },
    Et = dt("iterator"),
    It = Array.prototype,
    Ot = function(e) {
      return void 0 !== e && (Be.Array === e || It[Et] === e)
    },
    Nt = function(e, t, n) {
      t in e ? Ce.f(e, t, ke(0, n)) : e[t] = n
    },
    At = dt("toStringTag"),
    Lt = "Arguments" == We(function() {
      return arguments
    }()),
    jt = function(e) {
      var t, n, i;
      return void 0 === e ? "Undefined" : null === e ? "Null" : "string" == typeof(n = function(e, t) {
        try {
          return e[t]
        } catch (e) {}
      }(t = Object(e), At)) ? n : Lt ? We(t) : "Object" == (i = We(t)) && "function" == typeof t.callee ? "Arguments" : i
    },
    $t = dt("iterator"),
    Pt = pe.getIteratorMethod = function(e) {
      if (void 0 != e) return e[$t] || e["@@iterator"] || Be[jt(e)]
    },
    zt = dt("iterator"),
    Rt = !1;
  try {
    [7][zt]().
      return = function() {
      Rt = !0
    }
  } catch (e) {}
  var Mt = function(e, t) {
    if (!t && !Rt) return !1;
    var n = !1;
    try {
      var i = [7],
        r = i[zt]();
      r.next = function() {
        return {
          done: n = !0
        }
      }, i[zt] = function() {
        return r
      }, e(i)
    } catch (e) {}
    return n
  };
  Me(Me.S + Me.F * !Mt(function(e) {}), "Array", {
    from: function(e) {
      var t, n, i, r, o = gt(e),
        a = "function" == typeof this ? this : Array,
        s = arguments.length,
        c = s > 1 ? arguments[1] : void 0,
        l = void 0 !== c,
        u = 0,
        d = Pt(o);
      if (l && (c = Pe(c, s > 2 ? arguments[2] : void 0, 2)), void 0 == d || a == Array && Ot(d)) for (n = new a(t = Ye(o.length)); t > u; u++) Nt(n, u, l ? c(o[u], u) : o[u]);
      else for (r = d.call(o), n = new a; !(i = r.next()).done; u++) Nt(n, u, l ? kt(r, c, [i.value, u], !0) : i.value);
      return n.length = u, n
    }
  });
  pe.Array.from;
  var Bt = {
      f: Object.getOwnPropertySymbols
    },
    Ft = {
      f: {}.propertyIsEnumerable
    },
    Wt = Object.assign,
    Ht = !Wt || we(function() {
      var e = {},
        t = {},
        n = Symbol(),
        i = "abcdefghijklmnopqrst";
      return e[n] = 7, i.split("").forEach(function(e) {
        t[e] = e
      }), 7 != Wt({}, e)[n] || Object.keys(Wt({}, t)).join("") != i
    }) ?
      function(e, t) {
        for (var n = arguments, i = gt(e), r = arguments.length, o = 1, a = Bt.f, s = Ft.f; r > o;) for (var c, l = He(n[o++]), u = a ? nt(l).concat(a(l)) : nt(l), d = u.length, h = 0; d > h;) s.call(l, c = u[h++]) && (i[c] = l[c]);
        return i
      } : Wt;
  Me(Me.S + Me.F, "Object", {
    assign: Ht
  });
  pe.Object.assign;
  var Dt = Object.getOwnPropertyDescriptor,
    Vt = {
      f: ve ? Dt : function(e, t) {
        if (e = De(e), t = Se(t, !0), _e) try {
          return Dt(e, t)
        } catch (e) {}
        if (Oe(e, t)) return ke(!Ft.f.call(e, t), e[t])
      }
    },
    Yt = function(e, t) {
      if (ge(e), !me(t) && null !== t) throw TypeError(t + ": can't set as prototype!")
    },
    Ut = {
      set: Object.setPrototypeOf || ("__proto__" in {} ?
        function(e, t, n) {
          try {
            (n = Pe(Function.call, Vt.f(Object.prototype, "__proto__").set, 2))(e, []), t = !(e instanceof Array)
          } catch (e) {
            t = !0
          }
          return function(e, i) {
            return Yt(e, i), t ? e.__proto__ = i : n(e, i), e
          }
        }({}, !1) : void 0),
      check: Yt
    };
  Me(Me.S, "Object", {
    setPrototypeOf: Ut.set
  });
  pe.Object.setPrototypeOf;
  var qt = {};
  qt[dt("toStringTag")] = "z", qt + "" != "[object z]" && je(Object.prototype, "toString", function() {
    return "[object " + jt(this) + "]"
  }, !0);
  var Kt = dt("unscopables"),
    Xt = Array.prototype;
  void 0 == Xt[Kt] && Ee(Xt, Kt, {});
  var Gt = function(e) {
      Xt[Kt][e] = !0
    },
    Qt = function(e, t) {
      return {
        value: t,
        done: !! e
      }
    },
    Zt = Tt(Array, "Array", function(e, t) {
      this._t = De(e), this._i = 0, this._k = t
    }, function() {
      var e = this._t,
        t = this._k,
        n = this._i++;
      return !e || n >= e.length ? (this._t = void 0, Qt(1)) : Qt(0, "keys" == t ? n : "values" == t ? e[n] : [n, e[n]])
    }, "values");
  Be.Arguments = Be.Array, Gt("keys"), Gt("values"), Gt("entries");
  for (var Jt = dt("iterator"), en = dt("toStringTag"), tn = Be.Array, nn = {
    CSSRuleList: !0,
    CSSStyleDeclaration: !1,
    CSSValueList: !1,
    ClientRectList: !1,
    DOMRectList: !1,
    DOMStringList: !1,
    DOMTokenList: !0,
    DataTransferItemList: !1,
    FileList: !1,
    HTMLAllCollection: !1,
    HTMLCollection: !1,
    HTMLFormElement: !1,
    HTMLSelectElement: !1,
    MediaList: !0,
    MimeTypeArray: !1,
    NamedNodeMap: !1,
    NodeList: !0,
    PaintRequestList: !1,
    Plugin: !1,
    PluginArray: !1,
    SVGLengthList: !1,
    SVGNumberList: !1,
    SVGPathSegList: !1,
    SVGPointList: !1,
    SVGStringList: !1,
    SVGTransformList: !1,
    SourceBufferList: !1,
    StyleSheetList: !0,
    TextTrackCueList: !1,
    TextTrackList: !1,
    TouchList: !1
  }, rn = nt(nn), on = 0; on < rn.length; on++) {
    var an, sn = rn[on],
      cn = nn[sn],
      ln = fe[sn],
      un = ln && ln.prototype;
    if (un && (un[Jt] || Ee(un, Jt, tn), un[en] || Ee(un, en, sn), Be[sn] = tn, cn)) for (an in Zt) un[an] || je(un, an, Zt[an], !0)
  }
  var dn, hn, fn, pn = t(function(e) {
      var t = {},
        n = {},
        i = e.exports = function(e, i, r, o, a) {
          var s, c, l, u, d = a ?
            function() {
              return e
            } : Pt(e), h = Pe(r, o, i ? 2 : 1), f = 0;
          if ("function" != typeof d) throw TypeError(e + " is not iterable!");
          if (Ot(d)) {
            for (s = Ye(e.length); s > f; f++) if ((u = i ? h(ge(c = e[f])[0], c[1]) : h(e[f])) === t || u === n) return u
          } else for (l = d.call(e); !(c = l.next()).done;) if ((u = kt(l, h, c.value, i)) === t || u === n) return u
        };
      i.BREAK = t, i.RETURN = n
    }),
    mn = dt("species"),
    gn = fe.process,
    wn = fe.setImmediate,
    vn = fe.clearImmediate,
    bn = fe.MessageChannel,
    yn = fe.Dispatch,
    xn = 0,
    _n = {},
    Sn = "onreadystatechange",
    Tn = function() {
      var e = +this;
      if (_n.hasOwnProperty(e)) {
        var t = _n[e];
        delete _n[e], t()
      }
    },
    Cn = function(e) {
      Tn.call(e.data)
    };
  wn && vn || (wn = function(e) {
    for (var t = arguments, n = [], i = 1; arguments.length > i;) n.push(t[i++]);
    return _n[++xn] = function() {
      !
        function(e, t, n) {
          var i = void 0 === n;
          switch (t.length) {
            case 0:
              return i ? e() : e.call(n);
            case 1:
              return i ? e(t[0]) : e.call(n, t[0]);
            case 2:
              return i ? e(t[0], t[1]) : e.call(n, t[0], t[1]);
            case 3:
              return i ? e(t[0], t[1], t[2]) : e.call(n, t[0], t[1], t[2]);
            case 4:
              return i ? e(t[0], t[1], t[2], t[3]) : e.call(n, t[0], t[1], t[2], t[3])
          }
          e.apply(n, t)
        }("function" == typeof e ? e : Function(e), n)
    }, dn(xn), xn
  }, vn = function(e) {
    delete _n[e]
  }, "process" == We(gn) ? dn = function(e) {
    gn.nextTick(Pe(Tn, e, 1))
  } : yn && yn.now ? dn = function(e) {
    yn.now(Pe(Tn, e, 1))
  } : bn ? (fn = (hn = new bn).port2, hn.port1.onmessage = Cn, dn = Pe(fn.postMessage, fn, 1)) : fe.addEventListener && "function" == typeof postMessage && !fe.importScripts ? (dn = function(e) {
    fe.postMessage(e + "", "*")
  }, fe.addEventListener("message", Cn, !1)) : dn = Sn in xe("script") ?
    function(e) {
      ot.appendChild(xe("script"))[Sn] = function() {
        ot.removeChild(this), Tn.call(e)
      }
    } : function(e) {
      setTimeout(Pe(Tn, e, 1), 0)
    });
  var kn, En, In, On, Nn = {
      set: wn,
      clear: vn
    },
    An = Nn.set,
    Ln = fe.MutationObserver || fe.WebKitMutationObserver,
    jn = fe.process,
    $n = fe.Promise,
    Pn = "process" == We(jn),
    zn = {
      f: function(e) {
        return new function(e) {
          var t, n;
          this.promise = new e(function(e, i) {
            if (void 0 !== t || void 0 !== n) throw TypeError("Bad Promise constructor");
            t = e, n = i
          }), this.resolve = $e(t), this.reject = $e(n)
        }(e)
      }
    },
    Rn = function(e) {
      try {
        return {
          e: !1,
          v: e()
        }
      } catch (e) {
        return {
          e: !0,
          v: e
        }
      }
    },
    Mn = dt("species"),
    Bn = Nn.set,
    Fn = function() {
      var e, t, n, i = function() {
        var i, r;
        for (Pn && (i = jn.domain) && i.exit(); e;) {
          r = e.fn, e = e.next;
          try {
            r()
          } catch (i) {
            throw e ? n() : t = void 0, i
          }
        }
        t = void 0, i && i.enter()
      };
      if (Pn) n = function() {
        jn.nextTick(i)
      };
      else if (!Ln || fe.navigator && fe.navigator.standalone) if ($n && $n.resolve) {
        var r = $n.resolve();
        n = function() {
          r.then(i)
        }
      } else n = function() {
        An.call(fe, i)
      };
      else {
        var o = !0,
          a = document.createTextNode("");
        new Ln(i).observe(a, {
          characterData: !0
        }), n = function() {
          a.data = o = !o
        }
      }
      return function(i) {
        var r = {
          fn: i,
          next: void 0
        };
        t && (t.next = r), e || (e = r, n()), t = r
      }
    }(),
    Wn = "Promise",
    Hn = fe.TypeError,
    Dn = fe.process,
    Vn = fe[Wn],
    Yn = "process" == jt(Dn),
    Un = function() {},
    qn = En = zn.f,
    Kn = !!
      function() {
        try {
          var e = Vn.resolve(1),
            t = (e.constructor = {})[dt("species")] = function(e) {
              e(Un, Un)
            };
          return (Yn || "function" == typeof PromiseRejectionEvent) && e.then(Un) instanceof t
        } catch (e) {}
      }(), Xn = function(e) {
      var t;
      return !(!me(e) || "function" != typeof(t = e.then)) && t
    }, Gn = function(e, t) {
      if (!e._n) {
        e._n = !0;
        var n = e._c;
        Fn(function() {
          for (var i = e._v, r = 1 == e._s, o = 0, a = function(t) {
            var n, o, a = r ? t.ok : t.fail,
              s = t.resolve,
              c = t.reject,
              l = t.domain;
            try {
              a ? (r || (2 == e._h && Jn(e), e._h = 1), !0 === a ? n = i : (l && l.enter(), n = a(i), l && l.exit()), n === t.promise ? c(Hn("Promise-chain cycle")) : (o = Xn(n)) ? o.call(n, s, c) : s(n)) : c(i)
            } catch (e) {
              c(e)
            }
          }; n.length > o;) a(n[o++]);
          e._c = [], e._n = !1, t && !e._h && Qn(e)
        })
      }
    }, Qn = function(e) {
      Bn.call(fe, function() {
        var t, n, i, r = e._v,
          o = Zn(e);
        if (o && (t = Rn(function() {
            Yn ? Dn.emit("unhandledRejection", r, e) : (n = fe.onunhandledrejection) ? n({
              promise: e,
              reason: r
            }) : (i = fe.console) && i.error && i.error("Unhandled promise rejection", r)
          }), e._h = Yn || Zn(e) ? 2 : 1), e._a = void 0, o && t.e) throw t.v
      })
    }, Zn = function(e) {
      if (1 == e._h) return !1;
      for (var t, n = e._a || e._c, i = 0; n.length > i;) if ((t = n[i++]).fail || !Zn(t.promise)) return !1;
      return !0
    }, Jn = function(e) {
      Bn.call(fe, function() {
        var t;
        Yn ? Dn.emit("rejectionHandled", e) : (t = fe.onrejectionhandled) && t({
          promise: e,
          reason: e._v
        })
      })
    }, ei = function(e) {
      var t = this;
      t._d || (t._d = !0, (t = t._w || t)._v = e, t._s = 2, t._a || (t._a = t._c.slice()), Gn(t, !0))
    }, ti = function(e) {
      var t, n = this;
      if (!n._d) {
        n._d = !0, n = n._w || n;
        try {
          if (n === e) throw Hn("Promise can't be resolved itself");
          (t = Xn(e)) ? Fn(function() {
            var i = {
              _w: n,
              _d: !1
            };
            try {
              t.call(e, Pe(ti, i, 1), Pe(ei, i, 1))
            } catch (e) {
              ei.call(i, e)
            }
          }) : (n._v = e, n._s = 1, Gn(n, !1))
        } catch (e) {
          ei.call({
            _w: n,
            _d: !1
          }, e)
        }
      }
    };
  Kn || (Vn = function(e) {
    !
      function(e, t, n, i) {
        if (!(e instanceof t) || void 0 !== i && i in e) throw TypeError(n + ": incorrect invocation!")
      }(this, Vn, Wn, "_h"), $e(e), kn.call(this);
    try {
      e(Pe(ti, this, 1), Pe(ei, this, 1))
    } catch (e) {
      ei.call(this, e)
    }
  }, (kn = function(e) {
    this._c = [], this._a = void 0, this._s = 0, this._d = !1, this._v = void 0, this._h = 0, this._n = !1
  }).prototype = function(e, t, n) {
    for (var i in t) je(e, i, t[i], n);
    return e
  }(Vn.prototype, {
    then: function(e, t) {
      var n = qn(function(e, t) {
        var n, i = ge(e).constructor;
        return void 0 === i || void 0 == (n = ge(i)[mn]) ? t : $e(n)
      }(this, Vn));
      return n.ok = "function" != typeof e || e, n.fail = "function" == typeof t && t, n.domain = Yn ? Dn.domain : void 0, this._c.push(n), this._a && this._a.push(n), this._s && Gn(this, !1), n.promise
    },
    catch: function(e) {
      return this.then(void 0, e)
    }
  }), In = function() {
    var e = new kn;
    this.promise = e, this.resolve = Pe(ti, e, 1), this.reject = Pe(ei, e, 1)
  }, zn.f = qn = function(e) {
    return e === Vn || e === On ? new In(e) : En(e)
  }), Me(Me.G + Me.W + Me.F * !Kn, {
    Promise: Vn
  }), pt(Vn, Wn), function(e) {
    var t = fe[e];
    ve && t && !t[Mn] && Ce.f(t, Mn, {
      configurable: !0,
      get: function() {
        return this
      }
    })
  }(Wn), On = pe[Wn], Me(Me.S + Me.F * !Kn, Wn, {
    reject: function(e) {
      var t = qn(this);
      return (0, t.reject)(e), t.promise
    }
  }), Me(Me.S + Me.F * !Kn, Wn, {
    resolve: function(e) {
      return function(e, t) {
        if (ge(e), me(t) && t.constructor === e) return t;
        var n = zn.f(e);
        return (0, n.resolve)(t), n.promise
      }(this, e)
    }
  }), Me(Me.S + Me.F * !(Kn && Mt(function(e) {
    Vn.all(e).
    catch (Un)
  })), Wn, {
    all: function(e) {
      var t = this,
        n = qn(t),
        i = n.resolve,
        r = n.reject,
        o = Rn(function() {
          var n = [],
            o = 0,
            a = 1;
          pn(e, !1, function(e) {
            var s = o++,
              c = !1;
            n.push(void 0), a++, t.resolve(e).then(function(e) {
              c || (c = !0, n[s] = e, --a || i(n))
            }, r)
          }), --a || i(n)
        });
      return o.e && r(o.v), n.promise
    },
    race: function(e) {
      var t = this,
        n = qn(t),
        i = n.reject,
        r = Rn(function() {
          pn(e, !1, function(e) {
            t.resolve(e).then(n.resolve, i)
          })
        });
      return r.e && i(r.v), n.promise
    }
  });
  var ni = !1,
    ii = window.document,
    ri = ii.documentElement,
    oi = Array.prototype.slice,
    ai = {},
    si = null;
  ni || (ri.addEventListener("touchstart", function(e) {
    0 === Object.keys(ai).length && (ri.addEventListener("touchmove", r, !0), ri.addEventListener("touchend", o, !0), ri.addEventListener("touchcancel", a, !0));
    for (var t = 0; t < e.changedTouches.length; t++) {
      var s = e.changedTouches[t],
        c = {};
      for (var l in s) c[l] = s[l];
      var u = {
        startTouch: c,
        startTime: Date.now(),
        status: "tapping",
        element: e.srcElement || e.target,
        pressingHandler: setTimeout(function(t, n) {
          return function() {
            "tapping" === u.status && (u.status = "pressing", i(t, "longpress", {
              touch: n,
              touches: e.touches,
              changedTouches: e.changedTouches,
              touchEvent: e
            })), clearTimeout(u.pressingHandler), u.pressingHandler = null
          }
        }(e.srcElement || e.target, e.changedTouches[t]), 500)
      };
      ai[s.identifier] = u
    }
    if (2 == Object.keys(ai).length) {
      var d = [];
      for (var l in ai) d.push(ai[l].element);
      i(n(d[0], d[1]), "dualtouchstart", {
        touches: oi.call(e.touches),
        touchEvent: e
      })
    }
  }, !0), ni = !0);
  var ci = window.lib || (window.lib = {});
  s.prototype.toString = function() {
    return this.val
  }, s.prototype.valueOf = function() {
    for (var e = this.val.split("."), t = [], n = 0; n < e.length; n++) {
      var i = parseInt(e[n], 10);
      isNaN(i) && (i = 0);
      var r = i.toString();
      r.length < 5 && (r = Array(6 - r.length).join("0") + r), t.push(r), 1 === t.length && t.push(".")
    }
    return parseFloat(t.join(""))
  }, s.compare = function(e, t) {
    e = e.toString().split("."), t = t.toString().split(".");
    for (var n = 0; n < e.length || n < t.length; n++) {
      var i = parseInt(e[n], 10),
        r = parseInt(t[n], 10);
      if (window.isNaN(i) && (i = 0), window.isNaN(r) && (r = 0), i < r) return -1;
      if (i > r) return 1
    }
    return 0
  }, ci.version = function(e) {
    return new s(e)
  };
  var li = window.lib || (window.lib = {}),
    ui = li.env || (li.env = {}),
    di = window.location.search.replace(/^\?/, "");
  if (ui.params = {}, di) for (var hi = di.split("&"), fi = 0; fi < hi.length; fi++) {
    hi[fi] = hi[fi].split("=");
    try {
      ui.params[hi[fi][0]] = decodeURIComponent(hi[fi][1])
    } catch (e) {
      ui.params[hi[fi][0]] = hi[fi][1]
    }
  }
  var pi, mi = window.lib || (window.lib = {}),
    gi = mi.env || (mi.env = {}),
    wi = window.navigator.userAgent;
  if (pi = wi.match(/Windows\sPhone\s(?:OS\s)?([\d.]+)/)) gi.os = {
    name: "Windows Phone",
    isWindowsPhone: !0,
    version: pi[1]
  };
  else if (wi.match(/Safari/) && (pi = wi.match(/Android[\s/]([\d.]+)/))) gi.os = {
    version: pi[1]
  }, wi.match(/Mobile\s+Safari/) ? (gi.os.name = "Android", gi.os.isAndroid = !0) : (gi.os.name = "AndroidPad", gi.os.isAndroidPad = !0);
  else if (pi = wi.match(/(iPhone|iPad|iPod)/)) {
    var vi = pi[1];
    pi = wi.match(/OS ([\d_.]+) like Mac OS X/), gi.os = {
      name: vi,
      isIPhone: "iPhone" === vi || "iPod" === vi,
      isIPad: "iPad" === vi,
      isIOS: !0,
      version: pi && pi[1].split("_").join(".") || ""
    }
  } else gi.os = {
    name: "unknown",
    version: "0.0.0"
  };
  mi.version && (gi.os.version = mi.version(gi.os.version)), (pi = wi.match(/(?:UCWEB|UCBrowser\/)([\d.]+)/)) ? gi.browser = {
    name: "UC",
    isUC: !0,
    version: pi[1]
  } : (pi = wi.match(/MQQBrowser\/([\d.]+)/)) ? gi.browser = {
    name: "QQ",
    isQQ: !0,
    version: pi[1]
  } : (pi = wi.match(/Firefox\/([\d.]+)/)) ? gi.browser = {
    name: "Firefox",
    isFirefox: !0,
    version: pi[1]
  } : (pi = wi.match(/MSIE\s([\d.]+)/)) || (pi = wi.match(/IEMobile\/([\d.]+)/)) ? (gi.browser = {
    version: pi[1]
  }, wi.match(/IEMobile/) ? (gi.browser.name = "IEMobile", gi.browser.isIEMobile = !0) : (gi.browser.name = "IE", gi.browser.isIE = !0), wi.match(/Android|iPhone/) && (gi.browser.isIELikeWebkit = !0)) : (pi = wi.match(/(?:Chrome|CriOS)\/([\d.]+)/)) ? (gi.browser = {
    name: "Chrome",
    isChrome: !0,
    version: pi[1]
  }, wi.match(/Version\/[\d+.]+\s*Chrome/) && (gi.browser.name = "Chrome Webview", gi.browser.isWebview = !0)) : wi.match(/Safari/) && (pi = wi.match(/Android[\s/]([\d.]+)/)) ? gi.browser = {
    name: "Android",
    isAndroid: !0,
    version: pi[1]
  } : wi.match(/iPhone|iPad|iPod/) ? wi.match(/Safari/) ? (pi = wi.match(/Version\/([\d.]+)/), gi.browser = {
    name: "Safari",
    isSafari: !0,
    version: pi && pi[1] || ""
  }) : (pi = wi.match(/OS ([\d_.]+) like Mac OS X/), gi.browser = {
    name: "iOS Webview",
    isWebview: !0,
    version: pi && pi[1].replace(/_/g, ".") || ""
  }) : gi.browser = {
    name: "unknown",
    version: "0.0.0"
  }, mi.version && (gi.browser.version = mi.version(gi.browser.version));
  var bi = Object.prototype.toString,
    yi = "[object Object]",
    xi = "[object Array]",
    _i = /-(\w)/g,
    Si = g(function(e) {
      return e.replace(_i, function(e, t) {
        return t.toUpperCase()
      })
    }),
    Ti = g(function(e) {
      return e.charAt(0).toUpperCase() + e.slice(1)
    }),
    Ci = /([^-])([A-Z])/g,
    ki = g(function(e) {
      return e.replace(Ci, "$1-$2").replace(Ci, "$1-$2").toLowerCase()
    }),
    Ei = /webkit-|moz-|o-|ms-/,
    Ii = !1,
    Oi = parseInt(750),
    Ni = !isNaN(Oi) && Oi > 0 ? Oi : 750,
    Ai = document.querySelector('meta[name="weex-viewport"]'),
    Li = Ai && parseInt(Ai.getAttribute("content"));
  Li && !isNaN(Li) && Li > 0 && (Ni = Li);
  var ji = 0,
    $i = 0,
    Pi = 0,
    zi = {
      dpr: ji,
      scale: 0,
      rem: 0,
      deviceWidth: 0,
      deviceHeight: 0
    },
    Ri = !1;
  try {
    document.createElement("div").addEventListener("test", function(e) {}, {
      get passive() {
        Ri = !0
      }
    })
  } catch (e) {}
  var Mi = ["width", "height", "left", "right", "top", "bottom", "border", "borderRadius", "borderWidth", "borderLeft", "borderRight", "borderTop", "borderBottom", "borderLeftWidth", "borderRightWidth", "borderTopWidth", "borderBottomWidth", "margin", "marginLeft", "marginRight", "marginTop", "marginBottom", "padding", "paddingLeft", "paddingRight", "paddingTop", "paddingBottom", "fontSize", "lineHeight", "transform", "webkitTransform", "WebkitTransform", "mozTransform", "MozTransform", "itemSize"],
    Bi = /webkit|moz/i,
    Fi = {
      scrollableTypes: ["scroller", "list", "waterfall"],
      gestureEvents: ["panstart", "panmove", "panend", "swipe", "longpress", "tap"],
      weexBuiltInComponents: ["div", "container", "text", "image", "img", "cell", "a"],
      bindingStyleNamesForPx2Rem: Object.keys(Mi.reduce(function(e, t) {
        return e[t] = 1, e[function(e) {
          return ki(e.replace(Bi, function(e) {
            return "-" + e.toLowerCase() + "-"
          }))
        }(t)] = 1, e
      }, {}))
    };
  if (!window._rmInjected) {
    window._rmInjected = !0;
    var Wi = HTMLElement.prototype.removeChild;
    HTMLElement.prototype.removeChild = function(e) {
      e._visible && E(e, "disappear", null), e._offsetVisible && E(e, "offsetDisappear", null), Wi.apply(this, arguments)
    }
  }
  var Hi, Di = "data-img-src",
    Vi = "placeholder",
    Yi = {},
    Ui = 1,
    qi = Fi.bindingStyleNamesForPx2Rem,
    Ki = null,
    Xi = Object.freeze({
      extend: h,
      extendTruthy: f,
      extendKeys: function(e, t, n) {
        return void 0 === t && (t = {}), (n || []).forEach(function(n) {
          t && (e[n] = t[n])
        }), e
      },
      extractKeys: function(e, t, n) {
        return void 0 === t && (t = {}), t ? ((n || []).forEach(function(n) {
          t && (e[n] = t[n]), t && delete t[n]
        }), e) : e
      },
      bind: function(e, t) {
        return function(n) {
          var i = arguments.length;
          return i ? i > 1 ? e.apply(t, arguments) : e.call(t, n) : e.call(t)
        }
      },
      debounce: p,
      depress: function(e, t) {
        function n() {
          i = null
        }
        var i;
        return function() {
          i || e.apply(), clearTimeout(i), i = setTimeout(n, t)
        }
      },
      throttle: m,
      loopArray: function(e, t, n) {
        if (l(e)) {
          var i = "l" === (n + "").toLowerCase(),
            r = e.length;
          if ((t %= r) < 0 && (t = -t, i = !i), 0 === t) return e;
          var o, a;
          return i ? (o = e.slice(0, t), a = e.slice(t)) : (o = e.slice(0, r - t), a = e.slice(r - t)), a.concat(o)
        }
      },
      cached: g,
      camelize: Si,
      camelizeKeys: function(e) {
        var t = {};
        for (var n in e) t[Si(n)] = e[n];
        return t
      },
      capitalize: Ti,
      hyphenate: ki,
      hyphenateKeys: function(e) {
        var t = {};
        for (var n in e) t[ki(n)] = e[n];
        return t
      },
      hyphenateStyleKeys: w,
      camelToKebab: function(e) {
        return e ? e.replace(/([A-Z])/g, function(e, t) {
          return "-" + t.toLowerCase()
        }) : ""
      },
      appendCss: v,
      nextFrame: function(e) {
        (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame ||
          function(e) {
            return setTimeout(e, 16)
          })(e)
      },
      toCSSText: function(e) {
        if (e) {
          var t = w(e),
            n = "";
          for (var i in t) n += i + ":" + t[i] + ";";
          return n
        }
      },
      supportsPassive: function() {
        return Ri
      },
      createEvent: y,
      createBubblesEvent: function(e, t, n) {
        var i = new Event(t, {
          bubbles: !0
        });
        if (b(i, n), -1 !== window.navigator.userAgent.toLowerCase().indexOf("phantomjs")) return i;
        try {
          Object.defineProperty(i, "target", {
            enumerable: !0,
            value: e
          })
        } catch (t) {
          return b({}, i, {
            target: e
          })
        }
        return i
      },
      createCustomEvent: function(e, t, n) {
        var i = document.createEvent("CustomEvent");
        i.initCustomEvent(t, !1, !0, {}), b(i, n);
        try {
          Object.defineProperty(i, "target", {
            enumerable: !0,
            value: e || null
          })
        } catch (t) {
          return b({}, i, {
            target: e || null
          })
        }
        return i
      },
      dispatchNativeEvent: x,
      mapFormEvents: function(e) {
        var t = {};
        return ["input", "change", "focus", "blur", "return"].forEach(function(n) {
          t[n] = function(t) {
            e.$el && (t.value = e.$el.value, "input" === n && e.$emit(n, t))
          }
        }), t
      },
      contains: function(e, t, n) {
        return !(!n || e !== t) || (e.contains ? e.contains(t) && e !== t : !0 & e.compareDocumentPosition(t))
      },
      insideA: _,
      getParentScroller: S,
      getParentScrollerElement: T,
      hasIntersection: C,
      isElementVisible: k,
      getEventHandlers: function(e) {
        for (var t = e.$vnode, n = {}, i = []; t;) i.push(t), t = t.parent;
        return i.forEach(function(e) {
          var t = e.componentOptions && e.componentOptions.listeners,
            i = e.data && e.data.on;
          h(n, t, i)
        }), n
      },
      watchAppear: O,
      detectAppear: N,
      applySrc: L,
      fireLazyload: $,
      getThrottleLazyload: P,
      supportHairlines: z,
      supportSticky: function() {
        if (null !== Ki) return Ki;
        var e = window.document.createElement("div").style;
        return e.cssText = "position:-webkit-sticky;position:sticky;", Ki = -1 !== e.position.indexOf("sticky")
      },
      getTransformObj: R,
      getTransformStr: M,
      addTransform: function(e, t, n) {
        if (t) {
          var i = {};
          n || (i = R(e));
          for (var r in t) {
            var o = t[r];
            o && (i[r] = o)
          }
          var a = M(i);
          e.style.webkitTransform = a, e.style.mozTransform = a, e.style.transform = a
        }
      },
      copyTransform: function(e, t, n) {
        var i;
        if (n) {
          var r = R(e);
          if (!r[n]) return;
          var o = R(t);
          o[n] = r[n], i = M(o)
        } else i = e.style.webkitTransform || e.style.mozTransform || e.style.transform;
        t.style.webkitTransform = i, t.style.mozTransform = i, t.style.transform = i
      },
      getRgb: function(e) {
        var t = document.createElement("span"),
          n = document.body;
        t.style.cssText = "color: " + e + "; width: 0px; height: 0px;", n && n.appendChild(t), e = window.getComputedStyle(t).color + "", n && n.removeChild(t);
        var i;
        return (i = e.match(/#([\da-fA-F]{2})([\da-fA-F]{2})([\da-fA-F]{2})/)) ? {
          r: parseInt(i[1], 16),
          g: parseInt(i[2], 16),
          b: parseInt(i[3], 16)
        } : (i = e.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/)) ? {
          r: parseInt(i[1]),
          g: parseInt(i[2]),
          b: parseInt(i[3])
        } : void 0
      },
      getStyleSheetById: function(e) {
        if (e) for (var t = document.styleSheets, n = t.length, i = 0; i < n; i++) {
          var r = t[i];
          if (r.ownerNode.id === e) return r
        }
      },
      getRangeWidth: function(e) {
        var t = e.children;
        if (!t) return e.getBoundingClientRect().width;
        if (!Range) return B(t);
        var n = document.createRange();
        return n.selectNodeContents ? (n.selectNodeContents(e), n.getBoundingClientRect().width) : B(t)
      },
      styleObject2rem: function(e, t) {
        var n = {};
        for (var i in e) {
          var r = Si(i);
          qi.indexOf(r) > -1 ? n[r] = F(e[i] + "", t) : n[r] = e[i]
        }
        return n
      },
      px2rem: F,
      rem2px: function(e, t) {
        return e.replace(/([+-]?\d+(?:.\d*)?)rem/g, function(e, n) {
          return parseFloat(n) * (t || window.weex.config.env.rem) + "px"
        })
      },
      isPlainObject: c,
      isArray: l,
      isPrimitive: u,
      isDef: d
    });
  window.WXEnvironment = function(e, t) {
    var n = t.browser ? t.browser.name : navigator.appName,
      i = t.browser ? t.browser.version.val : null,
      r = t.os.name;
    r.match(/(iPhone|iPad|iPod)/i) ? r = "iOS" : r.match(/Android/i) && (r = "android");
    var o = t.os.version.val;
    return h({
      platform: "Web",
      weexVersion: "1.0.17",
      userAgent: navigator.userAgent,
      appName: n,
      appVersion: i,
      osName: r,
      osVersion: o,
      deviceModel: t.os.name || null
    }, e)
  }(function(e) {
    if (void 0 === e && (e = Ni), !Ii) {
      Ii = !0;
      var t = window.document;
      if (!t) return void console.error("[vue-render] window.document is undfined.");
      if (!t.documentElement) return void console.error("[vue-render] document.documentElement is undfined.");
      ji = zi.dpr = window.devicePixelRatio, $i = t.documentElement.clientWidth, Pi = t.documentElement.clientHeight, !
        function(e) {
          var t = window.document,
            n = e / 10;
          t.documentElement && (t.documentElement.style.fontSize || (t.documentElement.style.fontSize = n + "px"), zi.rem = n)
        }($i), function(e) {
        if (Ai) {
          if (parseInt(Ai.getAttribute("content")) === e) return
        } else(Ai = document.createElement("meta")).setAttribute("name", "weex-viewport");
        Ai.setAttribute("content", e + "")
      }(e), window.addEventListener("resize", function() {
        Pi = t.documentElement.clientHeight;
        var e = window.weex && window.weex.config.env;
        zi.deviceHeight = e.deviceHeight = Pi * ji
      }), h(zi, {
        scale: $i / e,
        deviceWidth: $i * ji,
        deviceHeight: Pi * ji
      })
    }
    return zi
  }(), window.lib.env);
  var Gi = {},
    Qi = [],
    Zi = {
      __vue__: null,
      utils: Xi,
      config: {
        env: window.WXEnvironment,
        bundleUrl: location.href
      },
      _components: {},
      _modules: Gi,
      _meta: {
        mounted: {},
        updated: {},
        destroyed: {},
        requiredModules: {},
        apiCalled: {},
        perf: {}
      },
      document: {
        body: {}
      },
      requireModule: function(e) {
        var t = Zi._meta.requiredModules;
        return t[e] || (t[e] = 0), t[e]++, Gi[e]
      },
      registerModule: function() {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        return (n = this).registerApiModule.apply(n, e);
        var n
      },
      support: function(e) {
        void 0 === e && (e = "");
        var t = (e + "").match(/@(component|module)\/(\w+)(.\w+)?/);
        if (!t) return console.warn("[vue-render] invalid argument for weex.support: " + e), null;
        var n = t[1],
          i = t[2],
          r = t[3];
        switch (r = r && r.replace(/^\./, ""), n) {
          case "component":
            return void 0 !== this._components[i];
          case "module":
            var o = Gi[i];
            return o && r ? !! o[r] : !! o
        }
      },
      registerVueInstance: function(e) {
        if (!(!e instanceof Vue)) {
          var t = e.$root;
          t && t.$el && this.document.body.children.push(t.$el)
        }
      },
      require: function() {
        for (var e = [], t = arguments.length; t--;) e[t] = arguments[t];
        return console.log('[Vue Render] "weex.require" is deprecated, please use "weex.requireModule" instead.'), (n = this).requireModule.apply(n, e);
        var n
      },
      registerApiModule: function(e, t, n) {
        if (Gi[e] || (Gi[e] = {}), n && "assignment" === n.registerType) Gi[e] = t;
        else {
          var i = function(n) {
            t.hasOwnProperty(n) && (Gi[e][n] = function() {
              var i = Zi._meta.apiCalled;
              i[e] || (i[e] = {});
              var r = i[e];
              return r[n] || (r[n] = 0), r[n]++, t[n].apply(Zi, arguments)
            })
          };
          for (var r in t) i(r)
        }
      },
      registerComponent: function(e, t) {
        if (!this.__vue__) return console.log("[Vue Render] Vue is not found. Please import Vue.js before register a component.");
        if (this._components[e] = 0, t._css) {
          v(t._css.replace(/\b[+-]?[\d.]+rem;?\b/g, function(e) {
            return 75 * parseFloat(e) * Zi.config.env.scale + "px"
          }), "weex-cmp-" + e), delete t._css
        }
        this.__vue__.component(e, t)
      },
      getRoot: function() {},
      sender: {
        performCallback: function(e, t, n) {
          return "function" == typeof e ? e(t) : null
        }
      },
      install: function(e) {
        e.init(this)
      }
    };
  Object.defineProperty(Zi.document.body, "children", {
    get: function() {
      return Qi
    }
  }), ["on", "once", "off", "emit"].forEach(function(e) {
    Zi[e] = function() {
      for (var t = [], n = arguments.length; n--;) t[n] = arguments[n];
      return this._vue || (this._vue = new this.__vue__), (i = this._vue)["$" + e].apply(i, t);
      var i
    }
  });
  var Ji = {
      text: {
        transform: function(e) {
          var t = e.lines;
          return t > 0 ? Object.assign(e, {
            overflow: "hidden",
            textOverflow: "ellipsis",
            WebkitLineClamp: t
          }) : e
        }
      }
    },
    er = function(e) {
      return Ji[e]
    },
    tr = Fi.weexBuiltInComponents,
    nr = {
      appear: "appear",
      disappear: "disappear",
      offsetAppear: "offset-appear",
      offsetDisappear: "offset-disappear"
    },
    ir = {
      figure: ["img", "image", "figure"],
      p: ["text", "p"],
      div: ["container", "div"],
      section: ["cell"]
    },
    rr = Object.keys(ir).reduce(function(e, t) {
      return ir[t].forEach(function(n) {
        e[n] = t
      }), e
    }, {}),
    or = {
      p: "text",
      figure: "image",
      section: "cell"
    },
    ar = {
      div: {
        "weex-ct": !0,
        "weex-div": !0
      },
      image: {
        "weex-el": !0,
        "weex-image": !0
      },
      text: {
        "weex-el": !0,
        "weex-text": !0
      },
      cell: {
        "weex-ct": !0,
        "weex-cell": !0
      },
      a: {
        "weex-ct": !0,
        "weex-a": !0
      }
    },
    sr = Object.freeze({
      extractComponentStyle: function(e) {
        return H(e)
      },
      getComponentInlineStyle: H,
      trimTextVNodes: function(e) {
        return l(e) ? e.filter(function(e) {
          return !!e.tag
        }) : e
      },
      transformRender: D,
      transformTag: V,
      transformData: q,
      mapNativeEvents: function(e, t) {
        var n = {},
          i = function(e) {
            n[e] = function(n) {
              x(n.target, t[e])
            }
          };
        for (var r in t) i(r);
        return n
      }
    }),
    cr = Fi.scrollableTypes,
    lr = !1,
    ur = 0,
    dr = !1,
    hr = p(function() {
      O(dr, !0)
    }, 50),
    fr = {
      beforeCreate: function() {
        lr || (lr = !0, ["scroll", "resize"].forEach(function(e) {
          window.addEventListener(e, P(25, document.body))
        }), document.body.addEventListener("scroll", P(25, document.body)))
      },
      updated: function() {
        var e = this.$el;
        if (e && 1 === e.nodeType) {
          this._rootId && e.className.indexOf("weex-root") <= -1 && (e.classList.add("weex-root"), e.classList.add("weex-ct"), e.setAttribute("data-wx-root-id", this._rootId));
          var t = this.$options && this.$options._componentTag,
            n = weex._meta.updated;
          n[t] || (n[t] = 0), n[t]++, hr(), this._fireLazyload()
        }
      },
      mounted: function() {
        var e = this.$options && this.$options._componentTag,
          t = this.$el;
        if (t && 1 === t.nodeType) {
          void 0 !== weex._components[e] && weex._components[e]++;
          var n = weex._meta.mounted;
          if (n[e] || (n[e] = 0), n[e]++, function(e, t) {
              if (cr.indexOf(e) > -1) {
                var n = t.scrollDirection;
                n && "horizontal" === n || (dr = t, O(t, !0))
              }
            }(e, this), this === this.$root) {
            var i = "wx-root-" + ur++;
            if (weex._root || (weex._root = {}), weex._root[i] = this, this._rootId = i, 1 !== t.nodeType) return;
            t.classList.add("weex-root"), t.classList.add("weex-ct"), t.setAttribute("data-wx-root-id", i), dr || (dr = this, O(this, !0)), this._fireLazyload(t)
          }
        }
      },
      destroyed: function() {
        var e = this.$el;
        if (e && 1 === e.nodeType) {
          this._rootId && (delete weex._root[this._rootId], delete this._rootId);
          var t = this.$options && this.$options._componentTag;
          void 0 !== weex._components[t] && weex._components[t]--;
          var n = weex._meta.destroyed;
          n[t] || (n[t] = 0), n[t]++, this._fireLazyload()
        }
      },
      methods: {
        _fireLazyload: function(e) {
          P(25, e || document.body)()
        }
      }
    },
    pr = {
      methods: {
        $stopOutterA: function(e) {
          return this.$stopOuterA(e)
        },
        $stopOuterA: function(e) {
          e && e.preventDefault && e.target && _(e.target) && e.preventDefault()
        },
        $stopPropagation: function(e) {
          e && e.stopPropagation && e.stopPropagation()
        }
      }
    },
    mr = Fi.bindingStyleNamesForPx2Rem,
    gr = {
      methods: {
        _px2rem: function(e, t) {
          if ("string" == typeof e) return (e + "").replace(/[+-]?\d+(?:.\d*)?[pw]x/gi, function(e) {
            return weex.utils.px2rem(e, t)
          });
          if ("number" == typeof e) return weex.utils.px2rem(e + "", t);
          if (c(e)) {
            for (var n in e) e.hasOwnProperty(n) && mr.indexOf(n) > -1 && (e[n] = weex.utils.px2rem(e[n] + "", t));
            return e
          }
          if (l(e)) {
            for (var i = 0, r = e.length; i < r; i++) this._px2rem(e[i], t);
            return e
          }
        },
        _processExclusiveStyle: function(e, t, n) {
          var i = er(n);
          return this._px2rem(i.transform(e), t)
        },
        _getParentRect: function() {
          var e = this.$el,
            t = e && e.parentElement;
          return t && t.getBoundingClientRect()
        }
      }
    },
    wr = {
      methods: {
        focus: function() {
          this.$el && this.$el.focus()
        },
        blur: function() {
          this.$el && this.$el.blur()
        },
        setSelectionRange: function(e, t) {
          try {
            this.$el.setSelectionRange(e, t)
          } catch (e) {}
        },
        getSelectionRange: function(e) {
          try {
            var t = window.getSelection().toString(),
              n = this.$el.value.indexOf(t),
              i = -1 === n ? n : n + t.length;
            e && e({
              selectionStart: n,
              selectionEnd: i
            })
          } catch (t) {
            e && e(new Error("[vue-render] getSelection is not supported."))
          }
        },
        getEditSelectionRange: function(e) {
          this.getSelectionRange(e)
        },
        createKeyboardEvent: function(e) {
          var t = this.returnKeyType;
          if (t) {
            e = h(e, {
              keyup: function(e) {
                var n = e.keyCode,
                  i = e.key;
                13 === n && (i && "tab" !== i.toLowerCase() || (i = "next"), x(e.target, "return", {
                  key: i,
                  returnKeyType: function(e) {
                    return ["default", "go", "next", "search", "send"].indexOf(e) > -1 ? e : "done"
                  }(t),
                  value: e.target.value
                }))
              }
            })
          }
          return e
        }
      }
    },
    vr = {
      destroyed: function() {
        if (this._stickyAdded) {
          var e = S(this);
          e && delete e._stickyChildren[this._uid]
        }
      },
      methods: {
        _addSticky: function() {
          var e = this.$el;
          e && 1 !== e.nodeType && (e.classList.add("sticky"), this._placeholder || (this._placeholder = e.cloneNode(!0)), this._placeholder.style.display = "block", this._placeholder.style.width = this.$el.offsetWidth + "px", this._placeholder.style.height = this.$el.offsetHeight + "px", e.parentNode.insertBefore(this._placeholder, this.$el))
        },
        _removeSticky: function() {
          var e = this.$el;
          e && 1 !== e.nodeType && (e.classList.remove("sticky"), this._placeholder && this._placeholder.parentNode.removeChild(this._placeholder), this._placeholder = null)
        }
      }
    };
  window.global = window, window.weex = Zi, Zi._styleMap = {}, ["getComponentInlineStyle", "extractComponentStyle", "mapNativeEvents", "trimTextVNodes"].forEach(function(e) {
    Zi[e] = sr[e].bind(Zi)
  }), Zi.mixins = {
    inputCommon: wr
  };
  var br = !1,
    yr = {
      init: function(e) {
        if (!br) {
          br = !0;
          var t = e.__vue__,
            n = t.prototype._render;
          t.prototype._render = function() {
            var t = this._weexRender,
              i = this.$options && this.$options._componentTag;
            if (!t && !d(e._components[i])) {
              var r = this.$options.render;
              t = this._weexRender = function(e) {
                for (var t = [], n = arguments.length - 1; n-- > 0;) t[n] = arguments[n + 1];
                return r.call.apply(r, [this, D(this, e)].concat(t))
              }, this.$options.render = t
            }
            return n.call(this)
          }
        }
      }
    };
  global.Vue && K(global.Vue);
  var xr = !1;
  "undefined" != typeof window && window.Vue && X(window.Vue), weex.init = X;
  var _r, Sr, Tr = "wipt_plc_",
    Cr = "wipt_",
    kr = 0,
    Er = {
      init: function(e) {
        _r = e.utils.mapFormEvents, Sr = e.utils.appendCss, e.registerComponent("input", function(e) {
          return {
            name: "weex-input",
            mixins: [e.mixins.inputCommon],
            props: {
              type: {
                type: String,
                default:
                  "text",
                validator: function(e) {
                  return -1 !== ["email", "number", "password", "search", "tel", "text", "url", "date", "datetime", "time"].indexOf(e)
                }
              },
              value: String,
              placeholder: String,
              disabled: {
                type: [String, Boolean],
                default:
                  !1
              },
              autofocus: {
                type: [String, Boolean],
                default:
                  !1
              },
              maxlength: [String, Number],
              returnKeyType: String
            },
            render: function(e) {
              this._id || (this._id = kr++);
              var t = _r(this);
              return e("html:input", {
                attrs: {
                  "weex-type": "input",
                  id: "" + Cr + this._id,
                  type: this.type,
                  value: this.value,
                  disabled: "false" !== this.disabled && !1 !== this.disabled,
                  autofocus: "false" !== this.autofocus && !1 !== this.autofocus,
                  placeholder: this.placeholder,
                  maxlength: this.maxlength,
                  returnKeyType: this.returnKeyType
                },
                domProps: {
                  value: this.value
                },
                on: this.createKeyboardEvent(t),
                staticClass: "weex-input weex-el",
                staticStyle: G(this)
              })
            }
          }
        }(e))
      }
    };
  e('/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * "License"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\n.weex-switch {\n  border: 0.013333rem solid #dfdfdf;\n  cursor: pointer;\n  vertical-align: middle;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-box-sizing: content-box;\n          box-sizing: content-box;\n  background-clip: content-box;\n  color: #64bd63;\n  width: 1.333333rem;\n  height: 0.8rem;\n  background-color: white;\n  border-color: #dfdfdf;\n  -webkit-box-shadow: #dfdfdf 0 0 0 0 inset;\n          box-shadow: #dfdfdf 0 0 0 0 inset;\n  border-radius: 0.8rem;\n  -webkit-transition: border 0.4s, background-color 1.2s, -webkit-box-shadow 0.4s;\n  transition: border 0.4s, background-color 1.2s, -webkit-box-shadow 0.4s;\n  transition: border 0.4s, box-shadow 0.4s, background-color 1.2s;\n  transition: border 0.4s, box-shadow 0.4s, background-color 1.2s, -webkit-box-shadow 0.4s;\n}\n\n.weex-switch-checked {\n  background-color: #64bd63;\n  border-color: #64bd63;\n  -webkit-box-shadow: #64bd63 0 0 0 0.533333rem inset;\n          box-shadow: #64bd63 0 0 0 0.533333rem inset;\n}\n\n.weex-switch-checked.weex-switch-disabled {\n  background-color: #A0CCA0;\n  -webkit-box-shadow: #A0CCA0 0 0 0 0.533333rem inset;\n          box-shadow: #A0CCA0 0 0 0 0.533333rem inset;\n}\n\n.weex-switch-disabled {\n  background-color: #EEEEEE;\n}\n\n.weex-switch-inner {\n  width: 0.8rem;\n  height: 0.8rem;\n  background: #fff;\n  border-radius: 100%;\n  -webkit-box-shadow: 0 0.013333rem 0.04rem rgba(0, 0, 0, 0.4);\n          box-shadow: 0 0.013333rem 0.04rem rgba(0, 0, 0, 0.4);\n  position: absolute;\n  top: 0;\n  left: 0;\n  -webkit-transition: background-color 0.4s, left 0.2s;\n  transition: background-color 0.4s, left 0.2s;\n}\n\n.weex-switch-checked > .weex-switch-inner {\n  left: 0.533333rem;\n}\n', void 0);
  var Ir, Or, Nr, Ar, Lr = {
      init: function(e) {
        e.registerComponent("switch", function(e) {
          var t = e.extractComponentStyle,
            n = e.utils.dispatchNativeEvent;
          return {
            name: "weex-switch",
            props: {
              checked: {
                type: [Boolean, String],
                default:
                  !1
              },
              disabled: {
                type: [Boolean, String],
                default:
                  !1
              }
            },
            data: function() {
              return {
                isChecked: "false" !== this.checked && !1 !== this.checked,
                isDisabled: "false" !== this.disabled && !1 !== this.disabled
              }
            },
            computed: {
              wrapperClass: function() {
                var e = ["weex-el", "weex-switch"];
                return this.isChecked && e.push("weex-switch-checked"), this.isDisabled && e.push("weex-switch-disabled"), e.join(" ")
              }
            },
            methods: {
              toggle: function() {
                this.isDisabled || (this.isChecked = !this.isChecked, n(this.$el, "change", {
                  value: this.isChecked
                }))
              }
            },
            mounted: function() {
              var e = this,
                t = this.$el;
              if (t && 1 === t.nodeType && !this._removeClickHandler) {
                var n = function(t) {
                  e.toggle()
                };
                this._removeClickHandler = t.removeEventListener.bind(t, "weex$tap", n), t.addEventListener("weex$tap", n)
              }
            },
            beforeDestroy: function() {
              var e = this._removeClickHandler;
              e && (e(), delete this._removeClickHandler)
            },
            render: function(e) {
              return e("span", {
                attrs: {
                  "weex-type": "switch"
                },
                staticClass: this.wrapperClass,
                staticStyle: t(this)
              }, [e("small", {
                staticClass: "weex-switch-inner"
              })])
            }
          }
        }(e))
      }
    },
    jr = {
      props: {
        loadmoreoffset: {
          type: [String, Number],
          default:
            0,
          validator: function(e) {
            var t = parseInt(e);
            return !isNaN(t) && t >= 0
          }
        },
        offsetAccuracy: {
          type: [Number, String],
          default:
            10,
          validator: function(e) {
            var t = parseInt(e);
            return !isNaN(t) && t >= 10
          }
        }
      },
      created: function() {
        this._loadmoreReset = !0
      },
      methods: {
        updateLayout: function() {
          var e = this.$refs.wrapper;
          if (e) {
            var t = e.getBoundingClientRect();
            this._wrapperWidth = t.width, this._wrapperHeight = t.height
          }
          var n = this.$refs.inner,
            i = n && n.children;
          if (n) {
            var r = n.getBoundingClientRect();
            this._innerWidth = r.width, this._innerHeight = r.height
          }
          var o = this._loading && this._loading.$el,
            a = this._refresh && this._refresh.$el;
          o && (this._innerHeight -= o.getBoundingClientRect().height), a && (this._innerHeight -= a.getBoundingClientRect().height), "horizontal" === this.scrollDirection && i && (this._innerWidth = weex.utils.getRangeWidth(n))
        },
        resetLoadmore: function() {
          this._loadmoreReset = !0
        },
        processSticky: function() {
          if (!weex.utils.supportSticky() && "horizontal" !== this.scrollDirection) {
            var e = this._stickyChildren,
              t = e && e.length || 0;
            if (!(t <= 0)) {
              var n = this.$el;
              if (n) for (var i, r = n.scrollTop, o = 0; o < t; o++)(i = e[o])._initOffsetTop < r ? i._addSticky() : i._removeSticky()
            }
          }
        },
        handleScroll: function(e) {
          weex.utils.getThrottleLazyload(25, this.$el, "scroll")(), function(e) {
            var t = weex.config.env.scale;
            if (!e._throttleScroll) {
              var n = e.$refs.wrapper,
                i = e.$refs.inner,
                r = ("horizontal" === e.scrollDirection ? n.scrollLeft : n.scrollTop) || 0;
              e._throttleScroll = weex.utils.throttle(function(o) {
                var a = "horizontal" === e.scrollDirection ? n.scrollLeft : n.scrollTop,
                  s = parseInt(e.offsetAccuracy) * t;
                Math.abs(a - r) >= s && (function() {
                  var t = i.getBoundingClientRect(),
                    r = {
                      contentSize: {
                        width: t.width,
                        height: t.height
                      },
                      contentOffset: {
                        x: n.scrollLeft,
                        y: -n.scrollTop
                      }
                    };
                  e.$el && weex.utils.dispatchNativeEvent(e.$el, "weex$scroll", r)
                }(), r = a)
              }, 16, !0)
            }
            return e._throttleScroll
          }(this)(e), this.processSticky();
          if (this.$refs.inner) {
            var t = "horizontal" === this.scrollDirection ? this._innerWidth : this._innerHeight;
            if (this._innerLength || (this._innerLength = t), this._innerLength !== t && (this._innerLength = t, this._loadmoreReset = !0), this._loadmoreReset && this.reachBottom(this.loadmoreoffset)) {
              this._loadmoreReset = !1;
              var n = this.$el;
              n && weex.utils.dispatchNativeEvent(n, "loadmore")
            }
          }
        },
        reachTop: function() {
          var e = this.$refs.wrapper;
          return !!e && e.scrollTop <= 0
        },
        reachBottom: function(e) {
          var t = this.$refs.wrapper,
            n = this.$refs.inner;
          if (e = parseInt(e || 0) * weex.config.env.scale, t && n) {
            var i = "horizontal" === this.scrollDirection ? "width" : "height",
              r = this["_inner" + i[0].toUpperCase() + i.substr(1)],
              o = this["_wrapper" + i[0].toUpperCase() + i.substr(1)];
            return ("horizontal" === this.scrollDirection ? t.scrollLeft : t.scrollTop) >= r - o - e
          }
          return !1
        },
        handleTouchStart: function(e) {
          if (this._loading || this._refresh) {
            var t = e.changedTouches[0];
            this._touchParams = {
              reachTop: this.reachTop(),
              reachBottom: this.reachBottom(),
              startTouchEvent: t,
              startX: t.pageX,
              startY: t.pageY,
              timeStamp: e.timeStamp
            }
          }
        },
        handleTouchMove: function(e) {
          if (this._touchParams && (this._refresh || this._loading)) {
            var t = this.$refs.inner,
              n = this._touchParams,
              i = n.startY,
              r = n.reachTop,
              o = n.reachBottom;
            if (t) {
              var a = e.changedTouches[0].pageY - i,
                s = a > 0 ? "down" : "up";
              this._touchParams.offsetY = a, this._refresh && "down" === s && r ? this._refresh.pullingDown(a) : this._loading && "up" === s && o && this._loading.pullingUp(-a)
            }
          }
        },
        handleTouchEnd: function(e) {
          if (this._touchParams && (this._refresh || this._loading)) {
            var t = this.$refs.inner,
              n = this._touchParams,
              i = n.startY,
              r = n.reachTop,
              o = n.reachBottom;
            if (t) {
              var a = e.changedTouches[0].pageY - i,
                s = a > 0 ? "down" : "up";
              this._touchParams.offsetY = a, this._refresh && "down" === s && r ? this._refresh.pullingEnd() : this._loading && "up" === s && o && this._loading.pullingEnd()
            }
            delete this._touchParams
          }
        }
      }
    },
    $r = {
      methods: {
        handleListScroll: function(e) {
          if (this.handleScroll(e), !weex.utils.supportSticky()) {
            var t = this.$el.scrollTop,
              n = this.$children.filter(function(e) {
                return e.$refs.header
              });
            if (!(n.length <= 0)) for (var i = 0; i < n.length; i++) n[i].initTop < t ? n[i].addSticky() : n[i].removeSticky()
          }
        }
      }
    },
    Pr = {
      init: function(e) {
        e.registerComponent("list", function(e) {
          var t = e.extractComponentStyle;
          return {
            name: "weex-list",
            mixins: [jr, $r],
            computed: {
              wrapperClass: function() {
                var e = ["weex-list", "weex-list-wrapper", "weex-ct"];
                return this._refresh && e.push("with-refresh"), this._loading && e.push("with-loading"), e.join(" ")
              }
            },
            methods: {
              createChildren: function(e) {
                var t = this.$slots.
                  default ||[];
                return this._cells = t.filter(function(e) {
                  return !(!e.tag && !e.componentOptions)
                }), [e("article", {
                  ref: "inner",
                  staticClass: "weex-list-inner weex-ct"
                }, this._cells)]
              }
            },
            render: function(e) {
              var n = this;
              return this.weexType = "list", this.$nextTick(function() {
                n.updateLayout()
              }), e("main", {
                ref: "wrapper",
                attrs: {
                  "weex-type": "list"
                },
                staticClass: this.wrapperClass,
                on: {
                  scroll: this.handleListScroll,
                  touchstart: this.handleTouchStart,
                  touchmove: this.handleTouchMove,
                  touchend: this.handleTouchEnd
                },
                staticStyle: t(this)
              }, this.createChildren(e))
            }
          }
        }(e))
      }
    },
    zr = {
      init: function(e) {
        e.registerComponent("scroller", function(e) {
          var t = e.extractComponentStyle;
          return {
            name: "weex-scroller",
            mixins: [jr, $r],
            props: {
              scrollDirection: {
                type: [String],
                default:
                  "vertical",
                validator: function(e) {
                  return -1 !== ["horizontal", "vertical"].indexOf(e)
                }
              },
              scrollable: {
                type: [Boolean],
                default:
                  !0
              }
            },
            computed: {
              wrapperClass: function() {
                var e = ["weex-scroller", "weex-scroller-wrapper", "weex-ct"];
                return "horizontal" === this.scrollDirection ? e.push("weex-scroller-horizontal") : e.push("weex-scroller-vertical"), this.scrollable || e.push("weex-scroller-disabled"), e.join(" ")
              }
            },
            methods: {
              createChildren: function(e) {
                var t = this.$slots.
                  default ||[];
                return this._cells = t.filter(function(e) {
                  return !(!e.tag && !e.componentOptions)
                }), [e("article", {
                  ref: "inner",
                  staticClass: "weex-scroller-inner weex-ct"
                }, this._cells)]
              }
            },
            render: function(e) {
              var n = this;
              return this.weexType = "scroller", this._cells = this.$slots.
                default ||[], this.$nextTick(function() {
                n.updateLayout()
              }), e("main", {
                ref: "wrapper",
                attrs: {
                  "weex-type": "scroller"
                },
                on: {
                  scroll: this.handleScroll,
                  touchstart: this.handleTouchStart,
                  touchmove: this.handleTouchMove,
                  touchend: this.handleTouchEnd
                },
                staticClass: this.wrapperClass,
                staticStyle: t(this)
              }, this.createChildren(e))
            }
          }
        }(e))
      }
    },
    Rr = 32,
    Mr = 1,
    Br = {
      init: function(e) {
        e.registerComponent("waterfall", function(e) {
          var t = e.extractComponentStyle;
          return {
            name: "weex-waterfall",
            mixins: [jr],
            props: {
              columnGap: {
                type: [String, Number],
                default:
                  "normal",
                validator: function(e) {
                  return !e || "normal" === e || (e = parseInt(e), !isNaN(e) && e > 0)
                }
              },
              columnCount: {
                type: [String, Number],
                default:
                Mr,
                validator: function(e) {
                  return e = parseInt(e), !isNaN(e) && e > 0
                }
              },
              columnWidth: {
                type: [String, Number],
                default:
                  "auto",
                validator: function(e) {
                  return !e || "auto" === e || (e = parseInt(e), !isNaN(e) && e > 0)
                }
              }
            },
            mounted: function() {
              this._nextTick()
            },
            updated: function() {
              this.$nextTick(this._nextTick())
            },
            methods: {
              _createChildren: function(e, t) {
                var n = this,
                  i = this.$slots.
                    default ||[];
                this._headers = [], this._footers = [], this._others = [];
                for (var r = i.length, o = 0; o < r; o++) {
                  var a = i[o],
                    s = a.componentOptions && a.componentOptions.tag || a.tag;
                  if ("refresh" !== s && "loading" !== s) {
                    if ("section" === s) break;
                    "header" === s && n._headers.push(a)
                  }
                }
                for (var c = r - 1; c >= 0; c--) {
                  var l = i[c],
                    u = l.componentOptions && l.componentOptions.tag || l.tag;
                  if ("refresh" !== u && "loading" !== u) {
                    if ("section" === u) break;
                    "header" === u && n._footers.push(l)
                  }
                }
                this._cells = i.filter(function(e) {
                  var t = e.componentOptions;
                  if (!e.tag && !t) return !1;
                  var i = t && t.tag || e.tag;
                  return "refresh" === i || "loading" === i ? (n["_" + i] = e, !1) : "section" === i || (n._others.push(e), !1)
                }), this._reCalc(t), this._genColumns(e);
                var d = [];
                return this._refresh && d.push(this._refresh), (d = d.concat(this._headers)).push(e("html:div", {
                  ref: "columns",
                  staticClass: "weex-waterfall-inner-columns weex-ct"
                }, this._columns)), d.push(e("html:div", {
                  ref: "footers",
                  staticClass: "weex-waterfall-footers weex-ct"
                }, this._footers)), this._loading && d.push(this._loading), [e("article", {
                  ref: "inner",
                  staticClass: "weex-waterfall-inner weex-ct"
                }, d)]
              },
              _reCalc: function(t) {
                function n(e, t) {
                  return e - (t.padding ? 2 * parseInt(t.padding) : parseInt(t.paddingLeft || 0) + parseInt(t.paddingRight || 0))
                }
                var i, r, o, a, s = e.config.env.scale,
                  c = this.$el;
                if (c && 1 === c.nodeType) {
                  var l = window.getComputedStyle(c);
                  a = n(c.getBoundingClientRect().width, l)
                } else a = n(document.documentElement.clientWidth, t);
                if (r = this.columnGap, r = r && "normal" !== r ? parseInt(r) : Rr, r *= s, i = this.columnWidth, o = this.columnCount, i && "auto" !== i && (i = parseInt(i) * s), o && "auto" !== o && (o = parseInt(o)), "auto" === o && "auto" === i);
                else if ("auto" !== o && "auto" === i) i = (a - (o - 1) * r) / o;
                else if ("auto" === o && "auto" !== i) o = (a + r) / (i + r);
                else if ("auto" !== o && "auto" !== i) {
                  var u, d = function() {
                    (u = o * i + (o - 1) * r) < a ? i += (a - u) / o : u > a && o > 1 ? (o--, d()) : u > a && (i = a)
                  };
                  d()
                }
                this._columnCount = o, this._columnWidth = i, this._columnGap = r
              },
              _genColumns: function(e) {
                this._columns = [];
                for (var t = this._cells, n = this._columnCount, i = t.length, r = this._columnCells = Array(n).join(".").split(".").map(function() {
                  return []
                }), o = 0; o < i; o++)(t[o].data.attrs || (t[o].data.attrs = {}))["data-cell"] = o, r[o % n].push(t[o]);
                for (var a = 0; a < n; a++) this._columns.push(e("html:div", {
                  ref: "column" + a,
                  attrs: {
                    "data-column": a
                  },
                  staticClass: "weex-ct",
                  staticStyle: {
                    width: this._columnWidth + "px",
                    marginLeft: 0 === a ? 0 : this._columnGap + "px"
                  }
                }, r[a]))
              },
              _nextTick: function() {
                this._reLayoutChildren()
              },
              _reLayoutChildren: function() {
                function e(e) {
                  o = Math.min.apply(Math, r), a = r.indexOf(o);
                  var t = e.elm,
                    n = e.height;
                  i[a].appendChild(t), r[a] += n
                }
                for (var t = this._columnCount, n = [], i = [], r = [], o = Number.MAX_SAFE_INTEGER, a = 0, s = 0; s < t; s++) {
                  var c = this._columns[s].elm,
                    l = c.lastElementChild,
                    u = l ? l.getBoundingClientRect().bottom : 0;
                  n.push(c), r[s] = u, i.push(document.createDocumentFragment()), u < o && (o = u, a = s)
                }
                for (var d = [], h = {}, f = 0; f < t; f++) if (f !== a) for (var p = n[f].querySelectorAll("section.weex-cell"), m = p.length - 1; m >= 0; m--) {
                  var g = p[m],
                    w = g.getBoundingClientRect();
                  if (w.top > o) {
                    var v = ~~g.getAttribute("data-cell");
                    d.push(v), h[v] = {
                      elm: g,
                      height: w.height
                    }, r[f] -= w.height
                  }
                }
                d.sort(function(e, t) {
                  return e > t
                });
                for (var b = d.length, y = 0; y < b; y++) e(h[d[y]]);
                for (var x = 0; x < t; x++) n[x].appendChild(i[x])
              }
            },
            render: function(e) {
              var n = this;
              this.weexType = "waterfall", this._cells = this.$slots.
                default ||[], this.$nextTick(function() {
                n.updateLayout()
              });
              var i = t(this);
              return e("main", {
                ref: "wrapper",
                attrs: {
                  "weex-type": "waterfall"
                },
                on: {
                  scroll: this.handleScroll,
                  touchstart: this.handleTouchStart,
                  touchmove: this.handleTouchMove,
                  touchend: this.handleTouchEnd
                },
                staticClass: "weex-waterfall weex-waterfall-wrapper weex-ct",
                staticStyle: i
              }, this._createChildren(e, i))
            }
          }
        }(e))
      }
    },
    Fr = {
      init: function(e) {
        e.registerComponent("header", function(e) {
          var t = e.extractComponentStyle,
            n = e.utils.supportSticky;
          return {
            data: function() {
              return {
                sticky: !1,
                initTop: 0,
                placeholder: null,
                supportSticky: n()
              }
            },
            mounted: function() {
              this.initTop = this.$el.offsetTop, this.placeholder = window.document.createElement("header")
            },
            updated: function() {
              this.sticky || (this.initTop = this.$el.offsetTop)
            },
            methods: {
              addSticky: function() {
                this.sticky = !0, this.placeholder.style.display = "block", this.placeholder.style.width = this.$el.offsetWidth + "px", this.placeholder.style.height = this.$el.offsetHeight + "px", this.$el.parentNode.insertBefore(this.placeholder, this.$el)
              },
              removeSticky: function() {
                this.sticky = !1;
                try {
                  this.$el.parentNode.removeChild(this.placeholder)
                } catch (e) {}
              }
            },
            render: function(e) {
              return e("html:header", {
                attrs: {
                  "weex-type": "header"
                },
                ref: "header",
                staticClass: "weex-header weex-ct",
                class: {
                  "weex-sticky": this.sticky,
                  "weex-ios-sticky": this.supportSticky
                },
                staticStyle: t(this)
              }, this.$slots.
                default)
            }
          }
        }(e))
      }
    },
    Wr = {
      init: function(e) {
        e.registerComponent("loading", function() {
          var e = weex.extractComponentStyle,
            t = weex.utils.dispatchNativeEvent;
          return {
            name: "weex-loading",
            props: {
              display: {
                type: String,
                default:
                  "show",
                validator: function(e) {
                  return -1 !== ["show", "hide"].indexOf(e)
                }
              }
            },
            data: function() {
              return {
                height: -1,
                viewHeight: 0
              }
            },
            mounted: function() {
              this.viewHeight = this.$el.offsetHeight, "hide" === this.display ? this.height = 0 : this.height = this.viewHeight
            },
            watch: {
              height: function(e) {
                var t = e + "px";
                this.$el.style.height = t, this.$el.style.bottom = t
              },
              display: function(e) {
                this.height = "hide" === e ? 0 : this.viewHeight
              }
            },
            methods: {
              pulling: function(e) {
                void 0 === e && (e = 0), this.height = e
              },
              pullingUp: function(e) {
                this.$el.style.transition = "height 0s", this.pulling(e)
              },
              pullingEnd: function() {
                this.$el && (this.$el.style.transition = "height .2s"), this.height >= this.viewHeight ? (this.pulling(this.viewHeight), this.$el && t(this.$el, "loading")) : this.pulling(0)
              },
              getChildren: function() {
                var e = this.$slots.
                  default ||[];
                return "show" === this.display ? e:
                  e.filter(function(e) {
                    return e.componentOptions && "loading-indicator" !== e.componentOptions.tag
                  })
              }
            },
            render: function(t) {
              return this.$parent._loading = this, t("aside", {
                ref: "loading",
                attrs: {
                  "weex-type": "loading"
                },
                staticClass: "weex-loading weex-ct",
                staticStyle: e(this)
              }, this.getChildren())
            }
          }
        }())
      }
    },
    Hr = {
      init: function(e) {
        e.registerComponent("refresh", function(e) {
          var t = e.extractComponentStyle,
            n = e.utils.dispatchNativeEvent;
          return {
            name: "weex-refresh",
            props: {
              display: {
                type: String,
                default:
                  "show",
                validator: function(e) {
                  return -1 !== ["show", "hide"].indexOf(e)
                }
              }
            },
            data: function() {
              return {
                lastDy: 0,
                viewHeight: 0,
                height: -1
              }
            },
            mounted: function() {
              this.viewHeight = this.$el.offsetHeight, "hide" === this.display ? this.height = 0 : this.height = this.viewHeight
            },
            watch: {
              height: function(e) {
                this.$el.style.height = e + "px"
              },
              display: function(e) {
                this.height = "hide" === e ? 0 : this.viewHeight
              }
            },
            methods: {
              pulling: function(e) {
                void 0 === e && (e = 0), this.height = e, this.$el && n(this.$el, "pullingdown", {
                  dy: e - this.lastDy,
                  pullingDistance: e,
                  viewHeight: this.viewHeight
                }), this.lastDy = e
              },
              pullingDown: function(e) {
                this.$el.style.transition = "height 0s", this.pulling(e)
              },
              pullingEnd: function() {
                this.$el && (this.$el.style.transition = "height .2s"), this.height >= this.viewHeight ? (this.pulling(this.viewHeight), this.$el && n(this.$el, "refresh")) : this.pulling(0)
              },
              getChildren: function() {
                var e = this.$slots.
                  default ||[];
                return "show" === this.display ? e:
                  e.filter(function(e) {
                    return e.componentOptions && "loading-indicator" !== e.componentOptions.tag
                  })
              }
            },
            render: function(e) {
              return this.$parent._refresh = this, e("aside", {
                ref: "refresh",
                attrs: {
                  "weex-type": "refresh"
                },
                staticClass: "weex-refresh weex-ct",
                staticStyle: t(this)
              }, this.getChildren())
            }
          }
        }(e))
      }
    },
    Dr = {
      name: "weex-loading-indicator",
      render: function(e) {
        return this.weexType = "loading-indicator", e("mark", {
          attrs: {
            "weex-type": "loading-indicator"
          },
          staticClass: "weex-loading-indicator weex-ct",
          staticStyle: function(e) {
            var t = Ir(e),
              n = t.color,
              i = n && Or(n);
            return i && Q(e, i), t
          }(this)
        })
      },
      _css: "\n.weex-refresh-indicator,\n.weex-loading-indicator {\n  width: 1rem !important;\n  height: 1rem !important;\n  -webkit-box-align: center;\n  -moz-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -moz-box-pack: center;\n  -webkit-justify-content: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  overflow: visible;\n  background: none;\n}\n.weex-refresh-indicator:before,\n.weex-loading-indicator:before {\n  display: block;\n  content: '';\n  font-size: 0.16rem;\n  width: 0.5em;\n  height: 0.5em;\n  left: 0;\n  top: 0;\n  border-radius: 50%;\n  position: relative;\n  text-indent: -9999em;\n  -webkit-animation: weex-spinner 1.1s infinite ease;\n  -moz-animation: weex-spinner 1.1s infinite ease;\n  animation: weex-spinner 1.1s infinite ease;\n}\n\n@-webkit-keyframes weex-spinner {\n  0%,\n  100% {\n    box-shadow: 0em -1.3em 0em 0em #ffffff, 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.5), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  11.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.7), 0.9em -0.9em 0 0em #ffffff, 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.5), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7), 1.25em 0em 0 0em #ffffff, 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5), 1.25em 0em 0 0em rgba(255, 255, 255, 0.7), 0.875em 0.875em 0 0em #ffffff, 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.5), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.7), 0em 1.25em 0 0em #ffffff, -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  61.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.5), 0em 1.25em 0 0em rgba(255, 255, 255, 0.7), -0.9em 0.9em 0 0em #ffffff, -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.5), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.7), -1.3em 0em 0 0em #ffffff, -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.5), -1.3em 0em 0 0em rgba(255, 255, 255, 0.7), -0.9em -0.9em 0 0em #ffffff;\n  }\n}\n\n@keyframes weex-spinner {\n  0%,\n  100% {\n    box-shadow: 0em -1.3em 0em 0em #ffffff, 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.5), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7);\n  }\n  11.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.7), 0.9em -0.9em 0 0em #ffffff, 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5);\n  }\n  25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.5), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.7), 1.25em 0em 0 0em #ffffff, 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  37.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.5), 1.25em 0em 0 0em rgba(255, 255, 255, 0.7), 0.875em 0.875em 0 0em #ffffff, 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  50% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.5), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.7), 0em 1.25em 0 0em #ffffff, -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.2), -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  61.25% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.5), 0em 1.25em 0 0em rgba(255, 255, 255, 0.7), -0.9em 0.9em 0 0em #ffffff, -1.3em 0em 0 0em rgba(255, 255, 255, 0.2), -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  75% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.5), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.7), -1.3em 0em 0 0em #ffffff, -0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2);\n  }\n  87.5% {\n    box-shadow: 0em -1.3em 0em 0em rgba(255, 255, 255, 0.2), 0.9em -0.9em 0 0em rgba(255, 255, 255, 0.2), 1.25em 0em 0 0em rgba(255, 255, 255, 0.2), 0.875em 0.875em 0 0em rgba(255, 255, 255, 0.2), 0em 1.25em 0 0em rgba(255, 255, 255, 0.2), -0.9em 0.9em 0 0em rgba(255, 255, 255, 0.5), -1.3em 0em 0 0em rgba(255, 255, 255, 0.7), -0.9em -0.9em 0 0em #ffffff;\n  }\n}\n"
    },
    Vr = {
      init: function(e) {
        Ir = e.extractComponentStyle, Or = e.utils.getRgb, Nr = e.utils.loopArray, Ar = e.utils.getStyleSheetById, e.registerComponent("loading-indicator", Dr)
      }
    };
  e('/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * "License"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n\nbody > .weex-list,\nbody > .weex-scroller,\nbody > .weex-waterfall {\n  max-height: 100%;\n}\n\n.weex-list-wrapper,\n.weex-scroller-wrapper,\n.weex-waterfall-wrapper {\n  -webkit-overflow-scrolling: touch;\n}\n\n.weex-list-wrapper,\n.weex-waterfall-wrapper {\n  overflow-y: scroll !important;\n  overflow-x: hidden !important;\n}\n\n.weex-list-inner,\n.weex-scroller-inner,\n.weex-waterfall-inner {\n  -webkit-overflow-scrolling: touch;\n}\n\n.weex-waterfall-inner-columns {\n  -webkit-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n}\n\n.weex-scroller-wrapper.weex-scroller-vertical {\n  overflow-x: hidden;\n  overflow-y: scroll;\n}\n\n.weex-scroller-wrapper.weex-scroller-horizontal {\n  overflow-x: scroll;\n  overflow-y: hidden;\n}\n\n.weex-scroller-wrapper.weex-scroller-disabled {\n  overflow-x: hidden;\n  overflow-y: hidden;\n}\n\n.weex-scroller-horizontal .weex-scroller-inner {\n  -webkit-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-orient: horizontal;\n  height: 100%;\n}\n\n.weex-cell {\n  width: 100%;\n}\n\n.weex-refresh,\n.weex-loading {\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  justify-content: center;\n  width: 100%;\n  overflow: hidden;\n}\n', void 0);
  var Yr, Ur = [Pr, zr, Br, Fr, Wr, Hr, Vr],
    qr = {
      init: function(e) {
        Ur.forEach(function(t) {
          e.install(t)
        })
      }
    },
    Kr = {
      created: function() {
        this._clones = [], this.innerOffset = 0, this._indicator = null
      },
      beforeUpdate: function() {
        this._getWrapperSize()
      },
      updated: function() {
        var e = this.$children,
          t = e && e.length;
        if (e && t > 0) for (var n = 0; n < t; n++) {
          var i = e[n];
          if ("indicator" === i.$options._componentTag || "indicator" === i.$vnode.data.ref) {
            i._watcher.get();
            break
          }
        }
        weex.utils.fireLazyload(this.$el, !0), this._preIndex !== this.currentIndex && this._slideTo(this.currentIndex)
      },
      mounted: function() {
        this._getWrapperSize(), this._slideTo(this.currentIndex), weex.utils.fireLazyload(this.$el, !0)
      },
      methods: {
        _getWrapperSize: function() {
          var e = this.$refs.wrapper;
          if (e) {
            var t = e.getBoundingClientRect();
            this._wrapperWidth = t.width, this._wrapperHeight = t.height
          }
        },
        _formatChildren: function(e) {
          var t, n = this,
            i = (this.$slots.
              default ||[]).filter(function(e) {
              return !!e.tag && (!e.componentOptions || "indicator" !== e.componentOptions.tag || (t = e, !1))
            }).map(function(t) {
              return e("li", {
                ref: "cells",
                staticClass: "weex-slider-cell weex-ct" + (n.isNeighbor ? " neighbor-cell" : "")
              }, [t])
            });
          return t && (t.data.attrs = t.data.attrs || {}, t.data.attrs.count = i.length, t.data.attrs.active = this.currentIndex, this._indicator = t), i
        },
        _renderSlides: function(e) {
          return this._cells = this._formatChildren(e), this.frameCount = this._cells.length, e("nav", {
            ref: "wrapper",
            attrs: {
              "weex-type": this.isNeighbor ? "slider-neighbor" : "slider"
            },
            on: {
              touchstart: this._handleTouchStart,
              touchmove: weex.utils.throttle(weex.utils.bind(this._handleTouchMove, this), 25),
              touchend: this._handleTouchEnd,
              touchcancel: this._handleTouchCancel
            },
            staticClass: "weex-slider weex-slider-wrapper weex-ct",
            staticStyle: weex.extractComponentStyle(this)
          }, [e("ul", {
            ref: "inner",
            staticClass: "weex-slider-inner weex-ct"
          }, this._cells), this._indicator])
        },
        _normalizeIndex: function(e) {
          var t = (e + this.frameCount) % this.frameCount;
          return Math.min(Math.max(t, 0), this.frameCount - 1)
        },
        _startAutoPlay: function() {
          if (this.autoPlay && "false" !== this.autoPlay) {
            this._autoPlayTimer && (clearTimeout(this._autoPlayTimer), this._autoPlayTimer = null);
            var e = parseInt(this.interval - 400 - 100);
            e = e > 200 ? e : 200, this._autoPlayTimer = setTimeout(weex.utils.bind(this._next, this), e)
          }
        },
        _stopAutoPlay: function() {
          this._autoPlayTimer && (clearTimeout(this._autoPlayTimer), this._autoPlayTimer = null)
        },
        _slideTo: function(e, t) {
          var n = this;
          if (!(this.frameCount <= 0)) if (this.infinite && "false" !== this.infinite || !(-1 === e || e > this.frameCount - 1)) {
            if (this._preIndex || 0 === this._preIndex || (this._showNodes && this._showNodes[0] ? this._preIndex = this._showNodes[0].index : this._preIndex = this.currentIndex), !this._sliding) {
              this._sliding = !0;
              var i = this._normalizeIndex(e),
                r = this.$refs.inner,
                o = this._step = this.frameCount <= 1 ? 0 : this._preIndex - e;
              if (r) {
                this._prepareNodes();
                var a = weex.utils.getTransformObj(r).translate,
                  s = a && a.match(/translate[^(]+\(([+-\d.]+)/),
                  c = (s && s[1] || 0) - this.innerOffset;
                this.innerOffset += o * this._wrapperWidth, r.style.webkitTransition = "-webkit-transform 0.4s ease-in-out", r.style.mozTransition = "transform 0.4s ease-in-out", r.style.transition = "transform 0.4s ease-in-out", r.style.webkitTransform = "translate3d(" + this.innerOffset + "px, 0, 0)", r.style.mozTransform = "translate3d(" + this.innerOffset + "px, 0, 0)", r.style.transform = "translate3d(" + this.innerOffset + "px, 0, 0)", t || this._emitScrollEvent("scrollstart"), setTimeout(function() {
                  n._throttleEmitScroll(c, function() {
                    n._emitScrollEvent("scrollend")
                  })
                }, 25), this._loopShowNodes(o), setTimeout(function() {
                  n.isNeighbor && n._setNeighbors(), setTimeout(function() {
                    r.style.webkitTransition = "", r.style.mozTransition = "", r.style.transition = "";
                    for (var e = n._showStartIdx; e <= n._showEndIdx; e++) {
                      var t = n._showNodes[e];
                      if (t) {
                        var o = t.firstElementChild;
                        o.style.webkitTransition = "", o.style.mozTransition = "", o.style.transition = ""
                      }
                    }
                    n._rearrangeNodes(i)
                  }, 100)
                }, 400)
              }
              i !== this._preIndex && this.$emit("change", weex.utils.createEvent(this.$el, "change", {
                index: i
              }))
            }
          } else this._slideTo(this.currentIndex)
        },
        _clearNodesOffset: function() {
          for (var e = this._showEndIdx, t = this._showStartIdx; t <= e; t++) {
            var n = this._showNodes[t];
            (n = n && n.firstElementChild) && weex.utils.addTransform(this._showNodes[t].firstElementChild, {
              translate: "translate3d(0px, 0px, 0px)"
            })
          }
        },
        _loopShowNodes: function(e) {
          if (e && !(this.frameCount <= 1)) {
            for (var t = e > 0 ? 1 : -1, n = e <= 0 ? this._showStartIdx : this._showEndIdx, i = e <= 0 ? this._showEndIdx : this._showStartIdx; n !== i - t; n -= t) {
              var r = n + e;
              this._showNodes[r] = this._showNodes[n], this._showNodes[r]._showIndex = r, delete this._showNodes[n]
            }
            this._showStartIdx += e, this._showEndIdx += e
          }
        },
        _prepareNodes: function() {
          var e = this._step;
          if (this._inited || (this._initNodes(), this._inited = !0, this._showNodes = {}), this.frameCount <= 1) {
            this._showStartIdx = this._showEndIdx = 0;
            var t = this._cells[0].elm;
            return t.style.opacity = 1, t.style.zIndex = 99, t.index = 0, this._showNodes[0] = t, t._inShow = !0, void(t._showIndex = 0)
          }
          var n = this._showCount = Math.abs(e) + 3;
          this._showStartIdx = e <= 0 ? -1 : 2 - n, this._showEndIdx = e <= 0 ? n - 2 : 1, this._clearNodesOffset(), this._positionNodes(this._showStartIdx, this._showEndIdx, e)
        },
        _initNodes: function() {
          for (var e = this.frameCount, t = this._cells, n = 0; n < e; n++) {
            var i = t[n].elm;
            i.index = n, i._inShow = !1, i.style.zIndex = 0, i.style.opacity = 0
          }
        },
        _positionNodes: function(e, t, n, i) {
          for (var r = this._cells, o = n <= 0 ? e : t, a = n <= 0 ? t : e, s = n <= 0 ? -1 : 1, c = this._preIndex + s, l = o; l !== a - s; l -= s) {
            var u = r[this._normalizeIndex(c)].elm;
            c -= s, this._positionNode(u, l)
          }
        },
        _positionNode: function(e, t) {
          var n = this._showNodes[t];
          if (e._inShow && n !== e) n && this._removeClone(n), e = this._getClone(e.index);
          else if (e._inShow) return;
          e._inShow = !0;
          var i = t * this._wrapperWidth - this.innerOffset;
          weex.utils.addTransform(e, {
            translate: "translate3d(" + i + "px, 0px, 0px)"
          }), e.style.zIndex = 99 - Math.abs(t), e.style.opacity = 1, e._showIndex = t, this._showNodes[t] = e
        },
        _getClone: function(e) {
          var t = this._clones[e];
          if (t || (this._clones[e] = t = []), t.length <= 0) {
            var n = this._cells[e].elm,
              i = n.cloneNode(!0);
            i._isClone = !0, i._inShow = n._inShow, i.index = n.index, i.style.opacity = 0, i.style.zIndex = 0;
            this.$refs.inner.appendChild(i), t.push(i)
          }
          return t.pop()
        },
        _removeClone: function(e) {
          var t = e.index;
          this._hideNode(e);
          this._clones[t].push(e)
        },
        _hideNode: function(e) {
          e._inShow = !1, e.style.opacity = 0, e.style.zIndex = 0
        },
        _clearNodes: function(e, t) {
          for (var n = e; n <= t; n++) {
            var i = this._showNodes[n];
            if (!i) return;
            i._isClone ? this._removeClone(i) : i._inShow || this._hideNode(i), delete this._showNodes[n]
          }
        },
        _copyStyle: function(e, t, n, i) {
          void 0 === n && (n = ["opacity", "zIndex"]), void 0 === i && (i = {}), weex.utils.extendKeys(t.style, e.style, n);
          var r = weex.utils.getTransformObj(e);
          for (var o in i) r[o] = i[o];
          weex.utils.addTransform(t, r);
          var a = e.firstElementChild,
            s = t.firstElementChild;
          s.style.opacity = a.style.opacity, weex.utils.copyTransform(a, s)
        },
        _replaceClone: function(e, t) {
          var n = this,
            i = this._cells[e.index].elm;
          if (!i._inShow) {
            var r, o = i._showIndex;
            Math.abs(o) <= 1 && (r = this._getClone(i.index), this._copyStyle(i, r), this._showNodes[o] = r), i._inShow = !0;
            var a = weex.utils.getTransformObj(e);
            a.translate = a.translate.replace(/[+-\d.]+[pw]x/, function(e) {
              return t * n._wrapperWidth - n.innerOffset + "px"
            }), this._copyStyle(e, i, ["opacity", "zIndex"], a), this._removeClone(e), r || delete this._showNodes[o], this._showNodes[t] = i, i._showIndex = t
          }
        },
        _rearrangeNodes: function(e) {
          if (this.frameCount <= 1) return this._sliding = !1, void(this.currentIndex = 0);
          this._startAutoPlay();
          for (var t = this._showNodes, n = this._showStartIdx; n <= this._showEndIdx; n++) t[n]._inShow = !1;
          for (var i = -1; i <= 1; i++) {
            var r = t[i];
            r._isClone ? this._replaceClone(r, i) : r._inShow = !0
          }
          this._clearNodes(this._showStartIdx, -2), this._showStartIdx = -1, this._clearNodes(2, this._showEndIdx), this._showEndIdx = 1, this._sliding = !1, this.currentIndex = e, this._preIndex = e
        },
        _setNeighbors: function() {
          for (var e = this._showStartIdx; e <= this._showEndIdx; e++) {
            var t = this._showNodes[e].firstElementChild;
            t.style.webkitTransition = "all 0.1s ease", t.style.mozTransition = "all 0.1s ease", t.style.transition = "all 0.1s ease";
            var n = {
                scale: "scale(" + (0 === e ? this.currentItemScale : this.neighborScale) + ")"
              },
              i = void 0;
            if (this._neighborWidth || (this._neighborWidth = parseFloat(t.style.width) || t.getBoundingClientRect().width), 1 === Math.abs(e)) {
              i = -e * (((this._wrapperWidth - this._neighborWidth * this.neighborScale) / 2 + this.neighborSpace * weex.config.env.scale) / this.neighborScale)
            } else i = 0;
            n.translate = "translate3d(" + i + "px, 0px, 0px)", weex.utils.addTransform(t, n), t.style.opacity = 0 === e ? 1 : this.neighborAlpha
          }
        },
        _next: function() {
          var e = this.currentIndex + 1;
          this.frameCount <= 1 && e--, this._slideTo(e)
        },
        _prev: function() {
          var e = this.currentIndex - 1;
          this.frameCount <= 1 && e++, this._slideTo(e)
        },
        _handleTouchStart: function(e) {
          var t = e.changedTouches[0];
          this._stopAutoPlay();
          var n = this.$refs.inner;
          this._touchParams = {
            originalTransform: n.style.webkitTransform || n.style.mozTransform || n.style.transform,
            startTouchEvent: t,
            startX: t.pageX,
            startY: t.pageY,
            timeStamp: e.timeStamp
          }
        },
        _handleTouchMove: function(e) {
          var t = this._touchParams;
          if (t && !this._sliding) {
            var n = this._touchParams,
              i = n.startX,
              r = n.startY,
              o = e.changedTouches[0],
              a = o.pageX - i,
              s = o.pageY - r;
            t.offsetX = a, t.offsetY = s;
            var c = t.isVertical;
            if (void 0 === c && ((c = t.isVertical = Math.abs(a) < Math.abs(s)) || this._emitScrollEvent("scrollstart")), !c) {
              e.preventDefault();
              var l = this.$refs.inner;
              l && a && (this._nodesOffsetCleared || (this._nodesOffsetCleared = !0, this._clearNodesOffset()), this._emitScrollEvent("weex$scroll", {
                offsetXRatio: a / this._wrapperWidth
              }), l.style.webkitTransform = "translate3d(" + (this.innerOffset + a) + "px, 0, 0)", l.style.mozTransform = "translate3d(" + (this.innerOffset + a) + "px, 0, 0)", l.style.transform = "translate3d(" + (this.innerOffset + a) + "px, 0, 0)")
            }
          }
        },
        _handleTouchEnd: function(e) {
          this._startAutoPlay();
          var t = this._touchParams;
          if (t) {
            if (void 0 !== t.isVertical) {
              var n = this.$refs.inner,
                i = t.offsetX;
              if (n) {
                this._nodesOffsetCleared = !1;
                var r = Math.abs(i / this._wrapperWidth) < .2,
                  o = i > 0 ? 1 : -1,
                  a = r ? this.currentIndex : this.currentIndex - o;
                this._slideTo(a, !0)
              }
              delete this._touchParams
            }
          }
        },
        _handleTouchCancel: function(e) {
          return this._handleTouchEnd(e)
        },
        _emitScrollEvent: function(e, t) {
          void 0 === t && (t = {});
          var n = this.$el;
          n && weex.utils.dispatchNativeEvent(n, e, t)
        },
        _throttleEmitScroll: function(e, t) {
          var n = this,
            i = 0,
            r = parseInt(16) - 1,
            o = e > 0 ? 1 : -1,
            a = Math.abs(e / this._wrapperWidth),
            s = function() {
              if (++i > r) return t && t.call(n);
              var e = 0 === n._step ? o * a * (1 - i / r) : o * (a + (1 - a) * i / r);
              n._emitScrollEvent("weex$scroll", {
                offsetXRatio: e
              }), setTimeout(s, 25)
            };
          s()
        }
      }
    },
    Xr = {
      mixins: [Kr],
      props: {
        index: {
          type: [String, Number],
          default:
            0
        },
        "auto-play": {
          type: [String, Boolean],
          default:
            !1
        },
        interval: {
          type: [String, Number],
          default:
            3e3
        },
        infinite: {
          type: [String, Boolean],
          default:
            !0
        }
      },
      watch: {
        index: function() {
          this.currentIndex = this._normalizeIndex(this.index)
        }
      },
      data: function() {
        return {
          frameCount: 0,
          currentIndex: this.index
        }
      },
      beforeCreate: function() {
        this.weexType = "slider"
      },
      render: function(e) {
        return this._renderSlides(e)
      }
    },
    Gr = {
      init: function(e) {
        e.registerComponent("slider", Xr), e.registerComponent("cycleslider", Xr)
      }
    },
    Qr = {
      mixins: [Kr],
      props: {
        index: {
          type: [String, Number],
          default:
            0
        },
        autoPlay: {
          type: [String, Boolean],
          default:
            !1
        },
        interval: {
          type: [String, Number],
          default:
            3e3
        },
        infinite: {
          type: [String, Boolean],
          default:
            !0
        },
        neighborSpace: {
          type: [String, Number],
          validator: function(e) {
            return e = parseFloat(e), !isNaN(e) && e > 0
          },
          default:
            20
        },
        neighborAlpha: {
          type: [String, Number],
          validator: function(e) {
            return e = parseFloat(e), !isNaN(e) && e >= 0 && e <= 1
          },
          default:
            .6
        },
        neighborScale: {
          type: [String, Number],
          validator: function(e) {
            return e = parseFloat(e), !isNaN(e) && e >= 0 && e <= 1
          },
          default:
            .8
        },
        currentItemScale: {
          type: [String, Number],
          validator: function(e) {
            return e = parseFloat(e), !isNaN(e) && e >= 0 && e <= 1
          },
          default:
            .9
        }
      },
      watch: {
        index: function() {
          this.currentIndex = this._normalizeIndex(this.index)
        }
      },
      data: function() {
        return {
          currentIndex: this.index,
          frameCount: 0
        }
      },
      beforeCreate: function() {
        this.isNeighbor = !0, this.weexType = "slider-neighbor"
      },
      render: function(e) {
        return this._renderSlides(e)
      }
    },
    Zr = {
      init: function(e) {
        e.registerComponent("slider-neighbor", Qr)
      }
    },
    Jr = {
      name: "weex-indicator",
      methods: {
        show: function() {
          this.$el.style.visibility = "visible"
        }
      },
      props: {
        itemColor: [String],
        itemSelectedColor: [String],
        itemSize: [String]
      },
      data: function() {
        return {
          count: 0,
          active: 0
        }
      },
      render: function(e) {
        var t = this.$vnode.data.attrs || {},
          n = t.count,
          i = t.active;
        if (this.count = n, this.active = i, this.count) return function(e, t) {
          for (var n = [], i = Yr(e), r = function(e) {
            var t = e._scopeIds;
            if (t) return t;
            t = [];
            for (var n = e.$parent; n;) {
              var i = void 0;
              (i = n.$options) && (i = i._scopeId) && t.push(i), n = n.$parent
            }
            return e._scopeIds = t, t
          }(e), o = {}, a = 0, s = r.length; a < s; a++) o[r[a]] = "";
          for (var c = 0; c < Number(e.count); ++c) {
            var l = ["weex-indicator-item weex-el"],
              u = !1;
            c === Number(e.active) && (l.push("weex-indicator-item-active"), u = !0), n.push(t("mark", {
              attrs: o,
              staticClass: l.join(" "),
              staticStyle: Z(i, u)
            }))
          }
          return t("nav", {
            attrs: {
              "weex-type": "indicator"
            },
            staticClass: "weex-indicator weex-ct"
          }, [t("div", {
            staticClass: "weex-indicator-inner"
          }, n)])
        }(this, e)
      }
    },
    eo = {
      init: function(e) {
        Yr = e.getComponentInlineStyle, e.registerComponent("indicator", Jr)
      }
    };
  e('/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * "License"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n \n.weex-slider-wrapper {\n  overflow: hidden;\n}\n\n.weex-slider-inner {\n  width: 100%;\n  height: 100%;\n  overflow: visible;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n\n.weex-slider-cell {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  background: transparent !important;\n  overflow: hidden;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n\n.neighbor-cell {\n  overflow: visible !important;\n}\n\nnav.weex-indicator {\n  position: absolute;\n  z-index: 10;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n  margin: 0;\n  padding: 0;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n          align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-transform: translate(-10rem, 0px);\n          transform: translate(-10rem, 0px)\n}\n\ndiv.weex-indicator-inner {\n  -webkit-transform: translate(10rem, 0px);\n          transform: translate(10rem, 0px);\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -webkit-flex-direction: row;\n          flex-direction: row;\n}\n\n.weex-indicator-item {\n  display: inline-block;\n  position: relative;\n  border-radius: 50%;\n  width: 0.266667rem;\n  height: 0.266667rem;\n  background-color: #BBBBBB;\n}\n.weex-indicator-item + .weex-indicator-item {\n  margin-left: 0.133333rem;\n}\n\n.weex-indicator-item-active {\n  background-color: blue;\n}', void 0);
  var to = {
    init: function(e) {
      e.install(Gr), e.install(Zr), e.install(eo)
    }
  };
  e('/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * "License"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n.weex-textarea {\n  font-size: 0.426667rem\n}\n.weex-textarea:focus {\n  outline: none;\n}\n', void 0);
  var no = {
      init: function(e) {
        e.registerComponent("textarea", function(e) {
          var t = e.extractComponentStyle,
            n = e.mixins.inputCommon,
            i = e.utils,
            r = i.extend,
            o = i.mapFormEvents;
          return {
            name: "weex-textarea",
            mixins: [n],
            props: {
              value: String,
              placeholder: String,
              disabled: {
                type: [String, Boolean],
                default:
                  !1
              },
              autofocus: {
                type: [String, Boolean],
                default:
                  !1
              },
              rows: {
                type: [String, Number],
                default:
                  2
              },
              returnKeyType: String
            },
            render: function(e) {
              var n = r(o(this));
              return e("html:textarea", {
                attrs: {
                  "weex-type": "textarea",
                  value: this.value,
                  disabled: "false" !== this.disabled && !1 !== this.disabled,
                  autofocus: "false" !== this.autofocus && !1 !== this.autofocus,
                  placeholder: this.placeholder,
                  rows: this.rows,
                  "return-key-type": this.returnKeyType
                },
                domProps: {
                  value: this.value
                },
                on: this.createKeyboardEvent(n),
                staticClass: "weex-textarea weex-el",
                staticStyle: t(this)
              })
            }
          }
        }(e))
      }
    },
    io = {
      init: function(e) {
        e.registerComponent("video", function(e) {
          var t = e.extractComponentStyle,
            n = e.mapNativeEvents,
            i = e.utils.dispatchNativeEvent;
          return {
            name: "weex-video",
            props: {
              src: String,
              playStatus: {
                type: String,
                default:
                  "pause",
                validator: function(e) {
                  return -1 !== ["play", "pause"].indexOf(e)
                }
              },
              autoplay: {
                type: [String, Boolean],
                default:
                  !1
              },
              autoPlay: {
                type: [String, Boolean],
                default:
                  !1
              },
              playsinline: {
                type: [String, Boolean],
                default:
                  !0
              },
              controls: {
                type: [String, Boolean],
                default:
                  !1
              }
            },
            render: function(e) {
              return "play" === this.playStatus ? this.$nextTick(function() {
                try {
                  this.$el && this.$el.play()
                } catch (e) {
                  i(this && this.$el, "error", {
                    message: e.message
                  })
                }
              }) : "pause" === this.playStatus && this.$nextTick(function() {
                this.$el && this.$el.pause()
              }), e("html:video", {
                attrs: {
                  "weex-type": "video",
                  autoplay: "false" !== this.autoplay && !1 !== this.autoplay || "false" !== this.autoPlay && !1 !== this.autoPlay,
                  "webkit-playsinline": this.playsinline,
                  controls: this.controls,
                  src: this.src
                },
                on: n(this, {
                  play: "start",
                  error: "fail"
                }),
                staticClass: "weex-video weex-el",
                staticStyle: t(this)
              })
            }
          }
        }(e))
      }
    };
  e('/*\n * Licensed to the Apache Software Foundation (ASF) under one\n * or more contributor license agreements.  See the NOTICE file\n * distributed with this work for additional information\n * regarding copyright ownership.  The ASF licenses this file\n * to you under the Apache License, Version 2.0 (the\n * "License"); you may not use this file except in compliance\n * with the License.  You may obtain a copy of the License at\n *\n *   http://www.apache.org/licenses/LICENSE-2.0\n *\n * Unless required by applicable law or agreed to in writing,\n * software distributed under the License is distributed on an\n * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY\n * KIND, either express or implied.  See the License for the\n * specific language governing permissions and limitations\n * under the License.\n */\n.weex-web {\n  position: relative;\n  width: 100%;\n  height: 100%;\n  border: none;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n', void 0);
  var ro = [Er, Lr, qr, to, no, io,
      {
        init: function(e) {
          e.registerComponent("web", function(e) {
            var t = e.extractComponentStyle,
              n = e.utils.dispatchNativeEvent;
            return {
              data: function() {
                return {
                  currentSrc: ""
                }
              },
              name: "weex-web",
              props: {
                src: String
              },
              watch: {
                src: function(e) {
                  this.currentSrc = e
                }
              },
              methods: {
                goBack: function() {
                  var e = this.$el;
                  if (e) {
                    var t = e.contentWindow;
                    try {
                      t.history.back(), this.currentSrc = t.location.href
                    } catch (t) {
                      n(e, "error", t)
                    }
                  }
                },
                goForward: function() {
                  var e = this.$el;
                  if (e) {
                    var t = e.contentWindow;
                    try {
                      t.history.forward(), this.currentSrc = t.location.href
                    } catch (t) {
                      n(e, "error", t)
                    }
                  }
                },
                reload: function() {
                  var e = this.$el;
                  if (e) try {
                    e.contentWindow.location.reload(), n(e, "pagestart", {
                      url: this.currentSrc
                    })
                  } catch (t) {
                    n(e, "error", t)
                  }
                }
              },
              created: function() {
                this.currentSrc = this.src
              },
              mounted: function() {
                var e = this.$el;
                this._prevSrc = this.currentSrc, e && n(e, "pagestart", {
                  url: this.currentSrc
                })
              },
              updated: function() {
                this.currentSrc !== this._prevSrc && (this._prevSrc = this.currentSrc, n(this.$el, "pagestart", {
                  url: this.currentSrc
                }))
              },
              render: function(e) {
                var i = this;
                return e("iframe", {
                  attrs: {
                    "weex-type": "web",
                    src: this.currentSrc
                  },
                  on: {
                    load: function(e) {
                      i.$nextTick(function() {
                        var e = this.$el;
                        try {
                          e.contentWindow.document.documentElement ? n(e, "pagefinish", {
                            url: this.currentSrc
                          }) : n(e, "error", new Error("[vue-render]:found no page content."))
                        } catch (t) {
                          n(e, "error", t)
                        }
                      })
                    }
                  },
                  staticClass: "weex-web weex-el",
                  staticStyle: t(this)
                })
              }
            }
          }(e))
        }
      }],
    oo = "geolocation" in navigator,
    ao = "[h5-render]: browser doesn't support geolocation.",
    so = {
      getCurrentPosition: function(e, t, n) {
        var i = this,
          r = function(e) {
            return i.sender.performCallback(t, e)
          };
        oo ? navigator.geolocation.getCurrentPosition(function(t) {
          return i.sender.performCallback(e, t)
        }, r, n) : (console.warn(ao), r(new Error(ao)))
      },
      watchPosition: function(e, t, n) {
        var i = this,
          r = function(e) {
            return i.sender.performCallback(t, e)
          };
        if (oo) var o = navigator.geolocation.watchPosition(function(t) {
          t.watchId = o, function(t) {
            i.sender.performCallback(e, t, !0)
          }(t)
        }, r, n);
        else console.warn(ao), r(new Error(ao))
      },
      clearWatch: function(e) {
        oo ? navigator.geolocation.clearWatch(e) : console.warn(ao)
      }
    },
    co = {
      geolocation: [{
        name: "getCurrentPosition",
        args: ["function", "function", "object"]
      }, {
        name: "watchPosition",
        args: ["function", "function", "object"]
      }, {
        name: "clearWatch",
        args: ["string"]
      }]
    },
    lo = {
      init: function(e) {
        e.registerApiModule("geolocation", so, co)
      }
    },
    uo = !1;
  try {
    uo = "undefined" != typeof localStorage
  } catch (e) {}
  var ho = "success",
    fo = "failed",
    po = "invalid_param",
    mo = "undefined",
    go = {
      setItem: function(e, t, n) {
        var i = this.sender;
        if (!uo) return ee(i, n);
        if (e && (t || 0 === t)) try {
          localStorage.setItem(e, t), i.performCallback(n, {
            result: ho,
            data: mo
          })
        } catch (e) {
          J(i, n)
        } else i.performCallback(n, {
          result: "failed",
          data: po
        })
      },
      getItem: function(e, t) {
        var n = this.sender;
        if (!uo) return ee(n, t);
        if (e) try {
          var i = localStorage.getItem(e);
          n.performCallback(t, {
            result: i ? ho : fo,
            data: i || mo
          })
        } catch (e) {
          J(n, t)
        } else n.performCallback(t, {
          result: fo,
          data: po
        })
      },
      removeItem: function(e, t) {
        var n = this.sender;
        if (!uo) return ee(n, t);
        if (e) try {
          localStorage.removeItem(e), n.performCallback(t, {
            result: ho,
            data: mo
          })
        } catch (e) {
          J(n, t)
        } else n.performCallback(t, {
          result: fo,
          data: po
        })
      },
      length: function(e) {
        var t = this.sender;
        if (!uo) return ee(t, e);
        try {
          var n = localStorage.length;
          t.performCallback(e, {
            result: ho,
            data: n
          })
        } catch (n) {
          J(t, e)
        }
      },
      getAllKeys: function(e) {
        var t = this.sender;
        if (!uo) return ee(t, e);
        try {
          for (var n = [], i = 0; i < localStorage.length; i++) n.push(localStorage.key(i));
          t.performCallback(e, {
            result: ho,
            data: n
          })
        } catch (n) {
          J(t, e)
        }
      }
    },
    wo = {
      storage: [{
        name: "setItem",
        args: ["string", "string", "function"]
      }, {
        name: "getItem",
        args: ["string", "function"]
      }, {
        name: "removeItem",
        args: ["string", "function"]
      }, {
        name: "length",
        args: ["function"]
      }, {
        name: "getAllKeys",
        args: ["function"]
      }]
    },
    vo = {
      init: function(e) {
        e.registerApiModule("storage", go, wo)
      }
    };
  "undefined" == typeof window && (window = {
    ctrl: {},
    lib: {}
  }), !window.ctrl && (window.ctrl = {}), !window.lib && (window.lib = {}), function(e, t) {
    (window.lib || (window.lib = {})).httpurl = function(e) {
      return new function(e) {
        var t = {};
        Object.defineProperty(this, "params", {
          set: function(e) {
            if ("object" == typeof e) {
              for (var n in t) delete t[n];
              for (var n in e) t[n] = e[n]
            }
          },
          get: function() {
            return t
          },
          enumerable: !0
        }), Object.defineProperty(this, "search", {
          set: function(e) {
            if ("string" == typeof e) {
              0 === e.indexOf("?") && (e = e.substr(1));
              var n = e.split("&");
              for (var i in t) delete t[i];
              for (var r = 0; r < n.length; r++) {
                var o = n[r].split("=");
                if (void 0 !== o[1] && (o[1] = o[1].toString()), o[0]) try {
                  t[decodeURIComponent(o[0])] = decodeURIComponent(o[1])
                } catch (e) {
                  t[o[0]] = o[1]
                }
              }
            }
          },
          get: function() {
            var e = [];
            for (var n in t) if (void 0 !== t[n]) if ("" !== t[n]) try {
              e.push(encodeURIComponent(n) + "=" + encodeURIComponent(t[n]))
            } catch (i) {
              e.push(n + "=" + t[n])
            } else try {
              e.push(encodeURIComponent(n))
            } catch (t) {
              e.push(n)
            }
            return e.length ? "?" + e.join("&") : ""
          },
          enumerable: !0
        });
        var n;
        Object.defineProperty(this, "hash", {
          set: function(e) {
            "string" == typeof e && (e && e.indexOf("#") < 0 && (e = "#" + e), n = e || "")
          },
          get: function() {
            return n
          },
          enumerable: !0
        }), this.set = function(e) {
          var t;
          if (!(t = (e = e || "").match(new RegExp("^([a-z0-9-]+:)?[/]{2}(?:([^@/:?]+)(?::([^@/:]+))?@)?([^:/?#]+)(?:[:]([0-9]+))?([/][^?#;]*)?(?:[?]([^#]*))?([#][^?]*)?$", "i")))) throw new Error("Wrong uri scheme.");
          this.protocol = t[1] || ("object" == typeof location ? location.protocol : ""), this.username = t[2] || "", this.password = t[3] || "", this.hostname = this.host = t[4], this.port = t[5] || "", this.pathname = t[6] || "/", this.search = t[7] || "", this.hash = t[8] || "", this.origin = this.protocol + "//" + this.hostname
        }, this.toString = function() {
          var e = this.protocol + "//";
          return this.username && (e += this.username, this.password && (e += ":" + this.password), e += "@"), e += this.host, this.port && "80" !== this.port && (e += ":" + this.port), this.pathname && (e += this.pathname), this.search && (e += this.search), this.hash && (e += this.hash), e
        }, e && this.set(e.toString())
      }(e)
    }
  }(window);
  window.lib.httpurl;
  var bo, yo, xo, _o = function(e) {
      return encodeURIComponent(e).replace(/[!'()*]/g, function(e) {
        return "%" + e.charCodeAt(0).toString(16).toUpperCase()
      })
    },
    So = Object.getOwnPropertySymbols,
    To = Object.prototype.hasOwnProperty,
    Co = Object.prototype.propertyIsEnumerable,
    ko = function() {
      try {
        if (!Object.assign) return !1;
        var e = new String("abc");
        if (e[5] = "de", "5" === Object.getOwnPropertyNames(e)[0]) return !1;
        for (var t = {}, n = 0; n < 10; n++) t["_" + String.fromCharCode(n)] = n;
        if ("0123456789" !== Object.getOwnPropertyNames(t).map(function(e) {
            return t[e]
          }).join("")) return !1;
        var i = {};
        return "abcdefghijklmnopqrst".split("").forEach(function(e) {
          i[e] = e
        }), "abcdefghijklmnopqrst" === Object.keys(Object.assign({}, i)).join("")
      } catch (e) {
        return !1
      }
    }() ? Object.assign : function(e, t) {
      for (var n, i, r = arguments, o = function(e) {
        if (null === e || void 0 === e) throw new TypeError("Object.assign cannot be called with null or undefined");
        return Object(e)
      }(e), a = 1; a < arguments.length; a++) {
        n = Object(r[a]);
        for (var s in n) To.call(n, s) && (o[s] = n[s]);
        if (So) {
          i = So(n);
          for (var c = 0; c < i.length; c++) Co.call(n, i[c]) && (o[i[c]] = n[i[c]])
        }
      }
      return o
    },
    Eo = function(e, t) {
      var n = function(e) {
        switch (e.arrayFormat) {
          case "index":
            return function(t, n, i) {
              return null === n ? [te(t, e), "[", i, "]"].join("") : [te(t, e), "[", te(i, e), "]=", te(n, e)].join("")
            };
          case "bracket":
            return function(t, n) {
              return null === n ? te(t, e) : [te(t, e), "[]=", te(n, e)].join("")
            };
          default:
            return function(t, n) {
              return null === n ? te(t, e) : [te(t, e), "=", te(n, e)].join("")
            }
        }
      }(t = ko({
        encode: !0,
        strict: !0,
        arrayFormat: "none"
      }, t));
      return e ? Object.keys(e).sort().map(function(i) {
        var r = e[i];
        if (void 0 === r) return "";
        if (null === r) return te(i, t);
        if (Array.isArray(r)) {
          var o = [];
          return r.slice().forEach(function(e) {
            void 0 !== e && o.push(n(i, e, o.length))
          }), o.join("&")
        }
        return te(i, t) + "=" + te(r, t)
      }).filter(function(e) {
        return e.length > 0
      }).join("&") : ""
    },
    Io = 0,
    Oo = -1,
    No = {
      sendHttp: function(e, t) {
        if ("string" == typeof e) try {
          e = JSON.parse(e)
        } catch (e) {
          return
        }
        if ("object" != typeof e || !e.url) return console.error("[h5-render] invalid config or invalid config.url for sendHttp API");
        var n = this.sender,
          i = e.method || "GET",
          r = new XMLHttpRequest;
        r.open(i, e.url, !0), r.onload = function() {
          n.performCallback(t, this.responseText)
        }, r.onerror = function(e) {
          return console.error("[h5-render] unexpected error in sendHttp API", e)
        }, r.send()
      },
      fetch: function(e, t, n) {
        var i = ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],
          r = ["cors", "no-cors", "same-origin", "navigate"],
          o = ["text", "json", "jsonp", "arraybuffer"],
          a = this.sender,
          s = bo.extend({}, e);
        if (void 0 === s.method) s.method = "GET", console.warn("[h5-render] options.method for 'fetch' API has been set to default value '" + s.method + "'");
        else if (-1 === i.indexOf((s.method + "").toUpperCase())) return console.error("[h5-render] options.method '" + s.method + "' for 'fetch' API should be one of " + i + ".");
        if (!s.url) return console.error("[h5-render] options.url should be set for 'fetch' API.");
        if ("GET" === s.method.toUpperCase()) {
          var c = s.body;
          bo.isPlainObject(c) && (c = Eo(c));
          var l = s.url,
            u = l.indexOf("#");
          u <= -1 && (u = l.length);
          var d = l.substr(u);
          d && "#" === d[0] && (d = d.substr(1)), l = l.substring(0, u), c && (l += (s.url.indexOf("?") <= -1 ? "?" : "&") + c), l += "#" + d, s.url = l
        }
        if (void 0 === s.mode) s.mode = "cors";
        else if (-1 === r.indexOf((s.mode + "").toLowerCase())) return console.error("[h5-render] options.mode '" + s.mode + "' for 'fetch' API should be one of " + r + ".");
        if (void 0 === s.type) s.type = "text", console.warn("[h5-render] options.type for 'fetch' API has been set to default value '" + s.type + "'.");
        else if (-1 === o.indexOf((s.type + "").toLowerCase())) return console.error("[h5-render] options.type '" + s.type + "' for 'fetch' API should be one of " + o + ".");
        if (s.headers = s.headers || {}, !bo.isPlainObject(s.headers)) return console.error("[h5-render] options.headers should be a plain object");
        s.timeout = parseInt(s.timeout, 10) || 2500;
        var h = [s, function(e) {
          a.performCallback(t, e)
        }];
        n && h.push(function(e) {
          a.performCallback(n, e, !0)
        }), "jsonp" === s.type ?
          function(e, t, n) {
            var i, r = e.jsonpCallbackName || "jsonp_" + ++Io;
            e.url || console.error("[h5-render] config.url should be set in _jsonp for 'fetch' API."), global[r] = function(e) {
              return function(n) {
                t({
                  status: 200,
                  ok: !0,
                  statusText: "OK",
                  data: n
                }), delete global[e]
              }
            }(r);
            var o = document.createElement("script");
            try {
              i = lib.httpurl(e.url)
            } catch (t) {
              console.error("[h5-render] invalid config.url in _jsonp for 'fetch' API: " + e.url)
            }
            i.params.callback = r, o.type = "text/javascript", o.src = i.toString(), o.onerror = function(e) {
              return function(n) {
                console.error("[h5-render] unexpected error in _jsonp for 'fetch' API", n), t({
                  status: Oo,
                  ok: !1,
                  statusText: "",
                  data: ""
                }), delete global[e]
              }
            }(r), document.getElementsByTagName("head")[0].insertBefore(o, null)
          }.apply(this, h) : function(e, t, n) {
            var i = new XMLHttpRequest;
            i.responseType = e.type, i.open(e.method, e.url, !0), !0 === e.withCredentials && (i.withCredentials = !0);
            var r = e.headers || {};
            for (var o in r) i.setRequestHeader(o, r[o]);
            i.onload = function(e) {
              t({
                status: i.status,
                ok: i.status >= 200 && i.status < 300,
                statusText: i.statusText,
                data: i.response,
                headers: i.getAllResponseHeaders().split("\n").reduce(function(e, t) {
                  var n = t.match(/(.+): (.+)/);
                  return n && (e[n[1]] = n[2]), e
                }, {})
              })
            }, n && (i.onprogress = function(e) {
              n({
                readyState: i.readyState,
                status: i.status,
                length: e.loaded,
                total: e.total,
                statusText: i.statusText,
                headers: i.getAllResponseHeaders().split("\n").reduce(function(e, t) {
                  var n = t.match(/(.+): (.+)/);
                  return n && (e[n[1]] = n[2]), e
                }, {})
              })
            }), i.onerror = function(e) {
              console.error("[h5-render] unexpected error in _xhr for 'fetch' API", e), t({
                status: Oo,
                ok: !1,
                statusText: "",
                data: ""
              })
            }, i.send(e.body || null)
          }.apply(this, h)
      }
    },
    Ao = {
      stream: [{
        name: "sendHttp",
        args: ["object", "function"]
      }, {
        name: "fetch",
        args: ["object", "function", "function"]
      }]
    },
    Lo = {
      init: function(e) {
        bo = e.utils, e.registerApiModule("stream", No, Ao)
      }
    },
    jo = "__weex_clipboard_id__",
    $o = {
      getString: function(e) {
        console.log("clipboard.getString() is not supported now.")
      },
      setString: function(e) {
        if ("string" == typeof e && "" !== e && document.execCommand) {
          var t = function() {
            var e = document.getElementById(jo);
            return e || ((e = document.createElement("input")).setAttribute("id", jo), e.style.cssText = "height:1px;width:1px;border:none;", document.body.appendChild(e)), e
          }();
          t.value = e, t.select(), document.execCommand("copy"), t.value = "", t.blur()
        } else console.log("only support string input now")
      }
    },
    Po = {
      clipboard: [{
        name: "getString",
        args: ["function"]
      }, {
        name: "setString",
        args: ["string"]
      }]
    },
    zo = {
      init: function(e) {
        e.registerApiModule("clipboard", $o, Po)
      }
    },
    Ro = {
      openURL: function(e) {
        location.href = e
      }
    },
    Mo = {
      event: [{
        name: "openURL",
        args: ["string"]
      }]
    },
    Bo = {
      init: function(e) {
        e.registerApiModule("event", Ro, Mo)
      }
    },
    Fo = {},
    Wo = {
      transition: "transitionend",
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "mozTransitionEnd",
      OTransition: "oTransitionEnd",
      msTransition: "MSTransitionEnd"
    };
  !
    function() {
      var e = document.createElement("div").style;
      for (var t in Wo) if (t in e) {
        yo = Wo[t], xo = t;
        break
      }
    }();
  var Ho, Do = {
      transition: function(e, t, n) {
        if (t.styles) return function(e, t, n) {
          var i = Fo.nextFrame,
            r = Fo.toCSSText,
            o = Fo.styleObject2rem;
          (0, Fo.isArray)(e) && (e = e[0]);
          var a = "all " + (t.duration || 0) + "ms " + (t.timingFunction || "linear") + " " + (t.delay || 0) + "ms",
            s = e instanceof HTMLElement ? e : e.$el;
          s && weex.utils.fireLazyload(s, !0);
          var c = function(e) {
            e && e.stopPropagation(), yo && (s.removeEventListener(yo, c), s.style[xo] = ""), n()
          };
          yo && (s.style[xo] = a, s.addEventListener(yo, c)), i(function() {
            s.style.cssText += r(o(t.styles, 75) || {})
          })
        }(e, t, function() {
          n && n()
        })
      }
    },
    Vo = {
      init: function(e) {
        (0, e.utils.extendKeys)(Fo, e.utils, ["nextFrame", "toCSSText", "styleObject2rem", "isArray"]), e.registerModule("animation", Do)
      }
    },
    Yo = {},
    Uo = {
      scrollToElement: function(e, t) {
        var n = Yo.getParentScrollerElement;
        (0, Yo.isArray)(e) && (e = e[0]);
        var i = e instanceof HTMLElement,
          r = i ? e : e.$el || e.elm,
          o = n(e),
          a = o.__vue__,
          s = o === document.body,
          c = s ? "vertical" : a && a.scrollDirection || "vertical";
        if (o && r) {
          var l = {
              horizontal: "Left",
              vertical: "Top"
            }[c],
            u = o.getBoundingClientRect(),
            d = r.getBoundingClientRect();
          !i && a && "waterfall" === a.weexType && a._headers && a._headers.indexOf(e.$vnode || e) > -1 && (d = o.firstElementChild.getBoundingClientRect());
          var h = l.toLowerCase(),
            f = (s ? 0 : o["scroll" + l]) + d[h] - u[h];
          if (t && (f += t.offset && t.offset * weex.config.env.scale || 0), t && !1 === t.animated) return ie.call(o, l, f);
          re({
            scrollable: o,
            startTime: ne(),
            frame: null,
            startPosition: s ? window.pageYOffset : o["scroll" + l],
            position: f,
            method: ie,
            dSuffix: l
          })
        }
      },
      getComponentRect: function(e, t) {
        function n(e) {
          var t = {};
          return o.forEach(function(n) {
            e[n] && (t[n] = e[n] / i)
          }), t
        }(0, Yo.isArray)(e) && (e = e[0]);
        var i = window.weex.config.env.scale,
          r = {
            result: !1
          },
          o = ["width", "height", "top", "bottom", "left", "right"];
        if (e && "viewport" === e) r.result = !0, r.size = n({
          width: document.documentElement.clientWidth,
          height: document.documentElement.clientHeight,
          top: 0,
          left: 0,
          right: document.documentElement.clientWidth,
          bottom: document.documentElement.clientHeight
        });
        else if (e) {
          var a = e instanceof HTMLElement ? e : e.$el;
          a.getBoundingClientRect ? (r.result = !0, r.size = n(a.getBoundingClientRect())) : r.result = !1
        }
        var s = r.result ? r : {
          result: !1,
          errMsg: "Illegal parameter"
        };
        return t && t(s), s
      },
      addRule: function(e, t) {
        var n = Yo.camelToKebab,
          i = Yo.appendCss;
        e = n(e);
        var r = "";
        for (var o in t) t.hasOwnProperty(o) && (r += n(o) + ":" + t[o] + ";");
        i("@" + e + "{" + r + "}", "dom-added-rules")
      }
    },
    qo = {
      init: function(e) {
        (0, e.utils.extendKeys)(Yo, e.utils, ["camelToKebab", "appendCss", "isArray", "getParentScrollerElement"]), e.registerModule("dom", Uo)
      }
    },
    Ko = {},
    Xo = {
      addEventListener: function(e, t) {
        if (t) {
          var n = Ko[e];
          n || (n = Ko[e] = []);
          for (var i = n.length, r = 0; r < i; r++) if (n[r] === t) return;
          n.push(t), document.addEventListener(e, t)
        }
      },
      removeEventListener: function(e) {
        var t = Ko[e];
        t && (t.forEach(function(t) {
          return document.removeEventListener(e, t)
        }), delete Ko[e])
      }
    },
    Go = {
      init: function(e) {
        e.registerModule("globalEvent", Xo)
      }
    },
    Qo = [],
    Zo = !1,
    Jo = "weex-toast",
    ea = .4,
    ta = {
      push: function(e, t) {
        Qo.push({
          msg: e,
          duration: t || .8
        }), this.show()
      },
      show: function() {
        var e = this;
        if (!Qo.length) return Ho && Ho.parentNode.removeChild(Ho), void(Ho = null);
        if (!Zo) {
          Zo = !0;
          var t = Qo.shift();
          !
            function(e, t) {
              Ho || ((Ho = document.createElement("div")).classList.add(Jo), Ho.classList.add("hide"), document.body.appendChild(Ho)), Ho.textContent = e, setTimeout(function() {
                Ho.classList.remove("hide"), t && t()
              }, 16)
            }(t.msg, function() {
              setTimeout(function() {
                !
                  function(e) {
                    Ho && (Ho.classList.add("hide"), setTimeout(function() {
                      e && e()
                    }, 1e3 * ea))
                  }(function() {
                    Zo = !1, e.show()
                  })
              }, 1e3 * t.duration)
            })
        }
      }
    },
    na = "weex-modal-wrap",
    ia = "weex-modal-node";
  oe.prototype = {
    show: function() {
      this.wrap.style.display = "block", this.node.classList.remove("hide")
    },
    destroy: function() {
      document.body.removeChild(this.wrap), document.body.removeChild(this.node), this.wrap = null, this.node = null
    },
    createWrap: function() {
      this.wrap = document.createElement("div"), this.wrap.className = na, document.body.appendChild(this.wrap)
    },
    createNode: function() {
      this.node = document.createElement("div"), this.node.classList.add(ia, "hide"), document.body.appendChild(this.node)
    },
    clearNode: function() {
      this.node.innerHTML = ""
    },
    createNodeContent: function() {},
    bindEvents: function() {
      this.wrap.addEventListener("click", function(e) {
        e.preventDefault(), e.stopPropagation()
      })
    }
  };
  (ae.prototype = Object.create(oe.prototype)).createNodeContent = function() {
    var e = document.createElement("div");
    e.classList.add("content"), this.node.appendChild(e);
    var t = document.createElement("div");
    t.classList.add("content-msg"), t.appendChild(document.createTextNode(this.msg)), e.appendChild(t);
    var n = document.createElement("div");
    n.classList.add("btn-group"), this.node.appendChild(n);
    var i = document.createElement("div");
    i.classList.add("btn", "alert-ok"), i.appendChild(document.createTextNode(this.okTitle)), n.appendChild(i)
  }, ae.prototype.bindEvents = function() {
    oe.prototype.bindEvents.call(this);
    this.node.querySelector(".btn").addEventListener("click", function() {
      this.destroy(), this.callback && this.callback()
    }.bind(this))
  };
  (se.prototype = Object.create(oe.prototype)).createNodeContent = function() {
    var e = document.createElement("div");
    e.classList.add("content"), this.node.appendChild(e);
    var t = document.createElement("div");
    t.classList.add("content-msg"), t.appendChild(document.createTextNode(this.msg)), e.appendChild(t);
    var n = document.createElement("div");
    n.classList.add("btn-group"), this.node.appendChild(n);
    var i = document.createElement("div");
    i.appendChild(document.createTextNode(this.okTitle)), i.classList.add("btn-ok", "btn");
    var r = document.createElement("div");
    r.appendChild(document.createTextNode(this.cancelTitle)), r.classList.add("btn-cancel", "btn"), n.appendChild(i), n.appendChild(r), this.node.appendChild(n)
  }, se.prototype.bindEvents = function() {
    oe.prototype.bindEvents.call(this);
    var e = this.node.querySelector(".btn.btn-ok"),
      t = this.node.querySelector(".btn.btn-cancel");
    e.addEventListener("click", function() {
      this.destroy(), this.callback && this.callback(this.okTitle)
    }.bind(this)), t.addEventListener("click", function() {
      this.destroy(), this.callback && this.callback(this.cancelTitle)
    }.bind(this))
  };
  (ce.prototype = Object.create(oe.prototype)).createNodeContent = function() {
    var e = document.createElement("div");
    e.classList.add("content"), this.node.appendChild(e);
    var t = document.createElement("div");
    t.classList.add("content-msg"), t.appendChild(document.createTextNode(this.msg)), e.appendChild(t);
    var n = document.createElement("div");
    n.classList.add("input-wrap"), e.appendChild(n);
    var i = document.createElement("input");
    i.classList.add("input"), i.type = "text", i.autofocus = !0, i.placeholder = this.defaultMsg, n.appendChild(i);
    var r = document.createElement("div");
    r.classList.add("btn-group");
    var o = document.createElement("div");
    o.appendChild(document.createTextNode(this.okTitle)), o.classList.add("btn-ok", "btn");
    var a = document.createElement("div");
    a.appendChild(document.createTextNode(this.cancelTitle)), a.classList.add("btn-cancel", "btn"), r.appendChild(o), r.appendChild(a), this.node.appendChild(r)
  }, ce.prototype.bindEvents = function() {
    oe.prototype.bindEvents.call(this);
    var e = this.node.querySelector(".btn.btn-ok"),
      t = this.node.querySelector(".btn.btn-cancel"),
      n = this;
    e.addEventListener("click", function() {
      var e = document.querySelector("input").value;
      this.destroy(), this.callback && this.callback({
        result: n.okTitle,
        data: e
      })
    }.bind(this)), t.addEventListener("click", function() {
      var e = document.querySelector("input").value;
      this.destroy(), this.callback && this.callback({
        result: n.cancelTitle,
        data: e
      })
    }.bind(this))
  };
  var ra, oa = {
      toast: function(e) {
        ta.push(e.message, e.duration)
      },
      alert: function(e, t) {
        e.callback = function() {
          t && t()
        }, new ae(e).show()
      },
      confirm: function(e, t) {
        e.callback = function(e) {
          t && t(e)
        }, new se(e).show()
      },
      prompt: function(e, t) {
        e.callback = function(e) {
          t && t(e)
        }, new ce(e).show()
      }
    },
    aa = {
      init: function(e) {
        e.utils.appendCss("\n.weex-toast {\n  font-size: 0.426667rem;\n  line-height: 0.426667rem;\n  position: fixed;\n  z-index: 1999999999;\n  box-sizing: border-box;\n  max-width: 80%;\n  bottom: 50%;\n  left: 50%;\n  padding: 0.213333rem;\n  background-color: #000;\n  color: #fff;\n  text-align: center;\n  opacity: 0.7;\n  -webkit-transition: all 0.4s ease-in-out;\n  -moz-transition: all 0.4s ease-in-out;\n  -ms-transition: all 0.4s ease-in-out;\n  transition: all 0.4s ease-in-out;\n  border-radius: 0.066667rem;\n  -webkit-transform: translateX(-50%);\n  -moz-transform: translateX(-50%);\n  -ms-transform: translateX(-50%);\n  transform: translateX(-50%);\n}\n\n.weex-toast.hide {\n  opacity: 0;\n}\n\n.weex-alert .weex-alert-ok {\n  width: 100%;\n}\n\n.weex-confirm .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n\n.weex-confirm .btn-group .btn.btn-ok {\n  border-right: 0.013333rem solid #ddd;\n}\n\n.weex-modal-wrap {\n  display: none;\n  position: fixed;\n  z-index: 999999999;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  background-color: #000;\n  opacity: 0.5;\n}\n\n.weex-modal-node {\n  position: fixed;\n  z-index: 9999999999;\n  top: 50%;\n  left: 50%;\n  width: 6.666667rem;\n  min-height: 2.666667rem;\n  border-radius: 0.066667rem;\n  -webkit-transform: translate(-50%, -50%);\n  -moz-transform: translate(-50%, -50%);\n  -ms-transform: translate(-50%, -50%);\n  transform: translate(-50%, -50%);\n  background-color: #fff;\n}\n\n.weex-modal-node.hide {\n  display: none;\n}\n\n.weex-modal-node .content {\n  display: -webkit-box;\n  display: -webkit-flex;\n  display: -moz-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-flex-direction: column;\n  -moz-box-orient: vertical;\n  -moz-box-direction: normal;\n  -ms-flex-direction: column;\n      flex-direction: column;\n  -webkit-box-align: center;\n  -webkit-align-items: center;\n  -ms-flex-align: center;\n  -moz-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -webkit-justify-content: center;\n  -moz-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  min-height: 1.866667rem;\n  box-sizing: border-box;\n  font-size: 0.426667rem;\n  line-height: 0.426667rem;\n  padding: 0.213333rem;\n  border-bottom: 0.013333rem solid #ddd;\n}\n\n.weex-modal-node .btn-group {\n  width: 100%;\n  height: 0.8rem;\n  font-size: 0.373333rem;\n  text-align: center;\n  margin: 0;\n  padding: 0;\n  border: none;\n}\n\n.weex-modal-node .btn-group .btn {\n  text-align: center;\n}\n\n.weex-modal-node .btn-group .btn {\n  box-sizing: border-box;\n  height: 0.8rem;\n  line-height: 0.8rem;\n  margin: 0;\n  padding: 0;\n  border: none;\n  background: none;\n  text-align: center;\n}\n\n.weex-prompt .input-wrap {\n  box-sizing: border-box;\n  width: 100%;\n  margin-top: 0.133333rem;\n  height: 0.96rem;\n}\n\n.weex-prompt .input-wrap .input {\n  box-sizing: border-box;\n  width: 100%;\n  height: 0.56rem;\n  line-height: 0.56rem;\n  font-size: 0.426667rem;\n  border: 0.013333rem solid #999;\n}\n\n.weex-prompt .btn-group .btn {\n  float: left;\n  width: 50%;\n}\n\n.weex-prompt .btn-group .btn.btn-ok {\n  border-right: 0.013333rem solid #ddd;\n}\n", "weex-mud-modal"), e.registerModule("modal", oa)
      }
    },
    sa = {
      push: function(e, t) {
        window.location.href = e.url, t && t()
      },
      pop: function(e, t) {
        window.history.back(), t && t()
      }
    },
    ca = {
      init: function(e) {
        e.registerModule("navigator", sa)
      }
    },
    la = {
      goBack: function(e) {
        ra(e) && (e = e[0]), e && "function" == typeof e.goBack && e.goBack()
      },
      goForward: function(e) {
        ra(e) && (e = e[0]), e && "function" == typeof e.goForward && e.goForward()
      },
      reload: function(e) {
        ra(e) && (e = e[0]), e && "function" == typeof e.reload && e.reload()
      }
    },
    ua = {
      init: function(e) {
        ra = e.utils.isArray, e.registerModule("webview", la)
      }
    },
    da = function() {
      var e = ["onopen", "onmessage", "onerror", "onclose"],
        t = {
          INSTANCE: null,
          WebSocket: function(e, n) {
            if (e) return t.INSTANCE = n ? new WebSocket(e, n) : new WebSocket(e), t.INSTANCE;
            t.INSTANCE = null
          },
          send: function(e) {
            t.INSTANCE && t.INSTANCE.send(e)
          },
          close: function() {
            t.INSTANCE && t.INSTANCE.close()
          }
        },
        n = function(n) {
          e.hasOwnProperty(n) && Object.defineProperty(t, e[n], {
            get: function() {
              return t.INSTANCE && t.INSTANCE[e[n]]
            },
            set: function(i) {
              t.INSTANCE && (t.INSTANCE[e[n]] = i)
            }
          })
        };
      for (var i in e) n(i);
      return t
    }(),
    ha = {
      setViewport: function(e) {
        console.warn('[vue-render] meta.setViewport doesn\'t works as expected in web platform. Please use <meta name="weex-viewport" content="xxx"> to specify your viewport width.')
      }
    },
    fa = [lo, vo, Lo, zo, Bo, aa,
      {
        init: function(e) {
          e.registerModule("webSocket", da, {
            registerType: "assignment"
          })
        }
      },
      Vo, qo, Go, ca, ua,
      {
        init: function(e) {
          e.registerModule("meta", ha)
        }
      }],
    pa = {
      contain: "contain",
      cover: "cover",
      stretch: "100% 100%"
    },
    ma = Object.keys(pa),
    ga = {
      resize: {
        init: function(e) {
          e.__vue__.directive("weex-resize", function(e, t) {
            if ("figure" === e.tagName.toLowerCase()) {
              var n = t.value;
              n !== t.oldvalue && (ma.indexOf(n) <= -1 && (n = "stretch"), e.style.backgroundSize = pa[n])
            }
          })
        }
      }
    },
    wa = weex.init;
  return weex.init = function() {
    wa.apply(weex, arguments);
    ro.concat(fa).forEach(function(e) {
      weex.install(e)
    });
    for (var e in ga) weex.install(ga[e])
  }, global.Vue && weex.init(global.Vue), weex
});
