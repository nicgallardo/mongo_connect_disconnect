var mongodb = require('mongodb');
var MongoClient = require('mongodb').MongoClient;


var count = 0;


var removeMultiple = (arrayToDelete) => {

  MongoClient.connect("mongodb://localhost:27017/testing", function(err, db) {
    db.collection("foo_bar").remove(
       {'_id':{'$in': arrayToDelete}},
       function(err, result) {
          if(err) console.log("error :", err);
          console.log(result);
          db.close();
       }
    )
  });

};

removeMultiple(['place', 'some', 'ids']);

var update = (count) => {

  MongoClient.connect("mongodb://localhost:27017/testing", function(err, db) {
    db.collection("foo_bar").update(
       { count: count },
       {item: "Updated Box"},
       { upsert: true },
       function(err, result) {
          db.close();
          insert()
       }
    )
  });

}

var insert = () => {

  count++;
  console.log(count);
  if(count === 7000) process.exit(1)

  MongoClient.connect("mongodb://localhost:27017/testing", function(err, db) {
    db.collection("foo_bar").insert({ item: "box", count: count }, function(err, result) {
      db.close();
      update(count);
    });
  });


}

insert()
