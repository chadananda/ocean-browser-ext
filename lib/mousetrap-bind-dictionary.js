(function(Mousetrap) {
  var _oldBind = Mousetrap.prototype.bind;
  var args;

  Mousetrap.prototype.bind = function() {
      var self = this;
      args = arguments;

      // normal call
      if (typeof args[0] == 'string' || args[0] instanceof Array) {
          return _oldBind.call(self, args[0], args[1], args[2]);
      }

      // object passed in
      for (var key in args[0]) {
          if (args[0].hasOwnProperty(key)) {
              _oldBind.call(self, key, args[0][key], args[1]);
          }
      }
  };

  Mousetrap.init();
}) (Mousetrap);