export default function Pagination({ index, setCurrentPage, currentPage }) {
  if (index < 0) index = 5;
  const pages = new Array(index).fill().map((_, i) => i + 1);
  return (
    <nav className="bg-white h-15 flex justify-center items-center text-lg cursor-pointer w-[200px] mb-5">
      <span
        className="text-xl ml-3 mr-3"
        onClick={currentPage > 1 ? () => setCurrentPage(currentPage - 1) : null}
      >
        ←
      </span>
      {pages.map((page) => {
        return (
          <a
            key={page}
            className={
              page === currentPage
                ? "m-2 hover:underline font-bold text-xs underline decoration-[#e16565]"
                : "m-2 hover:underline font-thin text-xs"
            }
            onClick={(e) => {
              e.preventDefault();
              setCurrentPage(page);
            }}
          >
            {page}
          </a>
        );
      })}
      {index > 5 ? <span>...</span> : null}
      <span
        className="text-xl mr-3 ml-3"
        onClick={
          currentPage < index ? () => setCurrentPage(currentPage + 1) : null
        }
      >
        →
      </span>
    </nav>
  );
}
