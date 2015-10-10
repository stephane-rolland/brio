Cards = new Mongo.Collection('cards');

Cards.attachSchema({
  text: {
    type: String,
  },
  image: {
    type: String,
  },
  sound: {
    type: String,
  },
  inLessons: {
    type: [String],
  },
});
