var express = require('express');
var bodyParse = require('body-parser');
var router = express();
var Users = require('./userModel');
router.use(bodyParse.urlencoded({ extended: true }));
router.use(bodyParse.json());

router.get('/users/:id?', function(req, res) {
    if (!req.params.id) {
        Users.getUsers(function(err, result) {
            if (err) {
                res.json(err);
            }
            res.json(result);
        });
    } else {
        Users.getUserById(req.params.id, function(err, resutl) {
            if (err) {
                res.json(err);
            }
            res.json(resutl);
        })
    }
});

router.post('/users', function(req, res) {
    let user = {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age
    }
    Users.addUsers(user, function(err, count) {
        if (err) {
            res.json(err);
        }
        res.json(count);
    })
})

router.put('/users/:id', function(req, res) {
    let user = {
        name: req.body.name,
        gender: req.body.gender,
        age: req.body.age
    };
    Users.updateUser(req.params.id, user, function(err, count) {
        if (err) {
            res.json(err);

        }
        res.json(count);
    });
});

router.delete('/users/:id', function(req, res) {
    Users.removeUser(req.params.id, function(err, count) {
        if (err) {
            res.json(err);
        }
        res.json(count);
    })
})


module.exports = router;