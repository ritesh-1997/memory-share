import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import axios from "axios";

export const signin = async (req, res) => {
  console.log("===== signin ======");
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(404).json({ message: "User doesn't exist." });

    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid credentials.." });

    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      "test",
      { expiresIn: "1h" }
    );
    console.log("Token : ", token);
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong !!" });
  }
};

export const signup = async (req, res) => {
  console.log("In signUp :");
  //console.log(req);
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  console.log(password, confirmPassword);
  try {
    const existingUser = await User.findOne({ email });

    if (existingUser)
      return res.status(404).json({ message: "User already exist." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password doesn't match !!" });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName}${lastName}`,
    });

    const token = jwt.sign({ email: result.email, id: result._id }, "test", {
      expiresIn: "1h",
    });
    console.log(res);
    console.log("Token : ", token);
    res.status(200).json({ result, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong !!" });
  }
};

function stringify(obj) {
  let cache = [];
  let str = JSON.stringify(obj, function (key, value) {
    if (typeof value === "object" && value !== null) {
      if (cache.indexOf(value) !== -1) {
        // Circular reference found, discard key
        return;
      }
      // Store value in our collection
      cache.push(value);
    }
    return value;
  });
  cache = null; // reset the cache
  return str;
}

export const googlesignin = async (req, res) => {
  try {
    const tokens = await axios.post("https://oauth2.googleapis.com/token", {
      code: req.body.code,
      client_id:
        "671086080216-lpjet8hhuf3i3eskg8t5pees4fhq3esa.apps.googleusercontent.com",
      client_secret: "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",
      redirect_uri: "postmessage",
      grant_type: "authorization_code",
    });

    const access_token = tokens.data.access_token;
    const id_token = tokens.data.id_token;

    const userInfo = await axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((res) => res.data);

    res.status(200).json({ result: userInfo, token: id_token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong !!" });
  }
};
