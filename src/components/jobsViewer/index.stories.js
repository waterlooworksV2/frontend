import React, {useState} from 'react';


import Pagination from '../pagination'

export default {
  title: 'AuthenticatedApp/Pagination',
  component: Pagination,
};

export const DefaultPagination = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(10);
  return (
    <Pagination
      currentPage={currentPage}
      totalPages={totalPages}
      // @ts-ignore
      onClickPage={(page) => setCurrentPage(page)}
    />
  );
}
