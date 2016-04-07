
function builtLine(HistoricalData) {
    responseDates = _.pluck(HistoricalData,'Date')

    xAxisDates = _.map(responseDates,function(e){
        return e.substring(8, 10) + "/" + e.substring(5, 7) + "/" +  e.substring(0, 4)
    })
    $('#container-line').highcharts({
        
        chart: {
            type: 'line',
            plotBackgroundColor: "#EEE"
        },
        
        title: {
            text: ''
        },
        
        credits: {
            enabled: false
        },
        
        xAxis: {
            categories: xAxisDates,
        },
        
        yAxis: {
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
            line: {
                dataLabels: {
                    enabled: true
                },
                enableMouseTracking: false
            }
        },
        
        series: [{
            name: 'Followers',
            color: '#5BC0DE',
            // data: [12, 15, 25, 27, 10, 6, 5]
            data: _.pluck(HistoricalData,'followers_count')

        }, {
            name: 'Favorites',
            color: '#D9534F',
            data: _.pluck(HistoricalData,'favorites_count')
        }]
    });
}

/*
 * Call the function to built the chart when the template is rendered
 */
Template.lineDemo.rendered = function() {
    var datatwitter = DataTwitter.find({screenname:Meteor.user().services.twitter.screenName}).fetch();

    var HistoricalData = datatwitter[0].profileHistorical[0].HistoricalData;
    builtLine(HistoricalData);

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