const main = document.querySelector("#main");
const addUserBtn = document.querySelector("#add-user");
const doubleBtn = document.querySelector("#double");
const showMillionairesBtn = document.querySelector("#show_millionaires");
const sortBtn = document.querySelector("#sort");
const calculateWealthBtn = document.querySelector("#calculate_wealth");
const BASE_URL = "https://randomuser.me/api";

let data = [];
getRandomUser();
getRandomUser();
getRandomUser();

async function getRandomUser() {
  const response = await fetch(BASE_URL);
  const data = await response.json();

  const user = data.results[0];
  const newUser = {
    name: `${user.name.title} ${user.name.first} ${user.name.last}`,
    money: Math.floor(Math.random() * 1000000),
  };
  addData(newUser);
}

function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });
  updateDOM();
}

function sortByRichest() {
  data = data.sort((a, b) => b.money - a.money);
  updateDOM();
}

function showMillionaires() {
  data = data.filter((user) => user.money > 999999);
  updateDOM();
}

function calculateWealth() {
  const wealth = data.reduce((acc, user) => acc + user.money, 0);
  const wealthEl = onCreateElement("div", "", main);
  const h3 = onCreateElement("h3", "", wealthEl);
  const strong = onCreateElement("strong", "", h3, `${formatMoney(wealth)}`);
  strong.insertAdjacentHTML("beforebegin", "Total Wealth: ");
}

function addData(obj) {
  data.push(obj);
  updateDOM();
}

function updateDOM(providedData = data) {
  main.innerHTML = `<h2><strong>Person</strong>Wealth</h2>`;

  providedData.forEach((item) => {
    const element = onCreateElement("div", ["person"], main);
    const strong1 = onCreateElement("strong", "", element, `${item.name}`);
    strong1.insertAdjacentHTML("afterend", ` ${formatMoney(item.money)}`);

    //second way to create element
    // element.textContent += ` ${item.money}`;
    // const element = document.createElement("div");
    // element.classList.add("person");
    // element.innerHTML = `<strong>${item.name}</strong> ${item.money}`;
    // main.appendChild(element);
  });
}

function formatMoney(number) {
  return number.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
showMillionairesBtn.addEventListener("click", showMillionaires);
calculateWealthBtn.addEventListener("click", calculateWealth);

function onCreateElement(type, classNameList, parentEl, textcont, others) {
  let newEl = document.createElement(type);
  if (type === "input" && textcont !== "") {
    newEl.value = textcont;
  } else if (type !== "input" && textcont !== "") {
    newEl.textContent = textcont;
  }
  if (classNameList != "") {
    newEl.classList.add(...classNameList);
  }

  if (others != "") {
    for (const el in others) {
      newEl.setAttribute(`${el}`, `${others[el]}`);
    }
  }

  parentEl.appendChild(newEl);
  return newEl;
}
