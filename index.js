const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const port = process.env.PORT || 5000;

const app = express();

// middleware
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kvfjx.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const appointmentOptionCollection = client.db('bookingApp').collection('appointmentOption');
        const bookingsCollection = client.db('bookingApp').collection('bookings');

        app.get('/appointmentOption', async (req, res) => {
            const query = {};
            const option = await appointmentOptionCollection.find(query).toArray();
            res.send(option);

        });

        app.post('/bookings', async(req, res) =>{
            const booking = req.body
            console.log(booking);
            const result = await bookingsCollection.insertOne(booking);
            res.send(result);
        })
    }
    finally {

    }
}
run().catch(console.log);

app.get('/', async (req, res) => {
    res.send('booking app server is running');
})

app.listen(port, () => console.log(`booking app server is running on ${port}`));