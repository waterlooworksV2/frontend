import React from "react";
import "./index.scss";

interface PaginationProp {
  currentPage: number;
  totalPages: number;
  onClickPage: (page: number) => {};
}

const Pagination = ({currentPage, totalPages, onClickPage}: PaginationProp) => {
  let lis = []
  if (currentPage > 2) {
    lis.push(<p key={".1"} onClick={() => onClickPage(1)}>1</p>);
  }
  if (currentPage >= 4) {
    lis.push(<p key={"...1"} className="inactive">....</p>);
  }
  if(currentPage > 1) {
    lis.push(<p key={String(currentPage-1)} onClick={() => onClickPage(currentPage-1)}>{currentPage-1}</p>)
  }
  lis.push(<p className="active" key={String(currentPage)}>{currentPage}</p>)
  if(currentPage+1 < totalPages) {
    lis.push(<p key={String(currentPage+1)} onClick={() => onClickPage(currentPage+1)}>{currentPage+1}</p>)
  }
  if(currentPage + 2 < totalPages) {
    lis.push(<p className="inactive" key={"...2"}>....</p>);
  }
  if(currentPage !== totalPages) {
    lis.push(<p key={String(totalPages)} onClick={() => onClickPage(totalPages)}>{totalPages}</p>);
  }
  return (
    <div className="Pagination">
      {lis}
    </div>
  )
}

export default Pagination;
