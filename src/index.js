import React, { useState, useEffect, createContext } from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
import reportWebVitals from './reportWebVitals'

import { MantineProvider } from '@mantine/core';

import { lightTheme, darkTheme } from 'themes/default'
import Dashboard from './components/Dashboard'
import Header from './components/header/Header'

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
  }

  body {
    color: ${({ theme }) => theme.colors.default2};
    background-color: ${({ theme }) => theme.colors.default5};
  }
  
  .react-grid-item {
    background: ${({ theme }) => theme.colors.default4};
    border: 0.0625rem solid ${({ theme }) => theme.colors.default3};
    box-shadow: rgba(0, 0, 0, 0.05) 0px 0.0625rem 0.1875rem, rgba(0, 0, 0, 0.05) 0px 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.04) 0px 0.4375rem 0.4375rem -0.3125rem;

    &:hover {
      box-shadow: rgba(0, 0, 0, 0.1) 0px 0.0625rem 0.1875rem, rgba(0, 0, 0, 0.1) 0px 0.625rem 0.9375rem -0.3125rem, rgba(0, 0, 0, 0.08) 0px 0.4375rem 0.4375rem -0.3125rem;
    }
  }
  
  .react-grid-item.react-grid-placeholder {
    border-radius: 15px;
    background-color: rgb(129, 129,129);
  }

  .mantine-Modal-title,
  .mantine-Drawer-title {
    font-size: 1.2rem;
    font-weight: 600;
  }

  .mantine-Modal-inner {
    padding-left: 0px;
  }

  .mantine-Switch-track {
    width: 43px;
  }
  
  .input-range__slider,
  .input-range__track--active {
    background-color: #319df5;
    border: 0px solid #319df5;
  }

  .Toastify__toast,
  .Toastify__close-button {
    color: ${({ theme }) => theme.colors.default1};
    background-color: ${({ theme }) => theme.colors.default5};
    font-size: 1rem;
  }
`

export const ThemeContext = createContext()

const isInTimeRange = (auto_range) => {
  const now = new Date();
  const currentHour = now.getHours();
  const currentMinute = now.getMinutes();
  
  const currentTimeInMinutes = ((currentHour + 12) % 24) * 60 + currentMinute;

  const startHour = Math.floor(auto_range[0]);
  const startMinute = (auto_range[0] - startHour) * 60;
  const startTimeInMinutes = startHour * 60 + startMinute;

  const endHour = Math.floor(auto_range[1]);
  const endMinute = (auto_range[1] - endHour) * 60;
  const endTimeInMinutes = endHour * 60 + endMinute;

  if (startTimeInMinutes <= endTimeInMinutes) {
    return currentTimeInMinutes >= startTimeInMinutes && currentTimeInMinutes <= endTimeInMinutes;
  } else {
    return currentTimeInMinutes >= startTimeInMinutes || currentTimeInMinutes <= endTimeInMinutes;
  }
};

const getInitialTheme = () => {
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const savedTheme = window.localStorage.getItem('theme');

  if (savedTheme) {
    let theme = JSON.parse(savedTheme);
    if (theme.auto_type && isInTimeRange(theme.auto_range)) {
      return { ...theme, type: "dark", theme: darkTheme };
    } else if (theme.auto_type && !isInTimeRange(theme.auto_range)) {
      return { ...theme, type: "light", theme: lightTheme };
    } else {
      return theme;
    }
  } else if (prefersDarkMode) {
    return { type: "dark", theme: darkTheme };
  } else {
    return { type: "light", theme: lightTheme };
  }
};

const App = () => {
  const [userTheme, setUserTheme] = useState(getInitialTheme);

  useEffect(() => {
    window.localStorage.setItem('theme', JSON.stringify(userTheme));
  }, [userTheme]);

  return (
    <ThemeContext.Provider value={{ userTheme, setUserTheme }}>
      <ThemeProvider theme={userTheme.theme}>
        <MantineProvider theme={{ colorScheme: userTheme.type }}>
          <GlobalStyle/>
          <Header theme={userTheme} setTheme={setUserTheme}/>
          <Dashboard theme={userTheme}/>
        </MantineProvider>
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
