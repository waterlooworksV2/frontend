import React, { useState, useEffect, useContext } from "react";
import "./index.scss";

interface PaginationProp {
  currentPage: number;
  totalPages: number;
  onClickPage: (page: number) => {};
}

const Pagination = ({currentPage, totalPages, onClickPage}: PaginationProp) => {
  let lis = []
  if (currentPage > 2) {
    lis.push(<a href="#" key={".1"}><p onClick={() => onClickPage(1)} className="inactive">1</p></a>);
  }
  if (currentPage >= 4) {
    lis.push(<a href="#" key={"...1"}><p className="inactive">....</p></a>);
  }
  if(currentPage > 1) {
    lis.push(<a href="#" key={String(currentPage-1)}><p onClick={() => onClickPage(currentPage-1)} className="inactive">{currentPage-1}</p></a>)
  }
  lis.push(<a href="#" key={String(currentPage)}><p className="active">{currentPage}</p></a>)
  if(currentPage+1 < totalPages) {
    lis.push(<a href="#" key={String(currentPage+1)}><p onClick={() => onClickPage(currentPage+1)} className="inactive">{currentPage+1}</p></a>)
  }
  if(currentPage + 2 < totalPages) {
    lis.push(<a href="#" key={"...2"}><p className="inactive">....</p></a>);
  }
  if(currentPage !== totalPages) {
    lis.push(<a href="#" key={String(totalPages)}><p onClick={() => onClickPage(totalPages)} className="inactive">{totalPages}</p></a>);
  }
  return (
    <div className="Pagination">
      {lis}
    </div>
  )
}

export default Pagination;
