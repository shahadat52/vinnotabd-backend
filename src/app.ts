import express from 'express';
import cors from 'cors';
import router from './app/routes';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
const app = express();

app.use(express.json());
app.use(cors());

// application routes
app.use('/api', router)


app.get('/', (req, res) => {
  res.send('Hello From VinnotaBD Server');
});

app.use(globalErrorHandler);

export default app;
