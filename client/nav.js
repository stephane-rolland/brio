Template.nav.rendered = function () {
  $('.button-collapse').sideNav();
  $('ul#nav-mobile li').removeClass('active');
  $('#'+Session.get('selectedMenuId')).addClass('active');
};

Template.nav.helpers({
  lessons: function(){
    return Lessons.find();
  }
});