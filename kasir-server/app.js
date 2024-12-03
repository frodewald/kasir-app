const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 8000;

const corsOptions = {
  origin: ['http://localhost:5173', 'https://kasir-app-bice.vercel.app'],      
  methods: 'GET,POST,PUT,DELETE,OPTIONS', 
  allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept', 
  credentials: true 
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./app/models')
db.mongoose
    .connect(db.url)
    .then((result) => {
        console.log('Database connected!')
    }).catch((err) => {
        console.log("Cannot connect to database!", err)
        process.exit()
    })


app.get('/', (req, res) => {
  res.json({
      message: "Welcome to kasir-server"
  })
})


require('./app/routes/category.route')(app);
require('./app/routes/product.route')(app);
require('./app/routes/cart.route')(app);
require('./app/routes/order.route')(app);


app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT}`)
})
