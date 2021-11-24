const $template = document.querySelector(".template-card").content;
const $templateTabla = document.querySelector(".template-tabla").content;
const $contenedorTabla = document.querySelector(".tabla-coins");
const $container = document.querySelector(".contenedor-coins");
const $fragment = document.createDocumentFragment();
const $inputBtn = document.querySelector(".search");

const URL =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=false";

fetch(URL)
  .then((res) => res.json())
  .then((coins) => renderizarCripto(coins))
  .catch((err) => console.log(err));

const renderizarCripto = (coins) => {
  console.log(coins);
  coins.forEach((coin) => {
    $templateTabla.querySelector(".rank").textContent = coin.market_cap_rank;
    $templateTabla.querySelector(".img-fluid").setAttribute("src", coin.image);
    $templateTabla.querySelector(".name").textContent = coin.name;
    $templateTabla.querySelector(".price").textContent = Intl.NumberFormat(
      "en-US",
      { style: "currency", currency: "USD" }
    ).format(coin.current_price);
    $templateTabla.querySelector(".capitalize").textContent = Intl.NumberFormat(
      "en-US",
      { style: "currency", currency: "USD" }
    ).format(coin.market_cap);
    $templateTabla.querySelector(".price-change").textContent =
      coin.price_change_percentage_24h;

    const clone = $templateTabla.cloneNode(true);
    $fragment.appendChild(clone);
  });
  $contenedorTabla.appendChild($fragment);
};
$container.addEventListener("click", (e) => {
  if (e.target.classList.contains("img-fluid")) {
    Swal.fire({
      template: "#my-template",
    });
  }
});

$inputBtn.addEventListener("keyup", (e) => {
  if (e.key === "Escape") e.target.value = "";
  document
    .querySelectorAll(".tr-coins")
    .forEach((el) =>
      el.textContent.toLowerCase().includes(e.target.value)
        ? el.classList.remove("filter")
        : el.classList.add("filter")
    );
});
