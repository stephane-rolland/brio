Template.nav.rendered = function () {
  $(".button-collapse").sideNav();
};

Template.nav.helpers({
  lessons: function(){
    return Lessons.find();
  }
});