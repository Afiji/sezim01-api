import Auth from "../../models/Auth.js";

export const getUserController = async (req, res) => {
  try {
    console.log("UserID from token:", req.user.userId);
    const user = await Auth.findById(req.user.userId).select("-hash_pass -__v");
    if (!user) {
      console.log("User not found in DB");
      return res.status(404).send("User not found");
    }
    console.log("User found:", user);
    res.status(200).send(user);
  } catch (e) {
    console.error("Error:", e);
    return res.status(500).send("Internal Server Error");
  }
};
