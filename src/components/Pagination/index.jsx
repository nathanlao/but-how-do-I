import './Pagination.css';

const Pagination = ({ currentPage, pageCount, onPageChange }) => {
  const paginationButton = [];
  for (let index = 1; index <= pageCount; index++) {
    paginationButton.push(
      <button
        key={index}
        onClick={() => onPageChange(index)}
        className={`
            font-mono
            rounded-md
            px-2
            mx-1
            mb-2
            w-fit
            shadow-lg
            inline-block
            text-xs
            sm:text-xe
            md:text-sm
            lg:text-lg
            xl:text-lg
            transition
            duration-300
            whitespace-pre
          bg-gray-500/20
          hover:bg-gray-200/20
            ${
              currentPage === index
                ? 'border-2 pagination-border-selected pagination-text-selected'
                : 'border-2 border-zinc-500/50 text-white/50'
            }
          `}
      >
        {index}
      </button>
    );
  }

  return <div>{paginationButton}</div>;
};

export default Pagination;
