const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/posts");

const app = express();
dotenv.config();
mongoose.set("strictQuery", false);
mongoose.connect(
  process.env.REACT_APP_MONGO_URL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("BD connected");
  }
);

app.use("/images", express.static(path.join(__dirname, "images")));
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file upload Successfully.");
  } catch (err) {
    console.log("err");
  }
});

app.get("/", (req, res) => {
  res.status(200).json("Connect server is ready");
});

//Routes
app.use("/api/user", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.listen(process.env.REACT_APP_API_PORT, () => {
  console.log("Be started at port " + process.env.REACT_APP_API_PORT);
});

module.exports = app;
