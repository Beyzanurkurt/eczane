import React from 'react';
import { FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';

const CustomAlert = ({ show, message, type, onClose }) => {
  if (!show) return null;

  // Mesaj tipine göre renk ve ikon seçimi
  const isSuccess = type === 'success';
  const colorClass = isSuccess ? 'text-success' : 'text-danger';
  const buttonClass = isSuccess ? 'btn-success' : 'btn-danger';
  const Icon = isSuccess ? FaCheckCircle : FaExclamationCircle;

  return (
    <div style={styles.overlay}>
      <div className="card shadow-lg" style={styles.modal}>
        {/* Kapatma Çarpısı */}
        <button 
          className="btn btn-sm position-absolute top-0 end-0 m-2 text-secondary" 
          onClick={onClose}
          style={{ background: 'none', border: 'none', fontSize: '1.2rem' }}
        >
          <FaTimes />
        </button>

        <div className="card-body text-center p-4">
          {/* Büyük İkon */}
          <div className="mb-3">
            <Icon className={colorClass} size={50} />
          </div>
          
          {/* Mesaj Metni */}
          <h5 className="mb-4 text-gray-800 font-weight-bold">
            {isSuccess ? 'İşlem Başarılı!' : 'Bir Sorun Var!'}
          </h5>
          <p className="mb-4 text-muted" style={{ fontSize: '1.1rem' }}>
            {message}
          </p>

          {/* Tamam Butonu */}
          <button 
            className={`btn ${buttonClass} px-4 py-2 rounded-pill`} 
            onClick={onClose}
            style={{ minWidth: '120px' }}
          >
            Tamam
          </button>
        </div>
      </div>
    </div>
  );
};

// CSS Stilleri (Sayfanın ortasına sabitlemek için)
const styles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Arkası yarı saydam siyah
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999 // Her şeyin en üstünde
  },
  modal: {
    width: '90%',
    maxWidth: '400px',
    borderRadius: '15px',
    animation: 'fadeIn 0.3s ease-in-out'
  }
};

export default CustomAlert;