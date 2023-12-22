import Auth from "../../models/Auth.js";
import jwt from "jsonwebtoken";

export const verifyEmail = async (req, res) => {
  console.log("we are here");
  try {
    const { token } = req.params;
    console.log(token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await Auth.findOneAndUpdate(
      { _id: decoded.userId },
      { verified: true },
      { new: true }
    );

    if (!user) return res.status(404).send({ message: "User not found" });

    return res.redirect(
      // `${process.env.FRONTEND_HOST}/email/verify-email/${token}`
      `${process.env.FRONTEND_HOST}/auth`
      // process.env.FRONTEND_HOST
    );
  } catch (err) {
    console.error(err);
    return res.status(500).send({ message: "Internal Server Error" });
  }
};
