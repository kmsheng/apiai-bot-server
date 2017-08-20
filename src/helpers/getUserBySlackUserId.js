export default function getUserBySlackUserId(client, slackUserId) {

  return new Promise((resolve, reject) => {

    client.users.info(slackUserId, (err, info) => {
      if (err) {
        return reject(err);
      }
      resolve(info.user);
    });
  });
}
