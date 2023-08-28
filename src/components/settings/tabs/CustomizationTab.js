import styled from 'styled-components'
import DarkModeSwitch from "react-dark-mode-toggle";

import { 
  Accordion,
  Alert,
  Checkbox,
  Select,
  MultiSelect,
  Input,
  Tabs,
  Text,
  RangeSlider,
} from '@mantine/core';
import { IconBrush, IconLayout, IconAdjustmentsAlt, IconInfoCircle } from '@tabler/icons-react';
import { LoadingOutlined } from '@ant-design/icons';

import { primaryColorOptions } from 'components/constants/primaryColorOptions'
import { lightTheme, darkTheme } from 'themes/default'
import { bgOptions } from 'components/constants/bgOptions'
import { defaultQuotes } from 'components/constants/defaultQuotes'

const marks = Array.from({ length: 25 }, (_, i) => ({
  value: i,
  label: `${((i + 12) % 24).toString().padStart(2, '0')}`,
}));

const DarkModeContainer = styled.div`
  display: block;
  color: ${({ theme }) => theme.theme.colors.default1};
  background-color: ${({ theme }) => theme.theme.colors.default4};
  border: 0.0625rem solid ${({ theme }) => theme.theme.colors.default3};
  border-radius: 0.25rem;
  margin-bottom: 1rem;
  padding: 0.75rem 1rem;
  height: 5.6rem;
`

const DarkModeSwitchContainer = styled.div`
  display: flex;
  margin: .5rem 0 1rem 1rem;
  
  gap: 3rem;
  align-items: center;
`

const DarkModeAutoContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`

const DarkModeTitle = styled.div`
  font-size: 0.875rem;
  font-weight: 500;
`

const DarkModeSubtitle = styled.div`
  color: #868e96;
  font-size: calc(0.875rem - 0.125rem);
  margin-bottom: 4px;
`

const CustomSelect = styled(Select)`
  margin-bottom: 10px;
