
const express=require('express')
const router = express.Router()
let adminController = require(`../../controller/adminController.js`);


router.get("/", async (req, res) => { 
    let rusult = await adminController.getadmin(req)
    res.json(rusult);
});


router.get("/:id", async (req, res) => {
    let rusult = await  adminController.getadminbyid(req.params.id)
    res.json(rusult);
});

router.post("/login", async (req, res) => {
    let rusult = await  adminController.getadminlogin(req.body)
    res.json(rusult);
});



router.post("/", async (req, res) => { 
    res.status(200);
    let rusult = await adminController.insertadmin(req.body)
    res.json(rusult);
});

router.post("/:id", async (req, res) => {
    res.status(200);
    let rusult = await adminController.updateadmin(req.params.id,req.body)
    res.json(rusult);
});

router.delete("/:id", async (req, res) => {  
	res.status(200);
	let result = await adminController.deleteadmin(req.params.id);
	res.json(result);
  });










module.exports =  router