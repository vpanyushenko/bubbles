/**
 * Fuse.js v6.4.6 - Lightweight fuzzy-search (http://fusejs.io)
 *
 * Copyright (c) 2021 Kiro Risk (http://kiro.me)
 * All Rights Reserved. Apache Software License 2.0
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 */
function t(t) {
  return Array.isArray ? Array.isArray(t) : "[object Array]" === o(t);
}
function e(t) {
  return "string" == typeof t;
}
function n(t) {
  return "number" == typeof t;
}
function s(t) {
  return (
    !0 === t ||
    !1 === t ||
    ((function (t) {
      return (
        (function (t) {
          return "object" == typeof t;
        })(t) && null !== t
      );
    })(t) &&
      "[object Boolean]" == o(t))
  );
}
function i(t) {
  return null != t;
}
function r(t) {
  return !t.trim().length;
}
function o(t) {
  return null == t ? (void 0 === t ? "[object Undefined]" : "[object Null]") : Object.prototype.toString.call(t);
}
const c = Object.prototype.hasOwnProperty;
class h {
  constructor(t) {
    (this._keys = []), (this._keyMap = {});
    let e = 0;
    t.forEach((t) => {
      let n = a(t);
      (e += n.weight), this._keys.push(n), (this._keyMap[n.id] = n), (e += n.weight);
    }),
      this._keys.forEach((t) => {
        t.weight /= e;
      });
  }
  get(t) {
    return this._keyMap[t];
  }
  keys() {
    return this._keys;
  }
  toJSON() {
    return JSON.stringify(this._keys);
  }
}
function a(n) {
  let s = null,
    i = null,
    r = null,
    o = 1;
  if (e(n) || t(n)) (r = n), (s = l(n)), (i = d(n));
  else {
    if (!c.call(n, "name")) throw new Error(((t) => `Missing ${t} property in key`)("name"));
    const t = n.name;
    if (((r = t), c.call(n, "weight") && ((o = n.weight), o <= 0)))
      throw new Error(((t) => `Property 'weight' in key '${t}' must be a positive integer`)(t));
    (s = l(t)), (i = d(t));
  }
  return { path: s, id: i, weight: o, src: r };
}
function l(e) {
  return t(e) ? e : e.split(".");
}
function d(e) {
  return t(e) ? e.join(".") : e;
}
var u = {
  isCaseSensitive: !1,
  includeScore: !1,
  keys: [],
  shouldSort: !0,
  sortFn: (t, e) => (t.score === e.score ? (t.idx < e.idx ? -1 : 1) : t.score < e.score ? -1 : 1),
  includeMatches: !1,
  findAllMatches: !1,
  minMatchCharLength: 1,
  location: 0,
  threshold: 0.6,
  distance: 100,
  ...{
    useExtendedSearch: !1,
    getFn: function (r, o) {
      let c = [],
        h = !1;
      const a = (r, o, l) => {
        if (i(r))
          if (o[l]) {
            const d = r[o[l]];
            if (!i(d)) return;
            if (l === o.length - 1 && (e(d) || n(d) || s(d)))
              c.push(
                (function (t) {
                  return null == t
                    ? ""
                    : (function (t) {
                        if ("string" == typeof t) return t;
                        let e = t + "";
                        return "0" == e && 1 / t == -1 / 0 ? "-0" : e;
                      })(t);
                })(d)
              );
            else if (t(d)) {
              h = !0;
              for (let t = 0, e = d.length; t < e; t += 1) a(d[t], o, l + 1);
            } else o.length && a(d, o, l + 1);
          } else c.push(r);
      };
      return a(r, e(o) ? o.split(".") : o, 0), h ? c : c[0];
    },
    ignoreLocation: !1,
    ignoreFieldNorm: !1,
  },
};
const f = /[^ ]+/g;
class g {
  constructor({ getFn: t = u.getFn } = {}) {
    (this.norm = (function (t = 3) {
      const e = new Map(),
        n = Math.pow(10, t);
      return {
        get(t) {
          const s = t.match(f).length;
          if (e.has(s)) return e.get(s);
          const i = 1 / Math.sqrt(s),
            r = parseFloat(Math.round(i * n) / n);
          return e.set(s, r), r;
        },
        clear() {
          e.clear();
        },
      };
    })(3)),
      (this.getFn = t),
      (this.isCreated = !1),
      this.setIndexRecords();
  }
  setSources(t = []) {
    this.docs = t;
  }
  setIndexRecords(t = []) {
    this.records = t;
  }
  setKeys(t = []) {
    (this.keys = t),
      (this._keysMap = {}),
      t.forEach((t, e) => {
        this._keysMap[t.id] = e;
      });
  }
  create() {
    !this.isCreated &&
      this.docs.length &&
      ((this.isCreated = !0),
      e(this.docs[0])
        ? this.docs.forEach((t, e) => {
            this._addString(t, e);
          })
        : this.docs.forEach((t, e) => {
            this._addObject(t, e);
          }),
      this.norm.clear());
  }
  add(t) {
    const n = this.size();
    e(t) ? this._addString(t, n) : this._addObject(t, n);
  }
  removeAt(t) {
    this.records.splice(t, 1);
    for (let e = t, n = this.size(); e < n; e += 1) this.records[e].i -= 1;
  }
  getValueForItemAtKeyId(t, e) {
    return t[this._keysMap[e]];
  }
  size() {
    return this.records.length;
  }
  _addString(t, e) {
    if (!i(t) || r(t)) return;
    let n = { v: t, i: e, n: this.norm.get(t) };
    this.records.push(n);
  }
  _addObject(n, s) {
    let o = { i: s, $: {} };
    this.keys.forEach((s, c) => {
      let h = this.getFn(n, s.path);
      if (i(h))
        if (t(h)) {
          let n = [];
          const s = [{ nestedArrIndex: -1, value: h }];
          for (; s.length; ) {
            const { nestedArrIndex: o, value: c } = s.pop();
            if (i(c))
              if (e(c) && !r(c)) {
                let t = { v: c, i: o, n: this.norm.get(c) };
                n.push(t);
              } else
                t(c) &&
                  c.forEach((t, e) => {
                    s.push({ nestedArrIndex: e, value: t });
                  });
          }
          o.$[c] = n;
        } else if (!r(h)) {
          let t = { v: h, n: this.norm.get(h) };
          o.$[c] = t;
        }
    }),
      this.records.push(o);
  }
  toJSON() {
    return { keys: this.keys, records: this.records };
  }
}
function p(t, e, { getFn: n = u.getFn } = {}) {
  const s = new g({ getFn: n });
  return s.setKeys(t.map(a)), s.setSources(e), s.create(), s;
}
function m(
  t,
  {
    errors: e = 0,
    currentLocation: n = 0,
    expectedLocation: s = 0,
    distance: i = u.distance,
    ignoreLocation: r = u.ignoreLocation,
  } = {}
) {
  const o = e / t.length;
  if (r) return o;
  const c = Math.abs(s - n);
  return i ? o + c / i : c ? 1 : o;
}
function y(
  t,
  e,
  n,
  {
    location: s = u.location,
    distance: i = u.distance,
    threshold: r = u.threshold,
    findAllMatches: o = u.findAllMatches,
    minMatchCharLength: c = u.minMatchCharLength,
    includeMatches: h = u.includeMatches,
    ignoreLocation: a = u.ignoreLocation,
  } = {}
) {
  if (e.length > 32) throw new Error(`Pattern length exceeds max of ${32}.`);
  const l = e.length,
    d = t.length,
    f = Math.max(0, Math.min(s, d));
  let g = r,
    p = f;
  const y = c > 1 || h,
    M = y ? Array(d) : [];
  let x;
  for (; (x = t.indexOf(e, p)) > -1; ) {
    let t = m(e, { currentLocation: x, expectedLocation: f, distance: i, ignoreLocation: a });
    if (((g = Math.min(t, g)), (p = x + l), y)) {
      let t = 0;
      for (; t < l; ) (M[x + t] = 1), (t += 1);
    }
  }
  p = -1;
  let L = [],
    _ = 1,
    k = l + d;
  const v = 1 << (l - 1);
  for (let s = 0; s < l; s += 1) {
    let r = 0,
      c = k;
    for (; r < c; ) {
      m(e, { errors: s, currentLocation: f + c, expectedLocation: f, distance: i, ignoreLocation: a }) <= g
        ? (r = c)
        : (k = c),
        (c = Math.floor((k - r) / 2 + r));
    }
    k = c;
    let h = Math.max(1, f - c + 1),
      u = o ? d : Math.min(f + c, d) + l,
      x = Array(u + 2);
    x[u + 1] = (1 << s) - 1;
    for (let r = u; r >= h; r -= 1) {
      let o = r - 1,
        c = n[t.charAt(o)];
      if (
        (y && (M[o] = +!!c),
        (x[r] = ((x[r + 1] << 1) | 1) & c),
        s && (x[r] |= ((L[r + 1] | L[r]) << 1) | 1 | L[r + 1]),
        x[r] & v &&
          ((_ = m(e, { errors: s, currentLocation: o, expectedLocation: f, distance: i, ignoreLocation: a })), _ <= g))
      ) {
        if (((g = _), (p = o), p <= f)) break;
        h = Math.max(1, 2 * f - p);
      }
    }
    if (m(e, { errors: s + 1, currentLocation: f, expectedLocation: f, distance: i, ignoreLocation: a }) > g) break;
    L = x;
  }
  const w = { isMatch: p >= 0, score: Math.max(0.001, _) };
  if (y) {
    const t = (function (t = [], e = u.minMatchCharLength) {
      let n = [],
        s = -1,
        i = -1,
        r = 0;
      for (let o = t.length; r < o; r += 1) {
        let o = t[r];
        o && -1 === s ? (s = r) : o || -1 === s || ((i = r - 1), i - s + 1 >= e && n.push([s, i]), (s = -1));
      }
      return t[r - 1] && r - s >= e && n.push([s, r - 1]), n;
    })(M, c);
    t.length ? h && (w.indices = t) : (w.isMatch = !1);
  }
  return w;
}
function M(t) {
  let e = {};
  for (let n = 0, s = t.length; n < s; n += 1) {
    const i = t.charAt(n);
    e[i] = (e[i] || 0) | (1 << (s - n - 1));
  }
  return e;
}
class x {
  constructor(
    t,
    {
      location: e = u.location,
      threshold: n = u.threshold,
      distance: s = u.distance,
      includeMatches: i = u.includeMatches,
      findAllMatches: r = u.findAllMatches,
      minMatchCharLength: o = u.minMatchCharLength,
      isCaseSensitive: c = u.isCaseSensitive,
      ignoreLocation: h = u.ignoreLocation,
    } = {}
  ) {
    if (
      ((this.options = {
        location: e,
        threshold: n,
        distance: s,
        includeMatches: i,
        findAllMatches: r,
        minMatchCharLength: o,
        isCaseSensitive: c,
        ignoreLocation: h,
      }),
      (this.pattern = c ? t : t.toLowerCase()),
      (this.chunks = []),
      !this.pattern.length)
    )
      return;
    const a = (t, e) => {
        this.chunks.push({ pattern: t, alphabet: M(t), startIndex: e });
      },
      l = this.pattern.length;
    if (l > 32) {
      let t = 0;
      const e = l % 32,
        n = l - e;
      for (; t < n; ) a(this.pattern.substr(t, 32), t), (t += 32);
      if (e) {
        const t = l - 32;
        a(this.pattern.substr(t), t);
      }
    } else a(this.pattern, 0);
  }
  searchIn(t) {
    const { isCaseSensitive: e, includeMatches: n } = this.options;
    if ((e || (t = t.toLowerCase()), this.pattern === t)) {
      let e = { isMatch: !0, score: 0 };
      return n && (e.indices = [[0, t.length - 1]]), e;
    }
    const {
      location: s,
      distance: i,
      threshold: r,
      findAllMatches: o,
      minMatchCharLength: c,
      ignoreLocation: h,
    } = this.options;
    let a = [],
      l = 0,
      d = !1;
    this.chunks.forEach(({ pattern: e, alphabet: u, startIndex: f }) => {
      const {
        isMatch: g,
        score: p,
        indices: m,
      } = y(t, e, u, {
        location: s + f,
        distance: i,
        threshold: r,
        findAllMatches: o,
        minMatchCharLength: c,
        includeMatches: n,
        ignoreLocation: h,
      });
      g && (d = !0), (l += p), g && m && (a = [...a, ...m]);
    });
    let u = { isMatch: d, score: d ? l / this.chunks.length : 1 };
    return d && n && (u.indices = a), u;
  }
}
const L = [];
function _(t, e) {
  for (let n = 0, s = L.length; n < s; n += 1) {
    let s = L[n];
    if (s.condition(t, e)) return new s(t, e);
  }
  return new x(t, e);
}
function k(t, e) {
  const n = t.matches;
  (e.matches = []),
    i(n) &&
      n.forEach((t) => {
        if (!i(t.indices) || !t.indices.length) return;
        const { indices: n, value: s } = t;
        let r = { indices: n, value: s };
        t.key && (r.key = t.key.src), t.idx > -1 && (r.refIndex = t.idx), e.matches.push(r);
      });
}
function v(t, e) {
  e.score = t.score;
}
class w {
  constructor(t, e = {}, n) {
    if (((this.options = { ...u, ...e }), this.options.useExtendedSearch))
      throw new Error("Extended search is not available");
    (this._keyStore = new h(this.options.keys)), this.setCollection(t, n);
  }
  setCollection(t, e) {
    if (((this._docs = t), e && !(e instanceof g))) throw new Error("Incorrect 'index' type");
    this._myIndex = e || p(this.options.keys, this._docs, { getFn: this.options.getFn });
  }
  add(t) {
    i(t) && (this._docs.push(t), this._myIndex.add(t));
  }
  remove(t = () => !1) {
    const e = [];
    for (let n = 0, s = this._docs.length; n < s; n += 1) {
      const i = this._docs[n];
      t(i, n) && (this.removeAt(n), (n -= 1), (s -= 1), e.push(i));
    }
    return e;
  }
  removeAt(t) {
    this._docs.splice(t, 1), this._myIndex.removeAt(t);
  }
  getIndex() {
    return this._myIndex;
  }
  search(t, { limit: s = -1 } = {}) {
    const { includeMatches: i, includeScore: r, shouldSort: o, sortFn: c, ignoreFieldNorm: h } = this.options;
    let a = e(t) ? (e(this._docs[0]) ? this._searchStringList(t) : this._searchObjectList(t)) : this._searchLogical(t);
    return (
      (function (t, { ignoreFieldNorm: e = u.ignoreFieldNorm }) {
        t.forEach((t) => {
          let n = 1;
          t.matches.forEach(({ key: t, norm: s, score: i }) => {
            const r = t ? t.weight : null;
            n *= Math.pow(0 === i && r ? Number.EPSILON : i, (r || 1) * (e ? 1 : s));
          }),
            (t.score = n);
        });
      })(a, { ignoreFieldNorm: h }),
      o && a.sort(c),
      n(s) && s > -1 && (a = a.slice(0, s)),
      (function (t, e, { includeMatches: n = u.includeMatches, includeScore: s = u.includeScore } = {}) {
        const i = [];
        return (
          n && i.push(k),
          s && i.push(v),
          t.map((t) => {
            const { idx: n } = t,
              s = { item: e[n], refIndex: n };
            return (
              i.length &&
                i.forEach((e) => {
                  e(t, s);
                }),
              s
            );
          })
        );
      })(a, this._docs, { includeMatches: i, includeScore: r })
    );
  }
  _searchStringList(t) {
    const e = _(t, this.options),
      { records: n } = this._myIndex,
      s = [];
    return (
      n.forEach(({ v: t, i: n, n: r }) => {
        if (!i(t)) return;
        const { isMatch: o, score: c, indices: h } = e.searchIn(t);
        o && s.push({ item: t, idx: n, matches: [{ score: c, value: t, norm: r, indices: h }] });
      }),
      s
    );
  }
  _searchLogical(t) {
    throw new Error("Logical search is not available");
  }
  _searchObjectList(t) {
    const e = _(t, this.options),
      { keys: n, records: s } = this._myIndex,
      r = [];
    return (
      s.forEach(({ $: t, i: s }) => {
        if (!i(t)) return;
        let o = [];
        n.forEach((n, s) => {
          o.push(...this._findMatches({ key: n, value: t[s], searcher: e }));
        }),
          o.length && r.push({ idx: s, item: t, matches: o });
      }),
      r
    );
  }
  _findMatches({ key: e, value: n, searcher: s }) {
    if (!i(n)) return [];
    let r = [];
    if (t(n))
      n.forEach(({ v: t, i: n, n: o }) => {
        if (!i(t)) return;
        const { isMatch: c, score: h, indices: a } = s.searchIn(t);
        c && r.push({ score: h, key: e, value: t, idx: n, norm: o, indices: a });
      });
    else {
      const { v: t, n: i } = n,
        { isMatch: o, score: c, indices: h } = s.searchIn(t);
      o && r.push({ score: c, key: e, value: t, norm: i, indices: h });
    }
    return r;
  }
}
(w.version = "6.4.6"),
  (w.createIndex = p),
  (w.parseIndex = function (t, { getFn: e = u.getFn } = {}) {
    const { keys: n, records: s } = t,
      i = new g({ getFn: e });
    return i.setKeys(n), i.setIndexRecords(s), i;
  }),
  (w.config = u);
export default w;
