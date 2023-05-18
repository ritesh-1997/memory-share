import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;
    let decodeData;

    if (token && isCustomAuth) {
      decodeData = jwt.verify(token, "test");
      req.userId = decodeData?.id;
    } else {
      // const googleClient = new OAuth2Client(
      //   "671086080216-lpjet8hhuf3i3eskg8t5pees4fhq3esa.apps.googleusercontent.com"
      // );
      // const ticket = await googleClient.verifyIdToken({
      //   idToken: token,
      //   audient:
      //     "671086080216-lpjet8hhuf3i3eskg8t5pees4fhq3esa.apps.googleusercontent.com",
      // });

      // const payload = ticket.getPayload();
      // console.log(payload);

      decodeData = jwt.decode(token);
      req.userId = decodeData?.sub;
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
