import { useState } from 'react'
import { Responsive, WidthProvider } from 'react-grid-layout'
import styled from 'styled-components'

import { MoreOutlined } from '@ant-design/icons'

import 'react-grid-layout/css/styles.css'
import 'react-resizable/css/styles.css'

import AddButton from './common/AddButton'
import TimeCountdown from './widgets/TimeCountdown'
import Test from './widgets/Test'

const ResponsiveReactGridLayout = WidthProvider(Responsive)

const Header = styled.div`
  background-color: ${({ cardBgColor }) => cardBgColor};
  border-radius: 3px 3px 0 0;
  width: 100%;
  height: 50px;
`

const WidgetName = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 20px;
  font-family: Roboto;
  color: white;
  letter-spacing: .02em;
  font-size: 1.1rem;
  font-weight: 400;
`

const ActionButton = styled.div`
  position: absolute;
  top: 15px;
  right: 10px;
  background: transparent;
  border: none;
  font-size: 18px;
  cursor: pointer;
`

const MenuIcon = styled(MoreOutlined)`
  color: white;
  font-size: 20px;
`

const Menu = styled.div`
  background-color: white;
  position: absolute;
  top: 40px;
  right: -10px;
  width: 120px;
  cursor: pointer;
`

const ItemMenu = styled.div`
  border-style: solid;
  border-width: 0px 0px 1px 0px;
  padding: 5px;
`

const ReactGridItem = styled.div`
  display: grid;
  transition: all 200ms ease;
  transition-property: left, top;
  background: rgba(0, 132, 255, 0.473);
`

const Dashboard = ({ cardBgColor }) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const [showMenu, setShowMenu] = useState(null)
  const [layouts, setLayouts] = useState(null)
  const [widgetArray, setWidgetArray] = useState([
    { i: 0, name: 'Time Countdown', content: <TimeCountdown />, x: 0, y: 0, w: 2, h: 2 },
    { i: 1, name: 'Test', content: <Test />, x: 2, y: 0, w: 2, h: 2 },
  ])

  const handleModify = (layouts, layout) => {
    const tempArray = widgetArray
    setLayouts(layout)
    layouts?.map((position) => {
      tempArray[Number(position.i)].x = position.x
      tempArray[Number(position.i)].y = position.y
      tempArray[Number(position.i)].width = position.w
      tempArray[Number(position.i)].height = position.h
    })
    setWidgetArray(tempArray)
  }

  const handleDelete = (key) => {
    const tempArray = widgetArray.slice()
    const index = tempArray.indexOf(tempArray.find((data) => data.i === key))
    tempArray.splice(index, 1)
    setWidgetArray(tempArray)
  }

  const handleAdd = () => {
    setShowDropdown(!showDropdown)
    setWidgetArray([
      ...widgetArray,
      { i: widgetArray.length, name: 'Test', content: <Test />, x: 0, y: 0, w: 2, h: 2 },
    ])
  }

  return (
    <>
      <AddButton handleAdd={handleAdd} />
      <ResponsiveReactGridLayout
        onLayoutChange={handleModify}
        verticalCompact={true}
        layout={layouts}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        preventCollision={false}
        cols={{ lg: 8, md: 8, sm: 4, xs: 2, xxs: 2 }}
        autoSize={true}
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
                isDraggable: true,
                isResizable: true,
              }}
            >
              <Header cardBgColor={cardBgColor}>
                <WidgetName>{widget.name}</WidgetName>
                <ActionButton
                  onClick={() => showMenu === widget.i ? setShowMenu(null) : setShowMenu(widget.i)
                }>
                  <MenuIcon />
                </ActionButton>
                {showMenu === widget.i && (
                  <Menu>
                    <ItemMenu>WIP</ItemMenu>
                    <ItemMenu onClick={() => handleDelete(widget.i)}>Delete</ItemMenu>
                  </Menu>
                )}
              </Header>
              {widget.content}
            </ReactGridItem>
          )
        })}
      </ResponsiveReactGridLayout>
    </>
  )
}

export default Dashboard
