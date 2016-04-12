//trigger data historica
Template.historicalStatsSection.events({

    'click .connectHistorical': function (event) {
        event.preventDefault();
        var tw = Meteor.user().services.twitter;
        if(tw){
            Meteor.call('sincTwitterHistorical');
        }
        var insta = Meteor.user().services.instagram;
        if(insta){
            Meteor.call('sincInstagramHistorical');
        }
    },

});

Template.historicalStatsSection.helpers({

    //se debe obtener ultima fecha para este
    datatwitter: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        return datatwitter[0]
    },
    day: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var day = datatwitter[0].profileHistorical[0].BestDayAndHour[0].BestDayOfWeek - 1;
        var week = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
        return week[day]
    },
    hour: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.twitter.screenName;
        var datatwitter = DataTwitter.find({screenname:screenname}).fetch();
        var hour = datatwitter[0].profileHistorical[0].BestDayAndHour[0].BestHour - 1;
        var time = [
                    '01:00',
                    '02:00',
                    '03:00',
                    '04:00',
                    '05:00',
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:00',
                    '14:00',
                    '15:00',
                    '16:00',
                    '17:00',
                    '18:00',
                    '19:00',
                    '20:00',
                    '21:00',
                    '22:00',
                    '23:00',
                    '24:00',
                    ];
        return time[hour]
    },
    dayinsta: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.instagram.username;
        var dataintagram = DataInstagram.find({screenname:screenname}).fetch();
        var day = dataintagram[0].profileHistorical[0].BestDayAndHour[0].BestDayOfWeek - 1;
        var week = ['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo'];
        return week[day]
    },
    hourinsta: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var instagramaccount = profile[0].instagramacccount;
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        var hour = datainstagram[0].profileHistorical[0].BestDayAndHour[0].BestHour - 1;
        var time = [
                    '01:00',
                    '02:00',
                    '03:00',
                    '04:00',
                    '05:00',
                    '06:00',
                    '07:00',
                    '08:00',
                    '09:00',
                    '10:00',
                    '11:00',
                    '12:00',
                    '13:00',
                    '14:00',
                    '15:00',
                    '16:00',
                    '17:00',
                    '18:00',
                    '19:00',
                    '20:00',
                    '21:00',
                    '22:00',
                    '23:00',
                    '24:00',
                    ];
        return time[hour]
    },

    datainstagram: function(){
        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        return datainstagram[0]
    },
    activetw: function () {

        var tw = Meteor.user().services.twitter;
        if(tw){
        return "active"
        }
        var insta = Meteor.user().services.instagram;
        if(insta){
        return null
        }
        
    },
     activeinsta: function () {


        var tw = Meteor.user().services.twitter;
        if(tw){
        return null
        }
        var insta = Meteor.user().services.instagram;
        if(insta){
        return "active"
        }
        
    },

});