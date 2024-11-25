import Swiper from "https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs";

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: "4000",
  },

  pagination: {
    el: ".swiper-pagination",
  },

  // Navigation arrows
  navigation: {
    nextEl: ".btn__next",
    prevEl: ".btn__prev",
  },

  // And if we need scrollbar
});



//

const productsWrapper = document.querySelector(".products__wrapper");

const GET_PRODUCTS = "http://localhost:5000/products";

// API

fetchProducts();

async function fetchProducts() {
  return fetch(`${GET_PRODUCTS}/products`)
    .then((res) => res.json())
    .then((data) => createProductCard(data.data));
}
async function createProductCard(data) {
  const cards = document.querySelector(".products__cards");
  cards.innerHTML = data
    ?.map(
      (card) =>
        `<div class="products__cards__card">
          <div class="products__cards__card__img">
              <img src="${card.image}" alt="">
          </div>
          <div class="products__cards__card__desc">
              <h2>${
                card.name && card.name.length > 20
                  ? card.name.slice(0, 20) + "..."
                  : card.name
              }</h2>
              <p>${card.price}</p>
          </div>
          <div class="products__cards__card-btn">
              <button class="products__cards__card__btn">
                  <i class="fa-solid fa-cart-shopping"></i>
              </button>
              <button class="products__cards__card__btns">Muddatli to'lov</button>
          </div>
      </div>`
    )
    .join("");

  const karzinaBtns = document.querySelectorAll(".products__cards__card__btn");

  karzinaBtns.forEach((btn, index) => {
    btn.addEventListener("click", () => saveLocal(data[index]));
  });
}

function saveLocal(product) {
  console.log("Mahsulot saqlandi:", product);

  let savedProducts = JSON.parse(localStorage.getItem("products")) || [];
  let newdata = savedProducts.filter((item) => item.id != product.id);
  localStorage.setItem(
    "products",
    JSON.stringify([...newdata, { ...product, total: 1 }])
  );

  savedProducts.forEach((item) => {
    if (item.id == product.id) {
      alert("Siz bu productni qo'shgansiz");
    }
  });
}



const main = document.querySelector(".main__item");

const localData = JSON.parse(localStorage.getItem("products")) || [];

main.innerHTML = localData
  ?.map(
    (item) => `
      <div class="main__cards">
          <h1>Savatchada ${localData.length} mahsulot bor</h1>
          <div class="main__card">
            <div class="main__card__left">
              <img src=${item.image} alt="">
              <span>
                <p>${item.name}</p>
                <p>${item.price}</p>
              </span>
            </div>

            <div class="main__card__right">
              <span>
                <button class="minus" onclick="minus(${item.id})">-</button> 
                <p>${item.total}</p>  
                <button class="plus" onclick="plus(${item.id})">+</button>
              </span>
              <p>${item.price * item.total}</p>
            </div>
          </div>
      </div>`
  )
  .join(""); 
function minus(id) {
  const newObj = localData.find((item) => item.id == id);
  if (newObj.total > 0) {
    newObj.total -= 1;
  } 
  updateLocalStorageAndUI();
}

function plus(id) {
  const newObj = localData.find((item) => item.id == id);
  newObj.total += 1;
  updateLocalStorageAndUI();
}

function updateLocalStorageAndUI() {
  localStorage.setItem("products", JSON.stringify(localData));
  main.innerHTML = localData
    ?.map(
      (item) => `
        <div class="main__cards">
            <h1>Savatchada ${localData.length} mahsulot bor</h1>
            <div class="main__card">
              <div class="main__card__left">
                <img src=${item.image} alt="">
                <span>
                  <p>${item.name}</p>
                  <p>${item.price}</p>
                </span>
              </div>

              <div class="main__card__right">
                <span>
                  <button onclick="minus(${item.id})">-</button> 
                  <p>${item.total}</p>  
                  <button onclick="plus(${item.id})">+</button>
                </span>
                <p>${item.price * item.total}</p>
              </div>
            </div>
        </div>`
    )
    .join(""); // Join to avoid commas in the output
}
