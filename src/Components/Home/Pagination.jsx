import React from "react";

const Pagination = ({ usersPerPage, setCurrentPage, totalUsers }) => {
  let pageNumbers = [];

  for (let i = 1; i <= totalUsers / usersPerPage; i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <ul class="pagination">
        {pageNumbers.map((number) => (
          <li class="page-item" onClick={()=>setCurrentPage(number)}>
            <div>
              <a class="page-link" href="#">
                {number}
              </a>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Pagination;
