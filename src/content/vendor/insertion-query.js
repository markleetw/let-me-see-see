/**
 * Insertion Query - watches for DOM elements matching a CSS selector
 * using animationstart events.
 */
let animCount = 100;
let isSupported = false;
let animProp = "animationName";
let prefix = "";
const prefixes = ["Webkit", "Moz", "O", "ms", "Khtml"];

const testDiv = document.createElement("div");
if (testDiv.style.animationName !== undefined) {
  isSupported = true;
}
if (!isSupported) {
  for (let i = 0; i < prefixes.length; i++) {
    if (testDiv.style[prefixes[i] + "AnimationName"] !== undefined) {
      prefix = prefixes[i];
      animProp = prefix + "AnimationName";
      prefix = "-" + prefix.toLowerCase() + "-";
      isSupported = true;
      break;
    }
  }
}

export default function insertionQuery(selector) {
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
