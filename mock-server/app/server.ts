import express from 'express';
import {heroesController} from './controllers';

const app: express.Application = express();

const port = process.env.PORT || 3000; // todo typing

app.use('/heroes', heroesController);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
