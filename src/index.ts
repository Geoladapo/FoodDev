import { Server } from './server';
import * as dotenv from 'dotenv';

dotenv.config();
let server = new Server().app;
let port = process.env.PORT;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
