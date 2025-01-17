import mongoose from 'mongoose';
import app from './app';
import config from './app/config';
import seedSuperAdmin from './app/DB';

const port = 5000;

async function main() {
  try {

    await mongoose.connect(config.database as string);
    seedSuperAdmin()

    app.listen(port, () => {
      console.log(`VinnotaBD is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
