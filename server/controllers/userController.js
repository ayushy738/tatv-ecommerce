import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
    try {
        // Fetch user data from the database
        const user = await userModel.findById(req.user._id).select("-password -__v");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isAccountVerified: user.isAccountVerified,
            },
        });
    } catch (error) {
        console.error("Get user data error:", error);
        res.status(500).json({ message: "Server error" });
    }
}

