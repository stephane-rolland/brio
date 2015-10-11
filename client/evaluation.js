Template.evaluation.events({
    'change #eval': function(event){
      Session.set('currentEvaluation',event.target.value);
    }
});
