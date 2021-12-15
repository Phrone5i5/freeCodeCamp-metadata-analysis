var express = require('express');
var cors = require('cors');
require('dotenv').config({ path: 'D:\Visual Studio Code\metadata-analysis\sample.env' });
const fileUpload = require('express-fileupload');
var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());

app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
});

app.post('/api/fileanalyse', async (req, res) => {
  let upfile;
  try {
    upfile = req.files.upfile;
  } catch (e) {
    upfile = null;
    console.log(e.message);
  }
  if (upfile) {
    res.json({ name: upfile.name, type: upfile.mimetype, size: `${upfile.size} bytes` });
  } else {
    res.json({ error: 'invalid file' });
  }
});


const port = process.env.PORT || 3000;
app.listen(port, function () {
  console.log('Your app is listening on port ' + port)
});
