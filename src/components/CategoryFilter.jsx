import { API_URL } from "../api";

function CategoryFilter({
  categories,
  activeCategories = [],
  onCategoryToggle,
  onClearCategories,
}) {
  const getIconSrc = (cat) => {
    if (cat.iconUrl?.startsWith("http")) {
      return cat.iconUrl;
    }

    if (cat.iconUrl?.startsWith("/")) {
      return `${API_URL}${cat.iconUrl}`;
    }

    return `${API_URL}/api/categories/${cat.slug}/icon`;
  };

  return (
    <div className="category-filter">
      <button
        type="button"
        className={activeCategories.length === 0 ? "active" : ""}
        onClick={onClearCategories}
      >
        Todas
      </button>

      {categories.map((cat) => (
        <button
          type="button"
          key={cat.slug}
          className={activeCategories.includes(cat.slug) ? "active" : ""}
          onClick={() => onCategoryToggle(cat.slug)}
        >
          <img
            className="category-filter-icon"
            src={getIconSrc(cat)}
            alt=""
            aria-hidden="true"
          />
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
