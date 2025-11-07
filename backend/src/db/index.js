import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    await mongoose.connect(String(process.env.MONGO_URI));
    console.log('✅Mongo db connected from path src/db/index');
    return true;
  } catch (error) {
    console.log('❌Mongo db connection error from path src/db/index  :', error);
    process.exit(1);
  }
};

export default connectDb;
