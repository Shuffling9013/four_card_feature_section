import { devices, chromium } from "playwright";

type DeviceName = keyof {
  [K in keyof typeof devices as string extends K ? never : K]: unknown;
};

const names: DeviceName[] = [
  "iPhone 6",
  "iPhone 8 Plus",
  "iPad Mini",
  "iPad Pro 11",
  "Desktop Chrome",
  "Desktop Chrome HiDPI",
];

const browser = await chromium.connect("ws://0.0.0.0:4000");

const screenshot = async (name: DeviceName) => {
  const context = await browser.newContext(devices[name]);
  const page = await context.newPage();
  await page.goto("http://0.0.0.0:3000");
  await page.screenshot({
    path: `docs/${String(name).replaceAll(" ", "_")}.jpg`,
    fullPage: true,
  });
};

await Promise.all(names.map(screenshot));
await browser.close();
