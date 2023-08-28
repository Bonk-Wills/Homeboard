import styled from 'styled-components'

import {
  ArrowLeftOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  CloudOutlined,
  ApiOutlined
} from '@ant-design/icons';
import { Button } from '@mantine/core';

const SubTitle = styled.div`
  font-size: 1.1rem;
  font-weight: normal;
  color: #868e96;
`

const PreviousButton = styled.button`
  padding: 0px 1.125rem 0px calc(0.75rem);
  text-align: left;
  box-sizing: border-box;
  height: 2.25rem;
  width: 100%;
  border-radius: 0.25rem;
  font-weight: 600;
  font-size: 0.875rem;
  cursor: pointer;
  border: 0.0625rem solid ${({ theme }) => theme.theme.colors.default3};
  background-color: ${({ theme }) => theme.theme.colors.default4};
  color: ${({ theme }) => theme.theme.colors.default1};
  margin-bottom: 1rem;

  
  &:hover {
    background-color: ${({ theme }) => theme.type === 'dark' ? '#343a40' : '#f8f9fa'};
  }
`

const NewWidgetsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
`

const NewWidget = styled.div`
  padding: 20px 15px 15px 15px;
  font-size: 1rem;
  text-align: center;
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.theme.colors.default1};
  background: ${({ theme }) => theme.type === 'dark' ? '#212529' : '#e9ecef'};
  position: relative;
  height: 170px
`

const NewWidgetName = styled.div`
  font-weight: 400;
  margin: 10px 0px 15px 0px;
`

const NewWidgetDescription = styled.div`
  color: #909296;
  font-size: 0.85rem;
  text-decoration: none;
  text-align: center;
  line-height: 1.2;
  white-space: normal;
  margin-bottom: 10px;
  height: 50px;
`

const NewWidgetButton = styled(Button)`
  position: absolute;
  margin: auto;
  width: 90%;
  bottom: 10px;
  right: 0;
  left: 0;
`

const widgetsList = [
  {
    name: 'Date Time',
    type: 'date-time',
    description: 'Displays the current date and time for the location of your choice.',
    settings: {format24: true, cityName: 'Paris', location: { name: "Paris", coordinates: { latitude: 48.8566, longitude: 2.3522 }, country: "France"}},
    icon: <CalendarOutlined/>,
  },
  {
    name: 'Weather',
    type: 'weather',
    description: 'Displays the current weather for the location of your choice.',
    settings: {displayName: true, cityName: 'Paris', location: { name: "Paris", coordinates: { latitude: 48.8566, longitude: 2.3522 }, country: "France"}},
    icon: <CloudOutlined/>,
  },
  {
    name: 'Age Countdown',
    type: 'age-countdown',
    description: 'Displays the remaining time before your birhday in a very detailed way.',
    settings: {displayUnits: true, displayOnly: 'all', birthday: null},
    icon: <FieldTimeOutlined/>,
  },
  {
    name: 'Arduino Switch - Light',
    type: 'arduino-switch',
    description: 'WIP | Only for test purpose',
    settings: {widgetName: 'Lampe', pinName: 'LIGHT', pinState: 'lightState', pinRange: 'lightRange'},
    icon: <ApiOutlined/>,
  },
  {
    name: 'Arduino Switch - Fan',
    type: 'arduino-switch',
    description: 'WIP | Only for test purpose',
    settings: {widgetName: 'Ventilation', pinName: 'FAN', pinState: 'fanState', pinRange: 'fanRange'},
    icon: <ApiOutlined/>,
  },
  {
    name: 'Arduino Sensor - M1',
    type: 'arduino-sensor',
    description: 'WIP | Only for test purpose',
    settings: {widgetName: 'Marc1', pinState: 'marcState'},
    icon: <ApiOutlined/>,
  },
  {
    name: 'Arduino Sensor - M2',
    type: 'arduino-sensor',
    description: 'WIP | Only for test purpose',
    settings: {widgetName: 'Marc2', pinState: 'marc2State'},
    icon: <ApiOutlined/>,
  }
]

const AddWidgets = ({ setIsSelected, handleAdd, theme }) => (
  <>
    <PreviousButton theme={theme} onClick={() => setIsSelected(null)}>
      <ArrowLeftOutlined style={{ marginRight: '10px' }}/>
      Go back to the previous step
    </PreviousButton>
    <SubTitle>
      Widgets interact with your apps, to provide you with more control over your applications.
      They usually require additional configuration before use.
    </SubTitle>
    <br/>
    <NewWidgetsContainer>
      {widgetsList.map((widget, i) => (
        <NewWidget key={i} theme={theme}>
          <div style={{fontSize: '20px'}}>{widget.icon}</div>
          <NewWidgetName>{widget.name}</NewWidgetName>
          <NewWidgetDescription>{widget.description}</NewWidgetDescription>
          <NewWidgetButton
            variant='light'
            size='xs'
            color={theme.primary}
            onClick={() => handleAdd({
              name: widget.name,
              type: widget.type,
              settings: widget.settings,
            })}
          >
            Add to Dashboard
          </NewWidgetButton>
        </NewWidget>
      ))}
    </NewWidgetsContainer>
  </>
)

export default AddWidgets
