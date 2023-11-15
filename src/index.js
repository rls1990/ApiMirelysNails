import app from "./app.js";
import { PORT } from "./config.js";
import { connectDB } from "./db.js";
// import { defaultUser } from "./middleware/validateDefaultUser.js";

connectDB();
// defaultUser();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
