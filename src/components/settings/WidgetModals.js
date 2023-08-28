import { Modal } from '@mantine/core';

import AppModal from './modals/AppModal';
import AgeCountdownModal from './modals/AgeCountdownModal';
import DateTimeModal from './modals/DateTimeModal';
import WeatherModal from './modals/WeatherModal';

const WidgetModals = ({ isEditModalOpen, setIsEditModalOpen, widgetArray, setWidgetArray, theme }) => {
  const modalRenderer = (widget) => {
    switch (widget.type) {
      case 'app':
        return (
          <AppModal
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            widgetArray={widgetArray}
            setWidgetArray={setWidgetArray}
            theme={theme}
          />
        )
      case 'age-countdown':
        return (
          <AgeCountdownModal
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            widgetArray={widgetArray}
            setWidgetArray={setWidgetArray}
            theme={theme}
          />
        )
      case 'date-time':
        return (
          <DateTimeModal
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            widgetArray={widgetArray}
            setWidgetArray={setWidgetArray}
            theme={theme}
          />
        )
      case 'weather':
        return (
          <WeatherModal
            isEditModalOpen={isEditModalOpen}
            setIsEditModalOpen={setIsEditModalOpen}
            widgetArray={widgetArray}
            setWidgetArray={setWidgetArray}
            theme={theme}
          />
        )
      default:
        return null;
    }
  };

  return (
    <Modal
      opened={isEditModalOpen}
      onClose={() => setIsEditModalOpen(null)}
      title={(isEditModalOpen && isEditModalOpen.type !== 'app') ? `Settings for ${isEditModalOpen && isEditModalOpen.name} widget` : ''}
      size={(isEditModalOpen && isEditModalOpen.type !== 'app') ? 'md' : 'xl'}
    >
      {isEditModalOpen && modalRenderer(isEditModalOpen)}
    </Modal>
  )
}

export default WidgetModals
