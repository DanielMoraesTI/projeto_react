//NavBar + <Outlet />
import { Outlet, Link } from "react-router";
import Navbar from "../components/Navbar";
// import { useContext } from 'react'
// import { ThemeContext } from '../context/ThemeContext'

const MainLayout = () => {
  // Temporariamente desativado até o ThemeContext ser implementado.
  // const { theme, toggleTheme } = useContext(ThemeContext);

  return (
    <div className="app"> {/*<div className={`app ${theme}`}>*/}
      <Navbar>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-transaction">Adicionar Transação</Link>
        <Link to="/history">Histórico</Link>
        <Link to="/settings">Configurações</Link>
        {/*
                <button onClick={toggleTheme}>
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
                */}
      </Navbar>
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
