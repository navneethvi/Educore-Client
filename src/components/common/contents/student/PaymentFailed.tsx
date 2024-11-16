import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const PaymentFailed: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to the homepage after 5 seconds
    const timer = setTimeout(() => {
      navigate('/');
    }, 5000);

    // Cleanup the timer on component unmount
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        textAlign: 'center',
      }}
    >
      <h1>Payment Failed</h1>
      <p>Something went wrong with your payment. Redirecting to the homepage in 5 seconds...</p>
    </div>
  );
};

export default PaymentFailed;
