import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { BiBookAdd } from "react-icons/bi";
import "./Book.css";
import { Modal } from "bootstrap";

const Book = (props) => {
  const [bookList, setBookList] = useState([]);
  // const loadBook = () => {
  //   //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
  //   axios({
  //     url: `${process.env.REACT_APP_REST_API_URL}/book/`,
  //     method: "get"
  //   })
  //     .then(response => {
  //       setBookList(response.data);
  //     })
  //     .catch(error => {
  //       window.alert("통신 오류 발생");
  //     })
  // }

  const loadBook = async () =>{
    const resposne = await axios({
      url: `${process.env.REACT_APP_REST_API_URL}/book/`,
      method: "get"
    });
    setBookList(resposne.data);
  }

  useEffect(() => {
    loadBook();
  }, [])

  const deleteBook = (book) => {
    const choice = window.confirm("정말 삭제하시겠습니까?");
    if (choice === false) return;

    axios({
      url: `${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
      method: "delete"
    })
      .then(resposne => {
        loadBook();
      })
      .catch({});
  }

  //모달
  const bsModal = useRef();
  const openModal = () => {
    const modal = new Modal(bsModal.current);
    modal.show();
  }
  const closeModal = () => {
    const modal = Modal.getInstance(bsModal.current);
    modal.hide();
    clearBook();
  }

  //등록 관련
  const [book, setBook] = useState({
    bookTitle: "",
    bookAuthor: "",
    bookPublicationDate: "",
    bookPrice: 0,
    bookPublisher: "",
    bookPageCount: 0,
    bookGenre: ""
  });
  const changeBook = (e) => {
    setBook({
      ...book,
      [e.target.name]: e.target.value
    });
  };
  const clearBook = () => {
    setBook({
      bookTitle: "",
      bookAuthor: "",
      bookPublicationDate: "",
      bookPrice: 0,
      bookPublisher: "",
      bookPageCount: 0,
      bookGenre: ""
    });
  };

  //도서등록
  // const saveBook=()=>{
  //   axios({
  //     url:`${process.env.REACT_APP_REST_API_URL}/book/`,
  //     method:"post",
  //     data:book
  //   })
  //   .then(resposne=>{
  //     loadBook();
  //     closeModal();
  //   })
  //   .catch(err=>{})
  // }

  //async 함수와 await 키워드를 사용한 간소화 작업이 가능
  const saveBook = async ()=>{
    const response = await axios({
      url:`${process.env.REACT_APP_REST_API_URL}/book/`,
      method:"post",
      data:book
    });
    loadBook();
    closeModal();
  };

  //도서 수정
  const editBook=(target)=>{
    setBook({...target})
    openModal();
  }

  const updateBook=()=>{
    //검사 후 차단 코드
    
    const copyBook = {...book};
    delete copyBook.bookId;
    axios({
      url:`${process.env.REACT_APP_REST_API_URL}/book/${book.bookId}`,
      method:"put",
      data:copyBook
    })
    .then(response=>{
      loadBook();
      closeModal();
    })
    .catch(err=>{})
  }

  return (
    <>
      <div className="row">
        <div className="col">
          <h1>도서 관리 화면</h1>
          <p>도서 CRUD 예제</p>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col text-end">
          <button className="btn btn-primary" onClick={openModal}>
            도서등록
            <BiBookAdd />
          </button>
        </div>
      </div>
      <div className="row mt-4">
        <div className="col">
          <table className="table">
            <thead>
              <tr>
                <th className="pc-only">코드</th>
                <th>저자</th>
                <th>제목</th>
                <th>가격</th>
                <th className="pc-only">출판사</th>
                <th className="pc-only">페이지</th>
                <th className="pc-only">장르</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {bookList.map((book, index) => (
                <tr key={book.bookId}>
                  <td className="pc-only">{book.bookId}</td>
                  <td>{book.bookAuthor}</td>
                  <td>{book.bookTitle}</td>
                  <td>{book.bookPrice}</td>
                  <td className="pc-only">{book.bookPublisher}</td>
                  <td className="pc-only">{book.bookPageCount}</td>
                  <td className="pc-only">{book.bookGenre}</td>
                  <td>
                    <FaRegEdit className="text-warning" 
                      onClick={e=>editBook(book)}/>
                    <MdDelete className="text-danger"
                      onClick={e =>deleteBook(book)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      <div className="modal fade" ref={bsModal}
        data-bs-backdrop="static" tabIndex="-1" role="dialog" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" >
                {book.bookId===undefined?'도서등록':`${book.bookId}번 도서 수정`}
              </h5>
              <button type="button" className="border-0 bg-transparent"
                onClick={closeModal}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <div className="row"><div className="col">
                  <label className="form-label">저자</label>
                  <input type="text" name="bookAuthor" className="form-control" 
                  value={book.bookAuthor} onChange={changeBook}/>
              </div></div>
              <div className="row mt-2"><div className="col">
                  <label className="form-label">제목</label>
                  <input type="text" name="bookTitle" className="form-control" 
                  value={book.bookTitle} onChange={changeBook}/>
              </div></div>
              <div className="row mt-2"><div className="col">
                  <label className="form-label">출간일</label>
                  <input type="date" name="bookPublicationDate" className="form-control" 
                  value={book.bookPublicationDate} onChange={changeBook}/>
              </div></div>
              <div className="row mt-2"><div className="col">
                  <label className="form-label">가격</label>
                  <input type="number" name="bookPrice" className="form-control" 
                  value={book.bookPrice} onChange={changeBook}/>
              </div></div>
              <div className="row mt-2"><div className="col">
                  <label className="form-label">출판사</label>
                  <input type="text" name="bookPublisher" className="form-control" 
                  value={book.bookPublisher} onChange={changeBook}/>
              </div></div>
              <div className="row mt-2"><div className="col">
                  <label className="form-label">페이지</label>
                  <input type="number" name="bookPageCount" className="form-control" 
                  value={book.bookPageCount} onChange={changeBook}/>
              </div></div>
              <div className="row mt-2"><div className="col">
                  <label className="form-label">장르</label>
                  <select name="bookGenre" className="form-select" value={book.bookGenre} onChange={changeBook}>
                    <option value="">장르선택</option>
                    <option>소설</option>
                    <option>시</option>
                    <option>에세이</option>
                    <option>자서전</option>
                    <option>비평</option>
                    <option>판타지</option>
                    <option>로맨스</option>
                    <option>스릴러</option>
                    <option>추리</option>
                  </select>
              </div></div>
              <div className="row mt-4"><div className="col">
                {book.bookId===undefined?
                  <button type="button" className="btn btn-success w-100"
                    onClick={saveBook}>등록</button>
                :
                  <button type="button" className="btn btn-success w-100"
                    onClick={updateBook}>도서수정</button>  
                }
                  <button type="button" className="btn btn-secondary w-100 mt-2"
                    onClick={closeModal}>취소</button>
              </div></div>

            </div>
            <div className="modal-footer">

            </div>
          </div>
        </div>
      </div>


    </>
  );
};
export default Book;