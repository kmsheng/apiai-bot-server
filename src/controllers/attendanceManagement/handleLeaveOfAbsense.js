import unix from './../../helpers/unix';
import get from './../../helpers/get';
import wrap from './../../helpers/wrap';
import timestampToStr from './../../helpers/timestampToStr';
import objToStr from './../../helpers/objToStr';

export default wrap(async function handleLeaveOfAbsense(req, res, next, data) {

  const {getUserBySlackUserId} = req.app.locals;
  const actionCompleted = ! data.actionIncomplete;

  if (actionCompleted && (data.contexts.length > 0)) {

    const {LEAVE_TIME_START, LEAVE_TIME_END, LEAVE_TYPE, slack_user_id: slackUserId} = get(data, 'contexts[0].parameters', {});
    const leaveStartAt = unix(LEAVE_TIME_START[0]);
    const leaveEndAt = unix(LEAVE_TIME_END[0]);
    const leaveType = LEAVE_TYPE[0];
    const user = await getUserBySlackUserId(slackUserId);
    const info = {
      userId: user.id,
      username: user.name,
      leaveType,
      leaveStartAt: timestampToStr(leaveStartAt),
      leaveEndAt: timestampToStr(leaveEndAt)
    };

    return res.status(200).json({
      speech: `已申請請假資訊 ${objToStr(info)}`
    });
  }

  res.status(200).json({});
});
