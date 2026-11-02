const ROOT = new URL("../../", import.meta.url);
const P = new URL("assets/story-sources/", ROOT).href;
const S = new URL("assets/story-sources/sites/", ROOT).href;

const lebaraPhone = `
<div style="font-family:Inter;height:100%;background:#f4f7fb">
 <div style="background:#0a7ae0;color:#fff;padding:26px 16px 14px;display:flex;justify-content:space-between;align-items:center">
  <b style="font-size:15px;letter-spacing:.14em">LEBARA</b><span style="font-size:11px;opacity:.9">My account</span></div>
 <div style="padding:14px 14px 0">
  <div style="font-size:11px;color:#64748b;margin-bottom:6px">Your plans</div>
  <div style="background:#fff;border-radius:12px;padding:12px;box-shadow:0 4px 14px rgba(15,23,42,.08)">
   <div style="font-weight:600;font-size:13px;color:#0f172a">Unlimited Data Plan</div>
   <div style="font-size:10px;color:#64748b;margin:2px 0 10px">Renews in 21 days · 30-day plan</div>
   <div style="display:flex;justify-content:space-between;font-size:10px;color:#334155"><span>Data</span><b>62.4 GB of 100 GB</b></div>
   <div style="height:7px;background:#e2e8f0;border-radius:4px;margin:5px 0 10px"><div style="width:62%;height:100%;background:#0a7ae0;border-radius:4px"></div></div>
   <div style="display:flex;justify-content:space-between;font-size:10px;color:#334155;padding:6px 0;border-top:1px solid #eef2f7"><span>UK minutes</span><b>Unlimited</b></div>
   <div style="display:flex;justify-content:space-between;font-size:10px;color:#334155;padding:6px 0;border-top:1px solid #eef2f7"><span>UK texts</span><b>Unlimited</b></div>
   <div style="display:flex;justify-content:space-between;font-size:10px;color:#334155;padding:6px 0;border-top:1px solid #eef2f7"><span>International minutes</span><b>100 of 100</b></div>
  </div>
  <div style="margin-top:12px;background:#fff;border-radius:12px;padding:12px;box-shadow:0 4px 14px rgba(15,23,42,.08);display:flex;justify-content:space-between;align-items:center">
   <div><div style="font-size:10px;color:#64748b">Balance</div><div style="font-weight:700;font-size:16px;color:#0f172a">£12.50</div></div>
   <div style="background:#e6007e;color:#fff;font-size:11px;font-weight:600;padding:8px 14px;border-radius:999px">Top up</div>
  </div>
 </div>
 <div style="position:absolute;left:0;right:0;bottom:0;background:#fff;border-top:1px solid #e2e8f0;display:flex;justify-content:space-around;padding:10px 0 16px;font-size:9px;color:#64748b">
  <span style="color:#0a7ae0;font-weight:600">Home</span><span>Plans</span><span style="width:34px;height:34px;border-radius:50%;background:#e6007e;margin-top:-22px;display:grid;place-items:center;color:#fff;font-size:18px">+</span><span>Shop</span><span>Help</span></div>
</div>`;

