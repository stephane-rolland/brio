Template.evaluation.helpers({
  evaluations() {
    return [
      { label: 'Unknowed', note: 1 },
      { label: 'Bof', note: 2 },
      { label: 'So-so', note: 3 },
      { label: 'Good', note: 4 },
      { label: 'Brio!', note: 5 },
    ];
  }
});

Template.evaluation.events({
  'click .js-evaluate'() {
    const cardId = Session.get('cardId');
    const note = this.note;

    Evaluations.insert({ cardId, note });

    // move to the next training card
    nextCard();
  }
});
