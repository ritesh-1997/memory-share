import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import postRoutes from "./routes/posts.js";
import userRoutes from "./routes/users.js";
import paymentsRoutes from "./routes/payments.js";
import cartRoutes from "./routes/cart.js";
import helmet from "helmet";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "script-src": [
        "'self'",
        "https://checkout.stripe.com",
        "https://js.stripe.com",
        "https://hooks.stripe.com",
        "http://localhost:3000",
      ],
      "frame-src": [
        "'self'",
        "https://checkout.stripe.com",
        "https://js.stripe.com",
        "https://hooks.stripe.com",
        "http://localhost:3000",
        "'unsafe-inline'",
        "'unsafe-eval'",
        "https://q.stripe.com",
      ],
      "connect-src": [
        "'self'",
        "https://checkout.stripe.com",
        "https://js.stripe.com",
        "https://hooks.stripe.com",
        "http://localhost:3000",
      ],
      "img-src": ["'self'", "https://*.stripe.com"],
    },
  })
);

app.use(express.static("build"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/payments", paymentsRoutes);
app.use("/v1/cart", cartRoutes);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on PORT : ${PORT}`))
  )
  .catch((error) => console.log(error.message));
