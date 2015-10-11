Template.evaluation.events({
    'change #eval': function(event){

      const cardId = Session.get('cardId');
      const note = event.target.value;

      Evaluations.insert({
        cardId:cardId,
        note:note
        });

      // move to the next training card
      nextCard();

      // reset the slider to zero for the next card
      event.target.value = 0;
    }
});
