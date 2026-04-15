import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import { getTransactions, getCategories, deleteTransaction } from "../api";
import { Summary } from "../components/Summary";
import { TransactionList } from "../components/TransactionList";
import DateRangePicker from "../components/DateRangePicker";
import CategoryFilter from "../components/CategoryFilter";
import { PreferencesContext } from "../context/PreferencesContext";

function History() {
  const { filters, dispatchFilters: dispatch } = useContext(PreferencesContext);
  const queryClient = useQueryClient();

  const {
    data: allTransactions = [],
    isLoading: isLoadingTransactions,
    isError: isErrorTransactions,
  } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactions,
  });

  const {
    data: categories = [],
    isLoading: isLoadingCategories,
    isError: isErrorCategories,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  const deleteMutation = useMutation({
    mutationFn: deleteTransaction,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["transactions"] }),
  });

  const transactions = allTransactions
    .filter((t) => {
      const date = new Date(t.date);
      const afterStart =
        !filters.startDate || date >= new Date(filters.startDate);
      const beforeEnd = !filters.endDate || date <= new Date(filters.endDate);
      const matchesCategory =
        filters.activeCategories.length === 0 ||
        filters.activeCategories.includes(t.category);
      return afterStart && beforeEnd && matchesCategory;
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = income - expense;

  if (isLoadingTransactions || isLoadingCategories) {
    return <p className="empty">A carregar...</p>;
  }

  if (isErrorTransactions || isErrorCategories) {
    return <p className="empty">Erro ao carregar dados.</p>;
  }

  return (
    <section className="app">
      <header>
        <h1>Histórico</h1>
      </header>

      <main>
        <DateRangePicker
          startDate={filters.startDate}
          endDate={filters.endDate}
          onDateChange={(start, end) =>
            dispatch({ type: "SET_DATE_RANGE", start, end })
          }
        />

        <CategoryFilter
          categories={categories}
          activeCategories={filters.activeCategories}
          onCategoryToggle={(category) =>
            dispatch({ type: "TOGGLE_CATEGORY", category })
          }
          onClearCategories={() => dispatch({ type: "CLEAR_CATEGORIES" })}
        />

        <TransactionList
          transactions={transactions}
          categories={categories}
          onDelete={(id) => deleteMutation.mutate(id)}
        />

        <button
          type="button"
          className="dashboard-reset-btn"
          onClick={() => dispatch({ type: "RESET" })}
        >
          Limpar filtros
        </button>
      </main>
    </section>
  );
}

export default History;
