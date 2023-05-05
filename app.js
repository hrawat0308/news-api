const express = require("express");
const axios = require("axios");
require('dotenv').config();
const card = require('./card.json');
const data = require('./data.json');
const app = express();

app.get('/news', async(req, res, next) => {
    let result;
    try{
        const newsData = await axios({
            method : "GET",
            "Content-Type": "application/json",
            url: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${process.env.NEWS_API_KEY}`
        });
        
        if(newsData.data.status == "ok"){
            result = newsData.data.articles.map((article)=>{
                card.children[0].children[0].children[0].value = `${article.title}`;
                card.children[0].children[0].children[1].value = `${article.description}`;
                card.children[0].children[1].imageUrl = `${article.urlToImage}`;
                return card;
            });
        }
        else{
            return res.json({ status: 1 , data : [], msg : "error occurred !!!"});
        }
        data.data[0].children[0].children = result;
        res.json({status: 1, data : data.data});
    }
    catch(error){
        console.log(error);
        return res.json({status : 0, error : error});
    }
});

app.listen(3000, ()=>{
    console.log(`Server running on port 3000`);
});