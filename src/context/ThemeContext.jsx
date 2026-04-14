//dark/light mode
import { createContext, useState } from 'react'

export const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('claro')

  function toggleTheme() {
    setTheme(prev => prev === 'claro' ? 'escuro' : 'claro')
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}