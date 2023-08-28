import { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Image, Indicator, Tooltip } from '@mantine/core';
import { LoadingOutlined } from '@ant-design/icons';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 100%;
  gap: 0px;
`

const ClickableContainer = styled.a`
  display: flex;
  align-items: center;
  flex-direction: ${({ position }) => position};
  cursor: pointer;
  pointer-events: ${({ isEditable }) => isEditable ? 'none' : ''};
  width: 100%;
  place-content: space-evenly;

  :link {
  text-decoration: none;
  }
`

const AppName = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.type === 'dark' ? '#C1C2C5' : '#000000'};
`

const CustomImage = styled(Image)`
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.1);
  }
`

const CustomIndicator = styled(Indicator)`
  position: absolute;
  bottom: 20px;
  right: 20px;
`

const getPosition = (settings) => {
  switch (settings.AppNamePosition) {
    case 'top':
      return 'column-reverse'
    case 'bottom':
      return 'column'
    case 'right':
      return 'row'
    case 'left':
      return 'row-reverse'
    default:
      return 'row-reverse'
  }
}

const getStatusColor = (status) => {
  switch(status) {
    case 200:
      return 'green'
    case 404:
      return 'red'
    default:
      return 'yellow'
  }
}

const App = ({ isEditable, settings, theme }) => {
  const [statusCode, setStatusCode] = useState(null)
  const [showImage, setShowImage] = useState(true);
  
  const fetchData = async () => {
    try {
      const proxyURL = process.env.REACT_APP_HEROKU_PROXY_URL;
      const response = await fetch(proxyURL + settings.internalAddress, {
        method: 'HEAD',
      });

      setStatusCode(response.status);
    } catch (error) {
      console.error('Une erreur est survenue:', error);
      setStatusCode(404);
    }
  };

  useEffect(() => {
    if (settings && settings.statusChecker) fetchData();
  }, [settings]);

  return (
    <Container>
      {settings ? (
        <Tooltip
          position='bottom'
          label={settings && settings.description}
          disabled={!settings.description || settings.description === ''}
        >
          <ClickableContainer
            position={getPosition(settings)}
            isEditable={isEditable}
            href={settings.externalAddress}
            target={settings.newTab ? '_blank' : ''}
          >
            <CustomImage
              width={70}
              height={70}
              src={settings.appIcon}
              onError={() => setShowImage(false)}
              style={{ display: showImage ? 'block' : 'none' }}
            />
            <AppName theme={theme}>
              {settings.widgetName}
            </AppName>
            {settings.statusChecker && (
              <CustomIndicator inline processing size={12} color={getStatusColor(statusCode)}/>
            )}
          </ClickableContainer>
        </Tooltip>
      ) : (
        <LoadingOutlined />
      )}
    </Container>
  )
}


export default App