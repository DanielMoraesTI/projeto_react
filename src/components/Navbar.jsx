import { NavLink } from "react-router";

const Navbar = () => {
    return (
        <nav className="navbar">
            <ul>
                <li>
                    <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
                        Dashboard
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/add-transaction" className={({ isActive }) => isActive ? "active" : ""}>
                        Adicionar Transação
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/history" className={({ isActive }) => isActive ? "active" : ""}>
                        Histórico
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/settings" className={({ isActive }) => isActive ? "active" : ""}>
                        Configurações
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;