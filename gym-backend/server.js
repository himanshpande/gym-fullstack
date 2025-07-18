const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();
const workoutRoutes = require('./routes/workout');
const statsRoutes = require('./routes/statsRoutes');

// Import payment routes
const paymentRoutes = require('./routes/payment');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Payment routes
app.use('/api/payment', paymentRoutes);
app.use('/api/workout', workoutRoutes);
app.use('/api', statsRoutes);


// Enhanced user schema with additional profile fields
const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  location: { type: String, default: '' },
  profilePicture: { type: String, default: '' },
  bio: { type: String, default: '' },
  dateOfBirth: { type: Date },
  gender: { type: String, enum: ['male', 'female', 'other', ''], default: '' },
  stats: {
    goalsCompleted: { type: Number, default: 0 },
    totalGoals: { type: Number, default: 0 },
    progressPercentage: { type: Number, default: 0 },
    achievements: { type: Number, default: 0 },
    daysActive: { type: Number, default: 0 },
    lastActiveDate: { type: Date, default: Date.now }
  }
}, { timestamps: true });

// Contact inquiry schema
const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  inquiryType: { type: String, required: true },
  membershipPlan: { type: String },
  membershipDuration: { type: String },
  trainingType: { type: String },
  experience: { type: String },
  classType: { type: String },
  schedule: { type: String },
  nutritionGoal: { type: String },
  dietaryRestrictions: { type: String },
  corporateSize: { type: String },
  corporateServices: { type: String },
  message: { type: String, required: true },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  emailSent: { type: Boolean, default: false }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
const Contact = mongoose.model('Contact', contactSchema);

// Fixed nodemailer configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

// Test email connection on startup
transporter.verify((error, success) => {
  if (error) {
    console.error('Email configuration error:', error);
  } else {
    console.log('Email server is ready to send messages');
  }
});

