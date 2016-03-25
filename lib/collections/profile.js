Profile = new Mongo.Collection("profile");

Profile.attachSchema(new SimpleSchema({

    userId: {
        type: String,
        optional: true,
    },
    firstname: {
        type: String,
        optional: true,
        label: "Nombre"
    },
    lastname: {
        type: String,
        optional: true,
        label: "Apellido"
    },
    rut: {
        type: String,
        optional: true,
        label: "Rut"
    },
    phone: {
        type: String,
        optional: true,
        label: "Telefono"
    },
    address: {
        type: String,
        optional: true,
        label: "Direccion"
    },
    bio: {
        type: String,
        optional: true,
        label: "Bio"
    },
     twitterAccount: {
        type: String,
        optional: true,
        label: "Cuenta en Twitter Sin @"
    },
     instagramAccount: {
        type: String,
        optional: true,
        label: "Cuenta en Instagram Sin @"
    },


}));

TabularTables = {};

TabularTables.Profile = new Tabular.Table({
    name: "Profile",
    autoWidth: false,
    order: [[0, "asc"]],
    collection: Profile,
    columns: [
    {data: "twitterAccount", title: "Cuenta Twitter"},
    {data: "instagramAccount", title: "Cuenta Instagram"},
        { data: "twitterAccount", title: "Data Twitter", render: function (val, type, doc) {
        var x = val;
        var datatw  = DataTwitter.find({screenname:x}).fetch()
        if (typeof datatw[0] !== 'undefined') {
            
            return  '<span class="label label-success">'+datatw[0].screenname+'</span>';
                
            }
        
        else{
            return  '<span class="label label-danger">Sin Conexión</span>';

            }
        }
    },
    {tmpl: Meteor.isClient && Template.sincTwSoap, title: "Twitter"},
            { data: "instagramAccount", title: "Data Instagram", render: function (val, type, doc) {
        var x = val;
        var datainsta  = DataInstagram.find({screenname:x}).fetch()
        if (typeof datainsta[0] !== 'undefined') {
            
            return  '<span class="label label-success">'+datainsta[0].screenname+'</span>';
                
            }
        
        else{
            return  '<span class="label label-danger">Sin Conexión</span>';

            }
        }
    },
    {tmpl: Meteor.isClient && Template.sincInstaSoap, title: "Instagram"},
    {tmpl: Meteor.isClient && Template.ButtonShowUsersProfiles}
]

});