Meteor.startup(function() {
  // We only import the boilerplate data if the database is empty
  if (! Cards.find().count() === 0) {
    return;
  }

  var userId = Accounts.createUser({
    username: 'admin',
    email: 'admin@brio.io',
    password: 'admin'
  });

  var lessonId = Lessons.insert({
    title: 'English words',
    userId: userId
  });

  var lines = Assets.getText('default_lesson_english.txt').split('\n');
  _.each(lines, function(line) {
    var parts = line.split('§');
    var word = parts[0].trim();
    var definition = (parts[1] || '').trim();
    var cardId = Cards.insert({
      text: word,
      inLessons: [lessonId],
    });

    if (definition) {
      Comments.insert({ content: definition });
    }
  });
});
