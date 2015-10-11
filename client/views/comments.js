Template.cardComments.helpers({
  comments() {
    return Comments.find({ cardId: Session.get('cardId') });
  },
  commentCount: function() {
    return Comments.find({ cardId: Session.get('cardId') }).count();
  }
});

Template.cardComment.helpers({
  nbVotes() {
    let currentComment = Comments.findOne(this._id);
    return currentComment.votes.length || 0;
  },

  userHasVoted() {
    let currentComment = Comments.findOne(this._id);
    return _.contains(currentComment.votes, Meteor.userId());
  }
});

Template.cardComment.events({
  'click .js-like'() {
    Comments.update(this._id, {$addToSet: {votes: Meteor.userId()}});
  },
  'click .js-unlike'() {
    Comments.update(this._id, {$pull: {votes: Meteor.userId()}});
  }
});

Template.cardCommentAddForm.events({
  submit(evt, tpl) {
    evt.preventDefault();
    let textarea = tpl.$('#add-a-comment');
    let comment = textarea.val();
    let userId = Meteor.userId();
    let cardId = Session.get('cardId');

    Comments.insert({
      cardId: cardId,
      content: comment,
      votes: [Meteor.userId()],
      language: 'fr',
    });
    // Empty the textarea
    textarea.val('');
  }
});
