const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
  },
  contactPerson: {
    type: String,
    required: [true, 'Please provide a contact person name'],
  },
  phone: {
    type: String,
    required: [true, 'Please provide a phone number'],
  },
  natureOfBusiness: {
    type: String,
    required: [true, 'Please provide the nature of business'],
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending',
  },
  backOfficeLink: String,
  backOfficeUsername: String,
  backOfficePassword: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.models.User || mongoose.model('User', UserSchema);
