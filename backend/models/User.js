import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^[a-zA-Z0-9._%+-]+@iitk\.ac\.in$/, 'Only @iitk.ac.in emails are allowed!'],
    },
    password: { type: String, required: true },
    hall: { type: String, default: 'Hall 1' },
    year: { type: String, default: 'Y21' },
    isOnline: { type: Boolean, default: false },
    lastSeen: { type: Date, default: Date.now },
    
    // Password Reset Fields
    resetOtp: { type: String },
    resetOtpExpire: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.User || mongoose.model('User', userSchema);