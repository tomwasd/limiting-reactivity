// Return an array of item Ids
Meteor.methods({
  getItemIds: function() {
    return Items.find({}, {fields: {_id: 1}, sort: {rank: 1}}).fetch();
  }
});

// Publish all items within the itemIds array
Meteor.publish('itemsById', function(itemIds) {
  return Items.find({}, {_id: {$in: itemIds}});
});

// Generate a random number
var randomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

Meteor.startup(function() {
	// Populate the Items collection with dummy data
	if (Items.find().count() === 0) {
		for(var i = 0; i < 10; i++) {
			var randomRank = randomInt(0, 10);
			Items.insert({title: 'Item #' + i, rank: randomRank});
		}
	}

	// Update a random item's rank every second
	Meteor.setInterval(function() {
		var randomItem = Items.findOne({}, {limit: 1, skip: randomInt(0, 10)});
		Items.update(randomItem._id, {$set: {rank: randomInt(0, 10)}});
	}, 1000);
});