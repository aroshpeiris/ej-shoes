// ===== EDIT YOUR SHOP DETAILS HERE =====
const SHOP = {
  name: "EJ Shoes",
  whatsapp: "94XXXXXXXXX",           // 94 + number, no + or spaces
  phone: "Phone: add your number",
  address: "Address: add your shop address",
  hours: "Hours: add your opening hours",
  mapsUrl: "https://maps.app.goo.gl/aCC7oVQ3DdD2i1SN9",
  facebookUrl: "https://www.facebook.com/profile.php?id=100069342180225"
};
const COLORS = { Blue:"#1fa8e0", Yellow:"#f2c230", Orange:"#f26b2a", Red:"#e63946", Purple:"#a23fc4", Green:"#3ac569" };
// SAMPLE products. Replace name, price (Rs), sizes [min,max] and img (e.g. "images/shoe1.jpg") with real ones.
const PRODUCTS = [
  {name:"Urban Runner",price:9500,color:"Blue",sizes:[6,11],img:""},
  {name:"City Classic",price:12500,color:"Purple",sizes:[5,10],img:""},
  {name:"Kids Sprint",price:6500,color:"Green",sizes:[2,6],img:""},
  {name:"Everyday Slip-on",price:5500,color:"Yellow",sizes:[5,11],img:""},
  {name:"Street Hi-Top",price:15900,color:"Red",sizes:[6,12],img:""},
  {name:"Lite Trainer",price:8900,color:"Orange",sizes:[5,10],img:""},
  {name:"School Black",price:4500,color:"Blue",sizes:[3,9],img:""},
  {name:"Court Low",price:11900,color:"Green",sizes:[6,11],img:""},
  {name:"Trail Grip",price:14500,color:"Orange",sizes:[6,12],img:""},
  {name:"Casual Canvas",price:5900,color:"Yellow",sizes:[4,10],img:""},
  {name:"Sunset Runner",price:10900,color:"Red",sizes:[5,11],img:""},
  {name:"Night Walker",price:13500,color:"Purple",sizes:[6,11],img:""}
];
const PICKS = [
  {p:PRODUCTS[0],bg:"#1fa8e0",word:"RUN",text:"Light daily trainers for work and weekends."},
  {p:PRODUCTS[1],bg:"#6a65a8",word:"CITY",text:"Smart casual shoes that go with everything."},
  {p:PRODUCTS[2],bg:"#0a9396",word:"KIDS",text:"Comfortable shoes for growing feet."}
];
const PER_PAGE = 8;
// =======================================

