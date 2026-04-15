import { useContext } from "react";
import { PreferencesContext } from "../context/PreferencesContext";
import { ThemeContext } from "../context/ThemeContext";

const CURRENCIES = [
  { code: "EUR", label: "Euro (€)" },
  { code: "USD", label: "Dólar Americano ($)" },
  { code: "GBP", label: "Libra Esterlina (£)" },
];

function Settings() {
  const { currency, setCurrency, userName, setUserName } = useContext(PreferencesContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <section className="app">
      <header>
        <h1>Configurações</h1>
      </header>
      <main>
        <div className="settings-container">
          <div className="card">
            <h2>Nome de utilizador</h2>
            <input
              className="settings-input"
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Escreve o teu nome!"
            />
          </div>
          <div className="card">
            <h2>Moeda preferida</h2>
            <select
              className="settings-select"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
            >
              {CURRENCIES.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
          <div className="card">
            <h2>Tema (Claro/Escuro)</h2>
            <div className="toggle-wrapper">
              <img className="toggle-icon" src="/sun.svg" alt="Modo claro" />
              <label className="toggle-switch">
                <input
                  type="checkbox"
                  checked={theme === "escuro"}
                  onChange={toggleTheme}
                />
                <span className="toggle-slider" />
              </label>
              <img className="toggle-icon" src="/moon.svg" alt="Modo escuro" />
            </div>
          </div>
        </div>
      </main>
    </section>
  );
}

export default Settings;
