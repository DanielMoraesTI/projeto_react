import { useState, useEffect } from 'react';
import {AddTransaction} from './components/AddTransaction';
import {Summary} from './components/Summary';
import {TransactionList} from './components/TransactionList';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import './styles/App.css'
import data from './expense-api/data/transactions.json'


function App() {
  const [transactions, setTransactions] = useState(data.transactions);

  // Calcular valores tanto soma de receitas, despesas e saldo
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = income - expense;

  // Adicionar transação onde é gerado um ID único, a data atual e os dados da transação vinda do formulário de adição de transação. A nova transação é adicionada no início da lista de transações para que apareça primeiro.
  const handleAdd = ({ description, amount, type }) => {
    const newTransaction = {
      id: Math.max(...transactions.map((t) => t.id), 0) + 1,
      description,
      amount,
      type,
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

      <footer className="app-footer">
        &#169; 2026 Grupo Pangéia. Projeto React M6. 
      </footer>
      <ReactQueryDevtools initialIsOpen={false} />
    </div>
  )
}

export default App
