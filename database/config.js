import mongoose from "mongoose";

const conectionDB = async () => {
    try {
        await mongoose.connect(process.env.MOMGODB_CNN);
        console.log("base da datos online");
    } catch (error) {
        console.log(error);
        throw new Error("Error en la conexion en la base de datos");
    }
}

export {
    conectionDB
}