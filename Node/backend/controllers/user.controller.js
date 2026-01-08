import { User } from "../models/user.model.js";

const registerUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    // basic validation
    if (!username || !password || !email) {
      return res.status(400).json({ message: "All fields are important!" });
    }

    // check if user exists already
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "User already exists!" });
    }

    // create user
    const user = await User.create({
      username,
      password,
      email: email.toLowerCase(),
    });

    res.status(201).json({
      message: "User registered!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { password, email } = req.body;

    // check if user exists already
    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    // compare passwords
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    res.status(200).json({
      message: "User logged in!",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Interval Server Error", error: error.message });
  }
};

const logoutUser = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
      message: "User logged out successfully!",
      user: {
        email: user.email,
      },
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export { registerUser, loginUser, logoutUser };
