import { useState } from "react";

// O componente AddTransaction é responsável por renderizar um formulário para adicionar novas transações financeiras. Ele utiliza o hook useState para gerenciar os estados locais dos campos de descrição, valor e tipo da transação. O formulário inclui campos de entrada para a descrição e valor, bem como um seletor para escolher entre receita e despesa. Quando o formulário é submetido, a função handleSubmit é chamada, que valida os campos, chama a função onAdd passada como prop para adicionar a nova transação à lista de transações no componente pai (App), e então limpa os campos do formulário para permitir a adição de novas transações.
export function AddTransaction({ onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!description.trim() || !amount.trim()) {
      alert("Preencha os campos!");
      return;
    }

    onAdd({
      description: description.trim(),
      amount: parseFloat(amount),
      type: type,
    });

    setDescription("");
    setAmount("");
    setType("expense");
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label>Descrição</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Digite aqui a descrição da transação"
        />
      </div>

      <div className="form-group">
        <label>Valor (€)</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          // Blocks the letter 'e', which browsers allow by default in number inputs for scientific notation (e.g. 1e5)
          onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
          placeholder="00.00"
        />
      </div>

      <div className="form-group">
        <label>Tipo</label>
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="expense">Despesa</option>
          <option value="income">Receita</option>
        </select>
      </div>

      <button type="submit">Adicionar</button>
    </form>
  );
}