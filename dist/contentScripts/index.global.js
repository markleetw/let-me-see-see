(() => {
  // src/content/vendor/browser-polyfill.js
  var _i = { exports: {} };
  (function(n, e) {
    (function(t, i) {
      i(n);
    })(typeof globalThis < "u" ? globalThis : typeof self < "u" ? self : Jt, function(t) {
      var i, r;
      if (!((r = (i = globalThis.chrome) == null ? void 0 : i.runtime) != null && r.id)) throw new Error("This script should only be loaded in a browser extension.");
      if (typeof globalThis.browser > "u" || Object.getPrototypeOf(globalThis.browser) !== Object.prototype) {
        const a = "The message port closed before a response was received.", s = (o) => {
          const c = { alarms: { clear: { minArgs: 0, maxArgs: 1 }, clearAll: { minArgs: 0, maxArgs: 0 }, get: { minArgs: 0, maxArgs: 1 }, getAll: { minArgs: 0, maxArgs: 0 } }, bookmarks: { create: { minArgs: 1, maxArgs: 1 }, get: { minArgs: 1, maxArgs: 1 }, getChildren: { minArgs: 1, maxArgs: 1 }, getRecent: { minArgs: 1, maxArgs: 1 }, getSubTree: { minArgs: 1, maxArgs: 1 }, getTree: { minArgs: 0, maxArgs: 0 }, move: { minArgs: 2, maxArgs: 2 }, remove: { minArgs: 1, maxArgs: 1 }, removeTree: { minArgs: 1, maxArgs: 1 }, search: { minArgs: 1, maxArgs: 1 }, update: { minArgs: 2, maxArgs: 2 } }, browserAction: { disable: { minArgs: 0, maxArgs: 1, fallbackToNoCallback: true }, enable: { minArgs: 0, maxArgs: 1, fallbackToNoCallback: true }, getBadgeBackgroundColor: { minArgs: 1, maxArgs: 1 }, getBadgeText: { minArgs: 1, maxArgs: 1 }, getPopup: { minArgs: 1, maxArgs: 1 }, getTitle: { minArgs: 1, maxArgs: 1 }, openPopup: { minArgs: 0, maxArgs: 0 }, setBadgeBackgroundColor: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: true }, setBadgeText: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: true }, setIcon: { minArgs: 1, maxArgs: 1 }, setPopup: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: true }, setTitle: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: true } }, browsingData: { remove: { minArgs: 2, maxArgs: 2 }, removeCache: { minArgs: 1, maxArgs: 1 }, removeCookies: { minArgs: 1, maxArgs: 1 }, removeDownloads: { minArgs: 1, maxArgs: 1 }, removeFormData: { minArgs: 1, maxArgs: 1 }, removeHistory: { minArgs: 1, maxArgs: 1 }, removeLocalStorage: { minArgs: 1, maxArgs: 1 }, removePasswords: { minArgs: 1, maxArgs: 1 }, removePluginData: { minArgs: 1, maxArgs: 1 }, settings: { minArgs: 0, maxArgs: 0 } }, commands: { getAll: { minArgs: 0, maxArgs: 0 } }, contextMenus: { remove: { minArgs: 1, maxArgs: 1 }, removeAll: { minArgs: 0, maxArgs: 0 }, update: { minArgs: 2, maxArgs: 2 } }, cookies: { get: { minArgs: 1, maxArgs: 1 }, getAll: { minArgs: 1, maxArgs: 1 }, getAllCookieStores: { minArgs: 0, maxArgs: 0 }, remove: { minArgs: 1, maxArgs: 1 }, set: { minArgs: 1, maxArgs: 1 } }, devtools: { inspectedWindow: { eval: { minArgs: 1, maxArgs: 2, singleCallbackArg: false } }, panels: { create: { minArgs: 3, maxArgs: 3, singleCallbackArg: true }, elements: { createSidebarPane: { minArgs: 1, maxArgs: 1 } } } }, downloads: { cancel: { minArgs: 1, maxArgs: 1 }, download: { minArgs: 1, maxArgs: 1 }, erase: { minArgs: 1, maxArgs: 1 }, getFileIcon: { minArgs: 1, maxArgs: 2 }, open: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: true }, pause: { minArgs: 1, maxArgs: 1 }, removeFile: { minArgs: 1, maxArgs: 1 }, resume: { minArgs: 1, maxArgs: 1 }, search: { minArgs: 1, maxArgs: 1 }, show: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: true } }, extension: { isAllowedFileSchemeAccess: { minArgs: 0, maxArgs: 0 }, isAllowedIncognitoAccess: { minArgs: 0, maxArgs: 0 } }, history: { addUrl: { minArgs: 1, maxArgs: 1 }, deleteAll: { minArgs: 0, maxArgs: 0 }, deleteRange: { minArgs: 1, maxArgs: 1 }, deleteUrl: { minArgs: 1, maxArgs: 1 }, getVisits: { minArgs: 1, maxArgs: 1 }, search: { minArgs: 1, maxArgs: 1 } }, i18n: { detectLanguage: { minArgs: 1, maxArgs: 1 }, getAcceptLanguages: { minArgs: 0, maxArgs: 0 } }, identity: { launchWebAuthFlow: { minArgs: 1, maxArgs: 1 } }, idle: { queryState: { minArgs: 1, maxArgs: 1 } }, management: { get: { minArgs: 1, maxArgs: 1 }, getAll: { minArgs: 0, maxArgs: 0 }, getSelf: { minArgs: 0, maxArgs: 0 }, setEnabled: { minArgs: 2, maxArgs: 2 }, uninstallSelf: { minArgs: 0, maxArgs: 1 } }, notifications: { clear: { minArgs: 1, maxArgs: 1 }, create: { minArgs: 1, maxArgs: 2 }, getAll: { minArgs: 0, maxArgs: 0 }, getPermissionLevel: { minArgs: 0, maxArgs: 0 }, update: { minArgs: 2, maxArgs: 2 } }, pageAction: { getPopup: { minArgs: 1, maxArgs: 1 }, getTitle: { minArgs: 1, maxArgs: 1 }, hide: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: true }, setIcon: { minArgs: 1, maxArgs: 1 }, setPopup: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: true }, setTitle: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: true }, show: { minArgs: 1, maxArgs: 1, fallbackToNoCallback: true } }, permissions: { contains: { minArgs: 1, maxArgs: 1 }, getAll: { minArgs: 0, maxArgs: 0 }, remove: { minArgs: 1, maxArgs: 1 }, request: { minArgs: 1, maxArgs: 1 } }, runtime: { getBackgroundPage: { minArgs: 0, maxArgs: 0 }, getPlatformInfo: { minArgs: 0, maxArgs: 0 }, openOptionsPage: { minArgs: 0, maxArgs: 0 }, requestUpdateCheck: { minArgs: 0, maxArgs: 0 }, sendMessage: { minArgs: 1, maxArgs: 3 }, sendNativeMessage: { minArgs: 2, maxArgs: 2 }, setUninstallURL: { minArgs: 1, maxArgs: 1 } }, sessions: { getDevices: { minArgs: 0, maxArgs: 1 }, getRecentlyClosed: { minArgs: 0, maxArgs: 1 }, restore: { minArgs: 0, maxArgs: 1 } }, storage: { local: { clear: { minArgs: 0, maxArgs: 0 }, get: { minArgs: 0, maxArgs: 1 }, getBytesInUse: { minArgs: 0, maxArgs: 1 }, remove: { minArgs: 1, maxArgs: 1 }, set: { minArgs: 1, maxArgs: 1 } }, managed: { get: { minArgs: 0, maxArgs: 1 }, getBytesInUse: { minArgs: 0, maxArgs: 1 } }, sync: { clear: { minArgs: 0, maxArgs: 0 }, get: { minArgs: 0, maxArgs: 1 }, getBytesInUse: { minArgs: 0, maxArgs: 1 }, remove: { minArgs: 1, maxArgs: 1 }, set: { minArgs: 1, maxArgs: 1 } } }, tabs: { captureVisibleTab: { minArgs: 0, maxArgs: 2 }, create: { minArgs: 1, maxArgs: 1 }, detectLanguage: { minArgs: 0, maxArgs: 1 }, discard: { minArgs: 0, maxArgs: 1 }, duplicate: { minArgs: 1, maxArgs: 1 }, executeScript: { minArgs: 1, maxArgs: 2 }, get: { minArgs: 1, maxArgs: 1 }, getCurrent: { minArgs: 0, maxArgs: 0 }, getZoom: { minArgs: 0, maxArgs: 1 }, getZoomSettings: { minArgs: 0, maxArgs: 1 }, goBack: { minArgs: 0, maxArgs: 1 }, goForward: { minArgs: 0, maxArgs: 1 }, highlight: { minArgs: 1, maxArgs: 1 }, insertCSS: { minArgs: 1, maxArgs: 2 }, move: { minArgs: 2, maxArgs: 2 }, query: { minArgs: 1, maxArgs: 1 }, reload: { minArgs: 0, maxArgs: 2 }, remove: { minArgs: 1, maxArgs: 1 }, removeCSS: { minArgs: 1, maxArgs: 2 }, sendMessage: { minArgs: 2, maxArgs: 3 }, setZoom: { minArgs: 1, maxArgs: 2 }, setZoomSettings: { minArgs: 1, maxArgs: 2 }, update: { minArgs: 1, maxArgs: 2 } }, topSites: { get: { minArgs: 0, maxArgs: 0 } }, webNavigation: { getAllFrames: { minArgs: 1, maxArgs: 1 }, getFrame: { minArgs: 1, maxArgs: 1 } }, webRequest: { handlerBehaviorChanged: { minArgs: 0, maxArgs: 0 } }, windows: { create: { minArgs: 0, maxArgs: 1 }, get: { minArgs: 1, maxArgs: 2 }, getAll: { minArgs: 0, maxArgs: 1 }, getCurrent: { minArgs: 0, maxArgs: 1 }, getLastFocused: { minArgs: 0, maxArgs: 1 }, remove: { minArgs: 1, maxArgs: 1 }, update: { minArgs: 2, maxArgs: 2 } } };
          if (Object.keys(c).length === 0) throw new Error("api-metadata.json has not been included in browser-polyfill");
          class d extends WeakMap {
            constructor(C, M = void 0) {
              super(M), this.createItem = C;
            }
            get(C) {
              return this.has(C) || this.set(C, this.createItem(C)), super.get(C);
            }
          }
          const f = (O) => O && typeof O == "object" && typeof O.then == "function", g = (O, C) => (...M) => {
            o.runtime.lastError ? O.reject(new Error(o.runtime.lastError.message)) : C.singleCallbackArg || M.length <= 1 && C.singleCallbackArg !== false ? O.resolve(M[0]) : O.resolve(M);
          }, b = (O) => O == 1 ? "argument" : "arguments", m = (O, C) => function(Y, ...k) {
            if (k.length < C.minArgs) throw new Error(`Expected at least ${C.minArgs} ${b(C.minArgs)} for ${O}(), got ${k.length}`);
            if (k.length > C.maxArgs) throw new Error(`Expected at most ${C.maxArgs} ${b(C.maxArgs)} for ${O}(), got ${k.length}`);
            return new Promise((P, u) => {
              if (C.fallbackToNoCallback) try {
                Y[O](...k, g({ resolve: P, reject: u }, C));
              } catch (R) {
                console.warn(`${O} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, R), Y[O](...k), C.fallbackToNoCallback = false, C.noCallback = true, P();
              }
              else C.noCallback ? (Y[O](...k), P()) : Y[O](...k, g({ resolve: P, reject: u }, C));
            });
          }, _ = (O, C, M) => new Proxy(C, { apply(Y, k, P) {
            return M.call(k, O, ...P);
          } });
          let h = Function.call.bind(Object.prototype.hasOwnProperty);
          const v = (O, C = {}, M = {}) => {
            let Y = /* @__PURE__ */ Object.create(null), k = { has(u, R) {
              return R in O || R in Y;
            }, get(u, R, Q) {
              if (R in Y) return Y[R];
              if (!(R in O)) return;
              let U = O[R];
              if (typeof U == "function") if (typeof C[R] == "function") U = _(O, O[R], C[R]);
              else if (h(M, R)) {
                let et = m(R, M[R]);
                U = _(O, O[R], et);
              } else U = U.bind(O);
              else if (typeof U == "object" && U !== null && (h(C, R) || h(M, R))) U = v(U, C[R], M[R]);
              else if (h(M, "*")) U = v(U, C[R], M["*"]);
              else return Object.defineProperty(Y, R, { configurable: true, enumerable: true, get() {
                return O[R];
              }, set(et) {
                O[R] = et;
              } }), U;
              return Y[R] = U, U;
            }, set(u, R, Q, U) {
              return R in Y ? Y[R] = Q : O[R] = Q, true;
            }, defineProperty(u, R, Q) {
              return Reflect.defineProperty(Y, R, Q);
            }, deleteProperty(u, R) {
              return Reflect.deleteProperty(Y, R);
            } }, P = Object.create(O);
            return new Proxy(P, k);
          }, p = (O) => ({ addListener(C, M, ...Y) {
            C.addListener(O.get(M), ...Y);
          }, hasListener(C, M) {
            return C.hasListener(O.get(M));
          }, removeListener(C, M) {
            C.removeListener(O.get(M));
          } }), w = new d((O) => typeof O != "function" ? O : function(M) {
            const Y = v(M, {}, { getContent: { minArgs: 0, maxArgs: 0 } });
            O(Y);
          }), x = new d((O) => typeof O != "function" ? O : function(M, Y, k) {
            let P = false, u, R = new Promise((Z) => {
              u = function(J) {
                P = true, Z(J);
              };
            }), Q;
            try {
              Q = O(M, Y, u);
            } catch (Z) {
              Q = Promise.reject(Z);
            }
            const U = Q !== true && f(Q);
            if (Q !== true && !U && !P) return false;
            const et = (Z) => {
              Z.then((J) => {
                k(J);
              }, (J) => {
                let L;
                J && (J instanceof Error || typeof J.message == "string") ? L = J.message : L = "An unexpected error occurred", k({ __mozWebExtensionPolyfillReject__: true, message: L });
              }).catch((J) => {
                console.error("Failed to send onMessage rejected reply", J);
              });
            };
            return et(U ? Q : R), true;
          }), E = ({ reject: O, resolve: C }, M) => {
            o.runtime.lastError ? o.runtime.lastError.message === a ? C() : O(new Error(o.runtime.lastError.message)) : M && M.__mozWebExtensionPolyfillReject__ ? O(new Error(M.message)) : C(M);
          }, S = (O, C, M, ...Y) => {
            if (Y.length < C.minArgs) throw new Error(`Expected at least ${C.minArgs} ${b(C.minArgs)} for ${O}(), got ${Y.length}`);
            if (Y.length > C.maxArgs) throw new Error(`Expected at most ${C.maxArgs} ${b(C.maxArgs)} for ${O}(), got ${Y.length}`);
            return new Promise((k, P) => {
              const u = E.bind(null, { resolve: k, reject: P });
              Y.push(u), M.sendMessage(...Y);
            });
          }, T = { devtools: { network: { onRequestFinished: p(w) } }, runtime: { onMessage: p(x), onMessageExternal: p(x), sendMessage: S.bind(null, "sendMessage", { minArgs: 1, maxArgs: 3 }) }, tabs: { sendMessage: S.bind(null, "sendMessage", { minArgs: 2, maxArgs: 3 }) } }, D = { clear: { minArgs: 1, maxArgs: 1 }, get: { minArgs: 1, maxArgs: 1 }, set: { minArgs: 1, maxArgs: 1 } };
          return c.privacy = { network: { "*": D }, services: { "*": D }, websites: { "*": D } }, v(o, T, c);
        };
        t.exports = s(chrome);
      } else t.exports = globalThis.browser;
    });
  })(_i);
  var browser = _i.exports;
  var browser_polyfill_default = _i.exports;

  // src/content/vendor/jszip.js
  var gi = { exports: {} };
  /*!
  
    JSZip v3.10.1 - A JavaScript class for generating and reading zip files
    <http://stuartk.com/jszip>
  
    (c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
    Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/main/LICENSE.markdown.
  
    JSZip uses the library pako released under the MIT license :
    https://github.com/nodeca/pako/blob/main/LICENSE
    */
  (function(n, e) {
    (function(t) {
      n.exports = t();
    })(function() {
      return (function t(i, r, a) {
        function s(d, f) {
          if (!r[d]) {
            if (!i[d]) {
              var g = typeof Ee == "function" && Ee;
              if (!f && g) return g(d, true);
              if (o) return o(d, true);
              var b = new Error("Cannot find module '" + d + "'");
              throw b.code = "MODULE_NOT_FOUND", b;
            }
            var m = r[d] = { exports: {} };
            i[d][0].call(m.exports, function(_) {
              var h = i[d][1][_];
              return s(h || _);
            }, m, m.exports, t, i, r, a);
          }
          return r[d].exports;
        }
        for (var o = typeof Ee == "function" && Ee, c = 0; c < a.length; c++) s(a[c]);
        return s;
      })({ 1: [function(t, i, r) {
        var a = t("./utils"), s = t("./support"), o = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        r.encode = function(c) {
          for (var d, f, g, b, m, _, h, v = [], p = 0, w = c.length, x = w, E = a.getTypeOf(c) !== "string"; p < c.length; ) x = w - p, g = E ? (d = c[p++], f = p < w ? c[p++] : 0, p < w ? c[p++] : 0) : (d = c.charCodeAt(p++), f = p < w ? c.charCodeAt(p++) : 0, p < w ? c.charCodeAt(p++) : 0), b = d >> 2, m = (3 & d) << 4 | f >> 4, _ = 1 < x ? (15 & f) << 2 | g >> 6 : 64, h = 2 < x ? 63 & g : 64, v.push(o.charAt(b) + o.charAt(m) + o.charAt(_) + o.charAt(h));
          return v.join("");
        }, r.decode = function(c) {
          var d, f, g, b, m, _, h = 0, v = 0, p = "data:";
          if (c.substr(0, p.length) === p) throw new Error("Invalid base64 input, it looks like a data url.");
          var w, x = 3 * (c = c.replace(/[^A-Za-z0-9+/=]/g, "")).length / 4;
          if (c.charAt(c.length - 1) === o.charAt(64) && x--, c.charAt(c.length - 2) === o.charAt(64) && x--, x % 1 != 0) throw new Error("Invalid base64 input, bad content length.");
          for (w = s.uint8array ? new Uint8Array(0 | x) : new Array(0 | x); h < c.length; ) d = o.indexOf(c.charAt(h++)) << 2 | (b = o.indexOf(c.charAt(h++))) >> 4, f = (15 & b) << 4 | (m = o.indexOf(c.charAt(h++))) >> 2, g = (3 & m) << 6 | (_ = o.indexOf(c.charAt(h++))), w[v++] = d, m !== 64 && (w[v++] = f), _ !== 64 && (w[v++] = g);
          return w;
        };
      }, { "./support": 30, "./utils": 32 }], 2: [function(t, i, r) {
        var a = t("./external"), s = t("./stream/DataWorker"), o = t("./stream/Crc32Probe"), c = t("./stream/DataLengthProbe");
        function d(f, g, b, m, _) {
          this.compressedSize = f, this.uncompressedSize = g, this.crc32 = b, this.compression = m, this.compressedContent = _;
        }
        d.prototype = { getContentWorker: function() {
          var f = new s(a.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new c("data_length")), g = this;
          return f.on("end", function() {
            if (this.streamInfo.data_length !== g.uncompressedSize) throw new Error("Bug : uncompressed data size mismatch");
          }), f;
        }, getCompressedWorker: function() {
          return new s(a.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
        } }, d.createWorkerFrom = function(f, g, b) {
          return f.pipe(new o()).pipe(new c("uncompressedSize")).pipe(g.compressWorker(b)).pipe(new c("compressedSize")).withStreamInfo("compression", g);
        }, i.exports = d;
      }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(t, i, r) {
        var a = t("./stream/GenericWorker");
        r.STORE = { magic: "\0\0", compressWorker: function() {
          return new a("STORE compression");
        }, uncompressWorker: function() {
          return new a("STORE decompression");
        } }, r.DEFLATE = t("./flate");
      }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(t, i, r) {
        var a = t("./utils"), s = (function() {
          for (var o, c = [], d = 0; d < 256; d++) {
            o = d;
            for (var f = 0; f < 8; f++) o = 1 & o ? 3988292384 ^ o >>> 1 : o >>> 1;
            c[d] = o;
          }
          return c;
        })();
        i.exports = function(o, c) {
          return o !== void 0 && o.length ? a.getTypeOf(o) !== "string" ? (function(d, f, g, b) {
            var m = s, _ = b + g;
            d ^= -1;
            for (var h = b; h < _; h++) d = d >>> 8 ^ m[255 & (d ^ f[h])];
            return -1 ^ d;
          })(0 | c, o, o.length, 0) : (function(d, f, g, b) {
            var m = s, _ = b + g;
            d ^= -1;
            for (var h = b; h < _; h++) d = d >>> 8 ^ m[255 & (d ^ f.charCodeAt(h))];
            return -1 ^ d;
          })(0 | c, o, o.length, 0) : 0;
        };
      }, { "./utils": 32 }], 5: [function(t, i, r) {
        r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
      }, {}], 6: [function(t, i, r) {
        var a = null;
        a = typeof Promise < "u" ? Promise : t("lie"), i.exports = { Promise: a };
      }, { lie: 37 }], 7: [function(t, i, r) {
        var a = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Uint32Array < "u", s = t("pako"), o = t("./utils"), c = t("./stream/GenericWorker"), d = a ? "uint8array" : "array";
        function f(g, b) {
          c.call(this, "FlateWorker/" + g), this._pako = null, this._pakoAction = g, this._pakoOptions = b, this.meta = {};
        }
        r.magic = "\b\0", o.inherits(f, c), f.prototype.processChunk = function(g) {
          this.meta = g.meta, this._pako === null && this._createPako(), this._pako.push(o.transformTo(d, g.data), false);
        }, f.prototype.flush = function() {
          c.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], true);
        }, f.prototype.cleanUp = function() {
          c.prototype.cleanUp.call(this), this._pako = null;
        }, f.prototype._createPako = function() {
          this._pako = new s[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
          var g = this;
          this._pako.onData = function(b) {
            g.push({ data: b, meta: g.meta });
          };
        }, r.compressWorker = function(g) {
          return new f("Deflate", g);
        }, r.uncompressWorker = function() {
          return new f("Inflate", {});
        };
      }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(t, i, r) {
        function a(m, _) {
          var h, v = "";
          for (h = 0; h < _; h++) v += String.fromCharCode(255 & m), m >>>= 8;
          return v;
        }
        function s(m, _, h, v, p, w) {
          var x, E, S = m.file, T = m.compression, D = w !== d.utf8encode, O = o.transformTo("string", w(S.name)), C = o.transformTo("string", d.utf8encode(S.name)), M = S.comment, Y = o.transformTo("string", w(M)), k = o.transformTo("string", d.utf8encode(M)), P = C.length !== S.name.length, u = k.length !== M.length, R = "", Q = "", U = "", et = S.dir, Z = S.date, J = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
          _ && !h || (J.crc32 = m.crc32, J.compressedSize = m.compressedSize, J.uncompressedSize = m.uncompressedSize);
          var L = 0;
          _ && (L |= 8), D || !P && !u || (L |= 2048);
          var N = 0, nt = 0;
          et && (N |= 16), p === "UNIX" ? (nt = 798, N |= (function(G, gt) {
            var _t = G;
            return G || (_t = gt ? 16893 : 33204), (65535 & _t) << 16;
          })(S.unixPermissions, et)) : (nt = 20, N |= (function(G) {
            return 63 & (G || 0);
          })(S.dosPermissions)), x = Z.getUTCHours(), x <<= 6, x |= Z.getUTCMinutes(), x <<= 5, x |= Z.getUTCSeconds() / 2, E = Z.getUTCFullYear() - 1980, E <<= 4, E |= Z.getUTCMonth() + 1, E <<= 5, E |= Z.getUTCDate(), P && (Q = a(1, 1) + a(f(O), 4) + C, R += "up" + a(Q.length, 2) + Q), u && (U = a(1, 1) + a(f(Y), 4) + k, R += "uc" + a(U.length, 2) + U);
          var K = "";
          return K += `
\0`, K += a(L, 2), K += T.magic, K += a(x, 2), K += a(E, 2), K += a(J.crc32, 4), K += a(J.compressedSize, 4), K += a(J.uncompressedSize, 4), K += a(O.length, 2), K += a(R.length, 2), { fileRecord: g.LOCAL_FILE_HEADER + K + O + R, dirRecord: g.CENTRAL_FILE_HEADER + a(nt, 2) + K + a(Y.length, 2) + "\0\0\0\0" + a(N, 4) + a(v, 4) + O + R + Y };
        }
        var o = t("../utils"), c = t("../stream/GenericWorker"), d = t("../utf8"), f = t("../crc32"), g = t("../signature");
        function b(m, _, h, v) {
          c.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = _, this.zipPlatform = h, this.encodeFileName = v, this.streamFiles = m, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
        }
        o.inherits(b, c), b.prototype.push = function(m) {
          var _ = m.meta.percent || 0, h = this.entriesCount, v = this._sources.length;
          this.accumulate ? this.contentBuffer.push(m) : (this.bytesWritten += m.data.length, c.prototype.push.call(this, { data: m.data, meta: { currentFile: this.currentFile, percent: h ? (_ + 100 * (h - v - 1)) / h : 100 } }));
        }, b.prototype.openedSource = function(m) {
          this.currentSourceOffset = this.bytesWritten, this.currentFile = m.file.name;
          var _ = this.streamFiles && !m.file.dir;
          if (_) {
            var h = s(m, _, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
            this.push({ data: h.fileRecord, meta: { percent: 0 } });
          } else this.accumulate = true;
        }, b.prototype.closedSource = function(m) {
          this.accumulate = false;
          var _ = this.streamFiles && !m.file.dir, h = s(m, _, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          if (this.dirRecords.push(h.dirRecord), _) this.push({ data: (function(v) {
            return g.DATA_DESCRIPTOR + a(v.crc32, 4) + a(v.compressedSize, 4) + a(v.uncompressedSize, 4);
          })(m), meta: { percent: 100 } });
          else for (this.push({ data: h.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; ) this.push(this.contentBuffer.shift());
          this.currentFile = null;
        }, b.prototype.flush = function() {
          for (var m = this.bytesWritten, _ = 0; _ < this.dirRecords.length; _++) this.push({ data: this.dirRecords[_], meta: { percent: 100 } });
          var h = this.bytesWritten - m, v = (function(p, w, x, E, S) {
            var T = o.transformTo("string", S(E));
            return g.CENTRAL_DIRECTORY_END + "\0\0\0\0" + a(p, 2) + a(p, 2) + a(w, 4) + a(x, 4) + a(T.length, 2) + T;
          })(this.dirRecords.length, h, m, this.zipComment, this.encodeFileName);
          this.push({ data: v, meta: { percent: 100 } });
        }, b.prototype.prepareNextSource = function() {
          this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
        }, b.prototype.registerPrevious = function(m) {
          this._sources.push(m);
          var _ = this;
          return m.on("data", function(h) {
            _.processChunk(h);
          }), m.on("end", function() {
            _.closedSource(_.previous.streamInfo), _._sources.length ? _.prepareNextSource() : _.end();
          }), m.on("error", function(h) {
            _.error(h);
          }), this;
        }, b.prototype.resume = function() {
          return !!c.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
        }, b.prototype.error = function(m) {
          var _ = this._sources;
          if (!c.prototype.error.call(this, m)) return false;
          for (var h = 0; h < _.length; h++) try {
            _[h].error(m);
          } catch {
          }
          return true;
        }, b.prototype.lock = function() {
          c.prototype.lock.call(this);
          for (var m = this._sources, _ = 0; _ < m.length; _++) m[_].lock();
        }, i.exports = b;
      }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(t, i, r) {
        var a = t("../compressions"), s = t("./ZipFileWorker");
        r.generateWorker = function(o, c, d) {
          var f = new s(c.streamFiles, d, c.platform, c.encodeFileName), g = 0;
          try {
            o.forEach(function(b, m) {
              g++;
              var _ = (function(w, x) {
                var E = w || x, S = a[E];
                if (!S) throw new Error(E + " is not a valid compression method !");
                return S;
              })(m.options.compression, c.compression), h = m.options.compressionOptions || c.compressionOptions || {}, v = m.dir, p = m.date;
              m._compressWorker(_, h).withStreamInfo("file", { name: b, dir: v, date: p, comment: m.comment || "", unixPermissions: m.unixPermissions, dosPermissions: m.dosPermissions }).pipe(f);
            }), f.entriesCount = g;
          } catch (b) {
            f.error(b);
          }
          return f;
        };
      }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(t, i, r) {
        function a() {
          if (!(this instanceof a)) return new a();
          if (arguments.length) throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
          this.files = /* @__PURE__ */ Object.create(null), this.comment = null, this.root = "", this.clone = function() {
            var s = new a();
            for (var o in this) typeof this[o] != "function" && (s[o] = this[o]);
            return s;
          };
        }
        (a.prototype = t("./object")).loadAsync = t("./load"), a.support = t("./support"), a.defaults = t("./defaults"), a.version = "3.10.1", a.loadAsync = function(s, o) {
          return new a().loadAsync(s, o);
        }, a.external = t("./external"), i.exports = a;
      }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(t, i, r) {
        var a = t("./utils"), s = t("./external"), o = t("./utf8"), c = t("./zipEntries"), d = t("./stream/Crc32Probe"), f = t("./nodejsUtils");
        function g(b) {
          return new s.Promise(function(m, _) {
            var h = b.decompressed.getContentWorker().pipe(new d());
            h.on("error", function(v) {
              _(v);
            }).on("end", function() {
              h.streamInfo.crc32 !== b.decompressed.crc32 ? _(new Error("Corrupted zip : CRC32 mismatch")) : m();
            }).resume();
          });
        }
        i.exports = function(b, m) {
          var _ = this;
          return m = a.extend(m || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: o.utf8decode }), f.isNode && f.isStream(b) ? s.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : a.prepareContent("the loaded zip file", b, true, m.optimizedBinaryString, m.base64).then(function(h) {
            var v = new c(m);
            return v.load(h), v;
          }).then(function(h) {
            var v = [s.Promise.resolve(h)], p = h.files;
            if (m.checkCRC32) for (var w = 0; w < p.length; w++) v.push(g(p[w]));
            return s.Promise.all(v);
          }).then(function(h) {
            for (var v = h.shift(), p = v.files, w = 0; w < p.length; w++) {
              var x = p[w], E = x.fileNameStr, S = a.resolve(x.fileNameStr);
              _.file(S, x.decompressed, { binary: true, optimizedBinaryString: true, date: x.date, dir: x.dir, comment: x.fileCommentStr.length ? x.fileCommentStr : null, unixPermissions: x.unixPermissions, dosPermissions: x.dosPermissions, createFolders: m.createFolders }), x.dir || (_.file(S).unsafeOriginalName = E);
            }
            return v.zipComment.length && (_.comment = v.zipComment), _;
          });
        };
      }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(t, i, r) {
        var a = t("../utils"), s = t("../stream/GenericWorker");
        function o(c, d) {
          s.call(this, "Nodejs stream input adapter for " + c), this._upstreamEnded = false, this._bindStream(d);
        }
        a.inherits(o, s), o.prototype._bindStream = function(c) {
          var d = this;
          (this._stream = c).pause(), c.on("data", function(f) {
            d.push({ data: f, meta: { percent: 0 } });
          }).on("error", function(f) {
            d.isPaused ? this.generatedError = f : d.error(f);
          }).on("end", function() {
            d.isPaused ? d._upstreamEnded = true : d.end();
          });
        }, o.prototype.pause = function() {
          return !!s.prototype.pause.call(this) && (this._stream.pause(), true);
        }, o.prototype.resume = function() {
          return !!s.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
        }, i.exports = o;
      }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(t, i, r) {
        var a = t("readable-stream").Readable;
        function s(o, c, d) {
          a.call(this, c), this._helper = o;
          var f = this;
          o.on("data", function(g, b) {
            f.push(g) || f._helper.pause(), d && d(b);
          }).on("error", function(g) {
            f.emit("error", g);
          }).on("end", function() {
            f.push(null);
          });
        }
        t("../utils").inherits(s, a), s.prototype._read = function() {
          this._helper.resume();
        }, i.exports = s;
      }, { "../utils": 32, "readable-stream": 16 }], 14: [function(t, i, r) {
        i.exports = { isNode: typeof Buffer < "u", newBufferFrom: function(a, s) {
          if (Buffer.from && Buffer.from !== Uint8Array.from) return Buffer.from(a, s);
          if (typeof a == "number") throw new Error('The "data" argument must not be a number');
          return new Buffer(a, s);
        }, allocBuffer: function(a) {
          if (Buffer.alloc) return Buffer.alloc(a);
          var s = new Buffer(a);
          return s.fill(0), s;
        }, isBuffer: function(a) {
          return Buffer.isBuffer(a);
        }, isStream: function(a) {
          return a && typeof a.on == "function" && typeof a.pause == "function" && typeof a.resume == "function";
        } };
      }, {}], 15: [function(t, i, r) {
        function a(S, T, D) {
          var O, C = o.getTypeOf(T), M = o.extend(D || {}, f);
          M.date = M.date || /* @__PURE__ */ new Date(), M.compression !== null && (M.compression = M.compression.toUpperCase()), typeof M.unixPermissions == "string" && (M.unixPermissions = parseInt(M.unixPermissions, 8)), M.unixPermissions && 16384 & M.unixPermissions && (M.dir = true), M.dosPermissions && 16 & M.dosPermissions && (M.dir = true), M.dir && (S = p(S)), M.createFolders && (O = v(S)) && w.call(this, O, true);
          var Y = C === "string" && M.binary === false && M.base64 === false;
          D && D.binary !== void 0 || (M.binary = !Y), (T instanceof g && T.uncompressedSize === 0 || M.dir || !T || T.length === 0) && (M.base64 = false, M.binary = true, T = "", M.compression = "STORE", C = "string");
          var k = null;
          k = T instanceof g || T instanceof c ? T : _.isNode && _.isStream(T) ? new h(S, T) : o.prepareContent(S, T, M.binary, M.optimizedBinaryString, M.base64);
          var P = new b(S, k, M);
          this.files[S] = P;
        }
        var s = t("./utf8"), o = t("./utils"), c = t("./stream/GenericWorker"), d = t("./stream/StreamHelper"), f = t("./defaults"), g = t("./compressedObject"), b = t("./zipObject"), m = t("./generate"), _ = t("./nodejsUtils"), h = t("./nodejs/NodejsStreamInputAdapter"), v = function(S) {
          S.slice(-1) === "/" && (S = S.substring(0, S.length - 1));
          var T = S.lastIndexOf("/");
          return 0 < T ? S.substring(0, T) : "";
        }, p = function(S) {
          return S.slice(-1) !== "/" && (S += "/"), S;
        }, w = function(S, T) {
          return T = T !== void 0 ? T : f.createFolders, S = p(S), this.files[S] || a.call(this, S, null, { dir: true, createFolders: T }), this.files[S];
        };
        function x(S) {
          return Object.prototype.toString.call(S) === "[object RegExp]";
        }
        var E = { load: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, forEach: function(S) {
          var T, D, O;
          for (T in this.files) O = this.files[T], (D = T.slice(this.root.length, T.length)) && T.slice(0, this.root.length) === this.root && S(D, O);
        }, filter: function(S) {
          var T = [];
          return this.forEach(function(D, O) {
            S(D, O) && T.push(O);
          }), T;
        }, file: function(S, T, D) {
          if (arguments.length !== 1) return S = this.root + S, a.call(this, S, T, D), this;
          if (x(S)) {
            var O = S;
            return this.filter(function(M, Y) {
              return !Y.dir && O.test(M);
            });
          }
          var C = this.files[this.root + S];
          return C && !C.dir ? C : null;
        }, folder: function(S) {
          if (!S) return this;
          if (x(S)) return this.filter(function(C, M) {
            return M.dir && S.test(C);
          });
          var T = this.root + S, D = w.call(this, T), O = this.clone();
          return O.root = D.name, O;
        }, remove: function(S) {
          S = this.root + S;
          var T = this.files[S];
          if (T || (S.slice(-1) !== "/" && (S += "/"), T = this.files[S]), T && !T.dir) delete this.files[S];
          else for (var D = this.filter(function(C, M) {
            return M.name.slice(0, S.length) === S;
          }), O = 0; O < D.length; O++) delete this.files[D[O].name];
          return this;
        }, generate: function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, generateInternalStream: function(S) {
          var T, D = {};
          try {
            if ((D = o.extend(S || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: s.utf8encode })).type = D.type.toLowerCase(), D.compression = D.compression.toUpperCase(), D.type === "binarystring" && (D.type = "string"), !D.type) throw new Error("No output type specified.");
            o.checkSupport(D.type), D.platform !== "darwin" && D.platform !== "freebsd" && D.platform !== "linux" && D.platform !== "sunos" || (D.platform = "UNIX"), D.platform === "win32" && (D.platform = "DOS");
            var O = D.comment || this.comment || "";
            T = m.generateWorker(this, D, O);
          } catch (C) {
            (T = new c("error")).error(C);
          }
          return new d(T, D.type || "string", D.mimeType);
        }, generateAsync: function(S, T) {
          return this.generateInternalStream(S).accumulate(T);
        }, generateNodeStream: function(S, T) {
          return (S = S || {}).type || (S.type = "nodebuffer"), this.generateInternalStream(S).toNodejsStream(T);
        } };
        i.exports = E;
      }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(t, i, r) {
        i.exports = t("stream");
      }, { stream: void 0 }], 17: [function(t, i, r) {
        var a = t("./DataReader");
        function s(o) {
          a.call(this, o);
          for (var c = 0; c < this.data.length; c++) o[c] = 255 & o[c];
        }
        t("../utils").inherits(s, a), s.prototype.byteAt = function(o) {
          return this.data[this.zero + o];
        }, s.prototype.lastIndexOfSignature = function(o) {
          for (var c = o.charCodeAt(0), d = o.charCodeAt(1), f = o.charCodeAt(2), g = o.charCodeAt(3), b = this.length - 4; 0 <= b; --b) if (this.data[b] === c && this.data[b + 1] === d && this.data[b + 2] === f && this.data[b + 3] === g) return b - this.zero;
          return -1;
        }, s.prototype.readAndCheckSignature = function(o) {
          var c = o.charCodeAt(0), d = o.charCodeAt(1), f = o.charCodeAt(2), g = o.charCodeAt(3), b = this.readData(4);
          return c === b[0] && d === b[1] && f === b[2] && g === b[3];
        }, s.prototype.readData = function(o) {
          if (this.checkOffset(o), o === 0) return [];
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, c;
        }, i.exports = s;
      }, { "../utils": 32, "./DataReader": 18 }], 18: [function(t, i, r) {
        var a = t("../utils");
        function s(o) {
          this.data = o, this.length = o.length, this.index = 0, this.zero = 0;
        }
        s.prototype = { checkOffset: function(o) {
          this.checkIndex(this.index + o);
        }, checkIndex: function(o) {
          if (this.length < this.zero + o || o < 0) throw new Error("End of data reached (data length = " + this.length + ", asked index = " + o + "). Corrupted zip ?");
        }, setIndex: function(o) {
          this.checkIndex(o), this.index = o;
        }, skip: function(o) {
          this.setIndex(this.index + o);
        }, byteAt: function() {
        }, readInt: function(o) {
          var c, d = 0;
          for (this.checkOffset(o), c = this.index + o - 1; c >= this.index; c--) d = (d << 8) + this.byteAt(c);
          return this.index += o, d;
        }, readString: function(o) {
          return a.transformTo("string", this.readData(o));
        }, readData: function() {
        }, lastIndexOfSignature: function() {
        }, readAndCheckSignature: function() {
        }, readDate: function() {
          var o = this.readInt(4);
          return new Date(Date.UTC(1980 + (o >> 25 & 127), (o >> 21 & 15) - 1, o >> 16 & 31, o >> 11 & 31, o >> 5 & 63, (31 & o) << 1));
        } }, i.exports = s;
      }, { "../utils": 32 }], 19: [function(t, i, r) {
        var a = t("./Uint8ArrayReader");
        function s(o) {
          a.call(this, o);
        }
        t("../utils").inherits(s, a), s.prototype.readData = function(o) {
          this.checkOffset(o);
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, c;
        }, i.exports = s;
      }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(t, i, r) {
        var a = t("./DataReader");
        function s(o) {
          a.call(this, o);
        }
        t("../utils").inherits(s, a), s.prototype.byteAt = function(o) {
          return this.data.charCodeAt(this.zero + o);
        }, s.prototype.lastIndexOfSignature = function(o) {
          return this.data.lastIndexOf(o) - this.zero;
        }, s.prototype.readAndCheckSignature = function(o) {
          return o === this.readData(4);
        }, s.prototype.readData = function(o) {
          this.checkOffset(o);
          var c = this.data.slice(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, c;
        }, i.exports = s;
      }, { "../utils": 32, "./DataReader": 18 }], 21: [function(t, i, r) {
        var a = t("./ArrayReader");
        function s(o) {
          a.call(this, o);
        }
        t("../utils").inherits(s, a), s.prototype.readData = function(o) {
          if (this.checkOffset(o), o === 0) return new Uint8Array(0);
          var c = this.data.subarray(this.zero + this.index, this.zero + this.index + o);
          return this.index += o, c;
        }, i.exports = s;
      }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(t, i, r) {
        var a = t("../utils"), s = t("../support"), o = t("./ArrayReader"), c = t("./StringReader"), d = t("./NodeBufferReader"), f = t("./Uint8ArrayReader");
        i.exports = function(g) {
          var b = a.getTypeOf(g);
          return a.checkSupport(b), b !== "string" || s.uint8array ? b === "nodebuffer" ? new d(g) : s.uint8array ? new f(a.transformTo("uint8array", g)) : new o(a.transformTo("array", g)) : new c(g);
        };
      }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(t, i, r) {
        r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
      }, {}], 24: [function(t, i, r) {
        var a = t("./GenericWorker"), s = t("../utils");
        function o(c) {
          a.call(this, "ConvertWorker to " + c), this.destType = c;
        }
        s.inherits(o, a), o.prototype.processChunk = function(c) {
          this.push({ data: s.transformTo(this.destType, c.data), meta: c.meta });
        }, i.exports = o;
      }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(t, i, r) {
        var a = t("./GenericWorker"), s = t("../crc32");
        function o() {
          a.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
        }
        t("../utils").inherits(o, a), o.prototype.processChunk = function(c) {
          this.streamInfo.crc32 = s(c.data, this.streamInfo.crc32 || 0), this.push(c);
        }, i.exports = o;
      }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(t, i, r) {
        var a = t("../utils"), s = t("./GenericWorker");
        function o(c) {
          s.call(this, "DataLengthProbe for " + c), this.propName = c, this.withStreamInfo(c, 0);
        }
        a.inherits(o, s), o.prototype.processChunk = function(c) {
          if (c) {
            var d = this.streamInfo[this.propName] || 0;
            this.streamInfo[this.propName] = d + c.data.length;
          }
          s.prototype.processChunk.call(this, c);
        }, i.exports = o;
      }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(t, i, r) {
        var a = t("../utils"), s = t("./GenericWorker");
        function o(c) {
          s.call(this, "DataWorker");
          var d = this;
          this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, c.then(function(f) {
            d.dataIsReady = true, d.data = f, d.max = f && f.length || 0, d.type = a.getTypeOf(f), d.isPaused || d._tickAndRepeat();
          }, function(f) {
            d.error(f);
          });
        }
        a.inherits(o, s), o.prototype.cleanUp = function() {
          s.prototype.cleanUp.call(this), this.data = null;
        }, o.prototype.resume = function() {
          return !!s.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, a.delay(this._tickAndRepeat, [], this)), true);
        }, o.prototype._tickAndRepeat = function() {
          this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (a.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
        }, o.prototype._tick = function() {
          if (this.isPaused || this.isFinished) return false;
          var c = null, d = Math.min(this.max, this.index + 16384);
          if (this.index >= this.max) return this.end();
          switch (this.type) {
            case "string":
              c = this.data.substring(this.index, d);
              break;
            case "uint8array":
              c = this.data.subarray(this.index, d);
              break;
            case "array":
            case "nodebuffer":
              c = this.data.slice(this.index, d);
          }
          return this.index = d, this.push({ data: c, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
        }, i.exports = o;
      }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(t, i, r) {
        function a(s) {
          this.name = s || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
        }
        a.prototype = { push: function(s) {
          this.emit("data", s);
        }, end: function() {
          if (this.isFinished) return false;
          this.flush();
          try {
            this.emit("end"), this.cleanUp(), this.isFinished = true;
          } catch (s) {
            this.emit("error", s);
          }
          return true;
        }, error: function(s) {
          return !this.isFinished && (this.isPaused ? this.generatedError = s : (this.isFinished = true, this.emit("error", s), this.previous && this.previous.error(s), this.cleanUp()), true);
        }, on: function(s, o) {
          return this._listeners[s].push(o), this;
        }, cleanUp: function() {
          this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
        }, emit: function(s, o) {
          if (this._listeners[s]) for (var c = 0; c < this._listeners[s].length; c++) this._listeners[s][c].call(this, o);
        }, pipe: function(s) {
          return s.registerPrevious(this);
        }, registerPrevious: function(s) {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.streamInfo = s.streamInfo, this.mergeStreamInfo(), this.previous = s;
          var o = this;
          return s.on("data", function(c) {
            o.processChunk(c);
          }), s.on("end", function() {
            o.end();
          }), s.on("error", function(c) {
            o.error(c);
          }), this;
        }, pause: function() {
          return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
        }, resume: function() {
          if (!this.isPaused || this.isFinished) return false;
          var s = this.isPaused = false;
          return this.generatedError && (this.error(this.generatedError), s = true), this.previous && this.previous.resume(), !s;
        }, flush: function() {
        }, processChunk: function(s) {
          this.push(s);
        }, withStreamInfo: function(s, o) {
          return this.extraStreamInfo[s] = o, this.mergeStreamInfo(), this;
        }, mergeStreamInfo: function() {
          for (var s in this.extraStreamInfo) Object.prototype.hasOwnProperty.call(this.extraStreamInfo, s) && (this.streamInfo[s] = this.extraStreamInfo[s]);
        }, lock: function() {
          if (this.isLocked) throw new Error("The stream '" + this + "' has already been used.");
          this.isLocked = true, this.previous && this.previous.lock();
        }, toString: function() {
          var s = "Worker " + this.name;
          return this.previous ? this.previous + " -> " + s : s;
        } }, i.exports = a;
      }, {}], 29: [function(t, i, r) {
        var a = t("../utils"), s = t("./ConvertWorker"), o = t("./GenericWorker"), c = t("../base64"), d = t("../support"), f = t("../external"), g = null;
        if (d.nodestream) try {
          g = t("../nodejs/NodejsStreamOutputAdapter");
        } catch {
        }
        function b(_, h) {
          return new f.Promise(function(v, p) {
            var w = [], x = _._internalType, E = _._outputType, S = _._mimeType;
            _.on("data", function(T, D) {
              w.push(T), h && h(D);
            }).on("error", function(T) {
              w = [], p(T);
            }).on("end", function() {
              try {
                var T = (function(D, O, C) {
                  switch (D) {
                    case "blob":
                      return a.newBlob(a.transformTo("arraybuffer", O), C);
                    case "base64":
                      return c.encode(O);
                    default:
                      return a.transformTo(D, O);
                  }
                })(E, (function(D, O) {
                  var C, M = 0, Y = null, k = 0;
                  for (C = 0; C < O.length; C++) k += O[C].length;
                  switch (D) {
                    case "string":
                      return O.join("");
                    case "array":
                      return Array.prototype.concat.apply([], O);
                    case "uint8array":
                      for (Y = new Uint8Array(k), C = 0; C < O.length; C++) Y.set(O[C], M), M += O[C].length;
                      return Y;
                    case "nodebuffer":
                      return Buffer.concat(O);
                    default:
                      throw new Error("concat : unsupported type '" + D + "'");
                  }
                })(x, w), S);
                v(T);
              } catch (D) {
                p(D);
              }
              w = [];
            }).resume();
          });
        }
        function m(_, h, v) {
          var p = h;
          switch (h) {
            case "blob":
            case "arraybuffer":
              p = "uint8array";
              break;
            case "base64":
              p = "string";
          }
          try {
            this._internalType = p, this._outputType = h, this._mimeType = v, a.checkSupport(p), this._worker = _.pipe(new s(p)), _.lock();
          } catch (w) {
            this._worker = new o("error"), this._worker.error(w);
          }
        }
        m.prototype = { accumulate: function(_) {
          return b(this, _);
        }, on: function(_, h) {
          var v = this;
          return _ === "data" ? this._worker.on(_, function(p) {
            h.call(v, p.data, p.meta);
          }) : this._worker.on(_, function() {
            a.delay(h, arguments, v);
          }), this;
        }, resume: function() {
          return a.delay(this._worker.resume, [], this._worker), this;
        }, pause: function() {
          return this._worker.pause(), this;
        }, toNodejsStream: function(_) {
          if (a.checkSupport("nodestream"), this._outputType !== "nodebuffer") throw new Error(this._outputType + " is not supported by this method");
          return new g(this, { objectMode: this._outputType !== "nodebuffer" }, _);
        } }, i.exports = m;
      }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(t, i, r) {
        if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = typeof ArrayBuffer < "u" && typeof Uint8Array < "u", r.nodebuffer = typeof Buffer < "u", r.uint8array = typeof Uint8Array < "u", typeof ArrayBuffer > "u") r.blob = false;
        else {
          var a = new ArrayBuffer(0);
          try {
            r.blob = new Blob([a], { type: "application/zip" }).size === 0;
          } catch {
            try {
              var s = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              s.append(a), r.blob = s.getBlob("application/zip").size === 0;
            } catch {
              r.blob = false;
            }
          }
        }
        try {
          r.nodestream = !!t("readable-stream").Readable;
        } catch {
          r.nodestream = false;
        }
      }, { "readable-stream": 16 }], 31: [function(t, i, r) {
        for (var a = t("./utils"), s = t("./support"), o = t("./nodejsUtils"), c = t("./stream/GenericWorker"), d = new Array(256), f = 0; f < 256; f++) d[f] = 252 <= f ? 6 : 248 <= f ? 5 : 240 <= f ? 4 : 224 <= f ? 3 : 192 <= f ? 2 : 1;
        d[254] = d[254] = 1;
        function g() {
          c.call(this, "utf-8 decode"), this.leftOver = null;
        }
        function b() {
          c.call(this, "utf-8 encode");
        }
        r.utf8encode = function(m) {
          return s.nodebuffer ? o.newBufferFrom(m, "utf-8") : (function(_) {
            var h, v, p, w, x, E = _.length, S = 0;
            for (w = 0; w < E; w++) (64512 & (v = _.charCodeAt(w))) == 55296 && w + 1 < E && (64512 & (p = _.charCodeAt(w + 1))) == 56320 && (v = 65536 + (v - 55296 << 10) + (p - 56320), w++), S += v < 128 ? 1 : v < 2048 ? 2 : v < 65536 ? 3 : 4;
            for (h = s.uint8array ? new Uint8Array(S) : new Array(S), w = x = 0; x < S; w++) (64512 & (v = _.charCodeAt(w))) == 55296 && w + 1 < E && (64512 & (p = _.charCodeAt(w + 1))) == 56320 && (v = 65536 + (v - 55296 << 10) + (p - 56320), w++), v < 128 ? h[x++] = v : (v < 2048 ? h[x++] = 192 | v >>> 6 : (v < 65536 ? h[x++] = 224 | v >>> 12 : (h[x++] = 240 | v >>> 18, h[x++] = 128 | v >>> 12 & 63), h[x++] = 128 | v >>> 6 & 63), h[x++] = 128 | 63 & v);
            return h;
          })(m);
        }, r.utf8decode = function(m) {
          return s.nodebuffer ? a.transformTo("nodebuffer", m).toString("utf-8") : (function(_) {
            var h, v, p, w, x = _.length, E = new Array(2 * x);
            for (h = v = 0; h < x; ) if ((p = _[h++]) < 128) E[v++] = p;
            else if (4 < (w = d[p])) E[v++] = 65533, h += w - 1;
            else {
              for (p &= w === 2 ? 31 : w === 3 ? 15 : 7; 1 < w && h < x; ) p = p << 6 | 63 & _[h++], w--;
              1 < w ? E[v++] = 65533 : p < 65536 ? E[v++] = p : (p -= 65536, E[v++] = 55296 | p >> 10 & 1023, E[v++] = 56320 | 1023 & p);
            }
            return E.length !== v && (E.subarray ? E = E.subarray(0, v) : E.length = v), a.applyFromCharCode(E);
          })(m = a.transformTo(s.uint8array ? "uint8array" : "array", m));
        }, a.inherits(g, c), g.prototype.processChunk = function(m) {
          var _ = a.transformTo(s.uint8array ? "uint8array" : "array", m.data);
          if (this.leftOver && this.leftOver.length) {
            if (s.uint8array) {
              var h = _;
              (_ = new Uint8Array(h.length + this.leftOver.length)).set(this.leftOver, 0), _.set(h, this.leftOver.length);
            } else _ = this.leftOver.concat(_);
            this.leftOver = null;
          }
          var v = (function(w, x) {
            var E;
            for ((x = x || w.length) > w.length && (x = w.length), E = x - 1; 0 <= E && (192 & w[E]) == 128; ) E--;
            return E < 0 || E === 0 ? x : E + d[w[E]] > x ? E : x;
          })(_), p = _;
          v !== _.length && (s.uint8array ? (p = _.subarray(0, v), this.leftOver = _.subarray(v, _.length)) : (p = _.slice(0, v), this.leftOver = _.slice(v, _.length))), this.push({ data: r.utf8decode(p), meta: m.meta });
        }, g.prototype.flush = function() {
          this.leftOver && this.leftOver.length && (this.push({ data: r.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
        }, r.Utf8DecodeWorker = g, a.inherits(b, c), b.prototype.processChunk = function(m) {
          this.push({ data: r.utf8encode(m.data), meta: m.meta });
        }, r.Utf8EncodeWorker = b;
      }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(t, i, r) {
        var a = t("./support"), s = t("./base64"), o = t("./nodejsUtils"), c = t("./external");
        function d(h) {
          return h;
        }
        function f(h, v) {
          for (var p = 0; p < h.length; ++p) v[p] = 255 & h.charCodeAt(p);
          return v;
        }
        t("setimmediate"), r.newBlob = function(h, v) {
          r.checkSupport("blob");
          try {
            return new Blob([h], { type: v });
          } catch {
            try {
              var p = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
              return p.append(h), p.getBlob(v);
            } catch {
              throw new Error("Bug : can't construct the Blob.");
            }
          }
        };
        var g = { stringifyByChunk: function(h, v, p) {
          var w = [], x = 0, E = h.length;
          if (E <= p) return String.fromCharCode.apply(null, h);
          for (; x < E; ) v === "array" || v === "nodebuffer" ? w.push(String.fromCharCode.apply(null, h.slice(x, Math.min(x + p, E)))) : w.push(String.fromCharCode.apply(null, h.subarray(x, Math.min(x + p, E)))), x += p;
          return w.join("");
        }, stringifyByChar: function(h) {
          for (var v = "", p = 0; p < h.length; p++) v += String.fromCharCode(h[p]);
          return v;
        }, applyCanBeUsed: { uint8array: (function() {
          try {
            return a.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
          } catch {
            return false;
          }
        })(), nodebuffer: (function() {
          try {
            return a.nodebuffer && String.fromCharCode.apply(null, o.allocBuffer(1)).length === 1;
          } catch {
            return false;
          }
        })() } };
        function b(h) {
          var v = 65536, p = r.getTypeOf(h), w = true;
          if (p === "uint8array" ? w = g.applyCanBeUsed.uint8array : p === "nodebuffer" && (w = g.applyCanBeUsed.nodebuffer), w) for (; 1 < v; ) try {
            return g.stringifyByChunk(h, p, v);
          } catch {
            v = Math.floor(v / 2);
          }
          return g.stringifyByChar(h);
        }
        function m(h, v) {
          for (var p = 0; p < h.length; p++) v[p] = h[p];
          return v;
        }
        r.applyFromCharCode = b;
        var _ = {};
        _.string = { string: d, array: function(h) {
          return f(h, new Array(h.length));
        }, arraybuffer: function(h) {
          return _.string.uint8array(h).buffer;
        }, uint8array: function(h) {
          return f(h, new Uint8Array(h.length));
        }, nodebuffer: function(h) {
          return f(h, o.allocBuffer(h.length));
        } }, _.array = { string: b, array: d, arraybuffer: function(h) {
          return new Uint8Array(h).buffer;
        }, uint8array: function(h) {
          return new Uint8Array(h);
        }, nodebuffer: function(h) {
          return o.newBufferFrom(h);
        } }, _.arraybuffer = { string: function(h) {
          return b(new Uint8Array(h));
        }, array: function(h) {
          return m(new Uint8Array(h), new Array(h.byteLength));
        }, arraybuffer: d, uint8array: function(h) {
          return new Uint8Array(h);
        }, nodebuffer: function(h) {
          return o.newBufferFrom(new Uint8Array(h));
        } }, _.uint8array = { string: b, array: function(h) {
          return m(h, new Array(h.length));
        }, arraybuffer: function(h) {
          return h.buffer;
        }, uint8array: d, nodebuffer: function(h) {
          return o.newBufferFrom(h);
        } }, _.nodebuffer = { string: b, array: function(h) {
          return m(h, new Array(h.length));
        }, arraybuffer: function(h) {
          return _.nodebuffer.uint8array(h).buffer;
        }, uint8array: function(h) {
          return m(h, new Uint8Array(h.length));
        }, nodebuffer: d }, r.transformTo = function(h, v) {
          if (v = v || "", !h) return v;
          r.checkSupport(h);
          var p = r.getTypeOf(v);
          return _[p][h](v);
        }, r.resolve = function(h) {
          for (var v = h.split("/"), p = [], w = 0; w < v.length; w++) {
            var x = v[w];
            x === "." || x === "" && w !== 0 && w !== v.length - 1 || (x === ".." ? p.pop() : p.push(x));
          }
          return p.join("/");
        }, r.getTypeOf = function(h) {
          return typeof h == "string" ? "string" : Object.prototype.toString.call(h) === "[object Array]" ? "array" : a.nodebuffer && o.isBuffer(h) ? "nodebuffer" : a.uint8array && h instanceof Uint8Array ? "uint8array" : a.arraybuffer && h instanceof ArrayBuffer ? "arraybuffer" : void 0;
        }, r.checkSupport = function(h) {
          if (!a[h.toLowerCase()]) throw new Error(h + " is not supported by this platform");
        }, r.MAX_VALUE_16BITS = 65535, r.MAX_VALUE_32BITS = -1, r.pretty = function(h) {
          var v, p, w = "";
          for (p = 0; p < (h || "").length; p++) w += "\\x" + ((v = h.charCodeAt(p)) < 16 ? "0" : "") + v.toString(16).toUpperCase();
          return w;
        }, r.delay = function(h, v, p) {
          setImmediate(function() {
            h.apply(p || null, v || []);
          });
        }, r.inherits = function(h, v) {
          function p() {
          }
          p.prototype = v.prototype, h.prototype = new p();
        }, r.extend = function() {
          var h, v, p = {};
          for (h = 0; h < arguments.length; h++) for (v in arguments[h]) Object.prototype.hasOwnProperty.call(arguments[h], v) && p[v] === void 0 && (p[v] = arguments[h][v]);
          return p;
        }, r.prepareContent = function(h, v, p, w, x) {
          return c.Promise.resolve(v).then(function(E) {
            return a.blob && (E instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(E)) !== -1) && typeof FileReader < "u" ? new c.Promise(function(S, T) {
              var D = new FileReader();
              D.onload = function(O) {
                S(O.target.result);
              }, D.onerror = function(O) {
                T(O.target.error);
              }, D.readAsArrayBuffer(E);
            }) : E;
          }).then(function(E) {
            var S = r.getTypeOf(E);
            return S ? (S === "arraybuffer" ? E = r.transformTo("uint8array", E) : S === "string" && (x ? E = s.decode(E) : p && w !== true && (E = (function(T) {
              return f(T, a.uint8array ? new Uint8Array(T.length) : new Array(T.length));
            })(E))), E) : c.Promise.reject(new Error("Can't read the data of '" + h + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
          });
        };
      }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, setimmediate: 54 }], 33: [function(t, i, r) {
        var a = t("./reader/readerFor"), s = t("./utils"), o = t("./signature"), c = t("./zipEntry"), d = t("./support");
        function f(g) {
          this.files = [], this.loadOptions = g;
        }
        f.prototype = { checkSignature: function(g) {
          if (!this.reader.readAndCheckSignature(g)) {
            this.reader.index -= 4;
            var b = this.reader.readString(4);
            throw new Error("Corrupted zip or bug: unexpected signature (" + s.pretty(b) + ", expected " + s.pretty(g) + ")");
          }
        }, isSignature: function(g, b) {
          var m = this.reader.index;
          this.reader.setIndex(g);
          var _ = this.reader.readString(4) === b;
          return this.reader.setIndex(m), _;
        }, readBlockEndOfCentral: function() {
          this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
          var g = this.reader.readData(this.zipCommentLength), b = d.uint8array ? "uint8array" : "array", m = s.transformTo(b, g);
          this.zipComment = this.loadOptions.decodeFileName(m);
        }, readBlockZip64EndOfCentral: function() {
          this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
          for (var g, b, m, _ = this.zip64EndOfCentralSize - 44; 0 < _; ) g = this.reader.readInt(2), b = this.reader.readInt(4), m = this.reader.readData(b), this.zip64ExtensibleData[g] = { id: g, length: b, value: m };
        }, readBlockZip64EndOfCentralLocator: function() {
          if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount) throw new Error("Multi-volumes zip are not supported");
        }, readLocalFiles: function() {
          var g, b;
          for (g = 0; g < this.files.length; g++) b = this.files[g], this.reader.setIndex(b.localHeaderOffset), this.checkSignature(o.LOCAL_FILE_HEADER), b.readLocalPart(this.reader), b.handleUTF8(), b.processAttributes();
        }, readCentralDir: function() {
          var g;
          for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(o.CENTRAL_FILE_HEADER); ) (g = new c({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(g);
          if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0) throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
        }, readEndOfCentral: function() {
          var g = this.reader.lastIndexOfSignature(o.CENTRAL_DIRECTORY_END);
          if (g < 0) throw this.isSignature(0, o.LOCAL_FILE_HEADER) ? new Error("Corrupted zip: can't find end of central directory") : new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html");
          this.reader.setIndex(g);
          var b = g;
          if (this.checkSignature(o.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === s.MAX_VALUE_16BITS || this.diskWithCentralDirStart === s.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === s.MAX_VALUE_16BITS || this.centralDirRecords === s.MAX_VALUE_16BITS || this.centralDirSize === s.MAX_VALUE_32BITS || this.centralDirOffset === s.MAX_VALUE_32BITS) {
            if (this.zip64 = true, (g = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
            if (this.reader.setIndex(g), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, o.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(o.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0)) throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
            this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(o.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
          }
          var m = this.centralDirOffset + this.centralDirSize;
          this.zip64 && (m += 20, m += 12 + this.zip64EndOfCentralSize);
          var _ = b - m;
          if (0 < _) this.isSignature(b, o.CENTRAL_FILE_HEADER) || (this.reader.zero = _);
          else if (_ < 0) throw new Error("Corrupted zip: missing " + Math.abs(_) + " bytes.");
        }, prepareReader: function(g) {
          this.reader = a(g);
        }, load: function(g) {
          this.prepareReader(g), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
        } }, i.exports = f;
      }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utils": 32, "./zipEntry": 34 }], 34: [function(t, i, r) {
        var a = t("./reader/readerFor"), s = t("./utils"), o = t("./compressedObject"), c = t("./crc32"), d = t("./utf8"), f = t("./compressions"), g = t("./support");
        function b(m, _) {
          this.options = m, this.loadOptions = _;
        }
        b.prototype = { isEncrypted: function() {
          return (1 & this.bitFlag) == 1;
        }, useUTF8: function() {
          return (2048 & this.bitFlag) == 2048;
        }, readLocalPart: function(m) {
          var _, h;
          if (m.skip(22), this.fileNameLength = m.readInt(2), h = m.readInt(2), this.fileName = m.readData(this.fileNameLength), m.skip(h), this.compressedSize === -1 || this.uncompressedSize === -1) throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
          if ((_ = (function(v) {
            for (var p in f) if (Object.prototype.hasOwnProperty.call(f, p) && f[p].magic === v) return f[p];
            return null;
          })(this.compressionMethod)) === null) throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
          this.decompressed = new o(this.compressedSize, this.uncompressedSize, this.crc32, _, m.readData(this.compressedSize));
        }, readCentralPart: function(m) {
          this.versionMadeBy = m.readInt(2), m.skip(2), this.bitFlag = m.readInt(2), this.compressionMethod = m.readString(2), this.date = m.readDate(), this.crc32 = m.readInt(4), this.compressedSize = m.readInt(4), this.uncompressedSize = m.readInt(4);
          var _ = m.readInt(2);
          if (this.extraFieldsLength = m.readInt(2), this.fileCommentLength = m.readInt(2), this.diskNumberStart = m.readInt(2), this.internalFileAttributes = m.readInt(2), this.externalFileAttributes = m.readInt(4), this.localHeaderOffset = m.readInt(4), this.isEncrypted()) throw new Error("Encrypted zip are not supported");
          m.skip(_), this.readExtraFields(m), this.parseZIP64ExtraField(m), this.fileComment = m.readData(this.fileCommentLength);
        }, processAttributes: function() {
          this.unixPermissions = null, this.dosPermissions = null;
          var m = this.versionMadeBy >> 8;
          this.dir = !!(16 & this.externalFileAttributes), m == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), m == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = true);
        }, parseZIP64ExtraField: function() {
          if (this.extraFields[1]) {
            var m = a(this.extraFields[1].value);
            this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = m.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = m.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = m.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = m.readInt(4));
          }
        }, readExtraFields: function(m) {
          var _, h, v, p = m.index + this.extraFieldsLength;
          for (this.extraFields || (this.extraFields = {}); m.index + 4 < p; ) _ = m.readInt(2), h = m.readInt(2), v = m.readData(h), this.extraFields[_] = { id: _, length: h, value: v };
          m.setIndex(p);
        }, handleUTF8: function() {
          var m = g.uint8array ? "uint8array" : "array";
          if (this.useUTF8()) this.fileNameStr = d.utf8decode(this.fileName), this.fileCommentStr = d.utf8decode(this.fileComment);
          else {
            var _ = this.findExtraFieldUnicodePath();
            if (_ !== null) this.fileNameStr = _;
            else {
              var h = s.transformTo(m, this.fileName);
              this.fileNameStr = this.loadOptions.decodeFileName(h);
            }
            var v = this.findExtraFieldUnicodeComment();
            if (v !== null) this.fileCommentStr = v;
            else {
              var p = s.transformTo(m, this.fileComment);
              this.fileCommentStr = this.loadOptions.decodeFileName(p);
            }
          }
        }, findExtraFieldUnicodePath: function() {
          var m = this.extraFields[28789];
          if (m) {
            var _ = a(m.value);
            return _.readInt(1) !== 1 || c(this.fileName) !== _.readInt(4) ? null : d.utf8decode(_.readData(m.length - 5));
          }
          return null;
        }, findExtraFieldUnicodeComment: function() {
          var m = this.extraFields[25461];
          if (m) {
            var _ = a(m.value);
            return _.readInt(1) !== 1 || c(this.fileComment) !== _.readInt(4) ? null : d.utf8decode(_.readData(m.length - 5));
          }
          return null;
        } }, i.exports = b;
      }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(t, i, r) {
        function a(_, h, v) {
          this.name = _, this.dir = v.dir, this.date = v.date, this.comment = v.comment, this.unixPermissions = v.unixPermissions, this.dosPermissions = v.dosPermissions, this._data = h, this._dataBinary = v.binary, this.options = { compression: v.compression, compressionOptions: v.compressionOptions };
        }
        var s = t("./stream/StreamHelper"), o = t("./stream/DataWorker"), c = t("./utf8"), d = t("./compressedObject"), f = t("./stream/GenericWorker");
        a.prototype = { internalStream: function(_) {
          var h = null, v = "string";
          try {
            if (!_) throw new Error("No output type specified.");
            var p = (v = _.toLowerCase()) === "string" || v === "text";
            v !== "binarystring" && v !== "text" || (v = "string"), h = this._decompressWorker();
            var w = !this._dataBinary;
            w && !p && (h = h.pipe(new c.Utf8EncodeWorker())), !w && p && (h = h.pipe(new c.Utf8DecodeWorker()));
          } catch (x) {
            (h = new f("error")).error(x);
          }
          return new s(h, v, "");
        }, async: function(_, h) {
          return this.internalStream(_).accumulate(h);
        }, nodeStream: function(_, h) {
          return this.internalStream(_ || "nodebuffer").toNodejsStream(h);
        }, _compressWorker: function(_, h) {
          if (this._data instanceof d && this._data.compression.magic === _.magic) return this._data.getCompressedWorker();
          var v = this._decompressWorker();
          return this._dataBinary || (v = v.pipe(new c.Utf8EncodeWorker())), d.createWorkerFrom(v, _, h);
        }, _decompressWorker: function() {
          return this._data instanceof d ? this._data.getContentWorker() : this._data instanceof f ? this._data : new o(this._data);
        } };
        for (var g = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], b = function() {
          throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
        }, m = 0; m < g.length; m++) a.prototype[g[m]] = b;
        i.exports = a;
      }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(t, i, r) {
        (function(a) {
          var s, o, c = a.MutationObserver || a.WebKitMutationObserver;
          if (c) {
            var d = 0, f = new c(_), g = a.document.createTextNode("");
            f.observe(g, { characterData: true }), s = function() {
              g.data = d = ++d % 2;
            };
          } else if (a.setImmediate || a.MessageChannel === void 0) s = "document" in a && "onreadystatechange" in a.document.createElement("script") ? function() {
            var h = a.document.createElement("script");
            h.onreadystatechange = function() {
              _(), h.onreadystatechange = null, h.parentNode.removeChild(h), h = null;
            }, a.document.documentElement.appendChild(h);
          } : function() {
            setTimeout(_, 0);
          };
          else {
            var b = new a.MessageChannel();
            b.port1.onmessage = _, s = function() {
              b.port2.postMessage(0);
            };
          }
          var m = [];
          function _() {
            var h, v;
            o = true;
            for (var p = m.length; p; ) {
              for (v = m, m = [], h = -1; ++h < p; ) v[h]();
              p = m.length;
            }
            o = false;
          }
          i.exports = function(h) {
            m.push(h) !== 1 || o || s();
          };
        }).call(this, typeof Jt < "u" ? Jt : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}], 37: [function(t, i, r) {
        var a = t("immediate");
        function s() {
        }
        var o = {}, c = ["REJECTED"], d = ["FULFILLED"], f = ["PENDING"];
        function g(p) {
          if (typeof p != "function") throw new TypeError("resolver must be a function");
          this.state = f, this.queue = [], this.outcome = void 0, p !== s && h(this, p);
        }
        function b(p, w, x) {
          this.promise = p, typeof w == "function" && (this.onFulfilled = w, this.callFulfilled = this.otherCallFulfilled), typeof x == "function" && (this.onRejected = x, this.callRejected = this.otherCallRejected);
        }
        function m(p, w, x) {
          a(function() {
            var E;
            try {
              E = w(x);
            } catch (S) {
              return o.reject(p, S);
            }
            E === p ? o.reject(p, new TypeError("Cannot resolve promise with itself")) : o.resolve(p, E);
          });
        }
        function _(p) {
          var w = p && p.then;
          if (p && (typeof p == "object" || typeof p == "function") && typeof w == "function") return function() {
            w.apply(p, arguments);
          };
        }
        function h(p, w) {
          var x = false;
          function E(D) {
            x || (x = true, o.reject(p, D));
          }
          function S(D) {
            x || (x = true, o.resolve(p, D));
          }
          var T = v(function() {
            w(S, E);
          });
          T.status === "error" && E(T.value);
        }
        function v(p, w) {
          var x = {};
          try {
            x.value = p(w), x.status = "success";
          } catch (E) {
            x.status = "error", x.value = E;
          }
          return x;
        }
        (i.exports = g).prototype.finally = function(p) {
          if (typeof p != "function") return this;
          var w = this.constructor;
          return this.then(function(x) {
            return w.resolve(p()).then(function() {
              return x;
            });
          }, function(x) {
            return w.resolve(p()).then(function() {
              throw x;
            });
          });
        }, g.prototype.catch = function(p) {
          return this.then(null, p);
        }, g.prototype.then = function(p, w) {
          if (typeof p != "function" && this.state === d || typeof w != "function" && this.state === c) return this;
          var x = new this.constructor(s);
          return this.state !== f ? m(x, this.state === d ? p : w, this.outcome) : this.queue.push(new b(x, p, w)), x;
        }, b.prototype.callFulfilled = function(p) {
          o.resolve(this.promise, p);
        }, b.prototype.otherCallFulfilled = function(p) {
          m(this.promise, this.onFulfilled, p);
        }, b.prototype.callRejected = function(p) {
          o.reject(this.promise, p);
        }, b.prototype.otherCallRejected = function(p) {
          m(this.promise, this.onRejected, p);
        }, o.resolve = function(p, w) {
          var x = v(_, w);
          if (x.status === "error") return o.reject(p, x.value);
          var E = x.value;
          if (E) h(p, E);
          else {
            p.state = d, p.outcome = w;
            for (var S = -1, T = p.queue.length; ++S < T; ) p.queue[S].callFulfilled(w);
          }
          return p;
        }, o.reject = function(p, w) {
          p.state = c, p.outcome = w;
          for (var x = -1, E = p.queue.length; ++x < E; ) p.queue[x].callRejected(w);
          return p;
        }, g.resolve = function(p) {
          return p instanceof this ? p : o.resolve(new this(s), p);
        }, g.reject = function(p) {
          var w = new this(s);
          return o.reject(w, p);
        }, g.all = function(p) {
          var w = this;
          if (Object.prototype.toString.call(p) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var x = p.length, E = false;
          if (!x) return this.resolve([]);
          for (var S = new Array(x), T = 0, D = -1, O = new this(s); ++D < x; ) C(p[D], D);
          return O;
          function C(M, Y) {
            w.resolve(M).then(function(k) {
              S[Y] = k, ++T !== x || E || (E = true, o.resolve(O, S));
            }, function(k) {
              E || (E = true, o.reject(O, k));
            });
          }
        }, g.race = function(p) {
          var w = this;
          if (Object.prototype.toString.call(p) !== "[object Array]") return this.reject(new TypeError("must be an array"));
          var x = p.length, E = false;
          if (!x) return this.resolve([]);
          for (var S = -1, T = new this(s); ++S < x; ) D = p[S], w.resolve(D).then(function(O) {
            E || (E = true, o.resolve(T, O));
          }, function(O) {
            E || (E = true, o.reject(T, O));
          });
          var D;
          return T;
        };
      }, { immediate: 36 }], 38: [function(t, i, r) {
        var a = {};
        (0, t("./lib/utils/common").assign)(a, t("./lib/deflate"), t("./lib/inflate"), t("./lib/zlib/constants")), i.exports = a;
      }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(t, i, r) {
        var a = t("./zlib/deflate"), s = t("./utils/common"), o = t("./utils/strings"), c = t("./zlib/messages"), d = t("./zlib/zstream"), f = Object.prototype.toString, g = 0, b = -1, m = 0, _ = 8;
        function h(p) {
          if (!(this instanceof h)) return new h(p);
          this.options = s.assign({ level: b, method: _, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: m, to: "" }, p || {});
          var w = this.options;
          w.raw && 0 < w.windowBits ? w.windowBits = -w.windowBits : w.gzip && 0 < w.windowBits && w.windowBits < 16 && (w.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new d(), this.strm.avail_out = 0;
          var x = a.deflateInit2(this.strm, w.level, w.method, w.windowBits, w.memLevel, w.strategy);
          if (x !== g) throw new Error(c[x]);
          if (w.header && a.deflateSetHeader(this.strm, w.header), w.dictionary) {
            var E;
            if (E = typeof w.dictionary == "string" ? o.string2buf(w.dictionary) : f.call(w.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(w.dictionary) : w.dictionary, (x = a.deflateSetDictionary(this.strm, E)) !== g) throw new Error(c[x]);
            this._dict_set = true;
          }
        }
        function v(p, w) {
          var x = new h(w);
          if (x.push(p, true), x.err) throw x.msg || c[x.err];
          return x.result;
        }
        h.prototype.push = function(p, w) {
          var x, E, S = this.strm, T = this.options.chunkSize;
          if (this.ended) return false;
          E = w === ~~w ? w : w === true ? 4 : 0, typeof p == "string" ? S.input = o.string2buf(p) : f.call(p) === "[object ArrayBuffer]" ? S.input = new Uint8Array(p) : S.input = p, S.next_in = 0, S.avail_in = S.input.length;
          do {
            if (S.avail_out === 0 && (S.output = new s.Buf8(T), S.next_out = 0, S.avail_out = T), (x = a.deflate(S, E)) !== 1 && x !== g) return this.onEnd(x), !(this.ended = true);
            S.avail_out !== 0 && (S.avail_in !== 0 || E !== 4 && E !== 2) || (this.options.to === "string" ? this.onData(o.buf2binstring(s.shrinkBuf(S.output, S.next_out))) : this.onData(s.shrinkBuf(S.output, S.next_out)));
          } while ((0 < S.avail_in || S.avail_out === 0) && x !== 1);
          return E === 4 ? (x = a.deflateEnd(this.strm), this.onEnd(x), this.ended = true, x === g) : E !== 2 || (this.onEnd(g), !(S.avail_out = 0));
        }, h.prototype.onData = function(p) {
          this.chunks.push(p);
        }, h.prototype.onEnd = function(p) {
          p === g && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = p, this.msg = this.strm.msg;
        }, r.Deflate = h, r.deflate = v, r.deflateRaw = function(p, w) {
          return (w = w || {}).raw = true, v(p, w);
        }, r.gzip = function(p, w) {
          return (w = w || {}).gzip = true, v(p, w);
        };
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(t, i, r) {
        var a = t("./zlib/inflate"), s = t("./utils/common"), o = t("./utils/strings"), c = t("./zlib/constants"), d = t("./zlib/messages"), f = t("./zlib/zstream"), g = t("./zlib/gzheader"), b = Object.prototype.toString;
        function m(h) {
          if (!(this instanceof m)) return new m(h);
          this.options = s.assign({ chunkSize: 16384, windowBits: 0, to: "" }, h || {});
          var v = this.options;
          v.raw && 0 <= v.windowBits && v.windowBits < 16 && (v.windowBits = -v.windowBits, v.windowBits === 0 && (v.windowBits = -15)), !(0 <= v.windowBits && v.windowBits < 16) || h && h.windowBits || (v.windowBits += 32), 15 < v.windowBits && v.windowBits < 48 && !(15 & v.windowBits) && (v.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new f(), this.strm.avail_out = 0;
          var p = a.inflateInit2(this.strm, v.windowBits);
          if (p !== c.Z_OK) throw new Error(d[p]);
          this.header = new g(), a.inflateGetHeader(this.strm, this.header);
        }
        function _(h, v) {
          var p = new m(v);
          if (p.push(h, true), p.err) throw p.msg || d[p.err];
          return p.result;
        }
        m.prototype.push = function(h, v) {
          var p, w, x, E, S, T, D = this.strm, O = this.options.chunkSize, C = this.options.dictionary, M = false;
          if (this.ended) return false;
          w = v === ~~v ? v : v === true ? c.Z_FINISH : c.Z_NO_FLUSH, typeof h == "string" ? D.input = o.binstring2buf(h) : b.call(h) === "[object ArrayBuffer]" ? D.input = new Uint8Array(h) : D.input = h, D.next_in = 0, D.avail_in = D.input.length;
          do {
            if (D.avail_out === 0 && (D.output = new s.Buf8(O), D.next_out = 0, D.avail_out = O), (p = a.inflate(D, c.Z_NO_FLUSH)) === c.Z_NEED_DICT && C && (T = typeof C == "string" ? o.string2buf(C) : b.call(C) === "[object ArrayBuffer]" ? new Uint8Array(C) : C, p = a.inflateSetDictionary(this.strm, T)), p === c.Z_BUF_ERROR && M === true && (p = c.Z_OK, M = false), p !== c.Z_STREAM_END && p !== c.Z_OK) return this.onEnd(p), !(this.ended = true);
            D.next_out && (D.avail_out !== 0 && p !== c.Z_STREAM_END && (D.avail_in !== 0 || w !== c.Z_FINISH && w !== c.Z_SYNC_FLUSH) || (this.options.to === "string" ? (x = o.utf8border(D.output, D.next_out), E = D.next_out - x, S = o.buf2string(D.output, x), D.next_out = E, D.avail_out = O - E, E && s.arraySet(D.output, D.output, x, E, 0), this.onData(S)) : this.onData(s.shrinkBuf(D.output, D.next_out)))), D.avail_in === 0 && D.avail_out === 0 && (M = true);
          } while ((0 < D.avail_in || D.avail_out === 0) && p !== c.Z_STREAM_END);
          return p === c.Z_STREAM_END && (w = c.Z_FINISH), w === c.Z_FINISH ? (p = a.inflateEnd(this.strm), this.onEnd(p), this.ended = true, p === c.Z_OK) : w !== c.Z_SYNC_FLUSH || (this.onEnd(c.Z_OK), !(D.avail_out = 0));
        }, m.prototype.onData = function(h) {
          this.chunks.push(h);
        }, m.prototype.onEnd = function(h) {
          h === c.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = s.flattenChunks(this.chunks)), this.chunks = [], this.err = h, this.msg = this.strm.msg;
        }, r.Inflate = m, r.inflate = _, r.inflateRaw = function(h, v) {
          return (v = v || {}).raw = true, _(h, v);
        }, r.ungzip = _;
      }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(t, i, r) {
        var a = typeof Uint8Array < "u" && typeof Uint16Array < "u" && typeof Int32Array < "u";
        r.assign = function(c) {
          for (var d = Array.prototype.slice.call(arguments, 1); d.length; ) {
            var f = d.shift();
            if (f) {
              if (typeof f != "object") throw new TypeError(f + "must be non-object");
              for (var g in f) f.hasOwnProperty(g) && (c[g] = f[g]);
            }
          }
          return c;
        }, r.shrinkBuf = function(c, d) {
          return c.length === d ? c : c.subarray ? c.subarray(0, d) : (c.length = d, c);
        };
        var s = { arraySet: function(c, d, f, g, b) {
          if (d.subarray && c.subarray) c.set(d.subarray(f, f + g), b);
          else for (var m = 0; m < g; m++) c[b + m] = d[f + m];
        }, flattenChunks: function(c) {
          var d, f, g, b, m, _;
          for (d = g = 0, f = c.length; d < f; d++) g += c[d].length;
          for (_ = new Uint8Array(g), d = b = 0, f = c.length; d < f; d++) m = c[d], _.set(m, b), b += m.length;
          return _;
        } }, o = { arraySet: function(c, d, f, g, b) {
          for (var m = 0; m < g; m++) c[b + m] = d[f + m];
        }, flattenChunks: function(c) {
          return [].concat.apply([], c);
        } };
        r.setTyped = function(c) {
          c ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, s)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, o));
        }, r.setTyped(a);
      }, {}], 42: [function(t, i, r) {
        var a = t("./common"), s = true, o = true;
        try {
          String.fromCharCode.apply(null, [0]);
        } catch {
          s = false;
        }
        try {
          String.fromCharCode.apply(null, new Uint8Array(1));
        } catch {
          o = false;
        }
        for (var c = new a.Buf8(256), d = 0; d < 256; d++) c[d] = 252 <= d ? 6 : 248 <= d ? 5 : 240 <= d ? 4 : 224 <= d ? 3 : 192 <= d ? 2 : 1;
        function f(g, b) {
          if (b < 65537 && (g.subarray && o || !g.subarray && s)) return String.fromCharCode.apply(null, a.shrinkBuf(g, b));
          for (var m = "", _ = 0; _ < b; _++) m += String.fromCharCode(g[_]);
          return m;
        }
        c[254] = c[254] = 1, r.string2buf = function(g) {
          var b, m, _, h, v, p = g.length, w = 0;
          for (h = 0; h < p; h++) (64512 & (m = g.charCodeAt(h))) == 55296 && h + 1 < p && (64512 & (_ = g.charCodeAt(h + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (_ - 56320), h++), w += m < 128 ? 1 : m < 2048 ? 2 : m < 65536 ? 3 : 4;
          for (b = new a.Buf8(w), h = v = 0; v < w; h++) (64512 & (m = g.charCodeAt(h))) == 55296 && h + 1 < p && (64512 & (_ = g.charCodeAt(h + 1))) == 56320 && (m = 65536 + (m - 55296 << 10) + (_ - 56320), h++), m < 128 ? b[v++] = m : (m < 2048 ? b[v++] = 192 | m >>> 6 : (m < 65536 ? b[v++] = 224 | m >>> 12 : (b[v++] = 240 | m >>> 18, b[v++] = 128 | m >>> 12 & 63), b[v++] = 128 | m >>> 6 & 63), b[v++] = 128 | 63 & m);
          return b;
        }, r.buf2binstring = function(g) {
          return f(g, g.length);
        }, r.binstring2buf = function(g) {
          for (var b = new a.Buf8(g.length), m = 0, _ = b.length; m < _; m++) b[m] = g.charCodeAt(m);
          return b;
        }, r.buf2string = function(g, b) {
          var m, _, h, v, p = b || g.length, w = new Array(2 * p);
          for (m = _ = 0; m < p; ) if ((h = g[m++]) < 128) w[_++] = h;
          else if (4 < (v = c[h])) w[_++] = 65533, m += v - 1;
          else {
            for (h &= v === 2 ? 31 : v === 3 ? 15 : 7; 1 < v && m < p; ) h = h << 6 | 63 & g[m++], v--;
            1 < v ? w[_++] = 65533 : h < 65536 ? w[_++] = h : (h -= 65536, w[_++] = 55296 | h >> 10 & 1023, w[_++] = 56320 | 1023 & h);
          }
          return f(w, _);
        }, r.utf8border = function(g, b) {
          var m;
          for ((b = b || g.length) > g.length && (b = g.length), m = b - 1; 0 <= m && (192 & g[m]) == 128; ) m--;
          return m < 0 || m === 0 ? b : m + c[g[m]] > b ? m : b;
        };
      }, { "./common": 41 }], 43: [function(t, i, r) {
        i.exports = function(a, s, o, c) {
          for (var d = 65535 & a | 0, f = a >>> 16 & 65535 | 0, g = 0; o !== 0; ) {
            for (o -= g = 2e3 < o ? 2e3 : o; f = f + (d = d + s[c++] | 0) | 0, --g; ) ;
            d %= 65521, f %= 65521;
          }
          return d | f << 16 | 0;
        };
      }, {}], 44: [function(t, i, r) {
        i.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
      }, {}], 45: [function(t, i, r) {
        var a = (function() {
          for (var s, o = [], c = 0; c < 256; c++) {
            s = c;
            for (var d = 0; d < 8; d++) s = 1 & s ? 3988292384 ^ s >>> 1 : s >>> 1;
            o[c] = s;
          }
          return o;
        })();
        i.exports = function(s, o, c, d) {
          var f = a, g = d + c;
          s ^= -1;
          for (var b = d; b < g; b++) s = s >>> 8 ^ f[255 & (s ^ o[b])];
          return -1 ^ s;
        };
      }, {}], 46: [function(t, i, r) {
        var a, s = t("../utils/common"), o = t("./trees"), c = t("./adler32"), d = t("./crc32"), f = t("./messages"), g = 0, b = 4, m = 0, _ = -2, h = -1, v = 4, p = 2, w = 8, x = 9, E = 286, S = 30, T = 19, D = 2 * E + 1, O = 15, C = 3, M = 258, Y = M + C + 1, k = 42, P = 113, u = 1, R = 2, Q = 3, U = 4;
        function et(l, F) {
          return l.msg = f[F], F;
        }
        function Z(l) {
          return (l << 1) - (4 < l ? 9 : 0);
        }
        function J(l) {
          for (var F = l.length; 0 <= --F; ) l[F] = 0;
        }
        function L(l) {
          var F = l.state, B = F.pending;
          B > l.avail_out && (B = l.avail_out), B !== 0 && (s.arraySet(l.output, F.pending_buf, F.pending_out, B, l.next_out), l.next_out += B, F.pending_out += B, l.total_out += B, l.avail_out -= B, F.pending -= B, F.pending === 0 && (F.pending_out = 0));
        }
        function N(l, F) {
          o._tr_flush_block(l, 0 <= l.block_start ? l.block_start : -1, l.strstart - l.block_start, F), l.block_start = l.strstart, L(l.strm);
        }
        function nt(l, F) {
          l.pending_buf[l.pending++] = F;
        }
        function K(l, F) {
          l.pending_buf[l.pending++] = F >>> 8 & 255, l.pending_buf[l.pending++] = 255 & F;
        }
        function G(l, F) {
          var B, A, y = l.max_chain_length, I = l.strstart, j = l.prev_length, H = l.nice_match, z = l.strstart > l.w_size - Y ? l.strstart - (l.w_size - Y) : 0, V = l.window, q = l.w_mask, $ = l.prev, tt = l.strstart + M, ft = V[I + j - 1], ot = V[I + j];
          l.prev_length >= l.good_match && (y >>= 2), H > l.lookahead && (H = l.lookahead);
          do
            if (V[(B = F) + j] === ot && V[B + j - 1] === ft && V[B] === V[I] && V[++B] === V[I + 1]) {
              I += 2, B++;
              do
                ;
              while (V[++I] === V[++B] && V[++I] === V[++B] && V[++I] === V[++B] && V[++I] === V[++B] && V[++I] === V[++B] && V[++I] === V[++B] && V[++I] === V[++B] && V[++I] === V[++B] && I < tt);
              if (A = M - (tt - I), I = tt - M, j < A) {
                if (l.match_start = F, H <= (j = A)) break;
                ft = V[I + j - 1], ot = V[I + j];
              }
            }
          while ((F = $[F & q]) > z && --y != 0);
          return j <= l.lookahead ? j : l.lookahead;
        }
        function gt(l) {
          var F, B, A, y, I, j, H, z, V, q, $ = l.w_size;
          do {
            if (y = l.window_size - l.lookahead - l.strstart, l.strstart >= $ + ($ - Y)) {
              for (s.arraySet(l.window, l.window, $, $, 0), l.match_start -= $, l.strstart -= $, l.block_start -= $, F = B = l.hash_size; A = l.head[--F], l.head[F] = $ <= A ? A - $ : 0, --B; ) ;
              for (F = B = $; A = l.prev[--F], l.prev[F] = $ <= A ? A - $ : 0, --B; ) ;
              y += $;
            }
            if (l.strm.avail_in === 0) break;
            if (j = l.strm, H = l.window, z = l.strstart + l.lookahead, V = y, q = void 0, q = j.avail_in, V < q && (q = V), B = q === 0 ? 0 : (j.avail_in -= q, s.arraySet(H, j.input, j.next_in, q, z), j.state.wrap === 1 ? j.adler = c(j.adler, H, q, z) : j.state.wrap === 2 && (j.adler = d(j.adler, H, q, z)), j.next_in += q, j.total_in += q, q), l.lookahead += B, l.lookahead + l.insert >= C) for (I = l.strstart - l.insert, l.ins_h = l.window[I], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[I + 1]) & l.hash_mask; l.insert && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[I + C - 1]) & l.hash_mask, l.prev[I & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = I, I++, l.insert--, !(l.lookahead + l.insert < C)); ) ;
          } while (l.lookahead < Y && l.strm.avail_in !== 0);
        }
        function _t(l, F) {
          for (var B, A; ; ) {
            if (l.lookahead < Y) {
              if (gt(l), l.lookahead < Y && F === g) return u;
              if (l.lookahead === 0) break;
            }
            if (B = 0, l.lookahead >= C && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + C - 1]) & l.hash_mask, B = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), B !== 0 && l.strstart - B <= l.w_size - Y && (l.match_length = G(l, B)), l.match_length >= C) if (A = o._tr_tally(l, l.strstart - l.match_start, l.match_length - C), l.lookahead -= l.match_length, l.match_length <= l.max_lazy_match && l.lookahead >= C) {
              for (l.match_length--; l.strstart++, l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + C - 1]) & l.hash_mask, B = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart, --l.match_length != 0; ) ;
              l.strstart++;
            } else l.strstart += l.match_length, l.match_length = 0, l.ins_h = l.window[l.strstart], l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + 1]) & l.hash_mask;
            else A = o._tr_tally(l, 0, l.window[l.strstart]), l.lookahead--, l.strstart++;
            if (A && (N(l, false), l.strm.avail_out === 0)) return u;
          }
          return l.insert = l.strstart < C - 1 ? l.strstart : C - 1, F === b ? (N(l, true), l.strm.avail_out === 0 ? Q : U) : l.last_lit && (N(l, false), l.strm.avail_out === 0) ? u : R;
        }
        function W(l, F) {
          for (var B, A, y; ; ) {
            if (l.lookahead < Y) {
              if (gt(l), l.lookahead < Y && F === g) return u;
              if (l.lookahead === 0) break;
            }
            if (B = 0, l.lookahead >= C && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + C - 1]) & l.hash_mask, B = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), l.prev_length = l.match_length, l.prev_match = l.match_start, l.match_length = C - 1, B !== 0 && l.prev_length < l.max_lazy_match && l.strstart - B <= l.w_size - Y && (l.match_length = G(l, B), l.match_length <= 5 && (l.strategy === 1 || l.match_length === C && 4096 < l.strstart - l.match_start) && (l.match_length = C - 1)), l.prev_length >= C && l.match_length <= l.prev_length) {
              for (y = l.strstart + l.lookahead - C, A = o._tr_tally(l, l.strstart - 1 - l.prev_match, l.prev_length - C), l.lookahead -= l.prev_length - 1, l.prev_length -= 2; ++l.strstart <= y && (l.ins_h = (l.ins_h << l.hash_shift ^ l.window[l.strstart + C - 1]) & l.hash_mask, B = l.prev[l.strstart & l.w_mask] = l.head[l.ins_h], l.head[l.ins_h] = l.strstart), --l.prev_length != 0; ) ;
              if (l.match_available = 0, l.match_length = C - 1, l.strstart++, A && (N(l, false), l.strm.avail_out === 0)) return u;
            } else if (l.match_available) {
              if ((A = o._tr_tally(l, 0, l.window[l.strstart - 1])) && N(l, false), l.strstart++, l.lookahead--, l.strm.avail_out === 0) return u;
            } else l.match_available = 1, l.strstart++, l.lookahead--;
          }
          return l.match_available && (A = o._tr_tally(l, 0, l.window[l.strstart - 1]), l.match_available = 0), l.insert = l.strstart < C - 1 ? l.strstart : C - 1, F === b ? (N(l, true), l.strm.avail_out === 0 ? Q : U) : l.last_lit && (N(l, false), l.strm.avail_out === 0) ? u : R;
        }
        function X(l, F, B, A, y) {
          this.good_length = l, this.max_lazy = F, this.nice_length = B, this.max_chain = A, this.func = y;
        }
        function st() {
          this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = w, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new s.Buf16(2 * D), this.dyn_dtree = new s.Buf16(2 * (2 * S + 1)), this.bl_tree = new s.Buf16(2 * (2 * T + 1)), J(this.dyn_ltree), J(this.dyn_dtree), J(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new s.Buf16(O + 1), this.heap = new s.Buf16(2 * E + 1), J(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new s.Buf16(2 * E + 1), J(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
        }
        function lt(l) {
          var F;
          return l && l.state ? (l.total_in = l.total_out = 0, l.data_type = p, (F = l.state).pending = 0, F.pending_out = 0, F.wrap < 0 && (F.wrap = -F.wrap), F.status = F.wrap ? k : P, l.adler = F.wrap === 2 ? 0 : 1, F.last_flush = g, o._tr_init(F), m) : et(l, _);
        }
        function bt(l) {
          var F = lt(l);
          return F === m && (function(B) {
            B.window_size = 2 * B.w_size, J(B.head), B.max_lazy_match = a[B.level].max_lazy, B.good_match = a[B.level].good_length, B.nice_match = a[B.level].nice_length, B.max_chain_length = a[B.level].max_chain, B.strstart = 0, B.block_start = 0, B.lookahead = 0, B.insert = 0, B.match_length = B.prev_length = C - 1, B.match_available = 0, B.ins_h = 0;
          })(l.state), F;
        }
        function yt(l, F, B, A, y, I) {
          if (!l) return _;
          var j = 1;
          if (F === h && (F = 6), A < 0 ? (j = 0, A = -A) : 15 < A && (j = 2, A -= 16), y < 1 || x < y || B !== w || A < 8 || 15 < A || F < 0 || 9 < F || I < 0 || v < I) return et(l, _);
          A === 8 && (A = 9);
          var H = new st();
          return (l.state = H).strm = l, H.wrap = j, H.gzhead = null, H.w_bits = A, H.w_size = 1 << H.w_bits, H.w_mask = H.w_size - 1, H.hash_bits = y + 7, H.hash_size = 1 << H.hash_bits, H.hash_mask = H.hash_size - 1, H.hash_shift = ~~((H.hash_bits + C - 1) / C), H.window = new s.Buf8(2 * H.w_size), H.head = new s.Buf16(H.hash_size), H.prev = new s.Buf16(H.w_size), H.lit_bufsize = 1 << y + 6, H.pending_buf_size = 4 * H.lit_bufsize, H.pending_buf = new s.Buf8(H.pending_buf_size), H.d_buf = 1 * H.lit_bufsize, H.l_buf = 3 * H.lit_bufsize, H.level = F, H.strategy = I, H.method = B, bt(l);
        }
        a = [new X(0, 0, 0, 0, function(l, F) {
          var B = 65535;
          for (B > l.pending_buf_size - 5 && (B = l.pending_buf_size - 5); ; ) {
            if (l.lookahead <= 1) {
              if (gt(l), l.lookahead === 0 && F === g) return u;
              if (l.lookahead === 0) break;
            }
            l.strstart += l.lookahead, l.lookahead = 0;
            var A = l.block_start + B;
            if ((l.strstart === 0 || l.strstart >= A) && (l.lookahead = l.strstart - A, l.strstart = A, N(l, false), l.strm.avail_out === 0) || l.strstart - l.block_start >= l.w_size - Y && (N(l, false), l.strm.avail_out === 0)) return u;
          }
          return l.insert = 0, F === b ? (N(l, true), l.strm.avail_out === 0 ? Q : U) : (l.strstart > l.block_start && (N(l, false), l.strm.avail_out), u);
        }), new X(4, 4, 8, 4, _t), new X(4, 5, 16, 8, _t), new X(4, 6, 32, 32, _t), new X(4, 4, 16, 16, W), new X(8, 16, 32, 32, W), new X(8, 16, 128, 128, W), new X(8, 32, 128, 256, W), new X(32, 128, 258, 1024, W), new X(32, 258, 258, 4096, W)], r.deflateInit = function(l, F) {
          return yt(l, F, w, 15, 8, 0);
        }, r.deflateInit2 = yt, r.deflateReset = bt, r.deflateResetKeep = lt, r.deflateSetHeader = function(l, F) {
          return l && l.state ? l.state.wrap !== 2 ? _ : (l.state.gzhead = F, m) : _;
        }, r.deflate = function(l, F) {
          var B, A, y, I;
          if (!l || !l.state || 5 < F || F < 0) return l ? et(l, _) : _;
          if (A = l.state, !l.output || !l.input && l.avail_in !== 0 || A.status === 666 && F !== b) return et(l, l.avail_out === 0 ? -5 : _);
          if (A.strm = l, B = A.last_flush, A.last_flush = F, A.status === k) if (A.wrap === 2) l.adler = 0, nt(A, 31), nt(A, 139), nt(A, 8), A.gzhead ? (nt(A, (A.gzhead.text ? 1 : 0) + (A.gzhead.hcrc ? 2 : 0) + (A.gzhead.extra ? 4 : 0) + (A.gzhead.name ? 8 : 0) + (A.gzhead.comment ? 16 : 0)), nt(A, 255 & A.gzhead.time), nt(A, A.gzhead.time >> 8 & 255), nt(A, A.gzhead.time >> 16 & 255), nt(A, A.gzhead.time >> 24 & 255), nt(A, A.level === 9 ? 2 : 2 <= A.strategy || A.level < 2 ? 4 : 0), nt(A, 255 & A.gzhead.os), A.gzhead.extra && A.gzhead.extra.length && (nt(A, 255 & A.gzhead.extra.length), nt(A, A.gzhead.extra.length >> 8 & 255)), A.gzhead.hcrc && (l.adler = d(l.adler, A.pending_buf, A.pending, 0)), A.gzindex = 0, A.status = 69) : (nt(A, 0), nt(A, 0), nt(A, 0), nt(A, 0), nt(A, 0), nt(A, A.level === 9 ? 2 : 2 <= A.strategy || A.level < 2 ? 4 : 0), nt(A, 3), A.status = P);
          else {
            var j = w + (A.w_bits - 8 << 4) << 8;
            j |= (2 <= A.strategy || A.level < 2 ? 0 : A.level < 6 ? 1 : A.level === 6 ? 2 : 3) << 6, A.strstart !== 0 && (j |= 32), j += 31 - j % 31, A.status = P, K(A, j), A.strstart !== 0 && (K(A, l.adler >>> 16), K(A, 65535 & l.adler)), l.adler = 1;
          }
          if (A.status === 69) if (A.gzhead.extra) {
            for (y = A.pending; A.gzindex < (65535 & A.gzhead.extra.length) && (A.pending !== A.pending_buf_size || (A.gzhead.hcrc && A.pending > y && (l.adler = d(l.adler, A.pending_buf, A.pending - y, y)), L(l), y = A.pending, A.pending !== A.pending_buf_size)); ) nt(A, 255 & A.gzhead.extra[A.gzindex]), A.gzindex++;
            A.gzhead.hcrc && A.pending > y && (l.adler = d(l.adler, A.pending_buf, A.pending - y, y)), A.gzindex === A.gzhead.extra.length && (A.gzindex = 0, A.status = 73);
          } else A.status = 73;
          if (A.status === 73) if (A.gzhead.name) {
            y = A.pending;
            do {
              if (A.pending === A.pending_buf_size && (A.gzhead.hcrc && A.pending > y && (l.adler = d(l.adler, A.pending_buf, A.pending - y, y)), L(l), y = A.pending, A.pending === A.pending_buf_size)) {
                I = 1;
                break;
              }
              I = A.gzindex < A.gzhead.name.length ? 255 & A.gzhead.name.charCodeAt(A.gzindex++) : 0, nt(A, I);
            } while (I !== 0);
            A.gzhead.hcrc && A.pending > y && (l.adler = d(l.adler, A.pending_buf, A.pending - y, y)), I === 0 && (A.gzindex = 0, A.status = 91);
          } else A.status = 91;
          if (A.status === 91) if (A.gzhead.comment) {
            y = A.pending;
            do {
              if (A.pending === A.pending_buf_size && (A.gzhead.hcrc && A.pending > y && (l.adler = d(l.adler, A.pending_buf, A.pending - y, y)), L(l), y = A.pending, A.pending === A.pending_buf_size)) {
                I = 1;
                break;
              }
              I = A.gzindex < A.gzhead.comment.length ? 255 & A.gzhead.comment.charCodeAt(A.gzindex++) : 0, nt(A, I);
            } while (I !== 0);
            A.gzhead.hcrc && A.pending > y && (l.adler = d(l.adler, A.pending_buf, A.pending - y, y)), I === 0 && (A.status = 103);
          } else A.status = 103;
          if (A.status === 103 && (A.gzhead.hcrc ? (A.pending + 2 > A.pending_buf_size && L(l), A.pending + 2 <= A.pending_buf_size && (nt(A, 255 & l.adler), nt(A, l.adler >> 8 & 255), l.adler = 0, A.status = P)) : A.status = P), A.pending !== 0) {
            if (L(l), l.avail_out === 0) return A.last_flush = -1, m;
          } else if (l.avail_in === 0 && Z(F) <= Z(B) && F !== b) return et(l, -5);
          if (A.status === 666 && l.avail_in !== 0) return et(l, -5);
          if (l.avail_in !== 0 || A.lookahead !== 0 || F !== g && A.status !== 666) {
            var H = A.strategy === 2 ? (function(z, V) {
              for (var q; ; ) {
                if (z.lookahead === 0 && (gt(z), z.lookahead === 0)) {
                  if (V === g) return u;
                  break;
                }
                if (z.match_length = 0, q = o._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++, q && (N(z, false), z.strm.avail_out === 0)) return u;
              }
              return z.insert = 0, V === b ? (N(z, true), z.strm.avail_out === 0 ? Q : U) : z.last_lit && (N(z, false), z.strm.avail_out === 0) ? u : R;
            })(A, F) : A.strategy === 3 ? (function(z, V) {
              for (var q, $, tt, ft, ot = z.window; ; ) {
                if (z.lookahead <= M) {
                  if (gt(z), z.lookahead <= M && V === g) return u;
                  if (z.lookahead === 0) break;
                }
                if (z.match_length = 0, z.lookahead >= C && 0 < z.strstart && ($ = ot[tt = z.strstart - 1]) === ot[++tt] && $ === ot[++tt] && $ === ot[++tt]) {
                  ft = z.strstart + M;
                  do
                    ;
                  while ($ === ot[++tt] && $ === ot[++tt] && $ === ot[++tt] && $ === ot[++tt] && $ === ot[++tt] && $ === ot[++tt] && $ === ot[++tt] && $ === ot[++tt] && tt < ft);
                  z.match_length = M - (ft - tt), z.match_length > z.lookahead && (z.match_length = z.lookahead);
                }
                if (z.match_length >= C ? (q = o._tr_tally(z, 1, z.match_length - C), z.lookahead -= z.match_length, z.strstart += z.match_length, z.match_length = 0) : (q = o._tr_tally(z, 0, z.window[z.strstart]), z.lookahead--, z.strstart++), q && (N(z, false), z.strm.avail_out === 0)) return u;
              }
              return z.insert = 0, V === b ? (N(z, true), z.strm.avail_out === 0 ? Q : U) : z.last_lit && (N(z, false), z.strm.avail_out === 0) ? u : R;
            })(A, F) : a[A.level].func(A, F);
            if (H !== Q && H !== U || (A.status = 666), H === u || H === Q) return l.avail_out === 0 && (A.last_flush = -1), m;
            if (H === R && (F === 1 ? o._tr_align(A) : F !== 5 && (o._tr_stored_block(A, 0, 0, false), F === 3 && (J(A.head), A.lookahead === 0 && (A.strstart = 0, A.block_start = 0, A.insert = 0))), L(l), l.avail_out === 0)) return A.last_flush = -1, m;
          }
          return F !== b ? m : A.wrap <= 0 ? 1 : (A.wrap === 2 ? (nt(A, 255 & l.adler), nt(A, l.adler >> 8 & 255), nt(A, l.adler >> 16 & 255), nt(A, l.adler >> 24 & 255), nt(A, 255 & l.total_in), nt(A, l.total_in >> 8 & 255), nt(A, l.total_in >> 16 & 255), nt(A, l.total_in >> 24 & 255)) : (K(A, l.adler >>> 16), K(A, 65535 & l.adler)), L(l), 0 < A.wrap && (A.wrap = -A.wrap), A.pending !== 0 ? m : 1);
        }, r.deflateEnd = function(l) {
          var F;
          return l && l.state ? (F = l.state.status) !== k && F !== 69 && F !== 73 && F !== 91 && F !== 103 && F !== P && F !== 666 ? et(l, _) : (l.state = null, F === P ? et(l, -3) : m) : _;
        }, r.deflateSetDictionary = function(l, F) {
          var B, A, y, I, j, H, z, V, q = F.length;
          if (!l || !l.state || (I = (B = l.state).wrap) === 2 || I === 1 && B.status !== k || B.lookahead) return _;
          for (I === 1 && (l.adler = c(l.adler, F, q, 0)), B.wrap = 0, q >= B.w_size && (I === 0 && (J(B.head), B.strstart = 0, B.block_start = 0, B.insert = 0), V = new s.Buf8(B.w_size), s.arraySet(V, F, q - B.w_size, B.w_size, 0), F = V, q = B.w_size), j = l.avail_in, H = l.next_in, z = l.input, l.avail_in = q, l.next_in = 0, l.input = F, gt(B); B.lookahead >= C; ) {
            for (A = B.strstart, y = B.lookahead - (C - 1); B.ins_h = (B.ins_h << B.hash_shift ^ B.window[A + C - 1]) & B.hash_mask, B.prev[A & B.w_mask] = B.head[B.ins_h], B.head[B.ins_h] = A, A++, --y; ) ;
            B.strstart = A, B.lookahead = C - 1, gt(B);
          }
          return B.strstart += B.lookahead, B.block_start = B.strstart, B.insert = B.lookahead, B.lookahead = 0, B.match_length = B.prev_length = C - 1, B.match_available = 0, l.next_in = H, l.input = z, l.avail_in = j, B.wrap = I, m;
        }, r.deflateInfo = "pako deflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(t, i, r) {
        i.exports = function() {
          this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
        };
      }, {}], 48: [function(t, i, r) {
        i.exports = function(a, s) {
          var o, c, d, f, g, b, m, _, h, v, p, w, x, E, S, T, D, O, C, M, Y, k, P, u, R;
          o = a.state, c = a.next_in, u = a.input, d = c + (a.avail_in - 5), f = a.next_out, R = a.output, g = f - (s - a.avail_out), b = f + (a.avail_out - 257), m = o.dmax, _ = o.wsize, h = o.whave, v = o.wnext, p = o.window, w = o.hold, x = o.bits, E = o.lencode, S = o.distcode, T = (1 << o.lenbits) - 1, D = (1 << o.distbits) - 1;
          t: do {
            x < 15 && (w += u[c++] << x, x += 8, w += u[c++] << x, x += 8), O = E[w & T];
            e: for (; ; ) {
              if (w >>>= C = O >>> 24, x -= C, (C = O >>> 16 & 255) === 0) R[f++] = 65535 & O;
              else {
                if (!(16 & C)) {
                  if (!(64 & C)) {
                    O = E[(65535 & O) + (w & (1 << C) - 1)];
                    continue e;
                  }
                  if (32 & C) {
                    o.mode = 12;
                    break t;
                  }
                  a.msg = "invalid literal/length code", o.mode = 30;
                  break t;
                }
                M = 65535 & O, (C &= 15) && (x < C && (w += u[c++] << x, x += 8), M += w & (1 << C) - 1, w >>>= C, x -= C), x < 15 && (w += u[c++] << x, x += 8, w += u[c++] << x, x += 8), O = S[w & D];
                n: for (; ; ) {
                  if (w >>>= C = O >>> 24, x -= C, !(16 & (C = O >>> 16 & 255))) {
                    if (!(64 & C)) {
                      O = S[(65535 & O) + (w & (1 << C) - 1)];
                      continue n;
                    }
                    a.msg = "invalid distance code", o.mode = 30;
                    break t;
                  }
                  if (Y = 65535 & O, x < (C &= 15) && (w += u[c++] << x, (x += 8) < C && (w += u[c++] << x, x += 8)), m < (Y += w & (1 << C) - 1)) {
                    a.msg = "invalid distance too far back", o.mode = 30;
                    break t;
                  }
                  if (w >>>= C, x -= C, (C = f - g) < Y) {
                    if (h < (C = Y - C) && o.sane) {
                      a.msg = "invalid distance too far back", o.mode = 30;
                      break t;
                    }
                    if (P = p, (k = 0) === v) {
                      if (k += _ - C, C < M) {
                        for (M -= C; R[f++] = p[k++], --C; ) ;
                        k = f - Y, P = R;
                      }
                    } else if (v < C) {
                      if (k += _ + v - C, (C -= v) < M) {
                        for (M -= C; R[f++] = p[k++], --C; ) ;
                        if (k = 0, v < M) {
                          for (M -= C = v; R[f++] = p[k++], --C; ) ;
                          k = f - Y, P = R;
                        }
                      }
                    } else if (k += v - C, C < M) {
                      for (M -= C; R[f++] = p[k++], --C; ) ;
                      k = f - Y, P = R;
                    }
                    for (; 2 < M; ) R[f++] = P[k++], R[f++] = P[k++], R[f++] = P[k++], M -= 3;
                    M && (R[f++] = P[k++], 1 < M && (R[f++] = P[k++]));
                  } else {
                    for (k = f - Y; R[f++] = R[k++], R[f++] = R[k++], R[f++] = R[k++], 2 < (M -= 3); ) ;
                    M && (R[f++] = R[k++], 1 < M && (R[f++] = R[k++]));
                  }
                  break;
                }
              }
              break;
            }
          } while (c < d && f < b);
          c -= M = x >> 3, w &= (1 << (x -= M << 3)) - 1, a.next_in = c, a.next_out = f, a.avail_in = c < d ? d - c + 5 : 5 - (c - d), a.avail_out = f < b ? b - f + 257 : 257 - (f - b), o.hold = w, o.bits = x;
        };
      }, {}], 49: [function(t, i, r) {
        var a = t("../utils/common"), s = t("./adler32"), o = t("./crc32"), c = t("./inffast"), d = t("./inftrees"), f = 1, g = 2, b = 0, m = -2, _ = 1, h = 852, v = 592;
        function p(k) {
          return (k >>> 24 & 255) + (k >>> 8 & 65280) + ((65280 & k) << 8) + ((255 & k) << 24);
        }
        function w() {
          this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new a.Buf16(320), this.work = new a.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
        }
        function x(k) {
          var P;
          return k && k.state ? (P = k.state, k.total_in = k.total_out = P.total = 0, k.msg = "", P.wrap && (k.adler = 1 & P.wrap), P.mode = _, P.last = 0, P.havedict = 0, P.dmax = 32768, P.head = null, P.hold = 0, P.bits = 0, P.lencode = P.lendyn = new a.Buf32(h), P.distcode = P.distdyn = new a.Buf32(v), P.sane = 1, P.back = -1, b) : m;
        }
        function E(k) {
          var P;
          return k && k.state ? ((P = k.state).wsize = 0, P.whave = 0, P.wnext = 0, x(k)) : m;
        }
        function S(k, P) {
          var u, R;
          return k && k.state ? (R = k.state, P < 0 ? (u = 0, P = -P) : (u = 1 + (P >> 4), P < 48 && (P &= 15)), P && (P < 8 || 15 < P) ? m : (R.window !== null && R.wbits !== P && (R.window = null), R.wrap = u, R.wbits = P, E(k))) : m;
        }
        function T(k, P) {
          var u, R;
          return k ? (R = new w(), (k.state = R).window = null, (u = S(k, P)) !== b && (k.state = null), u) : m;
        }
        var D, O, C = true;
        function M(k) {
          if (C) {
            var P;
            for (D = new a.Buf32(512), O = new a.Buf32(32), P = 0; P < 144; ) k.lens[P++] = 8;
            for (; P < 256; ) k.lens[P++] = 9;
            for (; P < 280; ) k.lens[P++] = 7;
            for (; P < 288; ) k.lens[P++] = 8;
            for (d(f, k.lens, 0, 288, D, 0, k.work, { bits: 9 }), P = 0; P < 32; ) k.lens[P++] = 5;
            d(g, k.lens, 0, 32, O, 0, k.work, { bits: 5 }), C = false;
          }
          k.lencode = D, k.lenbits = 9, k.distcode = O, k.distbits = 5;
        }
        function Y(k, P, u, R) {
          var Q, U = k.state;
          return U.window === null && (U.wsize = 1 << U.wbits, U.wnext = 0, U.whave = 0, U.window = new a.Buf8(U.wsize)), R >= U.wsize ? (a.arraySet(U.window, P, u - U.wsize, U.wsize, 0), U.wnext = 0, U.whave = U.wsize) : (R < (Q = U.wsize - U.wnext) && (Q = R), a.arraySet(U.window, P, u - R, Q, U.wnext), (R -= Q) ? (a.arraySet(U.window, P, u - R, R, 0), U.wnext = R, U.whave = U.wsize) : (U.wnext += Q, U.wnext === U.wsize && (U.wnext = 0), U.whave < U.wsize && (U.whave += Q))), 0;
        }
        r.inflateReset = E, r.inflateReset2 = S, r.inflateResetKeep = x, r.inflateInit = function(k) {
          return T(k, 15);
        }, r.inflateInit2 = T, r.inflate = function(k, P) {
          var u, R, Q, U, et, Z, J, L, N, nt, K, G, gt, _t, W, X, st, lt, bt, yt, l, F, B, A, y = 0, I = new a.Buf8(4), j = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
          if (!k || !k.state || !k.output || !k.input && k.avail_in !== 0) return m;
          (u = k.state).mode === 12 && (u.mode = 13), et = k.next_out, Q = k.output, J = k.avail_out, U = k.next_in, R = k.input, Z = k.avail_in, L = u.hold, N = u.bits, nt = Z, K = J, F = b;
          t: for (; ; ) switch (u.mode) {
            case _:
              if (u.wrap === 0) {
                u.mode = 13;
                break;
              }
              for (; N < 16; ) {
                if (Z === 0) break t;
                Z--, L += R[U++] << N, N += 8;
              }
              if (2 & u.wrap && L === 35615) {
                I[u.check = 0] = 255 & L, I[1] = L >>> 8 & 255, u.check = o(u.check, I, 2, 0), N = L = 0, u.mode = 2;
                break;
              }
              if (u.flags = 0, u.head && (u.head.done = false), !(1 & u.wrap) || (((255 & L) << 8) + (L >> 8)) % 31) {
                k.msg = "incorrect header check", u.mode = 30;
                break;
              }
              if ((15 & L) != 8) {
                k.msg = "unknown compression method", u.mode = 30;
                break;
              }
              if (N -= 4, l = 8 + (15 & (L >>>= 4)), u.wbits === 0) u.wbits = l;
              else if (l > u.wbits) {
                k.msg = "invalid window size", u.mode = 30;
                break;
              }
              u.dmax = 1 << l, k.adler = u.check = 1, u.mode = 512 & L ? 10 : 12, N = L = 0;
              break;
            case 2:
              for (; N < 16; ) {
                if (Z === 0) break t;
                Z--, L += R[U++] << N, N += 8;
              }
              if (u.flags = L, (255 & u.flags) != 8) {
                k.msg = "unknown compression method", u.mode = 30;
                break;
              }
              if (57344 & u.flags) {
                k.msg = "unknown header flags set", u.mode = 30;
                break;
              }
              u.head && (u.head.text = L >> 8 & 1), 512 & u.flags && (I[0] = 255 & L, I[1] = L >>> 8 & 255, u.check = o(u.check, I, 2, 0)), N = L = 0, u.mode = 3;
            case 3:
              for (; N < 32; ) {
                if (Z === 0) break t;
                Z--, L += R[U++] << N, N += 8;
              }
              u.head && (u.head.time = L), 512 & u.flags && (I[0] = 255 & L, I[1] = L >>> 8 & 255, I[2] = L >>> 16 & 255, I[3] = L >>> 24 & 255, u.check = o(u.check, I, 4, 0)), N = L = 0, u.mode = 4;
            case 4:
              for (; N < 16; ) {
                if (Z === 0) break t;
                Z--, L += R[U++] << N, N += 8;
              }
              u.head && (u.head.xflags = 255 & L, u.head.os = L >> 8), 512 & u.flags && (I[0] = 255 & L, I[1] = L >>> 8 & 255, u.check = o(u.check, I, 2, 0)), N = L = 0, u.mode = 5;
            case 5:
              if (1024 & u.flags) {
                for (; N < 16; ) {
                  if (Z === 0) break t;
                  Z--, L += R[U++] << N, N += 8;
                }
                u.length = L, u.head && (u.head.extra_len = L), 512 & u.flags && (I[0] = 255 & L, I[1] = L >>> 8 & 255, u.check = o(u.check, I, 2, 0)), N = L = 0;
              } else u.head && (u.head.extra = null);
              u.mode = 6;
            case 6:
              if (1024 & u.flags && (Z < (G = u.length) && (G = Z), G && (u.head && (l = u.head.extra_len - u.length, u.head.extra || (u.head.extra = new Array(u.head.extra_len)), a.arraySet(u.head.extra, R, U, G, l)), 512 & u.flags && (u.check = o(u.check, R, G, U)), Z -= G, U += G, u.length -= G), u.length)) break t;
              u.length = 0, u.mode = 7;
            case 7:
              if (2048 & u.flags) {
                if (Z === 0) break t;
                for (G = 0; l = R[U + G++], u.head && l && u.length < 65536 && (u.head.name += String.fromCharCode(l)), l && G < Z; ) ;
                if (512 & u.flags && (u.check = o(u.check, R, G, U)), Z -= G, U += G, l) break t;
              } else u.head && (u.head.name = null);
              u.length = 0, u.mode = 8;
            case 8:
              if (4096 & u.flags) {
                if (Z === 0) break t;
                for (G = 0; l = R[U + G++], u.head && l && u.length < 65536 && (u.head.comment += String.fromCharCode(l)), l && G < Z; ) ;
                if (512 & u.flags && (u.check = o(u.check, R, G, U)), Z -= G, U += G, l) break t;
              } else u.head && (u.head.comment = null);
              u.mode = 9;
            case 9:
              if (512 & u.flags) {
                for (; N < 16; ) {
                  if (Z === 0) break t;
                  Z--, L += R[U++] << N, N += 8;
                }
                if (L !== (65535 & u.check)) {
                  k.msg = "header crc mismatch", u.mode = 30;
                  break;
                }
                N = L = 0;
              }
              u.head && (u.head.hcrc = u.flags >> 9 & 1, u.head.done = true), k.adler = u.check = 0, u.mode = 12;
              break;
            case 10:
              for (; N < 32; ) {
                if (Z === 0) break t;
                Z--, L += R[U++] << N, N += 8;
              }
              k.adler = u.check = p(L), N = L = 0, u.mode = 11;
            case 11:
              if (u.havedict === 0) return k.next_out = et, k.avail_out = J, k.next_in = U, k.avail_in = Z, u.hold = L, u.bits = N, 2;
              k.adler = u.check = 1, u.mode = 12;
            case 12:
              if (P === 5 || P === 6) break t;
            case 13:
              if (u.last) {
                L >>>= 7 & N, N -= 7 & N, u.mode = 27;
                break;
              }
              for (; N < 3; ) {
                if (Z === 0) break t;
                Z--, L += R[U++] << N, N += 8;
              }
              switch (u.last = 1 & L, N -= 1, 3 & (L >>>= 1)) {
                case 0:
                  u.mode = 14;
                  break;
                case 1:
                  if (M(u), u.mode = 20, P !== 6) break;
                  L >>>= 2, N -= 2;
                  break t;
                case 2:
                  u.mode = 17;
                  break;
                case 3:
                  k.msg = "invalid block type", u.mode = 30;
              }
              L >>>= 2, N -= 2;
              break;
            case 14:
              for (L >>>= 7 & N, N -= 7 & N; N < 32; ) {
                if (Z === 0) break t;
                Z--, L += R[U++] << N, N += 8;
              }
              if ((65535 & L) != (L >>> 16 ^ 65535)) {
                k.msg = "invalid stored block lengths", u.mode = 30;
                break;
              }
              if (u.length = 65535 & L, N = L = 0, u.mode = 15, P === 6) break t;
            case 15:
              u.mode = 16;
            case 16:
              if (G = u.length) {
                if (Z < G && (G = Z), J < G && (G = J), G === 0) break t;
                a.arraySet(Q, R, U, G, et), Z -= G, U += G, J -= G, et += G, u.length -= G;
                break;
              }
              u.mode = 12;
              break;
            case 17:
              for (; N < 14; ) {
                if (Z === 0) break t;
                Z--, L += R[U++] << N, N += 8;
              }
              if (u.nlen = 257 + (31 & L), L >>>= 5, N -= 5, u.ndist = 1 + (31 & L), L >>>= 5, N -= 5, u.ncode = 4 + (15 & L), L >>>= 4, N -= 4, 286 < u.nlen || 30 < u.ndist) {
                k.msg = "too many length or distance symbols", u.mode = 30;
                break;
              }
              u.have = 0, u.mode = 18;
            case 18:
              for (; u.have < u.ncode; ) {
                for (; N < 3; ) {
                  if (Z === 0) break t;
                  Z--, L += R[U++] << N, N += 8;
                }
                u.lens[j[u.have++]] = 7 & L, L >>>= 3, N -= 3;
              }
              for (; u.have < 19; ) u.lens[j[u.have++]] = 0;
              if (u.lencode = u.lendyn, u.lenbits = 7, B = { bits: u.lenbits }, F = d(0, u.lens, 0, 19, u.lencode, 0, u.work, B), u.lenbits = B.bits, F) {
                k.msg = "invalid code lengths set", u.mode = 30;
                break;
              }
              u.have = 0, u.mode = 19;
            case 19:
              for (; u.have < u.nlen + u.ndist; ) {
                for (; X = (y = u.lencode[L & (1 << u.lenbits) - 1]) >>> 16 & 255, st = 65535 & y, !((W = y >>> 24) <= N); ) {
                  if (Z === 0) break t;
                  Z--, L += R[U++] << N, N += 8;
                }
                if (st < 16) L >>>= W, N -= W, u.lens[u.have++] = st;
                else {
                  if (st === 16) {
                    for (A = W + 2; N < A; ) {
                      if (Z === 0) break t;
                      Z--, L += R[U++] << N, N += 8;
                    }
                    if (L >>>= W, N -= W, u.have === 0) {
                      k.msg = "invalid bit length repeat", u.mode = 30;
                      break;
                    }
                    l = u.lens[u.have - 1], G = 3 + (3 & L), L >>>= 2, N -= 2;
                  } else if (st === 17) {
                    for (A = W + 3; N < A; ) {
                      if (Z === 0) break t;
                      Z--, L += R[U++] << N, N += 8;
                    }
                    N -= W, l = 0, G = 3 + (7 & (L >>>= W)), L >>>= 3, N -= 3;
                  } else {
                    for (A = W + 7; N < A; ) {
                      if (Z === 0) break t;
                      Z--, L += R[U++] << N, N += 8;
                    }
                    N -= W, l = 0, G = 11 + (127 & (L >>>= W)), L >>>= 7, N -= 7;
                  }
                  if (u.have + G > u.nlen + u.ndist) {
                    k.msg = "invalid bit length repeat", u.mode = 30;
                    break;
                  }
                  for (; G--; ) u.lens[u.have++] = l;
                }
              }
              if (u.mode === 30) break;
              if (u.lens[256] === 0) {
                k.msg = "invalid code -- missing end-of-block", u.mode = 30;
                break;
              }
              if (u.lenbits = 9, B = { bits: u.lenbits }, F = d(f, u.lens, 0, u.nlen, u.lencode, 0, u.work, B), u.lenbits = B.bits, F) {
                k.msg = "invalid literal/lengths set", u.mode = 30;
                break;
              }
              if (u.distbits = 6, u.distcode = u.distdyn, B = { bits: u.distbits }, F = d(g, u.lens, u.nlen, u.ndist, u.distcode, 0, u.work, B), u.distbits = B.bits, F) {
                k.msg = "invalid distances set", u.mode = 30;
                break;
              }
              if (u.mode = 20, P === 6) break t;
            case 20:
              u.mode = 21;
            case 21:
              if (6 <= Z && 258 <= J) {
                k.next_out = et, k.avail_out = J, k.next_in = U, k.avail_in = Z, u.hold = L, u.bits = N, c(k, K), et = k.next_out, Q = k.output, J = k.avail_out, U = k.next_in, R = k.input, Z = k.avail_in, L = u.hold, N = u.bits, u.mode === 12 && (u.back = -1);
                break;
              }
              for (u.back = 0; X = (y = u.lencode[L & (1 << u.lenbits) - 1]) >>> 16 & 255, st = 65535 & y, !((W = y >>> 24) <= N); ) {
                if (Z === 0) break t;
                Z--, L += R[U++] << N, N += 8;
              }
              if (X && !(240 & X)) {
                for (lt = W, bt = X, yt = st; X = (y = u.lencode[yt + ((L & (1 << lt + bt) - 1) >> lt)]) >>> 16 & 255, st = 65535 & y, !(lt + (W = y >>> 24) <= N); ) {
                  if (Z === 0) break t;
                  Z--, L += R[U++] << N, N += 8;
                }
                L >>>= lt, N -= lt, u.back += lt;
              }
              if (L >>>= W, N -= W, u.back += W, u.length = st, X === 0) {
                u.mode = 26;
                break;
              }
              if (32 & X) {
                u.back = -1, u.mode = 12;
                break;
              }
              if (64 & X) {
                k.msg = "invalid literal/length code", u.mode = 30;
                break;
              }
              u.extra = 15 & X, u.mode = 22;
            case 22:
              if (u.extra) {
                for (A = u.extra; N < A; ) {
                  if (Z === 0) break t;
                  Z--, L += R[U++] << N, N += 8;
                }
                u.length += L & (1 << u.extra) - 1, L >>>= u.extra, N -= u.extra, u.back += u.extra;
              }
              u.was = u.length, u.mode = 23;
            case 23:
              for (; X = (y = u.distcode[L & (1 << u.distbits) - 1]) >>> 16 & 255, st = 65535 & y, !((W = y >>> 24) <= N); ) {
                if (Z === 0) break t;
                Z--, L += R[U++] << N, N += 8;
              }
              if (!(240 & X)) {
                for (lt = W, bt = X, yt = st; X = (y = u.distcode[yt + ((L & (1 << lt + bt) - 1) >> lt)]) >>> 16 & 255, st = 65535 & y, !(lt + (W = y >>> 24) <= N); ) {
                  if (Z === 0) break t;
                  Z--, L += R[U++] << N, N += 8;
                }
                L >>>= lt, N -= lt, u.back += lt;
              }
              if (L >>>= W, N -= W, u.back += W, 64 & X) {
                k.msg = "invalid distance code", u.mode = 30;
                break;
              }
              u.offset = st, u.extra = 15 & X, u.mode = 24;
            case 24:
              if (u.extra) {
                for (A = u.extra; N < A; ) {
                  if (Z === 0) break t;
                  Z--, L += R[U++] << N, N += 8;
                }
                u.offset += L & (1 << u.extra) - 1, L >>>= u.extra, N -= u.extra, u.back += u.extra;
              }
              if (u.offset > u.dmax) {
                k.msg = "invalid distance too far back", u.mode = 30;
                break;
              }
              u.mode = 25;
            case 25:
              if (J === 0) break t;
              if (G = K - J, u.offset > G) {
                if ((G = u.offset - G) > u.whave && u.sane) {
                  k.msg = "invalid distance too far back", u.mode = 30;
                  break;
                }
                gt = G > u.wnext ? (G -= u.wnext, u.wsize - G) : u.wnext - G, G > u.length && (G = u.length), _t = u.window;
              } else _t = Q, gt = et - u.offset, G = u.length;
              for (J < G && (G = J), J -= G, u.length -= G; Q[et++] = _t[gt++], --G; ) ;
              u.length === 0 && (u.mode = 21);
              break;
            case 26:
              if (J === 0) break t;
              Q[et++] = u.length, J--, u.mode = 21;
              break;
            case 27:
              if (u.wrap) {
                for (; N < 32; ) {
                  if (Z === 0) break t;
                  Z--, L |= R[U++] << N, N += 8;
                }
                if (K -= J, k.total_out += K, u.total += K, K && (k.adler = u.check = u.flags ? o(u.check, Q, K, et - K) : s(u.check, Q, K, et - K)), K = J, (u.flags ? L : p(L)) !== u.check) {
                  k.msg = "incorrect data check", u.mode = 30;
                  break;
                }
                N = L = 0;
              }
              u.mode = 28;
            case 28:
              if (u.wrap && u.flags) {
                for (; N < 32; ) {
                  if (Z === 0) break t;
                  Z--, L += R[U++] << N, N += 8;
                }
                if (L !== (4294967295 & u.total)) {
                  k.msg = "incorrect length check", u.mode = 30;
                  break;
                }
                N = L = 0;
              }
              u.mode = 29;
            case 29:
              F = 1;
              break t;
            case 30:
              F = -3;
              break t;
            case 31:
              return -4;
            case 32:
            default:
              return m;
          }
          return k.next_out = et, k.avail_out = J, k.next_in = U, k.avail_in = Z, u.hold = L, u.bits = N, (u.wsize || K !== k.avail_out && u.mode < 30 && (u.mode < 27 || P !== 4)) && Y(k, k.output, k.next_out, K - k.avail_out) ? (u.mode = 31, -4) : (nt -= k.avail_in, K -= k.avail_out, k.total_in += nt, k.total_out += K, u.total += K, u.wrap && K && (k.adler = u.check = u.flags ? o(u.check, Q, K, k.next_out - K) : s(u.check, Q, K, k.next_out - K)), k.data_type = u.bits + (u.last ? 64 : 0) + (u.mode === 12 ? 128 : 0) + (u.mode === 20 || u.mode === 15 ? 256 : 0), (nt == 0 && K === 0 || P === 4) && F === b && (F = -5), F);
        }, r.inflateEnd = function(k) {
          if (!k || !k.state) return m;
          var P = k.state;
          return P.window && (P.window = null), k.state = null, b;
        }, r.inflateGetHeader = function(k, P) {
          var u;
          return k && k.state && 2 & (u = k.state).wrap ? ((u.head = P).done = false, b) : m;
        }, r.inflateSetDictionary = function(k, P) {
          var u, R = P.length;
          return k && k.state ? (u = k.state).wrap !== 0 && u.mode !== 11 ? m : u.mode === 11 && s(1, P, R, 0) !== u.check ? -3 : Y(k, P, R, R) ? (u.mode = 31, -4) : (u.havedict = 1, b) : m;
        }, r.inflateInfo = "pako inflate (from Nodeca project)";
      }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(t, i, r) {
        var a = t("../utils/common"), s = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], o = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], c = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], d = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
        i.exports = function(f, g, b, m, _, h, v, p) {
          var w, x, E, S, T, D, O, C, M, Y = p.bits, k = 0, P = 0, u = 0, R = 0, Q = 0, U = 0, et = 0, Z = 0, J = 0, L = 0, N = null, nt = 0, K = new a.Buf16(16), G = new a.Buf16(16), gt = null, _t = 0;
          for (k = 0; k <= 15; k++) K[k] = 0;
          for (P = 0; P < m; P++) K[g[b + P]]++;
          for (Q = Y, R = 15; 1 <= R && K[R] === 0; R--) ;
          if (R < Q && (Q = R), R === 0) return _[h++] = 20971520, _[h++] = 20971520, p.bits = 1, 0;
          for (u = 1; u < R && K[u] === 0; u++) ;
          for (Q < u && (Q = u), k = Z = 1; k <= 15; k++) if (Z <<= 1, (Z -= K[k]) < 0) return -1;
          if (0 < Z && (f === 0 || R !== 1)) return -1;
          for (G[1] = 0, k = 1; k < 15; k++) G[k + 1] = G[k] + K[k];
          for (P = 0; P < m; P++) g[b + P] !== 0 && (v[G[g[b + P]]++] = P);
          if (D = f === 0 ? (N = gt = v, 19) : f === 1 ? (N = s, nt -= 257, gt = o, _t -= 257, 256) : (N = c, gt = d, -1), k = u, T = h, et = P = L = 0, E = -1, S = (J = 1 << (U = Q)) - 1, f === 1 && 852 < J || f === 2 && 592 < J) return 1;
          for (; ; ) {
            for (O = k - et, M = v[P] < D ? (C = 0, v[P]) : v[P] > D ? (C = gt[_t + v[P]], N[nt + v[P]]) : (C = 96, 0), w = 1 << k - et, u = x = 1 << U; _[T + (L >> et) + (x -= w)] = O << 24 | C << 16 | M | 0, x !== 0; ) ;
            for (w = 1 << k - 1; L & w; ) w >>= 1;
            if (w !== 0 ? (L &= w - 1, L += w) : L = 0, P++, --K[k] == 0) {
              if (k === R) break;
              k = g[b + v[P]];
            }
            if (Q < k && (L & S) !== E) {
              for (et === 0 && (et = Q), T += u, Z = 1 << (U = k - et); U + et < R && !((Z -= K[U + et]) <= 0); ) U++, Z <<= 1;
              if (J += 1 << U, f === 1 && 852 < J || f === 2 && 592 < J) return 1;
              _[E = L & S] = Q << 24 | U << 16 | T - h | 0;
            }
          }
          return L !== 0 && (_[T + L] = k - et << 24 | 64 << 16 | 0), p.bits = Q, 0;
        };
      }, { "../utils/common": 41 }], 51: [function(t, i, r) {
        i.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
      }, {}], 52: [function(t, i, r) {
        var a = t("../utils/common"), s = 0, o = 1;
        function c(y) {
          for (var I = y.length; 0 <= --I; ) y[I] = 0;
        }
        var d = 0, f = 29, g = 256, b = g + 1 + f, m = 30, _ = 19, h = 2 * b + 1, v = 15, p = 16, w = 7, x = 256, E = 16, S = 17, T = 18, D = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], O = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], C = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], M = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], Y = new Array(2 * (b + 2));
        c(Y);
        var k = new Array(2 * m);
        c(k);
        var P = new Array(512);
        c(P);
        var u = new Array(256);
        c(u);
        var R = new Array(f);
        c(R);
        var Q, U, et, Z = new Array(m);
        function J(y, I, j, H, z) {
          this.static_tree = y, this.extra_bits = I, this.extra_base = j, this.elems = H, this.max_length = z, this.has_stree = y && y.length;
        }
        function L(y, I) {
          this.dyn_tree = y, this.max_code = 0, this.stat_desc = I;
        }
        function N(y) {
          return y < 256 ? P[y] : P[256 + (y >>> 7)];
        }
        function nt(y, I) {
          y.pending_buf[y.pending++] = 255 & I, y.pending_buf[y.pending++] = I >>> 8 & 255;
        }
        function K(y, I, j) {
          y.bi_valid > p - j ? (y.bi_buf |= I << y.bi_valid & 65535, nt(y, y.bi_buf), y.bi_buf = I >> p - y.bi_valid, y.bi_valid += j - p) : (y.bi_buf |= I << y.bi_valid & 65535, y.bi_valid += j);
        }
        function G(y, I, j) {
          K(y, j[2 * I], j[2 * I + 1]);
        }
        function gt(y, I) {
          for (var j = 0; j |= 1 & y, y >>>= 1, j <<= 1, 0 < --I; ) ;
          return j >>> 1;
        }
        function _t(y, I, j) {
          var H, z, V = new Array(v + 1), q = 0;
          for (H = 1; H <= v; H++) V[H] = q = q + j[H - 1] << 1;
          for (z = 0; z <= I; z++) {
            var $ = y[2 * z + 1];
            $ !== 0 && (y[2 * z] = gt(V[$]++, $));
          }
        }
        function W(y) {
          var I;
          for (I = 0; I < b; I++) y.dyn_ltree[2 * I] = 0;
          for (I = 0; I < m; I++) y.dyn_dtree[2 * I] = 0;
          for (I = 0; I < _; I++) y.bl_tree[2 * I] = 0;
          y.dyn_ltree[2 * x] = 1, y.opt_len = y.static_len = 0, y.last_lit = y.matches = 0;
        }
        function X(y) {
          8 < y.bi_valid ? nt(y, y.bi_buf) : 0 < y.bi_valid && (y.pending_buf[y.pending++] = y.bi_buf), y.bi_buf = 0, y.bi_valid = 0;
        }
        function st(y, I, j, H) {
          var z = 2 * I, V = 2 * j;
          return y[z] < y[V] || y[z] === y[V] && H[I] <= H[j];
        }
        function lt(y, I, j) {
          for (var H = y.heap[j], z = j << 1; z <= y.heap_len && (z < y.heap_len && st(I, y.heap[z + 1], y.heap[z], y.depth) && z++, !st(I, H, y.heap[z], y.depth)); ) y.heap[j] = y.heap[z], j = z, z <<= 1;
          y.heap[j] = H;
        }
        function bt(y, I, j) {
          var H, z, V, q, $ = 0;
          if (y.last_lit !== 0) for (; H = y.pending_buf[y.d_buf + 2 * $] << 8 | y.pending_buf[y.d_buf + 2 * $ + 1], z = y.pending_buf[y.l_buf + $], $++, H === 0 ? G(y, z, I) : (G(y, (V = u[z]) + g + 1, I), (q = D[V]) !== 0 && K(y, z -= R[V], q), G(y, V = N(--H), j), (q = O[V]) !== 0 && K(y, H -= Z[V], q)), $ < y.last_lit; ) ;
          G(y, x, I);
        }
        function yt(y, I) {
          var j, H, z, V = I.dyn_tree, q = I.stat_desc.static_tree, $ = I.stat_desc.has_stree, tt = I.stat_desc.elems, ft = -1;
          for (y.heap_len = 0, y.heap_max = h, j = 0; j < tt; j++) V[2 * j] !== 0 ? (y.heap[++y.heap_len] = ft = j, y.depth[j] = 0) : V[2 * j + 1] = 0;
          for (; y.heap_len < 2; ) V[2 * (z = y.heap[++y.heap_len] = ft < 2 ? ++ft : 0)] = 1, y.depth[z] = 0, y.opt_len--, $ && (y.static_len -= q[2 * z + 1]);
          for (I.max_code = ft, j = y.heap_len >> 1; 1 <= j; j--) lt(y, V, j);
          for (z = tt; j = y.heap[1], y.heap[1] = y.heap[y.heap_len--], lt(y, V, 1), H = y.heap[1], y.heap[--y.heap_max] = j, y.heap[--y.heap_max] = H, V[2 * z] = V[2 * j] + V[2 * H], y.depth[z] = (y.depth[j] >= y.depth[H] ? y.depth[j] : y.depth[H]) + 1, V[2 * j + 1] = V[2 * H + 1] = z, y.heap[1] = z++, lt(y, V, 1), 2 <= y.heap_len; ) ;
          y.heap[--y.heap_max] = y.heap[1], (function(ot, Et) {
            var le, Ot, ce, wt, Me, mn, Lt = Et.dyn_tree, Qi = Et.max_code, ma = Et.stat_desc.static_tree, ga = Et.stat_desc.has_stree, pa = Et.stat_desc.extra_bits, tr = Et.stat_desc.extra_base, ue = Et.stat_desc.max_length, Be = 0;
            for (wt = 0; wt <= v; wt++) ot.bl_count[wt] = 0;
            for (Lt[2 * ot.heap[ot.heap_max] + 1] = 0, le = ot.heap_max + 1; le < h; le++) ue < (wt = Lt[2 * Lt[2 * (Ot = ot.heap[le]) + 1] + 1] + 1) && (wt = ue, Be++), Lt[2 * Ot + 1] = wt, Qi < Ot || (ot.bl_count[wt]++, Me = 0, tr <= Ot && (Me = pa[Ot - tr]), mn = Lt[2 * Ot], ot.opt_len += mn * (wt + Me), ga && (ot.static_len += mn * (ma[2 * Ot + 1] + Me)));
            if (Be !== 0) {
              do {
                for (wt = ue - 1; ot.bl_count[wt] === 0; ) wt--;
                ot.bl_count[wt]--, ot.bl_count[wt + 1] += 2, ot.bl_count[ue]--, Be -= 2;
              } while (0 < Be);
              for (wt = ue; wt !== 0; wt--) for (Ot = ot.bl_count[wt]; Ot !== 0; ) Qi < (ce = ot.heap[--le]) || (Lt[2 * ce + 1] !== wt && (ot.opt_len += (wt - Lt[2 * ce + 1]) * Lt[2 * ce], Lt[2 * ce + 1] = wt), Ot--);
            }
          })(y, I), _t(V, ft, y.bl_count);
        }
        function l(y, I, j) {
          var H, z, V = -1, q = I[1], $ = 0, tt = 7, ft = 4;
          for (q === 0 && (tt = 138, ft = 3), I[2 * (j + 1) + 1] = 65535, H = 0; H <= j; H++) z = q, q = I[2 * (H + 1) + 1], ++$ < tt && z === q || ($ < ft ? y.bl_tree[2 * z] += $ : z !== 0 ? (z !== V && y.bl_tree[2 * z]++, y.bl_tree[2 * E]++) : $ <= 10 ? y.bl_tree[2 * S]++ : y.bl_tree[2 * T]++, V = z, ft = ($ = 0) === q ? (tt = 138, 3) : z === q ? (tt = 6, 3) : (tt = 7, 4));
        }
        function F(y, I, j) {
          var H, z, V = -1, q = I[1], $ = 0, tt = 7, ft = 4;
          for (q === 0 && (tt = 138, ft = 3), H = 0; H <= j; H++) if (z = q, q = I[2 * (H + 1) + 1], !(++$ < tt && z === q)) {
            if ($ < ft) for (; G(y, z, y.bl_tree), --$ != 0; ) ;
            else z !== 0 ? (z !== V && (G(y, z, y.bl_tree), $--), G(y, E, y.bl_tree), K(y, $ - 3, 2)) : $ <= 10 ? (G(y, S, y.bl_tree), K(y, $ - 3, 3)) : (G(y, T, y.bl_tree), K(y, $ - 11, 7));
            V = z, ft = ($ = 0) === q ? (tt = 138, 3) : z === q ? (tt = 6, 3) : (tt = 7, 4);
          }
        }
        c(Z);
        var B = false;
        function A(y, I, j, H) {
          K(y, (d << 1) + (H ? 1 : 0), 3), (function(z, V, q, $) {
            X(z), $ && (nt(z, q), nt(z, ~q)), a.arraySet(z.pending_buf, z.window, V, q, z.pending), z.pending += q;
          })(y, I, j, true);
        }
        r._tr_init = function(y) {
          B || ((function() {
            var I, j, H, z, V, q = new Array(v + 1);
            for (z = H = 0; z < f - 1; z++) for (R[z] = H, I = 0; I < 1 << D[z]; I++) u[H++] = z;
            for (u[H - 1] = z, z = V = 0; z < 16; z++) for (Z[z] = V, I = 0; I < 1 << O[z]; I++) P[V++] = z;
            for (V >>= 7; z < m; z++) for (Z[z] = V << 7, I = 0; I < 1 << O[z] - 7; I++) P[256 + V++] = z;
            for (j = 0; j <= v; j++) q[j] = 0;
            for (I = 0; I <= 143; ) Y[2 * I + 1] = 8, I++, q[8]++;
            for (; I <= 255; ) Y[2 * I + 1] = 9, I++, q[9]++;
            for (; I <= 279; ) Y[2 * I + 1] = 7, I++, q[7]++;
            for (; I <= 287; ) Y[2 * I + 1] = 8, I++, q[8]++;
            for (_t(Y, b + 1, q), I = 0; I < m; I++) k[2 * I + 1] = 5, k[2 * I] = gt(I, 5);
            Q = new J(Y, D, g + 1, b, v), U = new J(k, O, 0, m, v), et = new J(new Array(0), C, 0, _, w);
          })(), B = true), y.l_desc = new L(y.dyn_ltree, Q), y.d_desc = new L(y.dyn_dtree, U), y.bl_desc = new L(y.bl_tree, et), y.bi_buf = 0, y.bi_valid = 0, W(y);
        }, r._tr_stored_block = A, r._tr_flush_block = function(y, I, j, H) {
          var z, V, q = 0;
          0 < y.level ? (y.strm.data_type === 2 && (y.strm.data_type = (function($) {
            var tt, ft = 4093624447;
            for (tt = 0; tt <= 31; tt++, ft >>>= 1) if (1 & ft && $.dyn_ltree[2 * tt] !== 0) return s;
            if ($.dyn_ltree[18] !== 0 || $.dyn_ltree[20] !== 0 || $.dyn_ltree[26] !== 0) return o;
            for (tt = 32; tt < g; tt++) if ($.dyn_ltree[2 * tt] !== 0) return o;
            return s;
          })(y)), yt(y, y.l_desc), yt(y, y.d_desc), q = (function($) {
            var tt;
            for (l($, $.dyn_ltree, $.l_desc.max_code), l($, $.dyn_dtree, $.d_desc.max_code), yt($, $.bl_desc), tt = _ - 1; 3 <= tt && $.bl_tree[2 * M[tt] + 1] === 0; tt--) ;
            return $.opt_len += 3 * (tt + 1) + 5 + 5 + 4, tt;
          })(y), z = y.opt_len + 3 + 7 >>> 3, (V = y.static_len + 3 + 7 >>> 3) <= z && (z = V)) : z = V = j + 5, j + 4 <= z && I !== -1 ? A(y, I, j, H) : y.strategy === 4 || V === z ? (K(y, 2 + (H ? 1 : 0), 3), bt(y, Y, k)) : (K(y, 4 + (H ? 1 : 0), 3), (function($, tt, ft, ot) {
            var Et;
            for (K($, tt - 257, 5), K($, ft - 1, 5), K($, ot - 4, 4), Et = 0; Et < ot; Et++) K($, $.bl_tree[2 * M[Et] + 1], 3);
            F($, $.dyn_ltree, tt - 1), F($, $.dyn_dtree, ft - 1);
          })(y, y.l_desc.max_code + 1, y.d_desc.max_code + 1, q + 1), bt(y, y.dyn_ltree, y.dyn_dtree)), W(y), H && X(y);
        }, r._tr_tally = function(y, I, j) {
          return y.pending_buf[y.d_buf + 2 * y.last_lit] = I >>> 8 & 255, y.pending_buf[y.d_buf + 2 * y.last_lit + 1] = 255 & I, y.pending_buf[y.l_buf + y.last_lit] = 255 & j, y.last_lit++, I === 0 ? y.dyn_ltree[2 * j]++ : (y.matches++, I--, y.dyn_ltree[2 * (u[j] + g + 1)]++, y.dyn_dtree[2 * N(I)]++), y.last_lit === y.lit_bufsize - 1;
        }, r._tr_align = function(y) {
          K(y, 2, 3), G(y, x, Y), (function(I) {
            I.bi_valid === 16 ? (nt(I, I.bi_buf), I.bi_buf = 0, I.bi_valid = 0) : 8 <= I.bi_valid && (I.pending_buf[I.pending++] = 255 & I.bi_buf, I.bi_buf >>= 8, I.bi_valid -= 8);
          })(y);
        };
      }, { "../utils/common": 41 }], 53: [function(t, i, r) {
        i.exports = function() {
          this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
        };
      }, {}], 54: [function(t, i, r) {
        (function(a) {
          (function(s, o) {
            if (!s.setImmediate) {
              var c, d, f, g, b = 1, m = {}, _ = false, h = s.document, v = Object.getPrototypeOf && Object.getPrototypeOf(s);
              v = v && v.setTimeout ? v : s, c = {}.toString.call(s.process) === "[object process]" ? function(E) {
                process.nextTick(function() {
                  w(E);
                });
              } : (function() {
                if (s.postMessage && !s.importScripts) {
                  var E = true, S = s.onmessage;
                  return s.onmessage = function() {
                    E = false;
                  }, s.postMessage("", "*"), s.onmessage = S, E;
                }
              })() ? (g = "setImmediate$" + Math.random() + "$", s.addEventListener ? s.addEventListener("message", x, false) : s.attachEvent("onmessage", x), function(E) {
                s.postMessage(g + E, "*");
              }) : s.MessageChannel ? ((f = new MessageChannel()).port1.onmessage = function(E) {
                w(E.data);
              }, function(E) {
                f.port2.postMessage(E);
              }) : h && "onreadystatechange" in h.createElement("script") ? (d = h.documentElement, function(E) {
                var S = h.createElement("script");
                S.onreadystatechange = function() {
                  w(E), S.onreadystatechange = null, d.removeChild(S), S = null;
                }, d.appendChild(S);
              }) : function(E) {
                setTimeout(w, 0, E);
              }, v.setImmediate = function(E) {
                typeof E != "function" && (E = new Function("" + E));
                for (var S = new Array(arguments.length - 1), T = 0; T < S.length; T++) S[T] = arguments[T + 1];
                var D = { callback: E, args: S };
                return m[b] = D, c(b), b++;
              }, v.clearImmediate = p;
            }
            function p(E) {
              delete m[E];
            }
            function w(E) {
              if (_) setTimeout(w, 0, E);
              else {
                var S = m[E];
                if (S) {
                  _ = true;
                  try {
                    (function(T) {
                      var D = T.callback, O = T.args;
                      switch (O.length) {
                        case 0:
                          D();
                          break;
                        case 1:
                          D(O[0]);
                          break;
                        case 2:
                          D(O[0], O[1]);
                          break;
                        case 3:
                          D(O[0], O[1], O[2]);
                          break;
                        default:
                          D.apply(o, O);
                      }
                    })(S);
                  } finally {
                    p(E), _ = false;
                  }
                }
              }
            }
            function x(E) {
              E.source === s && typeof E.data == "string" && E.data.indexOf(g) === 0 && w(+E.data.slice(g.length));
            }
          })(typeof self > "u" ? a === void 0 ? this : a : self);
        }).call(this, typeof Jt < "u" ? Jt : typeof self < "u" ? self : typeof window < "u" ? window : {});
      }, {}] }, {}, [10])(10);
    });
  })(gi);
  var jszip_default = gi.exports;

  // src/content/vendor/viewer.js
  /*!
   * Viewer.js v1.11.6
   * https://fengyuanchen.github.io/viewerjs
   *
   * Copyright 2015-present Chen Fengyuan
   * Released under the MIT license
   *
   * Date: 2023-09-17T03:16:38.052Z
   */
  function Nn(n, e) {
    var t = Object.keys(n);
    if (Object.getOwnPropertySymbols) {
      var i = Object.getOwnPropertySymbols(n);
      e && (i = i.filter(function(r) {
        return Object.getOwnPropertyDescriptor(n, r).enumerable;
      })), t.push.apply(t, i);
    }
    return t;
  }
  function He(n) {
    for (var e = 1; e < arguments.length; e++) {
      var t = arguments[e] != null ? arguments[e] : {};
      e % 2 ? Nn(Object(t), true).forEach(function(i) {
        Yr(n, i, t[i]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(n, Object.getOwnPropertyDescriptors(t)) : Nn(Object(t)).forEach(function(i) {
        Object.defineProperty(n, i, Object.getOwnPropertyDescriptor(t, i));
      });
    }
    return n;
  }
  function Ze(n) {
    return Ze = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function(e) {
      return typeof e;
    } : function(e) {
      return e && typeof Symbol == "function" && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
    }, Ze(n);
  }
  function Zr(n, e) {
    if (!(n instanceof e)) throw new TypeError("Cannot call a class as a function");
  }
  function Mn(n, e) {
    for (var t = 0; t < e.length; t++) {
      var i = e[t];
      i.enumerable = i.enumerable || false, i.configurable = true, "value" in i && (i.writable = true), Object.defineProperty(n, Bn(i.key), i);
    }
  }
  function Vr(n, e, t) {
    return e && Mn(n.prototype, e), t && Mn(n, t), Object.defineProperty(n, "prototype", { writable: false }), n;
  }
  function Yr(n, e, t) {
    return e = Bn(e), e in n ? Object.defineProperty(n, e, { value: t, enumerable: true, configurable: true, writable: true }) : n[e] = t, n;
  }
  function $r(n, e) {
    if (typeof n != "object" || n === null) return n;
    var t = n[Symbol.toPrimitive];
    if (t !== void 0) {
      var i = t.call(n, e || "default");
      if (typeof i != "object") return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return (e === "string" ? String : Number)(n);
  }
  function Bn(n) {
    var e = $r(n, "string");
    return typeof e == "symbol" ? e : String(e);
  }
  var Pn = { backdrop: true, button: true, navbar: true, title: true, toolbar: true, className: "", container: "body", filter: null, fullscreen: true, inheritedAttributes: ["crossOrigin", "decoding", "isMap", "loading", "referrerPolicy", "sizes", "srcset", "useMap"], initialCoverage: 0.9, initialViewIndex: 0, inline: false, interval: 5e3, keyboard: true, focus: true, loading: true, loop: true, minWidth: 200, minHeight: 100, movable: true, rotatable: true, scalable: true, zoomable: true, zoomOnTouch: true, zoomOnWheel: true, slideOnTouch: true, toggleOnDblclick: true, tooltip: true, transition: true, zIndex: 2015, zIndexInline: 0, zoomRatio: 0.1, minZoomRatio: 0.01, maxZoomRatio: 100, url: "src", ready: null, show: null, shown: null, hide: null, hidden: null, view: null, viewed: null, move: null, moved: null, rotate: null, rotated: null, scale: null, scaled: null, zoom: null, zoomed: null, play: null, stop: null };
  var Gr = '<div class="viewer-container" tabindex="-1" touch-action="none"><div class="viewer-canvas"></div><div class="viewer-footer"><div class="viewer-title"></div><div class="viewer-toolbar"></div><div class="viewer-navbar"><ul class="viewer-list" role="navigation"></ul></div></div><div class="viewer-tooltip" role="alert" aria-hidden="true"></div><div class="viewer-button" data-viewer-action="mix" role="button"></div><div class="viewer-player"></div></div>';
  var pe = typeof window < "u" && typeof window.document < "u";
  var zt = pe ? window : {};
  var Wt = pe && zt.document.documentElement ? "ontouchstart" in zt.document.documentElement : false;
  var Ve = pe ? "PointerEvent" in zt : false;
  var at = "viewer";
  var ve = "move";
  var Fn = "switch";
  var te = "zoom";
  var be = "".concat(at, "-active");
  var Xr = "".concat(at, "-close");
  var we = "".concat(at, "-fade");
  var Ye = "".concat(at, "-fixed");
  var qr = "".concat(at, "-fullscreen");
  var Un = "".concat(at, "-fullscreen-exit");
  var Nt = "".concat(at, "-hide");
  var Kr = "".concat(at, "-hide-md-down");
  var Jr = "".concat(at, "-hide-sm-down");
  var Qr = "".concat(at, "-hide-xs-down");
  var xt = "".concat(at, "-in");
  var ee = "".concat(at, "-invisible");
  var Ht = "".concat(at, "-loading");
  var ts = "".concat(at, "-move");
  var jn = "".concat(at, "-open");
  var Zt = "".concat(at, "-show");
  var pt = "".concat(at, "-transition");
  var Vt = "click";
  var $e = "dblclick";
  var Wn = "dragstart";
  var Hn = "focusin";
  var Zn = "keydown";
  var kt = "load";
  var Mt = "error";
  var es = Wt ? "touchend touchcancel" : "mouseup";
  var ns = Wt ? "touchmove" : "mousemove";
  var is = Wt ? "touchstart" : "mousedown";
  var Vn = Ve ? "pointerdown" : is;
  var Yn = Ve ? "pointermove" : ns;
  var $n = Ve ? "pointerup pointercancel" : es;
  var Gn = "resize";
  var Ct = "transitionend";
  var Xn = "wheel";
  var qn = "ready";
  var Kn = "show";
  var Jn = "shown";
  var Qn = "hide";
  var ti = "hidden";
  var ei = "view";
  var ne = "viewed";
  var ni = "move";
  var ii = "moved";
  var ri = "rotate";
  var si = "rotated";
  var ai = "scale";
  var oi = "scaled";
  var li = "zoom";
  var ci = "zoomed";
  var ui = "play";
  var di = "stop";
  var ye = "".concat(at, "Action");
  var Ge = /\s\s*/;
  var _e = ["zoom-in", "zoom-out", "one-to-one", "reset", "prev", "play", "next", "rotate-left", "rotate-right", "flip-horizontal", "flip-vertical"];
  function ie(n) {
    return typeof n == "string";
  }
  var rs = Number.isNaN || zt.isNaN;
  function mt(n) {
    return typeof n == "number" && !rs(n);
  }
  function Yt(n) {
    return typeof n > "u";
  }
  function $t(n) {
    return Ze(n) === "object" && n !== null;
  }
  var ss = Object.prototype.hasOwnProperty;
  function Gt(n) {
    if (!$t(n)) return false;
    try {
      var e = n.constructor, t = e.prototype;
      return e && t && ss.call(t, "isPrototypeOf");
    } catch {
      return false;
    }
  }
  function ut(n) {
    return typeof n == "function";
  }
  function ht(n, e) {
    if (n && ut(e)) if (Array.isArray(n) || mt(n.length)) {
      var t = n.length, i;
      for (i = 0; i < t && e.call(n, n[i], i, n) !== false; i += 1) ;
    } else $t(n) && Object.keys(n).forEach(function(r) {
      e.call(n, n[r], r, n);
    });
    return n;
  }
  var At = Object.assign || function(e) {
    for (var t = arguments.length, i = new Array(t > 1 ? t - 1 : 0), r = 1; r < t; r++) i[r - 1] = arguments[r];
    return $t(e) && i.length > 0 && i.forEach(function(a) {
      $t(a) && Object.keys(a).forEach(function(s) {
        e[s] = a[s];
      });
    }), e;
  };
  var as = /^(?:width|height|left|top|marginLeft|marginTop)$/;
  function St(n, e) {
    var t = n.style;
    ht(e, function(i, r) {
      as.test(r) && mt(i) && (i += "px"), t[r] = i;
    });
  }
  function os(n) {
    return ie(n) ? n.replace(/&(?!amp;|quot;|#39;|lt;|gt;)/g, "&amp;").replace(/"/g, "&quot;").replace(/'/g, "&#39;").replace(/</g, "&lt;").replace(/>/g, "&gt;") : n;
  }
  function Xt(n, e) {
    return !n || !e ? false : n.classList ? n.classList.contains(e) : n.className.indexOf(e) > -1;
  }
  function it(n, e) {
    if (!(!n || !e)) {
      if (mt(n.length)) {
        ht(n, function(i) {
          it(i, e);
        });
        return;
      }
      if (n.classList) {
        n.classList.add(e);
        return;
      }
      var t = n.className.trim();
      t ? t.indexOf(e) < 0 && (n.className = "".concat(t, " ").concat(e)) : n.className = e;
    }
  }
  function ct(n, e) {
    if (!(!n || !e)) {
      if (mt(n.length)) {
        ht(n, function(t) {
          ct(t, e);
        });
        return;
      }
      if (n.classList) {
        n.classList.remove(e);
        return;
      }
      n.className.indexOf(e) >= 0 && (n.className = n.className.replace(e, ""));
    }
  }
  function re(n, e, t) {
    if (e) {
      if (mt(n.length)) {
        ht(n, function(i) {
          re(i, e, t);
        });
        return;
      }
      t ? it(n, e) : ct(n, e);
    }
  }
  var ls = /([a-z\d])([A-Z])/g;
  function Xe(n) {
    return n.replace(ls, "$1-$2").toLowerCase();
  }
  function qt(n, e) {
    return $t(n[e]) ? n[e] : n.dataset ? n.dataset[e] : n.getAttribute("data-".concat(Xe(e)));
  }
  function qe(n, e, t) {
    $t(t) ? n[e] = t : n.dataset ? n.dataset[e] = t : n.setAttribute("data-".concat(Xe(e)), t);
  }
  var hi = (function() {
    var n = false;
    if (pe) {
      var e = false, t = function() {
      }, i = Object.defineProperty({}, "once", { get: function() {
        return n = true, e;
      }, set: function(a) {
        e = a;
      } });
      zt.addEventListener("test", t, i), zt.removeEventListener("test", t, i);
    }
    return n;
  })();
  function dt(n, e, t) {
    var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, r = t;
    e.trim().split(Ge).forEach(function(a) {
      if (!hi) {
        var s = n.listeners;
        s && s[a] && s[a][t] && (r = s[a][t], delete s[a][t], Object.keys(s[a]).length === 0 && delete s[a], Object.keys(s).length === 0 && delete n.listeners);
      }
      n.removeEventListener(a, r, i);
    });
  }
  function rt(n, e, t) {
    var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : {}, r = t;
    e.trim().split(Ge).forEach(function(a) {
      if (i.once && !hi) {
        var s = n.listeners, o = s === void 0 ? {} : s;
        r = function() {
          delete o[a][t], n.removeEventListener(a, r, i);
          for (var d = arguments.length, f = new Array(d), g = 0; g < d; g++) f[g] = arguments[g];
          t.apply(n, f);
        }, o[a] || (o[a] = {}), o[a][t] && n.removeEventListener(a, o[a][t], i), o[a][t] = r, n.listeners = o;
      }
      n.addEventListener(a, r, i);
    });
  }
  function vt(n, e, t, i) {
    var r;
    return ut(Event) && ut(CustomEvent) ? r = new CustomEvent(e, He({ bubbles: true, cancelable: true, detail: t }, i)) : (r = document.createEvent("CustomEvent"), r.initCustomEvent(e, true, true, t)), n.dispatchEvent(r);
  }
  function cs(n) {
    var e = n.getBoundingClientRect();
    return { left: e.left + (window.pageXOffset - document.documentElement.clientLeft), top: e.top + (window.pageYOffset - document.documentElement.clientTop) };
  }
  function Ae(n) {
    var e = n.rotate, t = n.scaleX, i = n.scaleY, r = n.translateX, a = n.translateY, s = [];
    mt(r) && r !== 0 && s.push("translateX(".concat(r, "px)")), mt(a) && a !== 0 && s.push("translateY(".concat(a, "px)")), mt(e) && e !== 0 && s.push("rotate(".concat(e, "deg)")), mt(t) && t !== 1 && s.push("scaleX(".concat(t, ")")), mt(i) && i !== 1 && s.push("scaleY(".concat(i, ")"));
    var o = s.length ? s.join(" ") : "none";
    return { WebkitTransform: o, msTransform: o, transform: o };
  }
  function us(n) {
    return ie(n) ? decodeURIComponent(n.replace(/^.*\//, "").replace(/[?&#].*$/, "")) : "";
  }
  var Ke = zt.navigator && /Version\/\d+(\.\d+)+?\s+Safari/i.test(zt.navigator.userAgent);
  function fi(n, e, t) {
    var i = document.createElement("img");
    if (n.naturalWidth && !Ke) return t(n.naturalWidth, n.naturalHeight), i;
    var r = document.body || document.documentElement;
    return i.onload = function() {
      t(i.width, i.height), Ke || r.removeChild(i);
    }, ht(e.inheritedAttributes, function(a) {
      var s = n.getAttribute(a);
      s !== null && i.setAttribute(a, s);
    }), i.src = n.src, Ke || (i.style.cssText = "left:0;max-height:none!important;max-width:none!important;min-height:0!important;min-width:0!important;opacity:0;position:absolute;top:0;z-index:-1;", r.appendChild(i)), i;
  }
  function xe(n) {
    switch (n) {
      case 2:
        return Qr;
      case 3:
        return Jr;
      case 4:
        return Kr;
      default:
        return "";
    }
  }
  function ds(n) {
    var e = He({}, n), t = [];
    return ht(n, function(i, r) {
      delete e[r], ht(e, function(a) {
        var s = Math.abs(i.startX - a.startX), o = Math.abs(i.startY - a.startY), c = Math.abs(i.endX - a.endX), d = Math.abs(i.endY - a.endY), f = Math.sqrt(s * s + o * o), g = Math.sqrt(c * c + d * d), b = (g - f) / f;
        t.push(b);
      });
    }), t.sort(function(i, r) {
      return Math.abs(i) < Math.abs(r);
    }), t[0];
  }
  function ke(n, e) {
    var t = n.pageX, i = n.pageY, r = { endX: t, endY: i };
    return e ? r : He({ timeStamp: Date.now(), startX: t, startY: i }, r);
  }
  function hs(n) {
    var e = 0, t = 0, i = 0;
    return ht(n, function(r) {
      var a = r.startX, s = r.startY;
      e += a, t += s, i += 1;
    }), e /= i, t /= i, { pageX: e, pageY: t };
  }
  var fs = { render: function() {
    this.initContainer(), this.initViewer(), this.initList(), this.renderViewer();
  }, initBody: function() {
    var e = this.element.ownerDocument, t = e.body || e.documentElement;
    this.body = t, this.scrollbarWidth = window.innerWidth - e.documentElement.clientWidth, this.initialBodyPaddingRight = t.style.paddingRight, this.initialBodyComputedPaddingRight = window.getComputedStyle(t).paddingRight;
  }, initContainer: function() {
    this.containerData = { width: window.innerWidth, height: window.innerHeight };
  }, initViewer: function() {
    var e = this.options, t = this.parent, i;
    e.inline && (i = { width: Math.max(t.offsetWidth, e.minWidth), height: Math.max(t.offsetHeight, e.minHeight) }, this.parentData = i), (this.fulled || !i) && (i = this.containerData), this.viewerData = At({}, i);
  }, renderViewer: function() {
    this.options.inline && !this.fulled && St(this.viewer, this.viewerData);
  }, initList: function() {
    var e = this, t = this.element, i = this.options, r = this.list, a = [];
    r.innerHTML = "", ht(this.images, function(s, o) {
      var c = s.src, d = s.alt || us(c), f = e.getImageURL(s);
      if (c || f) {
        var g = document.createElement("li"), b = document.createElement("img");
        ht(i.inheritedAttributes, function(m) {
          var _ = s.getAttribute(m);
          _ !== null && b.setAttribute(m, _);
        }), i.navbar && (b.src = c || f), b.alt = d, b.setAttribute("data-original-url", f || c), g.setAttribute("data-index", o), g.setAttribute("data-viewer-action", "view"), g.setAttribute("role", "button"), i.keyboard && g.setAttribute("tabindex", 0), g.appendChild(b), r.appendChild(g), a.push(g);
      }
    }), this.items = a, ht(a, function(s) {
      var o = s.firstElementChild, c, d;
      qe(o, "filled", true), i.loading && it(s, Ht), rt(o, kt, c = function(g) {
        dt(o, Mt, d), i.loading && ct(s, Ht), e.loadImage(g);
      }, { once: true }), rt(o, Mt, d = function() {
        dt(o, kt, c), i.loading && ct(s, Ht);
      }, { once: true });
    }), i.transition && rt(t, ne, function() {
      it(r, pt);
    }, { once: true });
  }, renderList: function() {
    var e = this.index, t = this.items[e];
    if (t) {
      var i = t.nextElementSibling, r = parseInt(window.getComputedStyle(i || t).marginLeft, 10), a = t.offsetWidth, s = a + r;
      St(this.list, At({ width: s * this.length - r }, Ae({ translateX: (this.viewerData.width - a) / 2 - s * e })));
    }
  }, resetList: function() {
    var e = this.list;
    e.innerHTML = "", ct(e, pt), St(e, Ae({ translateX: 0 }));
  }, initImage: function(e) {
    var t = this, i = this.options, r = this.image, a = this.viewerData, s = this.footer.offsetHeight, o = a.width, c = Math.max(a.height - s, s), d = this.imageData || {}, f;
    this.imageInitializing = { abort: function() {
      f.onload = null;
    } }, f = fi(r, i, function(g, b) {
      var m = g / b, _ = Math.max(0, Math.min(1, i.initialCoverage)), h = o, v = c;
      t.imageInitializing = false, c * m > o ? v = o / m : h = c * m, _ = mt(_) ? _ : 0.9, h = Math.min(h * _, g), v = Math.min(v * _, b);
      var p = (o - h) / 2, w = (c - v) / 2, x = { left: p, top: w, x: p, y: w, width: h, height: v, oldRatio: 1, ratio: h / g, aspectRatio: m, naturalWidth: g, naturalHeight: b }, E = At({}, x);
      i.rotatable && (x.rotate = d.rotate || 0, E.rotate = 0), i.scalable && (x.scaleX = d.scaleX || 1, x.scaleY = d.scaleY || 1, E.scaleX = 1, E.scaleY = 1), t.imageData = x, t.initialImageData = E, e && e();
    });
  }, renderImage: function(e) {
    var t = this, i = this.image, r = this.imageData;
    if (St(i, At({ width: r.width, height: r.height, marginLeft: r.x, marginTop: r.y }, Ae(r))), e) if ((this.viewing || this.moving || this.rotating || this.scaling || this.zooming) && this.options.transition && Xt(i, pt)) {
      var a = function() {
        t.imageRendering = false, e();
      };
      this.imageRendering = { abort: function() {
        dt(i, Ct, a);
      } }, rt(i, Ct, a, { once: true });
    } else e();
  }, resetImage: function() {
    var e = this.image;
    e && (this.viewing && this.viewing.abort(), e.parentNode.removeChild(e), this.image = null, this.title.innerHTML = "");
  } };
  var ms = { bind: function() {
    var e = this.options, t = this.viewer, i = this.canvas, r = this.element.ownerDocument;
    rt(t, Vt, this.onClick = this.click.bind(this)), rt(t, Wn, this.onDragStart = this.dragstart.bind(this)), rt(i, Vn, this.onPointerDown = this.pointerdown.bind(this)), rt(r, Yn, this.onPointerMove = this.pointermove.bind(this)), rt(r, $n, this.onPointerUp = this.pointerup.bind(this)), rt(r, Zn, this.onKeyDown = this.keydown.bind(this)), rt(window, Gn, this.onResize = this.resize.bind(this)), e.zoomable && e.zoomOnWheel && rt(t, Xn, this.onWheel = this.wheel.bind(this), { passive: false, capture: true }), e.toggleOnDblclick && rt(i, $e, this.onDblclick = this.dblclick.bind(this));
  }, unbind: function() {
    var e = this.options, t = this.viewer, i = this.canvas, r = this.element.ownerDocument;
    dt(t, Vt, this.onClick), dt(t, Wn, this.onDragStart), dt(i, Vn, this.onPointerDown), dt(r, Yn, this.onPointerMove), dt(r, $n, this.onPointerUp), dt(r, Zn, this.onKeyDown), dt(window, Gn, this.onResize), e.zoomable && e.zoomOnWheel && dt(t, Xn, this.onWheel, { passive: false, capture: true }), e.toggleOnDblclick && dt(i, $e, this.onDblclick);
  } };
  var gs = { click: function(e) {
    var t = this.options, i = this.imageData, r = e.target, a = qt(r, ye);
    switch (!a && r.localName === "img" && r.parentElement.localName === "li" && (r = r.parentElement, a = qt(r, ye)), Wt && e.isTrusted && r === this.canvas && clearTimeout(this.clickCanvasTimeout), a) {
      case "mix":
        this.played ? this.stop() : t.inline ? this.fulled ? this.exit() : this.full() : this.hide();
        break;
      case "hide":
        this.pointerMoved || this.hide();
        break;
      case "view":
        this.view(qt(r, "index"));
        break;
      case "zoom-in":
        this.zoom(0.1, true);
        break;
      case "zoom-out":
        this.zoom(-0.1, true);
        break;
      case "one-to-one":
        this.toggle();
        break;
      case "reset":
        this.reset();
        break;
      case "prev":
        this.prev(t.loop);
        break;
      case "play":
        this.play(t.fullscreen);
        break;
      case "next":
        this.next(t.loop);
        break;
      case "rotate-left":
        this.rotate(-90);
        break;
      case "rotate-right":
        this.rotate(90);
        break;
      case "flip-horizontal":
        this.scaleX(-i.scaleX || -1);
        break;
      case "flip-vertical":
        this.scaleY(-i.scaleY || -1);
        break;
      default:
        this.played && this.stop();
    }
  }, dblclick: function(e) {
    e.preventDefault(), this.viewed && e.target === this.image && (Wt && e.isTrusted && clearTimeout(this.doubleClickImageTimeout), this.toggle(e.isTrusted ? e : e.detail && e.detail.originalEvent));
  }, load: function() {
    var e = this;
    this.timeout && (clearTimeout(this.timeout), this.timeout = false);
    var t = this.element, i = this.options, r = this.image, a = this.index, s = this.viewerData;
    ct(r, ee), i.loading && ct(this.canvas, Ht), r.style.cssText = "height:0;" + "margin-left:".concat(s.width / 2, "px;") + "margin-top:".concat(s.height / 2, "px;") + "max-width:none!important;position:relative;width:0;", this.initImage(function() {
      re(r, ts, i.movable), re(r, pt, i.transition), e.renderImage(function() {
        e.viewed = true, e.viewing = false, ut(i.viewed) && rt(t, ne, i.viewed, { once: true }), vt(t, ne, { originalImage: e.images[a], index: a, image: r }, { cancelable: false });
      });
    });
  }, loadImage: function(e) {
    var t = e.target, i = t.parentNode, r = i.offsetWidth || 30, a = i.offsetHeight || 50, s = !!qt(t, "filled");
    fi(t, this.options, function(o, c) {
      var d = o / c, f = r, g = a;
      a * d > r ? s ? f = a * d : g = r / d : s ? g = r / d : f = a * d, St(t, At({ width: f, height: g }, Ae({ translateX: (r - f) / 2, translateY: (a - g) / 2 })));
    });
  }, keydown: function(e) {
    var t = this.options;
    if (t.keyboard) {
      var i = e.keyCode || e.which || e.charCode;
      switch (i) {
        case 13:
          this.viewer.contains(e.target) && this.click(e);
          break;
      }
      if (this.fulled) switch (i) {
        case 27:
          this.played ? this.stop() : t.inline ? this.fulled && this.exit() : this.hide();
          break;
        case 32:
          this.played && this.stop();
          break;
        case 37:
          this.played && this.playing ? this.playing.prev() : this.prev(t.loop);
          break;
        case 38:
          e.preventDefault(), this.zoom(t.zoomRatio, true);
          break;
        case 39:
          this.played && this.playing ? this.playing.next() : this.next(t.loop);
          break;
        case 40:
          e.preventDefault(), this.zoom(-t.zoomRatio, true);
          break;
        case 48:
        case 49:
          e.ctrlKey && (e.preventDefault(), this.toggle());
          break;
      }
    }
  }, dragstart: function(e) {
    e.target.localName === "img" && e.preventDefault();
  }, pointerdown: function(e) {
    var t = this.options, i = this.pointers, r = e.buttons, a = e.button;
    if (this.pointerMoved = false, !(!this.viewed || this.showing || this.viewing || this.hiding || (e.type === "mousedown" || e.type === "pointerdown" && e.pointerType === "mouse") && (mt(r) && r !== 1 || mt(a) && a !== 0 || e.ctrlKey))) {
      e.preventDefault(), e.changedTouches ? ht(e.changedTouches, function(o) {
        i[o.identifier] = ke(o);
      }) : i[e.pointerId || 0] = ke(e);
      var s = t.movable ? ve : false;
      t.zoomOnTouch && t.zoomable && Object.keys(i).length > 1 ? s = te : t.slideOnTouch && (e.pointerType === "touch" || e.type === "touchstart") && this.isSwitchable() && (s = Fn), t.transition && (s === ve || s === te) && ct(this.image, pt), this.action = s;
    }
  }, pointermove: function(e) {
    var t = this.pointers, i = this.action;
    !this.viewed || !i || (e.preventDefault(), e.changedTouches ? ht(e.changedTouches, function(r) {
      At(t[r.identifier] || {}, ke(r, true));
    }) : At(t[e.pointerId || 0] || {}, ke(e, true)), this.change(e));
  }, pointerup: function(e) {
    var t = this, i = this.options, r = this.action, a = this.pointers, s;
    e.changedTouches ? ht(e.changedTouches, function(o) {
      s = a[o.identifier], delete a[o.identifier];
    }) : (s = a[e.pointerId || 0], delete a[e.pointerId || 0]), r && (e.preventDefault(), i.transition && (r === ve || r === te) && it(this.image, pt), this.action = false, Wt && r !== te && s && Date.now() - s.timeStamp < 500 && (clearTimeout(this.clickCanvasTimeout), clearTimeout(this.doubleClickImageTimeout), i.toggleOnDblclick && this.viewed && e.target === this.image ? this.imageClicked ? (this.imageClicked = false, this.doubleClickImageTimeout = setTimeout(function() {
      vt(t.image, $e, { originalEvent: e });
    }, 50)) : (this.imageClicked = true, this.doubleClickImageTimeout = setTimeout(function() {
      t.imageClicked = false;
    }, 500)) : (this.imageClicked = false, i.backdrop && i.backdrop !== "static" && e.target === this.canvas && (this.clickCanvasTimeout = setTimeout(function() {
      vt(t.canvas, Vt, { originalEvent: e });
    }, 50)))));
  }, resize: function() {
    var e = this;
    if (!(!this.isShown || this.hiding) && (this.fulled && (this.close(), this.initBody(), this.open()), this.initContainer(), this.initViewer(), this.renderViewer(), this.renderList(), this.viewed && this.initImage(function() {
      e.renderImage();
    }), this.played)) {
      if (this.options.fullscreen && this.fulled && !(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)) {
        this.stop();
        return;
      }
      ht(this.player.getElementsByTagName("img"), function(t) {
        rt(t, kt, e.loadImage.bind(e), { once: true }), vt(t, kt);
      });
    }
  }, wheel: function(e) {
    var t = this;
    if (this.viewed && (e.preventDefault(), !this.wheeling)) {
      this.wheeling = true, setTimeout(function() {
        t.wheeling = false;
      }, 50);
      var i = Number(this.options.zoomRatio) || 0.1, r = 1;
      e.deltaY ? r = e.deltaY > 0 ? 1 : -1 : e.wheelDelta ? r = -e.wheelDelta / 120 : e.detail && (r = e.detail > 0 ? 1 : -1), this.zoom(-r * i, true, null, e);
    }
  } };
  var ps = { show: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false, t = this.element, i = this.options;
    if (i.inline || this.showing || this.isShown || this.showing) return this;
    if (!this.ready) return this.build(), this.ready && this.show(e), this;
    if (ut(i.show) && rt(t, Kn, i.show, { once: true }), vt(t, Kn) === false || !this.ready) return this;
    this.hiding && this.transitioning.abort(), this.showing = true, this.open();
    var r = this.viewer;
    if (ct(r, Nt), r.setAttribute("role", "dialog"), r.setAttribute("aria-labelledby", this.title.id), r.setAttribute("aria-modal", true), r.removeAttribute("aria-hidden"), i.transition && !e) {
      var a = this.shown.bind(this);
      this.transitioning = { abort: function() {
        dt(r, Ct, a), ct(r, xt);
      } }, it(r, pt), r.initialOffsetWidth = r.offsetWidth, rt(r, Ct, a, { once: true }), it(r, xt);
    } else it(r, xt), this.shown();
    return this;
  }, hide: function() {
    var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false, i = this.element, r = this.options;
    if (r.inline || this.hiding || !(this.isShown || this.showing)) return this;
    if (ut(r.hide) && rt(i, Qn, r.hide, { once: true }), vt(i, Qn) === false) return this;
    this.showing && this.transitioning.abort(), this.hiding = true, this.played ? this.stop() : this.viewing && this.viewing.abort();
    var a = this.viewer, s = this.image, o = function() {
      ct(a, xt), e.hidden();
    };
    if (r.transition && !t) {
      var c = function f(g) {
        g && g.target === a && (dt(a, Ct, f), e.hidden());
      }, d = function() {
        Xt(a, pt) ? (rt(a, Ct, c), ct(a, xt)) : o();
      };
      this.transitioning = { abort: function() {
        e.viewed && Xt(s, pt) ? dt(s, Ct, d) : Xt(a, pt) && dt(a, Ct, c);
      } }, this.viewed && Xt(s, pt) ? (rt(s, Ct, d, { once: true }), this.zoomTo(0, false, null, null, true)) : d();
    } else o();
    return this;
  }, view: function() {
    var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : this.options.initialViewIndex;
    if (t = Number(t) || 0, this.hiding || this.played || t < 0 || t >= this.length || this.viewed && t === this.index) return this;
    if (!this.isShown) return this.index = t, this.show();
    this.viewing && this.viewing.abort();
    var i = this.element, r = this.options, a = this.title, s = this.canvas, o = this.items[t], c = o.querySelector("img"), d = qt(c, "originalUrl"), f = c.getAttribute("alt"), g = document.createElement("img");
    if (ht(r.inheritedAttributes, function(v) {
      var p = c.getAttribute(v);
      p !== null && g.setAttribute(v, p);
    }), g.src = d, g.alt = f, ut(r.view) && rt(i, ei, r.view, { once: true }), vt(i, ei, { originalImage: this.images[t], index: t, image: g }) === false || !this.isShown || this.hiding || this.played) return this;
    var b = this.items[this.index];
    b && (ct(b, be), b.removeAttribute("aria-selected")), it(o, be), o.setAttribute("aria-selected", true), r.focus && o.focus(), this.image = g, this.viewed = false, this.index = t, this.imageData = {}, it(g, ee), r.loading && it(s, Ht), s.innerHTML = "", s.appendChild(g), this.renderList(), a.innerHTML = "";
    var m = function() {
      var p = e.imageData, w = Array.isArray(r.title) ? r.title[1] : r.title;
      a.innerHTML = os(ut(w) ? w.call(e, g, p) : "".concat(f, " (").concat(p.naturalWidth, " \xD7 ").concat(p.naturalHeight, ")"));
    }, _, h;
    return rt(i, ne, m, { once: true }), this.viewing = { abort: function() {
      dt(i, ne, m), g.complete ? e.imageRendering ? e.imageRendering.abort() : e.imageInitializing && e.imageInitializing.abort() : (g.src = "", dt(g, kt, _), e.timeout && clearTimeout(e.timeout));
    } }, g.complete ? this.load() : (rt(g, kt, _ = function() {
      dt(g, Mt, h), e.load();
    }, { once: true }), rt(g, Mt, h = function() {
      dt(g, kt, _), e.timeout && (clearTimeout(e.timeout), e.timeout = false), ct(g, ee), r.loading && ct(e.canvas, Ht);
    }, { once: true }), this.timeout && clearTimeout(this.timeout), this.timeout = setTimeout(function() {
      ct(g, ee), e.timeout = false;
    }, 1e3)), this;
  }, prev: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false, t = this.index - 1;
    return t < 0 && (t = e ? this.length - 1 : 0), this.view(t), this;
  }, next: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false, t = this.length - 1, i = this.index + 1;
    return i > t && (i = e ? 0 : t), this.view(i), this;
  }, move: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, i = this.imageData;
    return this.moveTo(Yt(e) ? e : i.x + Number(e), Yt(t) ? t : i.y + Number(t)), this;
  }, moveTo: function(e) {
    var t = this, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, a = this.element, s = this.options, o = this.imageData;
    if (e = Number(e), i = Number(i), this.viewed && !this.played && s.movable) {
      var c = o.x, d = o.y, f = false;
      if (mt(e) ? f = true : e = c, mt(i) ? f = true : i = d, f) {
        if (ut(s.move) && rt(a, ni, s.move, { once: true }), vt(a, ni, { x: e, y: i, oldX: c, oldY: d, originalEvent: r }) === false) return this;
        o.x = e, o.y = i, o.left = e, o.top = i, this.moving = true, this.renderImage(function() {
          t.moving = false, ut(s.moved) && rt(a, ii, s.moved, { once: true }), vt(a, ii, { x: e, y: i, oldX: c, oldY: d, originalEvent: r }, { cancelable: false });
        });
      }
    }
    return this;
  }, rotate: function(e) {
    return this.rotateTo((this.imageData.rotate || 0) + Number(e)), this;
  }, rotateTo: function(e) {
    var t = this, i = this.element, r = this.options, a = this.imageData;
    if (e = Number(e), mt(e) && this.viewed && !this.played && r.rotatable) {
      var s = a.rotate;
      if (ut(r.rotate) && rt(i, ri, r.rotate, { once: true }), vt(i, ri, { degree: e, oldDegree: s }) === false) return this;
      a.rotate = e, this.rotating = true, this.renderImage(function() {
        t.rotating = false, ut(r.rotated) && rt(i, si, r.rotated, { once: true }), vt(i, si, { degree: e, oldDegree: s }, { cancelable: false });
      });
    }
    return this;
  }, scaleX: function(e) {
    return this.scale(e, this.imageData.scaleY), this;
  }, scaleY: function(e) {
    return this.scale(this.imageData.scaleX, e), this;
  }, scale: function(e) {
    var t = this, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : e, r = this.element, a = this.options, s = this.imageData;
    if (e = Number(e), i = Number(i), this.viewed && !this.played && a.scalable) {
      var o = s.scaleX, c = s.scaleY, d = false;
      if (mt(e) ? d = true : e = o, mt(i) ? d = true : i = c, d) {
        if (ut(a.scale) && rt(r, ai, a.scale, { once: true }), vt(r, ai, { scaleX: e, scaleY: i, oldScaleX: o, oldScaleY: c }) === false) return this;
        s.scaleX = e, s.scaleY = i, this.scaling = true, this.renderImage(function() {
          t.scaling = false, ut(a.scaled) && rt(r, oi, a.scaled, { once: true }), vt(r, oi, { scaleX: e, scaleY: i, oldScaleX: o, oldScaleY: c }, { cancelable: false });
        });
      }
    }
    return this;
  }, zoom: function(e) {
    var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, i = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, r = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, a = this.imageData;
    return e = Number(e), e < 0 ? e = 1 / (1 - e) : e = 1 + e, this.zoomTo(a.width * e / a.naturalWidth, t, i, r), this;
  }, zoomTo: function(e) {
    var t = this, i = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false, r = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null, a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null, s = arguments.length > 4 && arguments[4] !== void 0 ? arguments[4] : false, o = this.element, c = this.options, d = this.pointers, f = this.imageData, g = f.x, b = f.y, m = f.width, _ = f.height, h = f.naturalWidth, v = f.naturalHeight;
    if (e = Math.max(0, e), mt(e) && this.viewed && !this.played && (s || c.zoomable)) {
      if (!s) {
        var p = Math.max(0.01, c.minZoomRatio), w = Math.min(100, c.maxZoomRatio);
        e = Math.min(Math.max(e, p), w);
      }
      if (a) switch (a.type) {
        case "wheel":
          c.zoomRatio >= 0.055 && e > 0.95 && e < 1.05 && (e = 1);
          break;
        case "pointermove":
        case "touchmove":
        case "mousemove":
          e > 0.99 && e < 1.01 && (e = 1);
          break;
      }
      var x = h * e, E = v * e, S = x - m, T = E - _, D = f.ratio;
      if (ut(c.zoom) && rt(o, li, c.zoom, { once: true }), vt(o, li, { ratio: e, oldRatio: D, originalEvent: a }) === false) return this;
      if (this.zooming = true, a) {
        var O = cs(this.viewer), C = d && Object.keys(d).length > 0 ? hs(d) : { pageX: a.pageX, pageY: a.pageY };
        f.x -= S * ((C.pageX - O.left - g) / m), f.y -= T * ((C.pageY - O.top - b) / _);
      } else Gt(r) && mt(r.x) && mt(r.y) ? (f.x -= S * ((r.x - g) / m), f.y -= T * ((r.y - b) / _)) : (f.x -= S / 2, f.y -= T / 2);
      f.left = f.x, f.top = f.y, f.width = x, f.height = E, f.oldRatio = D, f.ratio = e, this.renderImage(function() {
        t.zooming = false, ut(c.zoomed) && rt(o, ci, c.zoomed, { once: true }), vt(o, ci, { ratio: e, oldRatio: D, originalEvent: a }, { cancelable: false });
      }), i && this.tooltip();
    }
    return this;
  }, play: function() {
    var e = this, t = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
    if (!this.isShown || this.played) return this;
    var i = this.element, r = this.options;
    if (ut(r.play) && rt(i, ui, r.play, { once: true }), vt(i, ui) === false) return this;
    var a = this.player, s = this.loadImage.bind(this), o = [], c = 0, d = 0;
    if (this.played = true, this.onLoadWhenPlay = s, t && this.requestFullscreen(t), it(a, Zt), ht(this.items, function(b, m) {
      var _ = b.querySelector("img"), h = document.createElement("img");
      h.src = qt(_, "originalUrl"), h.alt = _.getAttribute("alt"), h.referrerPolicy = _.referrerPolicy, c += 1, it(h, we), re(h, pt, r.transition), Xt(b, be) && (it(h, xt), d = m), o.push(h), rt(h, kt, s, { once: true }), a.appendChild(h);
    }), mt(r.interval) && r.interval > 0) {
      var f = function b() {
        clearTimeout(e.playing.timeout), ct(o[d], xt), d -= 1, d = d >= 0 ? d : c - 1, it(o[d], xt), e.playing.timeout = setTimeout(b, r.interval);
      }, g = function b() {
        clearTimeout(e.playing.timeout), ct(o[d], xt), d += 1, d = d < c ? d : 0, it(o[d], xt), e.playing.timeout = setTimeout(b, r.interval);
      };
      c > 1 && (this.playing = { prev: f, next: g, timeout: setTimeout(g, r.interval) });
    }
    return this;
  }, stop: function() {
    var e = this;
    if (!this.played) return this;
    var t = this.element, i = this.options;
    if (ut(i.stop) && rt(t, di, i.stop, { once: true }), vt(t, di) === false) return this;
    var r = this.player;
    return clearTimeout(this.playing.timeout), this.playing = false, this.played = false, ht(r.getElementsByTagName("img"), function(a) {
      dt(a, kt, e.onLoadWhenPlay);
    }), ct(r, Zt), r.innerHTML = "", this.exitFullscreen(), this;
  }, full: function() {
    var e = this, t = this.options, i = this.viewer, r = this.image, a = this.list;
    return !this.isShown || this.played || this.fulled || !t.inline ? this : (this.fulled = true, this.open(), it(this.button, Un), t.transition && (ct(a, pt), this.viewed && ct(r, pt)), it(i, Ye), i.setAttribute("role", "dialog"), i.setAttribute("aria-labelledby", this.title.id), i.setAttribute("aria-modal", true), i.removeAttribute("style"), St(i, { zIndex: t.zIndex }), t.focus && this.enforceFocus(), this.initContainer(), this.viewerData = At({}, this.containerData), this.renderList(), this.viewed && this.initImage(function() {
      e.renderImage(function() {
        t.transition && setTimeout(function() {
          it(r, pt), it(a, pt);
        }, 0);
      });
    }), this);
  }, exit: function() {
    var e = this, t = this.options, i = this.viewer, r = this.image, a = this.list;
    return !this.isShown || this.played || !this.fulled || !t.inline ? this : (this.fulled = false, this.close(), ct(this.button, Un), t.transition && (ct(a, pt), this.viewed && ct(r, pt)), t.focus && this.clearEnforceFocus(), i.removeAttribute("role"), i.removeAttribute("aria-labelledby"), i.removeAttribute("aria-modal"), ct(i, Ye), St(i, { zIndex: t.zIndexInline }), this.viewerData = At({}, this.parentData), this.renderViewer(), this.renderList(), this.viewed && this.initImage(function() {
      e.renderImage(function() {
        t.transition && setTimeout(function() {
          it(r, pt), it(a, pt);
        }, 0);
      });
    }), this);
  }, tooltip: function() {
    var e = this, t = this.options, i = this.tooltipBox, r = this.imageData;
    return !this.viewed || this.played || !t.tooltip ? this : (i.textContent = "".concat(Math.round(r.ratio * 100), "%"), this.tooltipping ? clearTimeout(this.tooltipping) : t.transition ? (this.fading && vt(i, Ct), it(i, Zt), it(i, we), it(i, pt), i.removeAttribute("aria-hidden"), i.initialOffsetWidth = i.offsetWidth, it(i, xt)) : (it(i, Zt), i.removeAttribute("aria-hidden")), this.tooltipping = setTimeout(function() {
      t.transition ? (rt(i, Ct, function() {
        ct(i, Zt), ct(i, we), ct(i, pt), i.setAttribute("aria-hidden", true), e.fading = false;
      }, { once: true }), ct(i, xt), e.fading = true) : (ct(i, Zt), i.setAttribute("aria-hidden", true)), e.tooltipping = false;
    }, 1e3), this);
  }, toggle: function() {
    var e = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
    return this.imageData.ratio === 1 ? this.zoomTo(this.imageData.oldRatio, true, null, e) : this.zoomTo(1, true, null, e), this;
  }, reset: function() {
    return this.viewed && !this.played && (this.imageData = At({}, this.initialImageData), this.renderImage()), this;
  }, update: function() {
    var e = this, t = this.element, i = this.options, r = this.isImg;
    if (r && !t.parentNode) return this.destroy();
    var a = [];
    if (ht(r ? [t] : t.querySelectorAll("img"), function(d) {
      ut(i.filter) ? i.filter.call(e, d) && a.push(d) : e.getImageURL(d) && a.push(d);
    }), !a.length) return this;
    if (this.images = a, this.length = a.length, this.ready) {
      var s = [];
      if (ht(this.items, function(d, f) {
        var g = d.querySelector("img"), b = a[f];
        b && g ? (b.src !== g.src || b.alt !== g.alt) && s.push(f) : s.push(f);
      }), St(this.list, { width: "auto" }), this.initList(), this.isShown) if (this.length) {
        if (this.viewed) {
          var o = s.indexOf(this.index);
          if (o >= 0) this.viewed = false, this.view(Math.max(Math.min(this.index - o, this.length - 1), 0));
          else {
            var c = this.items[this.index];
            it(c, be), c.setAttribute("aria-selected", true);
          }
        }
      } else this.image = null, this.viewed = false, this.index = 0, this.imageData = {}, this.canvas.innerHTML = "", this.title.innerHTML = "";
    } else this.build();
    return this;
  }, destroy: function() {
    var e = this.element, t = this.options;
    return e[at] ? (this.destroyed = true, this.ready ? (this.played && this.stop(), t.inline ? (this.fulled && this.exit(), this.unbind()) : this.isShown ? (this.viewing && (this.imageRendering ? this.imageRendering.abort() : this.imageInitializing && this.imageInitializing.abort()), this.hiding && this.transitioning.abort(), this.hidden()) : this.showing && (this.transitioning.abort(), this.hidden()), this.ready = false, this.viewer.parentNode.removeChild(this.viewer)) : t.inline && (this.delaying ? this.delaying.abort() : this.initializing && this.initializing.abort()), t.inline || dt(e, Vt, this.onStart), e[at] = void 0, this) : this;
  } };
  var vs = { getImageURL: function(e) {
    var t = this.options.url;
    return ie(t) ? t = e.getAttribute(t) : ut(t) ? t = t.call(this, e) : t = "", t;
  }, enforceFocus: function() {
    var e = this;
    this.clearEnforceFocus(), rt(document, Hn, this.onFocusin = function(t) {
      var i = e.viewer, r = t.target;
      if (!(r === document || r === i || i.contains(r))) {
        for (; r; ) {
          if (r.getAttribute("tabindex") !== null || r.getAttribute("aria-modal") === "true") return;
          r = r.parentElement;
        }
        i.focus();
      }
    });
  }, clearEnforceFocus: function() {
    this.onFocusin && (dt(document, Hn, this.onFocusin), this.onFocusin = null);
  }, open: function() {
    var e = this.body;
    it(e, jn), this.scrollbarWidth > 0 && (e.style.paddingRight = "".concat(this.scrollbarWidth + (parseFloat(this.initialBodyComputedPaddingRight) || 0), "px"));
  }, close: function() {
    var e = this.body;
    ct(e, jn), this.scrollbarWidth > 0 && (e.style.paddingRight = this.initialBodyPaddingRight);
  }, shown: function() {
    var e = this.element, t = this.options, i = this.viewer;
    this.fulled = true, this.isShown = true, this.render(), this.bind(), this.showing = false, t.focus && (i.focus(), this.enforceFocus()), ut(t.shown) && rt(e, Jn, t.shown, { once: true }), vt(e, Jn) !== false && this.ready && this.isShown && !this.hiding && this.view(this.index);
  }, hidden: function() {
    var e = this.element, t = this.options, i = this.viewer;
    t.fucus && this.clearEnforceFocus(), this.close(), this.unbind(), it(i, Nt), i.removeAttribute("role"), i.removeAttribute("aria-labelledby"), i.removeAttribute("aria-modal"), i.setAttribute("aria-hidden", true), this.resetList(), this.resetImage(), this.fulled = false, this.viewed = false, this.isShown = false, this.hiding = false, this.destroyed || (ut(t.hidden) && rt(e, ti, t.hidden, { once: true }), vt(e, ti, null, { cancelable: false }));
  }, requestFullscreen: function(e) {
    var t = this.element.ownerDocument;
    if (this.fulled && !(t.fullscreenElement || t.webkitFullscreenElement || t.mozFullScreenElement || t.msFullscreenElement)) {
      var i = t.documentElement;
      i.requestFullscreen ? Gt(e) ? i.requestFullscreen(e) : i.requestFullscreen() : i.webkitRequestFullscreen ? i.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT) : i.mozRequestFullScreen ? i.mozRequestFullScreen() : i.msRequestFullscreen && i.msRequestFullscreen();
    }
  }, exitFullscreen: function() {
    var e = this.element.ownerDocument;
    this.fulled && (e.fullscreenElement || e.webkitFullscreenElement || e.mozFullScreenElement || e.msFullscreenElement) && (e.exitFullscreen ? e.exitFullscreen() : e.webkitExitFullscreen ? e.webkitExitFullscreen() : e.mozCancelFullScreen ? e.mozCancelFullScreen() : e.msExitFullscreen && e.msExitFullscreen());
  }, change: function(e) {
    var t = this.options, i = this.pointers, r = i[Object.keys(i)[0]];
    if (r) {
      var a = r.endX - r.startX, s = r.endY - r.startY;
      switch (this.action) {
        case ve:
          (a !== 0 || s !== 0) && (this.pointerMoved = true, this.move(a, s, e));
          break;
        case te:
          this.zoom(ds(i), false, null, e);
          break;
        case Fn: {
          this.action = "switched";
          var o = Math.abs(a);
          o > 1 && o > Math.abs(s) && (this.pointers = {}, a > 1 ? this.prev(t.loop) : a < -1 && this.next(t.loop));
          break;
        }
      }
      ht(i, function(c) {
        c.startX = c.endX, c.startY = c.endY;
      });
    }
  }, isSwitchable: function() {
    var e = this.imageData, t = this.viewerData;
    return this.length > 1 && e.x >= 0 && e.y >= 0 && e.width <= t.width && e.height <= t.height;
  } };
  var bs = zt.Viewer;
  var ws = /* @__PURE__ */ (function(n) {
    return function() {
      return n += 1, n;
    };
  })(-1);
  var mi = (function() {
    function n(e) {
      var t = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      if (Zr(this, n), !e || e.nodeType !== 1) throw new Error("The first argument is required and must be an element.");
      this.element = e, this.options = At({}, Pn, Gt(t) && t), this.action = false, this.fading = false, this.fulled = false, this.hiding = false, this.imageClicked = false, this.imageData = {}, this.index = this.options.initialViewIndex, this.isImg = false, this.isShown = false, this.length = 0, this.moving = false, this.played = false, this.playing = false, this.pointers = {}, this.ready = false, this.rotating = false, this.scaling = false, this.showing = false, this.timeout = false, this.tooltipping = false, this.viewed = false, this.viewing = false, this.wheeling = false, this.zooming = false, this.pointerMoved = false, this.id = ws(), this.init();
    }
    return Vr(n, [{ key: "init", value: function() {
      var t = this, i = this.element, r = this.options;
      if (!i[at]) {
        i[at] = this, r.focus && !r.keyboard && (r.focus = false);
        var a = i.localName === "img", s = [];
        if (ht(a ? [i] : i.querySelectorAll("img"), function(d) {
          ut(r.filter) ? r.filter.call(t, d) && s.push(d) : t.getImageURL(d) && s.push(d);
        }), this.isImg = a, this.length = s.length, this.images = s, this.initBody(), Yt(document.createElement(at).style.transition) && (r.transition = false), r.inline) {
          var o = 0, c = function() {
            if (o += 1, o === t.length) {
              var f;
              t.initializing = false, t.delaying = { abort: function() {
                clearTimeout(f);
              } }, f = setTimeout(function() {
                t.delaying = false, t.build();
              }, 0);
            }
          };
          this.initializing = { abort: function() {
            ht(s, function(f) {
              f.complete || (dt(f, kt, c), dt(f, Mt, c));
            });
          } }, ht(s, function(d) {
            if (d.complete) c();
            else {
              var f, g;
              rt(d, kt, f = function() {
                dt(d, Mt, g), c();
              }, { once: true }), rt(d, Mt, g = function() {
                dt(d, kt, f), c();
              }, { once: true });
            }
          });
        } else rt(i, Vt, this.onStart = function(d) {
          var f = d.target;
          f.localName === "img" && (!ut(r.filter) || r.filter.call(t, f)) && t.view(t.images.indexOf(f));
        });
      }
    } }, { key: "build", value: function() {
      if (!this.ready) {
        var t = this.element, i = this.options, r = t.parentNode, a = document.createElement("div");
        a.innerHTML = Gr;
        var s = a.querySelector(".".concat(at, "-container")), o = s.querySelector(".".concat(at, "-title")), c = s.querySelector(".".concat(at, "-toolbar")), d = s.querySelector(".".concat(at, "-navbar")), f = s.querySelector(".".concat(at, "-button")), g = s.querySelector(".".concat(at, "-canvas"));
        if (this.parent = r, this.viewer = s, this.title = o, this.toolbar = c, this.navbar = d, this.button = f, this.canvas = g, this.footer = s.querySelector(".".concat(at, "-footer")), this.tooltipBox = s.querySelector(".".concat(at, "-tooltip")), this.player = s.querySelector(".".concat(at, "-player")), this.list = s.querySelector(".".concat(at, "-list")), s.id = "".concat(at).concat(this.id), o.id = "".concat(at, "Title").concat(this.id), it(o, i.title ? xe(Array.isArray(i.title) ? i.title[0] : i.title) : Nt), it(d, i.navbar ? xe(i.navbar) : Nt), re(f, Nt, !i.button), i.keyboard && f.setAttribute("tabindex", 0), i.backdrop && (it(s, "".concat(at, "-backdrop")), !i.inline && i.backdrop !== "static" && qe(g, ye, "hide")), ie(i.className) && i.className && i.className.split(Ge).forEach(function(x) {
          it(s, x);
        }), i.toolbar) {
          var b = document.createElement("ul"), m = Gt(i.toolbar), _ = _e.slice(0, 3), h = _e.slice(7, 9), v = _e.slice(9);
          m || it(c, xe(i.toolbar)), ht(m ? i.toolbar : _e, function(x, E) {
            var S = m && Gt(x), T = m ? Xe(E) : x, D = S && !Yt(x.show) ? x.show : x;
            if (!(!D || !i.zoomable && _.indexOf(T) !== -1 || !i.rotatable && h.indexOf(T) !== -1 || !i.scalable && v.indexOf(T) !== -1)) {
              var O = S && !Yt(x.size) ? x.size : x, C = S && !Yt(x.click) ? x.click : x, M = document.createElement("li");
              i.keyboard && M.setAttribute("tabindex", 0), M.setAttribute("role", "button"), it(M, "".concat(at, "-").concat(T)), ut(C) || qe(M, ye, T), mt(D) && it(M, xe(D)), ["small", "large"].indexOf(O) !== -1 ? it(M, "".concat(at, "-").concat(O)) : T === "play" && it(M, "".concat(at, "-large")), ut(C) && rt(M, Vt, C), b.appendChild(M);
            }
          }), c.appendChild(b);
        } else it(c, Nt);
        if (!i.rotatable) {
          var p = c.querySelectorAll('li[class*="rotate"]');
          it(p, ee), ht(p, function(x) {
            c.appendChild(x);
          });
        }
        if (i.inline) it(f, qr), St(s, { zIndex: i.zIndexInline }), window.getComputedStyle(r).position === "static" && St(r, { position: "relative" }), r.insertBefore(s, t.nextSibling);
        else {
          it(f, Xr), it(s, Ye), it(s, we), it(s, Nt), St(s, { zIndex: i.zIndex });
          var w = i.container;
          ie(w) && (w = t.ownerDocument.querySelector(w)), w || (w = this.body), w.appendChild(s);
        }
        if (i.inline && (this.render(), this.bind(), this.isShown = true), this.ready = true, ut(i.ready) && rt(t, qn, i.ready, { once: true }), vt(t, qn) === false) {
          this.ready = false;
          return;
        }
        this.ready && i.inline && this.view(this.index);
      }
    } }], [{ key: "noConflict", value: function() {
      return window.Viewer = bs, n;
    } }, { key: "setDefaults", value: function(t) {
      At(Pn, Gt(t) && t);
    } }]), n;
  })();
  At(mi.prototype, fs, ms, gs, ps, vs);
  var Viewer = mi;
  var viewer_default = Viewer;

  // src/content/ui/toolbar.js
  var TOOLBAR_ID = "letMeSeeSeeToolbar";
  var BTN_VIEW_ID = "ZoomInIconBtn";
  var BTN_DOWNLOAD_ID = "DownloadIconBtn";
  var BTN_COPY_ID = "CopyImageIconBtn";
  var BTN_OCR_ID = "OcrTextIconBtn";
  var PREVIEW_HIDDEN_CLASS = "lmss-actions--preview-hidden";
  var svg = (path) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">${path}</svg>`;
  var ICONS = {
    view: svg('<path d="M8.00001 3.09779C8.00001 3.09779 4.03375 2.74194 3.38784 3.38785C2.74192 4.03375 3.09784 8 3.09784 8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M8.00001 20.9022C8.00001 20.9022 4.03375 21.2581 3.38784 20.6122C2.74192 19.9662 3.09784 16 3.09784 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M16 3.09779C16 3.09779 19.9663 2.74194 20.6122 3.38785C21.2581 4.03375 20.9022 8 20.9022 8" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M16 20.9022C16 20.9022 19.9663 21.2581 20.6122 20.6122C21.2581 19.9662 20.9022 16 20.9022 16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M14.0107 9.99847L20.0625 3.94678" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.99696 14.0024L3.63966 20.3807" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M9.99732 10.0024L3.84571 3.85889" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M13.9795 14.0024L20.5279 20.4983" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>'),
    copy: svg('<path d="M7.5 14.5C7.5 11.2002 7.5 9.55025 8.52513 8.52513C9.55025 7.5 11.2002 7.5 14.5 7.5C17.7998 7.5 19.4497 7.5 20.4749 8.52513C21.5 9.55025 21.5 11.2002 21.5 14.5C21.5 17.7998 21.5 19.4497 20.4749 20.4749C19.4497 21.5 17.7998 21.5 14.5 21.5C11.2002 21.5 9.55025 21.5 8.52513 20.4749C7.5 19.4497 7.5 17.7998 7.5 14.5Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M7.5 16.5C6.10355 16.5 5.40533 16.5 4.84402 16.3036C3.83866 15.9518 3.0482 15.1613 2.69641 14.156C2.5 13.5947 2.5 12.8964 2.5 11.5V9.5C2.5 6.20017 2.5 4.55025 3.52513 3.52513C4.55025 2.5 6.20017 2.5 9.5 2.5H11.5C12.8964 2.5 13.5947 2.5 14.156 2.69641C15.1613 3.0482 15.9518 3.83866 16.3036 4.84402C16.5 5.40533 16.5 6.10355 16.5 7.5" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>'),
    ocr: svg('<path d="M3 7V5C3 3.89543 3.89543 3 5 3H7M17 3H19C20.1046 3 21 3.89543 21 5V7M21 17V19C21 20.1046 20.1046 21 19 21H17M7 21H5C3.89543 21 3 20.1046 3 19V17" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M8 10H16M12 10V16" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>'),
    download: svg('<path d="M16.9504 12.1817C17.1981 12.814 16.5076 13.5726 15.1267 15.0899C13.6702 16.6902 12.9201 17.4904 12 17.5C11.0799 17.4904 10.3298 16.6902 8.87331 15.0899C7.49239 13.5726 6.80193 12.814 7.04964 12.1817C7.05868 12.1586 7.06851 12.1359 7.0791 12.1135C7.34928 11.542 8.24477 11.5029 10 11.5002V4.99998C10 4.53501 10 4.30253 10.0511 4.11179C10.1898 3.59414 10.5941 3.1898 11.1118 3.05111C11.3025 3 11.535 3 12 3C12.4649 3 12.6974 3 12.8882 3.05111C13.4058 3.1898 13.8102 3.59414 13.9489 4.11179C14 4.30253 14 4.53501 14 4.99998V11.5002C15.7552 11.5029 16.6507 11.542 16.9209 12.1135C16.9315 12.1359 16.9413 12.1586 16.9504 12.1817Z" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/><path d="M5.00006 21H19.0001" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>'),
    copied: svg('<path d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12Z" stroke="currentColor" stroke-width="1.5"/><path d="M8 12.5L10.5 15L16 9" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"/>')
  };
  var currentCornerPosition = "top-right";
  var prewarmed = false;
  function triggerOcrPrewarm() {
    if (prewarmed) return;
    prewarmed = true;
    try {
      if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
        chrome.runtime.sendMessage({ type: "prewarm-ocr" }).catch(() => {
        });
      }
    } catch {
    }
  }
  function createToolbarButton(id, title, iconHtml) {
    const btn = document.createElement("button");
    btn.id = id;
    btn.type = "button";
    btn.className = "zoom-btn";
    btn.title = title;
    btn.setAttribute("aria-label", title);
    btn.innerHTML = iconHtml;
    return btn;
  }
  function showButtonSuccess(btn) {
    btn.classList.add("lmss-action--success");
    const oldHtml = btn.innerHTML;
    const oldTitle = btn.title;
    btn.innerHTML = ICONS.copied;
    btn.title = "\u5DF2\u5B8C\u6210\uFF01";
    btn.setAttribute("aria-label", "\u5DF2\u5B8C\u6210\uFF01");
    window.setTimeout(() => {
      btn.classList.remove("lmss-action--success");
      btn.innerHTML = oldHtml;
      btn.title = oldTitle;
      btn.setAttribute("aria-label", oldTitle);
    }, 1500);
  }
  function showButtonFailure(btn) {
    btn.style.color = "#dc2626";
    window.setTimeout(() => {
      btn.style.color = "";
    }, 1500);
  }
  function applyToolbarCornerPosition(el, position) {
    Object.assign(el.style, {
      top: "",
      right: "",
      bottom: "",
      left: "",
      borderTopLeftRadius: "",
      borderTopRightRadius: "",
      borderBottomLeftRadius: "",
      borderBottomRightRadius: ""
    });
    switch (position) {
      case "top-left":
        el.style.top = "0px";
        el.style.left = "0px";
        el.style.borderBottomRightRadius = "12px";
        break;
      case "top-right":
        el.style.top = "0px";
        el.style.right = "0px";
        el.style.borderBottomLeftRadius = "12px";
        break;
      case "bottom-left":
        el.style.bottom = "0px";
        el.style.left = "0px";
        el.style.borderTopRightRadius = "12px";
        break;
      case "bottom-right":
        el.style.bottom = "0px";
        el.style.right = "0px";
        el.style.borderTopLeftRadius = "12px";
        break;
    }
  }
  function createFloatingToolbar(onAction) {
    triggerOcrPrewarm();
    const actionHandler = onAction || typeof window !== "undefined" && window.__letMeSeeSeeToolbarAction || (() => {
    });
    const existingView = document.getElementById(BTN_VIEW_ID);
    const existingDownload = document.getElementById(BTN_DOWNLOAD_ID);
    const existingCopy = document.getElementById(BTN_COPY_ID);
    const existingOcr = document.getElementById(BTN_OCR_ID);
    if (existingView && existingDownload && existingCopy && existingOcr) return;
    const oldToolbar = document.getElementById(TOOLBAR_ID);
    if (oldToolbar) oldToolbar.remove();
    const toolbar = document.createElement("div");
    toolbar.id = TOOLBAR_ID;
    toolbar.className = "zoom-container";
    applyToolbarCornerPosition(toolbar, currentCornerPosition);
    const viewBtn = createToolbarButton(BTN_VIEW_ID, "View image", ICONS.view);
    viewBtn.onclick = () => actionHandler("zoom");
    const copyBtn = createToolbarButton(BTN_COPY_ID, "Copy image", ICONS.copy);
    copyBtn.onclick = async () => {
      copyBtn.disabled = true;
      const ok = await actionHandler("copy");
      copyBtn.disabled = false;
      ok ? showButtonSuccess(copyBtn) : showButtonFailure(copyBtn);
    };
    const ocrBtn = createToolbarButton(BTN_OCR_ID, "\u5716\u7247\u6587\u5B57\u8FA8\u8B58\u8907\u88FD (OCR)", ICONS.ocr);
    ocrBtn.onclick = async () => {
      ocrBtn.disabled = true;
      const ok = await actionHandler("ocr");
      ocrBtn.disabled = false;
      ok ? showButtonSuccess(ocrBtn) : showButtonFailure(ocrBtn);
    };
    const downloadBtn = createToolbarButton(BTN_DOWNLOAD_ID, "Download image", ICONS.download);
    downloadBtn.onclick = async () => {
      downloadBtn.disabled = true;
      const ok = await actionHandler("download");
      downloadBtn.disabled = false;
      ok ? showButtonSuccess(downloadBtn) : showButtonFailure(downloadBtn);
    };
    toolbar.style.display = "none";
    toolbar.append(viewBtn, copyBtn, ocrBtn, downloadBtn);
    document.body.appendChild(toolbar);
    return toolbar;
  }
  function attachToolbarToContainer(container) {
    triggerOcrPrewarm();
    const toolbar = document.getElementById(TOOLBAR_ID);
    const containers = document.getElementsByClassName("zoom-container");
    for (let i = 0; i < containers.length; i++) {
      containers[i].remove();
    }
    if (toolbar && container) {
      toolbar.style.display = "flex";
      container.appendChild(toolbar);
    }
  }
  function toggleToolbarPreviewHidden(hidden) {
    const toolbar = document.getElementById(TOOLBAR_ID);
    if (toolbar) {
      toolbar.classList.toggle(PREVIEW_HIDDEN_CLASS, hidden);
      hidden ? toolbar.setAttribute("aria-hidden", "true") : toolbar.removeAttribute("aria-hidden");
    }
  }

  // src/content/ui/toast.js
  var toastTimeoutId = null;
  function uiToast(message, duration = 3e3) {
    if (typeof document === "undefined") return;
    let toastEl = document.getElementById("let-me-see-see-toast");
    if (toastTimeoutId) {
      clearTimeout(toastTimeoutId);
      toastTimeoutId = null;
    }
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.id = "let-me-see-see-toast";
      Object.assign(toastEl.style, {
        position: "fixed",
        bottom: "28px",
        left: "50%",
        transform: "translateX(-50%)",
        backgroundColor: "rgba(33,33,33,0.92)",
        color: "#fff",
        padding: "10px 18px",
        borderRadius: "8px",
        fontSize: "13px",
        fontFamily: "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
        zIndex: "2147483647",
        boxShadow: "0 4px 16px rgba(0,0,0,0.25)",
        pointerEvents: "none",
        transition: "opacity 0.25s ease,transform 0.25s ease",
        opacity: "1"
      });
      document.body.appendChild(toastEl);
    } else {
      toastEl.style.opacity = "1";
      toastEl.style.transform = "translateX(-50%)";
    }
    toastEl.textContent = message;
    if (duration && duration > 0) {
      toastTimeoutId = window.setTimeout(() => {
        toastEl.style.opacity = "0";
        toastEl.style.transform = "translateX(-50%) translateY(6px)";
        window.setTimeout(() => {
          if (toastEl.parentElement) toastEl.remove();
        }, 250);
        toastTimeoutId = null;
      }, duration);
    }
    return toastEl;
  }

  // src/content/ui/lightbox-crop.js
  function calculateImageCropBounds(screenBox, imgRect, naturalWidth, naturalHeight, buffer = 18) {
    if (!screenBox || !imgRect || !imgRect.width || !imgRect.height || naturalWidth <= 0 || naturalHeight <= 0) {
      return { cropX: 0, cropY: 0, cropW: 0, cropH: 0 };
    }
    const scaleX = naturalWidth / (imgRect.width || 1);
    const scaleY = naturalHeight / (imgRect.height || 1);
    const relX = screenBox.left - imgRect.left;
    const relY = screenBox.top - imgRect.top;
    const rawX0 = relX * scaleX - buffer;
    const rawY0 = relY * scaleY - buffer;
    const rawX1 = (relX + screenBox.width) * scaleX + buffer;
    const rawY1 = (relY + screenBox.height) * scaleY + buffer;
    const cropX = Math.max(0, Math.min(naturalWidth - 1, Math.round(rawX0)));
    const cropY = Math.max(0, Math.min(naturalHeight - 1, Math.round(rawY0)));
    const cropW = Math.max(1, Math.min(naturalWidth - cropX, Math.round(rawX1 - rawX0)));
    const cropH = Math.max(1, Math.min(naturalHeight - cropY, Math.round(rawY1 - rawY0)));
    return { cropX, cropY, cropW, cropH };
  }
  function cropImageToDataUrl(imgElement, cropBounds) {
    if (!imgElement || !cropBounds || cropBounds.cropW <= 0 || cropBounds.cropH <= 0) return null;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = cropBounds.cropW;
      canvas.height = cropBounds.cropH;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(
        imgElement,
        cropBounds.cropX,
        cropBounds.cropY,
        cropBounds.cropW,
        cropBounds.cropH,
        0,
        0,
        cropBounds.cropW,
        cropBounds.cropH
      );
      const dataUrl = canvas.toDataURL("image/png");
      canvas.width = 0;
      canvas.height = 0;
      return dataUrl;
    } catch (err) {
      console.warn("[Let Me See See] Canvas crop failed:", err);
      return null;
    }
  }
  var activeCropCleanup = null;
  function startLightboxCrop(viewerInstance2, onCropSelected) {
    if (!viewerInstance2 || !viewerInstance2.image) return;
    if (activeCropCleanup) {
      activeCropCleanup();
      activeCropCleanup = null;
      return;
    }
    const container = viewerInstance2.viewer || document.querySelector(".viewer-container");
    const canvasEl = container?.querySelector(".viewer-canvas");
    if (!canvasEl) return;
    container.classList.add("lmss-crop-active");
    const cropBtn = container.querySelector(".viewer-crop-ocr-btn, [data-viewer-action='cropOcr']");
    if (cropBtn) cropBtn.classList.add("is-active");
    const overlay = document.createElement("div");
    overlay.className = "lmss-crop-overlay";
    container.appendChild(overlay);
    const hintBanner = document.createElement("div");
    hintBanner.className = "lmss-crop-hint";
    hintBanner.innerHTML = `
    <span class="lmss-crop-hint-icon">\u26F6</span>
    <span>\u8ACB\u62D6\u66F3\u6ED1\u9F20\u5708\u9078\u8981\u8FA8\u8B58\u7684\u6587\u5B57\u5340\u57DF\uFF08\u653E\u958B\u5373\u8FA8\u8B58\uFF09</span>
    <button type="button" class="lmss-crop-hint-close" title="\u53D6\u6D88\u5708\u9078">\u2715</button>
  `;
    container.appendChild(hintBanner);
    const box = document.createElement("div");
    box.className = "lmss-crop-box";
    box.style.display = "none";
    overlay.appendChild(box);
    let isDragging = false;
    let startX = 0;
    let startY = 0;
    let rafId3 = null;
    const onDragStart = (e) => {
      if (e.target.closest(".viewer-toolbar, .lmss-crop-hint, .viewer-button")) return;
      e.preventDefault();
      e.stopPropagation();
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      box.style.left = `${startX}px`;
      box.style.top = `${startY}px`;
      box.style.width = "0px";
      box.style.height = "0px";
      box.style.display = "block";
    };
    const onDragMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      e.stopPropagation();
      const curX = e.clientX;
      const curY = e.clientY;
      if (rafId3) cancelAnimationFrame(rafId3);
      rafId3 = requestAnimationFrame(() => {
        const left = Math.min(startX, curX);
        const top = Math.min(startY, curY);
        const width = Math.abs(curX - startX);
        const height = Math.abs(curY - startY);
        box.style.left = `${left}px`;
        box.style.top = `${top}px`;
        box.style.width = `${width}px`;
        box.style.height = `${height}px`;
      });
    };
    const onDragEnd = (e) => {
      if (!isDragging) return;
      e.preventDefault();
      e.stopPropagation();
      isDragging = false;
      if (rafId3) {
        cancelAnimationFrame(rafId3);
        rafId3 = null;
      }
      const endX = e.clientX;
      const endY = e.clientY;
      const screenBox = {
        left: Math.min(startX, endX),
        top: Math.min(startY, endY),
        width: Math.abs(endX - startX),
        height: Math.abs(endY - startY)
      };
      if (screenBox.width < 15 || screenBox.height < 15) {
        cleanup();
        return;
      }
      const img = viewerInstance2.image;
      const imgRect = img.getBoundingClientRect();
      const naturalWidth = viewerInstance2.imageData?.naturalWidth || img.naturalWidth || imgRect.width;
      const naturalHeight = viewerInstance2.imageData?.naturalHeight || img.naturalHeight || imgRect.height;
      const cropBounds = calculateImageCropBounds(screenBox, imgRect, naturalWidth, naturalHeight, 18);
      const cropDataUrl = cropImageToDataUrl(img, cropBounds);
      cleanup();
      if (cropDataUrl && typeof onCropSelected === "function") {
        if (typeof window !== "undefined") {
          window.__letMeSeeSeeActiveRaster = null;
        }
        onCropSelected(cropDataUrl);
      } else {
        uiToast("\u5708\u9078\u7BC4\u570D\u672A\u64F7\u53D6\u5230\u6709\u6548\u5716\u50CF", 2500);
      }
    };
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        cleanup();
      }
    };
    const cleanup = () => {
      if (rafId3) {
        cancelAnimationFrame(rafId3);
        rafId3 = null;
      }
      container.classList.remove("lmss-crop-active");
      if (cropBtn) cropBtn.classList.remove("is-active");
      hintBanner.remove();
      overlay.remove();
      window.removeEventListener("pointermove", onDragMove, true);
      window.removeEventListener("pointerup", onDragEnd, true);
      window.removeEventListener("mousemove", onDragMove, true);
      window.removeEventListener("mouseup", onDragEnd, true);
      overlay.removeEventListener("pointerdown", onDragStart, true);
      overlay.removeEventListener("mousedown", onDragStart, true);
      window.removeEventListener("keydown", onKeyDown, true);
      activeCropCleanup = null;
    };
    activeCropCleanup = cleanup;
    hintBanner.querySelector(".lmss-crop-hint-close").addEventListener("click", cleanup);
    overlay.addEventListener("pointerdown", onDragStart, true);
    overlay.addEventListener("mousedown", onDragStart, true);
    window.addEventListener("pointermove", onDragMove, true);
    window.addEventListener("pointerup", onDragEnd, true);
    window.addEventListener("mousemove", onDragMove, true);
    window.addEventListener("mouseup", onDragEnd, true);
    window.addEventListener("keydown", onKeyDown, true);
  }

  // src/content/ocr/text-cleaner.js
  function cleanOcrText(text) {
    if (!text) return "";
    const lines = text.split("\n");
    const cleaned = [];
    for (const rawLine of lines) {
      let line = rawLine.trim();
      if (!line) continue;
      if (/^[\s|!Il·•:;._\-\/\\]+$/.test(line)) continue;
      const validChars = line.replace(/[^a-zA-Z0-9\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g, "");
      if (validChars.length === 0) continue;
      if (validChars.length < 3 && /^[\s._\-|/\\~:;+=*^]+$/.test(line.replace(/[a-zA-Z0-9\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/g, ""))) {
        if (line.replace(/[\s._\-|/\\~:;+=*^]/g, "").length <= 1) continue;
      }
      if (/([^\s0-9])\1{2,}/i.test(line)) continue;
      const cjkChars = line.replace(/[^\u4e00-\u9fa5]/g, "");
      if (cjkChars.length >= 6) {
        const isTimeline = /[0-9]\s*[年月日號週周季]/.test(line);
        if (!isTimeline) {
          const unique = new Set(cjkChars).size;
          if (unique / cjkChars.length < 0.45) continue;
        }
      }
      const cleanChars = line.replace(/\s+/g, "");
      const puncCount = (cleanChars.match(/[\.,‧、ˊ〈〉ˇ<>=”"~_|\-+:;!@#$%^&*`]/g) || []).length;
      if (cleanChars.length >= 6 && puncCount / cleanChars.length >= 0.35) continue;
      const words = line.trim().split(/\s+/);
      if (words.length > 0 && words.every((w) => {
        if (words.length === 1 && /^(?:[A-Z0-9]{1,3}|No)$/.test(w)) {
          return false;
        }
        const letters = w.replace(/[^a-zA-Z]/g, "");
        return letters.length > 0 && letters.length <= 2 && !/[0-9\u4e00-\u9fa5]/.test(w);
      })) {
        continue;
      }
      line = line.replace(/(?:^|\s+)(?:Ww|沁)\s+(?=[A-Z\u4e00-\u9fa5])/g, " ");
      const cjkPunc = "[\\u4e00-\\u9fa5\\u3000-\\u303f\\uff00-\\uffef]";
      line = line.replace(new RegExp(`(${cjkPunc})\\s+(?=${cjkPunc})`, "g"), "$1");
      line = disambiguateCjkCharacters(line);
      line = line.replace(/\b(?:usS|uss|USS|uS\$|Us\$)\b/g, "US$");
      line = line.replace(/\busS\s*/g, "US$ ");
      line = line.replace(/\b2[D0O]2[bB6]\/([0-1]\d)\b/g, "2026/$1");
      line = line.replace(/\b(20[12])[bB]\/([0-1][\dbB])\b/g, (m, y, mo) => y + "6/" + mo.replace(/[bB]/g, "6"));
      line = line.replace(/\b(20\d\d)[1l|I/]([0-1]\d)\b/g, "$1/$2");
      if (line.includes("\u6708")) {
        line = line.replace(/(\d+)\s+月/g, "$1\u6708");
        line = line.replace(/(10月\s+)(?:1|11|[|Il])(\s+12月)/g, "$111\u6708$2");
        line = line.replace(/(?<!\/)\b([1-9]|1[0-2])\s*[bB](?![.%/\d])\b/g, "$1\u6708");
      }
      line = line.replace(/CumulativeGap\b/g, "Cumulative Gap");
      line = line.replace(/[»«▾▼]/g, "");
      line = line.replace(/\bvy\b/gi, "");
      line = line.replace(/\b(Month|Goal|Actual|Achv\.?|Cumulative\s+Gap)\s+v\b/gi, "$1");
      line = line.replace(/(\d)[|Il](\d)/g, "$11$2");
      line = line.replace(/(\d)[|Il],/g, "$11,");
      line = line.replace(/,[|Il](\d)/g, ",1$1");
      line = line.replace(/\b[|Il](\d)/g, "1$1");
      line = line.replace(/(\d)[|Il]\b/g, "$11");
      line = line.replace(/-\s*[|Il]\s*/g, "-1");
      line = line.replace(/(\d)[bB](\d)/g, "$16$2");
      line = line.replace(/(\d)[bB],/g, "$16,");
      line = line.replace(/,[bB](\d)/g, ",6$1");
      line = line.replace(/\b[bB](\d)/g, "6$1");
      line = line.replace(/(\d)[bB]\b/g, "$16");
      line = line.replace(/(\d)[bB]\./g, "$16.");
      line = line.replace(/\.([bB])(\d)/g, ".6$2");
      line = line.replace(/(\d)[bB]%/g, "$16%");
      line = line.replace(/([0-9,])[bB]+(\b|\s)/g, (m, p1, p2) => p1 + "6".repeat(m.length - p1.length - p2.length) + p2);
      line = line.replace(/(\d)[oO](\d)/g, "$10$2");
      line = line.replace(/,[oO](\d)/g, ",0$1");
      line = line.replace(/(\d)[oO],/g, "$10,");
      line = line.replace(/(\d)[oO]%/g, "$10%");
      line = line.replace(/\|/g, "1");
      line = line.replace(/-(\d+)\s+([0-9bBoO]+),/g, "-$1$2,");
      line = line.replace(/\s{3,}/g, "  ").trim();
      cleaned.push(line);
    }
    return cleaned.join("\n").trim();
  }
  function cleanTableCell(text) {
    if (!text) return "";
    let val = text.trim();
    val = val.replace(/[\t\r\n]+/g, " ").trim();
    val = val.replace(/\b(?:usS|uss|USS|uS\$|Us\$)\b/g, "US$");
    val = val.replace(/\busS\s*/g, "US$ ");
    val = val.replace(/\b2[D0O]2[bB6]\/([0-1]\d)\b/g, "2026/$1");
    val = val.replace(/\b(20[12])[bB]\/([0-1][\dbB])\b/g, (m, y, mo) => y + "6/" + mo.replace(/[bB]/g, "6"));
    val = val.replace(/\b(20\d\d)[1l|I/]([0-1]\d)\b/g, "$1/$2");
    val = val.replace(/CumulativeGap\b/g, "Cumulative Gap");
    val = val.replace(/[»«▾▼]/g, "");
    val = val.replace(/\bvy\b/gi, "");
    val = val.replace(/\b(Month|Goal|Actual|Achv\.?|Cumulative\s+Gap)\s+v\b/gi, "$1");
    val = val.replace(/(\d)[|Il](\d)/g, "$11$2");
    val = val.replace(/(\d)[|Il],/g, "$11,");
    val = val.replace(/,[|Il](\d)/g, ",1$1");
    val = val.replace(/\b[|Il](\d)/g, "1$1");
    val = val.replace(/(\d)[|Il]\b/g, "$11");
    val = val.replace(/-\s*[|Il]\s*/g, "-1");
    val = val.replace(/(\d)[bB](\d)/g, "$16$2");
    val = val.replace(/(\d)[bB],/g, "$16,");
    val = val.replace(/,[bB](\d)/g, ",6$1");
    val = val.replace(/\b[bB](\d)/g, "6$1");
    val = val.replace(/(\d)[bB]\b/g, "$16");
    val = val.replace(/(\d)[bB]\./g, "$16.");
    val = val.replace(/\.([bB])(\d)/g, ".6$2");
    val = val.replace(/(\d)[bB]%/g, "$16%");
    val = val.replace(/(\d)[oO](\d)/g, "$10$2");
    val = val.replace(/,[oO](\d)/g, ",0$1");
    val = val.replace(/(\d)[oO],/g, "$10,");
    val = val.replace(/(\d)[oO]%/g, "$10%");
    val = val.replace(/\|+/g, " ").trim();
    val = val.replace(/-(\d+)\s+([0-9bBoO]+),/g, "-$1$2,");
    const cjkPunc = "[\\u4e00-\\u9fa5\\u3000-\\u303f\\uff00-\\uffef]";
    val = val.replace(new RegExp(`(${cjkPunc})\\s+(?=${cjkPunc})`, "g"), "$1");
    val = disambiguateCjkCharacters(val);
    return val.trim();
  }
  function disambiguateCjkCharacters(text) {
    if (!text) return "";
    let val = text;
    val = val.replace(/雨用/g, "\u5169\u7528");
    val = val.replace(/雨([種者個款件組套面色岸難倍側旁端邊隻條位次張把台瓶盒度])/g, "\u5169$1");
    val = val.replace(/兩([衣傘靴])/g, "\u96E8$1");
    val = val.replace(/兩具/g, "\u96E8\u5177");
    val = val.replace(/兩中([圓漫步曲景情風])/g, "\u96E8\u4E2D$1");
    val = val.replace(/([防避淋梅暴陣雷下落細微大晴])兩/g, "$1\u96E8");
    val = val.replace(/兩([滴勢季量水停])/g, "\u96E8$1");
    val = val.replace(/[已己]經/g, "\u5DF2\u7D93");
    val = val.replace(/自[已己]/g, "\u81EA\u5DF1");
    val = val.replace(/早[已己]/g, "\u65E9\u5DF2");
    val = val.replace(/知[已己]/g, "\u77E5\u5DF1");
    val = val.replace(/週[未末]/g, "\u9031\u672B");
    val = val.replace(/期[未末]/g, "\u671F\u672B");
    val = val.replace(/年[未末]/g, "\u5E74\u672B");
    val = val.replace(/月[未末]/g, "\u6708\u672B");
    val = val.replace(/[未末]日/g, "\u672B\u65E5");
    val = val.replace(/[未末]尾/g, "\u672B\u5C3E");
    val = val.replace(/[未末]來/g, "\u672A\u4F86");
    val = val.replace(/尚[未末]/g, "\u5C1A\u672A");
    val = val.replace(/從[未末]/g, "\u5F9E\u672A");
    val = val.replace(/[未末]必/g, "\u672A\u5FC5");
    val = val.replace(/[未末]知/g, "\u672A\u77E5");
    val = val.replace(/[折拆]扣/g, "\u6298\u6263");
    val = val.replace(/打[折拆]/g, "\u6253\u6298");
    val = val.replace(/[折拆]除/g, "\u62C6\u9664");
    val = val.replace(/[折拆]封/g, "\u62C6\u5C01");
    val = val.replace(/[折拆]開/g, "\u62C6\u958B");
    val = val.replace(/女[士土]/g, "\u5973\u58EB");
    val = val.replace(/紳[士土]/g, "\u7D33\u58EB");
    val = val.replace(/碩[士土]/g, "\u78A9\u58EB");
    val = val.replace(/博[士土]/g, "\u535A\u58EB");
    val = val.replace(/泥[士土]/g, "\u6CE5\u571F");
    val = val.replace(/[士土]地/g, "\u571F\u5730");
    val = val.replace(/[烏鳥]雲/g, "\u70CF\u96F2");
    val = val.replace(/[烏鳥]龍/g, "\u70CF\u9F8D");
    val = val.replace(/小[烏鳥]/g, "\u5C0F\u9CE5");
    val = val.replace(/候[烏鳥]/g, "\u5019\u9CE5");
    return val;
  }

  // src/content/ocr/table-detector.js
  function findColumnBins(rows, tolerance = 35) {
    const allXStarts = [];
    for (const row of rows) {
      for (const cell of row) {
        if (typeof cell.x0 === "number") {
          allXStarts.push(cell.x0);
        }
      }
    }
    if (allXStarts.length === 0) return [];
    allXStarts.sort((a, b) => a - b);
    const clusters = [];
    let currentCluster = null;
    for (const x of allXStarts) {
      if (!currentCluster) {
        currentCluster = { points: [x], mean: x, min: x, max: x };
        clusters.push(currentCluster);
      } else if (Math.abs(currentCluster.mean - x) <= tolerance) {
        currentCluster.points.push(x);
        currentCluster.mean = (currentCluster.mean * (currentCluster.points.length - 1) + x) / currentCluster.points.length;
        currentCluster.max = x;
      } else {
        currentCluster = { points: [x], mean: x, min: x, max: x };
        clusters.push(currentCluster);
      }
    }
    return clusters.filter((c) => c.points.length >= 2).sort((a, b) => a.mean - b.mean).map((c) => ({
      centerX: c.mean,
      minX: c.min,
      maxX: c.max
    }));
  }
  function detectTableFromTesseractResult(rawLines) {
    if (!Array.isArray(rawLines) || rawLines.length < 2) {
      return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
    }
    const rows = [];
    for (const line of rawLines) {
      const validWords = (line.words || []).filter((w) => {
        const t = (w.text || "").trim();
        return t && !/^[|—_\-]+$/.test(t);
      });
      if (!validWords.length) continue;
      const lineCells = [];
      let currentCell = null;
      for (const w of validWords) {
        const wText = (w.text || "").trim();
        const x0 = w.bbox ? w.bbox.x0 : null;
        const x1 = w.bbox ? w.bbox.x1 : null;
        if (!currentCell) {
          currentCell = { text: wText, x0, x1 };
        } else if (x0 !== null && currentCell.x1 !== null && x0 - currentCell.x1 <= 24) {
          currentCell.text += (isCjk(currentCell.text.slice(-1)) && isCjk(wText.charAt(0)) ? "" : " ") + wText;
          currentCell.x1 = Math.max(currentCell.x1, x1);
        } else {
          lineCells.push(currentCell);
          currentCell = { text: wText, x0, x1 };
        }
      }
      if (currentCell) lineCells.push(currentCell);
      if (lineCells.length > 0) rows.push(lineCells);
    }
    if (rows.length < 2) {
      return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
    }
    if (rows.some(isTimelineRow)) {
      return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
    }
    const columnBins = findColumnBins(rows);
    if (columnBins.length < 2) {
      return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
    }
    const colOccupancy = new Array(columnBins.length).fill(0);
    for (const row of rows) {
      const presentBins = /* @__PURE__ */ new Set();
      for (const cell of row) {
        if (cell.x0 === null) continue;
        let closestColIdx = 0;
        let minDiff = Infinity;
        for (let i = 0; i < columnBins.length; i++) {
          const diff = Math.abs(cell.x0 - columnBins[i].centerX);
          if (diff < minDiff) {
            minDiff = diff;
            closestColIdx = i;
          }
        }
        presentBins.add(closestColIdx);
      }
      for (const idx of presentBins) {
        colOccupancy[idx]++;
      }
    }
    const highOccupancyCols = colOccupancy.filter((cnt) => cnt >= Math.max(2, Math.floor(rows.length * 0.55)));
    if (highOccupancyCols.length < 2) {
      return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
    }
    if (columnBins.length === 2) {
      const row0Text = rows[0].map((c) => c.text).join(" ");
      const hasHeaderKeyword = /^(?:Month|Date|Time|Item|Name|Title|Type|Category|Price|Cost|Total|Amount|Qty|Quantity|Goal|Actual|Achv|Status|Note|Description|Key|Value|項目|名稱|標題|日期|時間|月份|類別|單價|數量|小計|總計|金額|狀態|備註|範例|建議|命中|順序|資料源)/i.test(row0Text);
      let col1CountDigits = 0;
      let col1Total = 0;
      for (const row of rows) {
        for (const cell of row) {
          if (cell.x0 !== null && Math.abs(cell.x0 - columnBins[1].centerX) < Math.abs(cell.x0 - columnBins[0].centerX)) {
            col1Total++;
            if (/^[\d,.\s]+$/.test(cell.text.trim())) col1CountDigits++;
          }
        }
      }
      if (!hasHeaderKeyword && col1Total > 0 && col1CountDigits / col1Total >= 0.7) {
        return { isTable: false, tsv: "", rowCount: 0, colCount: 0 };
      }
    }
    const tsvLines = [];
    for (const row of rows) {
      const rowSlots = new Array(columnBins.length).fill("");
      for (const cell of row) {
        if (cell.x0 === null) continue;
        let closestColIdx = 0;
        let minDiff = Infinity;
        for (let i = 0; i < columnBins.length; i++) {
          const diff = Math.abs(cell.x0 - columnBins[i].centerX);
          if (diff < minDiff) {
            minDiff = diff;
            closestColIdx = i;
          }
        }
        if (rowSlots[closestColIdx]) {
          rowSlots[closestColIdx] += " " + cell.text;
        } else {
          rowSlots[closestColIdx] = cell.text;
        }
      }
      const cleanedRow = rowSlots.map((cellStr) => cleanTableCell(cellStr));
      if (cleanedRow.some((c) => c.length > 0)) {
        tsvLines.push(cleanedRow.join("	"));
      }
    }
    return {
      isTable: true,
      tsv: tsvLines.join("\n"),
      rowCount: tsvLines.length,
      colCount: columnBins.length
    };
  }
  function detectTableFromPlainText(text) {
    if (!text || typeof text !== "string") {
      return { isTable: false, tsv: text || "", rowCount: 0, colCount: 0 };
    }
    const rawLines = text.split("\n").map((l) => l.trim()).filter(Boolean);
    if (rawLines.length < 2) {
      return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
    }
    if (rawLines.some((l) => isTimelineRow([{ text: l }]))) {
      return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
    }
    const hasTabs = rawLines.filter((l) => l.includes("	")).length >= Math.max(2, Math.floor(rawLines.length * 0.6));
    const hasPipes = rawLines.filter((l) => (l.match(/\|/g) || []).length >= 2).length >= Math.max(2, Math.floor(rawLines.length * 0.6));
    const parsedRows = [];
    for (const line of rawLines) {
      let tokens = [];
      if (hasTabs && line.includes("	")) {
        tokens = line.split("	");
      } else if (hasPipes && line.includes("|")) {
        tokens = line.split("|").map((t) => t.trim()).filter(Boolean);
      } else if (/\s{2,}/.test(line)) {
        tokens = line.split(/\s{2,}/);
      } else {
        tokens = [line];
      }
      tokens = tokens.map((t) => t.trim()).filter(Boolean);
      if (tokens.length > 0) parsedRows.push(tokens);
    }
    const multiTokenRows = parsedRows.filter((r) => r.length >= 2);
    if (multiTokenRows.length < 2 || multiTokenRows.length < Math.floor(parsedRows.length * 0.6)) {
      return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
    }
    const maxCols = Math.max(...multiTokenRows.map((r) => r.length));
    if (!hasTabs && !hasPipes) {
      if (maxCols < 3) {
        return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
      }
      const uniformRows = parsedRows.filter((r) => r.length === maxCols);
      if (uniformRows.length / parsedRows.length < 0.75) {
        return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
      }
      const row0Text = parsedRows[0].join(" ");
      const hasHeaderKeyword = /(?:Month|Date|Time|Item|Name|Title|Type|Category|Price|Cost|Total|Amount|Qty|Quantity|Goal|Actual|Achv|Status|Note|Description|Key|Value|項目|名稱|標題|日期|時間|月份|類別|單價|數量|小計|總計|金額|狀態|備註|範例|建議|命中|順序|資料源)/i.test(row0Text);
      if (!hasHeaderKeyword) {
        return { isTable: false, tsv: text, rowCount: 0, colCount: 0 };
      }
    }
    const tsvLines = parsedRows.map((r) => {
      const cleanedTokens = r.map((t) => cleanTableCell(t));
      return cleanedTokens.join("	");
    });
    return {
      isTable: true,
      tsv: tsvLines.join("\n"),
      rowCount: tsvLines.length,
      colCount: maxCols
    };
  }
  function processOcrTableOutput(cleanedText, rawOcrData = null) {
    if (rawOcrData && Array.isArray(rawOcrData.lines) && rawOcrData.lines.length >= 2) {
      const geoResult = detectTableFromTesseractResult(rawOcrData.lines);
      if (geoResult.isTable && geoResult.tsv) {
        return {
          isTable: true,
          text: geoResult.tsv,
          rowCount: geoResult.rowCount,
          colCount: geoResult.colCount
        };
      }
    }
    const plainResult = detectTableFromPlainText(cleanedText);
    if (plainResult.isTable && plainResult.tsv) {
      return {
        isTable: true,
        text: plainResult.tsv,
        rowCount: plainResult.rowCount,
        colCount: plainResult.colCount
      };
    }
    return {
      isTable: false,
      text: cleanedText,
      rowCount: 0,
      colCount: 0
    };
  }
  function isCjk(char) {
    return /[\u4e00-\u9fa5\u3000-\u303f\uff00-\uffef]/.test(char);
  }
  function isTimelineRow(row) {
    if (!Array.isArray(row)) return false;
    const rowText = row.map((c) => c.text || "").join(" ");
    const months = (rowText.match(/\b(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\b/gi) || []).length;
    const cjkMonths = (rowText.match(/\b([1-9]|1[0-2])\s*月/g) || []).length;
    const quarters = (rowText.match(/\bQ[1-4]\b/gi) || []).length;
    return months >= 3 || cjkMonths >= 3 || quarters >= 3;
  }

  // src/content/shared/download-manager.js
  function sanitizeFilename(title = typeof document !== "undefined" ? document.title : "") {
    return title.replace(/(?:^|\s+)-\s+Google (?:Docs|Sheets|Slides|文件|試算表|簡報|文档|表格|幻灯片)$/i, "").trim().replace(/\s+/g, "-").replace(/[^\p{L}\p{N}_-]+/gu, "-").replace(/-+/g, "-").replace(/^-+|-+$/g, "").toLowerCase() || "google-document";
  }
  function getImageExtension(blob, url) {
    const mimeTypes = {
      "image/gif": "gif",
      "image/jpeg": "jpg",
      "image/png": "png",
      "image/svg+xml": "svg",
      "image/webp": "webp"
    };
    if (blob?.type && mimeTypes[blob.type]) return mimeTypes[blob.type];
    const ext = url?.match(/\.([a-z0-9]{2,5})(?:[?#]|$)/i)?.[1];
    return ext ? ext.toLowerCase() : "png";
  }
  function triggerBlobDownload(blob, filename) {
    if (typeof document === "undefined") return;
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    const timer = window.setTimeout(() => URL.revokeObjectURL(url), 6e4);
    if (timer && typeof timer.unref === "function") {
      timer.unref();
    }
  }
  async function fetchImageBlobWithRetry(url, retries = 2) {
    let lastError = null;
    for (let attempt = 0; attempt <= retries; attempt++) {
      try {
        const res = await fetch(url);
        if (res.ok) {
          return await res.blob();
        }
        if (res.status === 404) {
          lastError = new Error(`HTTP 404 for ${url}`);
          break;
        }
        lastError = new Error(`HTTP ${res.status}`);
      } catch (err) {
        lastError = err;
      }
      if (attempt < retries) {
        await new Promise((r) => setTimeout(r, 200 * (attempt + 1)));
      }
    }
    const fallbackUrl = url.replace(/=s2048(?:$|[&#?])/, "");
    if (fallbackUrl && fallbackUrl !== url) {
      try {
        const res = await fetch(fallbackUrl);
        if (res.ok) {
          return await res.blob();
        }
      } catch {
      }
    }
    throw lastError || new Error(`Failed to fetch ${url}`);
  }
  async function fetchImageBlob(url) {
    return fetchImageBlobWithRetry(url, 1);
  }
  async function convertUrlToPngBlob(url) {
    const blob = await fetchImageBlob(url);
    if (blob?.type === "image/png") return blob;
    if (typeof createImageBitmap !== "function" || typeof document === "undefined") {
      return blob;
    }
    const bmp = await createImageBitmap(blob);
    const cvs = document.createElement("canvas");
    cvs.width = bmp.width;
    cvs.height = bmp.height;
    const ctx = cvs.getContext("2d");
    if (!ctx) {
      if (typeof bmp.close === "function") bmp.close();
      throw new Error("Canvas is unavailable");
    }
    ctx.drawImage(bmp, 0, 0);
    if (typeof bmp.close === "function") bmp.close();
    return new Promise((resolve, reject) => {
      cvs.toBlob((pngBlob) => {
        pngBlob ? resolve(pngBlob) : reject(new Error("Image conversion failed"));
      }, "image/png");
    });
  }
  async function downloadSingleImage(url, index) {
    if (!url) {
      uiToast("\u672A\u627E\u5230\u5716\u7247\u9023\u7D50", 3e3);
      return false;
    }
    try {
      uiToast("\u6B63\u5728\u4E0B\u8F09\u5716\u7247...", 2e3);
      const blob = await fetchImageBlob(url);
      const suffix = index ? `-image-${index}` : "";
      const name = `${sanitizeFilename()}${suffix}.${getImageExtension(blob, url)}`;
      triggerBlobDownload(blob, name);
      uiToast("\u5716\u7247\u4E0B\u8F09\u6210\u529F\uFF01", 2500);
      return true;
    } catch {
      try {
        const a = document.createElement("a");
        a.href = url;
        a.download = `${sanitizeFilename()}${index ? `-image-${index}` : ""}.${getImageExtension(null, url)}`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        uiToast("\u5DF2\u555F\u52D5\u5716\u7247\u4E0B\u8F09", 2500);
        return true;
      } catch {
        uiToast("\u5716\u7247\u4E0B\u8F09\u5931\u6557", 3e3);
        return false;
      }
    }
  }
  async function packImagesToZip(urls, onProgress, JSZipClass = jszip_default) {
    if (!urls?.length) {
      uiToast("\u672A\u5728\u6587\u4EF6\u4E2D\u627E\u5230\u4EFB\u4F55\u5716\u7247", 3e3);
      return { downloaded: 0, failed: 0 };
    }
    uiToast(`\u6B63\u5728\u6253\u5305\u4E0B\u8F09\u5168\u6587\u4EF6\u5716\u7247 (0/${urls.length})...`, 0);
    const zip = new JSZipClass();
    const padLength = Math.max(2, String(urls.length).length);
    const failedItems = [];
    let currentIndex = 0;
    let doneCount = 0;
    let successCount = 0;
    const worker = async () => {
      while (currentIndex < urls.length) {
        const idx = currentIndex++;
        const currentUrl = urls[idx];
        try {
          const blob = await fetchImageBlobWithRetry(currentUrl);
          successCount++;
          const numStr = String(idx + 1).padStart(padLength, "0");
          zip.file(`image-${numStr}.${getImageExtension(blob, currentUrl)}`, blob);
        } catch (err) {
          failedItems.push({ index: idx + 1, url: currentUrl, error: err?.message || String(err) });
        }
        doneCount++;
        uiToast(`\u6B63\u5728\u6253\u5305\u4E0B\u8F09\u5168\u6587\u4EF6\u5716\u7247 (${doneCount}/${urls.length})...`, 0);
        if (typeof onProgress === "function") {
          try {
            onProgress(doneCount, urls.length);
          } catch {
          }
        }
      }
    };
    const poolSize = Math.min(4, urls.length);
    await Promise.all(Array.from({ length: poolSize }, worker));
    const failedCount = urls.length - successCount;
    if (failedItems.length > 0) {
      const reportText = [
        `Let Me See See - \u6253\u5305\u4E0B\u8F09\u5831\u544A`,
        `==============================`,
        `\u6587\u4EF6\u540D\u7A31: ${sanitizeFilename()}`,
        `\u6383\u63CF\u7E3D\u8A08: ${urls.length} \u5F35`,
        `\u6210\u529F\u4E0B\u8F09: ${successCount} \u5F35`,
        `\u4E0B\u8F09\u5931\u6557: ${failedItems.length} \u5F35`,
        ``,
        `\u5931\u6557\u6E05\u55AE:`,
        ...failedItems.map((f) => `#${f.index}: ${f.url} (${f.error})`)
      ].join("\n");
      zip.file("_download_report.txt", reportText);
    }
    if (successCount > 0) {
      uiToast("\u6B63\u5728\u7522\u751F ZIP \u58D3\u7E2E\u6A94...", 0);
      const zipBlob = await zip.generateAsync({
        type: "blob",
        compression: "STORE"
      });
      triggerBlobDownload(zipBlob, `${sanitizeFilename()}-images.zip`);
      if (failedCount > 0) {
        uiToast(`\u4E0B\u8F09\u5B8C\u6210\uFF01\u5171\u6253\u5305 ${successCount} \u5F35\u5716\u7247\uFF08${failedCount} \u5F35\u5931\u6557\uFF0C\u5DF2\u8A18\u65BC ZIP \u5831\u544A\uFF09`, 4500);
      } else {
        uiToast(`\u4E0B\u8F09\u6210\u529F\uFF01\u5171\u6253\u5305 ${successCount} \u5F35\u5716\u7247`, 3500);
      }
    } else {
      uiToast("\u6253\u5305\u5931\u6557\uFF1A\u7121\u6CD5\u4E0B\u8F09\u5716\u7247", 3e3);
    }
    return { downloaded: successCount, failed: failedCount };
  }

  // src/content/shared/image-matcher.js
  function getPixelIndex(raster, x, y) {
    return (y * raster.width + x) * 4;
  }
  function canvasToRaster(canvas) {
    if (!canvas) return null;
    const offscreen = document.createElement("canvas");
    offscreen.width = canvas.width;
    offscreen.height = canvas.height;
    const ctx = offscreen.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    try {
      ctx.drawImage(canvas, 0, 0);
      const imgData = ctx.getImageData(0, 0, offscreen.width, offscreen.height);
      return { width: imgData.width, height: imgData.height, pixels: imgData.data };
    } catch {
      return null;
    }
  }
  function rasterToDataUrl(raster) {
    if (!raster || !raster.width || !raster.height) return null;
    const canvas = document.createElement("canvas");
    canvas.width = raster.width;
    canvas.height = raster.height;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;
    const imgData = ctx.createImageData(raster.width, raster.height);
    imgData.data.set(raster.pixels);
    ctx.putImageData(imgData, 0, 0);
    return canvas.toDataURL("image/png");
  }
  function resizeRaster(raster, targetWidth, targetHeight) {
    if (raster.width === targetWidth && raster.height === targetHeight) return raster;
    const pixels = new Uint8ClampedArray(targetWidth * targetHeight * 4);
    for (let y = 0; y < targetHeight; y++) {
      const srcY = Math.min(raster.height - 1, Math.floor(y * raster.height / targetHeight));
      for (let x = 0; x < targetWidth; x++) {
        const srcX = Math.min(raster.width - 1, Math.floor(x * raster.width / targetWidth));
        const srcIdx = getPixelIndex(raster, srcX, srcY);
        const destIdx = (y * targetWidth + x) * 4;
        pixels[destIdx] = raster.pixels[srcIdx];
        pixels[destIdx + 1] = raster.pixels[srcIdx + 1];
        pixels[destIdx + 2] = raster.pixels[srcIdx + 2];
        pixels[destIdx + 3] = raster.pixels[srcIdx + 3];
      }
    }
    return { width: targetWidth, height: targetHeight, pixels };
  }
  function create48x48Thumbnail(bitmap, width = 48, height = 48) {
    if (!bitmap) return null;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    try {
      ctx.drawImage(bitmap, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      return { width, height, pixels: imgData.data };
    } catch {
      return null;
    }
  }
  function computeDifferenceScore(r1, r2) {
    const scaled = resizeRaster(r2, r1.width, r1.height);
    let totalDiff = 0;
    for (let i = 0; i < r1.pixels.length; i += 4) {
      totalDiff += Math.abs(r1.pixels[i] - scaled.pixels[i]);
      totalDiff += Math.abs(r1.pixels[i + 1] - scaled.pixels[i + 1]);
      totalDiff += Math.abs(r1.pixels[i + 2] - scaled.pixels[i + 2]);
    }
    return totalDiff / (r1.width * r1.height * 3 * 255);
  }
  function findBestImageMatch(targetRaster, candidateList) {
    let best = null;
    for (const candidate of candidateList) {
      const score = computeDifferenceScore(targetRaster, candidate.raster);
      if (!best || score < best.score) {
        best = { url: candidate.url, score };
      }
    }
    return best;
  }

  // src/content/shared/clipboard.js
  async function copyTextToClipboard(text) {
    if (!text) return false;
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
        await navigator.clipboard.writeText(text);
        return true;
      }
    } catch (err) {
      console.warn("[Let Me See See] clipboard writeText error:", err);
    }
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.top = "0";
      ta.style.left = "-9999px";
      ta.style.width = "1px";
      ta.style.height = "1px";
      ta.style.opacity = "0";
      ta.style.contain = "strict";
      const stopPropagation = (e) => e.stopPropagation();
      ta.addEventListener("copy", stopPropagation, true);
      ta.addEventListener("select", stopPropagation, true);
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      ta.remove();
      return ok;
    } catch {
      return false;
    }
  }
  async function imageSourceToPngBlob(source) {
    if (typeof window !== "undefined") {
      if ((!source || source === window.__letMeSeeSeeActiveDataUrl) && window.__letMeSeeSeeActiveRaster) {
        const dataUrl = rasterToDataUrl(window.__letMeSeeSeeActiveRaster);
        if (dataUrl) return convertUrlToPngBlob(dataUrl);
      }
    }
    if (!source) {
      throw new Error("No image source provided");
    }
    if (source instanceof Blob && source.type === "image/png") {
      return source;
    }
    if (source instanceof Blob) {
      if (typeof createImageBitmap !== "function" || typeof document === "undefined") {
        return source;
      }
      const bmp = await createImageBitmap(source);
      const cvs = document.createElement("canvas");
      cvs.width = bmp.width;
      cvs.height = bmp.height;
      const ctx = cvs.getContext("2d");
      if (!ctx) {
        if (typeof bmp.close === "function") bmp.close();
        throw new Error("Canvas context is unavailable");
      }
      ctx.drawImage(bmp, 0, 0);
      if (typeof bmp.close === "function") bmp.close();
      return new Promise((resolve, reject) => {
        cvs.toBlob((pngBlob) => {
          pngBlob ? resolve(pngBlob) : reject(new Error("Image conversion failed"));
        }, "image/png");
      });
    }
    if (typeof source === "string" && source.trim()) {
      return convertUrlToPngBlob(source.trim());
    }
    throw new Error("Unsupported image source type");
  }
  async function copyImageToClipboard(imgUrlOrBlob) {
    if (!imgUrlOrBlob && typeof window !== "undefined") {
      if (window.__letMeSeeSeeActiveDataUrl) {
        imgUrlOrBlob = window.__letMeSeeSeeActiveDataUrl;
      } else if (window.__letMeSeeSeeActiveRaster) {
        imgUrlOrBlob = rasterToDataUrl(window.__letMeSeeSeeActiveRaster);
      }
    }
    if (!imgUrlOrBlob || typeof navigator === "undefined" || !navigator.clipboard?.write || typeof ClipboardItem === "undefined") {
      uiToast("\u700F\u89BD\u5668\u4E0D\u652F\u63F4\u526A\u8CBC\u7C3F\u5BEB\u5165", 3e3);
      return false;
    }
    try {
      const pngBlobPromise = imageSourceToPngBlob(imgUrlOrBlob);
      const item = new ClipboardItem({ "image/png": pngBlobPromise });
      await navigator.clipboard.write([item]);
      return true;
    } catch (err) {
      console.warn("[Let Me See See] Direct ClipboardItem write with Promise failed, retrying with resolved blob:", err);
      try {
        const resolvedBlob = await imageSourceToPngBlob(imgUrlOrBlob);
        const item = new ClipboardItem({ "image/png": resolvedBlob });
        await navigator.clipboard.write([item]);
        return true;
      } catch (fallbackErr) {
        console.error("[Let Me See See] Copy image to clipboard failed:", fallbackErr);
        uiToast("\u8907\u88FD\u5931\u6557\uFF1A\u8ACB\u5148\u9EDE\u64CA\u9801\u9762\u6216\u5141\u8A31\u526A\u8CBC\u7C3F\u6B0A\u9650", 3e3);
        return false;
      }
    }
  }

  // src/content/shared/lru-cache.js
  var MAX_CACHE_SIZE = 60;
  var imageCache = /* @__PURE__ */ new Map();
  if (typeof window !== "undefined") {
    window.__letMeSeeSeeCache = imageCache;
  }
  function evictOldestCacheEntry() {
    while (imageCache.size > MAX_CACHE_SIZE) {
      const oldestKey = imageCache.keys().next().value;
      const promise = imageCache.get(oldestKey);
      imageCache.delete(oldestKey);
      if (promise && typeof promise.then === "function") {
        promise.then((entry) => {
          if (entry?.bitmap && typeof entry.bitmap.close === "function") {
            try {
              entry.bitmap.close();
            } catch {
            }
          }
        }).catch(() => {
        });
      }
    }
  }
  function fetchAndCacheImage(url) {
    const existing = imageCache.get(url);
    if (existing) {
      imageCache.delete(url);
      imageCache.set(url, existing);
      return existing;
    }
    const promise = fetch(url).then((res) => res.ok ? res.blob() : Promise.reject(new Error(String(res.status)))).then(async (blob) => ({
      bitmap: await createImageBitmap(blob),
      mimeType: blob.type
    })).catch(() => null);
    imageCache.set(url, promise);
    promise.then((res) => {
      if (!res && imageCache.get(url) === promise) {
        imageCache.delete(url);
      }
    });
    evictOldestCacheEntry();
    return promise;
  }
  async function getImageBitmap(url) {
    const res = await fetchAndCacheImage(url);
    return res?.bitmap ?? null;
  }

  // src/content/ocr/ocr-service.js
  async function ocrImageToText(imgUrl, options = {}) {
    if (!imgUrl) {
      uiToast("\u672A\u6307\u5B9A\u5716\u7247\uFF0C\u7121\u6CD5\u9032\u884C\u6587\u5B57\u8FA8\u8B58", 3e3);
      return false;
    }
    if (options?.isCrop && typeof window !== "undefined") {
      window.__letMeSeeSeeActiveRaster = null;
    }
    uiToast("\u6B63\u5728\u8FA8\u8B58\u5716\u7247\u6587\u5B57 (OCR)...", 0);
    if (typeof window.__letMeSeeSeeOcrEngine === "function") {
      try {
        const res = await window.__letMeSeeSeeOcrEngine(imgUrl);
        if (res && typeof res === "string" && res.trim()) {
          const text = cleanOcrText(res.trim());
          await copyTextToClipboard(text);
          uiToast(`\u5DF2\u6210\u529F\u6383\u63CF\u4E26\u8907\u88FD\u6587\u5B57\u81F3\u526A\u8CBC\u7C3F\uFF01(${text.length} \u5B57)`, 3500);
          return true;
        }
      } catch (err) {
        console.warn("[Let Me See See] Custom OCR engine error:", err);
      }
    }
    let imagePayload = imgUrl;
    if (!options?.isCrop && window.__letMeSeeSeeActiveRaster?.pixels && window.__letMeSeeSeeActiveRaster?.width && window.__letMeSeeSeeActiveRaster?.height) {
      const rasterDataUrl = rasterToDataUrl(window.__letMeSeeSeeActiveRaster);
      if (rasterDataUrl) imagePayload = rasterDataUrl;
    } else if (imgUrl.startsWith("http://") || imgUrl.startsWith("https://") || imgUrl.startsWith("blob:")) {
      try {
        const bmp = await getImageBitmap(imgUrl);
        if (bmp) {
          const MAX_OCR_DIM = 1600;
          let w = bmp.width;
          let h = bmp.height;
          if (w > MAX_OCR_DIM || h > MAX_OCR_DIM) {
            const scale = Math.min(MAX_OCR_DIM / w, MAX_OCR_DIM / h);
            w = Math.max(1, Math.round(w * scale));
            h = Math.max(1, Math.round(h * scale));
          }
          const cvs = document.createElement("canvas");
          cvs.width = w;
          cvs.height = h;
          const ctx = cvs.getContext("2d");
          if (ctx) {
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = "high";
            ctx.drawImage(bmp, 0, 0, w, h);
            imagePayload = cvs.toDataURL("image/png");
          }
        }
      } catch {
      }
    }
    try {
      if (typeof chrome !== "undefined" && chrome.runtime?.sendMessage) {
        const resp = await new Promise((resolve) => {
          chrome.runtime.sendMessage(
            {
              type: "do-ocr",
              image: imagePayload
            },
            (res) => resolve(res)
          );
        });
        if (resp?.success && resp.text && resp.text.trim()) {
          const cleanText = cleanOcrText(resp.text);
          if (cleanText.length > 0) {
            const tableResult = processOcrTableOutput(cleanText, resp.ocrData);
            const textToCopy = tableResult.isTable ? tableResult.text : cleanText;
            let copied = await copyTextToClipboard(textToCopy);
            if (!copied) {
              try {
                const copyResp = await new Promise((resolve) => {
                  chrome.runtime.sendMessage(
                    {
                      type: "copy-to-clipboard",
                      text: textToCopy
                    },
                    (r) => resolve(r)
                  );
                });
                if (copyResp?.copied) copied = true;
              } catch {
              }
            }
            if (tableResult.isTable) {
              uiToast(`\u{1F4CA} \u5DF2\u8FA8\u8B58\u8868\u683C\u7D50\u69CB\u4E26\u8907\u88FD\u70BA\u8A66\u7B97\u8868\u683C\u5F0F (TSV)\uFF01(${tableResult.rowCount} \u5217 \xD7 ${tableResult.colCount} \u6B04)`, 3500);
            } else {
              uiToast(`\u5DF2\u6210\u529F\u6383\u63CF\u4E26\u8907\u88FD\u6587\u5B57\u81F3\u526A\u8CBC\u7C3F\uFF01(${cleanText.length} \u5B57)`, 3500);
            }
            return true;
          }
        }
      }
    } catch (err) {
      console.warn("[Let Me See See] Background OCR messaging error:", err);
    }
    if (typeof window.TextDetector !== "undefined") {
      try {
        const detector = new window.TextDetector();
        let source = null;
        try {
          source = await getImageBitmap(imgUrl);
        } catch {
        }
        if (!source) {
          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = imgUrl;
          if (typeof img.decode === "function") {
            try {
              await img.decode();
            } catch {
            }
          }
          source = img;
        }
        if (source) {
          const detected = await detector.detect(source);
          if (detected && detected.length > 0) {
            const text = detected.map((d) => d.rawValue || d.text || "").filter(Boolean).join("\n").trim();
            if (text) {
              const cleanText = cleanOcrText(text);
              await copyTextToClipboard(cleanText);
              uiToast(`\u5DF2\u6210\u529F\u6383\u63CF\u4E26\u8907\u88FD\u6587\u5B57\u81F3\u526A\u8CBC\u7C3F\uFF01(${cleanText.length} \u5B57)`, 3500);
              return true;
            }
          }
        }
      } catch (err) {
        console.warn("[Let Me See See] TextDetector fallback error:", err);
      }
    }
    const ocrEngine = typeof OCRAD === "function" ? OCRAD : typeof window !== "undefined" && typeof window.OCRAD === "function" ? window.OCRAD : null;
    if (ocrEngine) {
      try {
        let imgData = null;
        if (window.__letMeSeeSeeActiveRaster && window.__letMeSeeSeeActiveRaster.pixels) {
          imgData = {
            width: window.__letMeSeeSeeActiveRaster.width,
            height: window.__letMeSeeSeeActiveRaster.height,
            data: window.__letMeSeeSeeActiveRaster.pixels
          };
        }
        if (imgData) {
          const result = ocrEngine(imgData);
          if (result && typeof result === "string" && result.trim()) {
            const cleanText = cleanOcrText(result);
            if (cleanText.length > 0) {
              await copyTextToClipboard(cleanText);
              uiToast(`\u5DF2\u6210\u529F\u6383\u63CF\u4E26\u8907\u88FD\u6587\u5B57\u81F3\u526A\u8CBC\u7C3F\uFF01(${cleanText.length} \u5B57)`, 3500);
              return true;
            }
          }
        }
      } catch {
      }
    }
    try {
      const images = Array.from(document.querySelectorAll("img, image"));
      const target = images.find((el) => {
        const s = el.getAttribute("src") || el.getAttribute("href") || el.getAttribute("xlink:href") || "";
        return s === imgUrl || s && imgUrl && (s.includes(imgUrl) || imgUrl.includes(s));
      });
      if (target) {
        const metaText = target.getAttribute("alt") || target.getAttribute("aria-label") || target.getAttribute("title") || "";
        if (metaText && metaText.trim()) {
          const cleanText = cleanOcrText(metaText.trim());
          await copyTextToClipboard(cleanText);
          uiToast(`\u5DF2\u6210\u529F\u8907\u88FD\u6587\u5B57\u81F3\u526A\u8CBC\u7C3F\uFF01(${cleanText.length} \u5B57)`, 3500);
          return true;
        }
      }
    } catch {
    }
    uiToast("\u5716\u7247\u4E2D\u672A\u5075\u6E2C\u5230\u6587\u5B57", 3e3);
    return false;
  }

  // src/content/ui/viewer-lightbox.js
  var VIEWER_SOURCE_CONTAINER_ID = "let-me-see-see-viewer-source";
  var viewerInstance = null;
  var TOOLBAR_SVG_ICONS = {
    "zoom-in": {
      title: "\u653E\u5927 (Zoom In)",
      svg: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="11" y1="8" x2="11" y2="14"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>`
    },
    "zoom-out": {
      title: "\u7E2E\u5C0F (Zoom Out)",
      svg: `<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line><line x1="8" y1="11" x2="14" y2="11"></line></svg>`
    },
    "one-to-one": {
      title: "1:1 \u539F\u5716\u5927\u5C0F (Actual Size)",
      svg: `<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="3"></rect><path d="M9 8v8M15 8v8"></path></svg>`
    },
    "reset": {
      title: "\u91CD\u8A2D (Reset)",
      svg: `<svg viewBox="0 0 24 24"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path><rect x="9" y="9" width="6" height="6" rx="1"></rect></svg>`
    },
    "prev": {
      title: "\u4E0A\u4E00\u5F35 (Previous)",
      svg: `<svg viewBox="0 0 24 24"><polyline points="15 18 9 12 15 6"></polyline></svg>`
    },
    "next": {
      title: "\u4E0B\u4E00\u5F35 (Next)",
      svg: `<svg viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg>`
    },
    "rotate-left": {
      title: "\u5411\u5DE6\u65CB\u8F49 (Rotate Left)",
      svg: `<svg viewBox="0 0 24 24"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"></path><path d="M3 3v5h5"></path></svg>`
    },
    "rotate-right": {
      title: "\u5411\u53F3\u65CB\u8F49 (Rotate Right)",
      svg: `<svg viewBox="0 0 24 24"><path d="M21 12a9 9 0 1 0-2.64 6.36"></path><polyline points="21 22 21 12 11 12"></polyline></svg>`
    },
    "crop-ocr": {
      title: "\u5C40\u90E8\u6846\u9078\u8FA8\u8B58 (Snippet OCR)",
      svg: `<svg viewBox="0 0 24 24"><path d="M5 3H3v2M19 3h2v2M5 21H3v-2M19 21h2v-2"></path><rect x="7" y="7" width="10" height="10" rx="1.5" stroke-dasharray="2 2"></rect><circle cx="12" cy="12" r="1.5" fill="currentColor"></circle></svg>`
    }
  };
  function renderModernViewerToolbar(vInstance) {
    if (!vInstance) return;
    const container = vInstance.viewer || document.querySelector(".viewer-container");
    if (!container) return;
    const items = container.querySelectorAll(".viewer-toolbar > ul > li");
    items.forEach((li2) => {
      if (li2.querySelector("svg")) return;
      let action = li2.getAttribute("data-viewer-action") || "";
      if (!action) {
        for (const cls of li2.classList) {
          if (cls.startsWith("viewer-") && cls !== "viewer-large" && cls !== "viewer-small") {
            action = cls.replace("viewer-", "");
            break;
          }
        }
      }
      if (!action) return;
      const normalizedAction = action.replace(/[A-Z]/g, (m) => "-" + m.toLowerCase()).replace(/^viewer-/, "");
      const config = TOOLBAR_SVG_ICONS[normalizedAction] || TOOLBAR_SVG_ICONS[action];
      if (config) {
        li2.classList.add("lmss-has-svg");
        if (normalizedAction === "crop-ocr" || action === "cropOcr") {
          li2.classList.add("viewer-crop-ocr-btn");
        }
        li2.setAttribute("title", config.title);
        li2.setAttribute("aria-label", config.title);
        li2.innerHTML = config.svg;
      }
    });
  }
  function getOrCreateViewerSourceContainer() {
    let container = document.getElementById(VIEWER_SOURCE_CONTAINER_ID);
    if (!container) {
      container = document.createElement("div");
      container.id = VIEWER_SOURCE_CONTAINER_ID;
      container.hidden = true;
      document.body.appendChild(container);
    }
    return container;
  }
  function openViewerLightbox(urls, initialIndex = 0, ViewerClass) {
    const validUrls = (Array.isArray(urls) ? urls : [urls]).filter(Boolean);
    if (!validUrls.length) return false;
    const container = getOrCreateViewerSourceContainer();
    const images = validUrls.map((url, idx) => {
      const img = document.createElement("img");
      img.src = url;
      img.alt = `Image ${idx + 1} of ${validUrls.length}`;
      img.dataset.viewerLabel = img.alt;
      return img;
    });
    container.replaceChildren(...images);
    if (viewerInstance) {
      viewerInstance.destroy();
      viewerInstance = null;
    }
    const VClass = ViewerClass || window.Viewer;
    if (!VClass) return false;
    viewerInstance = new VClass(container, {
      initialViewIndex: Math.max(0, Math.min(initialIndex, validUrls.length - 1)),
      keyboard: true,
      loop: false,
      title: validUrls.length > 1 ? [1, (img) => img.dataset.viewerLabel || ""] : false,
      navbar: false,
      toolbar: {
        zoomIn: 1,
        zoomOut: 1,
        oneToOne: 0,
        reset: 1,
        prev: 0,
        next: 0,
        rotateLeft: 1,
        rotateRight: 0,
        cropOcr: {
          show: 1,
          size: "large",
          click: () => {
            startLightboxCrop(viewerInstance, (cropDataUrl) => {
              if (typeof window !== "undefined") {
                window.__letMeSeeSeeActiveRaster = null;
              }
              ocrImageToText(cropDataUrl, { isCrop: true });
            });
          }
        }
      },
      zoomRatio: 0.3,
      viewed: () => {
        renderModernViewerToolbar(viewerInstance);
      },
      shown: () => {
        renderModernViewerToolbar(viewerInstance);
      },
      hidden: () => toggleToolbarPreviewHidden(false)
    });
    toggleToolbarPreviewHidden(true);
    try {
      viewerInstance.show();
      setTimeout(() => renderModernViewerToolbar(viewerInstance), 50);
      return true;
    } catch (err) {
      toggleToolbarPreviewHidden(false);
      throw err;
    }
  }

  // src/content/sheets/formula-parser.js
  function extractFormulaBarImageUrl() {
    const selectors = [
      "#t-formula-bar-input",
      ".cell-input",
      "#formula-bar",
      "[role='combobox'][aria-autocomplete='list']",
      ".waffle-formula-bar-input"
    ];
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (!el) continue;
      const txt = el.textContent || el.innerText || el.value || "";
      if (!txt) continue;
      const matchFormula = txt.match(/IMAGE\(\s*["']([^"']+)["']/i);
      if (matchFormula && matchFormula[1]) return matchFormula[1].trim();
      const matchExt = txt.match(/https?:\/\/[^\s"'\)]+\.(?:png|jpe?g|webp|gif|svg|avif)(?:[^\s"'\)]*)?/i);
      if (matchExt && matchExt[0]) return matchExt[0].trim();
      const matchHttp = txt.match(/https?:\/\/[^\s"'\)]+/i);
      if (matchHttp && matchHttp[0] && !matchHttp[0].includes("google.com")) {
        return matchHttp[0].trim();
      }
      if (/IMAGE\(/i.test(txt)) {
        const candidates = getCandidateUrlsFromDom();
        if (candidates.length) return candidates[candidates.length - 1];
      }
    }
    const formulaEl = document.querySelector("[data-sheets-formula*='IMAGE'], [data-sheets-formula*='image'], [data-sheets-formula]");
    if (formulaEl) {
      const formulaStr = formulaEl.getAttribute("data-sheets-formula") || "";
      const matchFormula = formulaStr.match(/IMAGE\(\s*["']([^"']+)["']/i);
      if (matchFormula && matchFormula[1]) return matchFormula[1].trim();
      const matchExt = formulaStr.match(/https?:\/\/[^\s"'\)]+\.(?:png|jpe?g|webp|gif|svg|avif)(?:[^\s"'\)]*)?/i);
      if (matchExt && matchExt[0]) return matchExt[0].trim();
      const matchHttp = formulaStr.match(/https?:\/\/[^\s"'\)]+/i);
      if (matchHttp && matchHttp[0] && !matchHttp[0].includes("google.com")) {
        return matchHttp[0].trim();
      }
      if (/IMAGE\(/i.test(formulaStr)) {
        const candidates = getCandidateUrlsFromDom();
        if (candidates.length) return candidates[candidates.length - 1];
      }
    }
    return null;
  }
  function getCandidateUrlsFromDom() {
    const list = [];
    try {
      const els = document.querySelectorAll("a[href^='http'], [data-sheets-value], [role='gridcell'], td, div, span");
      for (const el of els) {
        const href = el.getAttribute("href") || "";
        if (href.startsWith("http") && !href.includes("docs.google.com") && !href.includes("google.com/url")) {
          list.push(href);
        }
        const txt = el.textContent || "";
        if (txt.includes("http://") || txt.includes("https://")) {
          const m = txt.match(/https?:\/\/[^\s"'\)]+/g);
          if (m) {
            for (const u of m) {
              if (!u.includes("docs.google.com") && !u.includes("google.com/url")) {
                list.push(u);
              }
            }
          }
        }
      }
    } catch {
    }
    return list;
  }

  // src/content/shared/network-resources.js
  var DOC_PATH_PATTERNS = {
    document: "/docs-images-rt/",
    spreadsheets: "/sheets-images-rt/",
    presentation: "/slides-images-rt/"
  };
  var DOCSUBIPK_REGEX = /^https:\/\/[^/]+\.googleusercontent\.com\/docsubipk\//;
  var HIGH_RES_SIZE_SUFFIX = "=s2048";
  function isUserAvatarUrl(url) {
    if (!url || typeof url !== "string") return false;
    return /\/(?:a|a-|ogw|account|user|profile)\/[A-Za-z0-9_-]+/i.test(url) || url.includes("googleusercontent.com/a/") || url.includes("googleusercontent.com/a-/") || url.includes("googleusercontent.com/ogw/");
  }
  function getBaseImageUrl(url) {
    if (!url || typeof url !== "string") return "";
    try {
      const parsed = new URL(url);
      const cleanPath = parsed.pathname.replace(/=[^/=]*$/, "");
      if (parsed.hostname.endsWith(".googleusercontent.com")) {
        return `https://googleusercontent.com${cleanPath}`;
      }
      return `${parsed.origin}${cleanPath}`;
    } catch {
      return url.replace(/=[^/=]*$/, "");
    }
  }
  function upgradeToHighResUrl(url) {
    if (!url || typeof url !== "string") return url;
    if (/=[^/=]*$/.test(url)) {
      return `${url.replace(/=[^/=]*$/, "")}${HIGH_RES_SIZE_SUFFIX}`;
    }
    if (url.includes("googleusercontent.com")) {
      return `${url}${HIGH_RES_SIZE_SUFFIX}`;
    }
    return url;
  }
  function deduplicate(arr) {
    return [...new Set(arr)];
  }
  var cumulativeDiscoveredImages = /* @__PURE__ */ new Map();
  function registerImageUrl(url) {
    if (!url || typeof url !== "string") return;
    const trimmed = url.trim();
    if (!trimmed || trimmed.startsWith("data:") || trimmed.includes("gstatic.com") || isUserAvatarUrl(trimmed)) {
      return;
    }
    const baseKey = getBaseImageUrl(trimmed);
    const isHighRes = /=s(?:1024|1600|2048|4096)(?:$|[&#?])/.test(trimmed);
    if (!cumulativeDiscoveredImages.has(baseKey)) {
      cumulativeDiscoveredImages.set(baseKey, {
        url: isHighRes ? trimmed : upgradeToHighResUrl(trimmed),
        rawUrl: trimmed,
        isHighRes
      });
    } else {
      const existing = cumulativeDiscoveredImages.get(baseKey);
      if (!existing.isHighRes && isHighRes) {
        cumulativeDiscoveredImages.set(baseKey, {
          url: trimmed,
          rawUrl: trimmed,
          isHighRes: true
        });
      }
    }
  }
  var observerInitialized = false;
  function initResourceObserver() {
    if (observerInitialized) return;
    observerInitialized = true;
    if (typeof performance !== "undefined") {
      if (typeof performance.setResourceTimingBufferSize === "function") {
        try {
          performance.setResourceTimingBufferSize(1e4);
        } catch {
        }
      }
      if (typeof PerformanceObserver !== "undefined") {
        try {
          const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
              if (entry.name) registerImageUrl(entry.name);
            }
          });
          observer.observe({ entryTypes: ["resource"] });
        } catch {
        }
      }
    }
  }
  function getNetworkResourceUrls(docType, entries = typeof performance !== "undefined" && typeof performance.getEntriesByType === "function" ? performance.getEntriesByType("resource") : []) {
    initResourceObserver();
    const pattern = DOC_PATH_PATTERNS[docType];
    const allUrls = deduplicate(entries.map((e) => typeof e === "string" ? e : e.name));
    for (const u of allUrls) {
      if (pattern && u.includes(pattern)) {
        registerImageUrl(u);
      } else if (docType === "spreadsheets" && (DOCSUBIPK_REGEX.test(u) || u.includes("googleusercontent.com"))) {
        registerImageUrl(u);
      }
    }
    if (typeof document !== "undefined") {
      try {
        const selector = docType === "presentation" ? "#workspace-container image, .punch-viewer-content image, .punch-filmstrip-thumbnail image" : "svg.kix-embeddedobject-image image, .kix-page image, .waffle-borderless-embedded-object-container img";
        document.querySelectorAll(selector).forEach((el) => {
          const src = el.getAttribute("href") || el.getAttribute("xlink:href") || el.getAttribute("src");
          if (src && !src.startsWith("data:") && !src.includes("gstatic.com") && !isUserAvatarUrl(src)) {
            registerImageUrl(src);
          }
        });
      } catch {
      }
    }
    const candidates = /* @__PURE__ */ new Map();
    for (const [baseKey, item] of cumulativeDiscoveredImages.entries()) {
      if (pattern && baseKey.includes(pattern)) {
        candidates.set(baseKey, item.url);
      } else if (docType === "spreadsheets") {
        if (DOCSUBIPK_REGEX.test(baseKey) || baseKey.includes("googleusercontent.com") && !isUserAvatarUrl(baseKey)) {
          candidates.set(baseKey, item.url);
        }
      } else if (docType === "presentation") {
        if (baseKey.includes("slides-images-rt") || baseKey.includes("googleusercontent.com") && !isUserAvatarUrl(baseKey)) {
          candidates.set(baseKey, item.url);
        }
      }
    }
    if (candidates.size === 0) {
      for (const u of allUrls) {
        if (pattern && u.includes(pattern)) {
          candidates.set(getBaseImageUrl(u), u);
        }
      }
    }
    const extraUrls = [];
    if (docType === "spreadsheets") {
      const docsubipk = allUrls.filter((u) => DOCSUBIPK_REGEX.test(u)).map(upgradeToHighResUrl);
      extraUrls.push(...docsubipk);
      for (const u of allUrls) {
        try {
          const parsed = new URL(u);
          if ((/\.(png|jpe?g|webp|gif|svg|avif)($|[?#])/i.test(parsed.pathname) || u.includes("googleusercontent.com")) && !/(^|\.)(gstatic\.com)$/.test(parsed.hostname)) {
            extraUrls.push(u);
          }
        } catch {
        }
      }
      const formulaUrl = extractFormulaBarImageUrl();
      if (formulaUrl) extraUrls.push(formulaUrl);
    }
    return deduplicate([...Array.from(candidates.values()), ...extraUrls]);
  }
  function getFormatFromMime(mimeType, url) {
    const map = {
      "image/avif": "AVIF",
      "image/gif": "GIF",
      "image/jpeg": "JPEG",
      "image/png": "PNG",
      "image/svg+xml": "SVG",
      "image/webp": "WEBP"
    };
    if (map[mimeType]) return map[mimeType];
    const ext = url.match(/\.([a-z0-9]{2,5})(?:[?#]|$)/i)?.[1];
    return ext ? ext.toUpperCase() : "IMAGE";
  }
  async function fetchCandidateThumbnails(urls) {
    if (!urls || !urls.length) return [];
    const results = new Array(urls.length);
    let currentIndex = 0;
    const worker = async () => {
      while (currentIndex < urls.length) {
        const idx = currentIndex++;
        try {
          const item = await fetchAndCacheImage(urls[idx]);
          if (item?.bitmap) {
            const raster = create48x48Thumbnail(item.bitmap, 48, 48);
            if (raster) {
              results[idx] = {
                url: urls[idx],
                raster,
                width: item.bitmap.width,
                height: item.bitmap.height,
                format: getFormatFromMime(item.mimeType, urls[idx])
              };
            }
          }
        } catch {
        }
      }
    };
    const poolSize = Math.min(4, urls.length);
    await Promise.all(Array.from({ length: poolSize }, worker));
    return results.filter(Boolean);
  }

  // src/content/sheets/cell-matcher.js
  var THUMB_SIZE = 48;
  function scaleToRaster(bitmap, width, height) {
    if (!bitmap) return null;
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return null;
    try {
      ctx.drawImage(bitmap, 0, 0, width, height);
      const imgData = ctx.getImageData(0, 0, width, height);
      return { width, height, pixels: imgData.data };
    } catch {
      return null;
    }
  }
  async function scanSheetOverAndInCellImages(imageUrls) {
    const seenUrls = /* @__PURE__ */ new Set();
    const overCellImgs = Array.from(
      document.querySelectorAll(".waffle-borderless-embedded-object-container img, .grid4-inner-container img, .grid-scrollable-wrapper img")
    ).filter((img) => {
      const src = img.getAttribute("src") || img.getAttribute("href") || img.getAttribute("xlink:href") || "";
      if (!src || seenUrls.has(src)) return false;
      seenUrls.add(src);
      return true;
    });
    const overCellList = (await Promise.all(
      overCellImgs.map(async (img) => {
        const src = img.getAttribute("src") || img.getAttribute("href") || img.getAttribute("xlink:href") || "";
        const item = await fetchAndCacheImage(src);
        if (!item?.bitmap) return null;
        const raster = scaleToRaster(item.bitmap, THUMB_SIZE, THUMB_SIZE);
        if (!raster) return null;
        return {
          url: src,
          location: "Over cells",
          raster,
          target: {
            element: img,
            getRect: () => img.getBoundingClientRect(),
            activate: () => {
              const r = img.getBoundingClientRect();
              const evt = { bubbles: true, cancelable: true, clientX: r.left + r.width / 2, clientY: r.top + r.height / 2, view: window };
              img.dispatchEvent(new MouseEvent("mousedown", evt));
              img.dispatchEvent(new MouseEvent("mouseup", evt));
              img.dispatchEvent(new MouseEvent("click", evt));
            }
          }
        };
      })
    )).filter(Boolean);
    return overCellList;
  }

  // src/content/vendor/insertion-query.js
  var animCount = 100;
  var isSupported = false;
  var animProp = "animationName";
  var prefix = "";
  var prefixes = ["Webkit", "Moz", "O", "ms", "Khtml"];
  var testDiv = document.createElement("div");
  if (testDiv.style.animationName !== void 0) {
    isSupported = true;
  }
  if (!isSupported) {
    for (let i = 0; i < prefixes.length; i++) {
      if (testDiv.style[prefixes[i] + "AnimationName"] !== void 0) {
        prefix = prefixes[i];
        animProp = prefix + "AnimationName";
        prefix = "-" + prefix.toLowerCase() + "-";
        isSupported = true;
        break;
      }
    }
  }
  function insertionQuery(selector) {
    return {
      every(callback) {
        const animName = "insQ_" + animCount++;
        const style = document.createElement("style");
        style.innerHTML = `@${prefix}keyframes ${animName} {
  from { outline: 1px solid transparent }
  to { outline: 0px solid transparent }
}
${selector} {
  animation-duration: 0.001s;
  animation-name: ${animName};
  ${prefix}animation-duration: 0.001s;
  ${prefix}animation-name: ${animName};
}`;
        document.head.appendChild(style);
        const handler = (e) => {
          if (e.animationName === animName || e[animProp] === animName) {
            callback(e.target);
          }
        };
        const timer = setTimeout(() => {
          document.addEventListener("animationstart", handler, false);
          document.addEventListener("MSAnimationStart", handler, false);
          document.addEventListener("webkitAnimationStart", handler, false);
        }, 20);
        return {
          destroy() {
            clearTimeout(timer);
            if (style && style.parentNode) {
              style.parentNode.removeChild(style);
            }
            document.removeEventListener("animationstart", handler, false);
            document.removeEventListener("MSAnimationStart", handler, false);
            document.removeEventListener("webkitAnimationStart", handler, false);
          }
        };
      }
    };
  }

  // src/content/docs/canvas-scanner.js
  function scanTileRowHorizontalBounds(raster, yStart, yEnd) {
    let minX = raster.width;
    let maxX = -1;
    for (let y = yStart; y < yEnd; y++) {
      for (let x = 0; x < raster.width; x++) {
        const alpha = raster.pixels[getPixelIndex(raster, x, y) + 3];
        if (alpha > 80) {
          minX = Math.min(minX, x);
          maxX = Math.max(maxX, x);
        }
      }
    }
    return maxX >= minX ? { left: minX, top: yStart, right: maxX + 1, bottom: yEnd } : null;
  }
  function extractSubRaster(raster, bounds) {
    const width = Math.max(1, bounds.right - bounds.left);
    const height = Math.max(1, bounds.bottom - bounds.top);
    const pixels = new Uint8ClampedArray(width * height * 4);
    for (let y = 0; y < height; y++) {
      const srcOffset = getPixelIndex(raster, bounds.left, bounds.top + y);
      const destOffset = y * width * 4;
      pixels.set(raster.pixels.subarray(srcOffset, srcOffset + width * 4), destOffset);
    }
    return { width, height, pixels };
  }
  function scanTileBoxes(raster) {
    const minWidthThreshold = Math.max(24, Math.floor(raster.width * 0.02));
    const minHeightThreshold = 20;
    const boxes = [];
    let regionStart = -1;
    for (let y = 0; y <= raster.height; y++) {
      let rowNonTransparentCount = 0;
      if (y < raster.height) {
        for (let x = 0; x < raster.width; x += 2) {
          if (raster.pixels[getPixelIndex(raster, x, y) + 3] > 80) {
            rowNonTransparentCount++;
          }
        }
      }
      if (rowNonTransparentCount >= minWidthThreshold) {
        if (regionStart < 0) regionStart = y;
        continue;
      }
      if (regionStart >= 0 && y - regionStart >= minHeightThreshold) {
        const bounds = scanTileRowHorizontalBounds(raster, regionStart, y);
        if (bounds && bounds.right - bounds.left >= 20) {
          boxes.push(bounds);
        }
      }
      regionStart = -1;
    }
    return boxes;
  }
  function scanAllCanvasTiles() {
    const canvases = Array.from(document.querySelectorAll("canvas.kix-canvas-tile-content")).sort(
      (a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top
    );
    return canvases.flatMap((canvas, canvasIndex) => {
      const raster = canvasToRaster(canvas);
      if (!raster) return [];
      return scanTileBoxes(raster).map((bounds) => ({
        canvas,
        canvasIndex,
        bounds,
        raster: extractSubRaster(raster, bounds)
      }));
    });
  }

  // src/content/docs/tile-stitcher.js
  function calculateHorizontalOverlap(b1, b2) {
    const overlap = Math.max(0, Math.min(b1.right, b2.right) - Math.max(b1.left, b2.left));
    const span = Math.max(1, Math.min(b1.right - b1.left, b2.right - b2.left));
    return overlap / span;
  }
  function groupAdjacentTileChains(tileBoxes) {
    const chains = [];
    for (const box of tileBoxes) {
      const lastChain = chains[chains.length - 1];
      const prevBox = lastChain?.[lastChain.length - 1];
      if (prevBox && box.canvasIndex === prevBox.canvasIndex + 1 && prevBox.bounds.bottom >= prevBox.canvas.height - 1 && box.bounds.top <= 1 && calculateHorizontalOverlap(prevBox.bounds, box.bounds) >= 0.7) {
        lastChain.push(box);
      } else {
        chains.push([box]);
      }
    }
    return chains;
  }
  function stitchTileRasters(tileChain) {
    const minLeft = Math.min(...tileChain.map((t) => t.bounds.left));
    const maxRight = Math.max(...tileChain.map((t) => t.bounds.right));
    const width = maxRight - minLeft;
    const totalHeight = tileChain.reduce((sum, t) => sum + t.raster.height, 0);
    const mergedPixels = new Uint8ClampedArray(width * totalHeight * 4);
    let offsetY = 0;
    for (const t of tileChain) {
      const offsetX = t.bounds.left - minLeft;
      for (let row = 0; row < t.raster.height; row++) {
        const srcOffset = row * t.raster.width * 4;
        const destOffset = ((offsetY + row) * width + offsetX) * 4;
        mergedPixels.set(t.raster.pixels.subarray(srcOffset, srcOffset + t.raster.width * 4), destOffset);
      }
      offsetY += t.raster.height;
    }
    return { width, height: totalHeight, pixels: mergedPixels };
  }
  function tileBoxToViewportRect(box) {
    const canvasRect = box.canvas.getBoundingClientRect();
    const scaleX = canvasRect.width / box.canvas.width;
    const scaleY = canvasRect.height / box.canvas.height;
    return new DOMRect(
      canvasRect.left + box.bounds.left * scaleX,
      canvasRect.top + box.bounds.top * scaleY,
      (box.bounds.right - box.bounds.left) * scaleX,
      (box.bounds.bottom - box.bounds.top) * scaleY
    );
  }
  function dispatchSyntheticClick(element, rect = element.getBoundingClientRect()) {
    const evt = {
      bubbles: true,
      cancelable: true,
      clientX: rect.left + rect.width / 2,
      clientY: rect.top + rect.height / 2,
      view: window
    };
    element.dispatchEvent(new MouseEvent("mousedown", evt));
    element.dispatchEvent(new MouseEvent("mouseup", evt));
    element.dispatchEvent(new MouseEvent("click", evt));
  }
  function buildStitchedDocsImages(tileBoxes) {
    return groupAdjacentTileChains(tileBoxes).map((chain) => {
      const midBox = chain[Math.floor(chain.length / 2)];
      const getRect = () => tileBoxToViewportRect(midBox);
      return {
        url: "",
        location: "Document",
        raster: stitchTileRasters(chain),
        target: {
          element: midBox.canvas,
          getRect,
          getRects: () => chain.map(tileBoxToViewportRect),
          activate: () => dispatchSyntheticClick(midBox.canvas, getRect())
        }
      };
    });
  }

  // src/content/docs/docs-handler.js
  var DOCS_SELECTION_BORDER = ".docs-squarehandleselectionbox-border";
  var DOCS_OVERLAY_CONTAINER_ID = "letMeSeeSeeDocumentImage";
  var MAX_MATCH_SCORE = 0.34;
  var RESCAN_COOLDOWN_MS = 8e3;
  var isInitialized = false;
  var activeMatchedItem = null;
  var cachedScannedImages = [];
  var ongoingScanPromise = null;
  var scanSequenceId = 0;
  var lastScanTimestamp = 0;
  var currentDocsImageUrl = "";
  var rafId = 0;
  function getActiveDocsImageUrl() {
    return currentDocsImageUrl || activeMatchedItem?.image?.url || "";
  }
  function positionToolbarOverRect(rect, containerId) {
    createFloatingToolbar();
    const toolbar = document.getElementById("letMeSeeSeeToolbar");
    if (!toolbar) return;
    const existingOverlay = document.getElementById(containerId);
    if (existingOverlay) existingOverlay.remove();
    const overlay = document.createElement("div");
    overlay.id = containerId;
    Object.assign(overlay.style, {
      position: "fixed",
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      height: `${rect.height}px`,
      pointerEvents: "none",
      zIndex: "2147481000"
    });
    Object.assign(toolbar.style, {
      display: "flex",
      position: "absolute",
      pointerEvents: "auto",
      zIndex: "1"
    });
    overlay.appendChild(toolbar);
    document.body.appendChild(overlay);
  }
  function hideDocsToolbarOverlay() {
    currentDocsImageUrl = "";
    const el = document.getElementById(DOCS_OVERLAY_CONTAINER_ID);
    if (el) el.remove();
  }
  function updateDocsToolbarPosition() {
    const item = activeMatchedItem;
    const target = item?.image?.target;
    if (!item || !target?.element?.isConnected) return;
    if (rafId) return;
    rafId = requestAnimationFrame(() => {
      rafId = 0;
      const current = activeMatchedItem;
      const currentTarget = current?.image?.target;
      if (!current || !currentTarget?.element?.isConnected) return;
      const rect = current.getRect();
      if (rect.width > 1 && rect.height > 1) {
        positionToolbarOverRect(rect, DOCS_OVERLAY_CONTAINER_ID);
      }
    });
  }
  async function scanDocsImages() {
    lastScanTimestamp = Date.now();
    if (ongoingScanPromise) return ongoingScanPromise;
    ongoingScanPromise = (async () => {
      try {
        const candidateUrls = getNetworkResourceUrls("document");
        const thumbnails = await fetchCandidateThumbnails(candidateUrls);
        const rawTiles = scanAllCanvasTiles();
        const stitchedGroups = buildStitchedDocsImages(rawTiles);
        const matchedImages = [];
        for (const group of stitchedGroups) {
          const best = findBestImageMatch(group.raster, thumbnails);
          if (best && best.score <= MAX_MATCH_SCORE) {
            const thumb = thumbnails.find((t) => t.url === best.url);
            matchedImages.push({
              url: best.url,
              location: "Document",
              target: group.target,
              width: thumb?.width,
              height: thumb?.height,
              format: thumb?.format
            });
          }
        }
        cachedScannedImages = matchedImages;
        return matchedImages;
      } finally {
        ongoingScanPromise = null;
      }
    })();
    return ongoingScanPromise;
  }
  function findImageAtPoint(images, clientX, clientY) {
    for (const img of images) {
      const target = img.target;
      if (!target) continue;
      const rects = target.getRects ? target.getRects() : [target.getRect()];
      const hitIdx = rects.findIndex(
        (r) => clientX >= r.left && clientX <= r.right && clientY >= r.top && clientY <= r.bottom
      );
      if (hitIdx >= 0) {
        return {
          image: img,
          getRect: () => target.getRects ? target.getRects()[hitIdx] : target.getRect()
        };
      }
    }
    return null;
  }
  async function handleDocsClick(event) {
    const target = event.target;
    if (!(target instanceof Element) || target.closest("#letMeSeeSeeToolbar, .viewer-container")) return;
    if (!target.closest(DOCS_SELECTION_BORDER) && !target.closest("canvas") && !target.closest(".kix-page-content-wrapper")) return;
    const currentSeq = ++scanSequenceId;
    let match = findImageAtPoint(cachedScannedImages, event.clientX, event.clientY);
    if (!match && (!cachedScannedImages.length || Date.now() - lastScanTimestamp > RESCAN_COOLDOWN_MS && (target.closest(DOCS_SELECTION_BORDER) || target.closest("canvas")))) {
      try {
        const scanned = await scanDocsImages();
        match = findImageAtPoint(scanned, event.clientX, event.clientY);
      } catch {
        match = null;
      }
    }
    if (currentSeq !== scanSequenceId) return;
    if (!match) {
      activeMatchedItem = null;
      hideDocsToolbarOverlay();
      return;
    }
    activeMatchedItem = match;
    if (match.image?.raster) {
      window.__letMeSeeSeeActiveRaster = match.image.raster;
    }
    currentDocsImageUrl = match.image.url;
    updateDocsToolbarPosition();
  }
  function initDocsHandler() {
    triggerOcrPrewarm();
    insertionQuery(DOCS_SELECTION_BORDER).every((borderEl) => {
      activeMatchedItem = null;
      currentDocsImageUrl = "";
      createFloatingToolbar();
      attachToolbarToContainer(borderEl);
      return true;
    });
    if (!isInitialized) {
      document.addEventListener("click", handleDocsClick, true);
      window.addEventListener("resize", updateDocsToolbarPosition);
      document.addEventListener("scroll", updateDocsToolbarPosition, true);
      isInitialized = true;
      scanDocsImages().catch(() => {
      });
    }
  }

  // src/content/sheets/sheets-handler.js
  var OVER_CELL_IMG_SELECTOR = ".waffle-borderless-embedded-object-container img:not([flow-btn])";
  var currentSheetsImageUrl = "";
  function getActiveSheetsImageUrl() {
    return currentSheetsImageUrl;
  }
  function bindFloatingImageClickListener(imgElement) {
    if (!imgElement) return;
    const clickHandler = (evt) => {
      if (evt) {
        setTimeout(() => {
          const focusedContainer = document.querySelectorAll(
            ".focused-overlay-container .waffle-borderless-embedded-object-overlay-focused .waffle-borderless-embedded-object-container"
          )[0];
          if (focusedContainer) {
            triggerOcrPrewarm();
            createFloatingToolbar();
            attachToolbarToContainer(focusedContainer);
          }
        }, 100);
      }
    };
    imgElement.removeEventListener("click", clickHandler);
    imgElement.addEventListener("click", clickHandler);
  }
  function initSheetsHandler() {
    triggerOcrPrewarm();
    insertionQuery(OVER_CELL_IMG_SELECTOR).every((img) => {
      createFloatingToolbar();
      bindFloatingImageClickListener(img);
      return true;
    });
  }

  // src/content/slides/slides-handler.js
  var SLIDES_OVERLAY_CONTAINER_ID = "letMeSeeSeeSlideImage";
  var isInitialized2 = false;
  var activeSlideImageElement = null;
  var rafId2 = 0;
  function findSlideImageAtElements(elements) {
    return elements.find((el) => el.tagName.toLowerCase() === "image" && !!el.closest("#workspace-container")) || null;
  }
  function hideSlidesToolbarOverlay() {
    window.SlideImageUrl = "";
    const el = document.getElementById(SLIDES_OVERLAY_CONTAINER_ID);
    if (el) el.remove();
  }
  function updateSlidesToolbarPosition() {
    if (!activeSlideImageElement || !activeSlideImageElement.isConnected) return;
    if (rafId2) return;
    rafId2 = requestAnimationFrame(() => {
      rafId2 = 0;
      if (!activeSlideImageElement || !activeSlideImageElement.isConnected) return;
      const rect = activeSlideImageElement.getBoundingClientRect();
      if (rect.width > 1 && rect.height > 1) {
        positionToolbarOverRect(rect, SLIDES_OVERLAY_CONTAINER_ID);
      }
    });
  }
  function handleSlidesClick(event) {
    const target = event.target;
    if (!(target instanceof Element) || target.closest("#letMeSeeSeeToolbar, .viewer-container")) return;
    const imgEl = findSlideImageAtElements(document.elementsFromPoint(event.clientX, event.clientY));
    if (!imgEl) {
      activeSlideImageElement = null;
      hideSlidesToolbarOverlay();
      return;
    }
    activeSlideImageElement = imgEl;
    window.SlideImageUrl = imgEl.getAttribute("href") || imgEl.getAttribute("xlink:href") || "";
    updateSlidesToolbarPosition();
    window.setTimeout(() => {
      const fresh = findSlideImageAtElements(document.elementsFromPoint(event.clientX, event.clientY));
      if (fresh) activeSlideImageElement = fresh;
      updateSlidesToolbarPosition();
    }, 100);
  }
  function initSlidesHandler() {
    triggerOcrPrewarm();
    createFloatingToolbar();
    hideSlidesToolbarOverlay();
    if (!isInitialized2) {
      document.addEventListener("click", handleSlidesClick, true);
      window.addEventListener("resize", updateSlidesToolbarPosition);
      document.addEventListener("scroll", updateSlidesToolbarPosition, true);
      isInitialized2 = true;
    }
  }

  // src/content/index.js
  if (typeof window !== "undefined") {
    window.Viewer = viewer_default;
  }
  function getDocumentType() {
    return location.pathname.split("/")[1] || "";
  }
  function getActiveImageUrl() {
    const docType = getDocumentType();
    let url = "";
    if (docType === "document") {
      const kixImg = document.querySelector("svg.kix-embeddedobject-image image");
      url = kixImg?.getAttribute("xlink:href") || getActiveDocsImageUrl();
    } else if (docType === "spreadsheets") {
      const focusedContainer = document.querySelectorAll(
        ".focused-overlay-container .waffle-borderless-embedded-object-overlay-focused .waffle-borderless-embedded-object-container"
      )[0];
      const img = focusedContainer?.getElementsByTagName("img")?.[0];
      url = img?.src || getActiveSheetsImageUrl() || extractFormulaBarImageUrl() || "";
    } else if (docType === "presentation") {
      url = window.SlideImageUrl || "";
    }
    if (!url) {
      url = getActiveDocsImageUrl() || getActiveSheetsImageUrl() || typeof window !== "undefined" && (window.SlideImageUrl || window.__letMeSeeSeeActiveDataUrl) || "";
    }
    return url;
  }
  async function handleToolbarAction(action) {
    const url = getActiveImageUrl();
    switch (action) {
      case "zoom":
        return openViewerLightbox([url], 0, viewer_default);
      case "copy":
        return copyImageToClipboard(url);
      case "ocr":
        return ocrImageToText(url);
      case "download":
        return downloadSingleImage(url);
      default:
        return false;
    }
  }
  async function batchDownloadAllImages(urlsOrProgress, onProgress) {
    let urls = [];
    let cb = onProgress;
    if (Array.isArray(urlsOrProgress)) {
      urls = urlsOrProgress;
    } else {
      urls = getNetworkResourceUrls(getDocumentType());
      cb = urlsOrProgress;
    }
    return packImagesToZip(urls, cb, jszip_default);
  }
  function bootstrap() {
    const docType = getDocumentType();
    if (typeof window !== "undefined") {
      window.__letMeSeeSeeToolbarAction = handleToolbarAction;
    }
    const runtime = typeof chrome !== "undefined" && chrome.runtime || browser_polyfill_default?.runtime;
    if (runtime?.onMessage) {
      runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (msg?.type === "get-document-type") {
          sendResponse && sendResponse(docType);
          return Promise.resolve(docType);
        }
        if (msg?.type === "batch-download-images" || msg?.type === "export-all-images") {
          const promise = batchDownloadAllImages();
          if (sendResponse) {
            promise.then(sendResponse).catch(
              (err) => sendResponse({ downloaded: 0, failed: 1, error: err?.message || String(err) })
            );
            return true;
          }
          return promise;
        }
      });
    }
    switch (docType) {
      case "document":
        initDocsHandler();
        break;
      case "presentation":
        initSlidesHandler();
        break;
      case "spreadsheets":
        initSheetsHandler();
        break;
    }
    try {
      const link = document.createElement("link");
      link.setAttribute("rel", "stylesheet");
      link.setAttribute("href", runtime.getURL("dist/contentScripts/style.css"));
      document.head.appendChild(link);
    } catch {
    }
    try {
      window.__letMeSeeSeeCache = imageCache;
      window.__letMeSeeSee = {
        Te: () => createFloatingToolbar(handleToolbarAction),
        Qe: sanitizeFilename,
        Fs: initDocsHandler,
        Us: initSlidesHandler,
        Hs: initSheetsHandler,
        uiToast,
        batchDownloadAllImages,
        Cs: batchDownloadAllImages,
        extractFormulaBarImageUrl,
        cleanOcrText,
        processOcrTableOutput,
        Ir: getNetworkResourceUrls,
        Wr: scanSheetOverAndInCellImages,
        sn: handleToolbarAction,
        ocrImageToText,
        copyTextToClipboard,
        copyImageToClipboard,
        vi: copyImageToClipboard,
        triggerOcrPrewarm,
        getCache: () => imageCache
      };
    } catch {
    }
  }
  if (typeof window !== "undefined") {
    bootstrap();
  }
})();
