Meteor.publish('lessons', function() {
  return Lessons.find({});
});

Meteor.publish('cards', function(lessonId) {
  return Cards.find({inLessons: lessonId});
});