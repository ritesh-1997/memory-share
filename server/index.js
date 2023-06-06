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
import { exec } from "child_process";

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
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});
app.use(express.static("build"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/posts", postRoutes);
app.use("/user", userRoutes);
app.use("/payments", paymentsRoutes);
app.use("/v1/cart", cartRoutes);

const PORT = process.env.PORT || 5001;

// Run the dig command
exec(
  "dig -4 TXT +short o-o.myaddr.l.google.com @ns1.google.com",
  (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing command: ${error.message}`);
      return;
    }

    if (stderr) {
      console.error(`Command stderr: ${stderr}`);
      return;
    }

    // Print the command output
    console.log(stdout);
  }
);

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () => console.log(`Server Running on PORT : ${PORT}`))
  )
  .catch((error) => console.log(error.message));
