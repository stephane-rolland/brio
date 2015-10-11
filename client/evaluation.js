Template.evaluation.events({
    'change #eval': function(event){

      const cardId = Session.get('cardId');
      const note = event.target.value;

      Evaluations.insert({
        cardId:cardId,
        note:note
        });

      nextCard();
    }
});
