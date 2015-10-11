Comments = new Mongo.Collection('comments');

// There isn’t a first class card “solution” attached to a card, there are only
// comments that anyone is free to add.
Comments.attachSchema({
  userId: {
    type: String,
  },
  cardId: {
    type: String,
  },
  content: {
    type: String,
  },
  // This object contains the set of userId that have upvoted this comment. This
  // is used for the sorting algorithm on the card solution.
  votes: {
    type: [String],
  },
  createdAt: {
    type: Date,
  },
  // Used to filter the comments to the user locale
  language: {
    type: String,
  },
});

Comments.before.insert((userId, doc) => {
  doc.createdAt = new Date();
  doc.userId = userId;
});
