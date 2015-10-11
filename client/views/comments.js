Template.cardComments.helpers({
  comments() {
    return Comments.find({ cardId: Session.get('cardId') });
  },
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
