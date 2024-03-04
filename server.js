const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);
mongoose.connect(DB).then(() => {
  console.log('Db connection successful!');
});

const PORT = process.env.PORT;
const server = app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION Shutting down....');
  server.close(() => {
    process.exit(1);
  });
});
