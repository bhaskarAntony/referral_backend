const User = require('../models/user');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

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
// Function to send OTP email
async function sendOTPEmail(email, name) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'bhaskarbabucm6@gmail.com', 
        pass: 'qjmlrvosxcqjzmlg',   
      },
    });
  
    const mailOptions = {
      from: 'bhaskarbabucm6@gmail.com',   
      to: email,
      subject: 'Zero to Hero Program',
      html: `
     <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Zero to Hero Program</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f4f4f4;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      padding: 20px;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    }
    h1 {
      color: #333333;
      font-size: 24px;
      text-align: center;
    }
    p {
      color: #555555;
      font-size: 16px;
      line-height: 1.6;
    }
    .btn {
      display: inline-block;
      background-color: #007bff;
      color: #ffffff;
      padding: 12px 24px;
      text-decoration: none;
      font-size: 16px;
      font-weight: bold;
      border-radius: 5px;
      text-align: center;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      font-size: 14px;
      color: #777777;
      margin-top: 20px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Welcome to the Zero to Hero Program!</h1>
    <p>Hi Hero! 👋</p>
    <p>We know you're already a hero, but imagine how powerful your journey could be when you help your friends become heroes too!</p>
    <p>It's time to <strong>build your Hero Team</strong> by referring your friends to our program. As you do, you're not just helping them—you’re also taking your first step towards making your <strong>course fee ZERO</strong>! 🎉</p>
    <p><strong>Congratulations once again!</strong> You've already started your journey, and we're excited to see you grow and succeed.</p>
    <p style="text-align: center;">
      <a href="https://be-practical.in" class="btn">Refer Now</a>
    </p>
    <p class="footer">Be Practical Tech Solutions Team<br>
    <a href="https://be-practical.in">be-practical.in</a></p>
  </div>
</body>
</html>
    `,
    };
  
    return transporter.sendMail(mailOptions);
  }

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
        sendOTPEmail(email, name);
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
