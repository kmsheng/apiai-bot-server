import unix from './../../helpers/unix';
import wrap from './../../helpers/wrap';

export default wrap(async function handleConnectionStatus(req, res, next, data) {

  const {getUserBySlackUserId} = req.app.locals;
  const actionCompleted = ! data.actionIncomplete;

  if (actionCompleted && (data.contexts.length > 0)) {
    return res.status(200).json({
      speech: `Bot Server 上線中`
    });
  }

  res.status(200).json({});
});
