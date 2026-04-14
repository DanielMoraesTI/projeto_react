// O componente TransactionItem recebe os dados de uma transação e a função de delete como props. Ele determina se a transação é uma receita ou despesa com base no tipo e renderiza as informações da transação, incluindo a descrição, data e valor formatado. O valor é exibido com um sinal de "+" para receitas e "-" para despesas, e a cor do valor é definida como verde para receitas e vermelho para despesas. Além disso, há um botão de delete que, quando clicado, chama a função onDelete passando o ID da transação para remover a transação correspondente da lista.

export function TransactionItem({ transaction, onDelete }) {
  const isIncome = transaction.amount > 0;
  const displayAmount = Math.abs(transaction.amount);

  return (
    <div className={`transaction-item ${isIncome ? "income" : "expense"}`}>
      <div className="transaction-info">
        <p className="description">{transaction.description}</p>
        <p className="date">{transaction.date}</p>
      </div>

      <div className="transaction-amount">
        <span className={isIncome ? "positive" : "negative"}>
          {isIncome ? "+" : "-"}€{displayAmount.toFixed(2)}
        </span>
        <button
          className="delete-btn"
          onClick={() => onDelete(transaction.id)}
        >
          &times;
        </button>
      </div>
    </div>
  );
}
