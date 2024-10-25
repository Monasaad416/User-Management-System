import React from 'react'

export default function Pagination() {


interface PaginationSettings {
    postsPerPage: number;
    length: number;  // Total number of posts
    pageNumber: number; // Current page number
}

const makePagination = ({ postsPerPage, length }: { postsPerPage: number; length: number }) => {
    const paginationNumbers: number[] = [];
    for (let i = 1; i <= Math.ceil(length / postsPerPage); i++) {
        paginationNumbers.push(i);
    }
    return paginationNumbers;
};

const PaginationComponent: React.FC<PaginationSettings> = ({ postsPerPage, length, pageNumber }) => {
    const paginationNumbers = makePagination({ postsPerPage, length });

    return (
        <div className='pagination'>
            {paginationNumbers.map((page) => (
                <button key={page} onClick={() => console.log(`Go to page ${page}`)}>
                    {page}
                </button>
            ))}
        </div>
    );
};

export default PaginationComponent;