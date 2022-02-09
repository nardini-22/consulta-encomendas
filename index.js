const express = require("express");
const cors = require("cors");
const path = require('path')
const data = require('./dados.json')

const app = express();

app.use(express.static(path.join(__dirname, 'client/build')))

app.get("/encomendas", cors(), async (req, res, next) => {
  res.send(data)
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
