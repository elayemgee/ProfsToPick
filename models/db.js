
const mongoose = require('mongoose');
const mongodb = require('mongodb');
const client = mongodb.MongoClient;
const ReviewModel = require('./ReviewModel.js');
const UserModel = require('./UserModel.js');
const ProfModel = require('./ProfModel.js');

//const url = 'mongodb://localhost:27017/ccapdev-profstopick';
const url = 'mongodb+srv://lei:1PYgZIvqsSpQXl1K@cluster0.15ihh5e.mongodb.net/?retryWrites=true&w=majority';

const options = {
    useUnifiedTopology: true,
    useNewUrlParser: true
};

const database = {

    connect: function () {
        mongoose.connect(url, options, function(error) {
            if(error) throw error;
            console.log('Connected to: ' + url);
        });
    },

    insertOne: function(model, doc, callback) {
        model.create(doc, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    insertMany: function(model, docs, callback) {
        model.insertMany(docs, function(error, result) {
            if(error) return callback(false);
            console.log('Added ' + result);
            return callback(true);
        });
    },

    findOne: function(model, query, projection, callback) {
        model.findOne(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    findMany: function(model, query, projection, callback) {
        model.find(query, projection, function(error, result) {
            if(error) return callback(false);
            return callback(result);
        });
    },

    
    findManyLimit: function(model, query, projection, limit, sort, callback) {
        model.find(query, projection, function(error, result) {
            if(error) throw error;
        }).sort(sort).limit(limit).exec(function(err, result){
            if(err) throw err;
            return callback(result);
        });
    },

    findManySort: function(model, query, projection, sort, callback) {
        model.find(query, projection, function(error, result) {
            if(error) throw error;
        }).sort(sort).exec(function(err, result){
            if(err) throw err;
            return callback(result);
        });
    },

    updateOne: function(model, filter, update, callback) {
        model.updateOne(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Document modified: ' + result.nModified);
            return callback(true);
        });
    },

    updateMany: function(model, filter, update, callback) {
        model.updateMany(filter, update, function(error, result) {
            if(error) return callback(false);
            console.log('Documents modified: ' + result.nModified);
            return callback(true);
        });
    },

    deleteOne: function(model, conditions, callback) {
        model.deleteOne(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    },

    deleteMany: function(model, conditions, callback) {
        model.deleteMany(conditions, function (error, result) {
            if(error) return callback(false);
            console.log('Document deleted: ' + result.deletedCount);
            return callback(true);
        });
    }

}
mongoose.connect(url, options);
module.exports = database;
