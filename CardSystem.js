const path = window.location.pathname;
const isMarket = path.includes("Market.html");
const isFavorite = path.includes("Favorite.html");
const isDeck = path.includes("My-Deck.html");

let cards = [];

if (isMarket) {
  cards = [
    { name: "Lunara", rarity: "Legendary", atk: 1250, def: 700, description: "A sorceress of moonlight who commands shadows and dreams.", price: 960, bg: "img/L01.png" },
    { name: "Drakar", rarity: "Mythic", atk: 9800, def: 5000, description: "A dragon forged in cosmic fire, guardian of the stars.", price: 1150, bg: "img/M01.png" },
    { name: "Ignis", rarity: "Epic", atk: 1100, def: 650, description: "A blazing warrior who draws strength from living flame.", price: 860, bg: "img/E01.png" },
    { name: "Sylvan", rarity: "Rare", atk: 850, def: 500, description: "A spirit of the forest who bends nature to its will.", price: 540, bg: "img/R01.png" },
    { name: "Fae", rarity: "Common", atk: 500, def: 300, description: "A playful creature of light that dances through dreams.", price: 300, bg: "img/C01.png" },
    { name: "Astrael", rarity: "Legendary", atk: 1320, def: 720, description: "A celestial guardian who weaves starlight into powerful shields.", price: 990, bg: "img/L02.png" },
    { name: "Vornak", rarity: "Mythic", atk: 9850, def: 1000, description: "A dark titan of the underrealm who feeds on the souls of fallen heroes.", price: 1190, bg: "img/M02.png" },
    { name: "Elaris", rarity: "Epic", atk: 1000, def: 640, description: "An elemental archer whose arrows split the sky like lightning.", price: 830, bg: "img/E02.png" },
    { name: "Rynor", rarity: "Rare", atk: 900, def: 550, description: "A fierce warrior of the northern tribes, fearless in battle.", price: 560, bg: "img/R02.png" },
    { name: "Tindra", rarity: "Common", atk: 480, def: 320, description: "A forest sprite who brings good fortune to travelers.", price: 290, bg: "img/C02.png" },
    { name: "Zephyra", rarity: "Epic", atk: 1080, def: 660, description: "A sky dancer who moves with the wind, swift and untouchable.", price: 870, bg: "img/E03.png" },
    { name: "Korin", rarity: "Rare", atk: 870, def: 530, description: "A rogue swordsman who fights for gold, not glory.", price: 550, bg: "img/R3.png" },
    { name: "Nyxa", rarity: "Common", atk: 520, def: 340, description: "A mischievous imp who delights in causing harmless chaos.", price: 310, bg: "img/C03.png" }
  ];
} else if (isFavorite) {
  cards = JSON.parse(localStorage.getItem("favorites")) || [];
} else if (isDeck) {
  cards = JSON.parse(localStorage.getItem("deck")) || [];
}

let currentPage = 1;
const cardsPerPage = 9;
let filteredCards = [];

function getRarityColor(rarity) {
  switch (rarity) {
    case "Mythic": return "#FFD700";
    case "Legendary": return "#FF6B00";
    case "Epic": return "#A020F0";
    case "Rare": return "#00FF99";
    case "Common": return "#A0A0A0";
    default: return "#FFFFFF";
  }
}

