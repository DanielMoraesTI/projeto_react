import { useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";

// O componente Summary recebe os valores de balance, income e expense como props. Ele renderiza um resumo financeiro, exibindo o saldo atual, total de receitas e total de despesas. O saldo é formatado com duas casas decimais e a cor do valor é definida como verde para saldos positivos e vermelho para saldos negativos. As receitas e despesas também são formatadas com duas casas decimais e exibidas em cores correspondentes (verde para receitas e vermelho para despesas). O layout é organizado em uma estrutura de cartões para destacar as informações financeiras.

export function Summary({ balance, income, expense, typeFilter, onTypeFilter }) {
  const { currency } = useContext(PreferencesContext);

  const format = (value) =>
    new Intl.NumberFormat("pt-PT", { style: "currency", currency }).format(
      value,
    );

  return (
    <>
      <div className="summary">
        <div className="card summary-main-card">
          <h3>Saldo Atual</h3>
          <p className={balance >= 0 ? "positive" : "negative"}>
            {format(balance)}
          </p>
        </div>

        <div className="summary-secondary-cards">
          <button
            type="button"
            className={`card summary-filter-btn${typeFilter === "income" ? " active" : ""}`}
            onClick={() => onTypeFilter?.("income")}
          >
            <h3>Total de Receitas</h3>
            <p className="positive">{format(income)}</p>
          </button>

          <button
            type="button"
            className={`card summary-filter-btn${typeFilter === "expense" ? " active" : ""}`}
            onClick={() => onTypeFilter?.("expense")}
          >
            <h3>Total de Despesas</h3>
            <p className="negative">{format(expense)}</p>
          </button>
        </div>
      </div>
    </>
  );
}
