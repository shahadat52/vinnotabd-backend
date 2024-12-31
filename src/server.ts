import mongoose from 'mongoose';
import app from './app';
import config from './app/config';

const port = 5000;

async function main() {
  try {
    await mongoose.connect(config.database as string);

    app.listen(port, () => {
      console.log(`Vinnota Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
