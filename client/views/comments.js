Template.cardComments.helpers({
  comments() {
    Comments.find({ cardId: Session.get('currentCard') });
  },
});

Template.cardCommentAddForm.events({
  submit(evt, tpl) {
    evt.preventDefault();
    let textarea = tpl.$('#add-a-comment');
    let comment = textarea.val();
    let userId = Meteor.userId();
    let currentCard = Session.get('currentCard');

    Comments.insert({
      userId,
      cardId: currentCard,
      content: comment,
      votes: [userId]
    });
    // Emptiy the textarea
    textarea.val('');
  }
});
