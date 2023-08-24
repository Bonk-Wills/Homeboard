import styled, { keyframes } from 'styled-components'

const slideDown = keyframes`
  from {
    transform: translateY(-10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`

const Container = styled.div`
  position: absolute;
  right: 1rem;
  top: 90px;
  width: 150px;
  display: ${props => (props.show ? "block" : "none")};
  animation: ${slideDown} 0.2s ease-out;
  z-index: 1;
`

const DropdownButton = styled.button`
  width: 100%;
  position: relative;
  margin-bottom: 5px;
  padding: 8px;
  border-radius: 8px;
  font-size: 16px;
  color: white;
  background-color: transparent;
  border: none;
  z-index: 1;
  animation-name: example;
  animation-duration: 1s;
  animation-fill-mode: forwards;

  &:hover {
    cursor: pointer;
    background-color: ${props => props.color};
  }
  
  @keyframes example {
    from {left: -75px; background-color: transparent;}
    to {left: 0px; background-color: red}
  }
`

const WidgetDropdown = ({ show, handleAdd }) => (
  <Container show={show}>
    <DropdownButton
      style={{animationDelay: '0s' }}
      onClick={() => handleAdd()}
      color="#000"
    >
      Widget 1
    </DropdownButton>
    <DropdownButton
      style={{ animationDelay: '0.05s' }}
      onClick={() => handleAdd()}
      color="#000"
    >
      Widget 2
    </DropdownButton>
    <DropdownButton
      style={{ animationDelay: '0.1s' }}
      onClick={() => handleAdd()}
      color="#000"
    >
      Widget 3
    </DropdownButton>
    <DropdownButton
      style={{ animationDelay: '0.15s' }}
      onClick={() => handleAdd()}
      color="#000"
    >
      Widget 4
    </DropdownButton>
    <DropdownButton
      style={{ animationDelay: '0.2s' }}
      onClick={() => handleAdd()}
      color="#000"
    >
      Widget 5
    </DropdownButton>
  </Container>
)

export default WidgetDropdown
