Template.evaluation.helpers({
  evaluations() {
    return [
      { label: 'Unknowed', note: 1 },
      { label: 'Bof', note: 2 },
      { label: 'So-so', note: 3 },
      { label: 'Good', note: 4 },
      { label: 'Brio', note: 5 },
    ];
  }
});

Template.evaluation.events({
  'click .js-evaluate'() {
    const cardId = Session.get('cardId');
    console.log(cardId);
    const note = this.note;

    console.log("insert please!");
    Evaluations.insert({ cardId, note });

    Session.set('cardId', '');
    Tracker.flush();
    let nextCardId = nextCard();
    Tracker.afterFlush(function() {
      Session.set('cardId', nextCardId);
    });
  }
});
