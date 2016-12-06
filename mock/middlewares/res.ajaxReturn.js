/**
 * 封装 API 接口，本 Demo 的 API 封装格式为：
 * { success: <Boolean>, errMsg: <String>, data: <Any> }
 */
module.exports = function (req, res, next) {
  // 注意：resBody 与 success 标识位同布尔值，故若是成功但无返回值，也要传入 true
  res.ajaxReturn = function (resBody, overrideBody) {
    res.json(
      Object.assign(
        { success: !!resBody, errMsg: '', data: resBody || '' },
        overrideBody
      )
    );
  };
  next();
};
