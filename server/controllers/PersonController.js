var PersonModel = require('../models/PersonModel');

let controller = {
    all: function(req, res) {
        PersonModel.find({}).lean().exec(function(err, people) {
            if (err)
                return res.json();
            return res.json(people);
        });
    }
}

module.exports = controller;