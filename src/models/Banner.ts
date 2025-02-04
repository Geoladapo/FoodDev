import * as mongoose from 'mongoose';
import {model} from 'mongoose';

const bannerSchema = new mongoose.Schema({
  banner: {type: String, required: true},
  status: {type: Number, required: true, default: 1},
  created_at: {type: String, required: true, default: new Date()},
  updated_at: {type: String, required: true, default: new Date()}
});

export default model('Banner', bannerSchema);
