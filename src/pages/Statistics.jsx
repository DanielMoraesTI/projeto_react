import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import { useQuery } from "@tanstack/react-query";
import { useContext, useState } from "react";
import { getTransactions, getCategories } from "../api";
import DateRangePicker from "../components/DateRangePicker";
import CategoryFilter from "../components/CategoryFilter";
import { PreferencesContext } from "../context/PreferencesContext";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, Title);

const COLORS = [
  'rgba(255, 99, 132, 0.7)',
  'rgba(54, 162, 235, 0.7)',
  'rgba(255, 206, 86, 0.7)',
  'rgba(75, 192, 192, 0.7)',
  'rgba(153, 102, 255, 0.7)',
  'rgba(255, 159, 64, 0.7)',
  'rgba(199, 199, 199, 0.7)',
  'rgba(83, 102, 255, 0.7)',
  'rgba(255, 99, 255, 0.7)',
  'rgba(99, 255, 132, 0.7)',
];

export function Statistics() {
  const { filters, dispatchFilters } = useContext(PreferencesContext);
  const [chartType, setChartType] = useState("pie");

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

  const transactions = allTransactions.filter((t) => {
    const date = new Date(t.date);
    const afterStart = !filters.startDate || date >= new Date(filters.startDate);
    const beforeEnd = !filters.endDate || date <= new Date(filters.endDate);
    const matchesCategory =
      filters.activeCategories.length === 0 ||
      filters.activeCategories.includes(t.category);
    return afterStart && beforeEnd && matchesCategory;
  });

  // Pie: expenses grouped by category
  const expensesByCategory = transactions
    .filter((t) => t.amount < 0)
    .reduce((acc, t) => {
      const label =
        categories.find((c) => c.slug === t.category)?.name ?? t.category ?? "Outros";
      acc[label] = (acc[label] || 0) + Math.abs(t.amount);
      return acc;
    }, {});

  const pieData = {
    labels: Object.keys(expensesByCategory),
    datasets: [
      {
        data: Object.values(expensesByCategory),
        backgroundColor: COLORS.slice(0, Object.keys(expensesByCategory).length),
        borderWidth: 1,
      },
    ],
  };

  // Bar: income vs expenses grouped by month
  const byMonth = transactions.reduce((acc, t) => {
    const month = t.date.slice(0, 7); // "YYYY-MM"
    if (!acc[month]) acc[month] = { income: 0, expense: 0 };
    if (t.amount > 0) acc[month].income += t.amount;
    else acc[month].expense += Math.abs(t.amount);
    return acc;
  }, {});

  const sortedMonths = Object.keys(byMonth).sort();

  const barData = {
    labels: sortedMonths.map((m) => {
      const [year, month] = m.split("-");
      return new Date(year, month - 1).toLocaleString("pt-PT", { month: "short", year: "numeric" });
    }),
    datasets: [
      {
        label: "Receitas",
        data: sortedMonths.map((m) => byMonth[m].income),
        backgroundColor: "rgba(75, 192, 192, 0.7)",
        borderWidth: 1,
        grouped: true,
      },
      {
        label: "Despesas",
        data: sortedMonths.map((m) => byMonth[m].expense),
        backgroundColor: "rgba(255, 99, 132, 0.7)",
        borderWidth: 1,
        grouped: true,
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  const isEmpty =
    chartType === "pie"
      ? Object.keys(expensesByCategory).length === 0
      : sortedMonths.length === 0;

  if (isLoadingTransactions || isLoadingCategories) {
    return <p className="empty">A carregar...</p>;
  }

  if (isErrorTransactions || isErrorCategories) {
    return <p className="empty">Erro ao carregar dados.</p>;
  }

  return (
    <section className="app">
      <header>
        <h1>Estatísticas</h1>
      </header>

      <main>
        <DateRangePicker
          startDate={filters.startDate}
          endDate={filters.endDate}
          onDateChange={(start, end) =>
            dispatchFilters({ type: "SET_DATE_RANGE", start, end })
          }
        />

        <CategoryFilter
          categories={categories}
          activeCategories={filters.activeCategories}
          onCategoryToggle={(category) =>
            dispatchFilters({ type: "TOGGLE_CATEGORY", category })
          }
          onClearCategories={() => dispatchFilters({ type: "CLEAR_CATEGORIES" })}
        />

        <div className="statistics-type-filter">
          <button
            type="button"
            className={`chart-type-btn${chartType === "pie" ? " active" : ""}`}
            onClick={() => setChartType("pie")}
          >
            Despesas por Categoria
          </button>
          <button
            type="button"
            className={`chart-type-btn${chartType === "bar" ? " active" : ""}`}
            onClick={() => setChartType("bar")}
          >
            Receitas vs Despesas
          </button>
        </div>

        {isEmpty ? (
          <p className="empty">Sem dados no período selecionado.</p>
        ) : (
          <div className="statistics-chart">
            {chartType === "pie" ? (
              <Pie data={pieData} />
            ) : (
              <Bar data={barData} options={barOptions} />
            )}
          </div>
        )}

        <button
          type="button"
          className="dashboard-reset-btn"
          onClick={() => dispatchFilters({ type: "RESET" })}
        >
          Limpar filtros
        </button>
      </main>
    </section>
  );
}
