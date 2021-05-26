const mongoose = require('mongoose');



const dbConnection = async () => {
    try {
        mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true

        });
        console.log("init DB config");
    } catch (error) {
        console.log(error);
        throw new Error("Error, contact the admin");
    }
}
module.exports = {
    dbConnection
}