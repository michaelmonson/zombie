var items = [];

exports.add = function(uri, label) {
  items.push({"uri": uri, "label": label});
};

exports.flush = function() {
  items = [];
};

exports.getItems = function() {
  var obj = {};
  for(var i = 0; i < items.length; i++) {
    obj[items[i].uri] = items[i].label;
  }
  return obj;
};