import React, { useState } from 'react';
import Toast from './Toast.jsx';
import { FiCopy } from 'react-icons/fi';

function ShareLinkButton() {
  const [showToast, setShowToast] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => setShowToast(true));
  };

  return (
    <div style={{ marginBottom: '1rem' }}>
      <button
        onClick={handleCopy}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '8px 16px',
          backgroundColor: '#007BFF',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '14px'
        }}
      >
        <FiCopy />
        Copy Shareable Link
      </button>
      {showToast && <Toast message="Link copied to clipboard!" onClose={() => setShowToast(false)} />}
    </div>
  );
}

export default ShareLinkButton;