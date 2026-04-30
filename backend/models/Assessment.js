import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  test_type: {
    type: String,
    required: true,
  },
  subject: {
    type: String,
    required: true,
  },
  score: {
    type: Number,
    required: true,
  },
  total: {
    type: Number,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const Assessment = mongoose.model('Assessment', assessmentSchema);
export default Assessment;
