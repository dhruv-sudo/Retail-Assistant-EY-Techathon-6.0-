import React, { useState } from 'react';
import './PaymentPending.css';
import { ShieldCheck, Clock, RefreshCw } from 'lucide-react'; // Assuming you use lucide-react or similar icons

const PaymentPending = ({ transactionId = "TXN-12345" }) => {
  const [isChecking, setIsChecking] = useState(false);

  const handleCheckStatus = () => {
    setIsChecking(true);
    // Simulate an API check
    setTimeout(() => {
      setIsChecking(false);
      alert("Status updated: Still verifying with bank.");
    }, 2000);
  };

  return (
    <div className="payment-safe-frame">
      <div className="safe-icon-container">
        {/* Shield icon represents security/safety */}
        <ShieldCheck size={48} color="#0056b3" />
      </div>

      <h2 className="safe-title">Payment Verification in Progress</h2>
      
      <div className="safe-message-box">
        <p className="primary-text">
          <strong>Did money get deducted from your account?</strong>
        </p>
        <p className="secondary-text">
          Please do not panic. Your funds are safe with us. <br />
          Sometimes, banks take a few minutes to confirm the transaction status due to network delays.
        </p>
      </div>

      <div className="status-timeline">
        <div className="timeline-item">
          <Clock size={16} className="text-gray" />
          <span>Expected confirmation: <strong>5-10 Minutes</strong></span>
        </div>
      </div>

      <div className="action-area">
        <button 
          className={`check-status-btn ${isChecking ? 'loading' : ''}`} 
          onClick={handleCheckStatus}
          disabled={isChecking}
        >
          {isChecking ? (
            <>Checking Bank...</>
          ) : (
            <>
              <RefreshCw size={18} style={{marginRight: '8px'}}/> Check Status Now
            </>
          )}
        </button>
      </div>

      <p className="transaction-ref">
        Transaction ID: <span>{transactionId}</span>
      </p>
    </div>
  );
};

export default PaymentPending;