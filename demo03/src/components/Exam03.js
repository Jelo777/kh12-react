import { useState } from "react";

//function Exam03(){};
//const Exam03 = function(){};
const Exam03 = () => {
  const [money, setMoney] = useState(0);

  return (
    <>
      <h1>세번째 예제</h1>
      <h2>출금 금액 : {money.toLocaleString()} 원</h2>
      <br />
      <button className="btn btn-outline-primary me-1" onClick={() => setMoney(money + 100000)}>10만원</button>
      <button className="btn btn-outline-primary me-1" onClick={() => setMoney(money + 50000)}>5만원</button>
      <button className="btn btn-outline-primary me-1" onClick={() => setMoney(money + 10000)}>1만원</button>
      <button className="btn btn-outline-primary me-1" onClick={() => setMoney(0)}>초기화</button>
      <br/>
      <input type="range" min="0" max={1000000} step="10000" value={money} onChange={e=>setMoney(parseInt(e.target.value))}/>
    </>
  );
};

export default Exam03;