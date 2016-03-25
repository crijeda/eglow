DataTwitter = new Mongo.Collection("DataTwitter");

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
  qtytweets: {
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
  qtyfavorites: {
    type: Number,
    optional: true,
  },
  qtyretweets: {
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

DataTwitter.attachSchema(new SimpleSchema({
  screenname: {
    type: String,
    optional: true,
    label: "TwitterScreenname",
    max: 200
  },
   profilestatistics: {
    optional: true,
    type: [ProfileStatisticsSchema],
    label: 'ProfileStatistics'
    },

}));