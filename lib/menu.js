"use strict";

var items = [];

module.exports = {
  add: function(uri, label) {
    items.push({'uri': uri, 'label': label});
  },

  flush: function() {
    items = [];
  },

  getItems: function() {
    var obj = {};
    for(var i = 0; i < items.length; i++) {
      obj[items[i].uri] = items[i].label;
    }
    return obj;
  }
};
