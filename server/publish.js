Meteor.publish('lessons', function() {
  return Lessons.find({});
});

Meteor.publishComposite('cards', function(lessonId) {
  return {
    find() {
      return Cards.find({inLessons: lessonId});
    },
    children: [
      {
        find(card) {
          return Comments.find({ cardId: card._id })
        }
      }
    ]
  };
});
