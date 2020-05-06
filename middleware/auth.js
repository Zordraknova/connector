const jwt = require('jsonwebtoken');
const config = require('config');

module.export= function(req,res,next) {
    const token = req.header('x-auth-token');

    if(!token) {
        return status(401).json({msg: 'NO TOKEN'});
    }

 try{
     const decoded = jwt.verify(token, config.get('jwtSecret'));
     req.user = decoded.user;
     next();

 }catch(err){
    res.status(401).json({msg : 'token is not valid'});
   }
};
