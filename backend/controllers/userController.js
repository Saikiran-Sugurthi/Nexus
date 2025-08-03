const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../config/generateToken");

/**
 * @desc    Register a new user
 * @route   POST /api/users
 * @access  Public
 */
const registerUser = asyncHandler(async (req, res) => {
    // Destructure all relevant fields from the request body
    const { name, email, password, pic, role, bio, expertise, socialLinks } = req.body;
    

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please fill all the required fields: name, email, password");
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });

    // Corrected the check from 'user' to 'userExists'
    if (userExists) {
        res.status(400);
        throw new Error("User with this email already exists!");
    }

    // Create a new user with all the fields from the model
    const user = await User.create({
        name,
        email,
        password,
        pic,
        role,
        bio,
        expertise,
        socialLinks
    });

    if (user) {
        // Respond with user data and a token
        // The token should include the user's role for role-based access control
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            role: user.role, // Include role in the response
            bio: user.bio,
            expertise: user.expertise,
            socialLinks: user.socialLinks,
            token: generateToken(user._id, user.role), // Pass role to generateToken
        });
    } else {
        res.status(400);
        throw new Error("Failed to create the user. Please try again.");
    }
});

/**
 * @desc    Auth user & get token
 * @route   POST /api/users/login
 * @access  Public
 */
const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    // Check if user exists and password matches
    if (user && (await user.matchPassword(password))) {
        // Respond with user data and a new token
        res.json({
            _id: user._id,
            name: user.name, // Corrected typo from user._name to user.name
            email: user.email,
            pic: user.pic,
            role: user.role, // Include role for frontend logic
            token: generateToken(user._id, user.role), // Pass role to generateToken
        });
    } else {
        res.status(401); // Use 401 for unauthorized access
        throw new Error("Invalid email or password");
    }
});

module.exports = { registerUser, authUser };
