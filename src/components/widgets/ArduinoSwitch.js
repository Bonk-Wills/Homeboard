import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Switch } from '@mantine/core';
import { IconSun, IconMoonStars } from '@tabler/icons-react';
import { LoadingOutlined } from '@ant-design/icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  gap: 0px;
  color: ${({ theme }) => theme.type === 'dark' ? '#C1C2C5' : '#000000'};
`

const PinSwitchStateContainer = styled.div`
  position: absolute;
  top: 10px;
  left: 10px;
`

const PinNameContainer = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`

const PinRangeContainer = styled.div`
  font-size: 1rem;
`

const SwitchPinState = async (arduinoData, setArduinoData, settings) => {
  try {
    const datatoSend = `SET_${settings.pinName}STATE:${arduinoData[settings.pinState] ? 0 : 1}\n`

    const response = await fetch('http://192.168.2.41:3000/sendData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: datatoSend}),
    });

    if (response.ok) {
      setArduinoData({
        ...arduinoData,
        [settings.pinState]: !arduinoData[settings.pinState],
      })
    } else {
      console.error('Failed to update pin state:', response.status);
    }
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

const ArduinoSwitch = ({ settings, theme }) => {
  const [arduinoData, setArduinoData] = useState({
    timeSystem: '',
    lightState: false,
    lightRange: '',
    fanState: false,
    fanRange: '',
    marcState: 0,
    marc2State: 0,
  });

  useEffect(() => {
    fetch('http://192.168.2.41:3000/getData')
      .then(response => response.text())
      .then(data => {
        if (data.split('\r\n')) {
          let parsedData = data.split('\r\n')[0].split(' ')
          
          setArduinoData({
            timeSystem: parsedData[0],
            marcState: parseInt(parsedData[1]),
            marc2State: parseInt(parsedData[2]),
            lightState: parseInt(parsedData[3]) === 1 ? true : false,
            lightRange: parsedData[4],
            fanState: parseInt(parsedData[5]) === 1 ? true : false,
            fanRange: parsedData[6],
          });
        }
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  //console.log(arduinoData)

  return (
    <Container theme={theme}>
      {settings && arduinoData && arduinoData.timeSystem ? (
        <>
          <PinSwitchStateContainer>
            <Switch
              size="xs"
              color={theme.type === 'dark' ? 'gray' : 'dark'}
              onLabel={<IconSun size=".8rem" stroke={2.5} color={'rgb(255, 212, 59)'} />}
              offLabel={<IconMoonStars size=".8rem" stroke={2.5} color={'rgb(34, 139, 230)'} />}
              onChange={() => SwitchPinState(arduinoData, setArduinoData, settings)}
              checked={arduinoData[settings.pinState]}
            />
          </PinSwitchStateContainer>
          <PinNameContainer>
            {settings && settings.widgetName}
          </PinNameContainer>
          <PinRangeContainer>
            {arduinoData[settings.pinRange].split('/') &&
              arduinoData[settings.pinRange].split('/')[0]} : {arduinoData[settings.pinRange].split('/')[1]
            }
          </PinRangeContainer>
        </>
       ) : (
        <LoadingOutlined />
      )}
    </Container>
  )
}

export default ArduinoSwitch
