(() => {
  var he = Object.create;
  var E = Object.defineProperty;
  var we = Object.getOwnPropertyDescriptor;
  var Ee = Object.getOwnPropertyNames;
  var be = Object.getPrototypeOf,
    Se = Object.prototype.hasOwnProperty;
  var f = (t, e) => () => (t && (e = t((t = 0))), e);
  var I = (t, e) => () => (e || t((e = { exports: {} }).exports, e), e.exports),
    Te = (t, e) => {
      for (var n in e) E(t, n, { get: e[n], enumerable: !0 });
    },
    $ = (t, e, n, r) => {
      if ((e && typeof e == 'object') || typeof e == 'function')
        for (let s of Ee(e))
          !Se.call(t, s) &&
            s !== n &&
            E(t, s, { get: () => e[s], enumerable: !(r = we(e, s)) || r.enumerable });
      return t;
    };
  var V = (t, e, n) => (
      (n = t != null ? he(be(t)) : {}),
      $(e || !t || !t.__esModule ? E(n, 'default', { value: t, enumerable: !0 }) : n, t)
    ),
    Ce = (t) => $(E({}, '__esModule', { value: !0 }), t);
  var te = I((a) => {
    'use strict';
    var R = Symbol.for('react.transitional.element'),
      Pe = Symbol.for('react.portal'),
      Ae = Symbol.for('react.fragment'),
      ke = Symbol.for('react.strict_mode'),
      _e = Symbol.for('react.profiler'),
      Oe = Symbol.for('react.consumer'),
      Le = Symbol.for('react.context'),
      Ie = Symbol.for('react.forward_ref'),
      Ne = Symbol.for('react.suspense'),
      Re = Symbol.for('react.memo'),
      Q = Symbol.for('react.lazy'),
      K = Symbol.iterator;
    function Be(t) {
      return t === null || typeof t != 'object'
        ? null
        : ((t = (K && t[K]) || t['@@iterator']), typeof t == 'function' ? t : null);
    }
    var G = {
        isMounted: function () {
          return !1;
        },
        enqueueForceUpdate: function () {},
        enqueueReplaceState: function () {},
        enqueueSetState: function () {},
      },
      z = Object.assign,
      X = {};
    function v(t, e, n) {
      (this.props = t), (this.context = e), (this.refs = X), (this.updater = n || G);
    }
    v.prototype.isReactComponent = {};
    v.prototype.setState = function (t, e) {
      if (typeof t != 'object' && typeof t != 'function' && t != null)
        throw Error(
          'takes an object of state variables to update or a function which returns an object of state variables.'
        );
      this.updater.enqueueSetState(this, t, e, 'setState');
    };
    v.prototype.forceUpdate = function (t) {
      this.updater.enqueueForceUpdate(this, t, 'forceUpdate');
    };
    function Z() {}
    Z.prototype = v.prototype;
    function B(t, e, n) {
      (this.props = t), (this.context = e), (this.refs = X), (this.updater = n || G);
    }
    var M = (B.prototype = new Z());
    M.constructor = B;
    z(M, v.prototype);
    M.isPureReactComponent = !0;
    var F = Array.isArray,
      c = { H: null, A: null, T: null, S: null },
      ee = Object.prototype.hasOwnProperty;
    function x(t, e, n, r, s, o) {
      return (n = o.ref), { $$typeof: R, type: t, key: e, ref: n !== void 0 ? n : null, props: o };
    }
    function Me(t, e) {
      return x(t.type, e, void 0, void 0, void 0, t.props);
    }
    function D(t) {
      return typeof t == 'object' && t !== null && t.$$typeof === R;
    }
    function xe(t) {
      var e = { '=': '=0', ':': '=2' };
      return (
        '$' +
        t.replace(/[=:]/g, function (n) {
          return e[n];
        })
      );
    }
    var Y = /\/+/g;
    function N(t, e) {
      return typeof t == 'object' && t !== null && t.key != null ? xe('' + t.key) : e.toString(36);
    }
    function J() {}
    function De(t) {
      switch (t.status) {
        case 'fulfilled':
          return t.value;
        case 'rejected':
          throw t.reason;
        default:
          switch (
            (typeof t.status == 'string'
              ? t.then(J, J)
              : ((t.status = 'pending'),
                t.then(
                  function (e) {
                    t.status === 'pending' && ((t.status = 'fulfilled'), (t.value = e));
                  },
                  function (e) {
                    t.status === 'pending' && ((t.status = 'rejected'), (t.reason = e));
                  }
                )),
            t.status)
          ) {
            case 'fulfilled':
              return t.value;
            case 'rejected':
              throw t.reason;
          }
      }
      throw t;
    }
    function y(t, e, n, r, s) {
      var o = typeof t;
      (o === 'undefined' || o === 'boolean') && (t = null);
      var i = !1;
      if (t === null) i = !0;
      else
        switch (o) {
          case 'bigint':
          case 'string':
          case 'number':
            i = !0;
            break;
          case 'object':
            switch (t.$$typeof) {
              case R:
              case Pe:
                i = !0;
                break;
              case Q:
                return (i = t._init), y(i(t._payload), e, n, r, s);
            }
        }
      if (i)
        return (
          (s = s(t)),
          (i = r === '' ? '.' + N(t, 0) : r),
          F(s)
            ? ((n = ''),
              i != null && (n = i.replace(Y, '$&/') + '/'),
              y(s, e, n, '', function (p) {
                return p;
              }))
            : s != null &&
              (D(s) &&
                (s = Me(
                  s,
                  n +
                    (s.key == null || (t && t.key === s.key)
                      ? ''
                      : ('' + s.key).replace(Y, '$&/') + '/') +
                    i
                )),
              e.push(s)),
          1
        );
      i = 0;
      var l = r === '' ? '.' : r + ':';
      if (F(t))
        for (var u = 0; u < t.length; u++) (r = t[u]), (o = l + N(r, u)), (i += y(r, e, n, o, s));
      else if (((u = Be(t)), typeof u == 'function'))
        for (t = u.call(t), u = 0; !(r = t.next()).done; )
          (r = r.value), (o = l + N(r, u++)), (i += y(r, e, n, o, s));
      else if (o === 'object') {
        if (typeof t.then == 'function') return y(De(t), e, n, r, s);
        throw (
          ((e = String(t)),
          Error(
            'Objects are not valid as a React child (found: ' +
              (e === '[object Object]'
                ? 'object with keys {' + Object.keys(t).join(', ') + '}'
                : e) +
              '). If you meant to render a collection of children, use an array instead.'
          ))
        );
      }
      return i;
    }
    function b(t, e, n) {
      if (t == null) return t;
      var r = [],
        s = 0;
      return (
        y(t, r, '', '', function (o) {
          return e.call(n, o, s++);
        }),
        r
      );
    }
    function Ue(t) {
      if (t._status === -1) {
        var e = t._result;
        (e = e()),
          e.then(
            function (n) {
              (t._status === 0 || t._status === -1) && ((t._status = 1), (t._result = n));
            },
            function (n) {
              (t._status === 0 || t._status === -1) && ((t._status = 2), (t._result = n));
            }
          ),
          t._status === -1 && ((t._status = 0), (t._result = e));
      }
      if (t._status === 1) return t._result.default;
      throw t._result;
    }
    var q =
      typeof reportError == 'function'
        ? reportError
        : function (t) {
            if (typeof window == 'object' && typeof window.ErrorEvent == 'function') {
              var e = new window.ErrorEvent('error', {
                bubbles: !0,
                cancelable: !0,
                message:
                  typeof t == 'object' && t !== null && typeof t.message == 'string'
                    ? String(t.message)
                    : String(t),
                error: t,
              });
              if (!window.dispatchEvent(e)) return;
            } else if (typeof process == 'object' && typeof process.emit == 'function') {
              process.emit('uncaughtException', t);
              return;
            }
            console.error(t);
          };
    function He() {}
    a.Children = {
      map: b,
      forEach: function (t, e, n) {
        b(
          t,
          function () {
            e.apply(this, arguments);
          },
          n
        );
      },
      count: function (t) {
        var e = 0;
        return (
          b(t, function () {
            e++;
          }),
          e
        );
      },
      toArray: function (t) {
        return (
          b(t, function (e) {
            return e;
          }) || []
        );
      },
      only: function (t) {
        if (!D(t))
          throw Error('React.Children.only expected to receive a single React element child.');
        return t;
      },
    };
    a.Component = v;
    a.Fragment = Ae;
    a.Profiler = _e;
    a.PureComponent = B;
    a.StrictMode = ke;
    a.Suspense = Ne;
    a.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = c;
    a.act = function () {
      throw Error('act(...) is not supported in production builds of React.');
    };
    a.cache = function (t) {
      return function () {
        return t.apply(null, arguments);
      };
    };
    a.cloneElement = function (t, e, n) {
      if (t == null) throw Error('The argument must be a React element, but you passed ' + t + '.');
      var r = z({}, t.props),
        s = t.key,
        o = void 0;
      if (e != null)
        for (i in (e.ref !== void 0 && (o = void 0), e.key !== void 0 && (s = '' + e.key), e))
          !ee.call(e, i) ||
            i === 'key' ||
            i === '__self' ||
            i === '__source' ||
            (i === 'ref' && e.ref === void 0) ||
            (r[i] = e[i]);
      var i = arguments.length - 2;
      if (i === 1) r.children = n;
      else if (1 < i) {
        for (var l = Array(i), u = 0; u < i; u++) l[u] = arguments[u + 2];
        r.children = l;
      }
      return x(t.type, s, void 0, void 0, o, r);
    };
    a.createContext = function (t) {
      return (
        (t = {
          $$typeof: Le,
          _currentValue: t,
          _currentValue2: t,
          _threadCount: 0,
          Provider: null,
          Consumer: null,
        }),
        (t.Provider = t),
        (t.Consumer = { $$typeof: Oe, _context: t }),
        t
      );
    };
    a.createElement = function (t, e, n) {
      var r,
        s = {},
        o = null;
      if (e != null)
        for (r in (e.key !== void 0 && (o = '' + e.key), e))
          ee.call(e, r) && r !== 'key' && r !== '__self' && r !== '__source' && (s[r] = e[r]);
      var i = arguments.length - 2;
      if (i === 1) s.children = n;
      else if (1 < i) {
        for (var l = Array(i), u = 0; u < i; u++) l[u] = arguments[u + 2];
        s.children = l;
      }
      if (t && t.defaultProps)
        for (r in ((i = t.defaultProps), i)) s[r] === void 0 && (s[r] = i[r]);
      return x(t, o, void 0, void 0, null, s);
    };
    a.createRef = function () {
      return { current: null };
    };
    a.forwardRef = function (t) {
      return { $$typeof: Ie, render: t };
    };
    a.isValidElement = D;
    a.lazy = function (t) {
      return { $$typeof: Q, _payload: { _status: -1, _result: t }, _init: Ue };
    };
    a.memo = function (t, e) {
      return { $$typeof: Re, type: t, compare: e === void 0 ? null : e };
    };
    a.startTransition = function (t) {
      var e = c.T,
        n = {};
      c.T = n;
      try {
        var r = t(),
          s = c.S;
        s !== null && s(n, r),
          typeof r == 'object' && r !== null && typeof r.then == 'function' && r.then(He, q);
      } catch (o) {
        q(o);
      } finally {
        c.T = e;
      }
    };
    a.unstable_useCacheRefresh = function () {
      return c.H.useCacheRefresh();
    };
    a.use = function (t) {
      return c.H.use(t);
    };
    a.useActionState = function (t, e, n) {
      return c.H.useActionState(t, e, n);
    };
    a.useCallback = function (t, e) {
      return c.H.useCallback(t, e);
    };
    a.useContext = function (t) {
      return c.H.useContext(t);
    };
    a.useDebugValue = function () {};
    a.useDeferredValue = function (t, e) {
      return c.H.useDeferredValue(t, e);
    };
    a.useEffect = function (t, e) {
      return c.H.useEffect(t, e);
    };
    a.useId = function () {
      return c.H.useId();
    };
    a.useImperativeHandle = function (t, e, n) {
      return c.H.useImperativeHandle(t, e, n);
    };
    a.useInsertionEffect = function (t, e) {
      return c.H.useInsertionEffect(t, e);
    };
    a.useLayoutEffect = function (t, e) {
      return c.H.useLayoutEffect(t, e);
    };
    a.useMemo = function (t, e) {
      return c.H.useMemo(t, e);
    };
    a.useOptimistic = function (t, e) {
      return c.H.useOptimistic(t, e);
    };
    a.useReducer = function (t, e, n) {
      return c.H.useReducer(t, e, n);
    };
    a.useRef = function (t) {
      return c.H.useRef(t);
    };
    a.useState = function (t) {
      return c.H.useState(t);
    };
    a.useSyncExternalStore = function (t, e, n) {
      return c.H.useSyncExternalStore(t, e, n);
    };
    a.useTransition = function () {
      return c.H.useTransition();
    };
    a.version = '19.0.0';
  });
  var re = I((Je, ne) => {
    'use strict';
    ne.exports = te();
  });
  function S(t) {
    return typeof t.arrayBuffer == 'function' ? t.arrayBuffer() : We(t);
  }
  async function We(t) {
    return new Promise((e, n) => {
      let r = new FileReader();
      (r.onload = () => {
        e(r.result);
      }),
        (r.onerror = n),
        r.readAsArrayBuffer(t);
    });
  }
  var U = f(() => {});
  var T,
    se = f(() => {
      U();
      T = class t {
        textEncoder = new TextEncoder();
        textDecoder = new TextDecoder();
        pack({ messageKey: e, payload: n }) {
          return this.isFastPathPayload(n)
            ? JSON.stringify({ messageKey: e, payload: n })
            : n instanceof Blob
              ? new Promise(async (r, s) => {
                  try {
                    let o = await S(n);
                    r(this.packImpl({ messageKey: e, payload: new Uint8Array(o) }, 8));
                  } catch (o) {
                    s(o);
                  }
                })
              : this.packImpl({ messageKey: e, payload: n }, void 0);
        }
        unpack(e) {
          if (typeof e == 'string') return JSON.parse(e);
          let r = new DataView(e, 0, 4).getUint32(0, !1),
            s = e.slice(4, 4 + r),
            o = this.textDecoder.decode(s),
            i = JSON.parse(o),
            u = new DataView(e, 4 + r, 1).getUint8(0),
            p = e.slice(4 + r + 1),
            m = this.deserializePayload(p, u);
          return { messageKey: i, payload: m };
        }
        isFastPathPayload(e) {
          if (e == null) return !0;
          let n = typeof e;
          return n === 'string' || n === 'number' || (n === 'object' && e.constructor === Object);
        }
        payloadToUint8Array(e) {
          if (e instanceof Uint8Array) return e;
          if (typeof e == 'string') return this.textEncoder.encode(e);
          if (typeof e == 'number') {
            let n = new ArrayBuffer(8);
            return new DataView(n).setFloat64(0, e, !1), new Uint8Array(n);
          } else {
            if (e === null) return new Uint8Array(0);
            if (e === void 0) return new Uint8Array(0);
            if (e instanceof ArrayBuffer) return new Uint8Array(e);
            if (e instanceof Blob) throw new Error('Blob is not supported in this callsite.');
            return this.textEncoder.encode(JSON.stringify(e));
          }
        }
        packImpl({ messageKey: e, payload: n }, r) {
          let s = JSON.stringify(e),
            o = this.textEncoder.encode(s),
            i = o.length,
            l = this.payloadToUint8Array(n),
            u = 4 + i + 1 + l.byteLength,
            p = new ArrayBuffer(u),
            m = new Uint8Array(p);
          return (
            new DataView(p, 0, 4).setUint32(0, i, !1),
            m.set(o, 4),
            new DataView(p, 4 + i, 1).setUint8(0, r ?? t.getPayloadTypeIndicator(n)),
            m.set(l, 4 + i + 1),
            m
          );
        }
        deserializePayload(e, n) {
          switch (n) {
            case 1:
              return new Uint8Array(e);
            case 2:
              return this.textDecoder.decode(e);
            case 3:
              return new DataView(e).getFloat64(0, !1);
            case 4:
              return null;
            case 5:
              return;
            case 6: {
              let r = this.textDecoder.decode(e);
              return JSON.parse(r);
            }
            case 7:
              return e;
            case 8:
              return new Blob([e]);
            default:
              throw new Error('Unsupported payload type');
          }
        }
        static getPayloadTypeIndicator(e) {
          if (e instanceof Uint8Array) return 1;
          if (typeof e == 'string') return 2;
          if (typeof e == 'number') return 3;
          if (e === null) return 4;
          if (e === void 0) return 5;
          if (e instanceof ArrayBuffer) return 7;
          if (e instanceof Blob) return 8;
          if (typeof e == 'object') return 6;
          throw new Error('Unsupported payload type');
        }
      };
    });
  var C,
    oe = f(() => {
      C = class {
        constructor(e = null, n = 0) {
          this.ws = e;
          this.refCount = n;
        }
      };
    });
  var P,
    ie = f(() => {
      P = class {
        constructor(e, n) {
          this.url = e;
          (this.retriesInterval = n?.retriesInterval ?? 1500),
            (this.maxRetries = n?.maxRetries ?? 200),
            (this.connectTimeout = n?.connectTimeout ?? 5e3),
            (this.onError =
              n?.onError ??
              ((r) => {
                throw r;
              })),
            (this.onReconnect = n?.onReconnect ?? (() => {})),
            (this.wsBinaryType = n?.binaryType),
            (this.eventListeners = Object.create(null)),
            this.connect();
        }
        retriesInterval;
        maxRetries;
        connectTimeout;
        onError;
        onReconnect;
        ws = null;
        retries = 0;
        connectTimeoutHandle = null;
        isClosed = !1;
        sendQueue = [];
        lastCloseEvent = null;
        eventListeners;
        wsBinaryType;
        close(e, n) {
          if (
            (this.clearConnectTimeoutIfNeeded(),
            this.emitEvent(
              'close',
              this.lastCloseEvent ?? {
                code: e ?? 1e3,
                reason: n ?? 'Explicit closing',
                message: 'Explicit closing',
              }
            ),
            (this.lastCloseEvent = null),
            (this.isClosed = !0),
            (this.eventListeners = Object.create(null)),
            (this.sendQueue = []),
            this.ws != null)
          ) {
            let r = this.ws;
            (this.ws = null), this.wsClose(r);
          }
        }
        addEventListener(e, n) {
          (this.eventListeners[e] || (this.eventListeners[e] = new Set())).add(n);
        }
        removeEventListener(e, n) {
          this.eventListeners[e]?.delete(n);
        }
        connect() {
          this.ws == null &&
            ((this.connectTimeoutHandle = setTimeout(
              this.handleConnectTimeout,
              this.connectTimeout
            )),
            (this.ws = new WebSocket(this.url.toString())),
            this.wsBinaryType != null && (this.ws.binaryType = this.wsBinaryType),
            this.ws.addEventListener('message', this.handleMessage),
            this.ws.addEventListener('open', this.handleOpen),
            this.ws.addEventListener('error', this.handleError),
            this.ws.addEventListener('close', this.handleClose));
        }
        send(e) {
          if (this.isClosed) {
            this.onError(new Error('Unable to send data: WebSocket is closed'));
            return;
          }
          if (this.retries >= this.maxRetries) {
            this.onError(
              new Error(`Unable to send data: Exceeded max retries - retries[${this.retries}]`)
            );
            return;
          }
          let n = this.ws;
          n != null && n.readyState === WebSocket.OPEN ? n.send(e) : this.sendQueue.push(e);
        }
        emitEvent(e, n) {
          let r = this.eventListeners[e];
          if (r) for (let s of r) s(n);
        }
        handleOpen = () => {
          this.clearConnectTimeoutIfNeeded(), (this.lastCloseEvent = null), this.emitEvent('open');
          let e = this.sendQueue;
          this.sendQueue = [];
          for (let n of e) this.send(n);
        };
        handleMessage = (e) => {
          this.emitEvent('message', e);
        };
        handleError = (e) => {
          this.clearConnectTimeoutIfNeeded(),
            this.emitEvent('error', e),
            this.reconnectIfNeeded(`WebSocket error - ${e.message}`);
        };
        handleClose = (e) => {
          this.clearConnectTimeoutIfNeeded(),
            (this.lastCloseEvent = { code: e.code, reason: e.reason, message: e.message }),
            this.reconnectIfNeeded(`WebSocket closed - code[${e.code}] reason[${e.reason}]`);
        };
        handleConnectTimeout = () => {
          this.reconnectIfNeeded('Timeout from connecting to the WebSocket');
        };
        clearConnectTimeoutIfNeeded() {
          this.connectTimeoutHandle != null &&
            (clearTimeout(this.connectTimeoutHandle), (this.connectTimeoutHandle = null));
        }
        reconnectIfNeeded(e) {
          if ((this.ws != null && (this.wsClose(this.ws), (this.ws = null)), !this.isClosed)) {
            if (this.retries >= this.maxRetries) {
              this.onError(new Error('Exceeded max retries')), this.close();
              return;
            }
            setTimeout(() => {
              (this.retries += 1), this.connect(), this.onReconnect(e);
            }, this.retriesInterval);
          }
        }
        wsClose(e) {
          try {
            e.removeEventListener('message', this.handleMessage),
              e.removeEventListener('open', this.handleOpen),
              e.removeEventListener('close', this.handleClose),
              (e.onerror = () => {}),
              e.close();
          } catch {}
        }
        get readyState() {
          if (this.isClosed) return WebSocket.CLOSED;
          let e = this.ws?.readyState;
          return e === WebSocket.CLOSED ? WebSocket.CONNECTING : (e ?? WebSocket.CONNECTING);
        }
        CONNECTING = 0;
        OPEN = 1;
        CLOSING = 2;
        CLOSED = 3;
        get binaryType() {
          return this.ws?.binaryType ?? 'blob';
        }
        get bufferedAmount() {
          return this.ws?.bufferedAmount ?? 0;
        }
        get extensions() {
          return this.ws?.extensions ?? '';
        }
        get protocol() {
          return this.ws?.protocol ?? '';
        }
        ping() {
          return this.ws?.ping();
        }
        dispatchEvent(e) {
          return this.ws?.dispatchEvent(e) ?? !1;
        }
        set onclose(e) {
          throw new Error('Unsupported legacy property, use addEventListener instead');
        }
        set onerror(e) {
          throw new Error('Unsupported legacy property, use addEventListener instead');
        }
        set onmessage(e) {
          throw new Error('Unsupported legacy property, use addEventListener instead');
        }
        set onopen(e) {
          throw new Error('Unsupported legacy property, use addEventListener instead');
        }
      };
    });
  function g(...t) {
    H && console.info(...t);
  }
  function A(...t) {
    H && console.warn(...t);
  }
  function ae(t) {
    H = t;
  }
  var H,
    h = f(() => {
      H = !1;
    });
  var d,
    k = f(() => {
      se();
      oe();
      ie();
      h();
      U();
      d = class t {
        constructor(e, n) {
          this.connectionInfo = e;
          this.options = n;
          (this.wsStore = e.wsStore || t.defaultWSStore), (this.listeners = Object.create(null));
        }
        listeners;
        static defaultWSStore = new C();
        wsStore = t.defaultWSStore;
        isClosed = !1;
        retries = 0;
        messageFramePacker = new T();
        async initAsync() {
          this.wsStore.ws == null && (this.wsStore.ws = await this.connectAsync()),
            (this.wsStore.refCount += 1),
            this.wsStore.ws.addEventListener('message', this.handleMessage);
        }
        async closeAsync() {
          (this.isClosed = !0),
            this.wsStore.ws?.removeEventListener('message', this.handleMessage),
            (this.wsStore.refCount -= 1),
            this.wsStore.refCount < 1 && (this.wsStore.ws?.close(), (this.wsStore.ws = null)),
            (this.listeners = Object.create(null));
        }
        sendMessage(e, n) {
          if (this.wsStore.ws?.readyState === WebSocket.CLOSED) {
            A('Unable to send message in a disconnected state.');
            return;
          }
          let r = { pluginName: this.connectionInfo.pluginName, method: e },
            s = this.messageFramePacker.pack({ messageKey: r, payload: n });
          if (!(s instanceof Promise)) {
            this.wsStore.ws?.send(s);
            return;
          }
          s.then((o) => {
            this.wsStore.ws?.send(o);
          });
        }
        addMessageListener(e, n) {
          return (
            (this.listeners[e] || (this.listeners[e] = new Set())).add(n),
            {
              remove: () => {
                this.listeners[e]?.delete(n);
              },
            }
          );
        }
        addMessageListenerOnce(e, n) {
          let r = (s) => {
            n(s), this.listeners[e]?.delete(r);
          };
          this.addMessageListener(e, r);
        }
        sendHandshakeMessage(e) {
          if (this.wsStore.ws?.readyState === WebSocket.CLOSED) {
            A('Unable to send message in a disconnected state.');
            return;
          }
          this.wsStore.ws?.send(JSON.stringify({ ...e, __isHandshakeMessages: !0 }));
        }
        addHandskakeMessageListener(e) {
          let n = (r) => {
            if (typeof r.data != 'string') return;
            let s = JSON.parse(r.data);
            if (!s.__isHandshakeMessages) return;
            delete s.__isHandshakeMessages;
            let o = s;
            (o.pluginName && o.pluginName !== this.connectionInfo.pluginName) || e(o);
          };
          return (
            this.wsStore.ws?.addEventListener('message', n),
            {
              remove: () => {
                this.wsStore.ws?.removeEventListener('message', n);
              },
            }
          );
        }
        isConnected() {
          return this.wsStore.ws?.readyState === WebSocket.OPEN;
        }
        connectAsync() {
          return new Promise((e, n) => {
            let r = 'expo-dev-plugins/broadcast',
              s = new P(`ws://${this.connectionInfo.devServer}/${r}`, {
                binaryType: this.options?.websocketBinaryType,
                onError: (o) => {
                  o instanceof Error
                    ? console.warn(`Error happened from the WebSocket connection: ${o.message}
${o.stack}`)
                    : console.warn(
                        `Error happened from the WebSocket connection: ${JSON.stringify(o)}`
                      );
                },
              });
            s.addEventListener('open', () => {
              e(s);
            }),
              s.addEventListener('error', (o) => {
                n(o);
              }),
              s.addEventListener('close', (o) => {
                g('WebSocket closed', o.code, o.reason);
              });
          });
        }
        handleMessage = async (e) => {
          let n;
          if (typeof e.data == 'string') n = e.data;
          else if (e.data instanceof ArrayBuffer) n = e.data;
          else if (ArrayBuffer.isView(e.data)) n = e.data.buffer;
          else if (e.data instanceof Blob) n = await S(e.data);
          else {
            A('Unsupported received data type in handleMessageImpl');
            return;
          }
          let { messageKey: r, payload: s, ...o } = this.messageFramePacker.unpack(n);
          if (
            o?.__isHandshakeMessages === !0 ||
            (r.pluginName && r.pluginName !== this.connectionInfo.pluginName)
          )
            return;
          let i = this.listeners[r.method];
          if (i) for (let l of i) l(s);
        };
        getWebSocketBackingStore() {
          return this.wsStore;
        }
      };
    });
  var _,
    ue = f(() => {
      k();
      h();
      _ = class extends d {
        browserClientMap = {};
        async initAsync() {
          await super.initAsync(), this.addHandshakeHandler();
        }
        addHandshakeHandler() {
          this.addHandskakeMessageListener((e) => {
            if (e.method === 'handshake') {
              let { pluginName: n, protocolVersion: r } = e;
              if (r !== this.connectionInfo.protocolVersion) {
                console.warn(
                  `Received an incompatible devtools plugin handshake message - pluginName[${n}]`
                ),
                  this.terminateBrowserClient(n, e.browserClientId);
                return;
              }
              let s = this.browserClientMap[n];
              s != null &&
                s !== e.browserClientId &&
                (g(
                  `Terminate the previous browser client connection - previousBrowserClientId[${s}]`
                ),
                this.terminateBrowserClient(n, s)),
                (this.browserClientMap[n] = e.browserClientId);
            }
          });
        }
        terminateBrowserClient(e, n) {
          this.sendHandshakeMessage({
            protocolVersion: this.connectionInfo.protocolVersion,
            method: 'terminateBrowserClient',
            browserClientId: n,
            pluginName: e,
          });
        }
      };
    });
  var O,
    ce = f(() => {
      k();
      h();
      O = class extends d {
        browserClientId = Date.now().toString();
        async initAsync() {
          await super.initAsync(), this.startHandshake();
        }
        startHandshake() {
          this.addHandskakeMessageListener((e) => {
            e.method === 'terminateBrowserClient' &&
              this.browserClientId === e.browserClientId &&
              (g('Received terminateBrowserClient messages and terminate the current connection'),
              this.closeAsync());
          }),
            this.sendHandshakeMessage({
              protocolVersion: this.connectionInfo.protocolVersion,
              pluginName: this.connectionInfo.pluginName,
              method: 'handshake',
              browserClientId: this.browserClientId,
            });
        }
      };
    });
  function le() {
    let t = new URLSearchParams(window.location.search).get('devServer'),
      e = window.location.origin.replace(/^https?:\/\//, '');
    return { protocolVersion: 1, sender: 'browser', devServer: t || e };
  }
  var fe = f(() => {});
  async function je(t, e) {
    let n;
    return t.sender === 'app' ? (n = new _(t, e)) : (n = new O(t, e)), await n.initAsync(), n;
  }
  async function j(t, e) {
    let n = le(),
      r = L[t];
    if (r != null) {
      if (r instanceof Promise) return r;
      (r.isConnected() === !1 || r.connectionInfo.devServer !== n.devServer) &&
        (await r.closeAsync(), delete L[t], (r = null));
    }
    if (r == null) {
      let s = je({ ...n, pluginName: t }, e);
      (L[t] = s), (r = await s), (L[t] = r);
    }
    return r;
  }
  var L,
    de = f(() => {
      ue();
      ce();
      fe();
      L = {};
    });
  var pe = {};
  Te(pe, {
    DevToolsPluginClient: () => d,
    getDevToolsPluginClientAsync: () => j,
    setEnableLogging: () => ae,
    useDevToolsPluginClient: () => $e,
  });
  function $e(t, e) {
    let [n, r] = (0, w.useState)(null),
      [s, o] = (0, w.useState)(null);
    if (
      ((0, w.useEffect)(() => {
        async function i() {
          try {
            let u = await j(t, e);
            r(u);
          } catch (u) {
            o(new Error('Failed to setup client from useDevToolsPluginClient: ' + u.toString()));
          }
        }
        async function l() {
          try {
            await n?.closeAsync();
          } catch (u) {
            o(new Error('Failed to teardown client from useDevToolsPluginClient: ' + u.toString()));
          }
        }
        return (
          i(),
          () => {
            l();
          }
        );
      }, [t]),
      s != null)
    )
      throw s;
    return n;
  }
  var w,
    ye = f(() => {
      w = V(re());
      k();
      de();
      h();
    });
  var ge = I((mt, ve) => {
    ve.exports = (ye(), Ce(pe));
  });
  var me = V(ge());
  (async function () {
    var t = document.getElementById('root');
    function e(r, s) {
      typeof r == 'object' && (r = JSON.stringify(r, null, 2));
      var o = document.createElement('div');
      (o.className = 'log-item ' + s), (o.textContent = r), t.appendChild(o);
    }
    let n = await (0, me.getDevToolsPluginClientAsync)('vanilla-log-viewer');
    n.addMessageListener('log', (r) => {
      e(r, 'log');
    }),
      n.addMessageListener('warn', (r) => {
        e(r, 'warn');
      }),
      n.addMessageListener('error', (r) => {
        e(r, 'error');
      });
  })();
})();
/*! Bundled license information:

react/cjs/react.production.js:
  (**
   * @license React
   * react.production.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)
*/
