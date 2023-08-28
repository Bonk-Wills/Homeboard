import { useState, useEffect } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import { ToastContainer } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid';
import styled from 'styled-components'

import { Menu } from '@mantine/core';
import { SettingOutlined, EditOutlined, SlidersOutlined, DeleteOutlined } from '@ant-design/icons';

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'
import 'react-toastify/dist/ReactToastify.css';

import AddButton from './common/AddButton'
import EditButton from './common/EditButton'
import WidgetModals from './settings/WidgetModals'
import WidgetPositionModal from './settings/WidgetPositionModal'

import App from './widgets/App'
import DateTime from './widgets/DateTime'
import Weather from './widgets/Weather'
import AgeCountdown from './widgets/AgeCountdown'
import ArduinoSwitch from './widgets/ArduinoSwitch'
import ArduinoSensor from './widgets/ArduinoSensor'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const ActionButton = styled.div`
  position: absolute;
  top: 15px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`

const SettingsIcon = styled(SettingOutlined)`
  color: ${({ theme }) => theme.colors.default1};
  font-size: 20px;
`

const ReactGridItem = styled.div`
  border-radius: 1rem !important;
  transition: all 200ms ease;
  transition-property: left, top;

  .react-resizable-handle {
    bottom: 5px !important;
    right: 5px !important;
  }
`

const Dashboard = ({ theme }) => {
  const [isEditable, setIsEditable] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(null)
  const [isPositionModalOpen, setIsPositionModalOpen] = useState(null)
  const [layouts, setLayouts] = useState(null)
  let getWidgets = window.localStorage.getItem('widgets')
  const [widgetArray, setWidgetArray] = useState(getWidgets ? JSON.parse(getWidgets) : [])
  //console.log("OH: ", theme)
  //console.log("OUI: ", widgetArray)

  useEffect(() => {
    if (isEditable) {
      window.onbeforeunload = () => true;
    } else {
      window.onbeforeunload = null;
    }
  }, [isEditable]);

  const handleModify = (layouts, layout) => {
    const tempArray = widgetArray
    setLayouts(layout)
    layouts?.map((position) => {
      tempArray[Number(position.i)].x = position.x
      tempArray[Number(position.i)].y = position.y
      tempArray[Number(position.i)].w = position.w
      tempArray[Number(position.i)].h = position.h
    })
    setWidgetArray(tempArray)
  }

  const handleDelete = (key) => {
    const tempArray = widgetArray.slice()
    const index = tempArray.indexOf(tempArray.find((data) => data.i === key))
    tempArray.splice(index, 1)
    setWidgetArray(tempArray)
  }
  

  const handleAdd = (newWidget) => {
    const tempArray = [
      ...widgetArray,
      { i: uuidv4(), name: newWidget.name, type: newWidget.type, settings: newWidget.settings, x: 0, y: 0, w: 2, h: 1 },
    ]
    setWidgetArray(tempArray)
    setIsAddModalOpen(false)
  }

  const widgetRenderer = (widget) => {
    switch (widget.type) {
      case 'app':
        return <App isEditable={isEditable} settings={widget.settings} theme={theme} />
      case 'date-time':
        return <DateTime settings={widget.settings} theme={theme} />
      case 'weather':
        return <Weather settings={widget.settings} theme={theme} />
      case 'age-countdown':
        return <AgeCountdown settings={widget.settings} theme={theme} />
      case 'arduino-switch':
        return <ArduinoSwitch settings={widget.settings} theme={theme} />
      case 'arduino-sensor':
        return <ArduinoSensor settings={widget.settings} theme={theme} />
      default:
        return null;
    }
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggablez
        pauseOnHover
      />
      <EditButton
        isEditable={isEditable}
        setIsEditable={setIsEditable}
        widgetArray={widgetArray}
      />
      {isEditable && (
        <AddButton
          isModalOpen={isAddModalOpen}
          setIsModalOpen={setIsAddModalOpen}
          handleAdd={handleAdd}
          theme={theme}
        />
      )}
      <WidgetModals
        isEditModalOpen={isEditModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
        widgetArray={widgetArray}
        setWidgetArray={setWidgetArray}
        theme={theme}
      />
      <WidgetPositionModal
        isPositionModalOpen={isPositionModalOpen}
        setIsPositionModalOpen={setIsPositionModalOpen}
        widgetArray={widgetArray}
        setWidgetArray={setWidgetArray}
        theme={theme}
      />
      <ResponsiveReactGridLayout
        onLayoutChange={handleModify}
        verticalCompact={true}
        layout={layouts}
        isDraggable={isEditable}
        isResizable={isEditable}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        cols={{ lg: 10, md: 8, sm: 6, xs: 2, xxs: 2 }}
        autoSize={true}
        rowHeight={120}
        margin={{
          lg: [20, 20],
          md: [20, 20],
          sm: [20, 20],
          xs: [20, 20],
          xxs: [20, 20],
        }}
      >
        {widgetArray?.map((widget, index) => {
          return (
            <ReactGridItem
              style={{cursor: isEditable ? 'grab' : ''}}
              key={index}
              data-grid={{
                x: widget?.x,
                y: widget?.y,
                w: widget?.w,
                h: widget?.h,
                i: widget.i,
                minW: 2,
                maxW: Infinity,
                minH: 1,
                maxH: Infinity,
              }}
            >
              <Menu shadow="md" color={'white'} width={200}>
                {isEditable && (
                  <Menu.Target>
                    <ActionButton>
                      <SettingsIcon />
                    </ActionButton>
                  </Menu.Target>
                )}

                <Menu.Dropdown>
                  <Menu.Label>Settings</Menu.Label>
                  <Menu.Item onClick={() => setIsEditModalOpen(widget)} icon={<EditOutlined size={14} />}>Edit</Menu.Item>
                  <Menu.Item onClick={() => setIsPositionModalOpen(widget)} icon={<SlidersOutlined size={14} />}>Change position</Menu.Item>
                  <Menu.Divider />
                  <Menu.Label>Danger zone</Menu.Label>
                  <Menu.Item onClick={() => handleDelete(widget.i)} color="red" icon={<DeleteOutlined size={14} />}>Remove</Menu.Item>
                </Menu.Dropdown>
              </Menu>
              {widgetRenderer(widget)}
            </ReactGridItem>
          )
        })}
      </ResponsiveReactGridLayout>
    </>
  )
}

export default Dashboard
