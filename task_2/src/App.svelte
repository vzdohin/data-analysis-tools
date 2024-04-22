<script>
  let rates = {};
  let fromCurrency = 'USD';
  let toCurrency = 'EUR';
  let amountFrom = 1;
  let amountTo = 0;

  const currencyNames = {
    USD: "Доллар США",
    EUR: "Евро",
    RUB: "Российский рубль",
    JPY: "Японская иена",
    GBP: "Британский фунт",
    AUD: "Австралийский доллар",
    CAD: "Канадский доллар",
    CHF: "Швейцарский франк",
    CNY: "Китайский юань",
    SEK: "Шведская крона",
    NZD: "Новозеландский доллар"
  };

  async function fetchRates() {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
    const data = await response.json();
    rates = data.rates;
    convertAmount('from');
  }

  function convertAmount(direction) {
    if (direction === 'from') {
      amountTo = (amountFrom * rates[toCurrency]).toFixed(2);
    } else {
      amountFrom = (amountTo / rates[toCurrency]).toFixed(2);
    }
  }

  $: fromCurrency, toCurrency, fetchRates();
  $: amountFrom, convertAmount('from');
  $: amountTo, convertAmount('to');
</script>

<form on:submit|preventDefault>
  <h1>Конвертер валют</h1>
  <input type="number" bind:value={amountFrom} on:input={() => convertAmount('from')} />
  <select bind:value={fromCurrency}>
    {#each Object.keys(currencyNames) as currency}
      <option value={currency} title={currencyNames[currency]}>{currency}</option>
    {/each}
  </select>
  to
  <input type="number" bind:value={amountTo} on:input={() => convertAmount('to')} />
  <select bind:value={toCurrency}>
    {#each Object.keys(currencyNames) as currency}
      <option value={currency} title={currencyNames[currency]}>{currency}</option>
    {/each}
  </select>
</form>

<style>
  input, select {
    margin: 5px;
    padding: 10px;
    width: 200px;
    display: inline-block;
  }
  option[title]:hover::after {
    content: attr(title);
    position: absolute;
    background-color: #f9f9f9;
    border: 1px solid #d3d3d3;
    padding: 5px;
    z-index: 20;
  }
  
</style>
