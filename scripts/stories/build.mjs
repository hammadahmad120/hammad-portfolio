import { spawn } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { projects } from "./data.mjs";
// Renders public/stories/<slug>.webp from template.html + data.mjs with headless
// Chrome. Usage: node scripts/stories/build.mjs [slug]. Needs google-chrome and the
// raw screenshots in assets/story-sources/ (gitignored).
import { fileURLToPath } from "node:url";
import { mkdtempSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
const here = fileURLToPath(new URL(".", import.meta.url));
const out = fileURLToPath(new URL("../../public/stories/", import.meta.url));
const work = mkdtempSync(join(tmpdir(), "stories-"));
const fonts = fileURLToPath(new URL("../../app/fonts/", import.meta.url));
const tpl = readFileSync(`${here}/template.html`, "utf8").replaceAll("../../app/fonts/", `file://${fonts}`);
const only = process.argv[2];
const port = 9336;
const chrome = spawn("google-chrome", ["--headless=new","--no-sandbox","--disable-gpu","--hide-scrollbars","--allow-file-access-from-files",`--remote-debugging-port=${port}`,`--user-data-dir=${work}/profile`,"about:blank"], { stdio: "ignore" });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let wsUrl; for (let i=0;i<50;i++){ try { const l = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json(); const p=l.find(t=>t.type==="page"); if(p){wsUrl=p.webSocketDebuggerUrl;break;} } catch{} await sleep(200); }
const ws = new WebSocket(wsUrl); await new Promise(r=>ws.onopen=r);
let id=0; const pending=new Map(); ws.onmessage=e=>{const m=JSON.parse(e.data); if(m.id&&pending.has(m.id)){pending.get(m.id)(m);pending.delete(m.id);}};
const send=(method,params={})=>new Promise(r=>{const i=++id;pending.set(i,r);ws.send(JSON.stringify({id:i,method,params}));});
await send("Page.enable");
await send("Emulation.setDeviceMetricsOverride",{width:1600,height:1000,deviceScaleFactor:2,mobile:false});
for (const p of projects) {
  if (only && p.slug !== only) continue;
  const html = tpl.replace("<script>", `<script>window.__DATA__=${JSON.stringify(p)};</script><script>`);
  writeFileSync(`${work}/${p.slug}.html`, html);
  await send("Page.navigate",{url:`file://${work}/${p.slug}.html`}); await sleep(3500);
  const { result } = await send("Page.captureScreenshot",{format:"webp",quality:88});
  writeFileSync(`${out}${p.slug}.webp`, Buffer.from(result.data,"base64"));
  console.log(p.slug, "ok", result.data.length);
}
ws.close(); chrome.kill();
