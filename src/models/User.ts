import * as mongoose from 'mongoose';
import {model} from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {type: 'string', required: true},
  email: {type: 'string', required: true, unique: true},
  email_verified: {type: Boolean, required: true, default: false},
  verification_token: {type: Number, required: true},
  verification_token_time: {type: Date, required: true},
  phone: {type: 'string', required: true},
  password: {type: 'string', required: true},
  type: {type: 'string', required: true},
  status: {type: 'string', required: true},
  created_at: {type: 'string', required: true, default: new Date()},
  updated_at: {type: 'string', required: true, default: new Date()},
});

export default model('User', userSchema);
