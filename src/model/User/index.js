import mongoose from 'mongoose';
import { sign } from 'jsonwebtoken';
import config from '../../config';

const { Schema } = mongoose;
const jwtsecret = config.jwt.secret;
const userSchema = new Schema({
  firstname: { type: String, required: true },
  lastname: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  is_admin: { type: String, required: false, default: false}
}, { timestamps: true });

userSchema.methods.generateJWT = function generate(id, email) {
  return sign(
    {
      id,
      email,
      is_admin: this.is_admin
    },
    jwtsecret,
    {
      expiresIn: '24h',
    },
  );
};

export const User = mongoose.model('User', userSchema);
