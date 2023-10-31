import { useEffect, useState } from "react";

const Exam07 =()=>{

  //객체로 상태 변수를 정의
  const[member, setMember]=useState({//입력데이터
    memberId : "",
    memberPw : "",
    memberPwRe : ""
  });
  const [result, setResult] = useState({//검사결과
    memberId:null,
    memberPw:null,
    memberPwRe:null
  });
  //입력데이터가 변하면 검사결과가 자동으로 계산되도록 처리
  const checkMember = ()=>{
    // console.log("member변함")
    //id검사
    const idRegex = /^[a-z][a-z0-9]{7,19}$/;
    const idMatch = member.memberId.length === 0 ? null: idRegex.test(member.memberId);

    //pw검사
    const pwRegex = /^[A-Za-z0-9!@#$]{8,16}$/;
    const pwMatch = member.memberPw.length === 0 ? null : pwRegex.test(member.memberPw);
    //pw-re검사
    const pwReMatch = member.memberPwRe.length === 0 ? null : 
                        member.memberPw.length > 0 && member.memberPw === member.memberPwRe;

    setResult({
      memberId:idMatch,
      memberPw:pwMatch,
      memberPwRe:pwReMatch
    });
  }

  // useEffect(()=>{
  //   // console.log("member변함")
  //   //id검사
  //   const idRegex = /^[a-z][a-z0-9]{7,19}$/;
  //   const idMatch = member.memberId.length === 0 ? null: idRegex.test(member.memberId);

  //   //pw검사
  //   const pwRegex = /^[A-Za-z0-9!@#$]{8,16}$/;
  //   const pwMatch = member.memberPw.length === 0 ? null : pwRegex.test(member.memberPw);
  //   //pw-re검사
  //   const pwReMatch = member.memberPwRe.length === 0 ? null : 
  //                       member.memberPw.length > 0 && member.memberPw === member.memberPwRe;

  //   setResult({
  //     memberId:idMatch,
  //     memberPw:pwMatch,
  //     memberPwRe:pwReMatch
  //   });
  // },[member]);

  //useEffect(checkMember,[member]);

  //객체의 상태를 한 번에 변경하는 함수를 구현
  const changeMember=(e)=>{
    setMember({
      ...member,
      [e.target.name] : e.target.value
    });
  };


  return(
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10 offset-md-1">

          <div className="p-4 text-light bg-dark rounded">
            <h1>객체 상태 변수 문제</h1>
          </div>

          <div className="row mt-4">
            <div className="col">
              <label className="form-label">아이디</label>
              <input name="memberId" value={member.memberId} 
              onChange={changeMember} 
                    className={
                          `form-control 
                          ${result.memberId===true ?'is-valid' :''}
                          ${result.memberId===false ?'is-invalid' :''}
                        `}
                        onBlur={checkMember}
                        />
              <div className="valid-feedback">멋진아이디입니다</div>
              <div className="invalid-feedback">사용할 수 없는 아이디입니다</div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <label className="form-label">비밀번호</label>
              <input name="memberPw" value={member.memberPw} 
              onChange={changeMember} 
              className={
                      `form-control 
                      ${result.memberPw===true ? 'is-valid' :''}
                      ${result.memberPw===false ? 'is-invalid' :''}
                    `}
                    onBlur={checkMember}
                    />
            <div className="valid-feedback">올바른 형식의 비밀번호입니다</div>
            <div className="invalid-feedback">비밀번호 형식이 올바르지 않습니다</div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <label className="form-label">비밀번호 확인</label>
              <input name="memberPwRe" value={member.memberPwRe} 
              onChange={changeMember} 
                    className={`
                      form-control
                      ${result.memberPwRe === true ? 'is-valid' : ''}
                      ${result.memberPwRe === false ? 'is-invalid' : ''}
                    `}
                    onBlur={checkMember}
                    />
              <div className="valid-feedback">비밀번호가 일치합니다</div>
              <div className="invalid-feedback">비밀번호가 일치하지 않습니다</div>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col">
              <button className="btn btn-primary w-100 " type="button"
                disabled={!(result.memberId===true && result.memberPw===true &&
                  result.memberPwRe===true)}>가입하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Exam07;