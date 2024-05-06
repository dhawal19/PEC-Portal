// Import the Feedback model
const User = require('../models/userModel');

const deleteProfile = async (req, res) => {
    try {
        const userEmail = req.email;
        const user = await User.findOne({ email: userEmail });
        if (!user) return res.status(404).json({ message: 'User not found' });
        await User.findOneAndDelete({ email: userEmail });
        res.status(200).json({ message: 'User profile deleted successfully' });
    } catch (error) {
        console.error('Error deleting profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

const updateProfile = async (req, res) => {
    try {
        const userEmail = req.email;
        const { email, bio, SID, branch, societies } = req.body;

        const user = await User.findOne({ email: userEmail });
        if (!user) return res.status(404).json({ message: 'User not found' });

        if (email) user.email = email;
        if (bio) user.bio = bio;
        if (SID) user.SID = SID;
        if (branch) user.branch = branch;
        if (societies) {
            // Ensure societies is an array
            if (!Array.isArray(societies)) {
                return res.status(400).json({ message: 'Societies must be an array' });
            }
            // Clear existing societies array and push new values
            user.societies = [];
            societies.forEach(society => {
                user.societies.push(society);
            });
        }
        await user.save();
        console.log(user);
        return res.status(200).json({ message: 'User profile updated successfully' });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = { deleteProfile, updateProfile };
