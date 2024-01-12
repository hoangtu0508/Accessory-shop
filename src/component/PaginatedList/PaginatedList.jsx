// import React, { useState } from 'react';

// const itemsPerPage = 5;

// const PaginatedList = ({ data }) => {
//   const [currentPage, setCurrentPage] = useState(1);

//   console.log(data);

//   const indexOfLastItem = currentPage * itemsPerPage;
//   console.log(indexOfLastItem);
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   console.log(indexOfFirstItem);
//   const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

//   console.log(currentItems);

//   const totalPages = Math.ceil(data.length / itemsPerPage);

//   const handlePageChange = (selectedPage) => {
//     setCurrentPage(selectedPage);
//   };

//   return (
//     <div>
//       {/* Render current items */}
//       {currentItems.map((item, index) => (
//         <div key={index}>{item.name}</div>
//       ))}

//       {/* Render pagination */}
//       <ul>
//         {Array.from({ length: totalPages }, (_, index) => index + 1).map((page) => (
//           <li key={page} onClick={() => handlePageChange(page)}>
//             {page}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default PaginatedList;
import React from 'react'

const PaginatedList = () => {
  return (
    <div>PaginatedList</div>
  )
}

export default PaginatedList