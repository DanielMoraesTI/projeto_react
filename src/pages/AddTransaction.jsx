import { useAddTransactionLogic } from "../components/AddTransaction";

export default function AddTransaction() {
  const {
    descriptionRef,
    formData,
    categories,
    isLoadingCategories,
    isErrorCategories,
    mutation,
    error,
    handleChange,
    handleSubmit,
  } = useAddTransactionLogic();

  return (
    <section className="app">
      <header>
        <h1>Adicionar Transação</h1>
      </header>
      <main>
        <form onSubmit={handleSubmit} className="form">
          {error && <div className="error-message">{error}</div>}
          {mutation.isError && (
            <div className="error-message">
              {mutation.error?.message || "Erro ao criar transação"}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="description">Descrição *</label>
            <input
              ref={descriptionRef}
              id="description"
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ex: Almoço no restaurante"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="amount">Valor *</label>
            <input
              id="amount"
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="type">Tipo *</label>
            <select
              id="type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="expense">Despesa</option>
              <option value="income">Receita</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="category">Categoria *</label>
            {isLoadingCategories ? (
              <p className="empty">A carregar categorias...</p>
            ) : isErrorCategories ? (
              <div className="error-message">Erro ao carregar categorias.</div>
            ) : (
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
              >
                {categories.map((cat) => (
                  <option key={cat.slug} value={cat.slug}>
                    {cat.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="date">Data *</label>
            <input
              id="date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "A guardar..." : "Adicionar Transação"}
          </button>
        </form>
      </main>
    </section>
  );
}
