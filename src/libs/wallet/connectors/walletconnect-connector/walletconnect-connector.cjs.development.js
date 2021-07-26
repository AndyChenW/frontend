/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable no-lone-blocks */


function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

function _interopNamespace(e) {
  if (e && e.__esModule) { return e; } else {
    var n = {};
    if (e) {
      Object.keys(e).forEach(function (k) {
        var d = Object.getOwnPropertyDescriptor(e, k);
        Object.defineProperty(n, k, d.get ? d : {
          enumerable: true,
          get: function () {
            return e[k];
          }
        });
      });
    }
    n['default'] = e;
    return n;
  }
}

var abstractConnector = require('@web3-react/abstract-connector');
var invariant = _interopDefault(require('tiny-invariant'));

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct(Parent, args, Class) {
      var a = [null];
      a.push.apply(a, args);
      var Constructor = Function.bind.apply(Parent, a);
      var instance = new Constructor();
      if (Class) _setPrototypeOf(instance, Class.prototype);
      return instance;
    };
  }

  return _construct.apply(null, arguments);
}

function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}

function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : undefined;

  _wrapNativeSuper = function _wrapNativeSuper(Class) {
    if (Class === null || !_isNativeFunction(Class)) return Class;

    if (typeof Class !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }

    if (typeof _cache !== "undefined") {
      if (_cache.has(Class)) return _cache.get(Class);

      _cache.set(Class, Wrapper);
    }

    function Wrapper() {
      return _construct(Class, arguments, _getPrototypeOf(this).constructor);
    }

    Wrapper.prototype = Object.create(Class.prototype, {
      constructor: {
        value: Wrapper,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    return _setPrototypeOf(Wrapper, Class);
  };

  return _wrapNativeSuper(Class);
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var URI_AVAILABLE = 'URI_AVAILABLE';
var UserRejectedRequestError = /*#__PURE__*/function (_Error) {
  _inheritsLoose(UserRejectedRequestError, _Error);

  function UserRejectedRequestError() {
    var _this;

    _this = _Error.call(this) || this;
    _this.name = _this.constructor.name;
    _this.message = 'The user rejected the request.';
    return _this;
  }

  return UserRejectedRequestError;
}( /*#__PURE__*/_wrapNativeSuper(Error));
var WalletConnectConnector = /*#__PURE__*/function (_AbstractConnector) {
  _inheritsLoose(WalletConnectConnector, _AbstractConnector);

  function WalletConnectConnector(_ref) {
    var _this2;

    var rpc = _ref.rpc,
        bridge = _ref.bridge,
        qrcode = _ref.qrcode,
        pollingInterval = _ref.pollingInterval;
    !(Object.keys(rpc).length === 1) ?  invariant(false, '@walletconnect/web3-provider is broken with >1 chainId, please use 1')  : void 0;
    _this2 = _AbstractConnector.call(this, {
      supportedChainIds: Object.keys(rpc).map(function (k) {
        return Number(k);
      })
    }) || this;
    _this2.rpc = rpc;
    _this2.bridge = bridge;
    _this2.qrcode = qrcode;
    _this2.pollingInterval = pollingInterval;
    _this2.handleChainChanged = _this2.handleChainChanged.bind(_assertThisInitialized(_this2));
    _this2.handleAccountsChanged = _this2.handleAccountsChanged.bind(_assertThisInitialized(_this2));
    _this2.handleDisconnect = _this2.handleDisconnect.bind(_assertThisInitialized(_this2));
    return _this2;
  }

  var _proto = WalletConnectConnector.prototype;

  _proto.handleChainChanged = function handleChainChanged(chainId) {
    {
      console.log("Handling 'chainChanged' event with payload", chainId);
    }

    this.emitUpdate({
      chainId: chainId
    });
  };

  _proto.handleAccountsChanged = function handleAccountsChanged(accounts) {
    {
      console.log("Handling 'accountsChanged' event with payload", accounts);
    }

    this.emitUpdate({
      account: accounts[0]
    });
  };

  _proto.handleDisconnect = function handleDisconnect() {
    {
      console.log("Handling 'disconnect' event");
    }

    this.emitDeactivate(); // we have to do this because of a @walletconnect/web3-provider bug

    if (this.walletConnectProvider) {
      this.walletConnectProvider.stop();
      this.walletConnectProvider.removeListener('chainChanged', this.handleChainChanged);
      this.walletConnectProvider.removeListener('accountsChanged', this.handleAccountsChanged);
      this.walletConnectProvider = undefined;
    }

    this.emitDeactivate();
  };

  _proto.activate = function activate() {
    try {
      var _temp5 = function _temp5() {
        function _temp2() {
          return Promise.resolve(_this4.walletConnectProvider.enable().then(function (accounts) {
            return accounts[0];
          })["catch"](function (error) {
            // TODO ideally this would be a better check
            if (error.message === 'User closed modal') {
              throw new UserRejectedRequestError();
            }

            throw error;
          })).then(function (account) {
            _this4.walletConnectProvider.on('disconnect', _this4.handleDisconnect);

            _this4.walletConnectProvider.on('chainChanged', _this4.handleChainChanged);

            _this4.walletConnectProvider.on('accountsChanged', _this4.handleAccountsChanged);

            return {
              provider: _this4.walletConnectProvider,
              account: account
            };
          });
        }

        var _temp = function () {
          if (!_this4.walletConnectProvider.wc.connected) {
            return Promise.resolve(_this4.walletConnectProvider.wc.createSession({
              chainId: Number(Object.keys(_this4.rpc)[0])
            })).then(function () {
              _this4.emit(URI_AVAILABLE, _this4.walletConnectProvider.wc.uri);
            });
          }
        }();

        // ensure that the uri is going to be available, and emit an event if there's a new uri
        return _temp && _temp.then ? _temp.then(_temp2) : _temp2(_temp);
      };

      var _this4 = this;

      var _temp6 = function () {
        if (!_this4.walletConnectProvider) {
          return Promise.resolve(new Promise(function (resolve) { resolve(_interopNamespace(require('@walletconnect/web3-provider'))); })).then(function (_ref2) {
            var WalletConnectProvider = _ref2["default"];
            _this4.walletConnectProvider = new WalletConnectProvider({
              bridge: _this4.bridge,
              rpc: _this4.rpc,
              qrcode: _this4.qrcode,
              pollingInterval: _this4.pollingInterval
            });
          });
        }
      }();

      return Promise.resolve(_temp6 && _temp6.then ? _temp6.then(_temp5) : _temp5(_temp6));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getProvider = function getProvider() {
    try {
      var _this6 = this;

      return Promise.resolve(_this6.walletConnectProvider);
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getChainId = function getChainId() {
    try {
      var _this8 = this;

      return Promise.resolve(_this8.walletConnectProvider.send('eth_chainId'));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.getAccount = function getAccount() {
    try {
      var _this10 = this;

      return Promise.resolve(_this10.walletConnectProvider.send('eth_accounts').then(function (accounts) {
        return accounts[0];
      }));
    } catch (e) {
      return Promise.reject(e);
    }
  };

  _proto.deactivate = function deactivate() {
    if (this.walletConnectProvider) {
      this.walletConnectProvider.stop();
      this.walletConnectProvider.removeListener('disconnect', this.handleDisconnect);
      this.walletConnectProvider.removeListener('chainChanged', this.handleChainChanged);
      this.walletConnectProvider.removeListener('accountsChanged', this.handleAccountsChanged);
    }
  };

  _proto.close = function close() {
    try {
      var _this12$walletConnect;

      var _this12 = this;

      return Promise.resolve((_this12$walletConnect = _this12.walletConnectProvider) == null ? void 0 : _this12$walletConnect.close()).then(function () {});
    } catch (e) {
      return Promise.reject(e);
    }
  };

  return WalletConnectConnector;
}(abstractConnector.AbstractConnector);

exports.URI_AVAILABLE = URI_AVAILABLE;
exports.UserRejectedRequestError = UserRejectedRequestError;
exports.WalletConnectConnector = WalletConnectConnector;
//# sourceMappingURL=walletconnect-connector.cjs.development.js.map
