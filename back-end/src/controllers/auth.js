import User from '../models/User';
import jwt from 'jwt-simple';
import moment from 'moment';
module.exports = {
    register: (req, res) => {
        let body = req.body;
        User
            .findOne({email: body.email})
            .exec((err, user) => {
                if (err) return res.status(500).send({message: err.message});
                if (user) return res.status(409).send({message: "Email  already exist"});
                let newUser = new User(body);
                newUser.save((err, user) => {
                    if (err) return res.status(500).send({message: err.message});
                    return res.status(200).send({token: createToken(user)});
                })
            })
    },
    login: (req, res) => {
        let body = req.body;
        User
            .findOne({email: body.email})
            .exec((err, user) => {
                if (err) return res.status(500).send({message: err.message});
                if (!user) return res.status(401).send({message: "Email  or password is invalid"});
                if (req.body.pwd == user.pwd) return res.status(200).send({token: createToken(user)});
                return res.status(401).send({message: "Invalid email and/or password"});
            });
    }
}

function createToken(user) {
    var payload = {
        sub: user._id,
        iat: moment().unix(),
        exp: moment().add(14, 'days').unix()
    };
    return jwt.encode(payload, 'secret');
}
