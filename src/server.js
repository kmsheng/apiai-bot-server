import express from 'express';
import bodyParser from 'body-parser';
import {WebClient} from '@slack/client';
import getUserBySlackUserId from './helpers/getUserBySlackUserId';
import handleLeaveOfAbsense from './controllers/attendanceManagement/handleLeaveOfAbsense';

const port = 3050;
const app = express();
const slack = new WebClient(process.env.SLACK_API_TOKEN);

app.locals.getUserBySlackUserId = getUserBySlackUserId.bind(null, slack);

app.use(bodyParser.json());

app.post('/action', (req, res, next) => {

  const {result} = req.body;
  const {intentName} = result.metadata;

  switch (intentName) {
    case '請假':
      return handleLeaveOfAbsense(req, res, next, result);
    default:
      res.status(200).end();
  }
});

app.use((err, req, res, next) => {

  console.error(`error: ${err}`);

  res.status(200)
    .json({speech: 'Internal Server Error'});
});

app.listen(port, (err) => {
  if (err) {
    throw err;
  }
  console.info(`🌎  API is running on localhost:${port}`);
});
