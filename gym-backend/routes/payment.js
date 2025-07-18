const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const mongoose = require('mongoose');
const cors = require('cors'); // Add this dependency

// Enable CORS for all routes
router.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:3001'], // Add your frontend URLs
  credentials: true
}));

// Add middleware to parse JSON
router.use(express.json());

// Update the payment schema to replace Razorpay fields:
const paymentSchema = new mongoose.Schema({
  orderId: { type: String, required: true, unique: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  customerInfo: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String }
  },
  cartItems: [{ type: Object }],
  paymentMethod: { type: String, required: true },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  googlePayTransactionId: { type: String },
  upiTransactionId: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Payment = mongoose.model('Payment', paymentSchema);

// Create order route
router.post('/create-order', async (req, res) => {
  try {
    const { amount, currency = 'INR', customerInfo, cartItems } = req.body;
    
    // Validate required fields
    if (!amount || !customerInfo || !cartItems) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: amount, customerInfo, or cartItems' 
      });
    }

    // Validate customerInfo
    if (!customerInfo.name || !customerInfo.email || !customerInfo.phone) {
      return res.status(400).json({ 
        success: false, 
        error: 'Customer info incomplete: name, email, and phone are required' 
      });
    }
    
    const orderId = `order_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    
    const payment = new Payment({
      orderId,
      amount: Number(amount),
      currency,
      customerInfo,
      cartItems,
      paymentMethod: 'upi', // Changed from 'googlepay' to 'upi'
      status: 'pending'
    });
    
    await payment.save();
    
    console.log('Order created successfully:', orderId);
    
    // Return order details for UPI payment
    res.json({
      success: true,
      orderId,
      amount: Number(amount),
      currency,
      upiId: process.env.GOOGLE_PAY_UPI_ID || 'vp1246194@okhdfcbank',
      merchantName: 'Vineet Pandey'
    });
    
  } catch (error) {
    console.error('Error creating order:', error);
    
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        error: 'Order ID already exists' 
      });
    }
    
    res.status(500).json({ 
      success: false, 
      error: 'Failed to create order',
      details: error.message 
    });
  }
});

// Confirm payment route
router.post('/confirm-payment', async (req, res) => {
  try {
    const { orderId, transactionId, status } = req.body;
    
    // Validate required fields
    if (!orderId || !status) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields: orderId or status' 
      });
    }
    
    const updateData = {
      status: status === 'success' ? 'completed' : 'failed',
      updatedAt: new Date()
    };
    
    if (transactionId) {
      updateData.googlePayTransactionId = transactionId;
    }
    
    // Update payment record
    const updatedPayment = await Payment.findOneAndUpdate(
      { orderId },
      updateData,
      { new: true }
    );
    
    if (!updatedPayment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Payment record not found' 
      });
    }
    
    console.log('Payment status updated:', orderId, status);
    
    res.json({ 
      success: true, 
      message: 'Payment status updated',
      payment: updatedPayment 
    });
    
  } catch (error) {
    console.error('Error confirming payment:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to confirm payment',
      details: error.message 
    });
  }
});

// Get payment status
router.get('/status/:orderId', async (req, res) => {
  try {
    const { orderId } = req.params;
    
    if (!orderId) {
      return res.status(400).json({ 
        success: false, 
        error: 'Order ID is required' 
      });
    }
    
    const payment = await Payment.findOne({ orderId });
    
    if (!payment) {
      return res.status(404).json({ 
        success: false, 
        error: 'Payment not found' 
      });
    }

    res.json({ 
      success: true, 
      payment: {
        orderId: payment.orderId,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status,
        customerInfo: payment.customerInfo,
        createdAt: payment.createdAt,
        updatedAt: payment.updatedAt
      }
    });

  } catch (error) {
    console.error('Error getting payment status:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to get payment status',
      details: error.message 
    });
  }
});

// Health check route
router.get('/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Payment service is running',
    timestamp: new Date().toISOString()
  });
});

// Remove the old verify-payment route as it's Razorpay specific
// Keep it commented for reference if needed later
/*
router.post('/verify-payment', async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = req.body;

    // Verify signature
    const body = razorpayOrderId + "|" + razorpayPaymentId;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET || 'your_secret_key')
      .update(body.toString())
      .digest("hex");

    const isAuthentic = expectedSignature === razorpaySignature;

    if (isAuthentic) {
      // Update payment record
      await Payment.findOneAndUpdate(
        { razorpayOrderId },
        {
          status: 'completed',
          razorpayPaymentId,
          razorpaySignature
        }
      );

      res.json({ success: true, message: 'Payment verified successfully' });
    } else {
      res.status(400).json({ success: false, error: 'Invalid signature' });
    }

  } catch (error) {
    console.error('Error verifying payment:', error);
    res.status(500).json({ success: false, error: 'Failed to verify payment' });
  }
});
*/

module.exports = router;