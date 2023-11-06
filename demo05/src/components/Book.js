import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import {MdDelete} from "react-icons/md";
import "./Book.css";

const Book = (props)=>{
  const [bookList, setBookList]= useState([]);
  useEffect(()=>{
    //서버에 있는 도서 정보를 불러와서 state에 반영하는 코드
    axios({
      url:"http://localhost:8080/book/",
      method:"get"
    })
    .then(response=>{
      setBookList(response.data);
    })
    .catch(error=>{
      window.alert("통신 오류 발생");
    })
  },[])


  return(
    <>
    <div className="row">
      <div className="col">
        <h1>도서 관리 화면</h1>
        <p>도서 CRUD 예제</p>
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
            {bookList.map((book, index)=>(
              <tr key={book.bookId}>
                <td className="pc-only">{book.bookId}</td>
                <td>{book.bookAuthor}</td>
                <td>{book.bookTitle}</td>
                <td>{book.bookPrice}</td>
                <td className="pc-only">{book.bookPublisher}</td>
                <td className="pc-only">{book.bookPageCount}</td>
                <td className="pc-only">{book.bookGenre}</td>
                <td>
                  <FaRegEdit className="text-warning"/>
                  <MdDelete className="text-danger"/>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
};
export default Book;