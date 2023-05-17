const currencyEl_one = document.querySelector("#currency-one");
const currencyEl_two = document.querySelector("#currency-two");
const amountEl_one = document.querySelector("#amount-one");
const amountEl_two = document.querySelector("#amount-two");

const rateEl = document.querySelector("#rate");
const swap = document.querySelector("#swap");

currencyEl_one.addEventListener("change", calculate);
currencyEl_two.addEventListener("change", calculate);
amountEl_one.addEventListener("input", calculate);
amountEl_two.addEventListener("input", calculate);
swap.addEventListener("click", () => {
  [currencyEl_one.value, currencyEl_two.value] = [
    currencyEl_two.value,
    currencyEl_one.value,
  ];
  calculate();
});

BASE_URLS = {
  ErApi: "https://open.er-api.com/v6/latest/",
  OldErApi: "https://api.exchangerate-api.com/v4/latest/",
};

//Fetch exchange range and update the DOM
function calculate() {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(BASE_URLS["ErApi"] + currency_one)
    .then((res) => res.json())
    .then((data) => {
      const rate = data.rates[currency_two];

      rateEl.textContent = `1 ${currency_one} = ${rate} ${currency_two}`;

      amountEl_two.value = (amountEl_one.value * rate).toFixed(2);
    });
}

calculate();
