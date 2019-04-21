let express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
let mongoose = require('mongoose');
app.use(cors());
app.use(bodyParser.json());
const userRoutes = express.Router();
let userScheme = require('./userScheme');

mongoose.connect('mongodb://193.106.55.176:23777/vpdata', {useNewUrlParser: true});

const connection = mongoose.connection;

connection.once('open', function(){
    console.log('Connected to DataBase');
});
 
userRoutes.route('/').get(function(req, res) {
    userScheme.find(function(err, user) {
        if (err) {
            console.log(err);
        } else {
            res.json(user);
        }
    });
});

userRoutes.route('/:id').get(function(req, res) {
    let id = req.params.id;
    userScheme.findById(id, function(err, user) {
        res.json(user);
    });
});

userRoutes.route('/add').post(function(req, res) {
    let user = new userScheme(req.body);
    user.save()
        .then(user => {
            res.status(200).json({'user': 'user added successfully','userId':user._id});
        })
        .catch(err => {
            res.status(400).send('adding new user failed');
        });
});

userRoutes.route('/update/:id').post(function(req, res) {
    userScheme.findById(req.params.id, function(err, user) {
        if (!user)
            res.status(404).send('data is not found');
        else
            user.result = req.body.result

            user.save().then(user => {
                res.json('User result updated');
            })
            .catch(err => {
                res.status(400).send("Update not possible");
            });
    });
});


app.use('/vpdata', userRoutes);

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
  });