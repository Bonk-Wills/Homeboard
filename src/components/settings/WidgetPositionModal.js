import { useState, useEffect } from 'react';
import styled from 'styled-components';

import { Button, Modal, NumberInput } from '@mantine/core';

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 20px;
`

const InputsContainer = styled.div`
  display: flex;
  gap: 15px;
`

const WidgetPositionModal = ({ isPositionModalOpen, setIsPositionModalOpen, widgetArray, setWidgetArray, theme }) => {
  const [newWidgetPosition, setNewWidgetPosition] = useState({})

  const onSave = () => {
    const tempArray = widgetArray.map(widget => {
      if (widget.i === isPositionModalOpen.i) {
        return {
          ...newWidgetPosition
        };
      }
      return widget;
    });

    setWidgetArray(tempArray)
    setIsPositionModalOpen(null)
  }

  useEffect(() => {
    isPositionModalOpen && setNewWidgetPosition(isPositionModalOpen)
  }, [isPositionModalOpen])

  return (
    <Modal
      opened={isPositionModalOpen}
      onClose={() => setIsPositionModalOpen(null)}
      size="xl"
    >
      <InputsContainer>
        <NumberInput
          label="X-axis position"
          description="0 or higher"
          value={newWidgetPosition ? newWidgetPosition.x : 0}
          onChange={(e) => setNewWidgetPosition((prevState) => ({...prevState, x: e}))}
          style={{ width: '100%'}}
          max={10}
          min={0}
        />
        <NumberInput
          label="Y-axis position"
          description="0 or higher"
          value={newWidgetPosition ? newWidgetPosition.y : 0}
          onChange={(e) => setNewWidgetPosition((prevState) => ({...prevState, y: e}))}
          style={{ width: '100%'}}
          max={10}
          min={0}
        />
      </InputsContainer>
      <br/>
      <InputsContainer>
        <NumberInput
          label="Width"
          description="2 or higher"
          value={newWidgetPosition ? newWidgetPosition.w : 2}
          onChange={(e) => setNewWidgetPosition((prevState) => ({...prevState, w: e}))}
          style={{ width: '100%'}}
          min={2}
        />
        <NumberInput
          label="Height"
          description="1 or higher"
          value={newWidgetPosition ? newWidgetPosition.h : 1}
          onChange={(e) => setNewWidgetPosition((prevState) => ({...prevState, h: e}))}
          style={{ width: '100%'}}
          min={1}
        />
      </InputsContainer>
      <ModalFooter>
        <Button
          variant='light'
          color={theme.primary}
          onClick={() => setIsPositionModalOpen(null)}
        >
          Cancel
        </Button>
        <Button
          color={theme.primary}
          onClick={() => onSave()}
        >
          Save
        </Button>
      </ModalFooter>
    </Modal>
  )
}

export default WidgetPositionModal
