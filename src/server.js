import express from "express";
import axios from "axios";
import nodemon from "nodemon"; // no need tho


const PORT = 3000;
const app = express();

//----------------------------endpoints--------------------------------------------
app.get("/");

app.listen(PORT || 3000, () => {
  console.log(`Running on port ${PORT}`);
});
