const express = require('express');
const cors = require("cors");
const getCount = require('../sql/getCount');
const getData = require('../sql/getData');
const getCarData = require('../sql/getCarData');
const getMarkaNames = require('../sql/getMarkaNames');
const getModelNames = require('../sql/getModelNames');
const getAllRates = require('../sql/getAllRates');
const getAllYears = require('../sql/getAllYears');
const getCapacityList = require('../sql/getCapacityList');
const moment = require('moment-timezone');
const bodyParser = require('body-parser');
const Telegram = require('./Telegram');
const Bot = new Telegram();
const app = express();
const PORT = 8000;
async function main(){
    const corsOptions = {
        origin: "*",allowedHeaders:"*"
    };
    app.use(cors(corsOptions));
    app.use(bodyParser.json());
    const pageSize = 15;
    app.get('/api/statistics',async (req, res) => {
        const page = req.query.page || 1;
        const [data,count] = await getData('statistics',page,pageSize,req.query);
        res.json({
            page,
            data,
            pageNumber:count
        });
    });
    app.get('/api/statistics/count',async (req, res) => {
        const count = await getCount('statistics');
        const pageCount = Math.ceil(count/pageSize);
        res.json({pageCount});
    });
    app.get('/api/statistics/marka/names', async (req,res) => {
        const data = await getMarkaNames('statistics');
        res.json(data);
    });
    app.get('/api/statistics/model/names', async (req,res) => {
        const marka = req.query.marka;
        const data = await getModelNames('statistics',marka);
        res.json(data);
        
    });
    app.get('/api/statistics/rates', async (req,res) => {
        const data = await getAllRates('statistics');
        res.json(data);
    });
    app.get('/api/statistics/years', async (req,res) => {
        const data = await getAllYears('statistics');
        res.json(data);
    });
    app.get('/api/statistics/capacitylist', async (req,res) => {
        const data = await getCapacityList('statistics');
        res.json(data);
    });

    app.get('/api/auctions',async (req, res) => {
        const page = req.query.page || 1;
        const [data,count] = await getData('auctions',page,pageSize,req.query);
        res.json({
            page,
            data,
            pageNumber:count
        });
    });
    app.get('/api/auctions/count',async (req, res) => {
        const count = await getCount('auctions');
        const pageCount = Math.ceil(count/pageSize);
        res.json({pageCount});
    });
    app.get('/api/auctions/marka/names', async (req,res) => {
        const data = await getMarkaNames('auctions');
        res.json(data);
    });
    app.get('/api/auctions/model/names', async (req,res) => {
        const marka = req.query.marka;
        const data = await getModelNames('auctions',marka);
        res.json(data);
        
    });
    app.get('/api/auctions/rates', async (req,res) => {
        const data = await getAllRates('auctions');
        res.json(data);
    });
    app.get('/api/auctions/years', async (req,res) => {
        const data = await getAllYears('auctions');
        res.json(data);
    });
    app.get('/api/auctions/capacitylist', async (req,res) => {
        const data = await getCapacityList('auctions');
        res.json(data);
    });

    app.get('/api/carpage', async (req,res) => {
        const id = req.query.id;
        if (!id) res.json([]);
        const data = await getCarData(id);
        res.json(data);
    });
    app.post('/api/request', (req,res) => {
        const name = req.body.name;
        const number = req.body.number;
        const now = moment.tz('Asia/Vladivostok');
        const formattedDateTime = now.format('YYYY-MM-DD HH:mm:ss');
        const message = `Заявка ${formattedDateTime}. Имя: ${name},Номер: ${number}`;
        Bot.sendMessage(message)    
        .then(() => {
            res.status(200).send('Success');
          })
          .catch((error) => {
            res.status(500).send('Error' + error.message);
          });

    });


    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });

}

main();