import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { LoadingOutlined } from '@ant-design/icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  color: ${({ theme }) => theme.type === 'dark' ? '#C1C2C5' : '#000000'};
  align-items: center;
  height: 100%;
  gap: 0px;
`

const CityCurrentTime = styled.div`
  font-size: 2.125rem;
  font-weight: 700;
`

const CityName = styled.div`
  font-size: 1.3rem;
`

const formatTime = (date, format24) => {
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, '0');

  if (format24) {
    return `${hours.toString().padStart(2, '0')}:${minutes}`;
  } else {
    const isAM = hours < 12;
    const formattedHour = ((hours % 12) || 12).toString().padStart(2, '0'); // Convert 0 hours to 12 for 12-hour format
    return `${formattedHour}:${minutes} ${isAM ? 'AM' : 'PM'}`;
  }
};

const getTimeZoneInfo = async(latitude, longitude, setCurrentTimeinTimeZone) => {
  const currentTime = new Date();
  const apiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const timestamp = Math.floor(currentTime.getTime() / 1000);
  const apiUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${latitude},${longitude}&timestamp=${timestamp}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok) {
      const utcDateTime = new Date(currentTime.getTime() + currentTime.getTimezoneOffset() * 60000);
      if (data.status === 'OK') {
        const tempCurentTime = new Date(
          utcDateTime.getTime() + (data.rawOffset + data.dstOffset) * 1000
        );
        setCurrentTimeinTimeZone(tempCurentTime);
      }
    } else {
      throw new Error(data.message || 'An error occurred while fetching timezone data.');
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
}

const DateTime = ({ settings, theme }) => {
  const [currentTimeinTimeZone, setCurrentTimeinTimeZone] = useState('')

  useEffect(() => {
    if (settings?.location.coordinates) {
      getTimeZoneInfo(settings.location.coordinates.latitude, settings.location.coordinates.longitude, setCurrentTimeinTimeZone)
    }
  }, [settings]);

  useEffect(() => {
  }, [currentTimeinTimeZone]);

  return (
    <Container theme={theme}>
      {currentTimeinTimeZone ? (
        <>
          <CityName>{settings?.cityName}</CityName>
          <CityCurrentTime>
            {formatTime(currentTimeinTimeZone, settings.format24)}
          </CityCurrentTime>
        </>
      ) : (
        <LoadingOutlined />
      )}
    </Container>
  )
}


export default DateTime
