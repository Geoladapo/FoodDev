import * as express from 'express';

let app: express.Application = express();

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
