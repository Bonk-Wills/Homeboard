import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { LoadingOutlined } from '@ant-design/icons';
import { IconArrowUpRight, IconArrowDownRight, IconMapPin } from '@tabler/icons-react';

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
  font-size: 1rem;
`

const CityWeather = styled.div`
  font-size: 1rem;
`

const getWeatherInfo = async(latitude, longitude, setCurrentWeatherinLocation) => {
  const apiKey = process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (response.ok && data.main) {
      setCurrentWeatherinLocation(data);
    } else {
      throw new Error(data.message || 'An error occurred while fetching weather data.');
    }
  } catch (error) {
    console.error("Error fetching weather data:", error);
  }
};

const Weather = ({ settings, theme }) => {
  const [currentWeatherinLocation, setCurrentWeatherinLocation] = useState(null);

  useEffect(() => {
    if (settings && settings.location) {
      getWeatherInfo(settings.location.coordinates.latitude, settings.location.coordinates.longitude, setCurrentWeatherinLocation);
    }
  }, [settings]);

  return (
    <Container theme={theme}>
      {currentWeatherinLocation && currentWeatherinLocation.main ? (
        <>
          <CityCurrentTime>
            {currentWeatherinLocation.main.temp_max.toFixed(1)}°C
          </CityCurrentTime>
          <div style={{ display: 'flex' }}>
            <IconArrowUpRight size='1.2rem'/>&nbsp;
            <CityWeather>{currentWeatherinLocation.main.temp_max.toFixed(1)}°C</CityWeather>
            &nbsp;&nbsp;
            <IconArrowDownRight size='1.2rem'/>
            <CityWeather>{currentWeatherinLocation.main.temp_min.toFixed(1)}°C</CityWeather>
          </div>
          {settings.displayName && (
            <div style={{ display: 'flex' }}>
              <IconMapPin size='.9rem'/>&nbsp;
              <CityName>{settings.location && settings.location.name}</CityName>
            </div>
          )}
        </>
      ) : (
        <LoadingOutlined />
      )}
    </Container>
  );
};

export default Weather;