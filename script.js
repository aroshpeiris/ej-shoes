// ===== EDIT THESE DETAILS =====
const SHOP = {
  name: "EJ Shoes",
  whatsapp: "94XXXXXXXXX",          // country code + number, no + or spaces
  phone: "Add your phone number",
  address: "Add your shop address",
  hours: "Add your opening hours",
  mapsUrl: "https://maps.app.goo.gl/aCC7oVQ3DdD2i1SN9",
  facebookUrl: "https://www.facebook.com/profile.php?id=100069342180225"
};
const COLORS = { blue:"#2bb3e8", yellow:"#f5b82e", orange:"#f26b2d", red:"#e8453c", green:"#3ec65a" };
// SAMPLE products and prices (Rs.). Replace with your real stock.
const PRODUCTS = [
  { name:"Runner Classic",  price:8500,  sizes:[4,12], colors:["blue","red","yellow"],   desc:"Light everyday runner with a soft, cushioned sole." },
  { name:"Court Low",       price:9800,  sizes:[5,11], colors:["red","green"],           desc:"Clean low-top for school, work and weekends." },
  { name:"Trail Master",    price:12500, sizes:[6,12], colors:["orange","blue"],         desc:"Grippy sole built for rough roads and wet days." },
  { name:"Street Hi",       price:11000, sizes:[4,10], colors:["yellow","red","blue"],   desc:"High-top style with extra ankle support." },
  { name:"Daily Walk",      price:6500,  sizes:[3,12], colors:["green","blue"],          desc:"Easy slip-on comfort for long days on your feet." },
  { name:"Kids Sprint",     price:5200,  sizes:[3,6],  colors:["orange","green","red"],  desc:"Flexible, durable shoes for growing feet." },
  { name:"School Pro",      price:4800,  sizes:[3,9],  colors:["blue"],                  desc:"Hard-wearing shoes for the whole school year." },
  { name:"Sport Flex",      price:13800, sizes:[5,12], colors:["red","orange","yellow"], desc:"Breathable trainer for gym, court and track." }
];
const FEATURED = [ {i:1, bg:"#2bb3e8"}, {i:2, bg:"#6a67a8"}, {i:3, bg:"#09939a"} ];
// ==============================

const $ = (s) => document.querySelector(s);
const rs = (n) => "Rs. " + n.toLocaleString("en-US");
const wa = (m) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(m)}`;
const shoe = (c) => `<svg class="shoe" viewBox="0 0 300 140" style="color:${c}" aria-hidden="true"><use href="#shoe"/></svg>`;
const range = ([a, b]) => Array.from({ length: b - a + 1 }, (_, k) => a + k);

// Hero
let hp = PRODUCTS[0], hSize = null, hColor = hp.colors[0];
function renderHero() {
  $("#heroShoe").innerHTML = shoe(COLORS[hColor]);
  const msg = `Hi ${SHOP.name}, I want the ${hp.name} in ${hColor}` + (hSize ? `, UK size ${hSize}.` : ".");
  $("#heroInfo").innerHTML = `
    <h1>${hp.name}</h1><p class="price">${rs(hp.price)}</p><p class="desc">${hp.desc}</p>
    <h2>UK size</h2>
    <div class="sizes">${range(hp.sizes).map(s => `<button type="button" data-size="${s}" aria-pressed="${s === hSize}">${s}</button>`).join("")}</div>
    <h2>Colour</h2>
    <div class="dots">${hp.colors.map(c => `<button type="button" data-color="${c}" aria-label="${c}" aria-pressed="${c === hColor}" style="background:${COLORS[c]}"></button>`).join("")}</div>
    <a class="buy" href="${wa(msg)}">Order on WhatsApp</a>`;
}
$("#heroInfo").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.dataset.size) hSize = +b.dataset.size;
  if (b.dataset.color) hColor = b.dataset.color;
  renderHero();
});

// Featured cards
$("#featCards").innerHTML = FEATURED.map(({ i, bg }) => {
  const p = PRODUCTS[i];
  return `<article class="fcard" style="background:${bg}">
    <div class="top2"><span>${SHOP.name}</span><span>${rs(p.price)}</span></div>
    <h3>${p.name}</h3><p>${p.desc}</p>
    <span class="word" aria-hidden="true">${p.name.split(" ")[0].toUpperCase()}</span>
    ${shoe("#fff")}
    <a class="cbuy" href="${wa(`Hi ${SHOP.name}, I want the ${p.name}.`)}">Buy</a></article>`;
}).join("");

// Filters + grid
const f = { size: 2, max: 15000, color: null };
function renderGrid() {
  $("#oSize").textContent = f.size === 2 ? "Any" : f.size;
  $("#oPrice").textContent = rs(f.max);
  const list = PRODUCTS.map((p, i) => ({ p, i })).filter(({ p }) =>
    (f.size === 2 || (f.size >= p.sizes[0] && f.size <= p.sizes[1])) &&
    p.price <= f.max && (!f.color || p.colors.includes(f.color)));
  $("#grid").innerHTML = list.map(({ p, i }) => `
    <article class="pcard">
      <button type="button" class="pview" data-i="${i}" aria-label="Preview ${p.name}">${shoe(COLORS[p.colors[0]])}<h3>${p.name}</h3></button>
      <p class="price">${rs(p.price)}</p>
      <a class="cbuy" href="${wa(`Hi ${SHOP.name}, I want the ${p.name}` + (f.size > 2 ? `, UK size ${f.size}.` : "."))}">Buy</a>
    </article>`).join("");
  $("#empty").hidden = list.length > 0;
}
$("#fSize").addEventListener("input", (e) => { f.size = +e.target.value; renderGrid(); });
$("#fPrice").addEventListener("input", (e) => { f.max = +e.target.value; renderGrid(); });
$("#fColors").innerHTML = Object.keys(COLORS).map(c => `<button type="button" data-c="${c}" aria-label="${c}" aria-pressed="false" style="background:${COLORS[c]}"></button>`).join("");
$("#fColors").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  f.color = f.color === b.dataset.c ? null : b.dataset.c;
  document.querySelectorAll("#fColors button").forEach(x => x.setAttribute("aria-pressed", String(x.dataset.c === f.color)));
  renderGrid();
});
$("#grid").addEventListener("click", (e) => {
  const b = e.target.closest(".pview"); if (!b) return;
  hp = PRODUCTS[+b.dataset.i]; hSize = null; hColor = hp.colors[0];
  renderHero(); window.scrollTo({ top: 0, behavior: "smooth" });
});

// Contact details
$("#chatLink").href = $("#chatLink2").href = wa(`Hi ${SHOP.name}, I have a question.`);
$("#addr").textContent = SHOP.address; $("#hours").textContent = SHOP.hours; $("#phone").textContent = SHOP.phone;
$("#mapLink").href = SHOP.mapsUrl; $("#fbLink").href = SHOP.facebookUrl;
$("#year").textContent = new Date().getFullYear();

renderHero(); renderGrid();
