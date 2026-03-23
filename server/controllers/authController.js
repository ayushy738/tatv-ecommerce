import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import userModel from '../models/userModel.js';
import transporter from '../config/nodemailer.js';
import validator from 'validator';
import { EMAIL_VERIFY_TEMPLATE,PASSWORD_RESET_TEMPLATE } from '../config/emailTemplates.js';

const createToken = (userId) => {
    return jwt.sign({ id: userId }, process.env.JWT_SECRET);
}


export const register = async (req, res) => {
    const { name, email, password } = req.body;

    // Validate input
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        if(!validator.isEmail(email)){
            return res.status(400).json({ message: "Invalid email format" });
        }
        if(password.length < 8){
            return res.status(400).json({ message: "Password must be at least 8 characters long" });
        }
        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create new user
        const newUser = new userModel({ name, email, password: hashedPassword });
        await newUser.save();
        // Generate JWT token
        const token = createToken(newUser._id); 
        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

           // Respond with success message
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Login Notification",
            text: `Hello ${newUser.name},\n\nYou have successfully logged in to your account.\n\nBest regards,\nYour Team`
            ,html: `<p>Hello ${newUser.name},</p><p>You have successfully logged in to your account.</p><p>Best regards,<br>Your Team</p>`
        };

        await transporter.sendMail(mailOptions);

        res.status(201).json({ message: "User registered successfully" ,token});
    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const login = async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
        res.json({success: true, token});
    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const logout = async (req, res) => {
    try {
        // Clear the cookie
        res.clearCookie('token', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict'
        });

        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Logout error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const sendVerifyOtp = async (req, res) => {
    const { email } = req.body;

    // Validate input
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.isAccountVerified) {
            return res.status(400).json({ message: "Account already verified" });
        }
        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        user.verifyOtp = otp;
        user.verifyOtpExpireAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        // Send OTP via email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Verification OTP",
            text: `Your verification OTP is ${otp}. It is valid for 10 minutes.`,
            html: EMAIL_VERIFY_TEMPLATE.replace('{{email}}', user.email).replace('{{otp}}', otp)
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "OTP sent successfully" });
    } catch (error) {
        console.error("Send OTP error:", error);
        res.status(500).json({ message: "Server error" });
    }
} 

export const verifyEmail = async (req, res) => {
    const { otp } = req.body;

    if (!otp) {
        return res.status(400).json({ message: "OTP is required" });
    }

    try {
        // Find user by OTP
        const user = await userModel.findOne({ verifyOtp: otp });

        if (!user) {
            return res.status(400).json({ message: "Invalid OTP" });
        }

        if (user.isAccountVerified) {
            return res.status(400).json({ message: "Account already verified" });
        }

        if (Date.now() > user.verifyOtpExpireAt) {
            return res.status(400).json({ message: "OTP has expired" });
        }

        // Mark account as verified
        user.isAccountVerified = true;
        user.verifyOtp = '';
        user.verifyOtpExpireAt = 0;
        await user.save();

        res.status(200).json({ message: "Email verified successfully" });
    } catch (error) {
        console.error("Verify email error:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const isAuthenticated = (req, res) => {
    try {
        // Check if user is authenticated
        if (req.user) {
            return res.status(200).json({ isAuthenticated: true, user: req.user });
        } else {
            return res.status(401).json({ isAuthenticated: false });
        }
    } catch (error) {
        console.error("Authentication check error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const sendResetOtp = async (req, res) => {
    const { email } = req.body;

    // Validate input
    if (!email) {
        return res.status(400).json({ message: "Email is required" });
    }

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        
        // Generate reset OTP
        const resetOtp = Math.floor(100000 + Math.random() * 900000).toString();
        user.resetOtp = resetOtp;
        user.resetOtpExpiresAt = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
        await user.save();

        // Send reset OTP via email
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Password Reset OTP",
            text: `Your password reset OTP is ${resetOtp}. It is valid for 10 minutes.`,
            html: PASSWORD_RESET_TEMPLATE.replace('{{email}}', user.email).replace('{{otp}}', resetOtp)
        };

        await transporter.sendMail(mailOptions);

        res.status(200).json({ message: "Reset OTP sent successfully" });
    } catch (error) {
        console.error("Send reset OTP error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    // Validate input
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: "Email, OTP, and new password are required" });
    }

    try {
        // Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        
        // Check reset OTP validity
        if (user.resetOtp !== otp || Date.now() > user.resetOtpExpiresAt) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetOtp = ' ';
        user.resetOtpExpiresAt = 0;
        await user.save();

        res.status(200).json({ message: "Password reset successfully" });
    } catch (error) {
        console.error("Reset password error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const adminLogin = async (req, res) => {
    const { email, password } = req.body;
    if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
        const token = jwt.sign({email},process.env.JWT_SECRET,{ expiresIn: '7d' });
        res.json({success: true, token});
    }else{
        res.status(400).json({message: "Invalid admin credentials",success: false}); 
    }

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        // Check if user is an admin
        const user = await userModel.findOne({ email, isAdmin: true });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or not an admin" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
        // Set token in cookie
        res.cookie('token', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', // Use secure cookies in production
            sameSite: process.env.NODE_ENV === 'production'?'none':'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });

        res.status(200).json({ message: "Admin login successful" });
    } catch (error) {
        console.error("Admin login error:", error);
        res.status(500).json({ message: "Server error" });
    }
}