DataInstagram = new Mongo.Collection("DataInstagram");

ProfileStatisticsSchema = new SimpleSchema({
  // createdAt: {
  //   type: Date,
  //   autoValue: function() {
  //     return moment().toDate();
  //   }
  // },
  screenname: {
    type: String,
    optional: true,
  },
  name: {
    type: String,
    optional: true,
  },
  profileimage: {
    type: String,
    optional: true,
  },
  profilebio: {
    type: String,
    optional: true,
  },
  qtyfeeds: {
    type: Number,
    optional: true,
  },
  qtyfollowers: {
    type: Number,
    optional: true,
  },
  qtyfollowing: {
    type: Number,
    optional: true,
  },
  qtylikes: {
    type: Number,
    optional: true,
  },
  images: {
    type: Number,
    optional: true,
  },
  videos: {
    type: Number,
    optional: true,
  },
  music: {
    type: Number,
    optional: true,
  },


});

DataInstagram.attachSchema(new SimpleSchema({
  screenname: {
    type: String,
    optional: true,
    label: "InstagramScreenname",
    max: 200
  },
   profilestatistics: {
    optional: true,
    type: [ProfileStatisticsSchema],
    label: 'ProfileStatistics'
    },

}));