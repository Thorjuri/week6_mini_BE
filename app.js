const express = require('express');
const app = express();
const port = 3000;
const Router = require('./routes/index.js')
const cookieParser = require('cookie-parser');

app.use(express.json());
app.use("/", Router);
app.use(cookieParser())

app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