`

const setThemeBackground = (setTheme, background) => {
  setTheme((prevState) => ({
    ...prevState,
    background: background,
  }));
}

const setThemeType = (setTheme, type) => {
  let newColors = type === "dark" ? darkTheme.colors : lightTheme.colors;
  setTheme((prevState) => ({
    ...prevState,
    type: type,
    theme: {
      colors: {
        ...prevState.colors,
        ...newColors,
      },
    },
  }));
};

const setThemeField = (setTheme, field, value) => {
  setTheme((prevState) => ({
    ...prevState,
    [field]: value,
  }));
};

const setThemeQuotes = (setTheme, newQuotes) => {
  console.log(newQuotes)
  setTheme((prevState) => ({
    ...prevState,
    quotes: JSON.stringify(newQuotes),
  }));
};

const formatTime = (timeValue) => {
  const adjustedValue = (timeValue - 12 + 24) % 24;
  const hours = Math.floor(adjustedValue);
  const minutes = (adjustedValue - hours) * 60;
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

const CustomizationTab = ({ theme, setTheme }) => {
  const combinedQuotes = [
    ...defaultQuotes,
    ...(theme.quotes ? JSON.parse(theme.quotes) : [])
  ].filter((quote, index, self) => self.indexOf(quote) === index);

  return (
    <Tabs.Panel value="customization" pt="xs">
      <br/>
      <Accordion  variant="contained" radius="md">
        <Accordion.Item value="flexibility">
          <Accordion.Control icon={<IconLayout size="1.2rem"/>}>
            <Text>Layout</Text>
            <Text size="sm" color="dimmed" weight={400}>
              Enable and disable elements on your header and dashboard tiles
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <CustomSelect
              value={theme.background || 'austin'}
              onChange={(newBackground) => setThemeBackground(setTheme, newBackground)}
              label="Header background"
              description={'The image at the top of the page'}
              data={bgOptions}
              dropdownPosition="bottom"
            />
            <Alert icon={<IconInfoCircle size="1rem"/>} type="info">
              Every header background image has 4 variants, which will vary during the day at regular 6-hour intervals.
            </Alert>
            <br />
            <MultiSelect
              value={theme.quotes ? JSON.parse(theme.quotes) : defaultQuotes}
              description={'The quotes that are displayed'}
              label="Custom quotes"
              onChange={(newQuotes) => setThemeQuotes(setTheme, newQuotes)}
              getCreateLabel={(query) => `+ Create ${query}`}
              data={combinedQuotes}
              dropdownPosition="bottom"
              searchable
              creatable
            />
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="customization">
          <Accordion.Control icon={<IconBrush size="1.2rem"/>}>
            <Text>Appearance</Text>
            <Text size="sm" color="dimmed" weight={400}>
              Customize the background, colors and apps appearance
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <CustomSelect
              value={theme.primary || 'blue'}
              description={'The main color of the app'}
              onChange={(newPrimaryColor) => setThemeField(setTheme, 'primary', newPrimaryColor)}
              label="Primary color"
              icon={primaryColorOptions.find((color) => color.value === theme.primary)?.icon ?? '🔵'}
              data={primaryColorOptions}
              dropdownPosition="bottom"
            />
            <DarkModeTitle>Dark mode</DarkModeTitle>
            <DarkModeSubtitle>Ça va être tout noir</DarkModeSubtitle>
            <DarkModeContainer theme={theme}>
              <DarkModeSwitchContainer>
                <DarkModeSwitch
                  onChange={() => setThemeType(setTheme, theme.type === "dark" ? 'light' : 'dark')}
                  checked={theme.type === "dark"}
                  size={60}
                />
                <DarkModeAutoContainer>
                  <Checkbox
                    label="Auto"
                    color={theme.primary || 'blue'}
                    checked={theme.auto_type || false}
                    onChange={() => {
                      if (!theme.auto_range)
                        setThemeField(setTheme, 'auto_range', [10, 22])
                      setThemeField(setTheme, 'auto_type', theme.auto_type ? !theme.auto_type : true)
                    }}
                  />
                  <Input
                    color={theme.primary || 'blue'}
                    style={{ width: '100px' }}
                    value={theme.auto_type ? formatTime(theme.auto_range ? theme.auto_range[0] : 10) : ''}
                    disabled
                  />
                  <Input
                    color={theme.primary || 'blue'}
                    style={{ width: '100px' }}
                    value={theme.auto_type ? formatTime(theme.auto_range ? theme.auto_range[1] : 22) : ''}
                    disabled
                  />
                </DarkModeAutoContainer>
              </DarkModeSwitchContainer>
              <RangeSlider 
                  color={theme.primary || 'blue'}
                step={.25}
                min={12}
                max={36}
                minRange={1}
                value={theme.auto_range ? [theme.auto_range[0] + 12, theme.auto_range[1] + 12] : [22, 30]}
                onChange={(newRange) => {
                  const originalStart = newRange[0] - 12;
                  const originalEnd = newRange[1] - 12;
                  setThemeField(setTheme, 'auto_range', [originalStart, originalEnd]);
                }}
                label={null}
                marks={marks.filter((_, index) => index % 2 === 0).map(mark => ({ ...mark, value: mark.value + 12 }))}
                disabled={theme.auto_type ? !theme.auto_type : true}
              />
            </DarkModeContainer>
          </Accordion.Panel>
        </Accordion.Item>

        <Accordion.Item value="focus-ring">
          <Accordion.Control icon={<IconAdjustmentsAlt size="1.2rem"/>}>
            <Text>Page MetaData</Text>
            <Text size="sm" color="dimmed" weight={400}>
              Work in progress...
            </Text>
          </Accordion.Control>
          <Accordion.Panel>
            <LoadingOutlined />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </Tabs.Panel>
  )
}

export default CustomizationTab
