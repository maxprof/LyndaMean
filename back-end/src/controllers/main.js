import Messages from '../models/Message';
import mongoose from 'mongoose';
import async from 'async';

module.exports = {
    messagePost: (req, res) => {    
        let body = req.body;
        let newMessage = new Messages(body);
        newMessage.user = req.user;
        newMessage.save((err, newMsg) => {
            if (err) return res.status(500).send(err);
            return res.status(200);
        })

    },
    messageGet: (req, res) => {
        Messages
            .find({})
            .populate('user', '-pwd')
            .exec((err, messages) => {
                if (err) return res.status(500).send({message: err})    ;
                return res.send(messages);
            })
    } 
}
 


