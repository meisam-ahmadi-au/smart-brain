const jwt = require('jsonwebtoken');
const redis = require("redis");
const redisClient = redis.createClient({host: process.env.REDIS_URI});

const handleSignin = (db, bcrypt, req, res) => {
  const { email, password } = req.body;
  console.log({email, password})
  if (!email || !password) {
    return Promise.reject('incorrect form submission');
  }
  return db.select('email', 'hash').from('login')
    .where('email', '=', email)
    .then(data => {
      const isValid = bcrypt.compareSync(password, data[0].hash);
      if (isValid) {
        return db.select('*').from('users')
          .where('email', '=', email)
          .then(user => user[0])
          .catch(err => Promise.reject('unable to get user'))
      } else {
        return Promise.reject('wrong credentials')
      }
    })
    .catch(err => Promise.reject('wrong credentials'))
}

const createSession = (user) => {
  const { email, id } = user;
  const token = signToken(email);
  console.log({token})
  return setToken(token,id)
        .then(() => {return { success: 'true', userId: id, token}})
        .catch(console.log)
}

const setToken = (key, value) => Promise.resolve(redisClient.set(key, value));

const signToken = (email) => {
  const jwtPayload = { email };
  return jwt.sign(jwtPayload, process.env.JWTSECRET, { expiresIn: '2 days'});
}

const signinAuthentication = (db, bcrypt) => (req,res) => {
  const { authorization } = req.headers;
  console.log({ authorization })

  return authorization ? getAuthTokenId(req, res) : handleSignin(db, bcrypt, req, res)
  .then(data => {
    console.log("object")
    console.log(data.id, data.email)
    return data.id && data.email ? createSession(data) : Promise.reject(data)
  })
  .then( session => res.json(session))
  .catch(err => res.status(400).json(err));
}

const getAuthTokenId = (req, res) => {
  const { authorization } = req.headers;

  redisClient.get(authorization, (err, reply) => {
    if(err || !reply) {
      return res.status(400).json('Unauthorized')
    }
    return res.json({id: reply})
  })
};

module.exports = {
  handleSignin,
  signinAuthentication,
  redisClient
}