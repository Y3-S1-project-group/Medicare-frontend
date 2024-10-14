import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Add this import

const PaymentForm = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('Credit/Debit Card');
  const [formData, setFormData] = useState({
    cardHolder: '',
    cardNumber: '',
    expiryDate: '',
    securityCode: '',
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;

    if (id === 'cardNumber') {
      const formattedValue = value.replace(/\D/g, '').replace(/(.{4})/g, '$1-').trim();
      setFormData((prev) => ({ ...prev, [id]: formattedValue.slice(0, 19) }));
    } else if (id === 'expiryDate') {
      const formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{0,2})/, '$1/$2').trim();
      setFormData((prev) => ({ ...prev, [id]: formattedValue.slice(0, 5) }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
    
    // Validate on change
    validateField(id, value);
  };

  // Validate individual fields
  const validateField = (field, value) => {
    let error = '';

    switch (field) {
      case 'cardHolder':
        error = !value.trim() ? "Card Holder's Name is required." : /^[A-Za-z\s]+$/.test(value) ? '' : "Name can only contain letters and spaces.";
        break;
      case 'cardNumber':
        error = !value.trim() ? 'Card Number is required.' : /^\d{13,19}$/.test(value.replace(/-/g, '')) ? '' : 'Card Number must be between 13 to 19 digits.';
        break;
      case 'expiryDate':
        error = !value.trim() ? 'Expiry Date is required.' : /^(0[1-9]|1[0-2])\/\d{2}$/.test(value) ? validateExpiryDate(value) : 'Expiry Date must be in MM/YY format.';
        break;
      case 'securityCode':
        error = !value.trim() ? 'Security Code is required.' : /^\d{3,4}$/.test(value) ? '' : 'Security Code must be 3 or 4 digits.';
        break;
      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
  };

  // Check if the expiry date is a future date
  const validateExpiryDate = (value) => {
    const [month, year] = value.split('/');
    const expiry = new Date(`20${year}`, month);
    const now = new Date();
    return expiry <= now ? 'Expiry Date must be a future date.' : '';
  };

  // Validate all fields before submission
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach((field) => {
      validateField(field, formData[field]);
      if (!formData[field].trim()) {
        newErrors[field] = `${field} is required.`;
      }
    });
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => error === '');
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert('Appointment booked successfully!');
      navigate('/Home'); 
      resetForm();
    } else {
      alert('Please fix the errors in the form.');
    }
  };

  // Reset form data and errors
  const resetForm = () => {
    setFormData({
      cardHolder: '',
      cardNumber: '',
      expiryDate: '',
      securityCode: '',
    });
    setErrors({});
  };

  return (
    <div
      style={{
        margin: '0 auto',
        backgroundColor: 'white',
        padding: '14px 10%', 
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        position: 'relative',
        marginTop: '10px',
        marginLeft: '200px', 
        maxWidth: '1200px',
      }}>
   
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '45%',
          backgroundColor: '#EBF8FF',
          zIndex: 0,
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
        }}></div>

      <div style={{ position: 'relative', zIndex: 10 }}>
        {/* Payment details section */}
        <div style={{ display: 'flex', marginBottom: '24px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginRight: '32px' }}>
            <div
              style={{
                width: '120px',
                height: '120px',
                backgroundColor: '#3B82F6',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '64px',
                fontWeight: 'bold',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                marginBottom: '16px',
              }}>₹
            </div>

            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '20px', color: '#4B5563', marginBottom: '4px' }}>Payment For: Channeling Fee</div>
              <div style={{ fontSize: '20px', color: '#4B5563', marginBottom: '4px' }}>Pay By: Lahiru Theekshana</div>
              <div style={{ fontSize: '20px', color: '#4B5563' }}>Date: 26/08/2024</div>
            </div>
          </div>

          <div style={{ flex: 1 }}>
            <div style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '16px', color: '#3B82F6' }}>
              2500.00 LKR
            </div>

            {/* Payment options section */}
            <div
              style={{
                width: '300px',
                marginTop: '24px',
                border: '1px solid #D1D5DB',
                borderRadius: '8px',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                padding: '16px',
              }}>

              <h3 style={{ fontWeight: 'bold', marginBottom: '16px', fontSize: '18px' }}>Pay with</h3>
              <PaymentOptions paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod} />
            </div>
          </div>
        </div>

        {/* Credit/Debit Card section */}
        {paymentMethod === 'Credit/Debit Card' && (
          <>
            <h3 style={{ fontWeight: 'bold', marginBottom: '20px', fontSize: '24px' }}>Credit / Debit Card</h3>
            <CardDetailsForm
              formData={formData}
              errors={errors}
              handleChange={handleChange}
              handleSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
};

  const PaymentOptions = ({ paymentMethod, setPaymentMethod }) => (
    <div>
      {['Credit/Debit Card', 'Mobile Wallet', 'Internet Banking'].map((method) => (
        <div
          key={method}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}
        >
          <label style={{ display: 'flex', alignItems: 'center', fontSize: '16px' }}>
            <input
              type="radio"
              name="paymentMethod"
              value={method}
              checked={paymentMethod === method}
              onChange={(e) => setPaymentMethod(e.target.value)}
              style={{ marginRight: '12px', width: '20px', height: '20px' }}
            />
            {method}
          </label>
        </div>
      ))}
    </div>
  );

  const CardDetailsForm = ({ formData, errors, handleChange, handleSubmit }) => (
    <form
        onSubmit={handleSubmit}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '32px',
          justifyContent: 'center', // Centers the content horizontally
        }}>
      {[
        { id: 'cardHolder', label: "Card Holder's Name :", placeholder: 'Enter your name' },
        { id: 'cardNumber', label: 'Card Number :', placeholder: 'Enter your card number' },
        { id: 'expiryDate', label: 'Expiry Date :', placeholder: 'MM/YY' },
        { id: 'securityCode', label: 'Security Code :', placeholder: '3 or 4 digits' },
      ].map(({ id, label, placeholder }) => (
        <div key={id}>
          <label htmlFor={id} style={{ fontSize: '16px', fontWeight: 'bold', marginBottom: '4px', display: 'block' }}>
            {label}
          </label>
          <input
            type="text"
            id={id}
            value={formData[id]}
            onChange={handleChange}
            placeholder={placeholder}
            style={{
              padding: '8px',
              width: '100%',
              borderRadius: '4px',
              border: '1px solid #D1D5DB',
              fontSize: '16px',
            }}/>
          {errors[id] && <p style={{ color: 'red', marginTop: '4px' }}>{errors[id]}</p>}
        </div>
      ))}
      
      <div
        style={{
          gridColumn: 'span 2', // Ensures the button spans across both columns
          display: 'flex',
          justifyContent: 'center', // Centers the button horizontally
        }}>

        <button
          type="submit"
          style={{
            width: '50%',
            padding: '12px 0',
            backgroundColor: '#3B82F6',
            color: 'white',
            border: 'none',
            borderRadius: '10px',
            fontSize: '18px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#2563EB')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#3B82F6')}
        >Pay Now</button>
      </div>
    </form>

  );

export default PaymentForm;
