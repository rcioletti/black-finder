var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app = express();
var b2w = ['https://www.americanas.com.br/busca/', 'https://www.submarino.com.br/busca/', 'https://www.shoptime.com.br/busca/']

app.get('/b2w/:productName', function (req, res) {

    b2w.forEach((endpoint, index) => {

        url = encodeURI(endpoint + req.params.productName);

        request(url, function (error, response, html) {
            if (!error) {
                var $ = cheerio.load(html);

                var array = [];
                var priceArr = [];
                var nameArr = [];
                var json = {
                    name: "",
                    price: "",
                    site: "",
                    link: ""
                };

                $('.card-product-name').filter(function(){
                    var data = $(this);
                    console.log(data.text())
                    nameArr.push(data.text());
                })   

                $('.value').filter(function(){
                    var data = $(this);
                    console.log(data.text())    
                    priceArr.push(data.text());
                })

                nameArr.forEach((elem, i) => {
                    json.name = nameArr[i];
                    json.price = priceArr[i];
                    array.push(json);
                });
            }
        })

    })
});

app.listen('8081')
console.log('Magic happens on port 8081');
exports = module.exports = app;