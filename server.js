const connetionDB = require("./database");
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const {readdirSync} = require("fs");
const bodyParser = require("body-parser");
const connectDB = require("./database");
const userRoutes = require("./routes/user");
require("dotenv").config();

//app middleware
const app = express();

//db
connectDB();

// middlewares
app.use(morgan("dev"));
//app.use(bodyParser.json({limit: "2mb"}));
app.use(express.json({limit: "2mb"}));
app.use(cors());

//app.use("/", userRoutes);
readdirSync("./routes").map((r) => app.use("/api", require("./routes/" + r)));
const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));