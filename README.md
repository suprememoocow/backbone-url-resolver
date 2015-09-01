# backbone-url-resolver

A ridiculously simple library to resolve URL templates using a Backbone model
as the context.

Fires change events when the URL changes.

```javascript
var backboneUrlResolver = require('backbone-url-resolver');
var Backbone = require('Backbone');

var contextModel = new Backbone.Model();
var urlModel = backboneUrlResolver('/api/rooms/:roomId/users/:userId', contextModel);
// urlModel is a Backbone.Model instance with a single property { url: '' }
// If any of the properties don't resolve, the URL will be null
urlModel.get('url'); // --> null

contextModel.set({ userId: '1', roomId: '2' });
urlModel.get('url'); // /api/rooms/2/users/1

// Uses standard backbone events to signal a new URL
urlModel.on('change:url', function(model, newUrl) {
  console.log('New url is ' + newUrl);
});
```

# Licence

License
The MIT License (MIT)

Copyright (c) 2014, Andrew Newdigate

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
