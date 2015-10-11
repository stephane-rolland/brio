Meteor.startup(function() {
  // We only import the boilerplate data if the database is empty
  if (Cards.find().count() !== 0) {
    return;
  }

  console.log('=> Importing boilerplate lessons.')

  var userId = Accounts.createUser({
    username: 'admin2',
    email: 'admin2@brio.io',
    password: 'admin'
  });

  import_lesson_file(userId, 'http://www.geonames.org/flags/x/uk.gif', 'English words','default_lesson_english.txt');
  import_lesson_file(userId, 'http://www.geonames.org/flags/x/cn.gif', 'Chinese words','default_lesson_chinese.txt');
  import_lesson_file(userId, 'http://www.geonames.org/flags/x/cn.gif', 'Astronomy','default_lesson_astronomy.txt');

});

function import_lesson_file(userId, imgUrl, lessonTitle, filePath){

  var lessonId = Lessons.insert({
    title: lessonTitle,
    imgUrl: imgUrl,
    userId: userId
  });

  var lines = Assets.getText(filePath).split('\n');
  _.each(lines, function(line) {
    var parts = line.split('§');
    var word = parts[0].trim();
    var image = (parts[1] || '').trim();
    var definition = (parts[2] || '').trim();
    var cardId = Cards.insert({
      text: word,
      inLessons: [lessonId],
      note: 0,
      image: image,
    });

    if (definition) {
      Comments.insert({
        userId: userId,
        content: definition,
        cardId: cardId,
        language: 'fr',
        createdAt: new Date(),
      });
    }
  }
);
};
