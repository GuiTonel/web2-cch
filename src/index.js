const mongoose = require('mongoose');
const db_mongoose = require('./database/config/mongo');
const express = require('express');
const router = require('./routes/router')
const app = express()

app.use( express.json() )
app.use(express.urlencoded({ extended: true }));


app.use(router);

mongoose.connect(db_mongoose.connection,{useUnifiedTopology:true,useNewUrlParser:true}).then(()=>{
    console.log('Mongoose connected successfully');
}).catch((err)=>{
        console.log(err);
});


const PORT = 8888
app.listen(PORT, () => {
    console.log(`Listening server in port ${PORT}`)
} )
