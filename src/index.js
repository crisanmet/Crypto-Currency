const $template = document.querySelector(".template-card").content;
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
    $template.querySelector(".rank").textContent = `#${coin.market_cap_rank}`;
    $template.querySelector(".img-fluid").setAttribute("src", coin.image);
    $template.querySelector(".name").textContent = coin.name;
    $template.querySelector(".price").textContent = `$${coin.current_price}`;
    $template.querySelector(".price-change").textContent =
      coin.price_change_percentage_24h;

    const clon = $template.cloneNode(true);
    $fragment.appendChild(clon);
  });
  $container.appendChild($fragment);
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
    .querySelectorAll(".card")
    .forEach((el) =>
      el.textContent.toLowerCase().includes(e.target.value)
        ? el.classList.remove("filter")
        : el.classList.add("filter")
    );
});
