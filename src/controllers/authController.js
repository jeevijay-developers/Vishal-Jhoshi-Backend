const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const {
  success,
  created,
  badRequest,
  internalServerError,
} = require("../helpers/responseType/index.js");
const User = require("../models/User");
const cloudinary = require("../middleware/cloudinary");
const ChatRoom = require("../models/ChatRoom.js");

exports.signUpController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(badRequest([errors.array()]));
  }

  const { email, password, name, target } = req.body;

  // console.log(req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json(badRequest([{ message: "User already exists" }]));
    }
    const admin = await User.findOne({ role: "admin" });

    if (!admin) {
      return res.json(badRequest([{ message: "Admin user not found" }]));
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      email,
      password: hashedPassword,
      name,
      target,
      bio: "",
      location: "",
      bannerImage: "",
      image_url: "",
      birthDate: Date.now(),
    });
    const savedUser = await newUser.save();
    // fetch the admin user

    // create a ChatRoom
    const chatRoom = new ChatRoom({
      firstRoom: `${admin._id}_${savedUser._id}`,
      secondRoom: `${savedUser._id}_${admin._id}`,
      firstUser: admin._id,
      secondUser: savedUser._id,
    });

    await chatRoom.save();

    res.json(created({ message: "User created successfully" }));
  } catch (error) {
    res.json(internalServerError([error]));
  }
};

exports.signInController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(badRequest([errors.array()]));
  }

  const { email, password } = req.body;
  console.log(req.body);

  try {
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.json(badRequest([{ message: "Invalid email or password" }]));
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRATION }
    );

    res.json(success({ token, user }));
  } catch (error) {
    res.json(internalServerError([error]));
  }
};

exports.forgetPassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(badRequest([errors.array()]));
  }

  const { email, pin } = req.body;

  const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRATION,
  });

  res.json(success({ token }));
};

exports.updatePassword = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.json(badRequest([errors.array()]));
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.json(badRequest([{ message: "User not found." }]));
    }

    // Check if the new password is different from the old one
    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res.json(badRequest([{ message: "Password must be new." }]));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save();

    res.json(success({ message: "Password updated successfully." }));
  } catch (error) {
    res.json(internalServerError([error.message || error]));
  }
};

exports.updateUserInfo = async (req, res) => {
  const { bio, birthDate, email, location, name } = req.body;
  const userId = req.params.userId;
  try {
    // find user with the given email and diffrent id
    const isEmailUsed = await User.findOne({ email, _id: { $ne: userId } });
    if (isEmailUsed) {
      return res.json(badRequest([{ message: "Email Is Already Used" }]));
    } else {
      const user = await User.findById(userId);
      if (!user) {
        return res.json(badRequest([{ message: "User not found." }]));
      }

      user.email = email;
      user.name = name;
      user.bio = bio;
      user.location = location;
      user.birthDate = birthDate;
      const savedUser = await user.save();

      return res.json(
        success({ message: "User updated successfully", user: savedUser })
      );
    }
  } catch (error) {
    res.json(internalServerError([error.message || error]));
  }
};

exports.updateImageUrl = async (req, res) => {
  const { userId, target } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.json(badRequest([{ message: "User not found." }]));
    }

    if (!req.file) {
      return res.json(badRequest([{ message: "No image file provided." }]));
    }

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload_stream(
      { folder: "user_images" },
      async (error, result) => {
        if (error) {
          return res.json(internalServerError([error.message || error]));
        }

        // Save the URL in the database
        if (target === "image_url") user.image_url = result.secure_url;
        else user.bannerImage = result.secure_url;
        await user.save();

        return res.json({
          message: "Image updated successfully",
          imageUrl: result.secure_url,
        });
      }
    );

    // Pipe the file buffer into the Cloudinary upload stream
    const streamifier = require("streamifier");
    streamifier.createReadStream(req.file.buffer).pipe(result);
  } catch (error) {
    res.json(internalServerError([error.message || error]));
  }
};
