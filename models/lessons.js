Lessons = new Mongo.Collection('lessons');

Lessons.attachSchema({
  title: {
    type: String,
  },
  userId: {
    type: String,
  },
  imgUrl: {
  	type: String,
  	optional: true,
  }
});

Lessons.helpers({
  author: function() {
    return Users.find(this.userId).username;
  }
});