// Email templates
const getAdminEmailTemplate = (contactData) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <h2 style="color: #333; text-align: center; margin-bottom: 30px;">🏋️ New Gym Inquiry - ${contactData.inquiryType}</h2>
        
        <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #495057; margin-bottom: 15px;">Contact Details:</h3>
          <p><strong>Name:</strong> ${contactData.name}</p>
          <p><strong>Email:</strong> ${contactData.email}</p>
          <p><strong>Phone:</strong> ${contactData.phone || 'Not provided'}</p>
          <p><strong>Inquiry Type:</strong> ${contactData.inquiryType}</p>
        </div>

        ${contactData.membershipPlan ? `
        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #1976d2; margin-bottom: 15px;">Membership Details:</h3>
          <p><strong>Plan:</strong> ${contactData.membershipPlan}</p>
          <p><strong>Duration:</strong> ${contactData.membershipDuration}</p>
        </div>
        ` : ''}

        ${contactData.trainingType ? `
        <div style="background-color: #f3e5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #7b1fa2; margin-bottom: 15px;">Training Details:</h3>
          <p><strong>Type:</strong> ${contactData.trainingType}</p>
          <p><strong>Experience:</strong> ${contactData.experience}</p>
        </div>
        ` : ''}

        ${contactData.classType ? `
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #388e3c; margin-bottom: 15px;">Class Details:</h3>
          <p><strong>Type:</strong> ${contactData.classType}</p>
          <p><strong>Schedule:</strong> ${contactData.schedule}</p>
        </div>
        ` : ''}

        ${contactData.nutritionGoal ? `
        <div style="background-color: #fff3e0; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #f57c00; margin-bottom: 15px;">Nutrition Details:</h3>
          <p><strong>Goal:</strong> ${contactData.nutritionGoal}</p>
          <p><strong>Dietary Restrictions:</strong> ${contactData.dietaryRestrictions || 'None'}</p>
        </div>
        ` : ''}

        ${contactData.corporateSize ? `
        <div style="background-color: #fce4ec; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #c2185b; margin-bottom: 15px;">Corporate Details:</h3>
          <p><strong>Company Size:</strong> ${contactData.corporateSize}</p>
          <p><strong>Services:</strong> ${contactData.corporateServices}</p>
        </div>
        ` : ''}

        <div style="background-color: #f5f5f5; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
          <h3 style="color: #333; margin-bottom: 15px;">Message:</h3>
          <p style="line-height: 1.6;">${contactData.message}</p>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #666; font-size: 14px;">
            Submitted on: ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}
          </p>
        </div>
      </div>
    </div>
  `;
};

const getUserEmailTemplate = (contactData) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
      <div style="background-color: #ffffff; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
        <div style="text-align: center; margin-bottom: 30px;">
          <h2 style="color: #333; margin-bottom: 10px;">🏋️ Welcome to PowerFit Gym!</h2>
          <p style="color: #666; font-size: 18px;">Thank you for reaching out to us</p>
        </div>
        
        <div style="background-color: #e8f5e8; padding: 20px; border-radius: 8px; margin-bottom: 25px; text-align: center;">
          <h3 style="color: #388e3c; margin-bottom: 15px;">Hi ${contactData.name}!</h3>
          <p style="color: #4a4a4a; line-height: 1.6;">
            We've received your inquiry about <strong>${contactData.inquiryType}</strong> and our team will get back to you within 24 hours.
          </p>
        </div>

        <div style="background-color: #f8f9fa; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="color: #333; margin-bottom: 20px; text-align: center;">What's Next?</h3>
          <div style="text-align: left;">
            <p style="margin-bottom: 10px;">✅ Our fitness experts will review your inquiry</p>
            <p style="margin-bottom: 10px;">📞 We'll contact you within 24 hours</p>
            <p style="margin-bottom: 10px;">🎯 We'll create a personalized plan for your goals</p>
            <p style="margin-bottom: 0;"> Don't forget - your first week is FREE!</p>
          </div>
        </div>

        <div style="background-color: #e3f2fd; padding: 20px; border-radius: 8px; margin-bottom: 25px;">
          <h3 style="color: #1976d2; margin-bottom: 15px; text-align: center;">Contact Information</h3>
          <div style="text-align: center;">
            <p style="margin-bottom: 8px;">📧 Email: info@powerfitgym.com</p>
            <p style="margin-bottom: 8px;">📱 Phone: +1 (555) FIT-NESS</p>
            <p style="margin-bottom: 0;">📍 Address: 123 Fitness Ave, Downtown</p>
          </div>
        </div>

        <div style="text-align: center; margin-top: 30px;">
          <p style="color: #333; font-size: 16px; margin-bottom: 10px;">
            We can't wait to welcome you to our fitness community! 💪
          </p>
          <p style="color: #666; font-size: 14px;">
            Best regards,<br>
            The PowerFit Gym Team
          </p>
        </div>

        <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
          <p style="color: #999; font-size: 12px;">
            This email was sent because you filled out our contact form. If you didn't request this, please ignore this email.
          </p>
        </div>
      </div>
    </div>
  `;
};

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed!'), false);
    }
  }
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/gym-app')
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// FIXED: Contact form submission endpoint
app.post('/api/contact', async (req, res) => {
  try {
    console.log('Contact form submission received:', req.body);

    const {
      name,
      email,
      phone,
      inquiryType,
      membershipPlan,
      membershipDuration,
      trainingType,
      experience,
      classType,
      schedule,
      nutritionGoal,
      dietaryRestrictions,
      corporateSize,
      corporateServices,
      message
    } = req.body;

    // Validate required fields
    if (!name || !email || !inquiryType || !message) {
      return res.status(400).json({ 
        message: 'Name, email, inquiry type, and message are required',
        success: false
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        message: 'Please enter a valid email address',
        success: false
      });
    }

    // Save contact inquiry to database
    const contactInquiry = new Contact({
      name,
      email,
      phone,
      inquiryType,
      membershipPlan,
      membershipDuration,
      trainingType,
      experience,
      classType,
      schedule,
      nutritionGoal,
      dietaryRestrictions,
      corporateSize,
      corporateServices,
      message
    });

    await contactInquiry.save();
    console.log('Contact inquiry saved to database');


    try {
      // Send email to admin
      const adminMailOptions = {
        from: process.env.EMAIL_USER,
        to: process.env.ADMIN_EMAIL || 'info@powerfitgym.com',
        subject: `New Gym Inquiry - ${inquiryType}`,
        html: getAdminEmailTemplate(req.body)
      };

      // Send thank you email to user
      const userMailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Welcome to PowerFit Gym - We received your inquiry!',
        html: getUserEmailTemplate(req.body)
      };

      // Send both emails in parallel
      await Promise.all([
        transporter.sendMail(adminMailOptions),
        transporter.sendMail(userMailOptions)
      ]);

      console.log('Emails sent successfully');
      
      // Update the contact record to mark email as sent
      contactInquiry.emailSent = true;
      await contactInquiry.save();

    } catch (emailError) {
      console.error('Email sending failed:', emailError);
      // Don't fail the request if email fails
    }

    res.status(201).json({
      message: 'Thank you for your inquiry! We will get back to you within 24 hours.',
      success: true
    });

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    res.status(500).json({ 
      message: 'There was an error processing your request. Please try again or contact us directly.',
      success: false,
      error: error.message 
    });
  }
});

