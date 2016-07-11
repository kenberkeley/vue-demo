var fs = require('fs');

function DbOptService(pathToDbFile) {
  this.db = pathToDbFile;
}

DbOptService.prototype.init = DbOptService;

DbOptService.prototype._isAvailable = function () {
  return fs.existsSync(this.db);
};

DbOptService.prototype.read = function () {
  if (!this._isAvailable()) return null;

  var contentInStr = fs.readFileSync(this.db, 'utf-8'),
    content;

  try {
    content = JSON.parse(contentInStr);
  } catch (e) {
    this.delDb();
    console.error('[ERR] JSON.parse failed, deleted '+ this.db);
  }

  return content || null;
};

DbOptService.prototype.save = function (data) {
  var stringToSave = JSON.stringify(data);

  if (!stringToSave) return;
  fs.writeFileSync(this.db, stringToSave, 'utf-8');
};

DbOptService.prototype.delDb = function () {
  fs.unlinkSync(this.db);
};

module.exports = DbOptService;
