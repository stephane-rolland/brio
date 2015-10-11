Template.card.onCreated(function() {
  this.autorun(() => {
    Session.get('cardId');
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
});
