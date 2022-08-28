var Product = require('../models/product');
var mongoose = require('mongoose');


mongoose.connect('mongodb://127.0.0.1:27017/shopping');

var products = [
    new Product({
        imagePath:"../images/img1.jpg",
        title:'White Shoes',
        description:'Amazing white Sneakers with black feather!!!',
        price:100

    }),

    new Product({
        imagePath:"../images/img2.jpg",
        title:'Leather Shoes',
        description:'Brown Leather Men Shoes, Formal Wear,!!!',
        price:500

    }),
    new Product({
        imagePath:"../images/img3.jpg",
        title:'Blue Shoes',
        description:'Casual Blue shoes with White lace , Better grip, Be cool!!!',
        price:70

    })
    
];


var done=0;
for (var i=0; i<products.length;i++){
    products[i].save(function(err, result){
        done++;
        if (done === products.length){
            exit();
        }
    });
}

function exit(){
    mongoose.disconnect();
}
