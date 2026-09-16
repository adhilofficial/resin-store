import express from "express";

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('server is running');
});

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});