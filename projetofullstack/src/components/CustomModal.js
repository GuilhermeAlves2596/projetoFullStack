import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 

const CustomModal = ({ isOpen, onRequestClose, children }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)'
        },
        content: {
          backgroundColor: '#E6E6FA',
          borderRadius: '20px',
          border: '2px solid black',
          width: '35rem',
          margin: 'auto',
          height: '30rem'
        }
      }}
    >
      {children}
    </Modal>
  );
};

export default CustomModal;