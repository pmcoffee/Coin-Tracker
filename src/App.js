import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([])
  const [money, setMoney] = useState("")
  const [get, setGet] = useState(1)
  function onChangeGet(event) {
    setGet(event.target.value);
    setMoney("");
  }
  function onChange(event) {
    setMoney(event.target.value);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>The Coins! {loading ? "" : `${coins.length}`}</h1>
      {loading ? <strong>Loading...</strong> :
        <select onChange={onChangeGet}>
          <option>선택하세요</option>
          {coins.map((coin, index) => (
            <option
              key={index}
              value={coin.quotes.USD.price}
              id={coin.symbol}
            >
              {coin.name}({coin.symbol}):
              ${coin.quotes.USD.price} USD
            </option>
          ))}
        </select>}
      <div>
      <h1>입력하세요</h1>
        {loading ? "" :
          <input placeholder="dollor" type="number" 
          onChange={onChange} value={money}/>}
        <h2> You can buy {Math.round(money / get)} coins </h2>
      </div>
    </div>
  );
}

export default App;
