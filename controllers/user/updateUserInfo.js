import Auth from "../../models/Auth.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const editProfileController = async (req, res) => {
  const { name, email, password } = req.body;
  const userId = req.user.userId;

  console.log(password);

  if (!email && !name && !password)
    return res.status(404).send({ message: "required at least 1 field" });

  const updatedData = {};
  if (email) updatedData.email = email;
  if (name) updatedData.name = name;
  if (password) {
    updatedData.hash_pass = await bcrypt.hash(password, 10);
  }
  const updatedUser = await Auth.findByIdAndUpdate(userId, updatedData, {
    new: true,
  });
  if (!updatedUser) return res.status(404).send({ message: "User not found" });

  const token = jwt.sign(
    { email: updatedUser.email, userId: updatedUser._id },
    process.env.JWT_SECRET
  );

  res.status(200).send({
    updatedUser,
    token,
    message: "Profile update success",
  });
};
