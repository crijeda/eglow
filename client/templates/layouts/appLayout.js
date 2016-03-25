Meteor.subscribe('userData');

Template.appLayout.rendered = function() {
    $('.sidebar-toggle').each(function() {
        var group = $(this);
        $(this).find(".btn").click(function(e) {
            group.find(".btn.active").removeClass("active");
            $(this).addClass("active");
            e.preventDefault();
        });
    });

    $('.sidebar-toggle').click(function(e) {
        e.preventDefault();

    //Enable sidebar push menu
    $("body").toggleClass('sidebar-collapse');
    $("body").toggleClass('sidebar-open');
    });
        $(".content-wrapper").click(function() {
    //Enable hide menu when clicking on the content-wrapper on small screens    
    if ($(window).width() <= 767 && $("body").hasClass("sidebar-open")) {
        $("body").removeClass('sidebar-open');
    }
    });

        $("li a", $('.sidebar')).click(function(e) {
    //Get the clicked link and the next element
    var $this = $(this);
    var checkElement = $this.next();

    //Check if the next element is a menu and is visible
    if ((checkElement.is('.treeview-menu')) && (checkElement.is(':visible'))) {
    //Close the menu
    checkElement.slideUp('normal', function() {
        checkElement.removeClass('menu-open');
    });
    checkElement.parent("li").removeClass("active");
    }
    //If the menu is not visible
    else if ((checkElement.is('.treeview-menu')) && (!checkElement.is(':visible'))) {
    //Get the parent menu
    var parent = $this.parents('ul').first();
    //Close all open menus within the parent
    var ul = parent.find('ul:visible').slideUp('normal');
    //Remove the menu-open class from the parent
    ul.removeClass('menu-open');
    //Get the parent li
    var parent_li = $this.parent("li");

    //Open the target menu and add the menu-open class
    checkElement.slideDown('normal', function() {
    //Add the class active to the parent li
    checkElement.addClass('menu-open');
    parent.find('li.active').removeClass('active');
    parent_li.addClass('active');
    });
    }
    //if this isn't a link, prevent the page from being redirected
    if (checkElement.is('.treeview-menu')) {
        e.preventDefault();
    }
    });


    if(Meteor.user() && Meteor.user().services && Meteor.user().services.twitter){
        Meteor.users.update({_id: Meteor.user()._id}, { 
                $set: {roles: "Influencer", username: Meteor.user().profile.name}
            }
        );
    }

     if(Meteor.user() && Meteor.user().services && Meteor.user().services.instagram){
        Meteor.users.update({_id: Meteor.user()._id}, { 
                $set: {roles: "Influencer", username: Meteor.user().profile.name}
            }
        );
    }

    // if(Meteor.user()){

    //     if(Meteor.user().profile){
    //         if(Meteor.user().profile.name){
    //             //alert(Meteor.user().services.twitter.screenName)
    //             Meteor.users.update({_id: Meteor.user()._id}, {$set: {roles: "Influencer"} });
    //         } else{
            
    //         }
    //     }else{
        
    //     }

    // }else{

    // }

}

if (Meteor.isClient) {
  // This code only runs on the client
  Meteor.subscribe("users");
  Meteor.subscribe("profile");
  Meteor.subscribe("datatwitter");

}

// Template.appLayout.onCreated(function() {
//   this.subscribe('users');
// });

Template.appLayout.events({
    'click .logout': function(event){
        event.preventDefault();
        Meteor.logout();
        Router.go('login');
    },

    // 'click .profile': function () {
    //     window.location = Router.url('users')+'/'+ Meteor.userId();
    // }

});

Template.appLayout.helpers({
    // var role = Meteor.users.find(this._id);

    
    // user: function () {
    //     var user = Meteor.users.find(this._id);
    //     return user;
    // },
    user: function () {

        var user = Meteor.users.find().fetch();
        return user[0]
    },
    role: function () {
        var role = Meteor.user().roles;
        return role;
    },

    isAdmin: function (name) {
        var role = Meteor.user().roles;
        return role == "Admin"
    },

    isInfluencer: function (name) {
        var role = Meteor.user().roles;
        return role == "Influencer"
    },

    isBusiness: function (name) {
        var role = Meteor.user().roles;
        return role == "Business"
    },


});

Template._influencerSidebar.helpers({

    user: function () {

        var user = Meteor.users.find().fetch();
        return user[0]
    },
    userId: function () {

        var user = Meteor.userId();
        return user
    },

    profile: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        return profile[0]
    },
    profileimage: function () {

        // var profile = Profile.find({userId:Meteor.userId()}).fetch();
        // var twitteraccount = profile[0].twitteracccount;
        // var datatwitter = DataTwitter.find({screenname:twitteraccount}).fetch();
        // var profileimage = datatwitter[0].profilestatistics[0].profileimage;
        var user = Meteor.users.find().fetch();
        var profileimage = Meteor.user().services.twitter.profile_image_url;
        // var stringsize = profileimage.length;

        if (profileimage.indexOf("jpg") > 0) {
            var stringsize = profileimage.length - 11;
            return profileimage.substring(0, stringsize)+'.jpg';
        }
        if (profileimage.indexOf("jpeg") > 0) {
            var stringsize = profileimage.length - 12;
            return profileimage.substring(0, stringsize)+'.jpeg';
        }
         if (profileimage.indexOf("png") > 0) {
            var stringsize = profileimage.length - 11;
            return profileimage.substring(0, stringsize)+'.png';
        }
        // return profileimage.substring(0, 63)+'.jpg';
    },
    datatwitter: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var twitteraccount = profile[0].twitteracccount;
        var datatwitter = DataTwitter.find({screenname:twitteraccount}).fetch();
        return datatwitter[0]
    },
    datainstagram: function () {

        var profile = Profile.find({userId:Meteor.userId()}).fetch();
        var screenname = Meteor.user().services.instagram.username;
        var datainstagram = DataInstagram.find({screenname:screenname}).fetch();
        return datainstagram[0]
    },

});