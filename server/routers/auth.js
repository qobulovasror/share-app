const router = require('express').Router();

//return all 
router.get('/', (req, res)=>{
    res.send(`${req} -> get`);
});


router.get('/:id', (req, res)=>{
    res.send(`${req.id}get`);
    
});

module.exports = router;