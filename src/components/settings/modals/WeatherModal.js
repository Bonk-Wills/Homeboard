import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { ActionIcon, Button, Modal, Switch, Table, Text, Input } from '@mantine/core';
import { IconFileSearch, IconClick } from '@tabler/icons-react';

import { citiesOptions } from 'components/constants/citiesOptions'

const CitySearchContainer = styled.div`
  display: block;
  border-radius: 0.25rem;
  background-color: ${({ theme }) => theme.theme.colors.default4};
  color: ${({ theme }) => theme.theme.colors.default2};
  padding: 1rem;
`

const InputsContainer = styled.div`
  display: flex;
  align-items: end;
  gap: 1rem;
  margin-top: 15px;
`

const InputContainer = styled.div`
  color: ${({ theme }) => theme.theme.colors.default2};
`

const SwitchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin: 1.5rem 1rem 1rem 1rem;
  cursor: pointer;
`

const ModalFooter = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 20px;
`

const CitySearchTitle = styled.div`
  color: ${({ theme }) => theme.theme.colors.default1};
  font-size: 1.1rem;
  font-weight: 600;
`

const CoordinatesTab = styled(Text)`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary};

  &:hover {
    text-decoration: underline;
  }
`

const InputTitle = styled.div`
  font-size: 1rem;
  margin-bottom: 5px;
`

const SwitchTitle = styled.div`
  font-size: .9rem
`

const searchCities = (query) => {
  return citiesOptions.filter(city => city.name.toLowerCase().includes(query && query.toLowerCase()));
}

const formatPopulation = (number) => {
  if (number >= 1000000) return (number / 1000000).toFixed(1) + 'M';
  if (number >= 1000) return (number / 1000) + 'K';
  return number.toString();
};

const WeatherModal = ({ isEditModalOpen, setIsEditModalOpen, widgetArray, setWidgetArray, theme }) => {
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false)
  const [newAppWidgetSettings, setNewAppWidgetSettings] = useState({
    displayName: true,
    cityName: '',
    location: { name: '' }
  })

  const onCitySelection = (newLocation) => {
    setNewAppWidgetSettings({...newAppWidgetSettings, cityName: newLocation.name, location: newLocation})
    setIsLocationModalOpen(false)
  }

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
    if (newAppWidgetSettings.location && newAppWidgetSettings.cityName !== newAppWidgetSettings.location.name)
      setNewAppWidgetSettings({ ...newAppWidgetSettings, location: null })
  }, [newAppWidgetSettings]);

  useEffect(() => {
    if (isEditModalOpen && isEditModalOpen.settings) {
      setNewAppWidgetSettings({
        displayName: isEditModalOpen.settings.displayName,
        cityName: isEditModalOpen.settings.cityName,
        location: isEditModalOpen.settings.location,
      })
    }
  }, [isEditModalOpen]);

  const CitiesRows = searchCities(newAppWidgetSettings && newAppWidgetSettings.cityName).map((city) => (
    <tr key={city.name}>
      <td>{city.name}</td>
      <td>{city.country}</td>
      <td>
      <CoordinatesTab
          color={theme.primary}
          href={`https://www.google.com/maps/place/${city.coordinates.latitude},${city.coordinates.longitude}`}
          target='_blank'
        >
          {`${city.coordinates.latitude}, ${city.coordinates.longitude}`}
        </CoordinatesTab>
      </td>
      <td>{formatPopulation(city.population)}</td>
      <td>
        <ActionIcon
          size='md'
          color={theme.primary}
          onClick={() => onCitySelection(city)}
        >
          <IconClick size='1.1rem'/>
        </ActionIcon>
      </td>
    </tr>
  ));
  
  return (
    <>
      <Modal
        opened={isLocationModalOpen}
        onClose={() => setIsLocationModalOpen(false)}
        title={`Choose a location - ${newAppWidgetSettings.cityName}`}
        size="xl"
      >
        <Table striped highlightOnHover>
          <thead>
            <tr>
              <th>City</th>
              <th>Country</th>
              <th>Coordinates</th>
              <th>Population</th>
              <th/>
            </tr>
          </thead>
          <tbody>{CitiesRows}</tbody>
        </Table>
        <ModalFooter>
          <Button
            variant='light'
            color={theme.primary}
            onClick={() => setIsLocationModalOpen(false)}
          >
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
      <SwitchContainer>
        <Switch
          color={theme.primary}
          checked={newAppWidgetSettings.displayName}
          onChange={() => setNewAppWidgetSettings({ ...newAppWidgetSettings, displayName: !newAppWidgetSettings.displayName})}
        />
        <SwitchTitle onClick={() => setNewAppWidgetSettings({ ...newAppWidgetSettings, displayName: !newAppWidgetSettings.displayName})}>
          Display city name
        </SwitchTitle>
      </SwitchContainer>
      <CitySearchContainer theme={theme}>
        <CitySearchTitle theme={theme}>Weather location</CitySearchTitle>
          <InputsContainer>
            <InputContainer theme={theme}>
              <InputTitle>City name</InputTitle>
            <Input
              color={theme.primary}
              value={newAppWidgetSettings.location ? newAppWidgetSettings.location.name : newAppWidgetSettings.cityName}
              onChange={(e) => setNewAppWidgetSettings({...newAppWidgetSettings, cityName: e.target.value})}
              theme={theme}
            />
            </InputContainer>
            <Button
              type="submit" 
              variant='light'
              leftIcon={<IconFileSearch size='1rem'/>}
              color={theme.primary}
              onClick={() => setIsLocationModalOpen(true)}
              disabled={newAppWidgetSettings.cityName && newAppWidgetSettings.cityName.length < 2}
            >
              Search
            </Button>
          </InputsContainer>
          <InputsContainer>
            <InputContainer theme={theme}>
              <InputTitle>Latitude</InputTitle>
              <Input
                color={theme.primary}
                value={newAppWidgetSettings.location && newAppWidgetSettings.location.coordinates ? newAppWidgetSettings.location.coordinates.latitude : ''}
                theme={theme}
                disabled
              />
            </InputContainer>
            <InputContainer theme={theme}>
              <InputTitle>Longitude</InputTitle>
              <Input
                color={theme.primary}
                value={newAppWidgetSettings.location && newAppWidgetSettings.location.coordinates ? newAppWidgetSettings.location.coordinates.longitude : ''}
                theme={theme}
                disabled
              />
            </InputContainer>
          </InputsContainer>
      </CitySearchContainer>
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
          disabled={!newAppWidgetSettings.location}
        >
          Save
        </Button>
      </ModalFooter>
    </>
  )
}

export default WeatherModal
