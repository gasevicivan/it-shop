import jwt from 'jsonwebtoken';

export const generateToken = (user) =>{
    console.log("token",user);
    return jwt.sign(
        {
            _id: user.id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        },
        process.env.JWT_SECRET || 'somethingsecret',
        {
            expiresIn: '30d',
        }
    )
}

export const isAuth = (req, res, next) => {
    const authorization = req.headers.authorization;
    console.log("jeste",authorization);
    if(authorization){
        const token = authorization.slice(7, authorization.length);
        console.log("ovde",token);
        jwt.verify(token, process.env.JWT_SECRET || 'somethingsecret', (err, decode) =>{
            if(err){
                console.log("ima");
                res.status(401).send({message: 'Nevažeći token'});
            }
            else{
                req.user = decode;
                next();
            }
        }
        );
    }
    else{
        res.status(401).send({message: 'Nema tokena'});
    }
}

export const isAdmin = (req, res, next) =>{
    if(req.user && req.user.isAdmin){
        next();
    }
    else{
        res.status(401).send({message: 'Neispravan administratorski token'});

    }
}