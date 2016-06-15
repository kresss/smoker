'use strict';

import mongoose from 'mongoose';

var TemperatureSchema = new mongoose.Schema({
  probe: String,
  value: Number,
  time: { type: Date, default: Date.now }
});

export default mongoose.model('Temperature', TemperatureSchema);
