(function() {
    function t(t, i) {
      for (var e in i) m.call(i, e) && (t[e] = i[e]);
  
      function s() {
        this.constructor = t
      }
      return s.prototype = i.prototype, t.prototype = new s, t.__super__ = i.prototype, t
    }
    var i, e, s, n, o, p, a, h, r, l, g, c, u, d = [].slice,
      m = {}.hasOwnProperty,
      x = [].indexOf || function(t) {
        for (var i = 0, e = this.length; i < e; i++)
          if (i in this && this[i] === t) return i;
        return -1
      };
  
    function f(t, i) {
      null == t && (t = !0), this.clear = null == i || i, t && AnimationUpdater.add(this)
    }
  
    function v() {
      return v.__super__.constructor.apply(this, arguments)
    }
  
    function y(t, i) {
      this.el = t, this.fractionDigits = i
    }
  
    function V(t, i) {
      if (this.elem = t, this.text = null != i && i, V.__super__.constructor.call(this), void 0 === this.elem) throw new Error("The element isn't defined.");
      this.value = 1 * this.elem.innerHTML, this.text && (this.value = 0)
    }
  
    function w(t) {
      if (this.gauge = t, void 0 === this.gauge) throw new Error("The element isn't defined.");
      this.ctx = this.gauge.ctx, this.canvas = this.gauge.canvas, w.__super__.constructor.call(this, !1, !1), this.setOptions()
    }
  
    function S(t) {
      this.elem = t
    }
  
    function M(t) {
      var i, e;
      this.canvas = t, M.__super__.constructor.call(this), this.percentColors = null, "undefined" != typeof G_vmlCanvasManager && (this.canvas = window.G_vmlCanvasManager.initElement(this.canvas)), this.ctx = this.canvas.getContext("2d"), i = this.canvas.clientHeight, e = this.canvas.clientWidth, this.canvas.height = i, this.canvas.width = e, this.gp = [new p(this)], this.setOptions()
    }
  
    function C(t) {
      this.canvas = t, C.__super__.constructor.call(this), "undefined" != typeof G_vmlCanvasManager && (this.canvas = window.G_vmlCanvasManager.initElement(this.canvas)), this.ctx = this.canvas.getContext("2d"), this.setOptions(), this.render()
    }
  
    function _() {
      return _.__super__.constructor.apply(this, arguments)
    }! function() {
      var s, n, t, o, i, e, a;
      for (t = 0, i = (a = ["ms", "moz", "webkit", "o"]).length; t < i && (e = a[t], !window.requestAnimationFrame); t++) window.requestAnimationFrame = window[e + "RequestAnimationFrame"], window.cancelAnimationFrame = window[e + "CancelAnimationFrame"] || window[e + "CancelRequestAnimationFrame"];
      s = null, o = 0, n = {}, requestAnimationFrame ? window.cancelAnimationFrame || (s = window.requestAnimationFrame, window.requestAnimationFrame = function(t, i) {
        var e;
        return e = ++o, s(function() {
          if (!n[e]) return t()
        }, i), e
      }, window.cancelAnimationFrame = function(t) {
        return n[t] = !0
      }) : (window.requestAnimationFrame = function(t, i) {
        var e, s, n, o;
        return e = (new Date).getTime(), o = Math.max(0, 16 - (e - n)), s = window.setTimeout(function() {
          return t(e + o)
        }, o), n = e + o, s
      }, window.cancelAnimationFrame = function(t) {
        return clearTimeout(t)
      })
    }(), u = function(t) {
      var i, e;
      for (t -= 3600 * (i = Math.floor(t / 3600)) + 60 * (e = Math.floor((t - 3600 * i) / 60)), t += "", e += ""; e.length < 2;) e = "0" + e;
      for (; t.length < 2;) t = "0" + t;
      return (i = i ? i + ":" : "") + e + ":" + t
    }, g = function() {
      var t, i, e;
      return e = (i = 1 <= arguments.length ? d.call(arguments, 0) : [])[0], t = i[1], r(e.toFixed(t))
    }, c = function(t, i) {
      var e, s, n;
      for (e in s = {}, t) m.call(t, e) && (n = t[e], s[e] = n);
      for (e in i) m.call(i, e) && (n = i[e], s[e] = n);
      return s
    }, r = function(t) {
      var i, e, s, n;
      for (s = (e = (t += "").split("."))[0], n = "", 1 < e.length && (n = "." + e[1]), i = /(\d+)(\d{3})/; i.test(s);) s = s.replace(i, "$1,$2");
      return s + n
    }, l = function(t) {
      return "#" === t.charAt(0) ? t.substring(1, 7) : t
    }, f.prototype.animationSpeed = 32, f.prototype.update = function(t) {
      var i;
      return null == t && (t = !1), !(!t && this.displayedValue === this.value || (this.ctx && this.clear && this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), i = this.value - this.displayedValue, Math.abs(i / this.animationSpeed) <= .001 ? this.displayedValue = this.value : this.displayedValue = this.displayedValue + i / this.animationSpeed, this.render(), 0))
    }, t(v, h = f), v.prototype.displayScale = 1, v.prototype.forceUpdate = !0, v.prototype.setTextField = function(t, i) {
      return this.textField = t instanceof a ? t : new a(t, i)
    }, v.prototype.setMinValue = function(t, i) {
      var e, s, n, o, a;
      if (this.minValue = t, null == i && (i = !0), i) {
        for (this.displayedValue = this.minValue, a = [], s = 0, n = (o = this.gp || []).length; s < n; s++) e = o[s], a.push(e.displayedValue = this.minValue);
        return a
      }
    }, v.prototype.setOptions = function(t) {
      return null == t && (t = null), this.options = c(this.options, t), this.textField && (this.textField.el.style.fontSize = t.fontSize + "px"), .5 < this.options.angle && (this.options.angle = .5), this.configDisplayScale(), this
    }, v.prototype.configDisplayScale = function() {
      var t, i, e, s, n;
      return s = this.displayScale, !1 === this.options.highDpiSupport ? delete this.displayScale : (i = window.devicePixelRatio || 1, t = this.ctx.webkitBackingStorePixelRatio || this.ctx.mozBackingStorePixelRatio || this.ctx.msBackingStorePixelRatio || this.ctx.oBackingStorePixelRatio || this.ctx.backingStorePixelRatio || 1, this.displayScale = i / t), this.displayScale !== s && (n = this.canvas.G__width || this.canvas.width, e = this.canvas.G__height || this.canvas.height, this.canvas.width = n * this.displayScale, this.canvas.height = e * this.displayScale, this.canvas.style.width = n + "px", this.canvas.style.height = e + "px", this.canvas.G__width = n, this.canvas.G__height = e), this
    }, v.prototype.parseValue = function(t) {
      return t = parseFloat(t) || Number(t), isFinite(t) ? t : 0
    }, s = v, y.prototype.render = function(t) {
      return this.el.innerHTML = g(t.displayedValue, this.fractionDigits)
    }, a = y, t(V, h), V.prototype.displayedValue = 0, V.prototype.value = 0, V.prototype.setVal = function(t) {
      return this.value = 1 * t
    }, V.prototype.render = function() {
      var t;
      return t = this.text ? u(this.displayedValue.toFixed(0)) : r(g(this.displayedValue)), this.elem.innerHTML = t
    }, i = V, t(w, h), w.prototype.displayedValue = 0, w.prototype.value = 0, w.prototype.options = {
      strokeWidth: .035,
      length: .1,
      color: "#000000",
      iconPath: null,
      iconScale: 1,
      iconAngle: 0
    }, w.prototype.img = null, w.prototype.setOptions = function(t) {
      if (null == t && (t = null), this.options = c(this.options, t), this.length = 2 * this.gauge.radius * this.gauge.options.radiusScale * this.options.length, this.strokeWidth = this.canvas.height * this.options.strokeWidth, this.maxValue = this.gauge.maxValue, this.minValue = this.gauge.minValue, this.animationSpeed = this.gauge.animationSpeed, this.options.angle = this.gauge.options.angle, this.options.iconPath) return this.img = new Image, this.img.src = this.options.iconPath
    }, w.prototype.render = function() {
      var t, i, e, s, n, o, a, h, r;
      if (t = this.gauge.getAngle.call(this, this.displayedValue), h = Math.round(this.length * Math.cos(t)), r = Math.round(this.length * Math.sin(t)), o = Math.round(this.strokeWidth * Math.cos(t - Math.PI / 2)), a = Math.round(this.strokeWidth * Math.sin(t - Math.PI / 2)), i = Math.round(this.strokeWidth * Math.cos(t + Math.PI / 2)), e = Math.round(this.strokeWidth * Math.sin(t + Math.PI / 2)), this.ctx.beginPath(), this.ctx.fillStyle = this.options.color, this.ctx.arc(0, 0, this.strokeWidth, 0, 2 * Math.PI, !1), this.ctx.fill(), this.ctx.beginPath(), this.ctx.moveTo(o, a), this.ctx.lineTo(h, r), this.ctx.lineTo(i, e), this.ctx.fill(), this.img) return s = Math.round(this.img.width * this.options.iconScale), n = Math.round(this.img.height * this.options.iconScale), this.ctx.save(), this.ctx.translate(h, r), this.ctx.rotate(t + Math.PI / 180 * (90 + this.options.iconAngle)), this.ctx.drawImage(this.img, -s / 2, -n / 2, s, n), this.ctx.restore()
    }, p = w, S.prototype.updateValues = function(t) {
      return this.value = t[0], this.maxValue = t[1], this.avgValue = t[2], this.render()
    }, S.prototype.render = function() {
      var t, i;
      return this.textField && this.textField.text(g(this.value)), 0 === this.maxValue && (this.maxValue = 2 * this.avgValue), i = this.value / this.maxValue * 100, t = this.avgValue / this.maxValue * 100, $(".bar-value", this.elem).css({
        width: i + "%"
      }), $(".typical-value", this.elem).css({
        width: t + "%"
      })
    }, t(M, s), M.prototype.elem = null, M.prototype.value = [20], M.prototype.maxValue = 80, M.prototype.minValue = 0, M.prototype.displayedAngle = 0, M.prototype.displayedValue = 0, M.prototype.lineWidth = 40, M.prototype.paddingTop = .1, M.prototype.paddingBottom = .1, M.prototype.percentColors = null, M.prototype.options = {
      colorStart: "#6fadcf",
      colorStop: void 0,
      gradientType: 0,
      strokeColor: "#e0e0e0",
      pointer: {
        length: .8,
        strokeWidth: .035,
        iconScale: 1
      },
      angle: .15,
      lineWidth: .44,
      radiusScale: 1,
      fontSize: 40,
      limitMax: !1,
      limitMin: !1
    }, M.prototype.setOptions = function(t) {
      var i, e, s, n, o;
      for (null == t && (t = null), M.__super__.setOptions.call(this, t), this.configPercentColors(), this.extraPadding = 0, this.options.angle < 0 && (n = Math.PI * (1 + this.options.angle), this.extraPadding = Math.sin(n)), this.availableHeight = this.canvas.height * (1 - this.paddingTop - this.paddingBottom), this.lineWidth = this.availableHeight * this.options.lineWidth, this.radius = (this.availableHeight - this.lineWidth / 2) / (1 + this.extraPadding), this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height), e = 0, s = (o = this.gp).length; e < s; e++)(i = o[e]).setOptions(this.options.pointer), i.render();
      return this.render(), this
    }, M.prototype.configPercentColors = function() {
      var t, i, e, s, n, o, a;
      if (this.percentColors = null, void 0 !== this.options.percentColors) {
        for (this.percentColors = new Array, o = [], e = s = 0, n = this.options.percentColors.length - 1; 0 <= n ? s <= n : n <= s; e = 0 <= n ? ++s : --s) a = parseInt(l(this.options.percentColors[e][1]).substring(0, 2), 16), i = parseInt(l(this.options.percentColors[e][1]).substring(2, 4), 16), t = parseInt(l(this.options.percentColors[e][1]).substring(4, 6), 16), o.push(this.percentColors[e] = {
          pct: this.options.percentColors[e][0],
          color: {
            r: a,
            g: i,
            b: t
          }
        });
        return o
      }
    }, M.prototype.set = function(t) {
      var i, e, s, n, o, a, h, r, l;
      for (t instanceof Array || (t = [t]), e = s = 0, h = t.length - 1; 0 <= h ? s <= h : h <= s; e = 0 <= h ? ++s : --s) t[e] = this.parseValue(t[e]);
      if (t.length > this.gp.length)
        for (e = n = 0, r = t.length - this.gp.length; 0 <= r ? n < r : r < n; e = 0 <= r ? ++n : --n)(i = new p(this)).setOptions(this.options.pointer), this.gp.push(i);
      else t.length < this.gp.length && (this.gp = this.gp.slice(this.gp.length - t.length));
      for (a = e = 0, o = t.length; a < o; a++)(l = t[a]) > this.maxValue ? this.options.limitMax ? l = this.maxValue : this.maxValue = l + 1 : l < this.minValue && (this.options.limitMin ? l = this.minValue : this.minValue = l - 1), this.gp[e].value = l, this.gp[e++].setOptions({
        minValue: this.minValue,
        maxValue: this.maxValue,
        angle: this.options.angle
      });
      return this.value = Math.max(Math.min(t[t.length - 1], this.maxValue), this.minValue), AnimationUpdater.add(this), AnimationUpdater.run(this.forceUpdate), this.forceUpdate = !1
    }, M.prototype.getAngle = function(t) {
      return (1 + this.options.angle) * Math.PI + (t - this.minValue) / (this.maxValue - this.minValue) * (1 - 2 * this.options.angle) * Math.PI
    }, M.prototype.getColorForPercentage = function(t, i) {
      var e, s, n, o, a, h, r;
      if (0 === t) e = this.percentColors[0].color;
      else
        for (e = this.percentColors[this.percentColors.length - 1].color, n = o = 0, h = this.percentColors.length - 1; 0 <= h ? o <= h : h <= o; n = 0 <= h ? ++o : --o)
          if (t <= this.percentColors[n].pct) {
            e = !0 === i ? (r = this.percentColors[n - 1] || this.percentColors[0], s = this.percentColors[n], a = (t - r.pct) / (s.pct - r.pct), {
              r: Math.floor(r.color.r * (1 - a) + s.color.r * a),
              g: Math.floor(r.color.g * (1 - a) + s.color.g * a),
              b: Math.floor(r.color.b * (1 - a) + s.color.b * a)
            }) : this.percentColors[n].color;
            break
          } return "rgb(" + [e.r, e.g, e.b].join(",") + ")"
    }, M.prototype.getColorForValue = function(t, i) {
      var e;
      return e = (t - this.minValue) / (this.maxValue - this.minValue), this.getColorForPercentage(e, i)
    }, M.prototype.renderStaticLabels = function(t, i, e, s) {
      var n, o, a, h, r, l, p, c, u, d;
      for (this.ctx.save(), this.ctx.translate(i, e), l = /\d+\.?\d?/, r = (n = t.font || "10px Times").match(l)[0], c = n.slice(r.length), o = parseFloat(r) * this.displayScale, this.ctx.font = o + c, this.ctx.fillStyle = t.color || "#000000", this.ctx.textBaseline = "bottom", this.ctx.textAlign = "center", a = 0, h = (p = t.labels).length; a < h; a++) void 0 !== (d = p[a]).label ? (!this.options.limitMin || d >= this.minValue) && (!this.options.limitMax || d <= this.maxValue) && (r = (n = d.font || t.font).match(l)[0], c = n.slice(r.length), o = parseFloat(r) * this.displayScale, this.ctx.font = o + c, u = this.getAngle(d.label) - 3 * Math.PI / 2, this.ctx.rotate(u), this.ctx.fillText(g(d.label, t.fractionDigits), 0, -s - this.lineWidth / 2), this.ctx.rotate(-u)) : (!this.options.limitMin || d >= this.minValue) && (!this.options.limitMax || d <= this.maxValue) && (u = this.getAngle(d) - 3 * Math.PI / 2, this.ctx.rotate(u), this.ctx.fillText(g(d, t.fractionDigits), 0, -s - this.lineWidth / 2), this.ctx.rotate(-u));
      return this.ctx.restore()
    }, M.prototype.renderTicks = function(t, i, e, s) {
      var n, o, a, h, r, l, p, c, u, d, g, m, x, f, v, y, V, w, S, M;
      if (t !== {}) {
        for (l = t.divisions || 0, w = t.subDivisions || 0, a = t.divColor || "#fff", f = t.subColor || "#fff", h = t.divLength || .7, y = t.subLength || .2, u = parseFloat(this.maxValue) - parseFloat(this.minValue), d = parseFloat(u) / parseFloat(t.divisions), v = parseFloat(d) / parseFloat(t.subDivisions), n = parseFloat(this.minValue), o = 0 + v, r = (c = u / 400) * (t.divWidth || 1), V = c * (t.subWidth || 1), m = [], S = p = 0, g = l + 1; p < g; S = p += 1) this.ctx.lineWidth = this.lineWidth * h, x = this.lineWidth / 2 * (1 - h), M = this.radius * this.options.radiusScale + x, this.ctx.strokeStyle = a, this.ctx.beginPath(), this.ctx.arc(0, 0, M, this.getAngle(n - r), this.getAngle(n + r), !1), this.ctx.stroke(), o = n + v, n += d, S !== t.divisions && 0 < w ? m.push(function() {
          var t, i, e;
          for (e = [], t = 0, i = w - 1; t < i; t += 1) this.ctx.lineWidth = this.lineWidth * y, x = this.lineWidth / 2 * (1 - y), M = this.radius * this.options.radiusScale + x, this.ctx.strokeStyle = f, this.ctx.beginPath(), this.ctx.arc(0, 0, M, this.getAngle(o - V), this.getAngle(o + V), !1), this.ctx.stroke(), e.push(o += v);
          return e
        }.call(this)) : m.push(void 0);
        return m
      }
    }, M.prototype.render = function() {
      var t, i, e, s, n, o, a, h, r, l, p, c, u, d, g, m;
      if (g = this.canvas.width / 2, e = this.canvas.height * this.paddingTop + this.availableHeight - (this.radius + this.lineWidth / 2) * this.extraPadding, t = this.getAngle(this.displayedValue), this.textField && this.textField.render(this), this.ctx.lineCap = "butt", l = this.radius * this.options.radiusScale, this.options.staticLabels && this.renderStaticLabels(this.options.staticLabels, g, e, l), this.options.staticZones)
        for (this.ctx.save(), this.ctx.translate(g, e), this.ctx.lineWidth = this.lineWidth, s = 0, o = (p = this.options.staticZones).length; s < o; s++) r = (m = p[s]).min, this.options.limitMin && r < this.minValue && (r = this.minValue), h = m.max, this.options.limitMax && h > this.maxValue && (h = this.maxValue), d = this.radius * this.options.radiusScale, m.height && (this.ctx.lineWidth = this.lineWidth * m.height, u = this.lineWidth / 2 * (m.offset || 1 - m.height), d = this.radius * this.options.radiusScale + u), this.ctx.strokeStyle = m.strokeStyle, this.ctx.beginPath(), this.ctx.arc(0, 0, d, this.getAngle(r), this.getAngle(h), !1), this.ctx.stroke();
      else void 0 !== this.options.customFillStyle ? i = this.options.customFillStyle(this) : null !== this.percentColors ? i = this.getColorForValue(this.displayedValue, this.options.generateGradient) : void 0 !== this.options.colorStop ? ((i = 0 === this.options.gradientType ? this.ctx.createRadialGradient(g, e, 9, g, e, 70) : this.ctx.createLinearGradient(0, 0, g, 0)).addColorStop(0, this.options.colorStart), i.addColorStop(1, this.options.colorStop)) : i = this.options.colorStart, this.ctx.strokeStyle = i, this.ctx.beginPath(), this.ctx.arc(g, e, l, (1 + this.options.angle) * Math.PI, t, !1), this.ctx.lineWidth = this.lineWidth, this.ctx.stroke(), this.ctx.strokeStyle = this.options.strokeColor, this.ctx.beginPath(), this.ctx.arc(g, e, l, t, (2 - this.options.angle) * Math.PI, !1), this.ctx.stroke(), this.ctx.save(), this.ctx.translate(g, e);
      for (this.options.renderTicks && this.renderTicks(this.options.renderTicks, g, e, l), this.ctx.restore(), this.ctx.translate(g, e), n = 0, a = (c = this.gp).length; n < a; n++) c[n].update(!0);
      return this.ctx.translate(-g, -e)
    }, o = M, t(C, s), C.prototype.lineWidth = 15, C.prototype.displayedValue = 0, C.prototype.value = 33, C.prototype.maxValue = 80, C.prototype.minValue = 0, C.prototype.options = {
      lineWidth: .1,
      colorStart: "#6f6ea0",
      colorStop: "#c0c0db",
      strokeColor: "#eeeeee",
      shadowColor: "#d5d5d5",
      angle: .35,
      radiusScale: 1
    }, C.prototype.getAngle = function(t) {
      return (1 - this.options.angle) * Math.PI + (t - this.minValue) / (this.maxValue - this.minValue) * (2 + this.options.angle - (1 - this.options.angle)) * Math.PI
    }, C.prototype.setOptions = function(t) {
      return null == t && (t = null), C.__super__.setOptions.call(this, t), this.lineWidth = this.canvas.height * this.options.lineWidth, this.radius = this.options.radiusScale * (this.canvas.height / 2 - this.lineWidth / 2), this
    }, C.prototype.set = function(t) {
      return this.value = this.parseValue(t), this.value > this.maxValue ? this.options.limitMax ? this.value = this.maxValue : this.maxValue = this.value : this.value < this.minValue && (this.options.limitMin ? this.value = this.minValue : this.minValue = this.value), AnimationUpdater.add(this), AnimationUpdater.run(this.forceUpdate), this.forceUpdate = !1
    }, C.prototype.render = function() {
      var t, i, e, s;
      return t = this.getAngle(this.displayedValue), s = this.canvas.width / 2, e = this.canvas.height / 2, this.textField && this.textField.render(this), (i = this.ctx.createRadialGradient(s, e, 39, s, e, 70)).addColorStop(0, this.options.colorStart), i.addColorStop(1, this.options.colorStop), this.radius, this.lineWidth, this.radius, this.lineWidth, this.ctx.strokeStyle = this.options.strokeColor, this.ctx.beginPath(), this.ctx.arc(s, e, this.radius, (1 - this.options.angle) * Math.PI, (2 + this.options.angle) * Math.PI, !1), this.ctx.lineWidth = this.lineWidth, this.ctx.lineCap = "round", this.ctx.stroke(), this.ctx.strokeStyle = i, this.ctx.beginPath(), this.ctx.arc(s, e, this.radius, (1 - this.options.angle) * Math.PI, t, !1), this.ctx.stroke()
    }, t(_, e = C), _.prototype.strokeGradient = function(t, i, e, s) {
      var n;
      return (n = this.ctx.createRadialGradient(t, i, e, t, i, s)).addColorStop(0, this.options.shadowColor), n.addColorStop(.12, this.options._orgStrokeColor), n.addColorStop(.88, this.options._orgStrokeColor), n.addColorStop(1, this.options.shadowColor), n
    }, _.prototype.setOptions = function(t) {
      var i, e, s, n;
      return null == t && (t = null), _.__super__.setOptions.call(this, t), n = this.canvas.width / 2, i = this.canvas.height / 2, e = this.radius - this.lineWidth / 2, s = this.radius + this.lineWidth / 2, this.options._orgStrokeColor = this.options.strokeColor, this.options.strokeColor = this.strokeGradient(n, i, e, s), this
    }, n = _, window.AnimationUpdater = {
      elements: [],
      animId: null,
      addAll: function(t) {
        var i, e, s, n;
        for (n = [], e = 0, s = t.length; e < s; e++) i = t[e], n.push(AnimationUpdater.elements.push(i));
        return n
      },
      add: function(t) {
        if (x.call(AnimationUpdater.elements, t) < 0) return AnimationUpdater.elements.push(t)
      },
      run: function(t) {
        var i, e, s, n, o, a, h;
        if (null == t && (t = !1), isFinite(parseFloat(t)) || !0 === t) {
          for (i = !0, h = [], s = e = 0, o = (a = AnimationUpdater.elements).length; e < o; s = ++e) a[s].update(!0 === t) ? i = !1 : h.push(s);
          for (n = h.length - 1; 0 <= n; n += -1) s = h[n], AnimationUpdater.elements.splice(s, 1);
          return AnimationUpdater.animId = i ? null : requestAnimationFrame(AnimationUpdater.run)
        }
        if (!1 === t) return !0 === AnimationUpdater.animId && cancelAnimationFrame(AnimationUpdater.animId), AnimationUpdater.animId = requestAnimationFrame(AnimationUpdater.run)
      }
    }, "function" == typeof window.define && null != window.define.amd ? define(function() {
      return {
        Gauge: o,
        Donut: n,
        BaseDonut: e,
        TextRenderer: a
      }
    }) : "undefined" != typeof module && null != module.exports ? module.exports = {
      Gauge: o,
      Donut: n,
      BaseDonut: e,
      TextRenderer: a
    } : (window.Gauge = o, window.Donut = n, window.BaseDonut = e, window.TextRenderer = a)
  }).call(this);