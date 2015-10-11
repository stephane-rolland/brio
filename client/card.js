Template.card.onCreated(function() {
  this.autorun(() => {
    this.showComment = new ReactiveVar(false);
  });
});

Template.card.helpers({
  showComments() {
    return Template.instance().showComment.get();
  }
});

Template.card.events({
  'click .js-disclose-content'() {
    Template.instance().showComment.set(true);
  }
})
//
// resetComment = function (){
//   Template.instance().showComment.set(false);
// }
