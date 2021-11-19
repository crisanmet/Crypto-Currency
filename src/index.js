const $template = document.querySelector(".template-card").content;
const $container = document.querySelector(".container-fluid");
const $fragment = document.createDocumentFragment();

const URL = "https://api.binance.com";
const path = "/api/v3/ticker/price";

fetch(`${URL}${path} `)
  .then((res) => res.json())
  .then((coins) => renderizarCripto(coins));

const renderizarCripto = (coins) => {
  coins.forEach((coin) => {
    if (coin.price > 1) {
      $template.querySelector(".card-header").textContent = coin.symbol;
      $template.querySelector(".card-title").textContent = coin.price;

      const clon = $template.cloneNode(true);
      $fragment.appendChild(clon);
    }
    $container.appendChild($fragment);
  });
};
