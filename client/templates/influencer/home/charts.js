
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