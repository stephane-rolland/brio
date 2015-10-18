
// so as to run nextCard once we are ready
// we have set a reactive computation watching subsready, which is ok true when we have received the Cards data
Template.singleCard.onCreated(function() {
  let handle = this.autorun(function() {
    if (FlowRouter.subsReady('cards')) {
      Session.set('cardId', nextCard());
      handle.stop();
    }
  });
});

Template.singleCard.helpers({
  currentCard: function(){
    const cardId = Session.get('cardId');
    return Cards.findOne(cardId);
  }
});

Template.singleCard.animations({
  ".card": {
    animateInitial: true,
    animateInitialStep: 100,
    animateInitialDelay: 0,
    container: ".card-viewer",
    in: "animated fast fadeInRight",
    out: "animated fast fadeOutLeft",
  }
});

// global function, callable from somewhere else
nextCard = function (){
  console.log("nextCard");

  const cards = Cards.find().fetch();
  const randomId = parseInt((Math.random()*cards.length),10);
  //const chosenCardId = cards[randomId]._id;

  const chosenCardId = chooseCard();

  Session.set('cardId', chosenCardId);
  return chosenCardId;
}

function chooseCard (){

  // a number between 0 and 100
  const randomInt = parseInt((Math.random()*100),10);
  const level = computeLevel(randomInt);

  console.log("level = " + level);

  const allCards = Cards.find().fetch();

  const workingArray = Cards.find({note:level}).fetch();

  const cardsLevel1 = Cards.find({note:1}).fetch();
  const cardsLevel2 = Cards.find({note:2}).fetch();
  const newCards = cardsLevel1.concat(cardsLevel2)

  console.log("1 star cards = "+newCards.length);
  let takeANewCard = newCards.length < 10 ;

  if(workingArray.length == 0 && newCards.length < 10)
  {
      takeANewCard = true;
  }

  if(Cards.find({note:0}).fetch().length == 0)
  {
      takeANewCard = false;
      console.log("No More New cards to learn");
      const c1 = Cards.find({note:1}).fetch();
      const c2 = Cards.find({note:2}).fetch();
      const c3 = Cards.find({note:3}).fetch();
      const c4 = Cards.find({note:4}).fetch();
      const c5 = Cards.find({note:5}).fetch();

      if(c1.length)
      {
        return c1[0]._id;
      }
      if(c2.length)
      {
        return c2[0]._id;
      }
      if(c3.length)
      {
        return c3[0]._id;
      }
      if(c4.length)
      {
        return c4[0]._id;
      }
      if(c5.length)
      {
        return c5[0]._id;
      }
  }

  console.log("takeANewCard = " + takeANewCard)
  if (takeANewCard )  {
    console.log("take a new card!");
    const cardId = getFirstCardWithoutEvaluation(allCards);
    return cardId;
  }
  else {

    const randomValue = (Math.random()*(workingArray.length));
    //console.log("randomValue = " + randomValue);
    const workingCardId = parseInt(randomValue,10);
    //console.log(workingArray);
    //console.log("workingCardId = " + workingCardId );
    if(workingArray.length > 0)
    {
      const cardId = workingArray[workingCardId]._id;
      return cardId;
    }
    else {
      return newCards[0]._id;
    }

  }
}

const probabilities = [0,3,10,25,55,100];
function isBetween(val,x){

  return probabilities[x] <= val && val <= probabilities[x+1]
}

// if randomInt 70 => we select eval 1 star card
// if randomInt 2 => we select eval 5 stars card
function computeLevel (randomInt){
  for (var i = 0; i < (probabilities.length - 1) ; i++){
      if (isBetween(randomInt,i)){
        return (probabilities.length - 1) - i;
      }
  }
}

function predicateNoEval(card){
  return card.note == 0;
}

function getFirstCardWithoutEvaluation(allCards){
  const cardsWithoutEval = allCards.filter(predicateNoEval);
  return cardsWithoutEval[0]._id;
}

// étant donné l'id d'une card
// on ramène la derniere evaluation à cette carte
function getLastEvaluation(card){

  const evals = Evaluations.find({cardId:card._id}).fetch(); // , {sort:{createdAt:-1}

  if (evals.length > 0){
    //console.log("last eval =", evals[0]);
    return evals[0];
  }
  else{
    return null;
  }
}