const lebaraWeb = `
<div style="font-family:Inter;height:100%;background:#f4f7fb;display:grid;grid-template-columns:150px 1fr">
 <div style="background:#0b1f3a;color:#cbd5e1;padding:16px 14px;font-size:11px">
  <b style="display:block;color:#fff;letter-spacing:.14em;font-size:12px;margin-bottom:16px">LEBARA</b>
  <div style="padding:7px 8px;background:rgba(255,255,255,.1);border-radius:6px;color:#fff">Dashboard</div>
  <div style="padding:7px 8px">Plans</div><div style="padding:7px 8px">Usage</div><div style="padding:7px 8px">Top up</div><div style="padding:7px 8px">Orders</div><div style="padding:7px 8px">Support</div>
 </div>
 <div style="padding:16px 18px">
  <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px"><b style="font-size:13px;color:#0f172a">Account dashboard</b><span style="font-size:10px;color:#64748b">DE · UK · NL · DK · FR</span></div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:10px">
   <div style="background:#fff;border-radius:10px;padding:10px;box-shadow:0 2px 10px rgba(15,23,42,.06)"><div style="font-size:9px;color:#64748b">Active plan</div><b style="font-size:13px;color:#0f172a">Unlimited 100 GB</b></div>
   <div style="background:#fff;border-radius:10px;padding:10px;box-shadow:0 2px 10px rgba(15,23,42,.06)"><div style="font-size:9px;color:#64748b">Balance</div><b style="font-size:13px;color:#0f172a">£12.50</b></div>
   <div style="background:#fff;border-radius:10px;padding:10px;box-shadow:0 2px 10px rgba(15,23,42,.06)"><div style="font-size:9px;color:#64748b">Renews</div><b style="font-size:13px;color:#0f172a">21 days</b></div>
  </div>
  <div style="display:grid;grid-template-columns:1.4fr 1fr;gap:10px">
   <div style="background:#fff;border-radius:10px;padding:12px;box-shadow:0 2px 10px rgba(15,23,42,.06)"><div style="font-size:10px;color:#0f172a;font-weight:600;margin-bottom:8px">Usage this month</div>
    <div style="display:flex;align-items:flex-end;gap:5px;height:70px">${[30,45,38,60,52,70,64,80,58,74,66,88,72,90].map(v=>`<i style="flex:1;display:block;height:${v}%;background:#0a7ae0;border-radius:2px 2px 0 0;opacity:.85"></i>`).join('')}</div></div>
   <div style="background:#fff;border-radius:10px;padding:12px;box-shadow:0 2px 10px rgba(15,23,42,.06)"><div style="font-size:10px;color:#0f172a;font-weight:600;margin-bottom:8px">Add-ons</div>
    <div style="font-size:10px;color:#334155;padding:5px 0;border-bottom:1px solid #eef2f7;display:flex;justify-content:space-between"><span>EU roaming</span><b style="color:#16a34a">On</b></div>
    <div style="font-size:10px;color:#334155;padding:5px 0;border-bottom:1px solid #eef2f7;display:flex;justify-content:space-between"><span>Intl minutes</span><b>100</b></div>
    <div style="margin-top:8px;background:#e6007e;color:#fff;text-align:center;font-size:10px;font-weight:600;padding:7px;border-radius:999px">Top up</div></div>
  </div>
 </div>
</div>`;

const lebaraSchem = `
<h4>API layer · what I built</h4>
<div class="row">
 <div class="box"><small>Redis cache</small><strong>7–10 s → &lt;3 s</strong><span style="color:#a1a1aa">dashboard data load</span></div>
 <div class="box"><small>Rate limiter</small><strong>Brute force</strong><span style="color:#a1a1aa">blocked · reCAPTCHA v3</span></div>
</div>
<div class="row">
 <div class="box"><small>App Insights</small><strong>Errors ranked</strong><span style="color:#a1a1aa">by frequency, fixed first</span></div>
 <div class="box"><small>Scale</small><strong>4M+ users</strong><span style="color:#a1a1aa">5 countries · spikes of millions</span></div>
</div>`;

