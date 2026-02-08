import dotenv from 'dotenv';
import connectDB from './config/db.js';
import app from './app.js';
import cors from 'cors';

app.use(cors());

dotenv.config({path: './.env'});

const startServer = async () => {
    try {
    await connectDB();
    app.on('error', (err) => {
        console.log("Server error", err);
        throw err;
    });

    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
    } catch (error) {
        console.log("Error starting server:", error);
        throw error;
    }
}

startServer();
