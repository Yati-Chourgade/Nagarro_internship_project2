const express = require('express');
const router = express.Router();
const Product = require('../models/product');
var Cart=require('../models/cart');
const {isLoggedIn}=require("../middleware")

router.get('/add-to-cart/:id',function(req,res,next){
  const productId = req.params.id;
  const cart = new Cart(req.session.cart ? req.session.cart :{});
  Product.findById(productId,function(err,product){
    if(err){
      return res.redirect('/');
    }
    cart.add(product,product.id);
    req.session.cart = cart;
    console.log(req.session.cart);
    res.redirect('/');
  })

})

router.get('/',isLoggedIn, async (req, res, next) => {
    const products = await Product.find({});
    res.render('layouts/main-layout', { title: 'Shopping Cart', products });
  });

router.get('/shopping-cart',function(req,res,next){
  if(!req.session.cart){
    return res.render('layouts/shopping-cart',{products:null});
  }
  var cart = new Cart(req.session.cart);
  res.render('layouts/shopping-cart',{products: cart.generateArray(),totalPrice:cart.totalPrice});
});

module.exports = router;
