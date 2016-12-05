// 封装 API 接口
module.exports = function (req, res, next) {
  res.ajaxReturn = function (resBody, overrideBody) {
    res.json(
      Object.assign(
        { success: true, errMsg: '', data: resBody || '' },
        overrideBody
      )
    );
  };
  next();
};
