import { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTransaction, getCategories } from "../api";

export default function AddTransaction() {
  const descriptionRef = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    description: "",
    amount: "",
    type: "expense",
    category: "alimentacao",
    date: new Date().toISOString().split("T")[0],
  });

  const [error, setError] = useState(null);

  // Foco automático na descrição
  useEffect(() => {
    descriptionRef.current?.focus();
  }, []);

  // Carregar categorias
  const { data: categories = [] } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  // Mutation para criar transação
  const mutation = useMutation({
    mutationFn: createTransaction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      navigate("/");
    },
    onError: (err) => {
      setError(err.message || "Erro ao criar transação. Tente novamente.");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    // Validação básica
    if (!formData.description.trim()) {
      setError("Descrição é obrigatória");
      descriptionRef.current?.focus();
      return;
    }

    if (!formData.amount || parseFloat(formData.amount) === 0) {
      setError("Valor deve ser maior que 0");
      return;
    }

    // Calcular valor com sinal baseado no tipo
    const amount =
      formData.type === "expense"
        ? -Math.abs(parseFloat(formData.amount))
        : Math.abs(parseFloat(formData.amount));

    mutation.mutate({
      description: formData.description.trim(),
      amount,
      category: formData.category,
      date: formData.date,
      type: formData.type,
    });
  };

  return (
    <section className="app">
      <header>
        <h1>Adicionar Transação</h1>
      </header>
      <main>
        <form className="form" onSubmit={handleSubmit}>
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
            <label htmlFor="amount">Valor (€) *</label>
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
            {categories.length > 0 ? (
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
            ) : (
              <p className="empty">A carregar categorias...</p>
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