const $ = (id) => document.getElementById(id);
const rs = (n) => "Rs " + n.toLocaleString("en-US");
const wa = (m) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(m)}`;
const shoe = (c, img) => img ? `<img src="${img}" alt="">` : `<svg class="shoe" viewBox="0 0 200 100" style="--c:${COLORS[c]}" role="img" aria-label="Shoe"><use href="#shoe"/></svg>`;
const dot = (name, on) => `<button type="button" style="--c:${COLORS[name]}" data-c="${name}" aria-label="${name}" aria-pressed="${on}"></button>`;

/* Hero */
const hero = { p: PRODUCTS[0], size: 8, color: PRODUCTS[0].color };
function renderHero() {
  const { p, size, color } = hero;
  $("heroShoe").innerHTML = shoe(color, p.img);
  $("heroName").textContent = p.name;
  $("heroPrice").textContent = rs(p.price);
  $("heroSizes").innerHTML = [6,7,8,9,10].map(s => `<button type="button" data-s="${s}" aria-pressed="${s===size}">${s}</button>`).join("");
  $("heroColors").innerHTML = Object.keys(COLORS).map(c => dot(c, c===color)).join("");
  $("thumbs").innerHTML = Object.keys(COLORS).slice(0,4).map(c => `<button type="button" data-c="${c}" aria-label="${c} view" aria-pressed="${c===color}">${shoe(c, p.img)}</button>`).join("");
  $("heroBuy").href = wa(`Hi ${SHOP.name}, I want the ${p.name} (${color}) in UK size ${size}.`);
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  if (b.closest("#heroSizes")) { hero.size = +b.dataset.s; renderHero(); }
  else if (b.closest("#heroColors") || b.closest("#thumbs")) { hero.color = b.dataset.c; renderHero(); }
});

/* Top picks */
$("picks").innerHTML = PICKS.map(({p,bg,word,text}) => `
  <article class="pick" style="background:${bg}">
    <div class="ghost2" aria-hidden="true">${word}</div>
    <div class="pp"><span>${SHOP.name}</span><span>${rs(p.price)}</span></div>
    <h3>${p.name}</h3><p>${text}</p>
    <div class="ps">${shoe(p.color, p.img)}</div>
    <a href="${wa(`Hi ${SHOP.name}, I'm interested in the ${p.name}.`)}">Order</a>
  </article>`).join("");

/* Shop: filters + grid + pager */
const f = { size: 2, price: 20000, color: null, page: 1 };
$("fColors").innerHTML = Object.keys(COLORS).map(c => dot(c, false)).join("");
$("fColors").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b) return;
  f.color = f.color === b.dataset.c ? null : b.dataset.c; f.page = 1;
  $("fColors").querySelectorAll("button").forEach(x => x.setAttribute("aria-pressed", String(x.dataset.c === f.color)));
  renderShop();
});
$("fSize").addEventListener("input", (e) => { f.size = +e.target.value; f.page = 1; renderShop(); });
$("fPrice").addEventListener("input", (e) => { f.price = +e.target.value; f.page = 1; renderShop(); });

function renderShop() {
  $("oSize").textContent = f.size === 2 ? "Any" : "UK " + f.size;
  $("oPrice").textContent = "Up to " + rs(f.price);
  const list = PRODUCTS.filter(p => p.price <= f.price && (!f.color || p.color === f.color) && (f.size === 2 || (f.size >= p.sizes[0] && f.size <= p.sizes[1])));
  const pages = Math.max(1, Math.ceil(list.length / PER_PAGE));
  f.page = Math.min(f.page, pages);
  const show = list.slice((f.page - 1) * PER_PAGE, f.page * PER_PAGE);
  $("none").hidden = list.length > 0;
  $("grid").innerHTML = show.map(p => `
    <article class="item">
      <div class="ish">${shoe(p.color, p.img)}</div>
      <div><h3>${p.name}</h3><p class="ip">${rs(p.price)}</p>
      <div class="iact"><a href="${wa(`Hi ${SHOP.name}, I'm interested in the ${p.name} (${p.color})${f.size>2?`, UK size ${f.size}`:""}.`)}">Order</a></div></div>
    </article>`).join("");
  let h = `<button type="button" data-g="${f.page-1}" aria-label="Previous page" ${f.page===1?"disabled":""}>‹</button>`;
  for (let i = 1; i <= pages; i++) h += `<button type="button" data-g="${i}" ${i===f.page?'aria-current="page"':""}>${i}</button>`;
  h += `<button type="button" data-g="${f.page+1}" aria-label="Next page" ${f.page===pages?"disabled":""}>›</button>`;
  $("pager").innerHTML = pages > 1 ? h : "";
}
$("pager").addEventListener("click", (e) => {
  const b = e.target.closest("button"); if (!b || b.disabled) return;
  f.page = +b.dataset.g; renderShop(); $("shop").scrollIntoView();
});

/* Footer */
$("addr").textContent = SHOP.address; $("phone").textContent = SHOP.phone; $("hours").textContent = SHOP.hours;
$("waLink").href = wa(`Hi ${SHOP.name}!`); $("mapLink").href = SHOP.mapsUrl; $("fbLink").href = SHOP.facebookUrl;
$("year").textContent = new Date().getFullYear();

renderHero(); renderShop();
