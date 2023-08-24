import { useContext } from 'react'
import styled from 'styled-components'

import { bgOptions } from 'components/header/bgOptions'
import { cardBgOptions } from './cardBgOptions'
import { ThemeContext } from 'index'
import { lightTheme, darkTheme } from 'themes/default'

const SettingsContainer = styled.aside`
  position: absolute;
  top: 0;
  left: ${({ menuIsOpen }) => menuIsOpen ? '0' : '-100%'};
  width: 25%;
  height: 100vh;
  background: ${({ theme }) => theme.colors.default6};
  padding: 30px;
  transition: all 0.3s;
  z-index: 1;
`

const ThemeButton = styled.button`
  border-radius: 20px;
  padding: 10px;
  color: ${({ variant }) => variant === 'dark' ? 'white' : 'black'};
  background-color: ${({ theme }) => theme.colors.default1};
  z-index: 1;
`

const Settings = ({ menuIsOpen, selectedOption, setSelectedOption, setCardBgColor }) => {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <SettingsContainer menuIsOpen={menuIsOpen}>
      <br />
      <br />
      <ThemeButton
        variant={theme.type}
        onClick={() => {
          window.localStorage.setItem('theme', theme.type === "dark" ? 'white' : 'dark');
          setTheme(theme.type === "dark" ?
            {type: "light", theme: lightTheme} : {type: "dark", theme: darkTheme})
        }}
      >
        Dark mode
      </ThemeButton>
      <br />
      <br />
      <p>Background</p>
      <div>
        <select
          value={selectedOption}
          onChange={e => {
            window.localStorage.setItem('background', e.target.value);
            setSelectedOption(e.target.value)
          }}
        >
          {bgOptions.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <br />
      <br />
      <p>Card background  </p>
      <div>
        <select
          value={window.localStorage.getItem('card-background')}
          onChange={e => {
            window.localStorage.setItem('card-background', e.target.value)
            setCardBgColor(e.target.value)
          }}
        >
          {cardBgOptions.map(option => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </SettingsContainer>
  )
}

export default Settings
