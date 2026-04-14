//NavBar + <Outlet />
import { Outlet, Link } from "react-router";
import Navbar from "../components/Navbar";
import { useContext, useEffect } from "react";
import { ThemeContext } from "../context/ThemeContext";


const MainLayout = () => {
  const { theme } = useContext(ThemeContext)

  useEffect(() => {
    document.body.className = theme
  }, [theme])


  return (
    <div className='app'>
      <Navbar>
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/add-transaction">Adicionar Transação</Link>
        <Link to="/history">Histórico</Link>
        <Link to="/settings">Configurações</Link>
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
