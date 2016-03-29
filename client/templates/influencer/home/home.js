
if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("users");
  Meteor.subscribe("profile");
  Meteor.subscribe("datatwitter");
  Meteor.subscribe("datainstagram");

  Meteor.users.allow({
    insert: function () { return true; },
    update: function () { return true; },
    remove: function () { return true; }
});

}

// Template.homeInfluencer.onCreated(function() {
//   this.subscribe('users');
// });

Template.homeInfluencer.events({

    'click .sincTwitter': function (event) {
        event.preventDefault();
        Meteor.call('sincTwitter');
    },
    'click .instaconnect': function (event) {
        event.preventDefault();
        var olduserid = Meteor.userId();
        // console.log(olduserid);
        var user1 = Meteor.users.find({_id:Meteor.userId()}).fetch();
        var twitter = user1[0].services.twitter;

        Meteor.loginWithInstagram(function (err) {
          if (err) {
            console.log('login failed', err);

          }
                    var user2 = Meteor.users.find({_id:Meteor.userId()}).fetch();
                    var instagram = user2[0].services.instagram;
                     Meteor.users.update({_id:olduserid},
                      { $set: {  "services" : { "instagram" : instagram, "twitter" : twitter }}});

                    Meteor.users.remove({_id:Meteor.userId()});


            }
      );
        
    },
    'click .twconnect': function (event) {
        event.preventDefault();
        var olduserid = Meteor.userId();
        // console.log(olduserid);
        var user1 = Meteor.users.find({_id:Meteor.userId()}).fetch();
        var instagram = user1[0].services.instagram;

        Meteor.loginWithTwitter(function (err) {
          if (err) {
            console.log('login failed', err);

          }
                    var user2 = Meteor.users.find({_id:Meteor.userId()}).fetch();
                    var twitter = user2[0].services.twitter;
                     Meteor.users.update({_id:olduserid},
                      { $set: {  "services" : { "instagram" : instagram, "twitter" : twitter }}});

                    Meteor.users.remove({_id:Meteor.userId()});


            }
      );
        
    }

});



Template.homeInfluencer.helpers({

    user: function () {

        var user = Meteor.users.find().fetch();
        return user[0]
    },

    profile: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        return profile[0]
    },
    screenname2: function () {

        var screenname = user[0].services.twitter.screenName;
        return screenname;
    },
    datatwitter: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        return datatwitter[0]
    },
    datainstagram: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        return datainstagram[0]
    },

});
Template.homeInfluencer.pieDemo = function() {

    // 'external' data
    var data = new Array();

    data.push({
        name: 'Facebook',
        y: 25,
        color: '#8b8b8b'
    });

    data.push({
        name: 'Twitter',
        y: 24,
        color: '#282828'
    });

    data.push({
        name: 'Instagram',
        y: 38,
        color: '#b3b2b2'
    });

    data.push({
        name: 'Linkedin',
        y: 13,
        color: '#c7c6c6'
    });

    return {
        // chart: {
        //     plotBackgroundColor: 'rgba(255, 255, 255, 0.1)',
        //     plotBorderWidth: null,
        //     plotShadow: false,
        // },
        chart:{
            backgroundColor: "rgba(255, 255, 255, 0)",
            plotBackgroundColor: "#EEE"
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '<b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                // allowPointSelect: true,
                cursor: 'pointer',
                center: ['50%', '30%'],
                dataLabels: {
                    enabled: true,
                    // format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    // connectorColor: 'silver'
                    distance: 50,
                    style: {
                        fontWeight: 'bold',
                        // color: "#484848"
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'genre',
            innerSize: '70%',
            data:data
        }]
    };
};