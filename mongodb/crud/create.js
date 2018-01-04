const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');  //断言

// 要访问的mongodb服务地址
const url = 'mongodb://localhost:27017';

// 要访问的数据库名称
const dbName = 'test';


const insertDocuments = function(db, callback) {
  // 得到集合中名为documents的文档，没有则创建
  const collection = db.collection('documents');
  // 向集合中添加文档
  collection.insertMany([
    {a : 4}, {a : 5}, {a : 6}
  ], function(err, result) {
  	console.log(result);
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}




// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("成功连接到mongodb服务!");
  const db = client.db(dbName);

  insertDocuments(db, function() {
    client.close();
  });
});