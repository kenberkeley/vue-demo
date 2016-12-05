// 封装 API 接口
module.exports = function (req, res, next) {
  res.ajaxReturn = function (resBody) {
    res.json(
      Object.assign({ success: true, errMsg: '' }, resBody);
    );
  };
};
