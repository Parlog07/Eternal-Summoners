const cards = [
  {
    name: "Lunara",
    rarity: "Legendary",
    atk: 1250,
    def: 700,
    description: "A sorceress of moonlight who commands shadows and dreams.",
    price: 960,
    bg: "img/L01.png"
  },
  {
    name: "Drakar",
    rarity: "Mythic",
    atk: 1400,
    def: 800,
    description: "A dragon forged in cosmic fire, guardian of the stars.",
    price: 1150,
    bg: "img/M01.png"
  },
  {
    name: "Ignis",
    rarity: "Epic",
    atk: 1100,
    def: 650,
    description: "A blazing warrior who draws strength from living flame.",
    price: 860,
    bg: "img/bg-epic.png"
  },
  {
    name: "Sylvan",
    rarity: "Rare",
    atk: 850,
    def: 500,
    description: "A spirit of the forest who bends nature to its will.",
    price: 540,
    bg: "img/bg-rare.png"
  },
  {
    name: "Fae",
    rarity: "Common",
    atk: 500,
    def: 300,
    description: "A playful creature of light that dances through dreams.",
    price: 300,
    bg: "img/bg-common.png"
  },
  {
    name: "Astrael",
    rarity: "Legendary",
    atk: 1320,
    def: 720,
    description: "A celestial guardian who weaves starlight into powerful shields.",
    price: 990,
    bg: "img/bg-legendary.png"
  },
  {
    name: "Vornak",
    rarity: "Mythic",
    atk: 1450,
    def: 850,
    description: "A dark titan of the underrealm who feeds on the souls of fallen heroes.",
    price: 1190,
    bg: "img/bg-mythic.png"
  },
  {
    name: "Elaris",
    rarity: "Epic",
    atk: 1000,
    def: 640,
    description: "An elemental archer whose arrows split the sky like lightning.",
    price: 830,
    bg: "img/bg-epic.png"
  },
  {
    name: "Rynor",
    rarity: "Rare",
    atk: 900,
    def: 550,
    description: "A fierce warrior of the northern tribes, fearless in battle.",
    price: 560,
    bg: "img/bg-rare.png"
  },
  {
    name: "Tindra",
    rarity: "Common",
    atk: 480,
    def: 320,
    description: "A forest sprite who brings good fortune to travelers.",
    price: 290,
    bg: "img/bg-common.png"
  },
  {
    name: "Kaelum",
    rarity: "Legendary",
    atk: 1280,
    def: 750,
    description: "A storm king who commands thunder and commands the skies.",
    price: 970,
    bg: "img/bg-legendary.png"
  },
  {
    name: "Morthar",
    rarity: "Mythic",
    atk: 1500,
    def: 900,
    description: "The eternal reaper, forged from the ashes of fallen gods.",
    price: 1220,
    bg: "img/bg-mythic.png"
  },
  {
    name: "Zephyra",
    rarity: "Epic",
    atk: 1080,
    def: 660,
    description: "A sky dancer who moves with the wind, swift and untouchable.",
    price: 870,
    bg: "img/bg-epic.png"
  },
  {
    name: "Korin",
    rarity: "Rare",
    atk: 870,
    def: 530,
    description: "A rogue swordsman who fights for gold, not glory.",
    price: 550,
    bg: "img/bg-rare.png"
  },
  {
    name: "Nyxa",
    rarity: "Common",
    atk: 520,
    def: 340,
    description: "A mischievous imp who delights in causing harmless chaos.",
    price: 310,
    bg: "img/bg-common.png"
  }
];

// function getRarityColor(rarity) {
//   switch (rarity) {
//     case "Mythic":
//       return "#FFD700";
//     case "Legendary":
//       return "#FF6B00";d
//     case "Epic":
//       return "#A020F0"; 
//     case "Rare":
//       return "#00FF99";
//     case "Common":
//       return "#A0A0A0";  
//   }
// }

function displayCards(cardList) {
  const container = document.querySelector(".Card-Container");
  container.innerHTML = ""; 
  cardList.forEach(card => {
    const cardHTML = `
      <div>
        <div
          class="some w-[17rem] h-[29rem] p-3 relative bg-cover flex flex-col justify-between transition-transform duration-300 hover:scale-105 rounded-2xl shadow-lg"
  style="background-image: url('${card.bg}');">
          
          <div class="top text-red-600 font-bold text-center text-[26px]">
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

        <div class="flex justify-center items-center gap-3 mt-2">
          <button class="font-[poppins] rounded bg-black text-[#61D1FF] [border:solid_2px_#61D1FF] shadow-[#61D1FF] shadow-[0_0_8px] w-32 hover:bg-[#61D1FF] hover:text-black hover:translate-y-[-0.3rem] transition duration-700">Favorite</button>
          <button class="font-[poppins] rounded bg-[#61D1FF] text-black [border:solid_2px_#61D1FF] shadow-[#61D1FF] shadow-[0_0_8px] w-32 hover:bg-black hover:text-[#61D1FF] hover:translate-y-[-0.3rem] transition duration-700">Add To Cart</button>
        </div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

// === DISPLAY ALL CARDS AT START ===
displayCards(cards);

const filterButtons = document.querySelectorAll(".filter-btn");

filterButtons.forEach(button => {
  button.addEventListener("click", () => {

    filterButtons.forEach(btn => btn.classList.remove("ring-4", "ring-[#61D1FF]", "scale-105"));


    button.classList.add("ring-4", "ring-[#61D1FF]", "scale-105");

    const rarity = button.dataset.rarity;

    if (rarity === "All") {
      displayCards(cards);
    } else {
      const filtered = cards.filter(card => card.rarity === rarity);
      displayCards(filtered);
    }
  });
});