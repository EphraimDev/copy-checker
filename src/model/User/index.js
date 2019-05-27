import mongoose from 'mongoose';
import { sign } from 'jsonwebtoken';
import { jwtsecret } from '../../config';

const { Schema } = mongoose;
const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  is_admin: {
    type: Boolean,
  },

}, { timestamps: true });

userSchema.methods.generateJWT = function generate() {
  return sign(
    {
      _id: this._id,
      name: this.name,
      email: this.email,
      admin: this.is_admin,
    },
    jwtsecret,
    {
      expiresIn: '24h',
    },
  );
};

export const User = mongoose.model('User', userSchema);
