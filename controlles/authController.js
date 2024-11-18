const User = require('../models/user');
const jwt = require('jsonwebtoken');

// Helper function to generate a unique coupon code
const generateCouponCode = async () => {
    let code;
    let isUnique = false;

    while (!isUnique) {
        // Generate a random alphanumeric code (6 characters)
        code = Math.random().toString(36).substring(2, 8).toUpperCase();

        // Check if the code already exists in the database
        const existingUser = await User.findOne({ couponCode: code });
        if (!existingUser) {
            isUnique = true;
        }
    }

    return 'BP' + code;
};

// Register function
const register = async (req, res) => {
    const { name, email, password, phoneNumber } = req.body;

    try {
        // Generate a unique coupon code for the user
        const couponCode =  await generateCouponCode();

        // Create a new user with the generated coupon code
        const user = new User({
            name,
            email,
            password,
            phoneNumber,
            couponCode
        });

        await user.save();

        res.status(201).json({
            message: 'User registered successfully',
            couponCode: couponCode // Include the coupon code in the response
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Server error',
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({
                message: 'Invalid credentials',
            });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
        });
    }
};

const getAll = async(req, res) =>{
    try {
        const allData = await User.find();
        res.status(200).json({
            data:allData
        })
    } catch (error) {
        res.status(500).json({
            data:error
        })
    }
}

module.exports = { register, login, getAll };
