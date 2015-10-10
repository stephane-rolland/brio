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
