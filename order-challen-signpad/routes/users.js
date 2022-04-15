var express = require('express');
const User = require('../models/User');
var router = express.Router();

router.get('/:CompanyId', function(req, res, next) {
  User.findOne({"CompanyId":req.params.CompanyId})
    .then((user) => {
        if(!user) {
            res.statusCode=404;
            res.setHeader('content-type','application/json');
            res.send({
                "error":"Data not found"
            });
        }
        res.statusCode=200;
        res.setHeader('content-type','application/json');
        res.send({
          businessName: user.BusinessName,
          businessAddress: user.BusinessAddress,
          businessGSTIN: user.GSTIN,
        });
    })
    .catch(err=>next(err));
});

module.exports = router;
