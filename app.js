const express = require('express');
const app = express();
const port = 3000;
const Router = require('./routes/index.js')
const cookieParser = require('cookie-parser');
const cors = require('cors');


app.use(express.json());
app.use(cookieParser())
app.use("/", Router);


app.use(cors({
  origin: '*', // 모든 출처 허용 옵션. true 를 써도 된다.
}));


app.listen(port, () => {
  console.log(port, '포트로 서버가 열렸어요!');
});
