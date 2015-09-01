var backboneUrlResolver = require('..');
var Backbone = require('Backbone');
var assert = require('assert');

describe('backbone-url-resolver', function() {
  it('should resolve a null url', function() {
    var contextModel = new Backbone.Model();
    var model = backboneUrlResolver('/api/:userId/chats', contextModel);
    assert.strictEqual(model.get('url'), null);
    contextModel.set({ userId: '2' });
    assert.strictEqual(model.get('url'), "/api/2/chats");
  });

  it('should resolve a full url', function() {
    var contextModel = new Backbone.Model({ userId: '1' });
    var model = backboneUrlResolver('/api/:userId/chats', contextModel);
    assert.strictEqual(model.get('url'), '/api/1/chats');
    contextModel.set({ userId: null });
    assert.strictEqual(model.get('url'), null);
  });

  it('should resolve a null url for a multi element model when one of the items is null', function() {
    var contextModel = new Backbone.Model({ userId: '1', roomId: null });
    var model = backboneUrlResolver('/api/rooms/:roomId/users/:userId/chats', contextModel);
    assert.strictEqual(model.get('url'), null);
    contextModel.set({ roomId: '2' });
    assert.strictEqual(model.get('url'), "/api/rooms/2/users/1/chats");
  });

  it('should resolve a full url for a multi element model when one of the items is null', function() {
    var contextModel = new Backbone.Model({ userId: '1', roomId: '2' });
    var model = backboneUrlResolver('/api/rooms/:roomId/users/:userId/chats', contextModel);
    assert.strictEqual(model.get('url'), "/api/rooms/2/users/1/chats");
    contextModel.set({ roomId: null });
    assert.strictEqual(model.get('url'), null);
  });

  it('should fire change events when the context model changes', function() {
    var contextModel = new Backbone.Model({ userId: '1', roomId: '2' });
    var model = backboneUrlResolver('/api/rooms/:roomId/users/:userId/chats', contextModel);
    var count = 0;
    model.on('change:url', function(model, newUrl) {
      count++;
      assert.strictEqual(newUrl, "/api/rooms/2/users/2/chats");
    });

    assert.strictEqual(model.get('url'), "/api/rooms/2/users/1/chats");
    contextModel.set({ userId: '2' });
    assert.strictEqual(model.get('url'), "/api/rooms/2/users/2/chats");
    assert.strictEqual(count, 1);
  });

  it('should not fire change events when the url remains the same', function() {
    var contextModel = new Backbone.Model({ userId: '1', roomId: '2' });
    var model = backboneUrlResolver('/api/rooms/:roomId/users/:userId/chats', contextModel);
    
    model.on('change:url', function(model, newUrl) {
      assert(false, 'Unexpected change event');
    });

    assert.strictEqual(model.get('url'), "/api/rooms/2/users/1/chats");
    contextModel.set({ userId: 1 });
    assert.strictEqual(model.get('url'), "/api/rooms/2/users/1/chats");
    contextModel.set({ userId: '1' });
  });
});
