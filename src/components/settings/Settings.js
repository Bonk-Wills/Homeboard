import { Drawer, Tabs } from '@mantine/core';

import CommonTab from './tabs/CommonTab'
import CustomizationTab from './tabs/CustomizationTab'

const Settings = ({
  isOpenMenu,
  setIsOpenMenu,
  theme,
  setTheme
}) => (
  <Drawer
    opened={isOpenMenu}
    onClose={() => setIsOpenMenu(false)}
    title="Settings"
    size="lg"
  >
    <Tabs defaultValue="common" color={theme.primary}>
      <Tabs.List grow>
        <Tabs.Tab value="common">Common</Tabs.Tab>
        <Tabs.Tab value="customization">Customization</Tabs.Tab>
      </Tabs.List>
      <CommonTab theme={theme} setTheme={setTheme}/>
      <CustomizationTab theme={theme} setTheme={setTheme}/>
    </Tabs>
  </Drawer>
)

export default Settings
