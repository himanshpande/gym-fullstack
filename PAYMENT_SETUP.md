# Payment System Setup Guide

## Overview
This guide explains how to set up and test the payment functionality in your gym application.

## Issues Fixed

### 1. **BuyNow Component Issues**
- ❌ **Before**: Only showed an alert instead of actual payment processing
- ✅ **After**: Now integrates with PaymentPage component for real payment processing

### 2. **Payment Form Issues**
- ❌ **Before**: Form had no onSubmit handler
- ✅ **After**: Proper form submission with payment processing

### 3. **Backend Integration**
- ❌ **Before**: No backend payment processing
- ✅ **After**: Complete backend with Razorpay integration

### 4. **Payment Flow**
- ❌ **Before**: Mock payment with just alerts
- ✅ **After**: Real payment flow with order creation and verification

## Setup Instructions

### 1. Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd gym-backend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create .env file:**
   ```bash
   touch .env
   ```

4. **Add environment variables:**
   ```env
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   RAZORPAY_KEY_ID=rzp_test_1DP5mmOlF5G5ag
   RAZORPAY_KEY_SECRET=your_razorpay_secret_key
   EMAIL_USER=your_email@gmail.com
   EMAIL_PASS=your_email_app_password
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```

### 2. Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd src
   ```

2. **Start the frontend:**
   ```bash
   npm start
   ```

## How to Test Payment

### 1. **Add Items to Cart**
- Go to the gym courses section
- Click "Add to Cart" on any course
- Open the cart sidebar

### 2. **Initiate Payment**
- Click "Proceed to Buy" in the cart
- Select a payment method (Credit/Debit Card, UPI, etc.)
- Click "Proceed to Payment"

### 3. **Complete Payment Form**
- Fill in customer information (name, email, phone)
- Select payment method (Razorpay or UPI)
- Click "Pay Securely"

### 4. **Test Payment**
- For testing, use Razorpay test credentials:
  - **Card Number**: 4111 1111 1111 1111
  - **Expiry**: Any future date
  - **CVV**: Any 3 digits
  - **Name**: Any name

## Payment Flow

```
User clicks "Buy Now" 
    ↓
BuyNow component shows payment options
    ↓
User selects payment method
    ↓
PaymentPage component loads
    ↓
User fills customer info
    ↓
Backend creates order (/api/payment/create-order)
    ↓
Razorpay modal opens
    ↓
User completes payment
    ↓
Backend verifies payment (/api/payment/verify-payment)
    ↓
Payment success/failure response
```

## API Endpoints

### 1. **Create Order**
```
POST /api/payment/create-order
Body: {
  amount: number,
  currency: string,
  customerInfo: object,
  cartItems: array
}
```

### 2. **Verify Payment**
```
POST /api/payment/verify-payment
Body: {
  razorpayOrderId: string,
  razorpayPaymentId: string,
  razorpaySignature: string
}
```

### 3. **Get Payment Status**
```
GET /api/payment/status/:orderId
```

## Troubleshooting

### 1. **Payment Not Working**
- Check if backend is running on port 5000
- Verify Razorpay keys are correct
- Check browser console for errors

### 2. **CORS Issues**
- Ensure backend has CORS enabled
- Check proxy configuration in package.json

### 3. **Database Issues**
- Verify MongoDB connection string
- Check if Payment model is created

### 4. **Razorpay Issues**
- Use test keys for development
- Replace with production keys for live payments
- Ensure Razorpay script loads properly

## Security Notes

1. **Never expose secret keys in frontend code**
2. **Always verify payment signatures on backend**
3. **Use HTTPS in production**
4. **Implement proper error handling**
5. **Log all payment attempts for audit**

## Production Deployment

1. **Replace test keys with production keys**
2. **Set up proper environment variables**
3. **Configure HTTPS**
4. **Set up payment webhooks**
5. **Implement proper error monitoring**

## Files Modified

- `src/Payment/BuyNow.js` - Integrated with PaymentPage
- `src/Payment/Pay.js` - Added backend integration
- `src/Dashboard/CartSidebar.js` - Pass cart items to BuyNow
- `gym-backend/routes/payment.js` - New payment routes
- `gym-backend/server.js` - Added payment routes
- `package.json` - Added proxy configuration
- `src/Payment/BuyNow.css` - Added selected state styles 