function displayCards(cardList) {
  const container = document.querySelector(".Card-Container");
  if (!container) return;
  container.innerHTML = "";
  if (!cardList || cardList.length === 0) {
    container.innerHTML = `<p class="text-center text-gray-400 text-xl col-span-3">No cards to display.</p>`;
    return;
  }
  const start = (currentPage - 1) * cardsPerPage;
  const end = start + cardsPerPage;
  const paginatedCards = cardList.slice(start, end);
  paginatedCards.forEach(card => {
    container.innerHTML += `
      <div>
        <div class="some w-[17rem] h-[29rem] p-3 relative bg-cover flex flex-col justify-between rounded-2xl shadow-lg transition-transform duration-300 hover:scale-105" style="background-image: url('${card.bg}');">
          <div class="top font-bold text-center text-[26px]" style="color:${getRarityColor(card.rarity)};">
            <h2>${card.rarity.charAt(0)}</h2>
          </div>
          <div class="bottom flex flex-col text-white font-bold gap-6">
            <div class="Power flex justify-around">
              <p>Def : ${card.def}</p>
              <p>Atk : ${card.atk}</p>
            </div>
            <p class="charcter-descrip text-center text-[10px] leading-tight">${card.description}</p>
            <h2 class="charcter-name text-center text-black mb-1 font-exo">${card.name}</h2>
          </div>
        </div>
        <p class="text-center text-white font-[poppins]">Price : ${card.price} $</p>
        ${
          isMarket
            ? `<div class="flex justify-center items-center gap-3 mt-2">
                 <button class="fav-btn font-[poppins] rounded bg-black text-[#61D1FF] border-2 border-[#61D1FF] shadow-[#61D1FF] shadow-[0_0_8px] w-32 hover:bg-[#61D1FF] hover:text-black transition" data-name="${card.name}">Favorite</button>
                 <button class="cart-btn font-[poppins] rounded bg-[#61D1FF] text-black border-2 border-[#61D1FF] shadow-[#61D1FF] shadow-[0_0_8px] w-32 hover:bg-black hover:text-[#61D1FF] transition" data-name="${card.name}">Add To Cart</button>
               </div>`
            : isFavorite
            ? `<div class="flex justify-center items-center gap-3 mt-2">
                 <button class="remove-fav font-[poppins] rounded bg-red-600 text-white border-2 border-red-400 shadow-red-400 shadow-[0_0_8px] w-32 hover:bg-red-700 transition" data-name="${card.name}">Remove</button>
                 <button class="cart-btn font-[poppins] rounded bg-[#61D1FF] text-black border-2 border-[#61D1FF] shadow-[#61D1FF] shadow-[0_0_8px] w-32 hover:bg-black hover:text-[#61D1FF] transition" data-name="${card.name}">Add To Cart</button>
               </div>`
            : ""
        }
      </div>
    `;
  });
  updatePagination(cardList);
}

