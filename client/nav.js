Template.nav.rendered = function () {
  $('.button-collapse').sideNav();
  $('ul#nav-mobile li').removeClass('active');
  $('#'+Session.get('selectedMenuId')).addClass('active');
  $('.dropdown-button').dropdown();
};

Template.nav.helpers({
  lessons: function(){
    return Lessons.find();
  },
  user: function() {
    return Meteor.user();
  }
});

Template.nav.events({
  'click .js-HACK-reload'() {
    window.location.reload();
  }
});
