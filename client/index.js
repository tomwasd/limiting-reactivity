Template.list.onCreated(function() {
	Meteor.call('getItemIds', function(err, res) {
		Session.set('itemIds', res);
	});

  var self = this;
  self.autorun(function() {
    self.subscribe('itemsById', Session.get('itemIds'));
  });
});

Template.list.helpers({
	items: function() {
		return Session.get('itemIds');
	}
});

Template.item.helpers({
	item: function() {
		return Items.findOne(this._id);
	}
});