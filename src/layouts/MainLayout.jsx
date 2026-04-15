//NavBar + <Outlet />
import { Outlet, Link } from "react-router";
import Navbar from "../components/Navbar";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";
import { PreferencesContext } from "../context/PreferencesContext";


const MainLayout = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { userName } = useContext(PreferencesContext);

  useEffect(() => {
    document.body.className = theme
  }, [theme])


  return (
    <div className='app'>
      <label className="theme-toggle">
        <input
          type="checkbox"
          checked={theme === 'escuro'}
          onChange={toggleTheme}
        />
        <span className="theme-toggle-track">
          <img className="theme-toggle-sun" src="/sun.svg" alt="Modo claro" />
          <img className="theme-toggle-moon" src="/moon.svg" alt="Modo escuro" />
        </span>
      </label>
      <Navbar>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-transaction">Adicionar Transação</Link>
        <Link to="/history">Histórico</Link>
        <Link to="/settings">Configurações</Link>
      </Navbar>
      {userName && (
        <div className="summary-greeting">
          <p>Olá, {userName}! Vamos a contas?</p>
        </div>
      )}
      <main>
        <Outlet />
      </main>
      <footer className="app-footer">
        &#169; 2026 Grupo Pangéia. Projeto React M6.
      </footer>
    </div>
  );
};

export default MainLayout;
