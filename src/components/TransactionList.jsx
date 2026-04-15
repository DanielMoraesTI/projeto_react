import { TransactionItem } from "./TransactionItem";

// O componente TransactionList recebe a lista de transações e a função de delete como props. Ele renderiza um título "Transações" e, em seguida, verifica se a lista de transações está vazia. Se estiver vazia, exibe uma mensagem indicando que nenhuma transação foi registrada. Caso contrário, ele mapeia sobre a lista de transações e renderiza um componente TransactionItem para cada transação, passando os dados da transação e a função de delete como props. Cada TransactionItem é identificado por um ID único para garantir que o React possa gerenciar a renderização de forma eficiente.
export function TransactionList({ transactions, categories = [], onDelete }) {
  return (
    <div className="transaction-list">
      <h2>Transações</h2>
      {transactions.length === 0 ? (
        <p className="empty">Nenhuma transação registrada</p>
      ) : (
        transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            categories={categories}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}
