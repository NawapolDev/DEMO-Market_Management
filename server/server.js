let express = require('express'); //GIT COMMIT
let app = express();
let bodyParser = require('body-parser');
let mysql = require('mysql');
const cors = require("cors")//เพิ่มใหม่
require("dotenv").config()//เพื่อใช้ไฟล .env ได้
const moment = require('moment');



app.use(express.json())//ให้เซิฟเวอเป็นตัวให้บริการresapi ให้ไปrespon เป็นjsonไปฝั่ง client
app.use(cors()) 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(function (req, res, next) {  
  res.setHeader('Access-Control-Allow-Origin', '*') 

  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'content-type,x-access-token')
  res.setHeader('Access-Control-Allow-Credentials', true)
  // res.setHeader('ngrok-skip-browser-warning',true)s
  next()
})

// let = timeoutid = 0;
// yourFunction();
// function yourFunction() {



//   if (Seconds == 10) {
//     console.log('he;')
//   }
//   // console.log(Seconds)
//   setTimeout(yourFunction, 3600000);
// }

// var autodeletcustemrent = require('./controller/customerController')


// function greet() {
//   // console.log('Hello world');
//   var autodeletcustemrent = require('./controller/customerController')
  
//   var today = new Date();
//   // var Hours = moment(today.getHours()).format('hh:mm:ss')
//   var Hours = moment(today).format('HH')
//   var firstdate = moment(today).format('MM')
//   var st1date = moment(today).format('DD');
// console.log(st1date)
//   console.log(firstdate)


//   var Minutes = today.getMinutes()
//   var Seconds = today.getSeconds();
//   // console.log(Hours, +'  ' + Minutes + '  ' + Seconds)
//   console.log(Hours)
//   if (Hours == '00') {
//   console.log('reset')
//   autodeletcustemrent.deletcustemrent()
//   autodeletcustemrent.resetleave()
//   }
//   if (st1date=='01'&&Hours=='00') {
//     autodeletcustemrent.payrent()
//   }
//   if (st1date!='01'&&st1date!='02'&&st1date!='03'&&st1date!='04'&&st1date!='05'&&st1date!='06'&&st1date!='07'&&Hours=='00') {
    
//     autodeletcustemrent.deletepatientlate()
//   }

  
// }

// setInterval(greet, 3000000);//3000000/50นาที 1,800,000/30นาที


app.use('/api', require('./routes/mainroute'))




const port = process.env.PORT || 8000
app.listen(port, () => console.log(`start server in port ${port}`))


module.exports = app;


