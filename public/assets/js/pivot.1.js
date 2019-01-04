(function() {
    var t, e = [].indexOf || function(t) {
            for (var e = 0, n = this.length; e < n; e++)
                if (e in this && this[e] === t) return e;
            return -1
        },
        n = [].slice,
        r = function(t, e) {
            return function() {
                return t.apply(e, arguments)
            }
        },
        a = {}.hasOwnProperty;
    (t = function(t) {
        return "object" == typeof exports && "object" == typeof module ? t(require("jquery")) : "function" == typeof define && define.amd ? define(["jquery"], t) : t(jQuery)
    })(function(t) {
        var o, i, l, s, u, c, h, d, p, f, m, g, v, b, C, y, w, A, x, S, N;
        return i = function(t, e, n) {
            var r, a, o, i;
            for (t += "", a = t.split("."), o = a[0], i = a.length > 1 ? n + a[1] : "", r = /(\d+)(\d{3})/; r.test(o);) o = o.replace(r, "$1" + e + "$2");
            return o + i
        }, m = function(e) {
            var n;
            return n = {
                    digitsAfterDecimal: 2,
                    scaler: 1,
                    thousandsSep: ",",
                    decimalSep: ".",
                    prefix: "",
                    suffix: ""
                }, e = t.extend({}, n, e),
                function(t) {
                    var n;
                    return isNaN(t) || !isFinite(t) ? "" : (n = i((e.scaler * t).toFixed(e.digitsAfterDecimal), e.thousandsSep, e.decimalSep), "" + e.prefix + n + e.suffix)
                }
        }, A = m(), x = m({
            digitsAfterDecimal: 0
        }), S = m({
            digitsAfterDecimal: 1,
            scaler: 100,
            suffix: "%"
        }), l = {
            count: function(t) {
                return null == t && (t = x),
                    function() {
                        return function(e, n, r) {
                            return {
                                count: 0,
                                push: function() {
                                    return this.count++
                                },
                                value: function() {
                                    return this.count
                                },
                                format: t
                            }
                        }
                    }
            },
            uniques: function(t, n) {
                return null == n && (n = x),
                    function(r) {
                        var a;
                        return a = r[0],
                            function(r, o, i) {
                                return {
                                    uniq: [],
                                    push: function(t) {
                                        var n;
                                        if (n = t[a], e.call(this.uniq, n) < 0) return this.uniq.push(t[a])
                                    },
                                    value: function() {
                                        return t(this.uniq)
                                    },
                                    format: n,
                                    numInputs: null != a ? 0 : 1
                                }
                            }
                    }
            },
            sum: function(t) {
                return null == t && (t = A),
                    function(e) {
                        var n;
                        return n = e[0],
                            function(e, r, a) {
                                return {
                                    sum: 0,
                                    push: function(t) {
                                        if (!isNaN(parseFloat(t[n]))) return this.sum += parseFloat(t[n])
                                    },
                                    value: function() {
                                        return this.sum;
                                    },
                                    format: t,
                                    numInputs: null != n ? 0 : 1
                                }
                            }
                    }
            },
            resta: function(t) {
                return null == t && (t = A),
                    function(e) {
                        var n;
                        return n = e[0],
                            function(e, r, a) {
                                return {
                                    sumSuccesses: 0,
                                    sumTrials: 0,
                                    push: function(t) {
                                        if (!isNaN(parseFloat(t.cantidad))) {
                                            this.sumSuccesses += parseFloat(t.cantidad)*parseFloat(t.valor);
                                          }
                                          if (!isNaN(parseFloat(t[n]))) {
                                            return this.sumTrials += parseFloat(t.valor);
                                          }
                                    },
                                    value: function() { 
                                        return '$ '+this.sumSuccesses; 
                                    },
                                    format: function(x) { return x; },
                                    numInputs: null != n ? 0 : 1
                                }
                            }
                    }
            },
            extremes: function(t, e) {
                return null == e && (e = A),
                    function(n) {
                        var r;
                        return r = n[0],
                            function(n, a, o) {
                                return {
                                    val: null,
                                    sorter: h(null != n ? n.sorters : void 0, r),
                                    push: function(e) {
                                        var n, a, o, i;
                                        if (i = e[r], "min" !== t && "max" !== t || (i = parseFloat(i), isNaN(i) || (this.val = Math[t](i, null != (n = this.val) ? n : i))), "first" === t && this.sorter(i, null != (a = this.val) ? a : i) <= 0 && (this.val = i), "last" === t && this.sorter(i, null != (o = this.val) ? o : i) >= 0) return this.val = i
                                    },
                                    value: function() {
                                        return this.val
                                    },
                                    format: function(t) {
                                        return isNaN(t) ? t : e(t)
                                    },
                                    numInputs: null != r ? 0 : 1
                                }
                            }
                    }
            },
            quantile: function(t, e) {
                return null == e && (e = A),
                    function(n) {
                        var r;
                        return r = n[0],
                            function(n, a, o) {
                                return {
                                    vals: [],
                                    push: function(t) {
                                        var e;
                                        if (e = parseFloat(t[r]), !isNaN(e)) return this.vals.push(e)
                                    },
                                    value: function() {
                                        var e;
                                        return 0 === this.vals.length ? null : (this.vals.sort(function(t, e) {
                                            return t - e
                                        }), e = (this.vals.length - 1) * t, (this.vals[Math.floor(e)] + this.vals[Math.ceil(e)]) / 2)
                                    },
                                    format: e,
                                    numInputs: null != r ? 0 : 1
                                }
                            }
                    }
            },
            runningStat: function(t, e, n) {
                return null == t && (t = "mean"), null == e && (e = 1), null == n && (n = A),
                    function(r) {
                        var a;
                        return a = r[0],
                            function(r, o, i) {
                                return {
                                    n: 0,
                                    m: 0,
                                    s: 0,
                                    push: function(t) {
                                        var e, n;
                                        if (n = parseFloat(t[a]), !isNaN(n)) return this.n += 1, 1 === this.n ? this.m = n : (e = this.m + (n - this.m) / this.n, this.s = this.s + (n - this.m) * (n - e), this.m = e)
                                    },
                                    value: function() {
                                        if ("mean" === t) return 0 === this.n ? NaN : this.m;
                                        if (this.n <= e) return 0;
                                        switch (t) {
                                            case "var":
                                                return this.s / (this.n - e);
                                            case "stdev":
                                                return Math.sqrt(this.s / (this.n - e))
                                        }
                                    },
                                    format: n,
                                    numInputs: null != a ? 0 : 1
                                }
                            }
                    }
            },
            sumOverSum: function(t) {
                return null == t && (t = A),
                    function(e) {
                        var n, r;
                        return r = e[0], n = e[1],
                            function(e, a, o) {
                                return {
                                    sumNum: 0,
                                    sumDenom: 0,
                                    push: function(t) {
                                        if (isNaN(parseFloat(t[r])) || (this.sumNum += parseFloat(t[r])), !isNaN(parseFloat(t[n]))) return this.sumDenom += parseFloat(t[n])
                                    },
                                    value: function() {
                                        return this.sumNum / this.sumDenom
                                    },
                                    format: t,
                                    numInputs: null != r && null != n ? 0 : 2
                                }
                            }
                    }
            },
            sumOverSumBound80: function(t, e) {
                return null == t && (t = !0), null == e && (e = A),
                    function(n) {
                        var r, a;
                        return a = n[0], r = n[1],
                            function(n, o, i) {
                                return {
                                    sumNum: 0,
                                    sumDenom: 0,
                                    push: function(t) {
                                        if (isNaN(parseFloat(t[a])) || (this.sumNum += parseFloat(t[a])), !isNaN(parseFloat(t[r]))) return this.sumDenom += parseFloat(t[r])
                                    },
                                    value: function() {
                                        var e;
                                        return e = t ? 1 : -1, (.821187207574908 / this.sumDenom + this.sumNum / this.sumDenom + 1.2815515655446004 * e * Math.sqrt(.410593603787454 / (this.sumDenom * this.sumDenom) + this.sumNum * (1 - this.sumNum / this.sumDenom) / (this.sumDenom * this.sumDenom))) / (1 + 1.642374415149816 / this.sumDenom)
                                    },
                                    format: e,
                                    numInputs: null != a && null != r ? 0 : 2
                                }
                            }
                    }
            },
            fractionOf: function(t, e, r) {
                return null == e && (e = "total"), null == r && (r = S),
                    function() {
                        var a;
                        return a = 1 <= arguments.length ? n.call(arguments, 0) : [],
                            function(n, o, i) {
                                return {
                                    selector: {
                                        total: [
                                            [],
                                            []
                                        ],
                                        row: [o, []],
                                        col: [
                                            [], i
                                        ]
                                    }[e],
                                    inner: t.apply(null, a)(n, o, i),
                                    push: function(t) {
                                        return this.inner.push(t)
                                    },
                                    format: r,
                                    value: function() {
                                        return this.inner.value() / n.getAggregator.apply(n, this.selector).inner.value()
                                    },
                                    numInputs: t.apply(null, a)().numInputs
                                }
                            }
                    }
            }
        }, l.countUnique = function(t) {
            return l.uniques(function(t) {
                return t.length
            }, t)
        }, l.listUnique = function(t) {
            return l.uniques(function(e) {
                return e.sort(f).join(t)
            }, function(t) {
                return t
            })
        }, l.max = function(t) {
            return l.extremes("max", t)
        }, l.min = function(t) {
            return l.extremes("min", t)
        }, l.first = function(t) {
            return l.extremes("first", t)
        }, l.last = function(t) {
            return l.extremes("last", t)
        }, l.median = function(t) {
            return l.quantile(.5, t)
        }, l.average = function(t) {
            return l.runningStat("mean", 1, t)
        }, l["var"] = function(t, e) {
            return l.runningStat("var", t, e)
        }, l.stdev = function(t, e) {
            return l.runningStat("stdev", t, e)
        }, s = function(t) {
            return {
                Contar: t.count(x),
                "Contar valores unicos": t.countUnique(x),
                "Listar valores unicos": t.listUnique(", "),
                Sumar: t.sum(A),
                Resta: t.resta(A),
                "Suma Entera": t.sum(x),
                Promedio: t.average(A),
                Mediana: t.median(A),
                "Varianza muestra": t["var"](1, A),
                "Desviación estándar muestra": t.stdev(1, A),
                Minimo: t.min(A),
                Maximo: t.max(A),
                Primero: t.first(A),
                Ultimo: t.last(A),
                "Suma sobre Suma": t.sumOverSum(A),
                "80% Upper Bound": t.sumOverSumBound80(!0, A),
                "80% Lower Bound": t.sumOverSumBound80(!1, A),
                "Sum as Fraction of Total": t.fractionOf(t.sum(), "total", S),
                "Sum as Fraction of Rows": t.fractionOf(t.sum(), "row", S),
                "Sum as Fraction of Columns": t.fractionOf(t.sum(), "col", S),
                "Count as Fraction of Total": t.fractionOf(t.count(), "total", S),
                "Count as Fraction of Rows": t.fractionOf(t.count(), "row", S),
                "Count as Fraction of Columns": t.fractionOf(t.count(), "col", S)
            }
        }(l), b = {
            Tabla: function(t, e) {
                return g(t, e)
            },
            "Tabla Grafico barras": function(e, n) {
                return t(g(e, n)).barchart()
            },
            Heatmap: function(e, n) {
                return t(g(e, n)).heatmap("heatmap", n)
            },
            "Row Heatmap": function(e, n) {
                return t(g(e, n)).heatmap("rowheatmap", n)
            },
            "Col Heatmap": function(e, n) {
                return t(g(e, n)).heatmap("colheatmap", n)
            }
        }, d = {
            en: {
                aggregators: s,
                renderers: b,
                localeStrings: {
                    renderError: "An error occurred rendering the PivotTable results.",
                    computeError: "An error occurred computing the PivotTable results.",
                    uiRenderError: "An error occurred rendering the PivotTable UI.",
                    selectAll: "Seleccionar Todo",
                    selectNone: "Seleccionar Ninguno",
                    tooMany: "(too many to list)",
                    filterResults: "Filter values",
                    apply: "Aplicar",
                    cancel: "Cancelar",
                    totals: "Totales",
                    vs: "vs",
                    by: "by"
                }
            }
        }, p = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"], u = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"], N = function(t) {
            return ("0" + t).substr(-2, 2)
        }, c = {
            bin: function(t, e) {
                return function(n) {
                    return n[t] - n[t] % e
                }
            },
            dateFormat: function(t, e, n, r, a) {
                var o;
                return null == n && (n = !1), null == r && (r = p), null == a && (a = u), o = n ? "UTC" : "",
                    function(n) {
                        var i;
                        return i = new Date(Date.parse(n[t])), isNaN(i) ? "" : e.replace(/%(.)/g, function(t, e) {
                            switch (e) {
                                case "y":
                                    return i["get" + o + "FullYear"]();
                                case "m":
                                    return N(i["get" + o + "Month"]() + 1);
                                case "n":
                                    return r[i["get" + o + "Month"]()];
                                case "d":
                                    return N(i["get" + o + "Date"]());
                                case "w":
                                    return a[i["get" + o + "Day"]()];
                                case "x":
                                    return i["get" + o + "Day"]();
                                case "H":
                                    return N(i["get" + o + "Hours"]());
                                case "M":
                                    return N(i["get" + o + "Minutes"]());
                                case "S":
                                    return N(i["get" + o + "Seconds"]());
                                default:
                                    return "%" + e
                            }
                        })
                    }
            }
        }, C = /(\d+)|(\D+)/g, v = /\d/, y = /^0/, f = function(t) {
            return function(t, e) {
                var n, r, a, o, i, l;
                if (null != e && null == t) return -1;
                if (null != t && null == e) return 1;
                if ("number" == typeof t && isNaN(t)) return -1;
                if ("number" == typeof e && isNaN(e)) return 1;
                if (i = +t, l = +e, i < l) return -1;
                if (i > l) return 1;
                if ("number" == typeof t && "number" != typeof e) return -1;
                if ("number" == typeof e && "number" != typeof t) return 1;
                if ("number" == typeof t && "number" == typeof e) return 0;
                if (isNaN(l) && !isNaN(i)) return -1;
                if (isNaN(i) && !isNaN(l)) return 1;
                if (n = String(t), a = String(e), n === a) return 0;
                if (!v.test(n) || !v.test(a)) return n > a ? 1 : -1;
                for (n = n.match(C), a = a.match(C); n.length && a.length;)
                    if (r = n.shift(), o = a.shift(), r !== o) return v.test(r) && v.test(o) ? r.replace(y, ".0") - o.replace(y, ".0") : r > o ? 1 : -1;
                return n.length - a.length
            }
        }(this), w = function(t) {
            var e, n, r, a;
            r = {}, n = {};
            for (e in t) a = t[e], r[a] = e, "string" == typeof a && (n[a.toLowerCase()] = e);
            return function(t, e) {
                return null != r[t] && null != r[e] ? r[t] - r[e] : null != r[t] ? -1 : null != r[e] ? 1 : null != n[t] && null != n[e] ? n[t] - n[e] : null != n[t] ? -1 : null != n[e] ? 1 : f(t, e)
            }
        }, h = function(e, n) {
            var r;
            if (null != e)
                if (t.isFunction(e)) {
                    if (r = e(n), t.isFunction(r)) return r
                } else if (null != e[n]) return e[n];
            return f
        }, o = function() {
            function e(t, n) {
                var a, o, i, s, u, c, h, d, p, f;
                null == n && (n = {}), this.getAggregator = r(this.getAggregator, this), this.getRowKeys = r(this.getRowKeys, this), this.getColKeys = r(this.getColKeys, this), this.sortKeys = r(this.sortKeys, this), this.arrSort = r(this.arrSort, this), this.input = t, this.aggregator = null != (a = n.aggregator) ? a : l.count()(), this.aggregatorName = null != (o = n.aggregatorName) ? o : "Count", this.colAttrs = null != (i = n.cols) ? i : [], this.rowAttrs = null != (s = n.rows) ? s : [], this.valAttrs = null != (u = n.vals) ? u : [], this.sorters = null != (c = n.sorters) ? c : {}, this.rowOrder = null != (h = n.rowOrder) ? h : "key_a_to_z", this.colOrder = null != (d = n.colOrder) ? d : "key_a_to_z", this.derivedAttributes = null != (p = n.derivedAttributes) ? p : {}, this.filter = null != (f = n.filter) ? f : function() {
                    return !0
                }, this.tree = {}, this.rowKeys = [], this.colKeys = [], this.rowTotals = {}, this.colTotals = {}, this.allTotal = this.aggregator(this, [], []), this.sorted = !1, e.forEachRecord(this.input, this.derivedAttributes, function(t) {
                    return function(e) {
                        if (t.filter(e)) return t.processRecord(e)
                    }
                }(this))
            }
            return e.forEachRecord = function(e, n, r) {
                var o, i, l, s, u, c, h, d, p, f, m, g;
                if (o = t.isEmptyObject(n) ? r : function(t) {
                        var e, a, o;
                        for (e in n) o = n[e], t[e] = null != (a = o(t)) ? a : t[e];
                        return r(t)
                    }, t.isFunction(e)) return e(o);
                if (t.isArray(e)) {
                    if (t.isArray(e[0])) {
                        f = [];
                        for (l in e)
                            if (a.call(e, l) && (i = e[l], l > 0)) {
                                d = {}, p = e[0];
                                for (s in p) a.call(p, s) && (u = p[s], d[u] = i[s]);
                                f.push(o(d))
                            }
                        return f
                    }
                    for (m = [], c = 0, h = e.length; c < h; c++) d = e[c], m.push(o(d));
                    return m
                }
                if (e instanceof t) return g = [], t("thead > tr > th", e).each(function(e) {
                    return g.push(t(this).text())
                }), t("tbody > tr", e).each(function(e) {
                    return d = {}, t("td", this).each(function(e) {
                        return d[g[e]] = t(this).text()
                    }), o(d)
                });
                throw new Error("unknown input format")
            }, e.prototype.forEachMatchingRecord = function(t, n) {
                return e.forEachRecord(this.input, this.derivedAttributes, function(e) {
                    return function(r) {
                        var a, o, i;
                        if (e.filter(r)) {
                            for (a in t)
                                if (i = t[a], i !== (null != (o = r[a]) ? o : "null")) return;
                            return n(r)
                        }
                    }
                }(this))
            }, e.prototype.arrSort = function(t) {
                var e, n;
                return n = function() {
                        var n, r, a;
                        for (a = [], n = 0, r = t.length; n < r; n++) e = t[n], a.push(h(this.sorters, e));
                        return a
                    }.call(this),
                    function(t, e) {
                        var r, o, i;
                        for (o in n)
                            if (a.call(n, o) && (i = n[o], r = i(t[o], e[o]), 0 !== r)) return r;
                        return 0
                    }
            }, e.prototype.sortKeys = function() {
                var t;
                if (!this.sorted) {
                    switch (this.sorted = !0, t = function(t) {
                        return function(e, n) {
                            return t.getAggregator(e, n).value()
                        }
                    }(this), this.rowOrder) {
                        case "value_a_to_z":
                            this.rowKeys.sort(function(e) {
                                return function(e, n) {
                                    return f(t(e, []), t(n, []))
                                }
                            }(this));
                            break;
                        case "value_z_to_a":
                            this.rowKeys.sort(function(e) {
                                return function(e, n) {
                                    return -f(t(e, []), t(n, []))
                                }
                            }(this));
                            break;
                        default:
                            this.rowKeys.sort(this.arrSort(this.rowAttrs))
                    }
                    switch (this.colOrder) {
                        case "value_a_to_z":
                            return this.colKeys.sort(function(e) {
                                return function(e, n) {
                                    return f(t([], e), t([], n))
                                }
                            }(this));
                        case "value_z_to_a":
                            return this.colKeys.sort(function(e) {
                                return function(e, n) {
                                    return -f(t([], e), t([], n))
                                }
                            }(this));
                        default:
                            return this.colKeys.sort(this.arrSort(this.colAttrs))
                    }
                }
            }, e.prototype.getColKeys = function() {
                return this.sortKeys(), this.colKeys
            }, e.prototype.getRowKeys = function() {
                return this.sortKeys(), this.rowKeys
            }, e.prototype.processRecord = function(t) {
                var e, n, r, a, o, i, l, s, u, c, h, d, p;
                for (e = [], d = [], s = this.colAttrs, a = 0, o = s.length; a < o; a++) p = s[a], e.push(null != (u = t[p]) ? u : "null");
                for (c = this.rowAttrs, l = 0, i = c.length; l < i; l++) p = c[l], d.push(null != (h = t[p]) ? h : "null");
                if (r = d.join(String.fromCharCode(0)), n = e.join(String.fromCharCode(0)), this.allTotal.push(t), 0 !== d.length && (this.rowTotals[r] || (this.rowKeys.push(d), this.rowTotals[r] = this.aggregator(this, d, [])), this.rowTotals[r].push(t)), 0 !== e.length && (this.colTotals[n] || (this.colKeys.push(e), this.colTotals[n] = this.aggregator(this, [], e)), this.colTotals[n].push(t)), 0 !== e.length && 0 !== d.length) return this.tree[r] || (this.tree[r] = {}), this.tree[r][n] || (this.tree[r][n] = this.aggregator(this, d, e)), this.tree[r][n].push(t)
            }, e.prototype.getAggregator = function(t, e) {
                var n, r, a;
                return a = t.join(String.fromCharCode(0)), r = e.join(String.fromCharCode(0)), n = 0 === t.length && 0 === e.length ? this.allTotal : 0 === t.length ? this.colTotals[r] : 0 === e.length ? this.rowTotals[a] : this.tree[a][r], null != n ? n : {
                    value: function() {
                        return null
                    },
                    format: function() {
                        return ""
                    }
                }
            }, e
        }(), t.pivotUtilities = {
            aggregatorTemplates: l,
            aggregators: s,
            renderers: b,
            derivers: c,
            locales: d,
            naturalSort: f,
            numberFormat: m,
            sortAs: w,
            PivotData: o
        }, g = function(e, n) {
            var r, o, i, l, s, u, c, h, d, p, f, m, g, v, b, C, y, w, A, x, S, N, T, k;
            u = {
                table: {
                    clickCallback: null,
                    rowTotals: !0,
                    colTotals: !0
                },
                localeStrings: {
                    totals: "Totals"
                }
            }, n = t.extend(!0, {}, u, n), i = e.colAttrs, m = e.rowAttrs, v = e.getRowKeys(), s = e.getColKeys(), n.table.clickCallback && (c = function(t, r, o) {
                var l, s, u;
                s = {};
                for (u in i) a.call(i, u) && (l = i[u], null != o[u] && (s[l] = o[u]));
                for (u in m) a.call(m, u) && (l = m[u], null != r[u] && (s[l] = r[u]));
                return function(r) {
                    return n.table.clickCallback(r, t, s, e)
                }
            }), f = document.createElement("table"), f.className = "pvtTable", b = function(t, e, n) {
                var r, a, o, i, l, s, u, c;
                if (0 !== e) {
                    for (i = !0, c = r = 0, l = n; 0 <= l ? r <= l : r >= l; c = 0 <= l ? ++r : --r) t[e - 1][c] !== t[e][c] && (i = !1);
                    if (i) return -1
                }
                for (a = 0; e + a < t.length;) {
                    for (u = !1, c = o = 0, s = n; 0 <= s ? o <= s : o >= s; c = 0 <= s ? ++o : --o) t[e][c] !== t[e + a][c] && (u = !0);
                    if (u) break;
                    a++
                }
                return a
            }, A = document.createElement("thead");
            for (d in i)
                if (a.call(i, d)) {
                    o = i[d], S = document.createElement("tr"), 0 === parseInt(d) && 0 !== m.length && (w = document.createElement("th"), w.setAttribute("colspan", m.length), w.setAttribute("rowspan", i.length), S.appendChild(w)), w = document.createElement("th"), w.className = "pvtAxisLabel", w.textContent = o, S.appendChild(w);
                    for (h in s) a.call(s, h) && (l = s[h], k = b(s, parseInt(h), parseInt(d)), k !== -1 && (w = document.createElement("th"), w.className = "pvtColLabel", w.textContent = l[d], w.setAttribute("colspan", k), parseInt(d) === i.length - 1 && 0 !== m.length && w.setAttribute("rowspan", 2), S.appendChild(w)));
                    0 === parseInt(d) && n.table.rowTotals && (w = document.createElement("th"), w.className = "pvtTotalLabel pvtRowTotalLabel", w.innerHTML = n.localeStrings.totals, w.setAttribute("rowspan", i.length + (0 === m.length ? 0 : 1)), S.appendChild(w)), A.appendChild(S)
                }
            if (0 !== m.length) {
                S = document.createElement("tr");
                for (h in m) a.call(m, h) && (p = m[h], w = document.createElement("th"), w.className = "pvtAxisLabel", w.textContent = p, S.appendChild(w));
                w = document.createElement("th"), 0 === i.length && (w.className = "pvtTotalLabel pvtRowTotalLabel", w.innerHTML = n.localeStrings.totals), S.appendChild(w), A.appendChild(S)
            }
            f.appendChild(A), C = document.createElement("tbody");
            for (h in v)
                if (a.call(v, h)) {
                    g = v[h], S = document.createElement("tr");
                    for (d in g) a.call(g, d) && (N = g[d], k = b(v, parseInt(h), parseInt(d)), k !== -1 && (w = document.createElement("th"), w.className = "pvtRowLabel", w.textContent = N, w.setAttribute("rowspan", k), parseInt(d) === m.length - 1 && 0 !== i.length && w.setAttribute("colspan", 2), S.appendChild(w)));
                    for (d in s) a.call(s, d) && (l = s[d], r = e.getAggregator(g, l), T = r.value(), y = document.createElement("td"), y.className = "pvtVal row" + h + " col" + d, y.textContent = r.format(T), y.setAttribute("data-value", T), null != c && (y.onclick = c(T, g, l)), S.appendChild(y));
                    (n.table.rowTotals || 0 === i.length) && (x = e.getAggregator(g, []), T = x.value(), y = document.createElement("td"), y.className = "pvtTotal rowTotal", y.textContent = x.format(T), y.setAttribute("data-value", T), null != c && (y.onclick = c(T, g, [])), y.setAttribute("data-for", "row" + h), S.appendChild(y)), C.appendChild(S)
                }
            if (n.table.colTotals || 0 === m.length) {
                S = document.createElement("tr"), (n.table.colTotals || 0 === m.length) && (w = document.createElement("th"), w.className = "pvtTotalLabel pvtColTotalLabel", w.innerHTML = n.localeStrings.totals, w.setAttribute("colspan", m.length + (0 === i.length ? 0 : 1)), S.appendChild(w));
                for (d in s) a.call(s, d) && (l = s[d], x = e.getAggregator([], l), T = x.value(), y = document.createElement("td"), y.className = "pvtTotal colTotal", y.textContent = x.format(T), y.setAttribute("data-value", T), null != c && (y.onclick = c(T, [], l)), y.setAttribute("data-for", "col" + d), S.appendChild(y));
                (n.table.rowTotals || 0 === i.length) && (x = e.getAggregator([], []), T = x.value(), y = document.createElement("td"), y.className = "pvtGrandTotal", y.textContent = x.format(T), y.setAttribute("data-value", T), null != c && (y.onclick = c(T, [], [])), S.appendChild(y)), C.appendChild(S)
            }
            return f.appendChild(C), f.setAttribute("data-numrows", v.length), f.setAttribute("data-numcols", s.length), f
        }, t.fn.pivot = function(e, n, r) {
            var a, i, s, u, c, h, p, f;
            null == r && (r = "en"), null == d[r] && (r = "en"), a = {
                cols: [],
                rows: [],
                vals: [],
                rowOrder: "key_a_to_z",
                colOrder: "key_a_to_z",
                dataClass: o,
                filter: function() {
                    return !0
                },
                aggregator: l.count()(),
                aggregatorName: "Count",
                sorters: {},
                derivedAttributes: {},
                renderer: g
            }, u = t.extend(!0, {}, d.en.localeStrings, d[r].localeStrings), s = {
                rendererOptions: {
                    localeStrings: u
                },
                localeStrings: u
            }, c = t.extend(!0, {}, s, t.extend({}, a, n)), p = null;
            try {
                h = new c.dataClass(e, c);
                try {
                    p = c.renderer(h, c.rendererOptions)
                } catch (m) {
                    i = m, "undefined" != typeof console && null !== console && console.error(i.stack), p = t("<span>").html(c.localeStrings.renderError)
                }
            } catch (m) {
                i = m, "undefined" != typeof console && null !== console && console.error(i.stack), p = t("<span>").html(c.localeStrings.computeError)
            }
            for (f = this[0]; f.hasChildNodes();) f.removeChild(f.lastChild);
            return this.append(p)
        }, t.fn.pivotUI = function(n, r, i, l) {
            var s, u, c, p, m, g, v, b, C, y, w, A, x, S, N, T, k, O, _, F, D, E, M, R, I, L, U, K, q, z, V, j, H, B, P, J, G, W, $, Q, Y, X, Z, tt, et;
            null == i && (i = !1), null == l && (l = "en"), null == d[l] && (l = "en"), b = {
                derivedAttributes: {},
                aggregators: d[l].aggregators,
                renderers: d[l].renderers,
                hiddenAttributes: [],
                hiddenFromAggregators: [],
                hiddenFromDragDrop: [],
                menuLimit: 500,
                cols: [],
                rows: [],
                vals: [],
                rowOrder: "key_a_to_z",
                colOrder: "key_a_to_z",
                dataClass: o,
                exclusions: {},
                inclusions: {},
                unusedAttrsVertical: 85,
                autoSortUnusedAttrs: !1,
                onRefresh: null,
                showUI: !0,
                filter: function() {
                    return !0
                },
                sorters: {}
            }, _ = t.extend(!0, {}, d.en.localeStrings, d[l].localeStrings), O = {
                rendererOptions: {
                    localeStrings: _
                },
                localeStrings: _
            }, y = this.data("pivotUIOptions"), M = null == y || i ? t.extend(!0, {}, O, t.extend({}, b, r)) : y;
            try {
                m = {}, F = [], L = 0, o.forEachRecord(n, M.derivedAttributes, function(t) {
                    var e, n, r, o;
                    if (M.filter(t)) {
                        F.push(t);
                        for (e in t) a.call(t, e) && null == m[e] && (m[e] = {}, L > 0 && (m[e]["null"] = L));
                        for (e in m) o = null != (r = t[e]) ? r : "null", null == (n = m[e])[o] && (n[o] = 0), m[e][o]++;
                        return L++
                    }
                }), Y = t("<table>", {
                    "class": "pvtUi"
                }).attr("cellpadding", 5), B = t("<td>").addClass("pvtUiCell"), H = t("<select>").addClass("pvtRenderer").appendTo(B).bind("change", function() {
                    return V()
                }), U = M.renderers;
                for (et in U) a.call(U, et) && t("<option>").val(et).html(et).appendTo(H);
                if (X = t("<td>").addClass("pvtAxisContainer pvtUnused pvtUiCell"), J = function() {
                        var t;
                        t = [];
                        for (s in m) e.call(M.hiddenAttributes, s) < 0 && t.push(s);
                        return t
                    }(), G = function() {
                        var t, n, r;
                        for (r = [], t = 0, n = J.length; t < n; t++) g = J[t], e.call(M.hiddenFromAggregators, g) < 0 && r.push(g);
                        return r
                    }(), W = function() {
                        var t, n, r;
                        for (r = [], t = 0, n = J.length; t < n; t++) g = J[t], e.call(M.hiddenFromDragDrop, g) < 0 && r.push(g);
                        return r
                    }(), tt = !1, Z = "auto" === M.unusedAttrsVertical ? 120 : parseInt(M.unusedAttrsVertical), !isNaN(Z)) {
                    for (p = 0, S = 0, N = W.length; S < N; S++) s = W[S], p += s.length;
                    tt = p > Z
                }
                M.unusedAttrsVertical === !0 || tt ? X.addClass("pvtVertList") : X.addClass("pvtHorizList"), w = function(n) {
                    var r, a, o, i, l, s, u, c, d, p, f, g, v, b, C, y, w, x, S;
                    if (S = function() {
                            var t;
                            t = [];
                            for (C in m[n]) t.push(C);
                            return t
                        }(), c = !1, x = t("<div>").addClass("pvtFilterBox").hide(), x.append(t("<h4>").append(t("<span>").text(n), t("<span>").addClass("count").text("(" + S.length + ")"))), S.length > M.menuLimit) x.append(t("<p>").html(M.localeStrings.tooMany));
                    else
                        for (S.length > 5 && (i = t("<p>").appendTo(x), v = h(M.sorters, n), f = M.localeStrings.filterResults, t("<input>", {
                                type: "text"
                            }).appendTo(i).attr({
                                placeholder: f,
                                "class": "pvtSearch"
                            }).bind("keyup", function() {
                                var n, r, a;
                                return a = t(this).val().toLowerCase().trim(), r = function(t, n) {
                                    return function(r) {
                                        var o, i;
                                        return o = a.substring(t.length).trim(), 0 === o.length || (i = Math.sign(v(r.toLowerCase(), o)), e.call(n, i) >= 0)
                                    }
                                }, n = 0 === a.indexOf(">=") ? r(">=", [1, 0]) : 0 === a.indexOf("<=") ? r("<=", [-1, 0]) : 0 === a.indexOf(">") ? r(">", [1]) : 0 === a.indexOf("<") ? r("<", [-1]) : 0 === a.indexOf("~") ? function(t) {
                                    return 0 === a.substring(1).trim().length || t.toLowerCase().match(a.substring(1))
                                } : function(t) {
                                    return t.toLowerCase().indexOf(a) !== -1
                                }, x.find(".pvtCheckContainer p label span.value").each(function() {
                                    return n(t(this).text()) ? t(this).parent().parent().show() : t(this).parent().parent().hide()
                                })
                            }), i.append(t("<br>")), t("<button>", {
                                type: "button"
                            }).appendTo(i).html(M.localeStrings.selectAll).bind("click", function() {
                                return x.find("input:visible:not(:checked)").prop("checked", !0).toggleClass("changed"), !1
                            }), t("<button>", {
                                type: "button"
                            }).appendTo(i).html(M.localeStrings.selectNone).bind("click", function() {
                                return x.find("input:visible:checked").prop("checked", !1).toggleClass("changed"), !1
                            })), a = t("<div>").addClass("pvtCheckContainer").appendTo(x), g = S.sort(h(M.sorters, n)), p = 0, d = g.length; p < d; p++) y = g[p], w = m[n][y], l = t("<label>"), s = !1, M.inclusions[n] ? s = e.call(M.inclusions[n], y) < 0 : M.exclusions[n] && (s = e.call(M.exclusions[n], y) >= 0), c || (c = s), t("<input>").attr("type", "checkbox").addClass("pvtFilter").attr("checked", !s).data("filter", [n, y]).appendTo(l).bind("change", function() {
                            return t(this).toggleClass("changed")
                        }), l.append(t("<span>").addClass("value").text(y)), l.append(t("<span>").addClass("count").text("(" + w + ")")), a.append(t("<p>").append(l));
                    return o = function() {
                        return x.find("[type='checkbox']").length > x.find("[type='checkbox']:checked").length ? r.addClass("pvtFilteredAttribute") : r.removeClass("pvtFilteredAttribute"), x.find(".pvtSearch").val(""), x.find(".pvtCheckContainer p").show(), x.hide()
                    }, u = t("<p>").appendTo(x), S.length <= M.menuLimit && t("<button>", {
                        type: "button"
                    }).text(M.localeStrings.apply).appendTo(u).bind("click", function() {
                        return x.find(".changed").removeClass("changed").length && V(), o()
                    }), t("<button>", {
                        type: "button"
                    }).text(M.localeStrings.cancel).appendTo(u).bind("click", function() {
                        return x.find(".changed:checked").removeClass("changed").prop("checked", !1), x.find(".changed:not(:checked)").removeClass("changed").prop("checked", !0), o()
                    }), b = t("<span>").addClass("pvtTriangle").html(" &#x25BE;").bind("click", function(e) {
                        var n, r, a;
                        return r = t(e.currentTarget).position(), n = r.left, a = r.top, x.css({
                            left: n + 10,
                            top: a + 10
                        }).show()
                    }), r = t("<li>").addClass("axis_" + A).append(t("<span>").addClass("pvtAttr").text(n).data("attrName", n).append(b)), c && r.addClass("pvtFilteredAttribute"), X.append(r).append(x)
                };
                for (A in W) a.call(W, A) && (c = W[A], w(c));
                $ = t("<tr>").appendTo(Y), u = t("<select>").addClass("pvtAggregator").bind("change", function() {
                    return V()
                }), K = M.aggregators;
                for (et in K) a.call(K, et) && u.append(t("<option>").val(et).html(et));
                for (R = {
                        key_a_to_z: {
                            rowSymbol: "&varr;",
                            colSymbol: "&harr;",
                            next: "value_a_to_z"
                        },
                        value_a_to_z: {
                            rowSymbol: "&darr;",
                            colSymbol: "&rarr;",
                            next: "value_z_to_a"
                        },
                        value_z_to_a: {
                            rowSymbol: "&uarr;",
                            colSymbol: "&larr;",
                            next: "key_a_to_z"
                        }
                    }, P = t("<a>", {
                        role: "button"
                    }).addClass("pvtRowOrder").data("order", M.rowOrder).html(R[M.rowOrder].rowSymbol).bind("click", function() {
                        return t(this).data("order", R[t(this).data("order")].next), t(this).html(R[t(this).data("order")].rowSymbol), V()
                    }), v = t("<a>", {
                        role: "button"
                    }).addClass("pvtColOrder").data("order", M.colOrder).html(R[M.colOrder].colSymbol).bind("click", function() {
                        return t(this).data("order", R[t(this).data("order")].next), t(this).html(R[t(this).data("order")].colSymbol), V()
                    }), t("<td>").addClass("pvtVals pvtUiCell").appendTo($).append(u).append(P).append(v).append(t("<br>")), t("<td>").addClass("pvtAxisContainer pvtHorizList pvtCols pvtUiCell").appendTo($), Q = t("<tr>").appendTo(Y), Q.append(t("<td>").addClass("pvtAxisContainer pvtRows pvtUiCell").attr("valign", "top")), I = t("<td>").attr("valign", "top").addClass("pvtRendererArea").appendTo(Q), M.unusedAttrsVertical === !0 || tt ? (Y.find("tr:nth-child(1)").prepend(B), Y.find("tr:nth-child(2)").prepend(X)) : Y.prepend(t("<tr>").append(B).append(X)), this.html(Y), q = M.cols, D = 0, T = q.length; D < T; D++) et = q[D], this.find(".pvtCols").append(this.find(".axis_" + t.inArray(et, W)));
                for (z = M.rows, E = 0, k = z.length; E < k; E++) et = z[E], this.find(".pvtRows").append(this.find(".axis_" + t.inArray(et, W)));
                null != M.aggregatorName && this.find(".pvtAggregator").val(M.aggregatorName), null != M.rendererName && this.find(".pvtRenderer").val(M.rendererName), M.showUI || this.find(".pvtUiCell").hide(), x = !0, j = function(n) {
                    return function() {
                        var r, a, o, i, l, s, h, d, p, m, g, b, C, y;
                        if (m = {
                                derivedAttributes: M.derivedAttributes,
                                localeStrings: M.localeStrings,
                                rendererOptions: M.rendererOptions,
                                sorters: M.sorters,
                                cols: [],
                                rows: [],
                                dataClass: M.dataClass
                            }, l = null != (d = M.aggregators[u.val()]([])().numInputs) ? d : 0, y = [], n.find(".pvtRows li span.pvtAttr").each(function() {
                                return m.rows.push(t(this).data("attrName"))
                            }), n.find(".pvtCols li span.pvtAttr").each(function() {
                                return m.cols.push(t(this).data("attrName"))
                            }), n.find(".pvtVals select.pvtAttrDropdown").each(function() {
                                return 0 === l ? t(this).remove() : (l--, "" !== t(this).val() ? y.push(t(this).val()) : void 0)
                            }), 0 !== l)
                            for (h = n.find(".pvtVals"), et = g = 0, p = l; 0 <= p ? g < p : g > p; et = 0 <= p ? ++g : --g) {
                                for (i = t("<select>").addClass("pvtAttrDropdown").append(t("<option>")).bind("change", function() {
                                        return V()
                                    }), b = 0, o = G.length; b < o; b++) c = G[b], i.append(t("<option>").val(c).text(c));
                                h.append(i)
                            }
                        if (x && (y = M.vals, A = 0, n.find(".pvtVals select.pvtAttrDropdown").each(function() {
                                return t(this).val(y[A]), A++
                            }), x = !1), m.aggregatorName = u.val(), m.vals = y, m.aggregator = M.aggregators[u.val()](y), m.renderer = M.renderers[H.val()], m.rowOrder = P.data("order"), m.colOrder = v.data("order"), r = {}, n.find("input.pvtFilter").not(":checked").each(function() {
                                var e;
                                return e = t(this).data("filter"), null != r[e[0]] ? r[e[0]].push(e[1]) : r[e[0]] = [e[1]]
                            }), a = {}, n.find("input.pvtFilter:checked").each(function() {
                                var e;
                                if (e = t(this).data("filter"), null != r[e[0]]) return null != a[e[0]] ? a[e[0]].push(e[1]) : a[e[0]] = [e[1]]
                            }), m.filter = function(t) {
                                var n, a, o, i;
                                if (!M.filter(t)) return !1;
                                for (a in r)
                                    if (n = r[a], o = "" + (null != (i = t[a]) ? i : "null"), e.call(n, o) >= 0) return !1;
                                return !0
                            }, I.pivot(F, m), s = t.extend({}, M, {
                                cols: m.cols,
                                rows: m.rows,
                                colOrder: m.colOrder,
                                rowOrder: m.rowOrder,
                                vals: y,
                                exclusions: r,
                                inclusions: a,
                                inclusionsInfo: a,
                                aggregatorName: u.val(),
                                rendererName: H.val()
                            }), n.data("pivotUIOptions", s), M.autoSortUnusedAttrs && (C = n.find("td.pvtUnused.pvtAxisContainer"), t(C).children("li").sort(function(e, n) {
                                return f(t(e).text(), t(n).text())
                            }).appendTo(C)), I.css("opacity", 1), null != M.onRefresh) return M.onRefresh(s)
                    }
                }(this), V = function(t) {
                    return function() {
                        return I.css("opacity", .5), setTimeout(j, 10)
                    }
                }(this), V(), this.find(".pvtAxisContainer").sortable({
                    update: function(t, e) {
                        if (null == e.sender) return V()
                    },
                    connectWith: this.find(".pvtAxisContainer"),
                    items: "li",
                    placeholder: "pvtPlaceholder"
                })
            } catch (nt) {
                C = nt, "undefined" != typeof console && null !== console && console.error(C.stack), this.html(M.localeStrings.uiRenderError)
            }
            return this
        }, t.fn.heatmap = function(e, n) {
            var r, a, o, i, l, s, u, c, h, d, p;
            switch (null == e && (e = "heatmap"), c = this.data("numrows"), u = this.data("numcols"), r = null != n && null != (h = n.heatmap) ? h.colorScaleGenerator : void 0, null == r && (r = function(t) {
                var e, n;
                return n = Math.min.apply(Math, t), e = Math.max.apply(Math, t),
                    function(t) {
                        var r;
                        return r = 255 - Math.round(255 * (t - n) / (e - n)), "rgb(255," + r + "," + r + ")"
                    }
            }), a = function(e) {
                return function(n) {
                    var a, o, i;
                    return o = function(r) {
                        return e.find(n).each(function() {
                            var e;
                            if (e = t(this).data("value"), null != e && isFinite(e)) return r(e, t(this))
                        })
                    }, i = [], o(function(t) {
                        return i.push(t)
                    }), a = r(i), o(function(t, e) {
                        return e.css("background-color", a(t))
                    })
                }
            }(this), e) {
                case "heatmap":
                    a(".pvtVal");
                    break;
                case "rowheatmap":
                    for (o = l = 0, d = c; 0 <= d ? l < d : l > d; o = 0 <= d ? ++l : --l) a(".pvtVal.row" + o);
                    break;
                case "colheatmap":
                    for (i = s = 0, p = u; 0 <= p ? s < p : s > p; i = 0 <= p ? ++s : --s) a(".pvtVal.col" + i)
            }
            return a(".pvtTotal.rowTotal"), a(".pvtTotal.colTotal"), this
        }, t.fn.barchart = function(e) {
            var n, r, a, o, i, l;
            for (i = this.data("numrows"), o = this.data("numcols"), n = function(e) {
                    return function(n) {
                        var r, a, o, i, l, s;
                        return r = function(r) {
                            return e.find(n).each(function() {
                                var e;
                                if (e = t(this).data("value"), null != e && isFinite(e)) return r(e, t(this))
                            })
                        }, s = [], r(function(t) {
                            return s.push(t)
                        }), a = Math.max.apply(Math, s), a < 0 && (a = 0), i = a, o = Math.min.apply(Math, s), o < 0 && (i = a - o), l = function(t) {
                            return 100 * t / (1.4 * i)
                        }, r(function(e, n) {
                            var r, a, i, s;
                            return i = n.text(), s = t("<div>").css({
                                position: "relative",
                                height: "55px"
                            }), a = "gray", r = 0, o < 0 && (r = l(-o)), e < 0 && (r += l(e), a = "darkred", e = -e), s.append(t("<div>").css({
                                position: "absolute",
                                bottom: r + "%",
                                left: 0,
                                right: 0,
                                height: l(e) + "%",
                                "background-color": a
                            })), s.append(t("<div>").text(i).css({
                                position: "relative",
                                "padding-left": "5px",
                                "padding-right": "5px"
                            })), n.css({
                                padding: 0,
                                "padding-top": "5px",
                                "text-align": "center"
                            }).html(s)
                        })
                    }
                }(this), r = a = 0, l = i; 0 <= l ? a < l : a > l; r = 0 <= l ? ++a : --a) n(".pvtVal.row" + r);
            return n(".pvtTotal.colTotal"), this
        }
    })
}).call(this);
//# sourceMappingURL=pivot.min.js.map