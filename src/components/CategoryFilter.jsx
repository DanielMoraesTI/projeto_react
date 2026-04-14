function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
  const apiUrl = "http://localhost:3001";

  const getIconSrc = (cat) => {
    if (cat.iconUrl?.startsWith("http")) {
      return cat.iconUrl;
    }

    if (cat.iconUrl?.startsWith("/")) {
      return `${apiUrl}${cat.iconUrl}`;
    }

    return `${apiUrl}/api/categories/${cat.slug}/icon`;
  };

  return (
    <div className="category-filter">
      {/* Botão "Todas" limpa o filtro */}
      <button
        type="button"
        className={!activeCategory ? "active" : ""}
        onClick={() => onCategoryChange(null)}
      >
        Todas
      </button>

      {categories.map((cat) => (
        <button
          type="button"
          key={cat.slug}
          className={activeCategory === cat.slug ? "active" : ""}
          onClick={() => onCategoryChange(cat.slug)}
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
