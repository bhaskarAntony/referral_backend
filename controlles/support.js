const referralSupport = require("../models/support");

// Create a new support ticket
const postSupport = async (req, res) => {
    const data = req.body;
    try {
        const newSupport = new referralSupport(data);
        await newSupport.save();
        res.status(200).json({
            message: 'Submitted a Support Ticket',
            data: newSupport
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to Submit Support Ticket',
            error: error.message
        });
    }
};

// Get all support tickets
const getAllSupport = async (req, res) => {
    try {
        const allSupport = await referralSupport.find();
        res.status(200).json({
            message: 'Fetched all support tickets',
            data: allSupport
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch support tickets',
            error: error.message
        });
    }
};

// Get a single support ticket by ID
const getSingleSupport = async (req, res) => {
    const { id } = req.params;
    try {
        const supportTicket = await referralSupport.findById(id);
        if (!supportTicket) {
            return res.status(404).json({
                message: 'Support Ticket not found'
            });
        }
        res.status(200).json({
            message: 'Fetched support ticket',
            data: supportTicket
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to fetch support ticket',
            error: error.message
        });
    }
};

// Update a support ticket by ID
const updateSupport = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedSupport = await referralSupport.findByIdAndUpdate(id, data, { new: true });
        if (!updatedSupport) {
            return res.status(404).json({
                message: 'Support Ticket not found'
            });
        }
        res.status(200).json({
            message: 'Support Ticket updated successfully',
            data: updatedSupport
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to update support ticket',
            error: error.message
        });
    }
};

// Delete a support ticket by ID
const deleteSupport = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedSupport = await referralSupport.findByIdAndDelete(id);
        if (!deletedSupport) {
            return res.status(404).json({
                message: 'Support Ticket not found'
            });
        }
        res.status(200).json({
            message: 'Support Ticket deleted successfully',
            data: deletedSupport
        });
    } catch (error) {
        res.status(500).json({
            message: 'Failed to delete support ticket',
            error: error.message
        });
    }
};

module.exports = {
    postSupport,
    getAllSupport,
    getSingleSupport,
    updateSupport,
    deleteSupport
};
