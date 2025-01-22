import * as mongoose from 'mongoose';
import { model } from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { type: 'string', required: true },
  email: { type: 'string', required: true },
  phone: { type: 'string', required: true },
  password: { type: 'string', required: true },
  type: { type: 'string', required: true },
  status: { type: 'string', required: true },
  created_at: { type: 'string', required: true, default: new Date() },
  updated_at: { type: 'string', required: true, default: new Date() },
});

export default model('User', userSchema);
