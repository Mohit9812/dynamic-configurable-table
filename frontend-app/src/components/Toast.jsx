import React, { useEffect } from 'react';

function Toast({ message, onClose }) {
  useEffect(() => {
    const timer = setTimeout(onClose, 2000); // Auto-close after 2 sec
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div style={toastStyle}>
      {message}
    </div>
  );
}

const toastStyle = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  backgroundColor: '#323232',
  color: '#fff',
  padding: '10px 16px',
  borderRadius: '4px',
  fontSize: '14px',
  zIndex: 1000,
  boxShadow: '0 0 10px rgba(0,0,0,0.3)'
};

export default Toast;
