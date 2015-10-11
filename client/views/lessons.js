Template.lessons.rendered = function () {
};

Template.lessons.helpers({
  lessons: function(){
    return Lessons.find();
  }
});

Template.lessons.events({
});
