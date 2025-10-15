const { loginRouter } = require("./routes/login.route");
const { registerRouter } = require("./routes/register.route");
const { addBookRouter } = require("./routes/addBook.route");
const { getAllBooksRouter } = require("./routes/getAllBooks.route");
const { deleteBookRouter } = require("./routes/deleteBook.route");
const { addToCartRouter } = require("./routes/addToCart.route");
const { getCartRouter } = require("./routes/getCart.route");

const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
// const session = require("express-session")

const app = express();
dotenv.config(); // Loads the environment variables

// database connection
mongoose
  .connect(process.env.DB)
  .then(() => console.log("Database Connection successful!"))
  .catch((err) => console.log(err));

// port
port = process.env.PORT;

// built-in middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/backend/login", loginRouter);
app.use("/backend/register", registerRouter);
app.use("/backend/addBook", addBookRouter);
app.use("/backend/getAllBooks", getAllBooksRouter);
app.use("/backend/deleteBook", deleteBookRouter);
app.use("/backend/addToCart", addToCartRouter);
app.use("/backend/getCart", getCartRouter)

app.listen(port, () => {
  console.log(`Server is running at port: ${port}`);
});
