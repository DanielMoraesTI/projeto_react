import { useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import { ThemeContext } from "../context/ThemeContext";

const CURRENCIES = [
  { code: "EUR", label: "Euro (€)" },
  { code: "USD", label: "Dólar Americano ($)" },
  { code: "GBP", label: "Libra Esterlina (£)" },
];

function Settings() {
  const { currency, setCurrency } = useContext(PreferencesContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <section className="app">
      <header>
        <h1>Configurações</h1>
      </header>
      <main>
        <div className="card">
          <h2>Moeda preferida</h2>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.label}
              </option>
            ))}
          </select>
          <h2>Tema</h2>
        <button onClick={() => toggleTheme(theme === 'claro' ? 'escuro' : 'claro')}>
          Mudar para {theme === 'claro' ? '🌙 Escuro' : '☀️ Claro'}
        </button>
        </div>
      </main>
    </section>
  );
}

export default Settings;
