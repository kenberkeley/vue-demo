// https://github.com/typicode/lowdb 前后端通用的微型数据库 LowDB
var lowdb = require('lowdb');

// 数据库实例（ db.json 为存储文件名或 LocalStorage 键名）
var db = lowdb('db.json');

db.defaults({
  // 初始化时的默认值
  msgs: [/*
    {
      id: <uuid>,
      title: <String>,
      content: <String>,
      author: <String>,
      ctime: <Number:Timestamp>
    }
  */],
 
  session: null
  /*
    { username: <String> } // 对应着 msgs[i].author
   */
}).value();

module.exports = lowdb;
