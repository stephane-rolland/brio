Evaluations = new Mongo.Collection('evaluations');

Evaluations.attachSchema({
  userId: {
    type: String,
  },
  cardId: {
    type: String,
  },
  createdAt: {
    type: Date,
  },
  note: {
    type: Number,
  },
});

Cards.before.insert((userId, doc) => {
  doc.createdAt = new Date();
  doc.userId = userId;
});
