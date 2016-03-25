
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

/*
 * Function to draw the column chart
 */

function builtColumn() {
    
    $('#container-column').highcharts({
        
        chart: {
            type: 'column',
            plotBackgroundColor: "#EEE"
        },
        
        title: {
            text: ''
        },
        
        // subtitle: {
        //     text: 'Source: WorldClimate.com'
        // },
        
        credits: {
            enabled: false
        },
        
        xAxis: {
            categories: [
                '13-18',
                '19-24',
                '25-30',
                '31-35',
                '36-40',
                '41-50',
                '50+',
            ]
        },
        
        yAxis: {
            min: 0,
            title: {
                text: ''
            }
        },
        
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                '<td style="padding:0"><b>{point.y:.1f} mm</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
        
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0
            }
        },
        
        series: [{
            name: 'Hombres',
            color: '#5BC0DE',
            data: [12, 15, 25, 27, 10, 6, 5]

        }, {
            name: 'Mujeres',
            color: '#D9534F',
            data: [14, 22, 35, 29, 20, 4, 6]
        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.columnDemo.rendered = function() {    
    builtColumn();
}

var basicChart = {
    chart: {
            // type: 'column',
            plotBackgroundColor: "#EEE"
        },

        credits: {
            enabled:false,
        },

        title: {
            text: ' ',
        },
        // subtitle: {
        //     text: ' ',
        // },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        },
        yAxis: {
            title: {
                text: ' '
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: ' '
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0,
            enabled:false,
        },
        series: [{
            name: 'Tokyo',
            data: [7.0, 6.9, 9.5, 14.5, 18.2, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
        }, {
            name: 'New York',
            data: [-0.2, 0.8, 5.7, 11.3, 17.0, 22.0, 24.8, 24.1, 20.1, 14.1, 8.6, 2.5]
        }, {
            name: 'Berlin',
            data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0]
        }, {
            name: 'London',
            data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
        }]
    }


function builtBasic() {
    $('#container-basic').highcharts(
        basicChart
    );
}

Template.basicDemo.rendered = function() {    
    builtBasic();
}

function builtBasic2() {
    $('#container-basic2').highcharts(
        basicChart
    );
}

Template.basicDemo2.rendered = function() {    
    builtBasic2();
}

function builtBasic3() {
    $('#container-basic3').highcharts(
        basicChart
    );
}

Template.basicDemo3.rendered = function() {    
    builtBasic3();
}