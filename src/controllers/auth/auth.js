import User from "../../models/auth/auth.model.js";
import ApiError from "../../utils/ApiError.js";
import ApiResponse from "../../utils/ApiResponse.js";
export const login = async (req, res) => {
  try {
    console.log("Login");
  } catch (error) {}
};

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if ([email, username, password].some((field) => field?.trim() === "")) {
      throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existedUser) {
      throw new ApiError(409, "User with email or username already exists");
    }

    const user = await User.create({ username, email, password });
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    return res
      .status(201)
      .json(new ApiResponse(200, createdUser, "User registered Successfully"));
  } catch (error) {
    throw new ApiError(500, error);
  }
};

export const logout = async (req, res) => {
  try {
    console.log("Register");
  } catch (error) {}
};
