import { useState } from 'react'
import styled from 'styled-components'

import Typewriter from 'typewriter-effect'

import { bgOptions } from 'components/header/bgOptions'
import Settings from 'components/settings/Settings'
import MenuButton from './MenuButton'
import { quotes } from './quotes'

const TypewriterContainer = styled.div`
  position: absolute;
  left: 3rem;
  bottom: 2rem;
  font-size: 4vw;
  color: #fff;
  text-shadow: 0 2px 1px rgb(0 0 0 / 35%);
`

const HeaderContainer = styled.div`
  position: relative;
  width: 100%;
  background-image: ${({ option, variant }) => `linear-gradient(transparent, rgba(0, 0, 0, 0.3)), url(backgrounds/${option}_${variant}.png)`};
  background-size: cover;
  background-position: center 55%;
  height: 200px;
`

const getBackgroundVariation = () => {
  let currentHours = new Date().getHours()

  if (currentHours >= 5 && currentHours < 11) return 1
  if (currentHours >= 11 && currentHours < 17) return 2
  if (currentHours >= 17 && currentHours < 23) return 3
  else return 4
}

const shuffle = (array) => {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
  return (array)
}

const Header = ({ setCardBgColor }) => {
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
      window.localStorage.getItem('background') ? window.localStorage.getItem('background') : bgOptions[0].value
  )

  return (
    <HeaderContainer option={selectedOption} variant={getBackgroundVariation()}>
      <MenuButton
        menuIsOpen={menuIsOpen}
        setMenuIsOpen={setMenuIsOpen}
      />
      <Settings
        menuIsOpen={menuIsOpen}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        setCardBgColor={setCardBgColor}
      />

      <TypewriterContainer>
        <Typewriter
          options={{
            strings: shuffle(quotes),
            autoStart: true,
            loop: true,
            pauseFor: 2000,
            delay: 50,
          }}
        />
      </TypewriterContainer>
    </HeaderContainer>
  )
}

export default Header
