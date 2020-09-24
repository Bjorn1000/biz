const scheduleRoutes = require('./routes/api/schedules');
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const db = require('./config/keys').mongoURI;
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());
app.get('/api/customers', (req, res) => {
  const customers = [
    {id: 1, firstName: 'John', lastName: 'Doe'},
    {id: 2, firstName: 'Brad', lastName: 'Traversy'},
    {id: 3, firstName: 'Mary', lastName: 'Swanson'},
  ];

  res.json(customers);
});

mongoose.connect(db).then(() => console.log('mongo!!!!!!!!!!!!!!!!!!!!!!!!!!')).catch(err => console.log(err));


app.use('/api/schedules', scheduleRoutes);
const port = 5000;

app.listen(port, () => `Server running on port ${port}`);