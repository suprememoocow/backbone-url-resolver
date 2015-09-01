/* jshint node:true */
'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

function getParams(url) {
  var regExp = /:(\w+)\b/g;
  var match;
  var result = [];
  while ((match = regExp.exec(url)) !== null) {
    if (match[1]) {
      result.push(match[1]);
    }
  }

  return result;
}

function replaceParams(url, model) {
  var hasMissing = false;
  var resolvedUrl = url.replace(/:\w+\b/g, function(match) {
    var value = model.get(match.substr(1));
    if (!value) hasMissing = true;
    return value;
  });

  return hasMissing ? null : resolvedUrl;
}


module.exports = function makeResolver(urlTemplate, model) {
  var params = getParams(urlTemplate);

  var result = new Backbone.Model({ url: replaceParams(urlTemplate, model) });

  function onChange() {
    result.set({ url: replaceParams(urlTemplate, model) });
  }

  if (params.length) {
    result.listenTo(model, params.map(function(f) { return 'change:' + f; }).join(' '), onChange);
  }

  return result;
};
