
// so as to run nextCard once we are ready
// we have set a reactive computation watching subsready, which is ok true when we have received the Cards data
Template.singleCard.onCreated(function() {
  this.autorun(function() {
    if (FlowRouter.subsReady('cards')) {
      Session.set('cardId', nextCard());
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
  const cards = Cards.find().fetch();
  const randomId = parseInt((Math.random()*cards.length),10);
  //const chosenCardId = cards[randomId]._id;

  const chosenCardId = chooseCard();

  Session.set('cardId', chosenCardId);
  return chosenCardId;
}


function isEvaluationAtGoodLevel(card, level){
  //const isOk = getLastEvaluation(card) && (getLastEvaluation(card).note == level);
  const lastEval = getLastEvaluation(card);
  if (lastEval){
    //console.log("level attendu =" + level);
    //console.log("note evaluation =" + lastEval.note );
    //console.log(lastEval);
  }
  const isOk = lastEval;
  return isOk;
}

function chooseCard (){

  const evals = Evaluations.find().fetch();
  //console.log("nb evals =" + evals.length);

  // a number between 0 and 100
  const randomInt = parseInt((Math.random()*100),10);
  const level = computeLevel(randomInt);

  //console.log("level = " + level);

  // pour chaque carte de la leçon  la collection Cards
  // demander la derniere evaluation sur cette carte
  // si elle est du bon level recherché, la mettre de coté
  // les mettre dans un array
  const allCards = Cards.find().fetch();
  //console.log("all = " + allCards.length );

  const workingArray = Cards.find().fetch().filter( (x) => isEvaluationAtGoodLevel(x, level) );
  const notEnoughNewCards = workingArray.length < 10;

  //console.log("workingArray = " + workingArray.length)
  //console.log("notEnoughNewCards = " + notEnoughNewCards)

  //const takeANewCard = (allCards.length ==0) || (workingArray.length == 0) || (level==1 && notEnoughNewCards);
  const takeANewCard = Math.random() > 0.9 ;

  if (takeANewCard || workingArray.length == 0)  {
    //console.log("take a new card!");

    // si jamaias tiré le level 1 star , et que moins de 10 cartes avec 1 seule étoile
    // on prend la premiere qui n'a pas d'évaluation
    const cardId = getFirstCardWithoutEvaluation();
    //console.log("first without eval = " + cardId);
    if (cardId === null)
    {
      return chooseCard();
    }
    else {
      return cardId;
    }
  }
  else {
    // choisir au hasard dans ce working array

    const randomValue = (Math.random()*(workingArray.length));
    //console.log("randomValue = " + randomValue);
    const workingCardId = parseInt(randomValue,10);
    //console.log(workingArray);
    //console.log("workingCardId = " + workingCardId );
    const cardId = workingArray[workingCardId]._id;
    return cardId;
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
  return getLastEvaluation(card) === null;
}

function getFirstCardWithoutEvaluation(){
  const allCards = Cards.find().fetch();

  //console.log("nb all cards = " + allCards.length);

  const cardsWithoutEval = allCards.filter(predicateNoEval);



  if (cardsWithoutEval.length > 0){
    //console.log("first card without eval id = " + cardsWithoutEval[0]._id);
    return cardsWithoutEval[0]._id;
  }
  else{
    //console.log("no cards without eval");
    return null;
  }

}

// étant donné l'id d'une card
// on ramène la derniere evaluation à cette carte
function getLastEvaluation(card){

  const evals = Evaluations.find({cardId:card._id}).fetch(); // , {sort:{createdAt:-1}

  if (evals.length > 0)
  {
    //console.log(card._id);
    //console.log("nb evaluations = " );
    //console.log(evals.length);
  }

  if (evals.length > 0){
    //console.log("last eval =", evals[0]);
    return evals[0];
  }
  else{
    return null;
  }
}
