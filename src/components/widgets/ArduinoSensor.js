import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { LoadingOutlined } from '@ant-design/icons';
import { IconDropletHalfFilled } from '@tabler/icons-react';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  gap: 0px;
  color: ${({ theme }) => theme.type === 'dark' ? '#C1C2C5' : '#000000'};
`

const PinState = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
`

const PinNameContainer = styled.div`
  font-size: 1.2rem;
  font-weight: 700;
`

const BlinkingText = styled.span`
  @keyframes blinker {
    50% { opacity: 0; }
  }

  animation: blinker 2s linear infinite;
  color: red;
`;

const resetArduinoSystemTime = async () => {
  try {
    let current_datetime = new Date();
    let formatted_date = 
      String(current_datetime.getFullYear()) + "," + 
      String(current_datetime.getMonth() + 1).padStart(2, '0') + "," + 
      String(current_datetime.getDate()).padStart(2, '0') + "," + 
      String(current_datetime.getHours()).padStart(2, '0') + "," + 
      String(current_datetime.getMinutes()).padStart(2, '0') + "," + 
      String(current_datetime.getSeconds()).padStart(2, '0');
    console.log(`SET_TIME:${formatted_date}`)

    await fetch('http://192.168.2.41:3000/sendData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: `SET_TIME:${formatted_date}`}),
    });
  } catch (error) {
    console.error('Error sending data:', error);
  }
};

const ArduinoSensor = ({ settings, theme }) => {
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

  return (
    <Container theme={theme}>
      {settings && arduinoData ? (
        <>
          <PinNameContainer>{settings.widgetName}</PinNameContainer>
          <PinState onClick={() => resetArduinoSystemTime()}>
            {arduinoData[settings.pinState] !== 0 && arduinoData[settings.pinState] < 30 ? (
              <BlinkingText>
                <IconDropletHalfFilled size="1rem"/>&nbsp;
                {arduinoData[settings.pinState]} %
              </BlinkingText>
            ) : (
              <>
                <IconDropletHalfFilled size="1rem"/>&nbsp;
                {arduinoData[settings.pinState]} %
              </>
            )}
          </PinState>
        </> 
        ) : (
        <LoadingOutlined />
      )}
    </Container>
  )
}

export default ArduinoSensor
