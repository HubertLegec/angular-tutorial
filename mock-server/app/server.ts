import express from 'express';
import * as bodyParser from 'body-parser';
import morgan from 'morgan';
import {heroesController} from './controllers';

const app: express.Application = express();
app.use(bodyParser.json({limit: '10mb'}));
app.use(morgan('common'));

const port = process.env.PORT || 3000; // todo typing

app.use('/api/heroes', heroesController);

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}/`);
});
