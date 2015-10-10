
// so as to run nextCard once we are ready
// we have set a reactive computation watching subsready, which is ok true when we have received the Cards data
Template.singleCard.onCreated(function() {
  this.autorun(function() {
    if (FlowRouter.subsReady('cards')) {
      nextCard();
    }
  });
});

Template.singleCard.helpers({
    currentCard: function(){

      const cardId = Session.get('cardId');

      return Cards.findOne(cardId);
    }

});

function nextCard(){
  const cards = Cards. find().fetch();
  const randomId = parseInt((Math.random()*cards.length),10);
  console.log(cards);
  console.log(randomId);
  const cardId = cards[randomId]._id;
  console.log(cardId);

  Session.set('cardId', cardId)
  console.log("passed");
}
