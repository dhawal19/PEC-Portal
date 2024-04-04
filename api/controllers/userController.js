// Import necessary models or database operations
const User = require('../models/userModel'); // Assuming you have a User model

// Controller function for deleting user account
const deleteAccount = async (req, res) => {
    try {
        const email = req.email;

        // Find the user by ID and delete it from the database
        const deletedUser = await User.findOneAndDelete({ email: email });

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Respond with a success message
        return res.status(200).json({ message: 'User account deleted successfully' });
    } catch (error) {
        console.error('Error deleting user account:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
    deleteAccount
};
