const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

//app.listen(3333);

// var port = process.env.PORT || 3000;
// app.listen(port, function () {
//     console.log('Umbler listening on port %s', port);
// });

app.listen(process.env.PORT || 3000);