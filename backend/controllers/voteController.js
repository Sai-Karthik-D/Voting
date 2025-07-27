import Vote from "../models/Vote.js";

export const castVote = async (req, res) => {
  console.log('Incoming vote request:', req.body); // 👈 Add this

  const { voter, choice } = req.body;
  if (!voter || !choice) {
    return res.status(400).json({ success: false, message: 'Voter and choice are required' });
  }
  try {
    const newVote = new Vote({ voter, choice });
    await newVote.save();
    return res.status(201).json({ success: true, data: newVote });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const getResults = async (req, res) => {
    try {
        const votes = await Vote.find({});
        const results={};
        for(let vote of votes) {
            if(!results[vote.choice]) {
                results[vote.choice] = 0;
            }
            results[vote.choice]++;
        }
        return res.status(200).json({success: true, data: results});
    } catch (error) {
        console.error(error);
        return res.status(500).json({success: false, message: error.message});
    }
};