// context/PreferencesContext.jsx - moeda, nome do utilizador e filtros de transações
import { createContext, useState, useEffect, useReducer } from 'react'

export const PreferencesContext = createContext()

function startOfMonth() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), 1)
    .toISOString()
    .split("T")[0];
}

function today() {
  return new Date().toISOString().split("T")[0];
}

const initialFilters = {
  startDate: startOfMonth(),
  endDate: today(),
  activeCategories: [],
};

function filtersReducer(state, action) {
  switch (action.type) {
    case "SET_DATE_RANGE":
      return { ...state, startDate: action.start, endDate: action.end };
    case "TOGGLE_CATEGORY": {
      const isSelected = state.activeCategories.includes(action.category);
      return {
        ...state,
        activeCategories: isSelected
          ? state.activeCategories.filter((slug) => slug !== action.category)
          : [...state.activeCategories, action.category],
      };
    }
    case "CLEAR_CATEGORIES":
      return { ...state, activeCategories: [] };
    case "RESET":
      return initialFilters;
    default:
      return state;
  }
}

export function PreferencesProvider({ children }) {
  const [currency, setCurrency] = useState(() => {
    return localStorage.getItem('currency') || 'EUR'
  })

  const [userName, setUserName] = useState(() => {
    return localStorage.getItem('userName') || ''
  })

  const [filters, dispatchFilters] = useReducer(filtersReducer, initialFilters)

  // Cada valor tem o seu próprio useEffect
  useEffect(() => {
    localStorage.setItem('currency', currency)
  }, [currency])

  useEffect(() => {
    localStorage.setItem('userName', userName)
  }, [userName])

  return (
    <PreferencesContext.Provider value={{ currency, setCurrency, userName, setUserName, filters, dispatchFilters }}>
      {children}
    </PreferencesContext.Provider>
  )
}