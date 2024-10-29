import React from "react";
import styles from "./CustomPagination.module.scss";

interface CustomPaginationProps {
  total: number; // Total number of pages
  current: number; // Current active page
  onChangePage: (page: number) => void; // Function to handle page change
}

const CustomPagination: React.FC<CustomPaginationProps> = ({
  total,
  current,
  onChangePage,
}) => {
  const pageNumbers: (number | string)[] = [];
  const range = 2; // Number of pages to show on either side of the current page

  for (let i = 1; i <= total; i++) {
    if (
      i <= range ||
      i > total - range ||
      (i >= current - range && i <= current + range)
    ) {
      pageNumbers.push(i);
    } else if (pageNumbers[pageNumbers.length - 1] !== "...") {
      pageNumbers.push("...");
    }
  }

  return (
    <div className="row">
      <div className="col">
        <div className="d-flex justify-content-center align-content-center">
          <nav>
            <ul className="pagination">
              <li className={`page-item ${styles.page_item} ${current === 1 ? "disabled" : ""}`}>
                <button
                  className={`page-link ${styles.page_link}`}
                  onClick={() => onChangePage(current - 1)}
                  disabled={current === 1} // Disable button if on first page
                >
                  Previous
                </button>
              </li>
              {pageNumbers.map((number, index) => (
                <li
                  key={index}
                  className={`page-item ${styles.page_item} ${number === current ? styles.active : ""}`}
                >
                  {number === "..." ? (
                    <span className={`page-link ${styles.page_link}`}>{number}</span>
                  ) : (
                    <button
                      className={`page-link ${styles.page_link}`}
                      onClick={() => onChangePage(number as number)} // Cast to number
                    >
                      {number}
                    </button>
                  )}
                </li>
              ))}
              <li className={`page-item ${styles.page_item} ${current === total ? "disabled" : ""}`}>
                <button
                  className={`page-link ${styles.page_link}`}
                  onClick={() => onChangePage(current + 1)}
                  disabled={current === total} // Disable button if on last page
                >
                  Next
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CustomPagination;