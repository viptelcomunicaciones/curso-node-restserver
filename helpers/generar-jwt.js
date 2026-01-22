import jsonwebtoken from "jsonwebtoken";

const generarjwt = (uid = '') =>{
    return new Promise((resolve, reject) => {
            const payload = {uid};
            jsonwebtoken.sign(payload,process.env.SECRETORPRIVATEKEY,{
                expiresIn: '1h'
            },(error,token)=>{
                if (error) {
                    console.log(error)
                    reject('no se pudo generar el token');
                } else {
                    resolve(token);
                }
            })
    })
}

export {
    generarjwt,
}