import React, { useState, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import reportWebVitals from './reportWebVitals'

import { lightTheme, darkTheme } from 'themes/default'
import Dashboard from './components/Dashboard'
import Header from './components/header/Header'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    background-color: ${({ theme }) => theme.colors.default1};
  }
  
  .react-grid-item {
    background: ${({ theme }) => theme.colors.default2};
    border-radius: 3px;
    box-shadow: 0 3px 1px -2px rgb(0 0 0 / 20%), 0 2px 2px 0 rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);

    &:hover {
      box-shadow: 0 5px 5px -3px rgb(0 0 0 / 20%), 0 2px 5px 0px rgb(0 0 0 / 14%), 0 1px 5px 0 rgb(0 0 0 / 12%);
    }
  }
  
  .react-grid-item.react-grid-placeholder {
    background-color: #8B8B8B;
  }
`

export const ThemeContext = createContext()

const App = () => {
  const [theme, setTheme] = useState(window.localStorage.getItem('theme') === 'dark' ? {type: "dark", theme: darkTheme} : {type: "light", theme: lightTheme})
  const [cardBgColor, setCardBgColor] = useState(window.localStorage.getItem('card-background') || 'blue')
  if (!window.localStorage.getItem('card-background')) window.localStorage.setItem('card-background', 'blue')

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={theme.theme}>
        <GlobalStyle/>
        <Header cardBgColor={cardBgColor} setCardBgColor={setCardBgColor} />
        <Dashboard cardBgColor={cardBgColor} />
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

reportWebVitals()
