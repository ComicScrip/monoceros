export default function Pagination({ index, setCurrentPage, currentPage }) {
  console.log(index - 1);
  return (
    <nav className="bg-white h-15 flex justify-center items-center text-lg cursor-pointer w-[20%] mb-5">
      <span
        className="text-2xl ml-3 mr-3"
        onClick={currentPage > 1 ? () => setCurrentPage(currentPage - 1) : null}
      >
        ←
      </span>
      {new Array(5)
        .fill()
        .map((_, i) => i + 1)
        .map((page) => {
          return (
            <a
              key={page}
              className={
                page === currentPage
                  ? "m-2 hover:underline text-[#e16565]"
                  : "m-2 hover:underline"
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
      <span
        className="text-2xl mr-3 ml-3"
        onClick={
          currentPage < index ? () => setCurrentPage(currentPage + 1) : null
        }
      >
        →
      </span>
    </nav>
  );
}
