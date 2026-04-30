import mongoose from 'mongoose';

const contributionSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  company_name: {
    type: String,
    required: true,
  },
  question_text: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  }
});

const Contribution = mongoose.model('Contribution', contributionSchema);
export default Contribution;
