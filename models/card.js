Cards = new Mongo.Collection('cards');

Cards.attachSchema({
  text: {
    type: String,
    optional: true,
  },
  image: {
    type: String,
    optional: true,
  },
  sound: {
    type: String,
    optional: true,
  },
  inLessons: {
    type: [String],
    defaultValue: [],
  },
});
