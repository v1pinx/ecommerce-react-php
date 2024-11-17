import React from 'react';
import { Toaster } from 'react-hot-toast';

export default function MagicalToaster() {
  return (
    <Toaster
      position="top-right"
      reverseOrder={false}
      gutter={12}
      containerClassName="font-sans"
      containerStyle={{
        top: 80
      }}
      toastOptions={{
        className: '',
        duration: 5000,
        style: {
          background: 'rgba(23, 23, 23, 0.95)',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
          fontSize: '0.875rem',
          boxShadow: '0 8px 16px rgba(0, 0, 0, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(8px)',
          transform: 'translateZ(0)',
          animation: 'toast-slide-in 0.3s cubic-bezier(0.21, 1.02, 0.73, 1)'
        },
        success: {
          style: {
            background: 'rgba(23, 23, 23, 0.95)',
            borderLeft: '4px solid #10B981'
          },
          iconTheme: {
            primary: '#10B981',
            secondary: '#FFFFFF'
          }
        },
        error: {
          style: {
            background: 'rgba(23, 23, 23, 0.95)',
            borderLeft: '4px solid #EF4444'
          },
          iconTheme: {
            primary: '#EF4444',
            secondary: '#FFFFFF'
          }
        }
      }}
    />
  );
}