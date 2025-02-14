//libs/mongodb.ts
import mongoose, { Schema, Document } from 'mongoose';


let cachedConnection: typeof mongoose | null = null;
let cachedPromise: Promise<typeof mongoose> | null = null;

async function dbConnect() {
    if (cachedConnection) {
        console.log('Using existing database connection');
        return cachedConnection;
    }

    if (!cachedPromise) {
        console.log('Connecting to database');
        cachedPromise = mongoose.connect(process.env.MONGODB_URI!).then((mongoose) => {
            console.log('✅ Connected to MongoDB');
            return mongoose;
        }).catch((err) => {
            console.error('❌ MongoDB connection error:', err);
            throw new Error('❌ Database connection failed');
        });
    }

    try {
        cachedConnection = await cachedPromise;
    } catch (error) {
        cachedPromise = null; // Reset promise nếu kết nối thất bại để thử lại lần sau
        throw error;
    }

    return cachedConnection;
}

export default dbConnect;



// Interface for the Counter
interface ICounter extends Document {
    modelName: string;
    sequenceValue: number;
}

// Counter schema to track the auto-increment values for different collections
const CounterSchema = new Schema({
    modelName: { type: String, required: true, unique: true }, // Name of the collection or model
    sequenceValue: { type: Number, default: 0 }, // The current value of the auto-increment counter
});

// Check if the model exists and use it, otherwise create a new one
const Counter = mongoose.models.Counter || mongoose.model<ICounter>('Counter', CounterSchema);

// Function to get the next auto-incremented ID
async function getNextSequenceValue(modelName: string): Promise<number> {
    const counter = await Counter.findOneAndUpdate(
        { modelName }, // Find the counter for the specific model
        { $inc: { sequenceValue: 1 } }, // Increment the sequenceValue by 1
        { new: true, upsert: true } // Create the counter document if it doesn't exist
    );
    return counter.sequenceValue;
}

// Export the Counter model and the function
export { Counter, getNextSequenceValue };