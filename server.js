const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('build'));

app.listen(port, () => {
  console.log(`Open http://127.0.0.1:${port}`)
});