function updatePagination(cardList) {
  const pagination = document.querySelector(".pagination");
  if (!pagination) return;
  pagination.innerHTML = "";
  const totalPages = Math.ceil(cardList.length / cardsPerPage);
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.className = `page-btn w-8 h-8 rounded-full font-bold border-2 ${i === currentPage ? "bg-[#61D1FF] text-black border-[#61D1FF]" : "bg-black text-[#61D1FF] border-[#61D1FF]"} transition duration-300 hover:scale-110`;
    btn.addEventListener("click", () => {
      currentPage = i;
      displayCards(filteredCards.length > 0 ? filteredCards : cards);
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    pagination.appendChild(btn);
  }
}

const filterButtons = document.querySelectorAll(".filter-btn");
filterButtons.forEach(button => {
  button.addEventListener("click", () => {
    filterButtons.forEach(btn => btn.classList.remove("ring-4", "ring-[#61D1FF]", "scale-105"));
    button.classList.add("ring-4", "ring-[#61D1FF]", "scale-105");
    const rarity = button.dataset.rarity;
    currentPage = 1;
    if (rarity === "All") {
      filteredCards = [];
      displayCards(cards);
    } else {
      filteredCards = cards.filter(card => card.rarity === rarity);
      displayCards(filteredCards);
    }
  });
});

document.addEventListener("click", e => {
  if (e.target.classList.contains("fav-btn")) {
    const cardName = e.target.dataset.name;
    const card = cards.find(c => c.name === cardName);
    if (!card) return;
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    const exists = favorites.some(f => f.name === card.name);
    if (exists) {
      favorites = favorites.filter(f => f.name !== card.name);
      e.target.textContent = "Favorite";
    } else {
      favorites.push(card);
      e.target.textContent = "Favorited ❤️";
    }
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }

  if (e.target.classList.contains("remove-fav")) {
    const name = e.target.dataset.name;
    cards = cards.filter(card => card.name !== name);
    localStorage.setItem("favorites", JSON.stringify(cards));
    displayCards(cards);
  }

  if (e.target.classList.contains("cart-btn")) {
    const cardName = e.target.dataset.name;
    const card = cards.find(c => c.name === cardName);
    if (!card) return;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const exists = cart.find(c => c.name === card.name);
    if (exists) {
      exists.quantity += 1;
    } else {
      cart.push({ ...card, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    e.target.textContent = "Added 🃏";
    e.target.disabled = true;
  }
});

displayCards(cards);

const cartButtons = document.querySelectorAll("#cart-btn");
const cartModal = document.getElementById("cart-modal");
const closeCart = document.getElementById("close-cart");
const cartItemsContainer = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCart = document.getElementById("clear-cart");
const checkoutBtn = document.getElementById("checkout");

function updateCartDisplay() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cartItemsContainer.innerHTML = "";
  let total = 0;
  cart.forEach(card => {
    total += card.price * card.quantity;
    cartItemsContainer.innerHTML += `
      <div class="flex items-center justify-between bg-white p-2 rounded-lg shadow">
        <div class="flex items-center gap-2">
          <div class="w-10 h-10 bg-gray-300 rounded-md" style="background-image:url('${card.bg}');background-size:cover;"></div>
          <div class="text-left">
            <p class="font-bold text-black text-sm">${card.name}</p>
            <p class="text-xs text-gray-600">${card.rarity}</p>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <button class="decrease text-black font-bold" data-name="${card.name}">-</button>
          <p class="text-black font-semibold">${card.quantity}</p>
          <button class="increase text-black font-bold" data-name="${card.name}">+</button>
          <p class="text-[#ff6b00] font-semibold text-sm">$${card.price * card.quantity}</p>
        </div>
      </div>`;
  });
  cartTotal.textContent = `$${total}`;
}

cartItemsContainer?.addEventListener("click", e => {
  if (e.target.classList.contains("increase") || e.target.classList.contains("decrease")) {
    const name = e.target.dataset.name;
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const card = cart.find(c => c.name === name);
    if (!card) return;
    if (e.target.classList.contains("increase")) card.quantity++;
    if (e.target.classList.contains("decrease")) {
      card.quantity--;
      if (card.quantity <= 0) cart = cart.filter(c => c.name !== name);
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartDisplay();
  }
});

cartButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    updateCartDisplay();
    cartModal.classList.remove("hidden");
  });
});

closeCart?.addEventListener("click", () => {
  cartModal.classList.add("hidden");
});

clearCart?.addEventListener("click", () => {
  localStorage.removeItem("cart");
  updateCartDisplay();
});

checkoutBtn?.addEventListener("click", () => {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  if (cart.length === 0) return;
  let deck = JSON.parse(localStorage.getItem("deck")) || [];
  deck = [...deck, ...cart];
  localStorage.setItem("deck", JSON.stringify(deck));
  localStorage.removeItem("cart");
  updateCartDisplay();
  alert("✅ Cards successfully added to your Deck!");
});

if (isDeck) {
  const deckCards = JSON.parse(localStorage.getItem("deck")) || [];
  displayCards(deckCards);
}



window.addEventListener("scroll", () => {
  const header = document.getElementById("mainHeader");
  if (window.scrollY > 80) {
    header.classList.add("shadow-[0_0_20px_#61D1FF]");
  } else {
    header.classList.remove("shadow-[0_0_20px_#61D1FF]");
  }
});




function priceDisplayer(){
  let num = 0;
  cards.forEach(card => {
    if(card.price > num) {
      num = card.price;
    }
    
  })
  console.log(num);
}

