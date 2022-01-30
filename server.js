const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const app = require("./app");
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log("ERROR=", err);
  }
  console.log(`Server is up and running on PORT ${process.env.PORT}`);
});
