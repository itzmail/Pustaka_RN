import React, { useContext, useState } from 'react';

const ThemeContext = React.createContext();
const ThemeUpdateContext = React.createContext();

export function useTheme() {
  return useContext(ThemeContext);
}

export function useThemeUpdate() {
  return useContext(ThemeUpdateContext);
}

export function ThemeProvider({ children }) {
  const [darkTheme, setDarkTheme] = useState(true);

  function toggleTheme() {
    setDarkTheme((prevDarkTheme) => !prevDarkTheme);
  }

  return (
    <ThemeContext.Provider value={darkTheme}>
      {/* <ThemeUpdateContext.Provider value={toggleTheme}> */}
      <button onClick={toggleTheme}>Toggle Theme</button>
      {children}
      {/* </ThemeUpdateContext.Provider> */}
    </ThemeContext.Provider>
  );
}
