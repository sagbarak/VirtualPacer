let express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
let mongoose = require('mongoose');
app.use(cors());
app.use(bodyParser.json());
const userRoutes = express.Router();

mongoose.connect('mongodb://localhost:27017/vpData', {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', function(){
    console.log('Connected to DataBase');
});
 
let User = require('./userScheme');

userRoutes.route('/add').post(function(req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully'});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

app.use('/vpData',userRoutes);

app.listen(4000, function () {
    console.log('Example app listening on port 4000!');
});