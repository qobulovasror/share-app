const express = require('express');
const app = express();

require('./startup/routes')(app);

const port = process.env.PORT || 8000;
app.listen(port, ()=>{
    console.log(`running server is port ${port} !`);
})
