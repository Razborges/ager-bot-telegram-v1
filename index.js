require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = express.Router();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use('/files', express.static('files'));

const port = process.env.PORT;
const token = process.env.TELEGRAM_TOKEN;

require('./src/bot')(token);

app.use('/files', router.get('/:name', (req, res) => {
  const filename = req.params.name;
  res.download(`${__dirname}/files/${filename}`);
}));

app.listen(port, () => {
  console.log(`Server running in port ${port}`);
  // console.log(`Access http://localhost:${port}`);
});
