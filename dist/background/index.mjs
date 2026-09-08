(function(){"use strict";var R=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{},v={exports:{}};(function(l,U){(function(p,d){d(l)})(typeof globalThis<"u"?globalThis:typeof self<"u"?self:R,function(p){var d,E;if(!((E=(d=globalThis.chrome)==null?void 0:d.runtime)!=null&&E.id))throw new Error("This script should only be loaded in a browser extension.");if(typeof globalThis.browser>"u"||Object.getPrototypeOf(globalThis.browser)!==Object.prototype){const $="The message port closed before a response was received.",_=c=>{const y={alarms:{clear:{minArgs:0,maxArgs:1},clearAll:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getAll:{minArgs:0,maxArgs:0}},bookmarks:{create:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},getChildren:{minArgs:1,maxArgs:1},getRecent:{minArgs:1,maxArgs:1},getSubTree:{minArgs:1,maxArgs:1},getTree:{minArgs:0,maxArgs:0},move:{minArgs:2,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeTree:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}},browserAction:{disable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},enable:{minArgs:0,maxArgs:1,fallbackToNoCallback:!0},getBadgeBackgroundColor:{minArgs:1,maxArgs:1},getBadgeText:{minArgs:1,maxArgs:1},getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},openPopup:{minArgs:0,maxArgs:0},setBadgeBackgroundColor:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setBadgeText:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},browsingData:{remove:{minArgs:2,maxArgs:2},removeCache:{minArgs:1,maxArgs:1},removeCookies:{minArgs:1,maxArgs:1},removeDownloads:{minArgs:1,maxArgs:1},removeFormData:{minArgs:1,maxArgs:1},removeHistory:{minArgs:1,maxArgs:1},removeLocalStorage:{minArgs:1,maxArgs:1},removePasswords:{minArgs:1,maxArgs:1},removePluginData:{minArgs:1,maxArgs:1},settings:{minArgs:0,maxArgs:0}},commands:{getAll:{minArgs:0,maxArgs:0}},contextMenus:{remove:{minArgs:1,maxArgs:1},removeAll:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},cookies:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:1,maxArgs:1},getAllCookieStores:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},devtools:{inspectedWindow:{eval:{minArgs:1,maxArgs:2,singleCallbackArg:!1}},panels:{create:{minArgs:3,maxArgs:3,singleCallbackArg:!0},elements:{createSidebarPane:{minArgs:1,maxArgs:1}}}},downloads:{cancel:{minArgs:1,maxArgs:1},download:{minArgs:1,maxArgs:1},erase:{minArgs:1,maxArgs:1},getFileIcon:{minArgs:1,maxArgs:2},open:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},pause:{minArgs:1,maxArgs:1},removeFile:{minArgs:1,maxArgs:1},resume:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},extension:{isAllowedFileSchemeAccess:{minArgs:0,maxArgs:0},isAllowedIncognitoAccess:{minArgs:0,maxArgs:0}},history:{addUrl:{minArgs:1,maxArgs:1},deleteAll:{minArgs:0,maxArgs:0},deleteRange:{minArgs:1,maxArgs:1},deleteUrl:{minArgs:1,maxArgs:1},getVisits:{minArgs:1,maxArgs:1},search:{minArgs:1,maxArgs:1}},i18n:{detectLanguage:{minArgs:1,maxArgs:1},getAcceptLanguages:{minArgs:0,maxArgs:0}},identity:{launchWebAuthFlow:{minArgs:1,maxArgs:1}},idle:{queryState:{minArgs:1,maxArgs:1}},management:{get:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},getSelf:{minArgs:0,maxArgs:0},setEnabled:{minArgs:2,maxArgs:2},uninstallSelf:{minArgs:0,maxArgs:1}},notifications:{clear:{minArgs:1,maxArgs:1},create:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:0},getPermissionLevel:{minArgs:0,maxArgs:0},update:{minArgs:2,maxArgs:2}},pageAction:{getPopup:{minArgs:1,maxArgs:1},getTitle:{minArgs:1,maxArgs:1},hide:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setIcon:{minArgs:1,maxArgs:1},setPopup:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},setTitle:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0},show:{minArgs:1,maxArgs:1,fallbackToNoCallback:!0}},permissions:{contains:{minArgs:1,maxArgs:1},getAll:{minArgs:0,maxArgs:0},remove:{minArgs:1,maxArgs:1},request:{minArgs:1,maxArgs:1}},runtime:{getBackgroundPage:{minArgs:0,maxArgs:0},getPlatformInfo:{minArgs:0,maxArgs:0},openOptionsPage:{minArgs:0,maxArgs:0},requestUpdateCheck:{minArgs:0,maxArgs:0},sendMessage:{minArgs:1,maxArgs:3},sendNativeMessage:{minArgs:2,maxArgs:2},setUninstallURL:{minArgs:1,maxArgs:1}},sessions:{getDevices:{minArgs:0,maxArgs:1},getRecentlyClosed:{minArgs:0,maxArgs:1},restore:{minArgs:0,maxArgs:1}},storage:{local:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}},managed:{get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1}},sync:{clear:{minArgs:0,maxArgs:0},get:{minArgs:0,maxArgs:1},getBytesInUse:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}}},tabs:{captureVisibleTab:{minArgs:0,maxArgs:2},create:{minArgs:1,maxArgs:1},detectLanguage:{minArgs:0,maxArgs:1},discard:{minArgs:0,maxArgs:1},duplicate:{minArgs:1,maxArgs:1},executeScript:{minArgs:1,maxArgs:2},get:{minArgs:1,maxArgs:1},getCurrent:{minArgs:0,maxArgs:0},getZoom:{minArgs:0,maxArgs:1},getZoomSettings:{minArgs:0,maxArgs:1},goBack:{minArgs:0,maxArgs:1},goForward:{minArgs:0,maxArgs:1},highlight:{minArgs:1,maxArgs:1},insertCSS:{minArgs:1,maxArgs:2},move:{minArgs:2,maxArgs:2},query:{minArgs:1,maxArgs:1},reload:{minArgs:0,maxArgs:2},remove:{minArgs:1,maxArgs:1},removeCSS:{minArgs:1,maxArgs:2},sendMessage:{minArgs:2,maxArgs:3},setZoom:{minArgs:1,maxArgs:2},setZoomSettings:{minArgs:1,maxArgs:2},update:{minArgs:1,maxArgs:2}},topSites:{get:{minArgs:0,maxArgs:0}},webNavigation:{getAllFrames:{minArgs:1,maxArgs:1},getFrame:{minArgs:1,maxArgs:1}},webRequest:{handlerBehaviorChanged:{minArgs:0,maxArgs:0}},windows:{create:{minArgs:0,maxArgs:1},get:{minArgs:1,maxArgs:2},getAll:{minArgs:0,maxArgs:1},getCurrent:{minArgs:0,maxArgs:1},getLastFocused:{minArgs:0,maxArgs:1},remove:{minArgs:1,maxArgs:1},update:{minArgs:2,maxArgs:2}}};if(Object.keys(y).length===0)throw new Error("api-metadata.json has not been included in browser-polyfill");class P extends WeakMap{constructor(r,n=void 0){super(n),this.createItem=r}get(r){return this.has(r)||this.set(r,this.createItem(r)),super.get(r)}}const j=e=>e&&typeof e=="object"&&typeof e.then=="function",S=(e,r)=>(...n)=>{c.runtime.lastError?e.reject(new Error(c.runtime.lastError.message)):r.singleCallbackArg||n.length<=1&&r.singleCallbackArg!==!1?e.resolve(n[0]):e.resolve(n)},f=e=>e==1?"argument":"arguments",B=(e,r)=>function(g,...a){if(a.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${f(r.minArgs)} for ${e}(), got ${a.length}`);if(a.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${f(r.maxArgs)} for ${e}(), got ${a.length}`);return new Promise((i,m)=>{if(r.fallbackToNoCallback)try{g[e](...a,S({resolve:i,reject:m},r))}catch(s){console.warn(`${e} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `,s),g[e](...a),r.fallbackToNoCallback=!1,r.noCallback=!0,i()}else r.noCallback?(g[e](...a),i()):g[e](...a,S({resolve:i,reject:m},r))})},L=(e,r,n)=>new Proxy(r,{apply(g,a,i){return n.call(a,e,...i)}});let b=Function.call.bind(Object.prototype.hasOwnProperty);const h=(e,r={},n={})=>{let g=Object.create(null),a={has(m,s){return s in e||s in g},get(m,s,A){if(s in g)return g[s];if(!(s in e))return;let t=e[s];if(typeof t=="function")if(typeof r[s]=="function")t=L(e,e[s],r[s]);else if(b(n,s)){let x=B(s,n[s]);t=L(e,e[s],x)}else t=t.bind(e);else if(typeof t=="object"&&t!==null&&(b(r,s)||b(n,s)))t=h(t,r[s],n[s]);else if(b(n,"*"))t=h(t,r[s],n["*"]);else return Object.defineProperty(g,s,{configurable:!0,enumerable:!0,get(){return e[s]},set(x){e[s]=x}}),t;return g[s]=t,t},set(m,s,A,t){return s in g?g[s]=A:e[s]=A,!0},defineProperty(m,s,A){return Reflect.defineProperty(g,s,A)},deleteProperty(m,s){return Reflect.deleteProperty(g,s)}},i=Object.create(e);return new Proxy(i,a)},k=e=>({addListener(r,n,...g){r.addListener(e.get(n),...g)},hasListener(r,n){return r.hasListener(e.get(n))},removeListener(r,n){r.removeListener(e.get(n))}}),W=new P(e=>typeof e!="function"?e:function(n){const g=h(n,{},{getContent:{minArgs:0,maxArgs:0}});e(g)}),M=new P(e=>typeof e!="function"?e:function(n,g,a){let i=!1,m,s=new Promise(u=>{m=function(o){i=!0,u(o)}}),A;try{A=e(n,g,m)}catch(u){A=Promise.reject(u)}const t=A!==!0&&j(A);if(A!==!0&&!t&&!i)return!1;const x=u=>{u.then(o=>{a(o)},o=>{let C;o&&(o instanceof Error||typeof o.message=="string")?C=o.message:C="An unexpected error occurred",a({__mozWebExtensionPolyfillReject__:!0,message:C})}).catch(o=>{console.error("Failed to send onMessage rejected reply",o)})};return x(t?A:s),!0}),D=({reject:e,resolve:r},n)=>{c.runtime.lastError?c.runtime.lastError.message===$?r():e(new Error(c.runtime.lastError.message)):n&&n.__mozWebExtensionPolyfillReject__?e(new Error(n.message)):r(n)},N=(e,r,n,...g)=>{if(g.length<r.minArgs)throw new Error(`Expected at least ${r.minArgs} ${f(r.minArgs)} for ${e}(), got ${g.length}`);if(g.length>r.maxArgs)throw new Error(`Expected at most ${r.maxArgs} ${f(r.maxArgs)} for ${e}(), got ${g.length}`);return new Promise((a,i)=>{const m=D.bind(null,{resolve:a,reject:i});g.push(m),n.sendMessage(...g)})},I={devtools:{network:{onRequestFinished:k(W)}},runtime:{onMessage:k(M),onMessageExternal:k(M),sendMessage:N.bind(null,"sendMessage",{minArgs:1,maxArgs:3})},tabs:{sendMessage:N.bind(null,"sendMessage",{minArgs:2,maxArgs:3})}},T={clear:{minArgs:1,maxArgs:1},get:{minArgs:1,maxArgs:1},set:{minArgs:1,maxArgs:1}};return y.privacy={network:{"*":T},services:{"*":T},websites:{"*":T}},h(c,I,y)};p.exports=_(chrome)}else p.exports=globalThis.browser})})(v);var w=v.exports;const F="top-right";
let creatingOffscreenPromise = null;
async function ensureOffscreenDocument() {
  if (typeof chrome === "undefined" || !chrome.offscreen) return;
  const offscreenUrl = "dist/offscreen/offscreen.html";
  if (typeof chrome.offscreen.hasDocument === "function") {
    if (await chrome.offscreen.hasDocument()) return;
  } else if (typeof chrome.runtime.getContexts === "function") {
    const contexts = await chrome.runtime.getContexts({
      contextTypes: ["OFFSCREEN_DOCUMENT"]
    }).catch(() => []);
    if (contexts && contexts.length > 0) return;
  }

  if (creatingOffscreenPromise) {
    await creatingOffscreenPromise;
    return;
  }

  creatingOffscreenPromise = chrome.offscreen.createDocument({
    url: offscreenUrl,
    reasons: ["DOM_PARSER", "WORKERS", "CLIPBOARD"],
    justification: "Local Tesseract OCR processing and clipboard handling with WebAssembly"
  });

  try {
    await creatingOffscreenPromise;
  } catch (err) {
    if (!String(err).includes("Only a single offscreen document may be created")) {
      throw err;
    }
  } finally {
    creatingOffscreenPromise = null;
  }
}

