Template.lessons.rendered = function () {
};

Template.lessons.helpers({
  lessons: function(){
    return Lessons.find();
  },
  author: function(lesson) {
  	return Meteor.users({userId: lesson.userId}).username;
  }
});

Template.lessons.events({
});
