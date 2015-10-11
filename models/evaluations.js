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

function onInsert(userId, doc)
{
  doc.createdAt = new Date();
  doc.userId = userId;
}

Evaluations.before.insert(
  onInsert
);
