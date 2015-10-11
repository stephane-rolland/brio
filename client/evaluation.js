Template.evaluation.helpers({
  evaluations() {
    return [
      { label: 'Unknown', note: 1 },
      { label: 'Bof', note: 2 },
      { label: 'So-so', note: 3 },
      { label: 'Good', note: 4 },
      { label: 'Brio', note: 5 },
    ];
  }
});

Template.evaluation.events({
  'click .js-evaluate'() {
    console.log("insert event");

    const cardId = Session.get('cardId');
    console.log(cardId);
    const note = this.note;
    console.log(note);
    Cards.update({_id:cardId},{$set:{note: note}});

    console.log("insert note = " + note);
    //Evaluations.insert({ cardId, note });

    Session.set('cardId', '');
    Tracker.flush();
    let nextCardId = nextCard();
    Tracker.afterFlush(function() {
      Session.set('cardId', nextCardId);
    });
  }
});
