import React from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root');

const centerContentStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100%',
};

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
          backgroundColor: '#B0E0E6',
          borderRadius: '20px',
          border: '2px solid black',
          width: '35rem',
          margin: 'auto',
          height: '30rem'
        }
      }}
    >
      <div style={centerContentStyle}>
        {children}
      </div>
    </Modal>
  );
};

export default CustomModal;