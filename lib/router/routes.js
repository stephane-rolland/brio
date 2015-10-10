FlowRouter.subscriptions = function() {
  this.register('lessons', Meteor.subscribe('lessons'));
};

FlowRouter.route('/', {
  name: "home",

  subscriptions: function(params) {
  },

  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "home",
      nav: "nav",
    });
    Session.set('selectedMenuId', 'nav-home');
  }
});

FlowRouter.route('/lesson/:lessonId', {
  name: "lesson",

  subscriptions: function(params) {
    this.register('cards', Meteor.subscribe('cards', params.lessonId));
  },

  action: function(params, queryParams) {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "singleCard",
      nav: "nav",
    });
    Session.set('selectedMenuId', 'nav-lesson-'+params.lessonId);
  }
});

// FlowRouter.route('/singleCard/:lessonId/:cardId', {
//   name: "singleCard",
//
//   subscriptions: function(params) {
//       this.register('cards', Meteor.subscribe('cards', params.cardId));
//   },
//
//   action: function(params, queryParams) {
//     BlazeLayout.render('masterLayout', {
//       footer: "footer",
//       main: "singleCard",
//       nav: "nav",
//     });
//     Session.set('cardId', 'nav-lesson-'+params.cardId);
//   }
// });

FlowRouter.notFound = {
  action: function() {
    BlazeLayout.render('masterLayout', {
      footer: "footer",
      main: "pageNotFound",
      nav: "nav",
    });
  }
};


//Routes
AccountsTemplates.configureRoute('changePwd');
AccountsTemplates.configureRoute('forgotPwd');
AccountsTemplates.configureRoute('resetPwd');
AccountsTemplates.configureRoute('signIn');
AccountsTemplates.configureRoute('signUp');
AccountsTemplates.configureRoute('verifyEmail');
