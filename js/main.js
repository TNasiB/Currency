const rates = {};

const elementUSD = document.querySelector('.usd__value'),
      elementEUR = document.querySelector('.eur__value'),
      elementGBP = document.querySelector('.gpb__value');

GetCurrency();

async function GetCurrency() {
    const response = await fetch('https://www.cbr-xml-daily.ru/daily_json.js');
    const data = await response.json();
    const result = await data;

    rates.USD = result.Valute.USD;
    
    rates.EUR = result.Valute.EUR;
    
    rates.GBP = result.Valute.GBP;

    elementUSD.textContent = rates.USD.Value.toFixed(2);
    elementEUR.textContent = rates.EUR.Value.toFixed(2);
    elementGBP.textContent = rates.GBP.Value.toFixed(2);

    if (rates.USD.Value > rates.USD.Previous) {
        elementUSD.classList.add('top');
    } else {
        elementUSD.classList.add('bottom');
    }

    if (rates.EUR.Value > rates.EUR.Previous) {
        elementEUR.classList.add('top');
    } else {
        elementEUR.classList.add('bottom');
    }

    if (rates.GBP.Value > rates.GBP.Previous) {
        elementGBP.classList.add('top');
    } else {
        elementGBP.classList.add('bottom');
    }
}

const givingValue = document.querySelector('.giveValue');
const receiveValue = document.querySelector('.receiveValue');
const giveCurrency = document.querySelector('.giveCurrency');
const receiveCurrency = document.querySelector('.receiveCurrency');

givingValue.addEventListener('input', () => {
    receiveValue.value = (parseFloat((givingValue.value) / rates[receiveCurrency.value].Value)).toFixed(2);
});
receiveCurrency.addEventListener('input', () => {
    receiveValue.value = (parseFloat((givingValue.value) / rates[receiveCurrency.value].Value)).toFixed(2);
});
