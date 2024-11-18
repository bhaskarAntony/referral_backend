const CallBacks = require("../models/callback");


// Create a new support ticket
const postCallback = async (req, res) => {
    const data = req.body;
    try {
        const newFriend = new CallBacks(data);
        await newFriend.save();
        res.status(200).json({
            message: 'Submitted a Friend data',
            data: newFriend
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to Submit Friend data',
            error: error.message
        });
    }
};

// Get all support tickets
const getAllCallbacks = async (req, res) => {
    try {
        const allFriends = await CallBacks.find();
        res.status(200).json({
            message: 'Fetched all Friend data',
            data: allFriends
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch Friend data',
            error: error.message
        });
    }
};

// Get a single support ticket by ID
const getSingleCallback = async (req, res) => {
    const { id } = req.params;
    try {
        const friendData = await CallBacks.findById(id);
        if (!friendData) {
            return res.status(404).json({
                message: 'Friend data not found'
            });
        }
        res.status(200).json({
            message: 'Fetched Friend data',
            data: friendData
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch Friend data',
            error: error.message
        });
    }
};

// Update a support ticket by ID
const updateCallback= async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updateData = await CallBacks.findByIdAndUpdate(id, data, { new: true });
        if (!updateData) {
            return res.status(404).json({
                message: 'Friend data not found'
            });
        }
        res.status(200).json({
            message: 'Friend data updated successfully',
            data: updateData
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update Friend data',
            error: error.message
        });
    }
};

// Delete a support ticket by ID
const deleteCallback = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedData = await CallBacks.findByIdAndDelete(id);
        if (!deletedData) {
            return res.status(404).json({
                message: 'Friend data not found'
            });
        }
        res.status(200).json({
            message: 'Friend data deleted successfully',
            data: deletedData
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete Friend data',
            error: error.message
        });
    }
};

module.exports = {
    postCallback,
    getAllCallbacks,
    getSingleCallback,
    updateCallback,
    deleteCallback
};
