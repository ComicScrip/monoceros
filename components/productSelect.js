import { useTranslation } from "next-i18next";

export default function ProductSelect({
  products,
  selectProduct,
  product,
  setCurrentPage,
}) {
  const { t } = useTranslation("productCatalogue");

  function handleClick() {
    selectProduct("");
    setCurrentPage(1);
  }

  function handleSelectChange(e) {
    selectProduct(e.target.value);
    setCurrentPage(1);
  }

  return (
    <>
      <div className="flex h-7 w-[70vw] mt-2">
        <select
          type="search"
          onChange={(e) => handleSelectChange(e)}
          value={product}
          className="bg-white w-[90vw] h-7 mb-5"
          style={{ fontSize: "13px" }}
        >
          <option value="" className="text-gray-300" disabled hidden>
            {t("product")}
          </option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name}
            </option>
          ))}
        </select>
        <button
          onClick={() => handleClick()}
          className="ml-3 text-white text-l border-white border-2 w-7"
          style={{ backgroundColor: "var(--main-color)" }}
        >
          ✗
        </button>
      </div>
    </>
  );
}
