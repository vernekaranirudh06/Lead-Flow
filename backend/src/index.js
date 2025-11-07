import dotenv from 'dotenv';
import app from './app.js';
import connectDb from './db/index.js';

dotenv.config({ path: './src/.env' });

const PORT = process.env.PORT || 8001;

connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on the port http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Failed to connect to the database', error);
  });
