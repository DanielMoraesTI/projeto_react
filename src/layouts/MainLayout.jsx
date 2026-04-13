//NavBar + <Outlet />
import { Outlet, Link } from 'react-router'
import Navbar from '../components/Navbar'

const MainLayout = () => {
    return (
        <div>
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
}

export default MainLayout;