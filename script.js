const PRICE_STANDARD = 400;
const PRICE_VIP = 800;
const PROMO_CODE = "EVENT50";
const PROMO_AMOUNT = 50;

const registerForm = document.getElementById("register-form");
const registerMessage = document.getElementById("register-message");

registerForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const participants = Number(document.getElementById("participants").value);

  let errorText = "";

  if (name === "") {
    errorText = errorText + "Вкажіть ім’я. ";
  }

  if (email === "") {
    errorText = errorText + "Вкажіть email. ";
  }

  if (!(participants > 0)) {
    errorText = errorText + "Кількість учасників має бути більшою за нуль.";
  }

  registerMessage.classList.remove("d-none", "alert-success", "alert-danger");

  if (errorText === "") {
    registerMessage.textContent = "Реєстрація успішна!";
    registerMessage.classList.add("alert-success");
  } else {
    registerMessage.textContent = "Помилка: " + errorText;
    registerMessage.classList.add("alert-danger");
  }
});

const calculatorForm = document.getElementById("calculator-form");
const calcMessage = document.getElementById("calc-message");
const calcResult = document.getElementById("calc-result");

calculatorForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const category = document.getElementById("category").value;
  const tickets = Number(document.getElementById("tickets").value);
  const promoInput = document.getElementById("promo").value.trim().toUpperCase();

  if (!(tickets > 0) || !Number.isInteger(tickets)) {
    calcResult.classList.add("d-none");
    calcMessage.textContent = "Помилка: кількість квитків має бути цілим числом, більшим за нуль.";
    calcMessage.classList.remove("d-none");
    return;
  }

  let ticketPrice = PRICE_STANDARD;
  let categoryName = "Standard";

  if (category === "vip") {
    ticketPrice = PRICE_VIP;
    categoryName = "VIP";
  } else {
    ticketPrice = PRICE_STANDARD;
    categoryName = "Standard";
  }

  const baseCost = ticketPrice * tickets;

  let discountPercent = 0;

  if (tickets >= 5) {
    discountPercent = 20;
  } else if (tickets >= 3 && tickets <= 4) {
    discountPercent = 10;
  } else {
    discountPercent = 0;
  }

  const discountAmount = baseCost * discountPercent / 100;
  const costAfterDiscount = baseCost - discountAmount;

  let promoAmount = 0;

  if (promoInput === PROMO_CODE) {
    promoAmount = PROMO_AMOUNT;
  } else {
    promoAmount = 0;
  }

  let total = costAfterDiscount - promoAmount;

  if (total < 0) {
    total = 0;
  }

  document.getElementById("result-category").textContent = categoryName;
  document.getElementById("result-price").textContent = ticketPrice + " грн";
  document.getElementById("result-count").textContent = String(tickets);
  document.getElementById("result-base").textContent = baseCost + " грн";
  document.getElementById("result-discount").textContent =
    discountPercent + "% (" + discountAmount + " грн)";

  if (promoAmount > 0) {
    document.getElementById("result-promo").textContent = "EVENT50, −" + promoAmount + " грн";
  } else if (promoInput === "") {
    document.getElementById("result-promo").textContent = "не вказано";
  } else {
    document.getElementById("result-promo").textContent = "не діє";
  }

  document.getElementById("result-total").textContent = total + " грн";

  calcMessage.classList.add("d-none");
  calcResult.classList.remove("d-none");
});
