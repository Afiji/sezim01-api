import bcrypt from "bcrypt";
import Auth from "../../models/Auth.js";
import jwt from "jsonwebtoken";

export const authController = async (req, res) => {
  try {
    const { email, password } = req.body;

    const findUser = await Auth.findOne({ email });

    if (!findUser) {
      return res.status(401).send({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, findUser.hash_pass);

    if (isPasswordValid) {
      const token = jwt.sign(
        { email: findUser.email, userId: findUser._id },
        process.env.JWT_SECRET
      );

      return res.status(200).send({ token, message: "success" });
    } else {
      return res.status(401).send({ message: "Invalid password" });
    }
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
