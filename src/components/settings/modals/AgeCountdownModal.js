import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Button, Input, Switch, Select} from '@mantine/core';

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 20px;
`
const displayOptions = [
  { value: 'years', label: 'Years only' },
  { value: 'days', label: 'Days only' },
  { value: 'secondes', label: 'Secondes only' },
  { value: 'all', label: 'All' },
]

const AgeCountdownModal = ({ isEditModalOpen, setIsEditModalOpen, widgetArray, setWidgetArray, theme }) => {
  const [newAppWidgetSettings, setNewAppWidgetSettings] = useState({
    birthdate: null,
    displayUnits: true,
    displayOnly: null,
  })

  const handleEdit = (widgetId) => {
    const tempArray = widgetArray.map(widget => {
      if (widget.i === widgetId) {
        return {
          ...widget,
          settings: newAppWidgetSettings,
        };
      }
      return widget;
    });

    setWidgetArray(tempArray)
    setIsEditModalOpen(null)
  }
  
  useEffect(() => {
    if (isEditModalOpen && isEditModalOpen.settings) {
      setNewAppWidgetSettings({
        birthdate: isEditModalOpen.settings.birthdate,
        displayUnits: isEditModalOpen.settings.displayUnits,
        displayOnly: isEditModalOpen.settings.displayOnly,
      })
    }
  }, [isEditModalOpen]);

  return (
    <>
      <br/>
      <Select
        label="Display options"
        value={newAppWidgetSettings.displayOnly}
        onChange={(e) => setNewAppWidgetSettings({...newAppWidgetSettings, displayOnly: e})}
        data={displayOptions}
        dropdownPosition="bottom"
      />
      <br/>
      <Input.Wrapper
        id="app-description"
        label="Birthdate"
      >
      <Input
        type="date"
        value={isEditModalOpen ? isEditModalOpen.settings.birthdate : ''}
        onChange={e => {
          if (new Date(e.target.value).getFullYear().toString().length === 4) {
            setNewAppWidgetSettings({...newAppWidgetSettings, birthdate: e.target.value})
          }
        }
      }/>
      </Input.Wrapper>
      <br/><br/>
      <Switch
        label="Display unit labels"
        color={theme.primary}
        checked={newAppWidgetSettings.displayUnits}
        onChange={(e) => setNewAppWidgetSettings({...newAppWidgetSettings, displayUnits: !newAppWidgetSettings.displayUnits})}
      />
      <br/>
      <ModalFooter>
        <Button
          variant='light'
          color={theme.primary}
          onClick={() => setIsEditModalOpen(null)}
        >
          Cancel
        </Button>
        <Button
          color={theme.primary}
          onClick={() => handleEdit(isEditModalOpen.i)}
          disabled={!newAppWidgetSettings.birthdate}
        >
          Save
        </Button>
      </ModalFooter>
    </>
  )
}

export default AgeCountdownModal
