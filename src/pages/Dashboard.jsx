import { useQuery } from "@tanstack/react-query";
import { useReducer } from "react";
import { Link } from "react-router";
import { getTransactions, getCategories } from "../api";
import { Summary } from "../components/Summary";
import { TransactionList } from "../components/TransactionList";
import DateRangePicker from "../components/DateRangePicker";
import CategoryFilter from "../components/CategoryFilter";

function startOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
}

function today() {
  return new Date().toISOString().split("T")[0];
}

const initialState = {
  startDate: startOfMonth(),
  endDate: today(),
  activeCategories: [],
};

function filtersReducer(state, action) {
  switch (action.type) {
    case "SET_DATE_RANGE":
      return { ...state, startDate: action.start, endDate: action.end };
    case "TOGGLE_CATEGORY": {
      const isSelected = state.activeCategories.includes(action.category);
      return {
        ...state,
        activeCategories: isSelected
          ? state.activeCategories.filter((slug) => slug !== action.category)
          : [...state.activeCategories, action.category],
      };
    }
    case "CLEAR_CATEGORIES":
      return { ...state, activeCategories: [] };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function Dashboard() {
  const [filters, dispatch] = useReducer(filtersReducer, initialState);

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
        <h1>Controle Financeiro</h1>
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

        <Summary balance={balance} income={income} expense={expense} />

        <div className="dashboard-recent-header">
          <h2>Transações Recentes</h2>
          <Link to="/history" className="dashboard-history-link">
            Ver histórico completo
          </Link>
        </div>

        <TransactionList
          transactions={transactions.slice(0, 10)}
          categories={categories}
          onDelete={() => {}}
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

export default Dashboard;