// Get all contact inquiries (admin only)
app.get('/api/contacts', authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ contacts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching contacts', error: error.message });
  }
});

// Update contact status (admin only)
app.put('/api/contacts/:id', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.json({ message: 'Contact updated successfully', contact });
  } catch (error) {
    res.status(500).json({ message: 'Error updating contact', error: error.message });
  }
});

// Registration endpoint
app.post('/api/register', async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      name,
      email,
      password: hashedPassword,
      phone
    });

    await user.save();
    
    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.status(201).json({
      message: 'User created successfully',
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        phone: user.phone,
        location: user.location,
        profilePicture: user.profilePicture,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
});

// Login endpoint
app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Update last active date
    user.stats.lastActiveDate = new Date();
    await user.save();

    const token = jwt.sign(
      { userId: user._id }, 
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '7d' }
    );

    res.json({
      message: 'Login successful',
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        phone: user.phone,
        location: user.location,
        profilePicture: user.profilePicture,
        bio: user.bio,
        stats: user.stats,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

// Get user profile
app.get('/api/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json({ user });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching profile', error: error.message });
  }
});

// Update user profile
app.put('/api/profile', authenticateToken, async (req, res) => {
  try {
    const { name, phone, location, bio, dateOfBirth, gender } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        name,
        phone,
        location,
        bio,
        dateOfBirth,
        gender
      },
      { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Profile updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating profile', error: error.message });
  }
});

// Upload profile picture
app.post('/api/profile/upload-picture', authenticateToken, upload.single('profilePicture'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const profilePictureUrl = `/uploads/${req.file.filename}`;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      { profilePicture: profilePictureUrl },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ 
      message: 'Profile picture uploaded successfully', 
      profilePicture: profilePictureUrl,
      user 
    });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading picture', error: error.message });
  }
});

// Update user stats (for tracking goals, achievements, etc.)
app.put('/api/profile/stats', authenticateToken, async (req, res) => {
  try {
    const { goalsCompleted, totalGoals, progressPercentage, achievements, daysActive } = req.body;
    
    const user = await User.findByIdAndUpdate(
      req.userId,
      {
        'stats.goalsCompleted': goalsCompleted,
        'stats.totalGoals': totalGoals,
        'stats.progressPercentage': progressPercentage,
        'stats.achievements': achievements,
        'stats.daysActive': daysActive,
        'stats.lastActiveDate': new Date()
      },
      { new: true }
    ).select('-password');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ message: 'Stats updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Error updating stats', error: error.message });
  }
});

// Add a health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    mongodb: mongoose.connection.readyState === 1 ? 'connected' : 'disconnected'
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});