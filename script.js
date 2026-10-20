// ===== EDIT THESE DETAILS =====
const SHOP = {
  name: "EJ Shoes",
  whatsapp: "94XXXXXXXXX",            // country code + number, no + or spaces (Sri Lanka = 94)
  phone: "Add your phone number",
  address: "Add your shop address",
  hours: "Add your opening hours",
  mapsUrl: "https://maps.app.goo.gl/aCC7oVQ3DdD2i1SN9",
  facebookUrl: "https://www.facebook.com/profile.php?id=100069342180225"
};
const CATEGORIES = [
  { name: "Men",    text: "Casual, formal and everyday shoes." },
  { name: "Women",  text: "Sandals, flats and everyday pairs." },
  { name: "Kids",   text: "Comfortable shoes for growing feet." },
  { name: "School", text: "Hard-wearing shoes for the school year." },
  { name: "Sports", text: "Trainers and sports shoes." }
];
const SIZES = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
// ==============================

const wa = (msg) => `https://wa.me/${SHOP.whatsapp}?text=${encodeURIComponent(msg)}`;

// Size ruler
const sizesEl = document.getElementById("sizes");
const sizeLink = document.getElementById("sizeLink");
let size = null;

SIZES.forEach((s) => {
  const b = document.createElement("button");
  b.type = "button";
  b.textContent = s;
  b.setAttribute("aria-pressed", "false");
  b.setAttribute("aria-label", `UK size ${s}`);
  b.addEventListener("click", () => {
    size = s;
    sizesEl.querySelectorAll("button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    sizeLink.textContent = `Ask about size ${s} on WhatsApp`;
    sizeLink.href = wa(`Hi ${SHOP.name}, do you have shoes in UK size ${s}?`);
  });
  sizesEl.appendChild(b);
});
sizeLink.href = wa(`Hi ${SHOP.name}, I'm looking for a pair of shoes.`);

// Categories
const catsEl = document.getElementById("cats");
CATEGORIES.forEach((c) => {
  const d = document.createElement("div");
  d.className = "card";
  const msg = size
    ? `Hi ${SHOP.name}, what ${c.name.toLowerCase()} shoes do you have in size ${size}?`
    : `Hi ${SHOP.name}, what ${c.name.toLowerCase()} shoes do you have?`;
  d.innerHTML = `<h3>${c.name}</h3><p>${c.text}</p><a href="${wa(msg)}">Ask about ${c.name.toLowerCase()} shoes</a>`;
  catsEl.appendChild(d);
});

// Visit details
document.getElementById("addr").textContent = SHOP.address;
document.getElementById("phone").textContent = SHOP.phone;
document.getElementById("hours").textContent = SHOP.hours;
document.getElementById("mapLink").href = SHOP.mapsUrl;
document.getElementById("fbLink").href = SHOP.facebookUrl;
document.getElementById("year").textContent = new Date().getFullYear();
