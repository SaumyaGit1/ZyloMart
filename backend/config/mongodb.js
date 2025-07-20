import mongoose from 'mongoose';

const connectToMongoDB = async () => {
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to the database');
    });
    mongoose.connection.on('error', (err) => {
        console.error('Mongoose connection error:', err);
    });
    mongoose.connection.on('disconnected', () => {
        console.log('Mongoose connection is disconnected');
    });

    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Connected to MongoDB successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1); // Exit process with failure
    }
};

export default connectToMongoDB;
