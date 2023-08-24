import { useState } from 'react'
import styled from 'styled-components'

import { PlusOutlined } from '@ant-design/icons';
import WidgetDropdown from '../common/WidgetDropdown'

const FloatingButton = styled.button`
  font-size: 1.2rem;
  transition: transform .2s, font-size 0.7s;
  transition-timing-function: ease;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  border-style: none;
  background-color: #2196f3;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: #319df5;
  }
  
  &.opened {
    transform: rotate(45deg);
    font-size: 1.5rem;
  }
`

const Shadow = styled.div`
  position: absolute;
  right: 4rem;
  top: 175px;
  z-index: 2;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%);
`

const AddButton = ({ handleAdd }) => {
  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <Shadow>
      <FloatingButton
        className={showDropdown ? 'opened' : ''}
        onClick={() => setShowDropdown(!showDropdown)}
      >
        <div>
          <PlusOutlined />
        </div>
      </FloatingButton>
      <WidgetDropdown show={showDropdown} handleAdd={handleAdd}/>
    </Shadow>
  )
}

export default AddButton
