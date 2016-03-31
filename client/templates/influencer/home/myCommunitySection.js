
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

Template.myCommunitySection.events({

    'click .instaconnectCommunity': function (event) {
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
    'click .twconnectCommunity': function (event) {
        event.preventDefault();
        Meteor.call('sincTwitterCommunity');
        // console.log("Hello World");
    }

});



Template.twitterCommunity.helpers({

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
    totalgender: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var female = datatwitter[0].profilecommunity[0].GenderDistribution[0].Female;
        var male = datatwitter[0].profilecommunity[0].GenderDistribution[0].Male;
        var totalgender = female + male;
        return totalgender
    },
    percentgender: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var followers = datatwitter[0].profilestatistics[0].qtyfollowers;
        var female = datatwitter[0].profilecommunity[0].GenderDistribution[0].Female;
        var male = datatwitter[0].profilecommunity[0].GenderDistribution[0].Male;
        var percentgender = (female + male)/followers;
        var percentgender = Math.round(percentgender * 100);
        return percentgender
    },
    percentmale: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var female = datatwitter[0].profilecommunity[0].GenderDistribution[0].Female;
        var male = datatwitter[0].profilecommunity[0].GenderDistribution[0].Male;
        var percentmale = male/(male+female);
        var percentmale = Math.round(percentmale * 100);
        return percentmale
    },
    percentfemale: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var female = datatwitter[0].profilecommunity[0].GenderDistribution[0].Female;
        var male = datatwitter[0].profilecommunity[0].GenderDistribution[0].Male;
        var percentfemale = female/(male+female);
        var percentfemale = Math.round(percentfemale * 100);
        return percentfemale
    },
    datainstagram: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        return datainstagram[0]
    },

});