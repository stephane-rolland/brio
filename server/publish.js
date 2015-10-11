Meteor.publish('lessons', function() {
  return Lessons.find({});
});

Meteor.publishComposite('cards', function(lessonId) {
  return {
    find() {
      return Cards.find({ inLessons: lessonId },
        // Accelerate things by only publishing the first 50 items
        // @TODO something more clever here, such as customized pagination
        {limit: 100});
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
