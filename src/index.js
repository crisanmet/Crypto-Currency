const $template = document.querySelector(".template-card").content;
const $container = document.querySelector(".container-fluid");
const $fragment = document.createDocumentFragment();

// const URL = "https://api.binance.com";
// const path = "/api/v3/ticker/price";

// fetch(`${URL}${path} `)
//   .then((res) => res.json())
//   .then((coins) => renderizarCripto(coins));

// const renderizarCripto = (coins) => {
//   coins.forEach((coin) => {
//     if (coin.price > 1) {
//       $template.querySelector(".card-header").textContent = coin.symbol;
//       $template.querySelector(".card-title").textContent = coin.price;

//       const clon = $template.cloneNode(true);
//       $fragment.appendChild(clon);
//     }
//     $container.appendChild($fragment);
//   });
// };

const URL = "https://api.coinranking.com/v2/coins";
const CORS = "https://cors-anywhere.herokuapp.com/";
const API_KEY = "coinranking907ec8401d89fceee51c44307229855f0320e003ce580655";

const opciones = {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    "x-access-token": `${API_KEY}`,
    "Access-Control-Allow-Origin": "*",
  },
};

fetch(`${CORS}${URL}`, opciones)
  .then((res) => res.json())
  .then((coins) => console.log(coins.data.coins));
