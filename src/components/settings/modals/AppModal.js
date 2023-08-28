import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Button, Tabs, Input, Switch, Select, Image, Tooltip } from '@mantine/core';
import {
  IconClick,
  IconAccessPoint,
  IconAdjustmentsAlt,
  IconBrush,
  IconCursorText,
  IconLink,
  IconInfoCircle
} from '@tabler/icons-react';

const appNamePositions = [
  { value: 'top', label: 'Top' },
  { value: 'bottom', label: 'Bottom' },
  { value: 'left', label: 'Left' },
  { value: 'right', label: 'Right' },
]

const AppTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 30px;
`

const ModalHeader = styled.div`
  display: block;
  align-items: center;
  text-align: -webkit-center;
  margin: 0 auto;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 20px;
`

const AppModal = ({ isEditModalOpen, setIsEditModalOpen, widgetArray, setWidgetArray, theme }) => {
  const [isFormValid, setIsFormValid] = useState(false)
  const [newAppWidgetSettings, setNewAppWidgetSettings] = useState({
    widgetName: '',
    appIcon: '',
    internalAddress: '',
    externalAddress: '',
    AppNamePosition: '',
    description: '',
    statusChecker: false,
    newTab: false,
  })

  const handleSave = (widgetId) => {
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
    if (newAppWidgetSettings.widgetName === '' ||
      newAppWidgetSettings.appIcon === '' ||
      !newAppWidgetSettings.internalAddress.startsWith("https://") ||
      newAppWidgetSettings.externalAddress === '')
      setIsFormValid(false)
    else
    setIsFormValid(true)
  }, [newAppWidgetSettings])

  useEffect(() => {
    if (isEditModalOpen && isEditModalOpen.settings) {
      setNewAppWidgetSettings({
        widgetName: isEditModalOpen.settings.widgetName,
        appIcon: isEditModalOpen.settings.appIcon,
        internalAddress: isEditModalOpen.settings.internalAddress,
        externalAddress: isEditModalOpen.settings.externalAddress,
        AppNamePosition: isEditModalOpen.settings.AppNamePosition,
        description: isEditModalOpen.settings.description,
        statusChecker: isEditModalOpen.settings.statusChecker,
        newTab: isEditModalOpen.settings.newTab,
      })
    }
  }, [isEditModalOpen]);

  return (
    <>
      <ModalHeader>
        <Image
          width={110}
          height={110}
          style={{ margin: '20px 0 20px 0' }}
          src={newAppWidgetSettings.appIcon}
          withPlaceholder
        />
        <AppTitle>{newAppWidgetSettings.widgetName}</AppTitle>
      </ModalHeader>
      <Tabs defaultValue="common" color={theme.primary}>
        <Tabs.List grow>
          <Tabs.Tab value="common" icon={<IconAdjustmentsAlt size={16}/>}>Common</Tabs.Tab>
          <Tabs.Tab value="behavior" icon={<IconClick size={16}/>}>Behavior</Tabs.Tab>
          <Tabs.Tab value="appearance" icon={<IconBrush size={16}/>}>Appearance</Tabs.Tab>
          <Tabs.Tab value="network" icon={<IconAccessPoint size={16}/>}>Network</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="common" pt="xs">
          <br/>
          <Input.Wrapper
            id="app-name"
            label="App Name"
            description="Used to display the app on the dashboard."
            withAsterisk
            error={newAppWidgetSettings.widgetName === '' ? "Could not be blank" : ''}
          >
            <Input
              value={newAppWidgetSettings.widgetName}
              icon={<IconCursorText size={14}/>}
              onChange={(e) => setNewAppWidgetSettings({...newAppWidgetSettings, widgetName: e.target.value})}
            />
          </Input.Wrapper>
          <br/>
          <Input.Wrapper
            id="int-address"
            label="Internal Address"
            description="Internal IP-address of the app."
            error={newAppWidgetSettings.internalAddress.startsWith("https://") ? '' : 'Please enter a valid https URL.'}
            withAsterisk
          >
            <Input
              value={newAppWidgetSettings.internalAddress}
              icon={<IconLink size={14}/>}
              onChange={(e) => setNewAppWidgetSettings({...newAppWidgetSettings, internalAddress: e.target.value})}
            />
          </Input.Wrapper>
          <br/>
          <Input.Wrapper
            id="ext-address"
            label="External Address"
            description="URL that will be opened when clicking on the app."
          >
            <Input
              value={newAppWidgetSettings.externalAddress}
              icon={<IconClick size={14}/>}
              onChange={(e) => setNewAppWidgetSettings({...newAppWidgetSettings, externalAddress: e.target.value})}
            />
          </Input.Wrapper>
          <br/>
        </Tabs.Panel>
        <Tabs.Panel value="behavior" pt="xs">
          <br/>
          <Switch
            label="Open in new tab"
            description="Open the app in a new tab instead of the current one."
            color={theme.primary}
            checked={newAppWidgetSettings.newTab}
            onChange={(e) => setNewAppWidgetSettings({...newAppWidgetSettings, newTab: !newAppWidgetSettings.newTab})}
          />
          <br/>
          <Input.Wrapper
            id="app-description"
            label={
              <div style={{ marginBottom: '5px' }}>
                Application Description
                &nbsp;
                <Tooltip
                  position='top'
                  label='Your description will be displayed like this'
                >
                  <IconInfoCircle size={18} style={{ marginBottom: '-5px' }}/>
                </Tooltip>
              </div>
            }
          >
            <Input
              value={newAppWidgetSettings.description}
              onChange={(e) => setNewAppWidgetSettings({...newAppWidgetSettings, description: e.target.value})}
            />
          </Input.Wrapper>
          <br/>
        </Tabs.Panel>
        <Tabs.Panel value="appearance" pt="xs">
          <br/>
          <Input.Wrapper
            id="app-icon"
            label="App Icon"
            description="Paste an image URL to use it as your app icon."
            withAsterisk
            error={newAppWidgetSettings.appIcon === '' ? "Could not be blank" : ''}
          >
            <Input
              value={newAppWidgetSettings.appIcon}
              icon={<IconClick size={14}/>}
              onChange={(e) => setNewAppWidgetSettings({...newAppWidgetSettings, appIcon: e.target.value})}
            />
          </Input.Wrapper>
          <br/>
          <Select
            label="App Name Position"
            description={`Position of the app's name relative to the icon.`}
            value={newAppWidgetSettings.AppNamePosition}
            onChange={(newPos) => setNewAppWidgetSettings({...newAppWidgetSettings, AppNamePosition: newPos})}
            data={appNamePositions}
            dropdownPosition="top"
          />
          <br/>
        </Tabs.Panel>
        <Tabs.Panel value="network" pt="xs">
          <br/>
          <Switch
            label="Status checker"
            description="Checks if your app is online using a simple HTTP(S) request."
            color={theme.primary}
            checked={newAppWidgetSettings.statusChecker}
            onChange={(e) => setNewAppWidgetSettings({...newAppWidgetSettings, statusChecker: !newAppWidgetSettings.statusChecker})}
          />
          <br/>
        </Tabs.Panel>
      </Tabs>
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
          onClick={() => handleSave(isEditModalOpen.i)}
          disabled={!isFormValid}
        >
          Save
        </Button>
      </ModalFooter>
    </>
  )
}

export default AppModal
