import { useEffect, useState } from "react";
import axios from 'axios';
import { FaRegEdit } from "react-icons/fa";
import {MdDelete} from "react-icons/md";

const Pocketmon = (props)=>{
  const [pocketmonList, setPocketmonList] = useState([]);
  const loadPocketmon = ()=>{
    //서버에서 pocketmon list를 불러와서 state에 설정하는 코드
    axios({
      url:"http://localhost:8080/pocketmon/",
      method:"get",
    })
    .then(response=>{
      // console.log(response);
      // console.log(response.data);
      setPocketmonList(response.data);
    })
    .catch(err=>{});
  };
  useEffect(()=>{
    loadPocketmon();
  },[]);

  //포켓몬 삭제
  //- 이제는 state에서 삭제하는것이 아니라 서버에 통신을 보낸뒤 목록을 갱신하면 된다
  const deletePocketmon=(pocketmon)=>{
    const choice = window.confirm("정말 삭제하시겠습니까?");
    if(choice===false) return;

    //axios({옵션}).then(성공시 실행할 함수).catch(실패시 실행할 함수);
    axios({
      url:`http://localhost:8080/pocketmon/${pocketmon.no}`,
      method:"delete"
    })
    .then(response=>{
      loadPocketmon();//목록갱신
    })
    .catch(err=>{});
  };

  return(
  <>

    <div className="row">
      <div className="col">
        <h1>포켓몬 관리 화면</h1>
        <p>React CRUD 연습 예제</p>
      </div>
    </div>
    <div className="row mt-4">
      <div className="col">
        <table className="table">
          <thead>
            <tr>
              <th>번호</th>
              <th>이름</th>
              <th>속성</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {pocketmonList.map(pocketmon=>(
              <tr key={pocketmon.no}>
                <td>{pocketmon.no}</td>
                <td>{pocketmon.name}</td>
                <td>{pocketmon.type}</td>
                <td>
                  <FaRegEdit className="text-warning"/>
                  <MdDelete className="text-danger"
                    onClick={e=>deletePocketmon(pocketmon)}/>
                </td>
              </tr>
            ))}
            <tr>

            </tr>
          </tbody>
        </table>
      </div>  
    </div>      
  
  </>
  );
};

export default Pocketmon;