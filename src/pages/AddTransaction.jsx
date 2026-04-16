import AddTransactionForm from "../components/AddTransaction";

export default function AddTransaction() {
  return (
    <section className="app">
      <header>
        <h1>Adicionar Transação</h1>
      </header>
      <main>
        <AddTransactionForm />
      </main>
    </section>
  );
}
