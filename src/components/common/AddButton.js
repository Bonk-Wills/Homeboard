import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Modal } from '@mantine/core';
import { IconCube, IconLayoutGridAdd, IconBrowser, IconCirclePlus } from '@tabler/icons-react';

import AddApps from './AddApps';
import AddWidgets from './AddWidgets';

const FloatingButton = styled.button`
  font-size: 1.2rem;
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
`

const Shadow = styled.div`
  position: absolute;
  right: 8rem;
  top: 175px;
  z-index: 2;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%);
`

const SubTitle = styled.div`
  font-size: 1.1rem;
  font-weight: normal;
  color: #868e96;
`

const NewCardsContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`

const NewCard = styled.div`
  cursor: pointer;
  padding: 1.2rem 0px;
  font-size: 1rem;
  text-align: center;
  width: 100%;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.theme.colors.default1};
  background: ${({ theme }) => theme.type === 'dark' ? '#212529' : '#e9ecef'};

  &:hover {
    background-color: ${({ theme }) => theme.theme.colors.default3};
  }
`
const NewCardName = styled.div`
  margin-top: 10px;
`

const CustomIconCube = styled(IconCube)`
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`

const CustomIconLayoutGridAdd = styled(IconLayoutGridAdd)`
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`

const CustomIconBrowser = styled(IconBrowser)`
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.2);
  }
`

const AddButton = ({ isModalOpen, setIsModalOpen, handleAdd, theme }) => {
  const [isSelected, setIsSelected] = useState(null)
  
  useEffect(() => {
    setIsSelected(null)
  }, [isModalOpen])

  return (
    <>
      <Modal
        opened={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={(!isSelected || isSelected === 'widgets') ? 'Add a new card' : ''}
        size="xl"
      >
        {!isSelected && (
          <>
            <SubTitle>
              Cards are the main element of HomeBoard. They are used to display your apps and other information.
              You can add as many cards as you want.
            </SubTitle>
            <br/>
            <NewCardsContainer>
              <NewCard onClick={() => setIsSelected('apps')} theme={theme}>
                <CustomIconBrowser size="1.9rem"/>
                <NewCardName>Apps</NewCardName>
              </NewCard>
              <NewCard onClick={() => setIsSelected('widgets')} theme={theme}>
                <CustomIconLayoutGridAdd size="1.9rem"/>
                <NewCardName>Widgets</NewCardName>
              </NewCard>
              <NewCard /*onClick={() => setIsSelected('devs')}*/ style={{ cursor: 'not-allowed'}} theme={theme}>
                <CustomIconCube size="1.9rem"/>
                <NewCardName>Devs</NewCardName>
              </NewCard>
            </NewCardsContainer>
          </>
        )}
        {isSelected === 'apps' && <AddApps setIsSelected={setIsSelected} handleAdd={handleAdd} theme={theme}/>}
        {isSelected === 'widgets' && <AddWidgets setIsSelected={setIsSelected} handleAdd={handleAdd} theme={theme}/>}
        {isSelected === 'devs' && null}
      </Modal>

      <Shadow>
        <FloatingButton onClick={() => setIsModalOpen(!isModalOpen)}>
          <IconCirclePlus style={{ marginTop: '3px' }} />
        </FloatingButton>
      </Shadow>
    </>
  )
}

export default AddButton
