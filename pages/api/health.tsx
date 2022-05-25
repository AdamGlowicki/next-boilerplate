/**
 * DO NOT REMOVE THIS ROUTE
 *
 * The health check is created to be able to monitor if the next server is working
 * and in case of not responding to restart the instance.
 * The name is settled with the DevOps and it will be used automatically.
 * In case of removing it, you have to contact with the DevOps
 * that is responsible for project's production
 */

import {
  NextApiRequest,
  NextApiResponse,
} from 'next';

const healthRoute = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).send('OK');
};

export default healthRoute;
