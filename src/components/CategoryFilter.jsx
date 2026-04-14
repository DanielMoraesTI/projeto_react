function CategoryFilter({ categories, activeCategory, onCategoryChange }) {
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
          {cat.label}
        </button>
      ))}
    </div>
  );
}

export default CategoryFilter;