export const projects = [
 {
  slug: "aqari", part: "PART-002", fig: "GOVERNMENT PORTAL",
  name: "Aqari", sub: "ADRES Sharjah · real-estate digital services",
  desc: "Government real-estate portal with 29 workflows across web, iOS, and Android. 20 workflows built from scratch, native webviews, event tracking, and Jest.",
  modules: ["Tenancy contracts", "Request tracking", "Power of attorney", "Native webviews", "Event tracking"],
  attrs: ["Web + iOS + Android", "29 workflows", "Arabic / English", "Analytics layer"],
  stack: ["Next.js 14", "React 18", "TypeScript", "Redux Toolkit", "Material UI", "GA4", "Jest"],
  wins: [
   { src: P+"aqari/home-page.png", nat: 1676, crop: {x:0,y:48,w:1676,h:900}, w: 880, x: 520, y: 210, url: "aqari.ds.sharjah.ae", z: 1,
     blur: [{x:300,y:106,w:440,h:38,bg:"#117763"},{x:455,y:700,w:150,h:26},{x:1150,y:700,w:150,h:26}] },
   { src: P+"aqari/Application-Tracking.png", nat: 1581, crop: {x:0,y:45,w:1581,h:920}, w: 520, x: 440, y: 560, url: "activity tracking", z: 3,
     blur: [{x:335,y:505,w:390,h:22},{x:335,y:597,w:390,h:22},{x:335,y:690,w:130,h:22}] },
   { src: P+"aqari/Application-Editor.png", nat: 1169, crop: {x:0,y:45,w:1169,h:960}, w: 430, x: 1120, y: 520, url: "tenancy contract", z: 2,
     blur: [{x:470,y:390,w:620,h:70}] },
  ],
 },
 {
  slug: "lebara", part: "PART-003", fig: "TELECOM PLATFORM",
  name: "Lebara", sub: "Telecom platform · 4M+ users · 5 countries",
  desc: "Self-service telecom platform for Germany, the UK, the Netherlands, Denmark, and France. Full-stack features, Redis caching, and a brute-force rate limiter. Screens shown are illustrative.",
  modules: ["Account dashboard", "Plans &amp; top-up", "Usage &amp; add-ons", "Redis caching", "Rate limiting"],
  attrs: ["4M+ users", "5 countries", "Millions of req / s", "Azure App Insights"],
  stack: ["React", "Redux", "GraphQL", "Node.js", "TypeScript", "Redis", "Adyen"],
  wins: [
   { kind: "winhtml", html: lebaraWeb, w: 820, h: 420, x: 520, y: 210, url: "my.lebara · dashboard", z: 1, bg: "#f4f7fb" },
   { kind: "phonehtml", html: lebaraPhone, w: 230, h: 470, x: 1300, y: 330, z: 4, bg: "#f4f7fb" },
   { kind: "schem", html: lebaraSchem, w: 560, x: 460, y: 640, z: 3 },
  ],
 },
 {
  slug: "mega", part: "PART-004", fig: "CONTACT-CENTER SAAS",
  name: "Mega Cloud", sub: "Afiniti · contact-center product on microservices",
  desc: "Self-serve contact-center platform. I led billing, auto-configuration, and storefront end to end: APIs, data design, and their front-ends.",
  modules: ["Auto configuration", "Billing &amp; payments", "Storefront", "White-labelling", "Phone numbers"],
  attrs: ["Setup 5 min → under 1", "Coverage 0% → 80%", "3 microservices", "Team of four"],
  stack: ["NestJS", "Next.js", "PostgreSQL", "TypeORM", "TypeScript", "Material UI", "Stripe"],
  wins: [
   { src: P+"mega%20cloud/IMG_7352.png", nat: 1170, crop: {x:48,y:1124,w:1077,h:489}, w: 880, x: 520, y: 210, url: "onboarding · auto setup", z: 1 },
   { src: P+"mega%20cloud/IMG_7352.png", nat: 1170, crop: {x:48,y:1873,w:1077,h:432}, w: 520, x: 440, y: 560, url: "branding", z: 3 },
   { src: P+"mega%20cloud/IMG_7352.png", nat: 1170, crop: {x:48,y:472,w:1077,h:455}, w: 430, x: 1120, y: 520, url: "billing · payment methods", z: 2 },
  ],
 },
 {
  slug: "zerodocs", part: "PART-005", fig: "DOCUMENT SAAS",
  name: "Zerodocs", sub: "Construction document collaboration",
  desc: "Project specs, document management, and controlled sharing for construction teams. Built from scratch and shipped to production as the sole developer.",
  modules: ["Projects &amp; deadlines", "Specs uploader", "Bulk uploads to S3", "Controlled sharing", "Chat &amp; notifications"],
  attrs: ["Sole developer", "Built from scratch", "Production owner", "AWS S3 uploads"],
  stack: ["React", "TypeScript", "AWS S3", "Bootstrap", "react-dropzone"],
  wins: [
   { src: P+"zerodocs/IMG_7351.png", nat: 1170, crop: {x:48,y:527,w:1077,h:497}, w: 880, x: 520, y: 210, url: "zerodocs · projects", z: 1 },
   { src: P+"zerodocs/IMG_7351.png", nat: 1170, crop: {x:48,y:1911,w:1077,h:496}, w: 520, x: 440, y: 560, url: "share project", z: 3 },
   { src: P+"zerodocs/IMG_7351.png", nat: 1170, crop: {x:48,y:1226,w:1077,h:491}, w: 430, x: 1120, y: 520, url: "specs uploader", z: 2 },
  ],
 },
 {
  slug: "educative", part: "PART-006", fig: "LEARNING PLATFORM",
  name: "Educative.io", sub: "Interactive learning for 1M+ developers",
  desc: "Full-stack work on the core platform: server-side rendering, caching, and SEO that lifted Lighthouse above 80 on every metric, plus the React-to-Next.js migration.",
  modules: ["Server-side rendering", "Page caching", "SEO structured data", "Accessibility", "React → Next.js"],
  attrs: ["Lighthouse 80+", "1M+ developers", "80% test coverage", "SSR + caching"],
  stack: ["Next.js", "React", "Material UI", "Redux", "TypeScript", "Jest"],
  wins: [
   { src: S+"educative-home.png", nat: 2880, crop: {x:0,y:80,w:2880,h:1500}, w: 880, x: 520, y: 210, url: "educative.io", z: 1 },
   { src: S+"educative-courses.png", nat: 2880, crop: {x:0,y:80,w:2880,h:1250}, w: 520, x: 440, y: 560, url: "courses", z: 3 },
   { kind: "phone", src: S+"educative-mobile.png", nat: 860, crop: {x:0,y:80,w:860,h:1700}, w: 224, x: 1290, y: 330, z: 4 },
  ],
 },
];
