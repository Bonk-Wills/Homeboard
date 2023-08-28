import styled from 'styled-components'

const StyledBurger = styled.button`
  position: absolute;
  z-index: 2;
  top: 10%;
  left: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 1.5rem;
  height: 1.5rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  &:focus {
    outline: none;
  }

  div {
    width: 1.5rem;
    height: 0.1875rem;
    background: ${({ menuIsOpen }) => menuIsOpen ? '#0D0C1D' : '#EFFFFA'};
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    :first-child {
      transform: ${({ menuIsOpen }) => menuIsOpen ? 'rotate(45deg)' : 'rotate(0)'};
    }

    :nth-child(2) {
      opacity: ${({ menuIsOpen }) => menuIsOpen ? '0' : '1'};
      transform: ${({ menuIsOpen }) => menuIsOpen ? 'translateX(20px)' : 'translateX(0)'};
    }

    :nth-child(3) {
      transform: ${({ menuIsOpen }) => menuIsOpen ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }
`

const MenuButton = ({ isOpenMenu, setIsOpenMenu }) => (
  <StyledBurger menuIsOpen={isOpenMenu} onClick={() => setIsOpenMenu(!isOpenMenu)} >
    <div />
    <div />
    <div />
  </StyledBurger>
)

export default MenuButton
