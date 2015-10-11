
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

// global function, callable from somewhere else
nextCard = function (){
  const cards = Cards. find().fetch();
  const randomId = parseInt((Math.random()*cards.length),10);
  //const chosenCardId = cards[randomId]._id;

  const chosenCardId = chooseCard();

  Session.set('cardId', chosenCardId);
}


function isEvaluationAtGoodLevel(cardId, level){
  return getLastEvaluation(cardId) && (getLastEvaluation(cardId).note == level);
}

function chooseCard (){

  // a number between 0 and 100
  const randomInt = parseInt((Math.random()*100),10);
  const level = computeLevel(randomInt);

  console.log("level = " + level);

  // pour chaque carte de la leçon  la collection Cards
  // demander la derniere evaluation sur cette carte
  // si elle est du bon level recherché, la mettre de coté
  // les mettre dans un array
  const allCards = Cards.find().fetch();
  const workingArray = Cards.find().fetch().filter( (x) => isEvaluationAtGoodLevel(x, level) );
  const notEnoughNewCards = workingArray.length < 10;

  const takeANewCard = (allCards.length ==0) /*|| (level==1 && notEnoughNewCards)*/;

  if (takeANewCard)  {
    console.log("take a new card!");

    // si jamaias tiré le level 1 star , et que moins de 10 cartes avec 1 seule étoile
    // on prend la premiere qui n'a pas d'évaluation
    const cardId = getFirstCardWithoutEvaluation();
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

    const randomValue = (Math.random()*(workingArray.length-1));
    console.log(randomValue);
    const workingCardId =  1 + parseInt(randomValue,10);
    console.log(workingArray);
    console.log(workingCardId);
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

function predicateNoEval(id){
  return getLastEvaluation(id) === null;
}

function getFirstCardWithoutEvaluation(){
  const cardsWithoutEval = Cards.find().fetch().filter(predicateNoEval);

  if (cardsWithoutEval.length > 0){
    return cardsWithoutEval[0]._id;
  }
  else{
    return null;
  }

}

// étant donné l'id d'une card
// on ramène la derniere evaluation à cette carte
function getLastEvaluation(cardId){
  const evals = Evaluations.find({cardId:cardId}).fetch(); // , {sort:{createdAt:-1}
  if (evals.length > 0){
    return evals[0]._id;
  }
  else{
    return null;
  }
}
