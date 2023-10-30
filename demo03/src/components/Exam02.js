import { useState } from 'react';
import testImage from '../assets/images/test.gif';

function Exam02(){
  //이 화면의 상태(state)는 한 개이다.
  const[size, setSize] = useState(500)

  function small(){
    setSize(300);
  }
  function normal(){
    setSize(500);
  }
  function big(){
    setSize(700);
  }
  return(
    <>
      <h1>두번째 예제</h1>

      <button onClick={()=>setSize(300)}>작게</button>
      <button onClick={()=>setSize(400)}>기본</button>
      <button onClick={()=>setSize(500)}>크게</button>
      <br/>
      <img src={testImage} width={size}/>
    </>
  );
}

export default Exam02;