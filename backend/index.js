import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MongoClient = mongodb.MongoClient;

const port = process.env.PORT || 5000;

MongoClient.connect(process.env.DOCTORS_DB_URI, {
    wtimeout: 2500,
    useNewUrlParser: true,
})
    .catch((err) => {
        console.log(err);
        process.exit(1);
    })
    .then(async (client) => {
        app.listen(port, () => {
            console.log(`listening on ${port}`);
        });
    });


     


