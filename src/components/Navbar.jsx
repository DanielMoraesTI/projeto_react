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
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="8" height="8" rx="1.5" />
          <rect x="13" y="3" width="8" height="5" rx="1.5" />
          <rect x="13" y="10" width="8" height="11" rx="1.5" />
          <rect x="3" y="13" width="8" height="8" rx="1.5" />
        </svg>
      ),
    },
    {
      to: "/add-transaction",
      label: "Adicionar Transação",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="8" />
          <path d="M12 8v8M8 12h8" />
        </svg>
      ),
    },
    {
      to: "/history",
      label: "Histórico",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <path d="M5 4v5h5" />
          <path d="M20 11a8 8 0 1 0-2.34 5.66" />
          <path d="M12 8v4l2.5 2.5" />
        </svg>
      ),
    },
    {
      to: "/settings",
      label: "Configurações",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="3.25" />
          <path d="M19.4 15a1 1 0 0 0 .2 1.1l.1.1a1.5 1.5 0 0 1-2.1 2.1l-.1-.1a1 1 0 0 0-1.1-.2 1 1 0 0 0-.6.9V19a1.5 1.5 0 0 1-3 0v-.2a1 1 0 0 0-.6-.9 1 1 0 0 0-1.1.2l-.1.1a1.5 1.5 0 1 1-2.1-2.1l.1-.1a1 1 0 0 0 .2-1.1 1 1 0 0 0-.9-.6H5a1.5 1.5 0 0 1 0-3h.2a1 1 0 0 0 .9-.6 1 1 0 0 0-.2-1.1l-.1-.1a1.5 1.5 0 0 1 2.1-2.1l.1.1a1 1 0 0 0 1.1.2 1 1 0 0 0 .6-.9V5a1.5 1.5 0 0 1 3 0v.2a1 1 0 0 0 .6.9 1 1 0 0 0 1.1-.2l.1-.1a1.5 1.5 0 1 1 2.1 2.1l-.1.1a1 1 0 0 0-.2 1.1 1 1 0 0 0 .9.6h.2a1.5 1.5 0 0 1 0 3h-.2a1 1 0 0 0-.9.6z" />
        </svg>
      ),
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
