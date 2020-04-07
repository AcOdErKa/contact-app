const express = require('express');
const router = express.Router();

const Contact = require('../models/contacts');

router.get('/contacts', (req, res, next) => {
    Contact.find((err, contacts) => {
        res.json(contacts);
    })
});

router.post('/contact',(req, res, next) => {
    let newContact = new Contact({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        contact_number: req.body.contact_number
    });

    newContact.save((err, cb) => {
        if(err){
            res.json({msg: 'Failed to add contact'});
        } else {
            res.json({msg: 'Contact added successfully'});
        }
    })

});

router.delete('/contact/:id',(req, res, next)=> {
    Contact.remove({_id: req.params.id}, (err, result) => {
        if(err){
            res.json({msg: err});
        } else{
            res.json({msg: 'Contact deleted successfully'});
        }
    });
});

router.put('/contact/:id', (req, res, next) => {
    Contact.findByIdAndUpdate(req.params.id, {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        contact_number: req.body.contact_number
    }).then( data => {
        res.json({msg: 'Contact updated successfully'})
    }).catch( err =>{
        res.json({msg: err});
    })
});

module.exports = router;