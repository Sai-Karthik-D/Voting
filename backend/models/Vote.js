import mongoose from "mongoose";

const voteSchema = new mongoose.Schema({
        voter: {
    type: String,
    enum: ['Karthik', 'Deepthi'],
    required: true,
  },
  choice: {
    type: String,
    required: true,
  },
}, { timestamps: true });

const Vote = mongoose.model('Vote', voteSchema);
export default Vote; // Exporting the Vote model