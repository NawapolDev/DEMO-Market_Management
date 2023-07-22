
const express=require('express')
const router = express.Router()
let customerController = require(`../../controller/customerController.js`);

//เชียนเป็นmvc
// router.get("/", async (req, res) => { 
//     let rusult = await customerController.getcustomer(req)
//     res.json(rusult);
// });


// router.get("/:id", async (req, res) => {
//     let rusult = await  customerController.getcustomerbyid(req.params.id)
//     res.json(rusult);
// });

// router.get("/getbytel/:id", async (req, res) => {
//     let rusult = await  customerController.getcustomerbytel(req.params.id)
//     res.json(rusult);
// });

// router.post("/", async (req, res) => { 
//     res.status(200);
//     let rusult = await customerController.insertcustomer(req.body)
//     res.json(rusult);
// });

// router.post("/:id", async (req, res) => {
//     res.status(200);
//     let rusult = await customerController.updatecustomer(req.params.id,req.body)
//     res.json(rusult);
// });

// router.delete("/:id", async (req, res) => {  
// 	res.status(200);
// 	let result = await customerController.deletecustomer(req.params.id);
// 	res.json(result);
//   });

//--------------------------------------------------
router.post("/insertcusrent/:id", async (req, res) => {
    res.status(200);
    let rusult = await customerController.insertcusrent(req.params.id,req.body)
    res.json(rusult);
});

router.delete("/deletecusrent/:id", async (req, res) => {
    res.status(200);
    let rusult = await customerController.deletecusrent(req.params.id,req.body)
    res.json(rusult);
});


//เพิ่มขาประจำ
router.post("/insertcustemrent/:id", async (req, res) => {
    res.status(200);
    let rusult = await customerController.insertcustemrent(req.params.id,req.body)
    res.json(rusult);
});

router.post("/updatecusrent/:id", async (req, res) => {
    res.status(200);
    let rusult = await customerController.updatecusrent(req.params.id,req.body)
    res.json(rusult);
});

//ลา
router.post("/leave/:id", async (req, res) => {
    res.status(200);
    let rusult = await customerController.cusleave(req.params.id)
    res.json(rusult);
});


router.post("/loginbytel", async (req, res) => { 
    res.status(200);
    let rusult = await customerController.loginbytel(req.body)
    res.json(rusult);
});



router.get("/deletcustemrent", async (req, res) => { 
    res.status(200);
    let rusult = await customerController.deletcustemrent(req)
    res.json(rusult);
});

router.get("/resetleave", async (req, res) => { 
    res.status(200);
    let rusult = await customerController.resetleave(req)
    res.json(rusult);
});

router.get("/payrent", async (req, res) => { 
    res.status(200);
    let rusult = await customerController.payrent(req)
    res.json(rusult);
});

router.get("/deletecustomerlate", async (req, res) => { 
    res.status(200);
    let rusult = await customerController.deletecustomerlate(req)
    res.json(rusult);
});


//ยิงทุกวันที่1ของเดือน( corn )
router.get("/firstdaypay", async (req, res) => { 
    res.status(200);
    let rusult = await customerController.firstdaypay(req)
    res.json(rusult);
});

//ลูกค้าเลื่อนนัด
router.post("/postpone/:id", async (req, res) => { 
    res.status(200);
    let rusult = await customerController.paydate(req.params.id,req.body)
    res.json(rusult);
});

//ทุกวันที่8จะเปลี่ยนสถานะเป็น 3 (corn)
router.get("/paylate", async (req, res) => { 
    res.status(200);
    let rusult = await customerController.paylate(req)
    res.json(rusult);
});

module.exports =  router