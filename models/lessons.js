Lessons = new Mongo.Collection('lessons');

Lessons.attachSchema({
  title: {
    type: String,
  },
  userId: {
    type: String,
  }
});
