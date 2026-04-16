import { useEffect, useState } from "react";
import { NavLink } from "react-router";

const Navbar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(window.scrollY / 180, 1);
      setScrollProgress(progress);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    {
      to: "/",
      label: "Dashboard",
      icon: <img src="/homepage.svg" alt="Dashboard" aria-hidden="true" />,
    },
    {
      to: "/add-transaction",
      label: "Adicionar Transação",
      icon: <img src="/add-button.svg" alt="Adicionar Transação" aria-hidden="true" />,
    },
    {
      to: "/history",
      label: "Histórico",
      icon: <img src="/history.svg" alt="Histórico" aria-hidden="true" />,
    },
    {
      to: "/statistics",
      label: "Estatísticas",
      icon: <img src="/statistics.svg" alt="Estatísticas" aria-hidden="true" />,
    },
    {
      to: "/settings",
      label: "Configurações",
      icon: <img src="/settings.svg" alt="Configurações" aria-hidden="true" />,
    },
  ];

  return (
    <nav
      className={`navbar${scrollProgress > 0.05 ? " is-scrolled" : ""}`}
      style={{ "--nav-scroll": scrollProgress }}
    >
      <ul>
        {navItems.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <span className="navbar-icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
