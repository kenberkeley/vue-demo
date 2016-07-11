var msgService = require('../../services/msgService'),
  authentication = require('../../middlewares/authentication');

// GET /msg
exports.get = {
  handler: function (req, res, next) {
    // the logic of this demo is so simple that
    // only `author` could be the query condition
    var queryBody;
    if (req.query.author) {
      queryBody = { author: req.query.author };
    }

    var pageIdx = ~~req.query.pageIdx || 1,
      quantity = ~~req.query.quantity || 10;

    if (pageIdx < 1) pageIdx = 1;
    if (quantity < 1) quantity = 10; // default 10 msgs per page

    var pagingBody = {
      idx: pageIdx,
      quantity: quantity
    };

    res.json( msgService.find({ query: queryBody, paging: pagingBody }) );
  }
};

// GET /msg/:msgId (specify fetching ONE record)
// `exports.get` has been occupied above, need to change the letter case
exports.GET = {
  params: ':msgId',
  handler: function (req, res, next) {
    res.json( msgService.findById(req.params.msgId) );
  }
};

// post new message
// POST /msg
exports.post = {
  middlewares: authentication,
  handler: function (req, res, next) {
    var newMsg = msgService.add({
      author: req.session.userData.username,
      title: req.body.title,
      content: req.body.content
    });

    res.json(newMsg);
  }
};

// modify message
// PUT /msg/:msgId
exports.put = {
  params: ':msgId',
  middlewares: authentication,
  handler: function (req, res, next) {
    var modMsg = msgService.mod({
      id: req.params.msgId,
      author: req.session.userData.username,
      title: req.body.title,
      content: req.body.content
    });

    if (!modMsg) {
      return next({
        _status: 403,
        _msg: 'You dont have the authority to modify this message'
      });
    }

    res.json(modMsg);
  }
};

// DELETE /msg/:msgId
exports.delete = {
  params: ':msgId',
  middlewares: authentication,
  handler: function (req, res, next) {
    var hasDeleted = msgService.del({
      id: req.params.msgId,
      author: req.session.userData.username
    });

    if (!hasDeleted) {
      return next({
        _status: 403,
        _msg: 'You dont have the authority to delete / '+
          'this message had been deleted'
      });
    }

    res.json(true);
  }
};
