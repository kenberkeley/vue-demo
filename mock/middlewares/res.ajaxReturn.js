/**
 * 封装 API 接口，封装格式为：
 * { success: <Boolean>, errMsg: <String>, data: <Any> }
 */
module.exports = function (req, res, next) {
  res.ajaxReturn = function (resBody, overrideBody) {
    res.json(
      Object.assign(
        { success: !!resBody || !overrideBody, errMsg: '', data: resBody || '' },
        overrideBody
      )
    );
  };
  next();
};

/**
 * e.g.
 *
 * res.ajaxReturn() => { success: true, errMsg: '', data: '' }
 * res.ajaxReturn(true) => { success: true, errMsg: '', data: true }
 * res.ajaxReturn(false) => { success: true, errMsg: '', data: '' }
 * res.ajaxReturn(null) => { success: true, errMsg: '', data: '' }
 * res.ajaxReturn({ a: 1 }) => { success: true, errMsg: '', data: { a: 1 } }
 * res.ajaxReturn(false, { errMsg: '404' }) => { success: false, errMsg: '404', data: '' }
 */
