import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

import { Pagination, PaginationContent, PaginationItem } from '@/components/ui/pagination';

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  maxPages?: number;
  onPageChange: (page: number) => void;
}

const NavPagination = ({ currentPage = 0, totalPages = 0, maxPages = 5, onPageChange }: PaginationProps) => {
  const MAX_PAGE_NUMBERS = maxPages;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    let startPage = Math.max(0, currentPage - Math.floor(MAX_PAGE_NUMBERS / 2));
    let endPage = Math.min(totalPages - 1, startPage + MAX_PAGE_NUMBERS - 1);

    if (totalPages <= MAX_PAGE_NUMBERS) {
      startPage = 0;
      endPage = totalPages - 1;
    } else if (endPage - startPage + 1 < MAX_PAGE_NUMBERS) {
      startPage = endPage - MAX_PAGE_NUMBERS + 1;
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <PaginationItem
          key={i}
          onClick={() => i !== currentPage && onPageChange(i)}
          className={`flex items-center justify-center px-3 rounded-none h-8 leading-tight ${i === currentPage ? 'z-10 border-med-green bg-med-green text-white' : 'text-med-gray-75 bg-white border border-gray-300 hover:border-med-green hover:text-med-gray-75 cursor-pointer'}`}
        >
          {i + 1}
        </PaginationItem>,
      );
    }

    return pageNumbers;
  };

  return (
    <>
      <nav className="w-full flex justify-center items-center" key={currentPage}>
        <Pagination>
          <PaginationContent className="flex items-center -space-x-px h-8 text-sm gap-0">
            <PaginationItem
              onClick={() => currentPage !== 0 && onPageChange(currentPage - 1)}
              className={`${currentPage !== 0 && 'cursor-pointer'} flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              <FaChevronLeft />
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem
              onClick={() => currentPage !== totalPages - 1 && onPageChange(currentPage + 1)}
              className={`${currentPage !== totalPages - 1 && 'cursor-pointer'} flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white`}
            >
              <FaChevronRight />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </nav>
    </>
  );
};

export { NavPagination };
