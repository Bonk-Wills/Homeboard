import { useRef } from 'react'
import styled from 'styled-components'
import { toast } from 'react-toastify';

import { IconEditCircle, IconCircleX } from '@tabler/icons-react';

const FloatingButton = styled.button`
  font-size: 1.2rem;
  transition: background-color 0.3s ease-in-out, transform 0.3s ease-in-out;
  border-radius: 50%;
  width: 55px;
  height: 55px;
  border-style: none;
  background-color: ${({ isEditable }) => isEditable ? '#ff3333' : '#2196f3'};
  color: white;
  cursor: pointer;

  &:hover {
    background-color: ${({ isEditable }) => isEditable ? '#ff5757' : '#319df5'};
  }
  
`

const Shadow = styled.div`
  position: absolute;
  right: 3rem;
  top: 175px;
  z-index: 2;
  cursor: pointer;
  border-radius: 50%;
  box-shadow: 0 3px 5px -1px rgb(0 0 0 / 20%), 0 6px 10px 0 rgb(0 0 0 / 14%), 0 1px 18px 0 rgb(0 0 0 / 12%);
`

const EditButton = ({ isEditable, setIsEditable, widgetArray }) => {
  const toastIdRef = useRef(null);

  const onButtonClick = () => {
    if (!isEditable) {
      setIsEditable(true);

      toastIdRef.current = toast.info('Changes will not be saved until you exit edit mode', {
        autoClose: false,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
      });
    } else {
      if (toastIdRef.current !== null) toast.dismiss(toastIdRef.current);

      window.localStorage.setItem('widgets', JSON.stringify(widgetArray));
      setTimeout(() => {
        toast.success('Your changes have been saved', {
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
        });
      }, 500);

      setIsEditable(false);
    }
  }

  return (
    <>
      <Shadow>
        <FloatingButton
          isEditable={isEditable}
          onClick={() => onButtonClick()}
        >
          {isEditable ? (
          <IconCircleX style={{ marginTop: '3px' }} />
          ) : (
            <IconEditCircle style={{ marginTop: '3px' }} />
          )}
        </FloatingButton>
      </Shadow>
    </>
  )
}

export default EditButton
