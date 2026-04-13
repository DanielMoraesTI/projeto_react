import { useState } from "react";
import AddTransaction from "./components/AddTransaction";
import { Summary } from "./components/Summary";
import { TransactionList } from "./components/TransactionList";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import "./styles/App.css";
import data from "./expense-api/data/transactions.json";

function App() {
  const [transactions, setTransactions] = useState(data.transactions);

  // Calcular valores tanto soma de receitas, despesas e saldo
  const income = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = income - expense;

  // Adicionar transação onde é gerado um ID único, a data atual e os dados da transação vinda do formulário de adição de transação. A nova transação é adicionada no início da lista de transações para que apareça primeiro.
  const handleAdd = ({ description, amount }) => {
    const newTransaction = {
      id: Math.max(...transactions.map((t) => t.id), 0) + 1,
      description,
      amount,
      date: new Date().toISOString().split("T")[0],
    };
    setTransactions([newTransaction, ...transactions]);
  };

  // Apagar transação com base no ID, onde a função de delete é passada para o componente TransactionList e depois para cada TransactionItem. Quando o botão de delete é clicado, a função handleDelete é chamada com o ID da transação a ser removida, e a lista de transações é atualizada para excluir a transação correspondente.
  const handleDelete = (id) => {
    setTransactions(transactions.filter((t) => t.id !== id));
  };

  return (
    <div className="app">
      <header>
        <h1>Gestão Financeira</h1>
      </header>

      <main>
        <Summary balance={balance} income={income} expense={expense} />
        <AddTransaction onAdd={handleAdd} />
        <TransactionList transactions={transactions} onDelete={handleDelete} />
      </main>


      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  );
}

export default App;

// O componente App é o componente principal da aplicação de gestão financeira. Ele gerencia o estado das transações financeiras usando o hook useState, onde as transações iniciais são carregadas a partir de um arquivo JSON. O componente calcula o total de receitas, despesas e saldo com base nas transações atuais. Ele também define funções para adicionar novas transações e deletar transações existentes, que são passadas como props para os componentes filhos. O App renderiza um resumo financeiro, um formulário para adicionar novas transações e uma lista de transações, além de incluir as ferramentas de desenvolvimento do React Query para facilitar a depuração.  