async function O(){const{widgetLocation:l}=await w.storage.local.get("widgetLocation");return l||F}
w.runtime.onMessage.addListener(async l=>{
  if(l.widgetLocation&&l.type==="update-location")return w.storage.local.set({widgetLocation:l.widgetLocation});
  if(l.type==="get-location")return O();
  if(l&&l.type==="prewarm-ocr"){
    try{
      await ensureOffscreenDocument();
      chrome.runtime.sendMessage({target:"offscreen",type:"prewarm-ocr"}).catch(()=>{});
      return{success:!0};
    }catch(err){
      return{success:!1};
    }
  }
  if(l&&l.type==="copy-to-clipboard"){
    try{
      await ensureOffscreenDocument();
      const res=await chrome.runtime.sendMessage({
        target:"offscreen",
        type:"copy-to-clipboard",
        text:l.text
      });
      return res||{success:!1};
    }catch(err){
      return{success:!1};
    }
  }
  if(l&&l.type==="do-ocr"){
    try{
      await ensureOffscreenDocument();
      const res=await chrome.runtime.sendMessage({
        target:"offscreen",
        type:"do-ocr",
        image:l.image
      });
      return res||{success:!1,error:"No response from offscreen document"};
    }catch(err){
      console.error("[Background OCR Error]",err);
      return{success:!1,error:(err&&err.message)||String(err)};
    }
  }
})})();
