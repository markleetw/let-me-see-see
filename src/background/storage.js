/**
 * Chrome Storage Helper for Floating Widget Position
 */

export const DEFAULT_LOCATION = "top-right";

export async function getWidgetLocation() {
  if (typeof chrome === "undefined" || !chrome.storage?.local) return DEFAULT_LOCATION;
  const { widgetLocation } = await chrome.storage.local.get("widgetLocation");
  return widgetLocation || DEFAULT_LOCATION;
}

export async function setWidgetLocation(location) {
  if (typeof chrome === "undefined" || !chrome.storage?.local) return;
  await chrome.storage.local.set({ widgetLocation: location });
}
