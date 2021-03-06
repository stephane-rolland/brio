FlowRouter.subscriptions = function() {
  this.register('lessons', Meteor.subscribe('lessons'));
};

FlowRouter.route(['/', '/lessons'], {
  name: "home",
  subscriptions: function(params) {},

  action: function(params, queryParams) {
    if (Meteor.userId()) {
      BlazeLayout.render('masterLayout', {
        footer: "footer",
        main: "lessons",
        nav: "nav",
      });
    } else {
      BlazeLayout.render('homeLayout');
      Session.set('selectedMenuId', 'nav-home');
    }
  }
});

FlowRouter.route('/home', {
  name: "home",
  subscriptions: function(params) {},

  action: function(params, queryParams) {
    BlazeLayout.render('homeLayout');
  }
});

FlowRouter.route('/lesson/:lessonId', {
  triggersEnter: [AccountsTemplates.ensureSignedIn],
  name: "lesson",

  subscriptions: function(params) {
    this.register('cards', Meteor.subscribe('cards', params.lessonId));
  },

  action: function(params, queryParams) {
    // XXX Huge hack to support animation when this page is the first loaded
    Meteor.setTimeout(function() {
      BlazeLayout.render('masterLayout', {
        footer: "footer",
        main: "singleCard",
        nav: "nav",
      });
      Session.set('selectedMenuId', 'nav-lesson-' + params.lessonId);
    }, 150);
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
