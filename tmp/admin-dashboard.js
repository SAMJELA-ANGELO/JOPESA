"use strict";
"use client";
(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    try {
      return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
    } catch (e) {
      throw mod = 0, e;
    }
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/react/cjs/react.development.js
  var require_react_development = __commonJS({
    "node_modules/react/cjs/react.development.js"(exports, module) {
      "use strict";
      (function() {
        function defineDeprecationWarning(methodName, info) {
          Object.defineProperty(Component.prototype, methodName, {
            get: function() {
              console.warn(
                "%s(...) is deprecated in plain JavaScript React classes. %s",
                info[0],
                info[1]
              );
            }
          });
        }
        function getIteratorFn(maybeIterable) {
          if (null === maybeIterable || "object" !== typeof maybeIterable)
            return null;
          maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
          return "function" === typeof maybeIterable ? maybeIterable : null;
        }
        function warnNoop(publicInstance, callerName) {
          publicInstance = (publicInstance = publicInstance.constructor) && (publicInstance.displayName || publicInstance.name) || "ReactClass";
          var warningKey = publicInstance + "." + callerName;
          didWarnStateUpdateForUnmountedComponent[warningKey] || (console.error(
            "Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.",
            callerName,
            publicInstance
          ), didWarnStateUpdateForUnmountedComponent[warningKey] = true);
        }
        function Component(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function ComponentDummy() {
        }
        function PureComponent(props, context, updater) {
          this.props = props;
          this.context = context;
          this.refs = emptyObject;
          this.updater = updater || ReactNoopUpdateQueue;
        }
        function noop() {
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE) return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, props, owner, debugStack, debugTask) {
          var refProp = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function cloneAndReplaceKey(oldElement, newKey) {
          newKey = ReactElement(
            oldElement.type,
            newKey,
            oldElement.props,
            oldElement._owner,
            oldElement._debugStack,
            oldElement._debugTask
          );
          oldElement._store && (newKey._store.validated = oldElement._store.validated);
          return newKey;
        }
        function validateChildKeys(node) {
          isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        function escape(key) {
          var escaperLookup = { "=": "=0", ":": "=2" };
          return "$" + key.replace(/[=:]/g, function(match) {
            return escaperLookup[match];
          });
        }
        function getElementKey(element, index) {
          return "object" === typeof element && null !== element && null != element.key ? (checkKeyStringCoercion(element.key), escape("" + element.key)) : index.toString(36);
        }
        function resolveThenable(thenable) {
          switch (thenable.status) {
            case "fulfilled":
              return thenable.value;
            case "rejected":
              throw thenable.reason;
            default:
              switch ("string" === typeof thenable.status ? thenable.then(noop, noop) : (thenable.status = "pending", thenable.then(
                function(fulfilledValue) {
                  "pending" === thenable.status && (thenable.status = "fulfilled", thenable.value = fulfilledValue);
                },
                function(error) {
                  "pending" === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              )), thenable.status) {
                case "fulfilled":
                  return thenable.value;
                case "rejected":
                  throw thenable.reason;
              }
          }
          throw thenable;
        }
        function mapIntoArray(children, array, escapedPrefix, nameSoFar, callback) {
          var type = typeof children;
          if ("undefined" === type || "boolean" === type) children = null;
          var invokeCallback = false;
          if (null === children) invokeCallback = true;
          else
            switch (type) {
              case "bigint":
              case "string":
              case "number":
                invokeCallback = true;
                break;
              case "object":
                switch (children.$$typeof) {
                  case REACT_ELEMENT_TYPE:
                  case REACT_PORTAL_TYPE:
                    invokeCallback = true;
                    break;
                  case REACT_LAZY_TYPE:
                    return invokeCallback = children._init, mapIntoArray(
                      invokeCallback(children._payload),
                      array,
                      escapedPrefix,
                      nameSoFar,
                      callback
                    );
                }
            }
          if (invokeCallback) {
            invokeCallback = children;
            callback = callback(invokeCallback);
            var childKey = "" === nameSoFar ? "." + getElementKey(invokeCallback, 0) : nameSoFar;
            isArrayImpl(callback) ? (escapedPrefix = "", null != childKey && (escapedPrefix = childKey.replace(userProvidedKeyEscapeRegex, "$&/") + "/"), mapIntoArray(callback, array, escapedPrefix, "", function(c) {
              return c;
            })) : null != callback && (isValidElement(callback) && (null != callback.key && (invokeCallback && invokeCallback.key === callback.key || checkKeyStringCoercion(callback.key)), escapedPrefix = cloneAndReplaceKey(
              callback,
              escapedPrefix + (null == callback.key || invokeCallback && invokeCallback.key === callback.key ? "" : ("" + callback.key).replace(
                userProvidedKeyEscapeRegex,
                "$&/"
              ) + "/") + childKey
            ), "" !== nameSoFar && null != invokeCallback && isValidElement(invokeCallback) && null == invokeCallback.key && invokeCallback._store && !invokeCallback._store.validated && (escapedPrefix._store.validated = 2), callback = escapedPrefix), array.push(callback));
            return 1;
          }
          invokeCallback = 0;
          childKey = "" === nameSoFar ? "." : nameSoFar + ":";
          if (isArrayImpl(children))
            for (var i = 0; i < children.length; i++)
              nameSoFar = children[i], type = childKey + getElementKey(nameSoFar, i), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if (i = getIteratorFn(children), "function" === typeof i)
            for (i === children.entries && (didWarnAboutMaps || console.warn(
              "Using Maps as children is not supported. Use an array of keyed ReactElements instead."
            ), didWarnAboutMaps = true), children = i.call(children), i = 0; !(nameSoFar = children.next()).done; )
              nameSoFar = nameSoFar.value, type = childKey + getElementKey(nameSoFar, i++), invokeCallback += mapIntoArray(
                nameSoFar,
                array,
                escapedPrefix,
                type,
                callback
              );
          else if ("object" === type) {
            if ("function" === typeof children.then)
              return mapIntoArray(
                resolveThenable(children),
                array,
                escapedPrefix,
                nameSoFar,
                callback
              );
            array = String(children);
            throw Error(
              "Objects are not valid as a React child (found: " + ("[object Object]" === array ? "object with keys {" + Object.keys(children).join(", ") + "}" : array) + "). If you meant to render a collection of children, use an array instead."
            );
          }
          return invokeCallback;
        }
        function mapChildren(children, func, context) {
          if (null == children) return children;
          var result = [], count = 0;
          mapIntoArray(children, result, "", "", function(child) {
            return func.call(context, child, count++);
          });
          return result;
        }
        function lazyInitializer(payload) {
          if (-1 === payload._status) {
            var ioInfo = payload._ioInfo;
            null != ioInfo && (ioInfo.start = ioInfo.end = performance.now());
            ioInfo = payload._result;
            var thenable = ioInfo();
            thenable.then(
              function(moduleObject) {
                if (0 === payload._status || -1 === payload._status) {
                  payload._status = 1;
                  payload._result = moduleObject;
                  var _ioInfo = payload._ioInfo;
                  null != _ioInfo && (_ioInfo.end = performance.now());
                  void 0 === thenable.status && (thenable.status = "fulfilled", thenable.value = moduleObject);
                }
              },
              function(error) {
                if (0 === payload._status || -1 === payload._status) {
                  payload._status = 2;
                  payload._result = error;
                  var _ioInfo2 = payload._ioInfo;
                  null != _ioInfo2 && (_ioInfo2.end = performance.now());
                  void 0 === thenable.status && (thenable.status = "rejected", thenable.reason = error);
                }
              }
            );
            ioInfo = payload._ioInfo;
            if (null != ioInfo) {
              ioInfo.value = thenable;
              var displayName = thenable.displayName;
              "string" === typeof displayName && (ioInfo.name = displayName);
            }
            -1 === payload._status && (payload._status = 0, payload._result = thenable);
          }
          if (1 === payload._status)
            return ioInfo = payload._result, void 0 === ioInfo && console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))\n\nDid you accidentally put curly braces around the import?",
              ioInfo
            ), "default" in ioInfo || console.error(
              "lazy: Expected the result of a dynamic import() call. Instead received: %s\n\nYour code should look like: \n  const MyComponent = lazy(() => import('./MyComponent'))",
              ioInfo
            ), ioInfo.default;
          throw payload._result;
        }
        function resolveDispatcher() {
          var dispatcher = ReactSharedInternals.H;
          null === dispatcher && console.error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://react.dev/link/invalid-hook-call for tips about how to debug and fix this problem."
          );
          return dispatcher;
        }
        function releaseAsyncTransition() {
          ReactSharedInternals.asyncTransitions--;
        }
        function enqueueTask(task) {
          if (null === enqueueTaskImpl)
            try {
              var requireString = ("require" + Math.random()).slice(0, 7);
              enqueueTaskImpl = (module && module[requireString]).call(
                module,
                "timers"
              ).setImmediate;
            } catch (_err) {
              enqueueTaskImpl = function(callback) {
                false === didWarnAboutMessageChannel && (didWarnAboutMessageChannel = true, "undefined" === typeof MessageChannel && console.error(
                  "This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."
                ));
                var channel = new MessageChannel();
                channel.port1.onmessage = callback;
                channel.port2.postMessage(void 0);
              };
            }
          return enqueueTaskImpl(task);
        }
        function aggregateErrors(errors) {
          return 1 < errors.length && "function" === typeof AggregateError ? new AggregateError(errors) : errors[0];
        }
        function popActScope(prevActQueue, prevActScopeDepth) {
          prevActScopeDepth !== actScopeDepth - 1 && console.error(
            "You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "
          );
          actScopeDepth = prevActScopeDepth;
        }
        function recursivelyFlushAsyncActWork(returnValue, resolve, reject) {
          var queue = ReactSharedInternals.actQueue;
          if (null !== queue)
            if (0 !== queue.length)
              try {
                flushActQueue(queue);
                enqueueTask(function() {
                  return recursivelyFlushAsyncActWork(returnValue, resolve, reject);
                });
                return;
              } catch (error) {
                ReactSharedInternals.thrownErrors.push(error);
              }
            else ReactSharedInternals.actQueue = null;
          0 < ReactSharedInternals.thrownErrors.length ? (queue = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, reject(queue)) : resolve(returnValue);
        }
        function flushActQueue(queue) {
          if (!isFlushing) {
            isFlushing = true;
            var i = 0;
            try {
              for (; i < queue.length; i++) {
                var callback = queue[i];
                do {
                  ReactSharedInternals.didUsePromise = false;
                  var continuation = callback(false);
                  if (null !== continuation) {
                    if (ReactSharedInternals.didUsePromise) {
                      queue[i] = callback;
                      queue.splice(0, i);
                      return;
                    }
                    callback = continuation;
                  } else break;
                } while (1);
              }
              queue.length = 0;
            } catch (error) {
              queue.splice(0, i + 1), ReactSharedInternals.thrownErrors.push(error);
            } finally {
              isFlushing = false;
            }
          }
        }
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(Error());
        var REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator, didWarnStateUpdateForUnmountedComponent = {}, ReactNoopUpdateQueue = {
          isMounted: function() {
            return false;
          },
          enqueueForceUpdate: function(publicInstance) {
            warnNoop(publicInstance, "forceUpdate");
          },
          enqueueReplaceState: function(publicInstance) {
            warnNoop(publicInstance, "replaceState");
          },
          enqueueSetState: function(publicInstance) {
            warnNoop(publicInstance, "setState");
          }
        }, assign = Object.assign, emptyObject = {};
        Object.freeze(emptyObject);
        Component.prototype.isReactComponent = {};
        Component.prototype.setState = function(partialState, callback) {
          if ("object" !== typeof partialState && "function" !== typeof partialState && null != partialState)
            throw Error(
              "takes an object of state variables to update or a function which returns an object of state variables."
            );
          this.updater.enqueueSetState(this, partialState, callback, "setState");
        };
        Component.prototype.forceUpdate = function(callback) {
          this.updater.enqueueForceUpdate(this, callback, "forceUpdate");
        };
        var deprecatedAPIs = {
          isMounted: [
            "isMounted",
            "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."
          ],
          replaceState: [
            "replaceState",
            "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."
          ]
        };
        for (fnName in deprecatedAPIs)
          deprecatedAPIs.hasOwnProperty(fnName) && defineDeprecationWarning(fnName, deprecatedAPIs[fnName]);
        ComponentDummy.prototype = Component.prototype;
        deprecatedAPIs = PureComponent.prototype = new ComponentDummy();
        deprecatedAPIs.constructor = PureComponent;
        assign(deprecatedAPIs, Component.prototype);
        deprecatedAPIs.isPureReactComponent = true;
        var isArrayImpl = Array.isArray, REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = {
          H: null,
          A: null,
          T: null,
          S: null,
          actQueue: null,
          asyncTransitions: 0,
          isBatchingLegacy: false,
          didScheduleLegacyUpdate: false,
          didUsePromise: false,
          thrownErrors: [],
          getCurrentStack: null,
          recentlyCreatedOwnerStacks: 0
        }, hasOwnProperty = Object.prototype.hasOwnProperty, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        deprecatedAPIs = {
          react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown, didWarnAboutOldJSXRuntime;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = deprecatedAPIs.react_stack_bottom_frame.bind(
          deprecatedAPIs,
          UnknownOwner
        )();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutMaps = false, userProvidedKeyEscapeRegex = /\/+/g, reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
          if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
            var event = new window.ErrorEvent("error", {
              bubbles: true,
              cancelable: true,
              message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
              error
            });
            if (!window.dispatchEvent(event)) return;
          } else if ("object" === typeof process && "function" === typeof process.emit) {
            process.emit("uncaughtException", error);
            return;
          }
          console.error(error);
        }, didWarnAboutMessageChannel = false, enqueueTaskImpl = null, actScopeDepth = 0, didWarnNoAwaitAct = false, isFlushing = false, queueSeveralMicrotasks = "function" === typeof queueMicrotask ? function(callback) {
          queueMicrotask(function() {
            return queueMicrotask(callback);
          });
        } : enqueueTask;
        deprecatedAPIs = Object.freeze({
          __proto__: null,
          c: function(size) {
            return resolveDispatcher().useMemoCache(size);
          }
        });
        var fnName = {
          map: mapChildren,
          forEach: function(children, forEachFunc, forEachContext) {
            mapChildren(
              children,
              function() {
                forEachFunc.apply(this, arguments);
              },
              forEachContext
            );
          },
          count: function(children) {
            var n = 0;
            mapChildren(children, function() {
              n++;
            });
            return n;
          },
          toArray: function(children) {
            return mapChildren(children, function(child) {
              return child;
            }) || [];
          },
          only: function(children) {
            if (!isValidElement(children))
              throw Error(
                "React.Children.only expected to receive a single React element child."
              );
            return children;
          }
        };
        exports.Activity = REACT_ACTIVITY_TYPE;
        exports.Children = fnName;
        exports.Component = Component;
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.Profiler = REACT_PROFILER_TYPE;
        exports.PureComponent = PureComponent;
        exports.StrictMode = REACT_STRICT_MODE_TYPE;
        exports.Suspense = REACT_SUSPENSE_TYPE;
        exports.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE = ReactSharedInternals;
        exports.__COMPILER_RUNTIME = deprecatedAPIs;
        exports.act = function(callback) {
          var prevActQueue = ReactSharedInternals.actQueue, prevActScopeDepth = actScopeDepth;
          actScopeDepth++;
          var queue = ReactSharedInternals.actQueue = null !== prevActQueue ? prevActQueue : [], didAwaitActCall = false;
          try {
            var result = callback();
          } catch (error) {
            ReactSharedInternals.thrownErrors.push(error);
          }
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw popActScope(prevActQueue, prevActScopeDepth), callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          if (null !== result && "object" === typeof result && "function" === typeof result.then) {
            var thenable = result;
            queueSeveralMicrotasks(function() {
              didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
                "You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"
              ));
            });
            return {
              then: function(resolve, reject) {
                didAwaitActCall = true;
                thenable.then(
                  function(returnValue) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    if (0 === prevActScopeDepth) {
                      try {
                        flushActQueue(queue), enqueueTask(function() {
                          return recursivelyFlushAsyncActWork(
                            returnValue,
                            resolve,
                            reject
                          );
                        });
                      } catch (error$0) {
                        ReactSharedInternals.thrownErrors.push(error$0);
                      }
                      if (0 < ReactSharedInternals.thrownErrors.length) {
                        var _thrownError = aggregateErrors(
                          ReactSharedInternals.thrownErrors
                        );
                        ReactSharedInternals.thrownErrors.length = 0;
                        reject(_thrownError);
                      }
                    } else resolve(returnValue);
                  },
                  function(error) {
                    popActScope(prevActQueue, prevActScopeDepth);
                    0 < ReactSharedInternals.thrownErrors.length ? (error = aggregateErrors(
                      ReactSharedInternals.thrownErrors
                    ), ReactSharedInternals.thrownErrors.length = 0, reject(error)) : reject(error);
                  }
                );
              }
            };
          }
          var returnValue$jscomp$0 = result;
          popActScope(prevActQueue, prevActScopeDepth);
          0 === prevActScopeDepth && (flushActQueue(queue), 0 !== queue.length && queueSeveralMicrotasks(function() {
            didAwaitActCall || didWarnNoAwaitAct || (didWarnNoAwaitAct = true, console.error(
              "A component suspended inside an `act` scope, but the `act` call was not awaited. When testing React components that depend on asynchronous data, you must await the result:\n\nawait act(() => ...)"
            ));
          }), ReactSharedInternals.actQueue = null);
          if (0 < ReactSharedInternals.thrownErrors.length)
            throw callback = aggregateErrors(ReactSharedInternals.thrownErrors), ReactSharedInternals.thrownErrors.length = 0, callback;
          return {
            then: function(resolve, reject) {
              didAwaitActCall = true;
              0 === prevActScopeDepth ? (ReactSharedInternals.actQueue = queue, enqueueTask(function() {
                return recursivelyFlushAsyncActWork(
                  returnValue$jscomp$0,
                  resolve,
                  reject
                );
              })) : resolve(returnValue$jscomp$0);
            }
          };
        };
        exports.cache = function(fn) {
          return function() {
            return fn.apply(null, arguments);
          };
        };
        exports.cacheSignal = function() {
          return null;
        };
        exports.captureOwnerStack = function() {
          var getCurrentStack = ReactSharedInternals.getCurrentStack;
          return null === getCurrentStack ? null : getCurrentStack();
        };
        exports.cloneElement = function(element, config, children) {
          if (null === element || void 0 === element)
            throw Error(
              "The argument must be a React element, but you passed " + element + "."
            );
          var props = assign({}, element.props), key = element.key, owner = element._owner;
          if (null != config) {
            var JSCompiler_inline_result;
            a: {
              if (hasOwnProperty.call(config, "ref") && (JSCompiler_inline_result = Object.getOwnPropertyDescriptor(
                config,
                "ref"
              ).get) && JSCompiler_inline_result.isReactWarning) {
                JSCompiler_inline_result = false;
                break a;
              }
              JSCompiler_inline_result = void 0 !== config.ref;
            }
            JSCompiler_inline_result && (owner = getOwner());
            hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key);
            for (propName in config)
              !hasOwnProperty.call(config, propName) || "key" === propName || "__self" === propName || "__source" === propName || "ref" === propName && void 0 === config.ref || (props[propName] = config[propName]);
          }
          var propName = arguments.length - 2;
          if (1 === propName) props.children = children;
          else if (1 < propName) {
            JSCompiler_inline_result = Array(propName);
            for (var i = 0; i < propName; i++)
              JSCompiler_inline_result[i] = arguments[i + 2];
            props.children = JSCompiler_inline_result;
          }
          props = ReactElement(
            element.type,
            key,
            props,
            owner,
            element._debugStack,
            element._debugTask
          );
          for (key = 2; key < arguments.length; key++)
            validateChildKeys(arguments[key]);
          return props;
        };
        exports.createContext = function(defaultValue) {
          defaultValue = {
            $$typeof: REACT_CONTEXT_TYPE,
            _currentValue: defaultValue,
            _currentValue2: defaultValue,
            _threadCount: 0,
            Provider: null,
            Consumer: null
          };
          defaultValue.Provider = defaultValue;
          defaultValue.Consumer = {
            $$typeof: REACT_CONSUMER_TYPE,
            _context: defaultValue
          };
          defaultValue._currentRenderer = null;
          defaultValue._currentRenderer2 = null;
          return defaultValue;
        };
        exports.createElement = function(type, config, children) {
          for (var i = 2; i < arguments.length; i++)
            validateChildKeys(arguments[i]);
          i = {};
          var key = null;
          if (null != config)
            for (propName in didWarnAboutOldJSXRuntime || !("__self" in config) || "key" in config || (didWarnAboutOldJSXRuntime = true, console.warn(
              "Your app (or one of its dependencies) is using an outdated JSX transform. Update to the modern JSX transform for faster performance: https://react.dev/link/new-jsx-transform"
            )), hasValidKey(config) && (checkKeyStringCoercion(config.key), key = "" + config.key), config)
              hasOwnProperty.call(config, propName) && "key" !== propName && "__self" !== propName && "__source" !== propName && (i[propName] = config[propName]);
          var childrenLength = arguments.length - 2;
          if (1 === childrenLength) i.children = children;
          else if (1 < childrenLength) {
            for (var childArray = Array(childrenLength), _i = 0; _i < childrenLength; _i++)
              childArray[_i] = arguments[_i + 2];
            Object.freeze && Object.freeze(childArray);
            i.children = childArray;
          }
          if (type && type.defaultProps)
            for (propName in childrenLength = type.defaultProps, childrenLength)
              void 0 === i[propName] && (i[propName] = childrenLength[propName]);
          key && defineKeyPropWarningGetter(
            i,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          var propName = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return ReactElement(
            type,
            key,
            i,
            getOwner(),
            propName ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            propName ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.createRef = function() {
          var refObject = { current: null };
          Object.seal(refObject);
          return refObject;
        };
        exports.forwardRef = function(render) {
          null != render && render.$$typeof === REACT_MEMO_TYPE ? console.error(
            "forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...))."
          ) : "function" !== typeof render ? console.error(
            "forwardRef requires a render function but was given %s.",
            null === render ? "null" : typeof render
          ) : 0 !== render.length && 2 !== render.length && console.error(
            "forwardRef render functions accept exactly two parameters: props and ref. %s",
            1 === render.length ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."
          );
          null != render && null != render.defaultProps && console.error(
            "forwardRef render functions do not support defaultProps. Did you accidentally pass a React component?"
          );
          var elementType = { $$typeof: REACT_FORWARD_REF_TYPE, render }, ownName;
          Object.defineProperty(elementType, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              render.name || render.displayName || (Object.defineProperty(render, "name", { value: name }), render.displayName = name);
            }
          });
          return elementType;
        };
        exports.isValidElement = isValidElement;
        exports.lazy = function(ctor) {
          ctor = { _status: -1, _result: ctor };
          var lazyType = {
            $$typeof: REACT_LAZY_TYPE,
            _payload: ctor,
            _init: lazyInitializer
          }, ioInfo = {
            name: "lazy",
            start: -1,
            end: -1,
            value: null,
            owner: null,
            debugStack: Error("react-stack-top-frame"),
            debugTask: console.createTask ? console.createTask("lazy()") : null
          };
          ctor._ioInfo = ioInfo;
          lazyType._debugInfo = [{ awaited: ioInfo }];
          return lazyType;
        };
        exports.memo = function(type, compare) {
          null == type && console.error(
            "memo: The first argument must be a component. Instead received: %s",
            null === type ? "null" : typeof type
          );
          compare = {
            $$typeof: REACT_MEMO_TYPE,
            type,
            compare: void 0 === compare ? null : compare
          };
          var ownName;
          Object.defineProperty(compare, "displayName", {
            enumerable: false,
            configurable: true,
            get: function() {
              return ownName;
            },
            set: function(name) {
              ownName = name;
              type.name || type.displayName || (Object.defineProperty(type, "name", { value: name }), type.displayName = name);
            }
          });
          return compare;
        };
        exports.startTransition = function(scope) {
          var prevTransition = ReactSharedInternals.T, currentTransition = {};
          currentTransition._updatedFibers = /* @__PURE__ */ new Set();
          ReactSharedInternals.T = currentTransition;
          try {
            var returnValue = scope(), onStartTransitionFinish = ReactSharedInternals.S;
            null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
            "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && (ReactSharedInternals.asyncTransitions++, returnValue.then(releaseAsyncTransition, releaseAsyncTransition), returnValue.then(noop, reportGlobalError));
          } catch (error) {
            reportGlobalError(error);
          } finally {
            null === prevTransition && currentTransition._updatedFibers && (scope = currentTransition._updatedFibers.size, currentTransition._updatedFibers.clear(), 10 < scope && console.warn(
              "Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."
            )), null !== prevTransition && null !== currentTransition.types && (null !== prevTransition.types && prevTransition.types !== currentTransition.types && console.error(
              "We expected inner Transitions to have transferred the outer types set and that you cannot add to the outer Transition while inside the inner.This is a bug in React."
            ), prevTransition.types = currentTransition.types), ReactSharedInternals.T = prevTransition;
          }
        };
        exports.unstable_useCacheRefresh = function() {
          return resolveDispatcher().useCacheRefresh();
        };
        exports.use = function(usable) {
          return resolveDispatcher().use(usable);
        };
        exports.useActionState = function(action, initialState, permalink) {
          return resolveDispatcher().useActionState(
            action,
            initialState,
            permalink
          );
        };
        exports.useCallback = function(callback, deps) {
          return resolveDispatcher().useCallback(callback, deps);
        };
        exports.useContext = function(Context) {
          var dispatcher = resolveDispatcher();
          Context.$$typeof === REACT_CONSUMER_TYPE && console.error(
            "Calling useContext(Context.Consumer) is not supported and will cause bugs. Did you mean to call useContext(Context) instead?"
          );
          return dispatcher.useContext(Context);
        };
        exports.useDebugValue = function(value, formatterFn) {
          return resolveDispatcher().useDebugValue(value, formatterFn);
        };
        exports.useDeferredValue = function(value, initialValue) {
          return resolveDispatcher().useDeferredValue(value, initialValue);
        };
        exports.useEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useEffect(create, deps);
        };
        exports.useEffectEvent = function(callback) {
          return resolveDispatcher().useEffectEvent(callback);
        };
        exports.useId = function() {
          return resolveDispatcher().useId();
        };
        exports.useImperativeHandle = function(ref, create, deps) {
          return resolveDispatcher().useImperativeHandle(ref, create, deps);
        };
        exports.useInsertionEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useInsertionEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useInsertionEffect(create, deps);
        };
        exports.useLayoutEffect = function(create, deps) {
          null == create && console.warn(
            "React Hook useLayoutEffect requires an effect callback. Did you forget to pass a callback to the hook?"
          );
          return resolveDispatcher().useLayoutEffect(create, deps);
        };
        exports.useMemo = function(create, deps) {
          return resolveDispatcher().useMemo(create, deps);
        };
        exports.useOptimistic = function(passthrough, reducer) {
          return resolveDispatcher().useOptimistic(passthrough, reducer);
        };
        exports.useReducer = function(reducer, initialArg, init) {
          return resolveDispatcher().useReducer(reducer, initialArg, init);
        };
        exports.useRef = function(initialValue) {
          return resolveDispatcher().useRef(initialValue);
        };
        exports.useState = function(initialState) {
          return resolveDispatcher().useState(initialState);
        };
        exports.useSyncExternalStore = function(subscribe, getSnapshot, getServerSnapshot) {
          return resolveDispatcher().useSyncExternalStore(
            subscribe,
            getSnapshot,
            getServerSnapshot
          );
        };
        exports.useTransition = function() {
          return resolveDispatcher().useTransition();
        };
        exports.version = "19.2.4";
        "undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ && "function" === typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(Error());
      })();
    }
  });

  // node_modules/react/index.js
  var require_react = __commonJS({
    "node_modules/react/index.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_development();
      }
    }
  });

  // node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs
  var require_interop_require_wildcard = __commonJS({
    "node_modules/@swc/helpers/cjs/_interop_require_wildcard.cjs"(exports) {
      "use strict";
      function _getRequireWildcardCache(nodeInterop) {
        if (typeof WeakMap !== "function") return null;
        var cacheBabelInterop = /* @__PURE__ */ new WeakMap();
        var cacheNodeInterop = /* @__PURE__ */ new WeakMap();
        return (_getRequireWildcardCache = function(nodeInterop2) {
          return nodeInterop2 ? cacheNodeInterop : cacheBabelInterop;
        })(nodeInterop);
      }
      function _interop_require_wildcard(obj, nodeInterop) {
        if (!nodeInterop && obj && obj.__esModule) return obj;
        if (obj === null || typeof obj !== "object" && typeof obj !== "function") return { default: obj };
        var cache = _getRequireWildcardCache(nodeInterop);
        if (cache && cache.has(obj)) return cache.get(obj);
        var newObj = { __proto__: null };
        var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
        for (var key in obj) {
          if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
            var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
            if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
            else newObj[key] = obj[key];
          }
        }
        newObj.default = obj;
        if (cache) cache.set(obj, newObj);
        return newObj;
      }
      exports._ = _interop_require_wildcard;
    }
  });

  // node_modules/@swc/helpers/cjs/_interop_require_default.cjs
  var require_interop_require_default = __commonJS({
    "node_modules/@swc/helpers/cjs/_interop_require_default.cjs"(exports) {
      "use strict";
      function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : { default: obj };
      }
      exports._ = _interop_require_default;
    }
  });

  // node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js
  var require_app_router_context_shared_runtime = __commonJS({
    "node_modules/next/dist/shared/lib/app-router-context.shared-runtime.js"(exports) {
      "use client";
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        AppRouterContext: function() {
          return AppRouterContext;
        },
        GlobalLayoutRouterContext: function() {
          return GlobalLayoutRouterContext;
        },
        LayoutRouterContext: function() {
          return LayoutRouterContext;
        },
        MissingSlotContext: function() {
          return MissingSlotContext;
        },
        TemplateContext: function() {
          return TemplateContext;
        }
      });
      var _interop_require_default = require_interop_require_default();
      var _react = /* @__PURE__ */ _interop_require_default._(require_react());
      var AppRouterContext = _react.default.createContext(null);
      var LayoutRouterContext = _react.default.createContext(null);
      var GlobalLayoutRouterContext = _react.default.createContext(null);
      var TemplateContext = _react.default.createContext(null);
      if (true) {
        AppRouterContext.displayName = "AppRouterContext";
        LayoutRouterContext.displayName = "LayoutRouterContext";
        GlobalLayoutRouterContext.displayName = "GlobalLayoutRouterContext";
        TemplateContext.displayName = "TemplateContext";
      }
      var MissingSlotContext = _react.default.createContext(/* @__PURE__ */ new Set());
    }
  });

  // node_modules/next/dist/client/components/readonly-url-search-params.js
  var require_readonly_url_search_params = __commonJS({
    "node_modules/next/dist/client/components/readonly-url-search-params.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "ReadonlyURLSearchParams", {
        enumerable: true,
        get: function() {
          return ReadonlyURLSearchParams;
        }
      });
      var ReadonlyURLSearchParamsError = class extends Error {
        constructor() {
          super("Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams");
        }
      };
      var ReadonlyURLSearchParams = class extends URLSearchParams {
        /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
        append() {
          throw new ReadonlyURLSearchParamsError();
        }
        /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
        delete() {
          throw new ReadonlyURLSearchParamsError();
        }
        /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
        set() {
          throw new ReadonlyURLSearchParamsError();
        }
        /** @deprecated Method unavailable on `ReadonlyURLSearchParams`. Read more: https://nextjs.org/docs/app/api-reference/functions/use-search-params#updating-searchparams */
        sort() {
          throw new ReadonlyURLSearchParamsError();
        }
      };
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js
  var require_hooks_client_context_shared_runtime = __commonJS({
    "node_modules/next/dist/shared/lib/hooks-client-context.shared-runtime.js"(exports) {
      "use client";
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        NavigationPromisesContext: function() {
          return NavigationPromisesContext;
        },
        PathParamsContext: function() {
          return PathParamsContext;
        },
        PathnameContext: function() {
          return PathnameContext;
        },
        ReadonlyURLSearchParams: function() {
          return _readonlyurlsearchparams.ReadonlyURLSearchParams;
        },
        SearchParamsContext: function() {
          return SearchParamsContext;
        },
        createDevToolsInstrumentedPromise: function() {
          return createDevToolsInstrumentedPromise;
        }
      });
      var _react = require_react();
      var _readonlyurlsearchparams = require_readonly_url_search_params();
      var SearchParamsContext = (0, _react.createContext)(null);
      var PathnameContext = (0, _react.createContext)(null);
      var PathParamsContext = (0, _react.createContext)(null);
      var NavigationPromisesContext = (0, _react.createContext)(null);
      function createDevToolsInstrumentedPromise(displayName, value) {
        const promise = Promise.resolve(value);
        promise.status = "fulfilled";
        promise.value = value;
        promise.displayName = `${displayName} (SSR)`;
        return promise;
      }
      if (true) {
        SearchParamsContext.displayName = "SearchParamsContext";
        PathnameContext.displayName = "PathnameContext";
        PathParamsContext.displayName = "PathParamsContext";
        NavigationPromisesContext.displayName = "NavigationPromisesContext";
      }
    }
  });

  // node_modules/next/dist/shared/lib/segment.js
  var require_segment = __commonJS({
    "node_modules/next/dist/shared/lib/segment.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        DEFAULT_SEGMENT_KEY: function() {
          return DEFAULT_SEGMENT_KEY;
        },
        NOT_FOUND_SEGMENT_KEY: function() {
          return NOT_FOUND_SEGMENT_KEY;
        },
        PAGE_SEGMENT_KEY: function() {
          return PAGE_SEGMENT_KEY;
        },
        addSearchParamsIfPageSegment: function() {
          return addSearchParamsIfPageSegment;
        },
        computeSelectedLayoutSegment: function() {
          return computeSelectedLayoutSegment;
        },
        getSegmentValue: function() {
          return getSegmentValue;
        },
        getSelectedLayoutSegmentPath: function() {
          return getSelectedLayoutSegmentPath;
        },
        isGroupSegment: function() {
          return isGroupSegment;
        },
        isParallelRouteSegment: function() {
          return isParallelRouteSegment;
        }
      });
      function getSegmentValue(segment) {
        return Array.isArray(segment) ? segment[1] : segment;
      }
      function isGroupSegment(segment) {
        return segment[0] === "(" && segment.endsWith(")");
      }
      function isParallelRouteSegment(segment) {
        return segment.startsWith("@") && segment !== "@children";
      }
      function addSearchParamsIfPageSegment(segment, searchParams) {
        const isPageSegment = segment.includes(PAGE_SEGMENT_KEY);
        if (isPageSegment) {
          const stringifiedQuery = JSON.stringify(searchParams);
          return stringifiedQuery !== "{}" ? PAGE_SEGMENT_KEY + "?" + stringifiedQuery : PAGE_SEGMENT_KEY;
        }
        return segment;
      }
      function computeSelectedLayoutSegment(segments, parallelRouteKey) {
        if (!segments || segments.length === 0) {
          return null;
        }
        const rawSegment = parallelRouteKey === "children" ? segments[0] : segments[segments.length - 1];
        return rawSegment === DEFAULT_SEGMENT_KEY ? null : rawSegment;
      }
      function getSelectedLayoutSegmentPath(tree, parallelRouteKey, first = true, segmentPath = []) {
        let node;
        if (first) {
          node = tree[1][parallelRouteKey];
        } else {
          const parallelRoutes = tree[1];
          node = parallelRoutes.children ?? Object.values(parallelRoutes)[0];
        }
        if (!node) return segmentPath;
        const segment = node[0];
        let segmentValue = getSegmentValue(segment);
        if (!segmentValue || segmentValue.startsWith(PAGE_SEGMENT_KEY)) {
          return segmentPath;
        }
        segmentPath.push(segmentValue);
        return getSelectedLayoutSegmentPath(node, parallelRouteKey, false, segmentPath);
      }
      var PAGE_SEGMENT_KEY = "__PAGE__";
      var DEFAULT_SEGMENT_KEY = "__DEFAULT__";
      var NOT_FOUND_SEGMENT_KEY = "/_not-found";
    }
  });

  // node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js
  var require_server_inserted_html_shared_runtime = __commonJS({
    "node_modules/next/dist/shared/lib/server-inserted-html.shared-runtime.js"(exports) {
      "use client";
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        ServerInsertedHTMLContext: function() {
          return ServerInsertedHTMLContext;
        },
        useServerInsertedHTML: function() {
          return useServerInsertedHTML;
        }
      });
      var _interop_require_wildcard = require_interop_require_wildcard();
      var _react = /* @__PURE__ */ _interop_require_wildcard._(require_react());
      var ServerInsertedHTMLContext = /* @__PURE__ */ _react.default.createContext(null);
      function useServerInsertedHTML(callback) {
        const addInsertedServerHTMLCallback = (0, _react.useContext)(ServerInsertedHTMLContext);
        if (addInsertedServerHTMLCallback) {
          addInsertedServerHTMLCallback(callback);
        }
      }
    }
  });

  // node_modules/next/dist/client/components/unrecognized-action-error.js
  var require_unrecognized_action_error = __commonJS({
    "node_modules/next/dist/client/components/unrecognized-action-error.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        UnrecognizedActionError: function() {
          return UnrecognizedActionError;
        },
        unstable_isUnrecognizedActionError: function() {
          return unstable_isUnrecognizedActionError;
        }
      });
      var UnrecognizedActionError = class extends Error {
        constructor(...args) {
          super(...args);
          this.name = "UnrecognizedActionError";
        }
      };
      function unstable_isUnrecognizedActionError(error) {
        return !!(error && typeof error === "object" && error instanceof UnrecognizedActionError);
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/client/components/redirect-status-code.js
  var require_redirect_status_code = __commonJS({
    "node_modules/next/dist/client/components/redirect-status-code.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "RedirectStatusCode", {
        enumerable: true,
        get: function() {
          return RedirectStatusCode;
        }
      });
      var RedirectStatusCode = /* @__PURE__ */ (function(RedirectStatusCode2) {
        RedirectStatusCode2[RedirectStatusCode2["SeeOther"] = 303] = "SeeOther";
        RedirectStatusCode2[RedirectStatusCode2["TemporaryRedirect"] = 307] = "TemporaryRedirect";
        RedirectStatusCode2[RedirectStatusCode2["PermanentRedirect"] = 308] = "PermanentRedirect";
        return RedirectStatusCode2;
      })({});
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/client/components/redirect-error.js
  var require_redirect_error = __commonJS({
    "node_modules/next/dist/client/components/redirect-error.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        REDIRECT_ERROR_CODE: function() {
          return REDIRECT_ERROR_CODE;
        },
        isRedirectError: function() {
          return isRedirectError;
        }
      });
      var _redirectstatuscode = require_redirect_status_code();
      var REDIRECT_ERROR_CODE = "NEXT_REDIRECT";
      function isRedirectError(error) {
        if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") {
          return false;
        }
        const digest = error.digest.split(";");
        const [errorCode, type] = digest;
        const destination = digest.slice(2, -2).join(";");
        const status = digest.at(-2);
        const statusCode = Number(status);
        return errorCode === REDIRECT_ERROR_CODE && (type === "replace" || type === "push") && typeof destination === "string" && !isNaN(statusCode) && statusCode in _redirectstatuscode.RedirectStatusCode;
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/server/app-render/async-local-storage.js
  var require_async_local_storage = __commonJS({
    "node_modules/next/dist/server/app-render/async-local-storage.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        bindSnapshot: function() {
          return bindSnapshot;
        },
        createAsyncLocalStorage: function() {
          return createAsyncLocalStorage;
        },
        createSnapshot: function() {
          return createSnapshot;
        }
      });
      var sharedAsyncLocalStorageNotAvailableError = Object.defineProperty(new Error("Invariant: AsyncLocalStorage accessed in runtime where it is not available"), "__NEXT_ERROR_CODE", {
        value: "E504",
        enumerable: false,
        configurable: true
      });
      var FakeAsyncLocalStorage = class {
        disable() {
          throw sharedAsyncLocalStorageNotAvailableError;
        }
        getStore() {
          return void 0;
        }
        run() {
          throw sharedAsyncLocalStorageNotAvailableError;
        }
        exit() {
          throw sharedAsyncLocalStorageNotAvailableError;
        }
        enterWith() {
          throw sharedAsyncLocalStorageNotAvailableError;
        }
        static bind(fn) {
          return fn;
        }
      };
      var maybeGlobalAsyncLocalStorage = typeof globalThis !== "undefined" && globalThis.AsyncLocalStorage;
      function createAsyncLocalStorage() {
        if (maybeGlobalAsyncLocalStorage) {
          return new maybeGlobalAsyncLocalStorage();
        }
        return new FakeAsyncLocalStorage();
      }
      function bindSnapshot(fn) {
        if (maybeGlobalAsyncLocalStorage) {
          return maybeGlobalAsyncLocalStorage.bind(fn);
        }
        return FakeAsyncLocalStorage.bind(fn);
      }
      function createSnapshot() {
        if (maybeGlobalAsyncLocalStorage) {
          return maybeGlobalAsyncLocalStorage.snapshot();
        }
        return function(fn, ...args) {
          return fn(...args);
        };
      }
    }
  });

  // node_modules/next/dist/server/app-render/action-async-storage-instance.js
  var require_action_async_storage_instance = __commonJS({
    "node_modules/next/dist/server/app-render/action-async-storage-instance.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "actionAsyncStorageInstance", {
        enumerable: true,
        get: function() {
          return actionAsyncStorageInstance;
        }
      });
      var _asynclocalstorage = require_async_local_storage();
      var actionAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();
    }
  });

  // node_modules/next/dist/server/app-render/action-async-storage.external.js
  var require_action_async_storage_external = __commonJS({
    "node_modules/next/dist/server/app-render/action-async-storage.external.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "actionAsyncStorage", {
        enumerable: true,
        get: function() {
          return _actionasyncstorageinstance.actionAsyncStorageInstance;
        }
      });
      var _actionasyncstorageinstance = require_action_async_storage_instance();
    }
  });

  // node_modules/next/dist/client/components/redirect.js
  var require_redirect = __commonJS({
    "node_modules/next/dist/client/components/redirect.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        getRedirectError: function() {
          return getRedirectError;
        },
        getRedirectStatusCodeFromError: function() {
          return getRedirectStatusCodeFromError;
        },
        getRedirectTypeFromError: function() {
          return getRedirectTypeFromError;
        },
        getURLFromRedirectError: function() {
          return getURLFromRedirectError;
        },
        permanentRedirect: function() {
          return permanentRedirect;
        },
        redirect: function() {
          return redirect;
        }
      });
      var _redirectstatuscode = require_redirect_status_code();
      var _redirecterror = require_redirect_error();
      var actionAsyncStorage = typeof window === "undefined" ? require_action_async_storage_external().actionAsyncStorage : void 0;
      function getRedirectError(url, type, statusCode = _redirectstatuscode.RedirectStatusCode.TemporaryRedirect) {
        const error = Object.defineProperty(new Error(_redirecterror.REDIRECT_ERROR_CODE), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: false,
          configurable: true
        });
        error.digest = `${_redirecterror.REDIRECT_ERROR_CODE};${type};${url};${statusCode};`;
        return error;
      }
      function redirect(url, type) {
        type ??= actionAsyncStorage?.getStore()?.isAction ? "push" : "replace";
        throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.TemporaryRedirect);
      }
      function permanentRedirect(url, type = "replace") {
        throw getRedirectError(url, type, _redirectstatuscode.RedirectStatusCode.PermanentRedirect);
      }
      function getURLFromRedirectError(error) {
        if (!(0, _redirecterror.isRedirectError)(error)) return null;
        return error.digest.split(";").slice(2, -2).join(";");
      }
      function getRedirectTypeFromError(error) {
        if (!(0, _redirecterror.isRedirectError)(error)) {
          throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
          });
        }
        return error.digest.split(";", 2)[1];
      }
      function getRedirectStatusCodeFromError(error) {
        if (!(0, _redirecterror.isRedirectError)(error)) {
          throw Object.defineProperty(new Error("Not a redirect error"), "__NEXT_ERROR_CODE", {
            value: "E260",
            enumerable: false,
            configurable: true
          });
        }
        return Number(error.digest.split(";").at(-2));
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js
  var require_http_access_fallback = __commonJS({
    "node_modules/next/dist/client/components/http-access-fallback/http-access-fallback.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        HTTPAccessErrorStatus: function() {
          return HTTPAccessErrorStatus;
        },
        HTTP_ERROR_FALLBACK_ERROR_CODE: function() {
          return HTTP_ERROR_FALLBACK_ERROR_CODE;
        },
        getAccessFallbackErrorTypeByStatus: function() {
          return getAccessFallbackErrorTypeByStatus;
        },
        getAccessFallbackHTTPStatus: function() {
          return getAccessFallbackHTTPStatus;
        },
        isHTTPAccessFallbackError: function() {
          return isHTTPAccessFallbackError;
        }
      });
      var HTTPAccessErrorStatus = {
        NOT_FOUND: 404,
        FORBIDDEN: 403,
        UNAUTHORIZED: 401
      };
      var ALLOWED_CODES = new Set(Object.values(HTTPAccessErrorStatus));
      var HTTP_ERROR_FALLBACK_ERROR_CODE = "NEXT_HTTP_ERROR_FALLBACK";
      function isHTTPAccessFallbackError(error) {
        if (typeof error !== "object" || error === null || !("digest" in error) || typeof error.digest !== "string") {
          return false;
        }
        const [prefix, httpStatus] = error.digest.split(";");
        return prefix === HTTP_ERROR_FALLBACK_ERROR_CODE && ALLOWED_CODES.has(Number(httpStatus));
      }
      function getAccessFallbackHTTPStatus(error) {
        const httpStatus = error.digest.split(";")[1];
        return Number(httpStatus);
      }
      function getAccessFallbackErrorTypeByStatus(status) {
        switch (status) {
          case 401:
            return "unauthorized";
          case 403:
            return "forbidden";
          case 404:
            return "not-found";
          default:
            return;
        }
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/client/components/not-found.js
  var require_not_found = __commonJS({
    "node_modules/next/dist/client/components/not-found.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "notFound", {
        enumerable: true,
        get: function() {
          return notFound;
        }
      });
      var _httpaccessfallback = require_http_access_fallback();
      var DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};404`;
      function notFound() {
        const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
          value: "E1041",
          enumerable: false,
          configurable: true
        });
        error.digest = DIGEST;
        throw error;
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/client/components/forbidden.js
  var require_forbidden = __commonJS({
    "node_modules/next/dist/client/components/forbidden.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "forbidden", {
        enumerable: true,
        get: function() {
          return forbidden;
        }
      });
      var _httpaccessfallback = require_http_access_fallback();
      var DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};403`;
      function forbidden() {
        if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS) {
          throw Object.defineProperty(new Error(`\`forbidden()\` is experimental and only allowed to be enabled when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E488",
            enumerable: false,
            configurable: true
          });
        }
        const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
          value: "E1019",
          enumerable: false,
          configurable: true
        });
        error.digest = DIGEST;
        throw error;
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/client/components/unauthorized.js
  var require_unauthorized = __commonJS({
    "node_modules/next/dist/client/components/unauthorized.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "unauthorized", {
        enumerable: true,
        get: function() {
          return unauthorized;
        }
      });
      var _httpaccessfallback = require_http_access_fallback();
      var DIGEST = `${_httpaccessfallback.HTTP_ERROR_FALLBACK_ERROR_CODE};401`;
      function unauthorized() {
        if (!process.env.__NEXT_EXPERIMENTAL_AUTH_INTERRUPTS) {
          throw Object.defineProperty(new Error(`\`unauthorized()\` is experimental and only allowed to be used when \`experimental.authInterrupts\` is enabled.`), "__NEXT_ERROR_CODE", {
            value: "E411",
            enumerable: false,
            configurable: true
          });
        }
        const error = Object.defineProperty(new Error(DIGEST), "__NEXT_ERROR_CODE", {
          value: "E1002",
          enumerable: false,
          configurable: true
        });
        error.digest = DIGEST;
        throw error;
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/shared/lib/invariant-error.js
  var require_invariant_error = __commonJS({
    "node_modules/next/dist/shared/lib/invariant-error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "InvariantError", {
        enumerable: true,
        get: function() {
          return InvariantError;
        }
      });
      var InvariantError = class extends Error {
        constructor(message, options) {
          super(`Invariant: ${message.endsWith(".") ? message : message + "."} This is a bug in Next.js.`, options);
          this.name = "InvariantError";
        }
      };
    }
  });

  // node_modules/next/dist/shared/lib/promise-with-resolvers.js
  var require_promise_with_resolvers = __commonJS({
    "node_modules/next/dist/shared/lib/promise-with-resolvers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "createPromiseWithResolvers", {
        enumerable: true,
        get: function() {
          return createPromiseWithResolvers;
        }
      });
      function createPromiseWithResolvers() {
        let resolve;
        let reject;
        const promise = new Promise((res, rej) => {
          resolve = res;
          reject = rej;
        });
        return {
          resolve,
          reject,
          promise
        };
      }
    }
  });

  // node_modules/next/dist/server/app-render/staged-rendering.js
  var require_staged_rendering = __commonJS({
    "node_modules/next/dist/server/app-render/staged-rendering.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        RenderStage: function() {
          return RenderStage;
        },
        StagedRenderingController: function() {
          return StagedRenderingController;
        }
      });
      var _invarianterror = require_invariant_error();
      var _promisewithresolvers = require_promise_with_resolvers();
      var RenderStage = /* @__PURE__ */ (function(RenderStage2) {
        RenderStage2[RenderStage2["Before"] = 1] = "Before";
        RenderStage2[RenderStage2["EarlyStatic"] = 2] = "EarlyStatic";
        RenderStage2[RenderStage2["Static"] = 3] = "Static";
        RenderStage2[RenderStage2["EarlyRuntime"] = 4] = "EarlyRuntime";
        RenderStage2[RenderStage2["Runtime"] = 5] = "Runtime";
        RenderStage2[RenderStage2["Dynamic"] = 6] = "Dynamic";
        RenderStage2[RenderStage2["Abandoned"] = 7] = "Abandoned";
        return RenderStage2;
      })({});
      var StagedRenderingController = class {
        constructor(abortSignal, abandonController, shouldTrackSyncIO) {
          this.abortSignal = abortSignal;
          this.abandonController = abandonController;
          this.shouldTrackSyncIO = shouldTrackSyncIO;
          this.currentStage = 1;
          this.syncInterruptReason = null;
          this.staticStageEndTime = Infinity;
          this.runtimeStageEndTime = Infinity;
          this.staticStageListeners = [];
          this.earlyRuntimeStageListeners = [];
          this.runtimeStageListeners = [];
          this.dynamicStageListeners = [];
          this.staticStagePromise = (0, _promisewithresolvers.createPromiseWithResolvers)();
          this.earlyRuntimeStagePromise = (0, _promisewithresolvers.createPromiseWithResolvers)();
          this.runtimeStagePromise = (0, _promisewithresolvers.createPromiseWithResolvers)();
          this.dynamicStagePromise = (0, _promisewithresolvers.createPromiseWithResolvers)();
          if (abortSignal) {
            abortSignal.addEventListener("abort", () => {
              const { reason } = abortSignal;
              this.staticStagePromise.promise.catch(ignoreReject);
              this.staticStagePromise.reject(reason);
              this.earlyRuntimeStagePromise.promise.catch(ignoreReject);
              this.earlyRuntimeStagePromise.reject(reason);
              this.runtimeStagePromise.promise.catch(ignoreReject);
              this.runtimeStagePromise.reject(reason);
              this.dynamicStagePromise.promise.catch(ignoreReject);
              this.dynamicStagePromise.reject(reason);
            }, {
              once: true
            });
          }
          if (abandonController) {
            abandonController.signal.addEventListener("abort", () => {
              this.abandonRender();
            }, {
              once: true
            });
          }
        }
        onStage(stage, callback) {
          if (this.currentStage >= stage) {
            callback();
          } else if (stage === 3) {
            this.staticStageListeners.push(callback);
          } else if (stage === 4) {
            this.earlyRuntimeStageListeners.push(callback);
          } else if (stage === 5) {
            this.runtimeStageListeners.push(callback);
          } else if (stage === 6) {
            this.dynamicStageListeners.push(callback);
          } else {
            throw Object.defineProperty(new _invarianterror.InvariantError(`Invalid render stage: ${stage}`), "__NEXT_ERROR_CODE", {
              value: "E881",
              enumerable: false,
              configurable: true
            });
          }
        }
        shouldTrackSyncInterrupt() {
          if (!this.shouldTrackSyncIO) {
            return false;
          }
          switch (this.currentStage) {
            case 1:
              return false;
            case 2:
            case 3:
              return true;
            case 4:
              return true;
            case 5:
              return false;
            case 6:
            case 7:
              return false;
            default:
              return false;
          }
        }
        syncInterruptCurrentStageWithReason(reason) {
          if (this.currentStage === 1) {
            return;
          }
          if (this.currentStage === 7) {
            return;
          }
          if (this.abandonController) {
            this.abandonController.abort();
            return;
          }
          if (this.abortSignal) {
            this.syncInterruptReason = reason;
            this.currentStage = 7;
            return;
          }
          switch (this.currentStage) {
            case 2:
            case 3:
            case 4: {
              this.syncInterruptReason = reason;
              this.advanceStage(6);
              return;
            }
            case 5: {
              return;
            }
            case 6:
            default:
          }
        }
        getSyncInterruptReason() {
          return this.syncInterruptReason;
        }
        getStaticStageEndTime() {
          return this.staticStageEndTime;
        }
        getRuntimeStageEndTime() {
          return this.runtimeStageEndTime;
        }
        abandonRender() {
          const { currentStage } = this;
          switch (currentStage) {
            case 2: {
              this.resolveStaticStage();
            }
            // intentional fallthrough
            case 3: {
              this.resolveEarlyRuntimeStage();
            }
            // intentional fallthrough
            case 4: {
              this.resolveRuntimeStage();
            }
            // intentional fallthrough
            case 5: {
              this.currentStage = 7;
              return;
            }
            case 6:
            case 1:
            case 7:
              break;
            default: {
              currentStage;
            }
          }
        }
        advanceStage(stage) {
          if (stage <= this.currentStage) {
            return;
          }
          let currentStage = this.currentStage;
          this.currentStage = stage;
          if (currentStage < 3 && stage >= 3) {
            this.resolveStaticStage();
          }
          if (currentStage < 4 && stage >= 4) {
            this.resolveEarlyRuntimeStage();
          }
          if (currentStage < 5 && stage >= 5) {
            this.staticStageEndTime = performance.now() + performance.timeOrigin;
            this.resolveRuntimeStage();
          }
          if (currentStage < 6 && stage >= 6) {
            this.runtimeStageEndTime = performance.now() + performance.timeOrigin;
            this.resolveDynamicStage();
            return;
          }
        }
        /** Fire the `onStage` listeners for the static stage and unblock any promises waiting for it. */
        resolveStaticStage() {
          const staticListeners = this.staticStageListeners;
          for (let i = 0; i < staticListeners.length; i++) {
            staticListeners[i]();
          }
          staticListeners.length = 0;
          this.staticStagePromise.resolve();
        }
        /** Fire the `onStage` listeners for the early runtime stage and unblock any promises waiting for it. */
        resolveEarlyRuntimeStage() {
          const earlyRuntimeListeners = this.earlyRuntimeStageListeners;
          for (let i = 0; i < earlyRuntimeListeners.length; i++) {
            earlyRuntimeListeners[i]();
          }
          earlyRuntimeListeners.length = 0;
          this.earlyRuntimeStagePromise.resolve();
        }
        /** Fire the `onStage` listeners for the runtime stage and unblock any promises waiting for it. */
        resolveRuntimeStage() {
          const runtimeListeners = this.runtimeStageListeners;
          for (let i = 0; i < runtimeListeners.length; i++) {
            runtimeListeners[i]();
          }
          runtimeListeners.length = 0;
          this.runtimeStagePromise.resolve();
        }
        /** Fire the `onStage` listeners for the dynamic stage and unblock any promises waiting for it. */
        resolveDynamicStage() {
          const dynamicListeners = this.dynamicStageListeners;
          for (let i = 0; i < dynamicListeners.length; i++) {
            dynamicListeners[i]();
          }
          dynamicListeners.length = 0;
          this.dynamicStagePromise.resolve();
        }
        getStagePromise(stage) {
          switch (stage) {
            case 3: {
              return this.staticStagePromise.promise;
            }
            case 4: {
              return this.earlyRuntimeStagePromise.promise;
            }
            case 5: {
              return this.runtimeStagePromise.promise;
            }
            case 6: {
              return this.dynamicStagePromise.promise;
            }
            default: {
              stage;
              throw Object.defineProperty(new _invarianterror.InvariantError(`Invalid render stage: ${stage}`), "__NEXT_ERROR_CODE", {
                value: "E881",
                enumerable: false,
                configurable: true
              });
            }
          }
        }
        waitForStage(stage) {
          return this.getStagePromise(stage);
        }
        delayUntilStage(stage, displayName, resolvedValue) {
          const ioTriggerPromise = this.getStagePromise(stage);
          const promise = makeDevtoolsIOPromiseFromIOTrigger(ioTriggerPromise, displayName, resolvedValue);
          if (this.abortSignal) {
            promise.catch(ignoreReject);
          }
          return promise;
        }
      };
      function ignoreReject() {
      }
      function makeDevtoolsIOPromiseFromIOTrigger(ioTrigger, displayName, resolvedValue) {
        const promise = new Promise((resolve, reject) => {
          ioTrigger.then(resolve.bind(null, resolvedValue), reject);
        });
        if (displayName !== void 0) {
          promise.displayName = displayName;
        }
        return promise;
      }
    }
  });

  // node_modules/next/dist/server/dynamic-rendering-utils.js
  var require_dynamic_rendering_utils = __commonJS({
    "node_modules/next/dist/server/dynamic-rendering-utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        delayUntilRuntimeStage: function() {
          return delayUntilRuntimeStage;
        },
        getRuntimeStage: function() {
          return getRuntimeStage;
        },
        isHangingPromiseRejectionError: function() {
          return isHangingPromiseRejectionError;
        },
        makeDevtoolsIOAwarePromise: function() {
          return makeDevtoolsIOAwarePromise;
        },
        makeHangingPromise: function() {
          return makeHangingPromise;
        }
      });
      var _stagedrendering = require_staged_rendering();
      function isHangingPromiseRejectionError(err) {
        if (typeof err !== "object" || err === null || !("digest" in err)) {
          return false;
        }
        return err.digest === HANGING_PROMISE_REJECTION;
      }
      var HANGING_PROMISE_REJECTION = "HANGING_PROMISE_REJECTION";
      var HangingPromiseRejectionError = class extends Error {
        constructor(route, expression) {
          super(`During prerendering, ${expression} rejects when the prerender is complete. Typically these errors are handled by React but if you move ${expression} to a different context by using \`setTimeout\`, \`after\`, or similar functions you may observe this error and you should handle it in that context. This occurred at route "${route}".`), this.route = route, this.expression = expression, this.digest = HANGING_PROMISE_REJECTION;
        }
      };
      var abortListenersBySignal = /* @__PURE__ */ new WeakMap();
      function makeHangingPromise(signal, route, expression) {
        if (signal.aborted) {
          return Promise.reject(new HangingPromiseRejectionError(route, expression));
        } else {
          const hangingPromise = new Promise((_, reject) => {
            const boundRejection = reject.bind(null, new HangingPromiseRejectionError(route, expression));
            let currentListeners = abortListenersBySignal.get(signal);
            if (currentListeners) {
              currentListeners.push(boundRejection);
            } else {
              const listeners = [
                boundRejection
              ];
              abortListenersBySignal.set(signal, listeners);
              signal.addEventListener("abort", () => {
                for (let i = 0; i < listeners.length; i++) {
                  listeners[i]();
                }
              }, {
                once: true
              });
            }
          });
          hangingPromise.catch(ignoreReject);
          return hangingPromise;
        }
      }
      function ignoreReject() {
      }
      function makeDevtoolsIOAwarePromise(underlying, requestStore, stage) {
        if (requestStore.stagedRendering) {
          return requestStore.stagedRendering.delayUntilStage(stage, void 0, underlying);
        }
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(underlying);
          }, 0);
        });
      }
      function getRuntimeStage(stagedRendering) {
        if (stagedRendering.currentStage === _stagedrendering.RenderStage.EarlyStatic || stagedRendering.currentStage === _stagedrendering.RenderStage.EarlyRuntime) {
          return _stagedrendering.RenderStage.EarlyRuntime;
        }
        return _stagedrendering.RenderStage.Runtime;
      }
      function delayUntilRuntimeStage(prerenderStore, result) {
        const { stagedRendering } = prerenderStore;
        if (!stagedRendering) {
          return result;
        }
        return stagedRendering.waitForStage(getRuntimeStage(stagedRendering)).then(() => result);
      }
    }
  });

  // node_modules/next/dist/server/lib/router-utils/is-postpone.js
  var require_is_postpone = __commonJS({
    "node_modules/next/dist/server/lib/router-utils/is-postpone.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "isPostpone", {
        enumerable: true,
        get: function() {
          return isPostpone;
        }
      });
      var REACT_POSTPONE_TYPE = /* @__PURE__ */ Symbol.for("react.postpone");
      function isPostpone(error) {
        return typeof error === "object" && error !== null && error.$$typeof === REACT_POSTPONE_TYPE;
      }
    }
  });

  // node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js
  var require_bailout_to_csr = __commonJS({
    "node_modules/next/dist/shared/lib/lazy-dynamic/bailout-to-csr.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        BailoutToCSRError: function() {
          return BailoutToCSRError;
        },
        isBailoutToCSRError: function() {
          return isBailoutToCSRError;
        }
      });
      var BAILOUT_TO_CSR = "BAILOUT_TO_CLIENT_SIDE_RENDERING";
      var BailoutToCSRError = class extends Error {
        constructor(reason) {
          super(`Bail out to client-side rendering: ${reason}`), this.reason = reason, this.digest = BAILOUT_TO_CSR;
        }
      };
      function isBailoutToCSRError(err) {
        if (typeof err !== "object" || err === null || !("digest" in err)) {
          return false;
        }
        return err.digest === BAILOUT_TO_CSR;
      }
    }
  });

  // node_modules/next/dist/client/components/is-next-router-error.js
  var require_is_next_router_error = __commonJS({
    "node_modules/next/dist/client/components/is-next-router-error.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "isNextRouterError", {
        enumerable: true,
        get: function() {
          return isNextRouterError;
        }
      });
      var _httpaccessfallback = require_http_access_fallback();
      var _redirecterror = require_redirect_error();
      function isNextRouterError(error) {
        return (0, _redirecterror.isRedirectError)(error) || (0, _httpaccessfallback.isHTTPAccessFallbackError)(error);
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/client/components/hooks-server-context.js
  var require_hooks_server_context = __commonJS({
    "node_modules/next/dist/client/components/hooks-server-context.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        DynamicServerError: function() {
          return DynamicServerError;
        },
        isDynamicServerError: function() {
          return isDynamicServerError;
        }
      });
      var DYNAMIC_ERROR_CODE = "DYNAMIC_SERVER_USAGE";
      var DynamicServerError = class extends Error {
        constructor(description) {
          super(`Dynamic server usage: ${description}`), this.description = description, this.digest = DYNAMIC_ERROR_CODE;
        }
      };
      function isDynamicServerError(err) {
        if (typeof err !== "object" || err === null || !("digest" in err) || typeof err.digest !== "string") {
          return false;
        }
        return err.digest === DYNAMIC_ERROR_CODE;
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/client/components/static-generation-bailout.js
  var require_static_generation_bailout = __commonJS({
    "node_modules/next/dist/client/components/static-generation-bailout.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        StaticGenBailoutError: function() {
          return StaticGenBailoutError;
        },
        isStaticGenBailoutError: function() {
          return isStaticGenBailoutError;
        }
      });
      var NEXT_STATIC_GEN_BAILOUT = "NEXT_STATIC_GEN_BAILOUT";
      var StaticGenBailoutError = class extends Error {
        constructor(...args) {
          super(...args), this.code = NEXT_STATIC_GEN_BAILOUT;
        }
      };
      function isStaticGenBailoutError(error) {
        if (typeof error !== "object" || error === null || !("code" in error)) {
          return false;
        }
        return error.code === NEXT_STATIC_GEN_BAILOUT;
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/server/app-render/work-unit-async-storage-instance.js
  var require_work_unit_async_storage_instance = __commonJS({
    "node_modules/next/dist/server/app-render/work-unit-async-storage-instance.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "workUnitAsyncStorageInstance", {
        enumerable: true,
        get: function() {
          return workUnitAsyncStorageInstance;
        }
      });
      var _asynclocalstorage = require_async_local_storage();
      var workUnitAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();
    }
  });

  // node_modules/next/dist/client/components/app-router-headers.js
  var require_app_router_headers = __commonJS({
    "node_modules/next/dist/client/components/app-router-headers.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        ACTION_HEADER: function() {
          return ACTION_HEADER;
        },
        FLIGHT_HEADERS: function() {
          return FLIGHT_HEADERS;
        },
        NEXT_ACTION_NOT_FOUND_HEADER: function() {
          return NEXT_ACTION_NOT_FOUND_HEADER;
        },
        NEXT_ACTION_REVALIDATED_HEADER: function() {
          return NEXT_ACTION_REVALIDATED_HEADER;
        },
        NEXT_DID_POSTPONE_HEADER: function() {
          return NEXT_DID_POSTPONE_HEADER;
        },
        NEXT_HMR_REFRESH_HASH_COOKIE: function() {
          return NEXT_HMR_REFRESH_HASH_COOKIE;
        },
        NEXT_HMR_REFRESH_HEADER: function() {
          return NEXT_HMR_REFRESH_HEADER;
        },
        NEXT_HTML_REQUEST_ID_HEADER: function() {
          return NEXT_HTML_REQUEST_ID_HEADER;
        },
        NEXT_INSTANT_PREFETCH_HEADER: function() {
          return NEXT_INSTANT_PREFETCH_HEADER;
        },
        NEXT_INSTANT_TEST_COOKIE: function() {
          return NEXT_INSTANT_TEST_COOKIE;
        },
        NEXT_IS_PRERENDER_HEADER: function() {
          return NEXT_IS_PRERENDER_HEADER;
        },
        NEXT_REQUEST_ID_HEADER: function() {
          return NEXT_REQUEST_ID_HEADER;
        },
        NEXT_REWRITTEN_PATH_HEADER: function() {
          return NEXT_REWRITTEN_PATH_HEADER;
        },
        NEXT_REWRITTEN_QUERY_HEADER: function() {
          return NEXT_REWRITTEN_QUERY_HEADER;
        },
        NEXT_ROUTER_PREFETCH_HEADER: function() {
          return NEXT_ROUTER_PREFETCH_HEADER;
        },
        NEXT_ROUTER_SEGMENT_PREFETCH_HEADER: function() {
          return NEXT_ROUTER_SEGMENT_PREFETCH_HEADER;
        },
        NEXT_ROUTER_STALE_TIME_HEADER: function() {
          return NEXT_ROUTER_STALE_TIME_HEADER;
        },
        NEXT_ROUTER_STATE_TREE_HEADER: function() {
          return NEXT_ROUTER_STATE_TREE_HEADER;
        },
        NEXT_RSC_UNION_QUERY: function() {
          return NEXT_RSC_UNION_QUERY;
        },
        NEXT_URL: function() {
          return NEXT_URL;
        },
        RSC_CONTENT_TYPE_HEADER: function() {
          return RSC_CONTENT_TYPE_HEADER;
        },
        RSC_HEADER: function() {
          return RSC_HEADER;
        }
      });
      var RSC_HEADER = "rsc";
      var ACTION_HEADER = "next-action";
      var NEXT_ROUTER_STATE_TREE_HEADER = "next-router-state-tree";
      var NEXT_ROUTER_PREFETCH_HEADER = "next-router-prefetch";
      var NEXT_ROUTER_SEGMENT_PREFETCH_HEADER = "next-router-segment-prefetch";
      var NEXT_HMR_REFRESH_HEADER = "next-hmr-refresh";
      var NEXT_HMR_REFRESH_HASH_COOKIE = "__next_hmr_refresh_hash__";
      var NEXT_URL = "next-url";
      var RSC_CONTENT_TYPE_HEADER = "text/x-component";
      var NEXT_INSTANT_PREFETCH_HEADER = "next-instant-navigation-testing-prefetch";
      var NEXT_INSTANT_TEST_COOKIE = "next-instant-navigation-testing";
      var FLIGHT_HEADERS = [
        RSC_HEADER,
        NEXT_ROUTER_STATE_TREE_HEADER,
        NEXT_ROUTER_PREFETCH_HEADER,
        NEXT_HMR_REFRESH_HEADER,
        NEXT_ROUTER_SEGMENT_PREFETCH_HEADER
      ];
      var NEXT_RSC_UNION_QUERY = "_rsc";
      var NEXT_ROUTER_STALE_TIME_HEADER = "x-nextjs-stale-time";
      var NEXT_DID_POSTPONE_HEADER = "x-nextjs-postponed";
      var NEXT_REWRITTEN_PATH_HEADER = "x-nextjs-rewritten-path";
      var NEXT_REWRITTEN_QUERY_HEADER = "x-nextjs-rewritten-query";
      var NEXT_IS_PRERENDER_HEADER = "x-nextjs-prerender";
      var NEXT_ACTION_NOT_FOUND_HEADER = "x-nextjs-action-not-found";
      var NEXT_REQUEST_ID_HEADER = "x-nextjs-request-id";
      var NEXT_HTML_REQUEST_ID_HEADER = "x-nextjs-html-request-id";
      var NEXT_ACTION_REVALIDATED_HEADER = "x-action-revalidated";
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/server/app-render/work-unit-async-storage.external.js
  var require_work_unit_async_storage_external = __commonJS({
    "node_modules/next/dist/server/app-render/work-unit-async-storage.external.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        getCacheSignal: function() {
          return getCacheSignal;
        },
        getDraftModeProviderForCacheScope: function() {
          return getDraftModeProviderForCacheScope;
        },
        getHmrRefreshHash: function() {
          return getHmrRefreshHash;
        },
        getPrerenderResumeDataCache: function() {
          return getPrerenderResumeDataCache;
        },
        getRenderResumeDataCache: function() {
          return getRenderResumeDataCache;
        },
        getServerComponentsHmrCache: function() {
          return getServerComponentsHmrCache;
        },
        getStagedRenderingController: function() {
          return getStagedRenderingController;
        },
        isHmrRefresh: function() {
          return isHmrRefresh;
        },
        isInEarlyRenderStage: function() {
          return isInEarlyRenderStage;
        },
        throwForMissingRequestStore: function() {
          return throwForMissingRequestStore;
        },
        throwInvariantForMissingStore: function() {
          return throwInvariantForMissingStore;
        },
        workUnitAsyncStorage: function() {
          return _workunitasyncstorageinstance.workUnitAsyncStorageInstance;
        }
      });
      var _workunitasyncstorageinstance = require_work_unit_async_storage_instance();
      var _approuterheaders = require_app_router_headers();
      var _invarianterror = require_invariant_error();
      var _stagedrendering = require_staged_rendering();
      function isInEarlyRenderStage(requestStore) {
        const stagedRendering = requestStore.stagedRendering;
        if (stagedRendering) {
          return stagedRendering.currentStage === _stagedrendering.RenderStage.EarlyStatic || stagedRendering.currentStage === _stagedrendering.RenderStage.EarlyRuntime;
        }
        return false;
      }
      function throwForMissingRequestStore(callingExpression) {
        throw Object.defineProperty(new Error(`\`${callingExpression}\` was called outside a request scope. Read more: https://nextjs.org/docs/messages/next-dynamic-api-wrong-context`), "__NEXT_ERROR_CODE", {
          value: "E251",
          enumerable: false,
          configurable: true
        });
      }
      function throwInvariantForMissingStore() {
        throw Object.defineProperty(new _invarianterror.InvariantError("Expected workUnitAsyncStorage to have a store."), "__NEXT_ERROR_CODE", {
          value: "E696",
          enumerable: false,
          configurable: true
        });
      }
      function getPrerenderResumeDataCache(workUnitStore) {
        switch (workUnitStore.type) {
          case "prerender":
          case "prerender-runtime":
          case "prerender-ppr":
            return workUnitStore.prerenderResumeDataCache;
          case "prerender-client":
          case "validation-client":
            return workUnitStore.prerenderResumeDataCache;
          case "request": {
            if (workUnitStore.prerenderResumeDataCache) {
              return workUnitStore.prerenderResumeDataCache;
            }
          }
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "generate-static-params":
            return null;
          default:
            return workUnitStore;
        }
      }
      function getRenderResumeDataCache(workUnitStore) {
        switch (workUnitStore.type) {
          case "request":
          case "prerender":
          case "prerender-runtime":
          case "prerender-client":
          case "validation-client":
            if (workUnitStore.renderResumeDataCache) {
              return workUnitStore.renderResumeDataCache;
            }
          // fallthrough
          case "prerender-ppr":
            return workUnitStore.prerenderResumeDataCache ?? null;
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "prerender-legacy":
          case "generate-static-params":
            return null;
          default:
            return workUnitStore;
        }
      }
      function getHmrRefreshHash(workUnitStore) {
        if (process.env.__NEXT_DEV_SERVER) {
          switch (workUnitStore.type) {
            case "cache":
            case "private-cache":
            case "prerender":
            case "prerender-runtime":
              return workUnitStore.hmrRefreshHash;
            case "request":
              var _workUnitStore_cookies_get;
              return (_workUnitStore_cookies_get = workUnitStore.cookies.get(_approuterheaders.NEXT_HMR_REFRESH_HASH_COOKIE)) == null ? void 0 : _workUnitStore_cookies_get.value;
            case "prerender-client":
            case "validation-client":
            case "prerender-ppr":
            case "prerender-legacy":
            case "unstable-cache":
            case "generate-static-params":
              break;
            default:
              workUnitStore;
          }
        }
        return void 0;
      }
      function isHmrRefresh(workUnitStore) {
        if (process.env.__NEXT_DEV_SERVER) {
          switch (workUnitStore.type) {
            case "cache":
            case "private-cache":
            case "request":
              return workUnitStore.isHmrRefresh ?? false;
            case "prerender":
            case "prerender-client":
            case "validation-client":
            case "prerender-runtime":
            case "prerender-ppr":
            case "prerender-legacy":
            case "unstable-cache":
            case "generate-static-params":
              break;
            default:
              workUnitStore;
          }
        }
        return false;
      }
      function getServerComponentsHmrCache(workUnitStore) {
        if (process.env.__NEXT_DEV_SERVER) {
          switch (workUnitStore.type) {
            case "cache":
            case "private-cache":
            case "request":
              return workUnitStore.serverComponentsHmrCache;
            case "prerender":
            case "prerender-client":
            case "validation-client":
            case "prerender-runtime":
            case "prerender-ppr":
            case "prerender-legacy":
            case "unstable-cache":
            case "generate-static-params":
              break;
            default:
              workUnitStore;
          }
        }
        return void 0;
      }
      function getDraftModeProviderForCacheScope(workStore, workUnitStore) {
        if (workStore.isDraftMode) {
          switch (workUnitStore.type) {
            case "cache":
            case "private-cache":
            case "unstable-cache":
            case "prerender-runtime":
            case "request":
              return workUnitStore.draftMode;
            case "prerender":
            case "prerender-client":
            case "validation-client":
            case "prerender-ppr":
            case "prerender-legacy":
            case "generate-static-params":
              break;
            default:
              workUnitStore;
          }
        }
        return void 0;
      }
      function getStagedRenderingController(workUnitStore) {
        switch (workUnitStore.type) {
          case "request":
          case "prerender-runtime":
            return workUnitStore.stagedRendering ?? null;
          case "prerender":
          case "prerender-client":
          case "validation-client":
          case "prerender-ppr":
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "generate-static-params":
            return null;
          default:
            return workUnitStore;
        }
      }
      function getCacheSignal(workUnitStore) {
        switch (workUnitStore.type) {
          case "prerender":
          case "prerender-client":
          case "validation-client":
          case "prerender-runtime":
            return workUnitStore.cacheSignal;
          case "request": {
            if (workUnitStore.cacheSignal) {
              return workUnitStore.cacheSignal;
            }
          }
          case "prerender-ppr":
          case "prerender-legacy":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "generate-static-params":
            return null;
          default:
            return workUnitStore;
        }
      }
    }
  });

  // node_modules/next/dist/server/app-render/work-async-storage-instance.js
  var require_work_async_storage_instance = __commonJS({
    "node_modules/next/dist/server/app-render/work-async-storage-instance.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "workAsyncStorageInstance", {
        enumerable: true,
        get: function() {
          return workAsyncStorageInstance;
        }
      });
      var _asynclocalstorage = require_async_local_storage();
      var workAsyncStorageInstance = (0, _asynclocalstorage.createAsyncLocalStorage)();
    }
  });

  // node_modules/next/dist/server/app-render/work-async-storage.external.js
  var require_work_async_storage_external = __commonJS({
    "node_modules/next/dist/server/app-render/work-async-storage.external.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "workAsyncStorage", {
        enumerable: true,
        get: function() {
          return _workasyncstorageinstance.workAsyncStorageInstance;
        }
      });
      var _workasyncstorageinstance = require_work_async_storage_instance();
    }
  });

  // node_modules/next/dist/lib/framework/boundary-constants.js
  var require_boundary_constants = __commonJS({
    "node_modules/next/dist/lib/framework/boundary-constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        METADATA_BOUNDARY_NAME: function() {
          return METADATA_BOUNDARY_NAME;
        },
        OUTLET_BOUNDARY_NAME: function() {
          return OUTLET_BOUNDARY_NAME;
        },
        ROOT_LAYOUT_BOUNDARY_NAME: function() {
          return ROOT_LAYOUT_BOUNDARY_NAME;
        },
        VIEWPORT_BOUNDARY_NAME: function() {
          return VIEWPORT_BOUNDARY_NAME;
        }
      });
      var METADATA_BOUNDARY_NAME = "__next_metadata_boundary__";
      var VIEWPORT_BOUNDARY_NAME = "__next_viewport_boundary__";
      var OUTLET_BOUNDARY_NAME = "__next_outlet_boundary__";
      var ROOT_LAYOUT_BOUNDARY_NAME = "__next_root_layout_boundary__";
    }
  });

  // node_modules/next/dist/lib/scheduler.js
  var require_scheduler = __commonJS({
    "node_modules/next/dist/lib/scheduler.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        atLeastOneTask: function() {
          return atLeastOneTask;
        },
        scheduleImmediate: function() {
          return scheduleImmediate;
        },
        scheduleOnNextTick: function() {
          return scheduleOnNextTick;
        },
        waitAtLeastOneReactRenderTask: function() {
          return waitAtLeastOneReactRenderTask;
        }
      });
      var scheduleOnNextTick = (cb) => {
        Promise.resolve().then(() => {
          if (process.env.NEXT_RUNTIME === "edge") {
            setTimeout(cb, 0);
          } else {
            process.nextTick(cb);
          }
        });
      };
      var scheduleImmediate = (cb) => {
        if (process.env.NEXT_RUNTIME === "edge") {
          setTimeout(cb, 0);
        } else {
          setImmediate(cb);
        }
      };
      function atLeastOneTask() {
        return new Promise((resolve) => scheduleImmediate(resolve));
      }
      function waitAtLeastOneReactRenderTask() {
        if (process.env.NEXT_RUNTIME === "edge") {
          return new Promise((r) => setTimeout(r, 0));
        } else {
          return new Promise((r) => setImmediate(r));
        }
      }
    }
  });

  // node_modules/next/dist/server/app-render/instant-validation/boundary-constants.js
  var require_boundary_constants2 = __commonJS({
    "node_modules/next/dist/server/app-render/instant-validation/boundary-constants.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "INSTANT_VALIDATION_BOUNDARY_NAME", {
        enumerable: true,
        get: function() {
          return INSTANT_VALIDATION_BOUNDARY_NAME;
        }
      });
      var INSTANT_VALIDATION_BOUNDARY_NAME = "__next_instant_validation_boundary__";
    }
  });

  // node_modules/next/dist/server/app-render/dynamic-rendering.js
  var require_dynamic_rendering = __commonJS({
    "node_modules/next/dist/server/app-render/dynamic-rendering.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        DynamicHoleKind: function() {
          return DynamicHoleKind;
        },
        Postpone: function() {
          return Postpone;
        },
        PreludeState: function() {
          return PreludeState;
        },
        abortAndThrowOnSynchronousRequestDataAccess: function() {
          return abortAndThrowOnSynchronousRequestDataAccess;
        },
        abortOnSynchronousPlatformIOAccess: function() {
          return abortOnSynchronousPlatformIOAccess;
        },
        accessedDynamicData: function() {
          return accessedDynamicData;
        },
        annotateDynamicAccess: function() {
          return annotateDynamicAccess;
        },
        consumeDynamicAccess: function() {
          return consumeDynamicAccess;
        },
        createDynamicTrackingState: function() {
          return createDynamicTrackingState;
        },
        createDynamicValidationState: function() {
          return createDynamicValidationState;
        },
        createHangingInputAbortSignal: function() {
          return createHangingInputAbortSignal;
        },
        createInstantValidationState: function() {
          return createInstantValidationState;
        },
        createRenderInBrowserAbortSignal: function() {
          return createRenderInBrowserAbortSignal;
        },
        formatDynamicAPIAccesses: function() {
          return formatDynamicAPIAccesses;
        },
        getFirstDynamicReason: function() {
          return getFirstDynamicReason;
        },
        getNavigationDisallowedDynamicReasons: function() {
          return getNavigationDisallowedDynamicReasons;
        },
        getStaticShellDisallowedDynamicReasons: function() {
          return getStaticShellDisallowedDynamicReasons;
        },
        isDynamicPostpone: function() {
          return isDynamicPostpone;
        },
        isPrerenderInterruptedError: function() {
          return isPrerenderInterruptedError;
        },
        logDisallowedDynamicError: function() {
          return logDisallowedDynamicError;
        },
        markCurrentScopeAsDynamic: function() {
          return markCurrentScopeAsDynamic;
        },
        postponeWithTracking: function() {
          return postponeWithTracking;
        },
        throwIfDisallowedDynamic: function() {
          return throwIfDisallowedDynamic;
        },
        throwToInterruptStaticGeneration: function() {
          return throwToInterruptStaticGeneration;
        },
        trackAllowedDynamicAccess: function() {
          return trackAllowedDynamicAccess;
        },
        trackDynamicDataInDynamicRender: function() {
          return trackDynamicDataInDynamicRender;
        },
        trackDynamicHoleInNavigation: function() {
          return trackDynamicHoleInNavigation;
        },
        trackDynamicHoleInRuntimeShell: function() {
          return trackDynamicHoleInRuntimeShell;
        },
        trackDynamicHoleInStaticShell: function() {
          return trackDynamicHoleInStaticShell;
        },
        trackThrownErrorInNavigation: function() {
          return trackThrownErrorInNavigation;
        },
        useDynamicRouteParams: function() {
          return useDynamicRouteParams;
        },
        useDynamicSearchParams: function() {
          return useDynamicSearchParams;
        }
      });
      var _react = /* @__PURE__ */ _interop_require_default(require_react());
      var _hooksservercontext = require_hooks_server_context();
      var _staticgenerationbailout = require_static_generation_bailout();
      var _workunitasyncstorageexternal = require_work_unit_async_storage_external();
      var _workasyncstorageexternal = require_work_async_storage_external();
      var _dynamicrenderingutils = require_dynamic_rendering_utils();
      var _boundaryconstants = require_boundary_constants();
      var _scheduler = require_scheduler();
      var _bailouttocsr = require_bailout_to_csr();
      var _invarianterror = require_invariant_error();
      var _boundaryconstants1 = require_boundary_constants2();
      function _interop_require_default(obj) {
        return obj && obj.__esModule ? obj : {
          default: obj
        };
      }
      var hasPostpone = typeof _react.default.unstable_postpone === "function";
      function createDynamicTrackingState(isDebugDynamicAccesses) {
        return {
          isDebugDynamicAccesses,
          dynamicAccesses: [],
          syncDynamicErrorWithStack: null
        };
      }
      function createDynamicValidationState() {
        return {
          hasSuspenseAboveBody: false,
          hasDynamicMetadata: false,
          dynamicMetadata: null,
          hasDynamicViewport: false,
          hasAllowedDynamic: false,
          dynamicErrors: []
        };
      }
      function getFirstDynamicReason(trackingState) {
        var _trackingState_dynamicAccesses_;
        return (_trackingState_dynamicAccesses_ = trackingState.dynamicAccesses[0]) == null ? void 0 : _trackingState_dynamicAccesses_.expression;
      }
      function markCurrentScopeAsDynamic(store, workUnitStore, expression) {
        if (workUnitStore) {
          switch (workUnitStore.type) {
            case "cache":
            case "unstable-cache":
              return;
            case "private-cache":
              return;
            case "prerender-legacy":
            case "prerender-ppr":
            case "request":
            case "generate-static-params":
              break;
            default:
              workUnitStore;
          }
        }
        if (store.forceDynamic || store.forceStatic) return;
        if (store.dynamicShouldError) {
          throw Object.defineProperty(new _staticgenerationbailout.StaticGenBailoutError(`Route ${store.route} with \`dynamic = "error"\` couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/app/building-your-application/rendering/static-and-dynamic#dynamic-rendering`), "__NEXT_ERROR_CODE", {
            value: "E553",
            enumerable: false,
            configurable: true
          });
        }
        if (workUnitStore) {
          switch (workUnitStore.type) {
            case "prerender-ppr":
              return postponeWithTracking(store.route, expression, workUnitStore.dynamicTracking);
            case "prerender-legacy":
              workUnitStore.revalidate = 0;
              const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used ${expression}. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
                value: "E550",
                enumerable: false,
                configurable: true
              });
              store.dynamicUsageDescription = expression;
              store.dynamicUsageStack = err.stack;
              throw err;
            case "request":
              if (true) {
                workUnitStore.usedDynamic = true;
              }
              break;
            case "generate-static-params":
              break;
            default:
              workUnitStore;
          }
        }
      }
      function throwToInterruptStaticGeneration(expression, store, prerenderStore) {
        const err = Object.defineProperty(new _hooksservercontext.DynamicServerError(`Route ${store.route} couldn't be rendered statically because it used \`${expression}\`. See more info here: https://nextjs.org/docs/messages/dynamic-server-error`), "__NEXT_ERROR_CODE", {
          value: "E558",
          enumerable: false,
          configurable: true
        });
        prerenderStore.revalidate = 0;
        store.dynamicUsageDescription = expression;
        store.dynamicUsageStack = err.stack;
        throw err;
      }
      function trackDynamicDataInDynamicRender(workUnitStore) {
        switch (workUnitStore.type) {
          case "cache":
          case "unstable-cache":
            return;
          case "private-cache":
            return;
          case "prerender":
          case "prerender-runtime":
          case "prerender-legacy":
          case "prerender-ppr":
          case "prerender-client":
          case "validation-client":
          case "generate-static-params":
            break;
          case "request":
            if (true) {
              workUnitStore.usedDynamic = true;
            }
            break;
          default:
            workUnitStore;
        }
      }
      function abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore) {
        const reason = `Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`;
        const error = createPrerenderInterruptedError(reason);
        prerenderStore.controller.abort(error);
        const dynamicTracking = prerenderStore.dynamicTracking;
        if (dynamicTracking) {
          dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : void 0,
            expression
          });
        }
      }
      function abortOnSynchronousPlatformIOAccess(route, expression, errorWithStack, prerenderStore) {
        const dynamicTracking = prerenderStore.dynamicTracking;
        abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
        if (dynamicTracking) {
          if (dynamicTracking.syncDynamicErrorWithStack === null) {
            dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
          }
        }
      }
      function abortAndThrowOnSynchronousRequestDataAccess(route, expression, errorWithStack, prerenderStore) {
        const prerenderSignal = prerenderStore.controller.signal;
        if (prerenderSignal.aborted === false) {
          abortOnSynchronousDynamicDataAccess(route, expression, prerenderStore);
          const dynamicTracking = prerenderStore.dynamicTracking;
          if (dynamicTracking) {
            if (dynamicTracking.syncDynamicErrorWithStack === null) {
              dynamicTracking.syncDynamicErrorWithStack = errorWithStack;
            }
          }
        }
        throw createPrerenderInterruptedError(`Route ${route} needs to bail out of prerendering at this point because it used ${expression}.`);
      }
      function Postpone({ reason, route }) {
        const prerenderStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        const dynamicTracking = prerenderStore && prerenderStore.type === "prerender-ppr" ? prerenderStore.dynamicTracking : null;
        postponeWithTracking(route, reason, dynamicTracking);
      }
      function postponeWithTracking(route, expression, dynamicTracking) {
        assertPostpone();
        if (dynamicTracking) {
          dynamicTracking.dynamicAccesses.push({
            // When we aren't debugging, we don't need to create another error for the
            // stack trace.
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : void 0,
            expression
          });
        }
        _react.default.unstable_postpone(createPostponeReason(route, expression));
      }
      function createPostponeReason(route, expression) {
        return `Route ${route} needs to bail out of prerendering at this point because it used ${expression}. React throws this special object to indicate where. It should not be caught by your own try/catch. Learn more: https://nextjs.org/docs/messages/ppr-caught-error`;
      }
      function isDynamicPostpone(err) {
        if (typeof err === "object" && err !== null && typeof err.message === "string") {
          return isDynamicPostponeReason(err.message);
        }
        return false;
      }
      function isDynamicPostponeReason(reason) {
        return reason.includes("needs to bail out of prerendering at this point because it used") && reason.includes("Learn more: https://nextjs.org/docs/messages/ppr-caught-error");
      }
      if (isDynamicPostponeReason(createPostponeReason("%%%", "^^^")) === false) {
        throw Object.defineProperty(new Error("Invariant: isDynamicPostpone misidentified a postpone reason. This is a bug in Next.js"), "__NEXT_ERROR_CODE", {
          value: "E296",
          enumerable: false,
          configurable: true
        });
      }
      var NEXT_PRERENDER_INTERRUPTED = "NEXT_PRERENDER_INTERRUPTED";
      function createPrerenderInterruptedError(message) {
        const error = Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
          value: "E394",
          enumerable: false,
          configurable: true
        });
        error.digest = NEXT_PRERENDER_INTERRUPTED;
        return error;
      }
      function isPrerenderInterruptedError(error) {
        return typeof error === "object" && error !== null && error.digest === NEXT_PRERENDER_INTERRUPTED && "name" in error && "message" in error && error instanceof Error;
      }
      function accessedDynamicData(dynamicAccesses) {
        return dynamicAccesses.length > 0;
      }
      function consumeDynamicAccess(serverDynamic, clientDynamic) {
        serverDynamic.dynamicAccesses.push(...clientDynamic.dynamicAccesses);
        return serverDynamic.dynamicAccesses;
      }
      function formatDynamicAPIAccesses(dynamicAccesses) {
        return dynamicAccesses.filter((access) => typeof access.stack === "string" && access.stack.length > 0).map(({ expression, stack }) => {
          stack = stack.split("\n").slice(4).filter((line) => {
            if (line.includes("node_modules/next/")) {
              return false;
            }
            if (line.includes(" (<anonymous>)")) {
              return false;
            }
            if (line.includes(" (node:")) {
              return false;
            }
            return true;
          }).join("\n");
          return `Dynamic API Usage Debug - ${expression}:
${stack}`;
        });
      }
      function assertPostpone() {
        if (!hasPostpone) {
          throw Object.defineProperty(new Error(`Invariant: React.unstable_postpone is not defined. This suggests the wrong version of React was loaded. This is a bug in Next.js`), "__NEXT_ERROR_CODE", {
            value: "E224",
            enumerable: false,
            configurable: true
          });
        }
      }
      function createRenderInBrowserAbortSignal() {
        const controller = new AbortController();
        controller.abort(Object.defineProperty(new _bailouttocsr.BailoutToCSRError("Render in Browser"), "__NEXT_ERROR_CODE", {
          value: "E721",
          enumerable: false,
          configurable: true
        }));
        return controller.signal;
      }
      function createHangingInputAbortSignal(workUnitStore) {
        switch (workUnitStore.type) {
          case "prerender":
          case "prerender-runtime":
            const controller = new AbortController();
            if (workUnitStore.cacheSignal) {
              workUnitStore.cacheSignal.inputReady().then(() => {
                controller.abort();
              });
            } else {
              if (
                // eslint-disable-next-line no-restricted-syntax -- We are discriminating between two different refined types and don't need an addition exhaustive switch here
                workUnitStore.type === "prerender-runtime" && workUnitStore.stagedRendering
              ) {
                const { stagedRendering } = workUnitStore;
                stagedRendering.waitForStage((0, _dynamicrenderingutils.getRuntimeStage)(stagedRendering)).then(() => (0, _scheduler.scheduleOnNextTick)(() => controller.abort()));
              } else {
                (0, _scheduler.scheduleOnNextTick)(() => controller.abort());
              }
            }
            return controller.signal;
          case "prerender-client":
          case "validation-client":
          case "prerender-ppr":
          case "prerender-legacy":
          case "request":
          case "cache":
          case "private-cache":
          case "unstable-cache":
          case "generate-static-params":
            return void 0;
          default:
            workUnitStore;
        }
      }
      function annotateDynamicAccess(expression, prerenderStore) {
        const dynamicTracking = prerenderStore.dynamicTracking;
        if (dynamicTracking) {
          dynamicTracking.dynamicAccesses.push({
            stack: dynamicTracking.isDebugDynamicAccesses ? new Error().stack : void 0,
            expression
          });
        }
      }
      function useDynamicRouteParams(expression) {
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        if (workStore && workUnitStore) {
          switch (workUnitStore.type) {
            case "prerender-client":
            case "prerender": {
              const fallbackParams = workUnitStore.fallbackRouteParams;
              if (fallbackParams && fallbackParams.size > 0) {
                _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
              }
              break;
            }
            case "prerender-ppr": {
              const fallbackParams = workUnitStore.fallbackRouteParams;
              if (fallbackParams && fallbackParams.size > 0) {
                return postponeWithTracking(workStore.route, expression, workUnitStore.dynamicTracking);
              }
              break;
            }
            case "validation-client": {
              break;
            }
            case "prerender-runtime":
              throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called during a runtime prerender. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E771",
                enumerable: false,
                configurable: true
              });
            case "cache":
            case "private-cache":
              throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E745",
                enumerable: false,
                configurable: true
              });
            case "generate-static-params":
              throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called in \`generateStaticParams\`. Next.js should be preventing ${expression} from being included in server component files statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
                value: "E1130",
                enumerable: false,
                configurable: true
              });
            case "prerender-legacy":
            case "request":
            case "unstable-cache":
              break;
            default:
              workUnitStore;
          }
        }
      }
      function useDynamicSearchParams(expression) {
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        if (!workStore) {
          return;
        }
        if (!workUnitStore) {
          (0, _workunitasyncstorageexternal.throwForMissingRequestStore)(expression);
        }
        switch (workUnitStore.type) {
          case "validation-client":
            return;
          case "prerender-client": {
            _react.default.use((0, _dynamicrenderingutils.makeHangingPromise)(workUnitStore.renderSignal, workStore.route, expression));
            break;
          }
          case "prerender-legacy":
          case "prerender-ppr": {
            if (workStore.forceStatic) {
              return;
            }
            throw Object.defineProperty(new _bailouttocsr.BailoutToCSRError(expression), "__NEXT_ERROR_CODE", {
              value: "E394",
              enumerable: false,
              configurable: true
            });
          }
          case "prerender":
          case "prerender-runtime":
            throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called from a Server Component. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
              value: "E795",
              enumerable: false,
              configurable: true
            });
          case "cache":
          case "unstable-cache":
          case "private-cache":
            throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called inside a cache scope. Next.js should be preventing ${expression} from being included in server components statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
              value: "E745",
              enumerable: false,
              configurable: true
            });
          case "generate-static-params":
            throw Object.defineProperty(new _invarianterror.InvariantError(`\`${expression}\` was called in \`generateStaticParams\`. Next.js should be preventing ${expression} from being included in server component files statically, but did not in this case.`), "__NEXT_ERROR_CODE", {
              value: "E1130",
              enumerable: false,
              configurable: true
            });
          case "request":
            return;
          default:
            workUnitStore;
        }
      }
      var hasSuspenseRegex = /\n\s+at Suspense \(<anonymous>\)/;
      var bodyAndImplicitTags = "body|div|main|section|article|aside|header|footer|nav|form|p|span|h1|h2|h3|h4|h5|h6";
      var hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex = new RegExp(`\\n\\s+at Suspense \\(<anonymous>\\)(?:(?!\\n\\s+at (?:${bodyAndImplicitTags}) \\(<anonymous>\\))[\\s\\S])*?\\n\\s+at ${_boundaryconstants.ROOT_LAYOUT_BOUNDARY_NAME} \\([^\\n]*\\)`);
      var hasMetadataRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.METADATA_BOUNDARY_NAME}[\\n\\s]`);
      var hasViewportRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.VIEWPORT_BOUNDARY_NAME}[\\n\\s]`);
      var hasOutletRegex = new RegExp(`\\n\\s+at ${_boundaryconstants.OUTLET_BOUNDARY_NAME}[\\n\\s]`);
      var hasInstantValidationBoundaryRegex = new RegExp(`\\n\\s+at ${_boundaryconstants1.INSTANT_VALIDATION_BOUNDARY_NAME}[\\n\\s]`);
      function trackAllowedDynamicAccess(workStore, componentStack, dynamicValidation, clientDynamic) {
        if (hasOutletRegex.test(componentStack)) {
          return;
        } else if (hasMetadataRegex.test(componentStack)) {
          dynamicValidation.hasDynamicMetadata = true;
          return;
        } else if (hasViewportRegex.test(componentStack)) {
          dynamicValidation.hasDynamicViewport = true;
          return;
        } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
          dynamicValidation.hasAllowedDynamic = true;
          dynamicValidation.hasSuspenseAboveBody = true;
          return;
        } else if (hasSuspenseRegex.test(componentStack)) {
          dynamicValidation.hasAllowedDynamic = true;
          return;
        } else if (clientDynamic.syncDynamicErrorWithStack) {
          dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
          return;
        } else {
          const message = `Route "${workStore.route}": Uncached data was accessed outside of <Suspense>. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`;
          const error = addErrorContext(Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E1079",
            enumerable: false,
            configurable: true
          }), componentStack, null);
          dynamicValidation.dynamicErrors.push(error);
          return;
        }
      }
      var DynamicHoleKind = /* @__PURE__ */ (function(DynamicHoleKind2) {
        DynamicHoleKind2[DynamicHoleKind2["Runtime"] = 1] = "Runtime";
        DynamicHoleKind2[DynamicHoleKind2["Dynamic"] = 2] = "Dynamic";
        return DynamicHoleKind2;
      })({});
      function createInstantValidationState(createInstantStack) {
        return {
          hasDynamicMetadata: false,
          hasAllowedClientDynamicAboveBoundary: false,
          dynamicMetadata: null,
          hasDynamicViewport: false,
          hasAllowedDynamic: false,
          dynamicErrors: [],
          validationPreventingErrors: [],
          thrownErrorsOutsideBoundary: [],
          createInstantStack
        };
      }
      function trackDynamicHoleInNavigation(workStore, componentStack, dynamicValidation, clientDynamic, kind, boundaryState) {
        if (hasOutletRegex.test(componentStack)) {
          return;
        }
        if (hasMetadataRegex.test(componentStack)) {
          const usageDescription2 = kind === 1 ? `Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateMetadata\` or you have file-based metadata such as icons that depend on dynamic params segments.` : `Uncached data or \`connection()\` was accessed inside \`generateMetadata\`.`;
          const message2 = `Route "${workStore.route}": ${usageDescription2} Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`;
          const error2 = addErrorContext(Object.defineProperty(new Error(message2), "__NEXT_ERROR_CODE", {
            value: "E1076",
            enumerable: false,
            configurable: true
          }), componentStack, dynamicValidation.createInstantStack);
          dynamicValidation.dynamicMetadata = error2;
          return;
        }
        if (hasViewportRegex.test(componentStack)) {
          const usageDescription2 = kind === 1 ? `Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateViewport\`.` : `Uncached data or \`connection()\` was accessed inside \`generateViewport\`.`;
          const message2 = `Route "${workStore.route}": ${usageDescription2} This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`;
          const error2 = addErrorContext(Object.defineProperty(new Error(message2), "__NEXT_ERROR_CODE", {
            value: "E1086",
            enumerable: false,
            configurable: true
          }), componentStack, dynamicValidation.createInstantStack);
          dynamicValidation.dynamicErrors.push(error2);
          return;
        }
        const boundaryLocation = hasInstantValidationBoundaryRegex.exec(componentStack);
        if (!boundaryLocation) {
          if (boundaryState.expectedIds.size === boundaryState.renderedIds.size) {
            dynamicValidation.hasAllowedClientDynamicAboveBoundary = true;
            dynamicValidation.hasAllowedDynamic = true;
            return;
          } else {
            const message2 = `Route "${workStore.route}": Could not validate \`unstable_instant\` because a Client Component in a parent segment prevented the page from rendering.`;
            const error2 = addErrorContext(Object.defineProperty(new Error(message2), "__NEXT_ERROR_CODE", {
              value: "E1082",
              enumerable: false,
              configurable: true
            }), componentStack, dynamicValidation.createInstantStack);
            dynamicValidation.validationPreventingErrors.push(error2);
            return;
          }
        } else {
          const suspenseLocation = hasSuspenseRegex.exec(componentStack);
          if (suspenseLocation) {
            if (suspenseLocation.index < boundaryLocation.index) {
              dynamicValidation.hasAllowedDynamic = true;
              return;
            } else {
            }
          }
        }
        if (clientDynamic.syncDynamicErrorWithStack) {
          const syncError = clientDynamic.syncDynamicErrorWithStack;
          if (dynamicValidation.createInstantStack !== null && syncError.cause === void 0) {
            syncError.cause = dynamicValidation.createInstantStack();
          }
          dynamicValidation.dynamicErrors.push(syncError);
          return;
        }
        const usageDescription = kind === 1 ? `Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed outside of \`<Suspense>\`.` : `Uncached data or \`connection()\` was accessed outside of \`<Suspense>\`.`;
        const message = `Route "${workStore.route}": ${usageDescription} This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`;
        const error = addErrorContext(Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
          value: "E1078",
          enumerable: false,
          configurable: true
        }), componentStack, dynamicValidation.createInstantStack);
        dynamicValidation.dynamicErrors.push(error);
        return;
      }
      function trackThrownErrorInNavigation(workStore, dynamicValidation, thrownValue, componentStack) {
        const boundaryLocation = hasInstantValidationBoundaryRegex.exec(componentStack);
        if (!boundaryLocation) {
          const error = addErrorContext(Object.defineProperty(new Error("An error occurred while attempting to validate instant UI. This error may be preventing the validation from completing.", {
            cause: thrownValue
          }), "__NEXT_ERROR_CODE", {
            value: "E1118",
            enumerable: false,
            configurable: true
          }), componentStack, null);
          dynamicValidation.thrownErrorsOutsideBoundary.push(error);
        } else {
          const suspenseLocation = hasSuspenseRegex.exec(componentStack);
          if (suspenseLocation) {
            if (suspenseLocation.index < boundaryLocation.index) {
              return;
            } else {
            }
          }
          const message = `Route "${workStore.route}": Could not validate \`unstable_instant\` because an error prevented the target segment from rendering.`;
          const error = addErrorContext(
            Object.defineProperty(new Error(message, {
              cause: thrownValue
            }), "__NEXT_ERROR_CODE", {
              value: "E1112",
              enumerable: false,
              configurable: true
            }),
            componentStack,
            null
            // TODO(instant-validation-build): conflicting use of cause
          );
          dynamicValidation.validationPreventingErrors.push(error);
        }
      }
      function trackDynamicHoleInRuntimeShell(workStore, componentStack, dynamicValidation, clientDynamic) {
        if (hasOutletRegex.test(componentStack)) {
          return;
        } else if (hasMetadataRegex.test(componentStack)) {
          const message2 = `Route "${workStore.route}": Uncached data or \`connection()\` was accessed inside \`generateMetadata\`. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`;
          const error2 = addErrorContext(Object.defineProperty(new Error(message2), "__NEXT_ERROR_CODE", {
            value: "E1080",
            enumerable: false,
            configurable: true
          }), componentStack, null);
          dynamicValidation.dynamicMetadata = error2;
          return;
        } else if (hasViewportRegex.test(componentStack)) {
          const message2 = `Route "${workStore.route}": Uncached data or \`connection()\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`;
          const error2 = addErrorContext(Object.defineProperty(new Error(message2), "__NEXT_ERROR_CODE", {
            value: "E1077",
            enumerable: false,
            configurable: true
          }), componentStack, null);
          dynamicValidation.dynamicErrors.push(error2);
          return;
        } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
          dynamicValidation.hasAllowedDynamic = true;
          dynamicValidation.hasSuspenseAboveBody = true;
          return;
        } else if (hasSuspenseRegex.test(componentStack)) {
          dynamicValidation.hasAllowedDynamic = true;
          return;
        } else if (clientDynamic.syncDynamicErrorWithStack) {
          dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
          return;
        }
        const message = `Route "${workStore.route}": Uncached data or \`connection()\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`;
        const error = addErrorContext(Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
          value: "E1084",
          enumerable: false,
          configurable: true
        }), componentStack, null);
        dynamicValidation.dynamicErrors.push(error);
        return;
      }
      function trackDynamicHoleInStaticShell(workStore, componentStack, dynamicValidation, clientDynamic) {
        if (hasOutletRegex.test(componentStack)) {
          return;
        } else if (hasMetadataRegex.test(componentStack)) {
          const message = `Route "${workStore.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateMetadata\` or you have file-based metadata such as icons that depend on dynamic params segments. Except for this instance, the page would have been entirely prerenderable which may have been the intended behavior. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`;
          const error = addErrorContext(Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E1085",
            enumerable: false,
            configurable: true
          }), componentStack, null);
          dynamicValidation.dynamicMetadata = error;
          return;
        } else if (hasViewportRegex.test(componentStack)) {
          const message = `Route "${workStore.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed inside \`generateViewport\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`;
          const error = addErrorContext(Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E1081",
            enumerable: false,
            configurable: true
          }), componentStack, null);
          dynamicValidation.dynamicErrors.push(error);
          return;
        } else if (hasSuspenseBeforeRootLayoutWithoutBodyOrImplicitBodyRegex.test(componentStack)) {
          dynamicValidation.hasAllowedDynamic = true;
          dynamicValidation.hasSuspenseAboveBody = true;
          return;
        } else if (hasSuspenseRegex.test(componentStack)) {
          dynamicValidation.hasAllowedDynamic = true;
          return;
        } else if (clientDynamic.syncDynamicErrorWithStack) {
          dynamicValidation.dynamicErrors.push(clientDynamic.syncDynamicErrorWithStack);
          return;
        } else {
          const message = `Route "${workStore.route}": Runtime data such as \`cookies()\`, \`headers()\`, \`params\`, or \`searchParams\` was accessed outside of \`<Suspense>\`. This delays the entire page from rendering, resulting in a slow user experience. Learn more: https://nextjs.org/docs/messages/blocking-route`;
          const error = addErrorContext(Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E1083",
            enumerable: false,
            configurable: true
          }), componentStack, null);
          dynamicValidation.dynamicErrors.push(error);
          return;
        }
      }
      function addErrorContext(error, componentStack, createInstantStack) {
        const ownerStack = _react.default.captureOwnerStack ? _react.default.captureOwnerStack() : null;
        if (createInstantStack !== null) {
          error.cause = createInstantStack();
        }
        error.stack = error.name + ": " + error.message + (ownerStack || componentStack);
        return error;
      }
      var PreludeState = /* @__PURE__ */ (function(PreludeState2) {
        PreludeState2[PreludeState2["Full"] = 0] = "Full";
        PreludeState2[PreludeState2["Empty"] = 1] = "Empty";
        PreludeState2[PreludeState2["Errored"] = 2] = "Errored";
        return PreludeState2;
      })({});
      function logDisallowedDynamicError(workStore, error) {
        console.error(error);
        if (false) {
          console.error(`To get a more detailed stack trace and pinpoint the issue, try one of the following:
  - Start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.
  - Rerun the production build with \`next build --debug-prerender\` to generate better stack traces.`);
        } else if (!process.env.__NEXT_DEV_SERVER) {
          console.error(`To debug the issue, start the app in development mode by running \`next dev\`, then open "${workStore.route}" in your browser to investigate the error.`);
        }
      }
      function throwIfDisallowedDynamic(workStore, prelude, dynamicValidation, serverDynamic) {
        if (serverDynamic.syncDynamicErrorWithStack) {
          logDisallowedDynamicError(workStore, serverDynamic.syncDynamicErrorWithStack);
          throw new _staticgenerationbailout.StaticGenBailoutError();
        }
        if (prelude !== 0) {
          if (dynamicValidation.hasSuspenseAboveBody) {
            return;
          }
          const dynamicErrors = dynamicValidation.dynamicErrors;
          if (dynamicErrors.length > 0) {
            for (let i = 0; i < dynamicErrors.length; i++) {
              logDisallowedDynamicError(workStore, dynamicErrors[i]);
            }
            throw new _staticgenerationbailout.StaticGenBailoutError();
          }
          if (dynamicValidation.hasDynamicViewport) {
            console.error(`Route "${workStore.route}" has a \`generateViewport\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) without explicitly allowing fully dynamic rendering. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-viewport`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
          }
          if (prelude === 1) {
            console.error(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason. This is a bug in Next.js.`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
          }
        } else {
          if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.hasDynamicMetadata) {
            console.error(`Route "${workStore.route}" has a \`generateMetadata\` that depends on Request data (\`cookies()\`, etc...) or uncached external data (\`fetch(...)\`, etc...) when the rest of the route does not. See more info here: https://nextjs.org/docs/messages/next-prerender-dynamic-metadata`);
            throw new _staticgenerationbailout.StaticGenBailoutError();
          }
        }
      }
      function getStaticShellDisallowedDynamicReasons(workStore, prelude, dynamicValidation, configAllowsBlocking) {
        if (configAllowsBlocking || dynamicValidation.hasSuspenseAboveBody) {
          return [];
        }
        if (prelude !== 0) {
          const dynamicErrors = dynamicValidation.dynamicErrors;
          if (dynamicErrors.length > 0) {
            return dynamicErrors;
          }
          if (prelude === 1) {
            return [
              Object.defineProperty(new _invarianterror.InvariantError(`Route "${workStore.route}" did not produce a static shell and Next.js was unable to determine a reason.`), "__NEXT_ERROR_CODE", {
                value: "E936",
                enumerable: false,
                configurable: true
              })
            ];
          }
        } else {
          if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.dynamicErrors.length === 0 && dynamicValidation.dynamicMetadata) {
            return [
              dynamicValidation.dynamicMetadata
            ];
          }
        }
        return [];
      }
      function getNavigationDisallowedDynamicReasons(workStore, prelude, dynamicValidation, validationSampleTracking, boundaryState) {
        if (validationSampleTracking) {
          const { missingSampleErrors } = validationSampleTracking;
          if (missingSampleErrors.length > 0) {
            return missingSampleErrors;
          }
        }
        const { validationPreventingErrors } = dynamicValidation;
        if (validationPreventingErrors.length > 0) {
          return validationPreventingErrors;
        }
        if (boundaryState.renderedIds.size < boundaryState.expectedIds.size) {
          const { thrownErrorsOutsideBoundary, createInstantStack } = dynamicValidation;
          if (thrownErrorsOutsideBoundary.length === 0) {
            const message = `Route "${workStore.route}": Could not validate \`unstable_instant\` because the target segment was prevented from rendering for an unknown reason.`;
            const error = createInstantStack !== null ? createInstantStack() : new Error();
            error.name = "Error";
            error.message = message;
            return [
              error
            ];
          } else if (thrownErrorsOutsideBoundary.length === 1) {
            const message = `Route "${workStore.route}": Could not validate \`unstable_instant\` because the target segment was prevented from rendering, likely due to the following error.`;
            const error = createInstantStack !== null ? createInstantStack() : new Error();
            error.name = "Error";
            error.message = message;
            return [
              error,
              thrownErrorsOutsideBoundary[0]
            ];
          } else {
            const message = `Route "${workStore.route}": Could not validate \`unstable_instant\` because the target segment was prevented from rendering, likely due to one of the following errors.`;
            const error = createInstantStack !== null ? createInstantStack() : new Error();
            error.name = "Error";
            error.message = message;
            return [
              error,
              ...thrownErrorsOutsideBoundary
            ];
          }
        }
        if (prelude !== 0) {
          const dynamicErrors = dynamicValidation.dynamicErrors;
          if (dynamicErrors.length > 0) {
            return dynamicErrors;
          }
          if (prelude === 1) {
            if (dynamicValidation.hasAllowedClientDynamicAboveBoundary) {
              return [];
            }
            return [
              Object.defineProperty(new _invarianterror.InvariantError(`Route "${workStore.route}" failed to render during instant validation and Next.js was unable to determine a reason.`), "__NEXT_ERROR_CODE", {
                value: "E1055",
                enumerable: false,
                configurable: true
              })
            ];
          }
        } else {
          const dynamicErrors = dynamicValidation.dynamicErrors;
          if (dynamicErrors.length > 0) {
            return dynamicErrors;
          }
          if (dynamicValidation.hasAllowedDynamic === false && dynamicValidation.dynamicMetadata) {
            return [
              dynamicValidation.dynamicMetadata
            ];
          }
        }
        return [];
      }
    }
  });

  // node_modules/next/dist/client/components/unstable-rethrow.server.js
  var require_unstable_rethrow_server = __commonJS({
    "node_modules/next/dist/client/components/unstable-rethrow.server.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "unstable_rethrow", {
        enumerable: true,
        get: function() {
          return unstable_rethrow;
        }
      });
      var _dynamicrenderingutils = require_dynamic_rendering_utils();
      var _ispostpone = require_is_postpone();
      var _bailouttocsr = require_bailout_to_csr();
      var _isnextroutererror = require_is_next_router_error();
      var _dynamicrendering = require_dynamic_rendering();
      var _hooksservercontext = require_hooks_server_context();
      function unstable_rethrow(error) {
        if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error) || (0, _hooksservercontext.isDynamicServerError)(error) || (0, _dynamicrendering.isDynamicPostpone)(error) || (0, _ispostpone.isPostpone)(error) || (0, _dynamicrenderingutils.isHangingPromiseRejectionError)(error) || (0, _dynamicrendering.isPrerenderInterruptedError)(error)) {
          throw error;
        }
        if (error instanceof Error && "cause" in error) {
          unstable_rethrow(error.cause);
        }
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/client/components/unstable-rethrow.browser.js
  var require_unstable_rethrow_browser = __commonJS({
    "node_modules/next/dist/client/components/unstable-rethrow.browser.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "unstable_rethrow", {
        enumerable: true,
        get: function() {
          return unstable_rethrow;
        }
      });
      var _bailouttocsr = require_bailout_to_csr();
      var _isnextroutererror = require_is_next_router_error();
      function unstable_rethrow(error) {
        if ((0, _isnextroutererror.isNextRouterError)(error) || (0, _bailouttocsr.isBailoutToCSRError)(error)) {
          throw error;
        }
        if (error instanceof Error && "cause" in error) {
          unstable_rethrow(error.cause);
        }
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/client/components/unstable-rethrow.js
  var require_unstable_rethrow = __commonJS({
    "node_modules/next/dist/client/components/unstable-rethrow.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "unstable_rethrow", {
        enumerable: true,
        get: function() {
          return unstable_rethrow;
        }
      });
      var unstable_rethrow = typeof window === "undefined" ? require_unstable_rethrow_server().unstable_rethrow : require_unstable_rethrow_browser().unstable_rethrow;
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/client/components/navigation.react-server.js
  var require_navigation_react_server = __commonJS({
    "node_modules/next/dist/client/components/navigation.react-server.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        ReadonlyURLSearchParams: function() {
          return _readonlyurlsearchparams.ReadonlyURLSearchParams;
        },
        RedirectType: function() {
          return RedirectType;
        },
        forbidden: function() {
          return _forbidden.forbidden;
        },
        notFound: function() {
          return _notfound.notFound;
        },
        permanentRedirect: function() {
          return _redirect.permanentRedirect;
        },
        redirect: function() {
          return _redirect.redirect;
        },
        unauthorized: function() {
          return _unauthorized.unauthorized;
        },
        unstable_isUnrecognizedActionError: function() {
          return unstable_isUnrecognizedActionError;
        },
        unstable_rethrow: function() {
          return _unstablerethrow.unstable_rethrow;
        }
      });
      var _readonlyurlsearchparams = require_readonly_url_search_params();
      var _redirect = require_redirect();
      var _notfound = require_not_found();
      var _forbidden = require_forbidden();
      var _unauthorized = require_unauthorized();
      var _unstablerethrow = require_unstable_rethrow();
      function unstable_isUnrecognizedActionError() {
        throw Object.defineProperty(new Error("`unstable_isUnrecognizedActionError` can only be used on the client."), "__NEXT_ERROR_CODE", {
          value: "E776",
          enumerable: false,
          configurable: true
        });
      }
      var RedirectType = {
        push: "push",
        replace: "replace"
      };
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/dist/compiled/@edge-runtime/cookies/index.js
  var require_cookies = __commonJS({
    "node_modules/next/dist/compiled/@edge-runtime/cookies/index.js"(exports, module) {
      "use strict";
      var __defProp2 = Object.defineProperty;
      var __getOwnPropDesc2 = Object.getOwnPropertyDescriptor;
      var __getOwnPropNames2 = Object.getOwnPropertyNames;
      var __hasOwnProp2 = Object.prototype.hasOwnProperty;
      var __export = (target, all) => {
        for (var name in all)
          __defProp2(target, name, { get: all[name], enumerable: true });
      };
      var __copyProps2 = (to, from, except, desc) => {
        if (from && typeof from === "object" || typeof from === "function") {
          for (let key of __getOwnPropNames2(from))
            if (!__hasOwnProp2.call(to, key) && key !== except)
              __defProp2(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc2(from, key)) || desc.enumerable });
        }
        return to;
      };
      var __toCommonJS = (mod) => __copyProps2(__defProp2({}, "__esModule", { value: true }), mod);
      var src_exports = {};
      __export(src_exports, {
        RequestCookies: () => RequestCookies,
        ResponseCookies: () => ResponseCookies,
        parseCookie: () => parseCookie,
        parseSetCookie: () => parseSetCookie,
        stringifyCookie: () => stringifyCookie
      });
      module.exports = __toCommonJS(src_exports);
      function stringifyCookie(c) {
        var _a;
        const attrs = [
          "path" in c && c.path && `Path=${c.path}`,
          "expires" in c && (c.expires || c.expires === 0) && `Expires=${(typeof c.expires === "number" ? new Date(c.expires) : c.expires).toUTCString()}`,
          "maxAge" in c && typeof c.maxAge === "number" && `Max-Age=${c.maxAge}`,
          "domain" in c && c.domain && `Domain=${c.domain}`,
          "secure" in c && c.secure && "Secure",
          "httpOnly" in c && c.httpOnly && "HttpOnly",
          "sameSite" in c && c.sameSite && `SameSite=${c.sameSite}`,
          "partitioned" in c && c.partitioned && "Partitioned",
          "priority" in c && c.priority && `Priority=${c.priority}`
        ].filter(Boolean);
        const stringified = `${c.name}=${encodeURIComponent((_a = c.value) != null ? _a : "")}`;
        return attrs.length === 0 ? stringified : `${stringified}; ${attrs.join("; ")}`;
      }
      function parseCookie(cookie) {
        const map = /* @__PURE__ */ new Map();
        for (const pair of cookie.split(/; */)) {
          if (!pair)
            continue;
          const splitAt = pair.indexOf("=");
          if (splitAt === -1) {
            map.set(pair, "true");
            continue;
          }
          const [key, value] = [pair.slice(0, splitAt), pair.slice(splitAt + 1)];
          try {
            map.set(key, decodeURIComponent(value != null ? value : "true"));
          } catch {
          }
        }
        return map;
      }
      function parseSetCookie(setCookie) {
        if (!setCookie) {
          return void 0;
        }
        const [[name, value], ...attributes] = parseCookie(setCookie);
        const {
          domain,
          expires,
          httponly,
          maxage,
          path,
          samesite,
          secure,
          partitioned,
          priority
        } = Object.fromEntries(
          attributes.map(([key, value2]) => [
            key.toLowerCase().replace(/-/g, ""),
            value2
          ])
        );
        const cookie = {
          name,
          value: decodeURIComponent(value),
          domain,
          ...expires && { expires: new Date(expires) },
          ...httponly && { httpOnly: true },
          ...typeof maxage === "string" && { maxAge: Number(maxage) },
          path,
          ...samesite && { sameSite: parseSameSite(samesite) },
          ...secure && { secure: true },
          ...priority && { priority: parsePriority(priority) },
          ...partitioned && { partitioned: true }
        };
        return compact(cookie);
      }
      function compact(t) {
        const newT = {};
        for (const key in t) {
          if (t[key]) {
            newT[key] = t[key];
          }
        }
        return newT;
      }
      var SAME_SITE = ["strict", "lax", "none"];
      function parseSameSite(string) {
        string = string.toLowerCase();
        return SAME_SITE.includes(string) ? string : void 0;
      }
      var PRIORITY = ["low", "medium", "high"];
      function parsePriority(string) {
        string = string.toLowerCase();
        return PRIORITY.includes(string) ? string : void 0;
      }
      function splitCookiesString(cookiesString) {
        if (!cookiesString)
          return [];
        var cookiesStrings = [];
        var pos = 0;
        var start;
        var ch;
        var lastComma;
        var nextStart;
        var cookiesSeparatorFound;
        function skipWhitespace() {
          while (pos < cookiesString.length && /\s/.test(cookiesString.charAt(pos))) {
            pos += 1;
          }
          return pos < cookiesString.length;
        }
        function notSpecialChar() {
          ch = cookiesString.charAt(pos);
          return ch !== "=" && ch !== ";" && ch !== ",";
        }
        while (pos < cookiesString.length) {
          start = pos;
          cookiesSeparatorFound = false;
          while (skipWhitespace()) {
            ch = cookiesString.charAt(pos);
            if (ch === ",") {
              lastComma = pos;
              pos += 1;
              skipWhitespace();
              nextStart = pos;
              while (pos < cookiesString.length && notSpecialChar()) {
                pos += 1;
              }
              if (pos < cookiesString.length && cookiesString.charAt(pos) === "=") {
                cookiesSeparatorFound = true;
                pos = nextStart;
                cookiesStrings.push(cookiesString.substring(start, lastComma));
                start = pos;
              } else {
                pos = lastComma + 1;
              }
            } else {
              pos += 1;
            }
          }
          if (!cookiesSeparatorFound || pos >= cookiesString.length) {
            cookiesStrings.push(cookiesString.substring(start, cookiesString.length));
          }
        }
        return cookiesStrings;
      }
      var RequestCookies = class {
        constructor(requestHeaders) {
          this._parsed = /* @__PURE__ */ new Map();
          this._headers = requestHeaders;
          const header = requestHeaders.get("cookie");
          if (header) {
            const parsed = parseCookie(header);
            for (const [name, value] of parsed) {
              this._parsed.set(name, { name, value });
            }
          }
        }
        [Symbol.iterator]() {
          return this._parsed[Symbol.iterator]();
        }
        /**
         * The amount of cookies received from the client
         */
        get size() {
          return this._parsed.size;
        }
        get(...args) {
          const name = typeof args[0] === "string" ? args[0] : args[0].name;
          return this._parsed.get(name);
        }
        getAll(...args) {
          var _a;
          const all = Array.from(this._parsed);
          if (!args.length) {
            return all.map(([_, value]) => value);
          }
          const name = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
          return all.filter(([n]) => n === name).map(([_, value]) => value);
        }
        has(name) {
          return this._parsed.has(name);
        }
        set(...args) {
          const [name, value] = args.length === 1 ? [args[0].name, args[0].value] : args;
          const map = this._parsed;
          map.set(name, { name, value });
          this._headers.set(
            "cookie",
            Array.from(map).map(([_, value2]) => stringifyCookie(value2)).join("; ")
          );
          return this;
        }
        /**
         * Delete the cookies matching the passed name or names in the request.
         */
        delete(names) {
          const map = this._parsed;
          const result = !Array.isArray(names) ? map.delete(names) : names.map((name) => map.delete(name));
          this._headers.set(
            "cookie",
            Array.from(map).map(([_, value]) => stringifyCookie(value)).join("; ")
          );
          return result;
        }
        /**
         * Delete all the cookies in the cookies in the request.
         */
        clear() {
          this.delete(Array.from(this._parsed.keys()));
          return this;
        }
        /**
         * Format the cookies in the request as a string for logging
         */
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return `RequestCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map((v) => `${v.name}=${encodeURIComponent(v.value)}`).join("; ");
        }
      };
      var ResponseCookies = class {
        constructor(responseHeaders) {
          this._parsed = /* @__PURE__ */ new Map();
          var _a, _b, _c;
          this._headers = responseHeaders;
          const setCookie = (_c = (_b = (_a = responseHeaders.getSetCookie) == null ? void 0 : _a.call(responseHeaders)) != null ? _b : responseHeaders.get("set-cookie")) != null ? _c : [];
          const cookieStrings = Array.isArray(setCookie) ? setCookie : splitCookiesString(setCookie);
          for (const cookieString of cookieStrings) {
            const parsed = parseSetCookie(cookieString);
            if (parsed)
              this._parsed.set(parsed.name, parsed);
          }
        }
        /**
         * {@link https://wicg.github.io/cookie-store/#CookieStore-get CookieStore#get} without the Promise.
         */
        get(...args) {
          const key = typeof args[0] === "string" ? args[0] : args[0].name;
          return this._parsed.get(key);
        }
        /**
         * {@link https://wicg.github.io/cookie-store/#CookieStore-getAll CookieStore#getAll} without the Promise.
         */
        getAll(...args) {
          var _a;
          const all = Array.from(this._parsed.values());
          if (!args.length) {
            return all;
          }
          const key = typeof args[0] === "string" ? args[0] : (_a = args[0]) == null ? void 0 : _a.name;
          return all.filter((c) => c.name === key);
        }
        has(name) {
          return this._parsed.has(name);
        }
        /**
         * {@link https://wicg.github.io/cookie-store/#CookieStore-set CookieStore#set} without the Promise.
         */
        set(...args) {
          const [name, value, cookie] = args.length === 1 ? [args[0].name, args[0].value, args[0]] : args;
          const map = this._parsed;
          map.set(name, normalizeCookie({ name, value, ...cookie }));
          replace(map, this._headers);
          return this;
        }
        /**
         * {@link https://wicg.github.io/cookie-store/#CookieStore-delete CookieStore#delete} without the Promise.
         */
        delete(...args) {
          const [name, options] = typeof args[0] === "string" ? [args[0]] : [args[0].name, args[0]];
          return this.set({ ...options, name, value: "", expires: /* @__PURE__ */ new Date(0) });
        }
        [/* @__PURE__ */ Symbol.for("edge-runtime.inspect.custom")]() {
          return `ResponseCookies ${JSON.stringify(Object.fromEntries(this._parsed))}`;
        }
        toString() {
          return [...this._parsed.values()].map(stringifyCookie).join("; ");
        }
      };
      function replace(bag, headers) {
        headers.delete("set-cookie");
        for (const [, value] of bag) {
          const serialized = stringifyCookie(value);
          headers.append("set-cookie", serialized);
        }
      }
      function normalizeCookie(cookie = { name: "", value: "" }) {
        if (typeof cookie.expires === "number") {
          cookie.expires = new Date(cookie.expires);
        }
        if (cookie.maxAge) {
          cookie.expires = new Date(Date.now() + cookie.maxAge * 1e3);
        }
        if (cookie.path === null || cookie.path === void 0) {
          cookie.path = "/";
        }
        return cookie;
      }
    }
  });

  // node_modules/next/dist/server/web/spec-extension/cookies.js
  var require_cookies2 = __commonJS({
    "node_modules/next/dist/server/web/spec-extension/cookies.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        RequestCookies: function() {
          return _cookies.RequestCookies;
        },
        ResponseCookies: function() {
          return _cookies.ResponseCookies;
        },
        stringifyCookie: function() {
          return _cookies.stringifyCookie;
        }
      });
      var _cookies = require_cookies();
    }
  });

  // node_modules/next/dist/server/web/spec-extension/adapters/reflect.js
  var require_reflect = __commonJS({
    "node_modules/next/dist/server/web/spec-extension/adapters/reflect.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "ReflectAdapter", {
        enumerable: true,
        get: function() {
          return ReflectAdapter;
        }
      });
      var ReflectAdapter = class {
        static get(target, prop, receiver) {
          const value = Reflect.get(target, prop, receiver);
          if (typeof value === "function") {
            return value.bind(target);
          }
          return value;
        }
        static set(target, prop, value, receiver) {
          return Reflect.set(target, prop, value, receiver);
        }
        static has(target, prop) {
          return Reflect.has(target, prop);
        }
        static deleteProperty(target, prop) {
          return Reflect.deleteProperty(target, prop);
        }
      };
    }
  });

  // node_modules/next/dist/shared/lib/action-revalidation-kind.js
  var require_action_revalidation_kind = __commonJS({
    "node_modules/next/dist/shared/lib/action-revalidation-kind.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        ActionDidNotRevalidate: function() {
          return ActionDidNotRevalidate;
        },
        ActionDidRevalidateDynamicOnly: function() {
          return ActionDidRevalidateDynamicOnly;
        },
        ActionDidRevalidateStaticAndDynamic: function() {
          return ActionDidRevalidateStaticAndDynamic;
        }
      });
      var ActionDidNotRevalidate = 0;
      var ActionDidRevalidateStaticAndDynamic = 1;
      var ActionDidRevalidateDynamicOnly = 2;
    }
  });

  // node_modules/next/dist/server/web/spec-extension/adapters/request-cookies.js
  var require_request_cookies = __commonJS({
    "node_modules/next/dist/server/web/spec-extension/adapters/request-cookies.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        MutableRequestCookiesAdapter: function() {
          return MutableRequestCookiesAdapter;
        },
        ReadonlyRequestCookiesError: function() {
          return ReadonlyRequestCookiesError;
        },
        RequestCookiesAdapter: function() {
          return RequestCookiesAdapter;
        },
        appendMutableCookies: function() {
          return appendMutableCookies;
        },
        areCookiesMutableInCurrentPhase: function() {
          return areCookiesMutableInCurrentPhase;
        },
        createCookiesWithMutableAccessCheck: function() {
          return createCookiesWithMutableAccessCheck;
        },
        getModifiedCookieValues: function() {
          return getModifiedCookieValues;
        },
        responseCookiesToRequestCookies: function() {
          return responseCookiesToRequestCookies;
        }
      });
      var _cookies = require_cookies2();
      var _reflect = require_reflect();
      var _workasyncstorageexternal = require_work_async_storage_external();
      var _actionrevalidationkind = require_action_revalidation_kind();
      var ReadonlyRequestCookiesError = class _ReadonlyRequestCookiesError extends Error {
        constructor() {
          super("Cookies can only be modified in a Server Action or Route Handler. Read more: https://nextjs.org/docs/app/api-reference/functions/cookies#options");
        }
        static callable() {
          throw new _ReadonlyRequestCookiesError();
        }
      };
      var RequestCookiesAdapter = class {
        static seal(cookies) {
          return new Proxy(cookies, {
            get(target, prop, receiver) {
              switch (prop) {
                case "clear":
                case "delete":
                case "set":
                  return ReadonlyRequestCookiesError.callable;
                default:
                  return _reflect.ReflectAdapter.get(target, prop, receiver);
              }
            }
          });
        }
      };
      var SYMBOL_MODIFY_COOKIE_VALUES = /* @__PURE__ */ Symbol.for("next.mutated.cookies");
      function getModifiedCookieValues(cookies) {
        const modified = cookies[SYMBOL_MODIFY_COOKIE_VALUES];
        if (!modified || !Array.isArray(modified) || modified.length === 0) {
          return [];
        }
        return modified;
      }
      function appendMutableCookies(headers, mutableCookies) {
        const modifiedCookieValues = getModifiedCookieValues(mutableCookies);
        if (modifiedCookieValues.length === 0) {
          return false;
        }
        const resCookies = new _cookies.ResponseCookies(headers);
        const returnedCookies = resCookies.getAll();
        for (const cookie of modifiedCookieValues) {
          resCookies.set(cookie);
        }
        for (const cookie of returnedCookies) {
          resCookies.set(cookie);
        }
        return true;
      }
      var MutableRequestCookiesAdapter = class {
        static wrap(cookies, onUpdateCookies) {
          const responseCookies = new _cookies.ResponseCookies(new Headers());
          for (const cookie of cookies.getAll()) {
            responseCookies.set(cookie);
          }
          let modifiedValues = [];
          const modifiedCookies = /* @__PURE__ */ new Set();
          const updateResponseCookies = () => {
            const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
            if (workStore) {
              workStore.pathWasRevalidated = _actionrevalidationkind.ActionDidRevalidateStaticAndDynamic;
            }
            const allCookies = responseCookies.getAll();
            modifiedValues = allCookies.filter((c) => modifiedCookies.has(c.name));
            if (onUpdateCookies) {
              const serializedCookies = [];
              for (const cookie of modifiedValues) {
                const tempCookies = new _cookies.ResponseCookies(new Headers());
                tempCookies.set(cookie);
                serializedCookies.push(tempCookies.toString());
              }
              onUpdateCookies(serializedCookies);
            }
          };
          const wrappedCookies = new Proxy(responseCookies, {
            get(target, prop, receiver) {
              switch (prop) {
                // A special symbol to get the modified cookie values
                case SYMBOL_MODIFY_COOKIE_VALUES:
                  return modifiedValues;
                // TODO: Throw error if trying to set a cookie after the response
                // headers have been set.
                case "delete":
                  return function(...args) {
                    modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                    try {
                      target.delete(...args);
                      return wrappedCookies;
                    } finally {
                      updateResponseCookies();
                    }
                  };
                case "set":
                  return function(...args) {
                    modifiedCookies.add(typeof args[0] === "string" ? args[0] : args[0].name);
                    try {
                      target.set(...args);
                      return wrappedCookies;
                    } finally {
                      updateResponseCookies();
                    }
                  };
                default:
                  return _reflect.ReflectAdapter.get(target, prop, receiver);
              }
            }
          });
          return wrappedCookies;
        }
      };
      function createCookiesWithMutableAccessCheck(requestStore) {
        const wrappedCookies = new Proxy(requestStore.mutableCookies, {
          get(target, prop, receiver) {
            switch (prop) {
              case "delete":
                return function(...args) {
                  ensureCookiesAreStillMutable(requestStore, "cookies().delete");
                  target.delete(...args);
                  return wrappedCookies;
                };
              case "set":
                return function(...args) {
                  ensureCookiesAreStillMutable(requestStore, "cookies().set");
                  target.set(...args);
                  return wrappedCookies;
                };
              default:
                return _reflect.ReflectAdapter.get(target, prop, receiver);
            }
          }
        });
        return wrappedCookies;
      }
      function areCookiesMutableInCurrentPhase(requestStore) {
        return requestStore.phase === "action";
      }
      function ensureCookiesAreStillMutable(requestStore, _callingExpression) {
        if (!areCookiesMutableInCurrentPhase(requestStore)) {
          throw new ReadonlyRequestCookiesError();
        }
      }
      function responseCookiesToRequestCookies(responseCookies) {
        const requestCookies = new _cookies.RequestCookies(new Headers());
        for (const cookie of responseCookies.getAll()) {
          requestCookies.set(cookie);
        }
        return requestCookies;
      }
    }
  });

  // node_modules/next/dist/server/web/spec-extension/adapters/headers.js
  var require_headers = __commonJS({
    "node_modules/next/dist/server/web/spec-extension/adapters/headers.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        HeadersAdapter: function() {
          return HeadersAdapter;
        },
        ReadonlyHeadersError: function() {
          return ReadonlyHeadersError;
        }
      });
      var _reflect = require_reflect();
      var ReadonlyHeadersError = class _ReadonlyHeadersError extends Error {
        constructor() {
          super("Headers cannot be modified. Read more: https://nextjs.org/docs/app/api-reference/functions/headers");
        }
        static callable() {
          throw new _ReadonlyHeadersError();
        }
      };
      var HeadersAdapter = class _HeadersAdapter extends Headers {
        constructor(headers) {
          super();
          this.headers = new Proxy(headers, {
            get(target, prop, receiver) {
              if (typeof prop === "symbol") {
                return _reflect.ReflectAdapter.get(target, prop, receiver);
              }
              const lowercased = prop.toLowerCase();
              const original = Object.keys(headers).find((o) => o.toLowerCase() === lowercased);
              if (typeof original === "undefined") return;
              return _reflect.ReflectAdapter.get(target, original, receiver);
            },
            set(target, prop, value, receiver) {
              if (typeof prop === "symbol") {
                return _reflect.ReflectAdapter.set(target, prop, value, receiver);
              }
              const lowercased = prop.toLowerCase();
              const original = Object.keys(headers).find((o) => o.toLowerCase() === lowercased);
              return _reflect.ReflectAdapter.set(target, original ?? prop, value, receiver);
            },
            has(target, prop) {
              if (typeof prop === "symbol") return _reflect.ReflectAdapter.has(target, prop);
              const lowercased = prop.toLowerCase();
              const original = Object.keys(headers).find((o) => o.toLowerCase() === lowercased);
              if (typeof original === "undefined") return false;
              return _reflect.ReflectAdapter.has(target, original);
            },
            deleteProperty(target, prop) {
              if (typeof prop === "symbol") return _reflect.ReflectAdapter.deleteProperty(target, prop);
              const lowercased = prop.toLowerCase();
              const original = Object.keys(headers).find((o) => o.toLowerCase() === lowercased);
              if (typeof original === "undefined") return true;
              return _reflect.ReflectAdapter.deleteProperty(target, original);
            }
          });
        }
        /**
        * Seals a Headers instance to prevent modification by throwing an error when
        * any mutating method is called.
        */
        static seal(headers) {
          return new Proxy(headers, {
            get(target, prop, receiver) {
              switch (prop) {
                case "append":
                case "delete":
                case "set":
                  return ReadonlyHeadersError.callable;
                default:
                  return _reflect.ReflectAdapter.get(target, prop, receiver);
              }
            }
          });
        }
        /**
        * Merges a header value into a string. This stores multiple values as an
        * array, so we need to merge them into a string.
        *
        * @param value a header value
        * @returns a merged header value (a string)
        */
        merge(value) {
          if (Array.isArray(value)) return value.join(", ");
          return value;
        }
        /**
        * Creates a Headers instance from a plain object or a Headers instance.
        *
        * @param headers a plain object or a Headers instance
        * @returns a headers instance
        */
        static from(headers) {
          if (headers instanceof Headers) return headers;
          return new _HeadersAdapter(headers);
        }
        append(name, value) {
          const existing = this.headers[name];
          if (typeof existing === "string") {
            this.headers[name] = [
              existing,
              value
            ];
          } else if (Array.isArray(existing)) {
            existing.push(value);
          } else {
            this.headers[name] = value;
          }
        }
        delete(name) {
          delete this.headers[name];
        }
        get(name) {
          const value = this.headers[name];
          if (typeof value !== "undefined") return this.merge(value);
          return null;
        }
        has(name) {
          return typeof this.headers[name] !== "undefined";
        }
        set(name, value) {
          this.headers[name] = value;
        }
        forEach(callbackfn, thisArg) {
          for (const [name, value] of this.entries()) {
            callbackfn.call(thisArg, value, name, this);
          }
        }
        *entries() {
          for (const key of Object.keys(this.headers)) {
            const name = key.toLowerCase();
            const value = this.get(name);
            yield [
              name,
              value
            ];
          }
        }
        *keys() {
          for (const key of Object.keys(this.headers)) {
            const name = key.toLowerCase();
            yield name;
          }
        }
        *values() {
          for (const key of Object.keys(this.headers)) {
            const value = this.get(key);
            yield value;
          }
        }
        [Symbol.iterator]() {
          return this.entries();
        }
      };
    }
  });

  // node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js
  var require_ensure_leading_slash = __commonJS({
    "node_modules/next/dist/shared/lib/page-path/ensure-leading-slash.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "ensureLeadingSlash", {
        enumerable: true,
        get: function() {
          return ensureLeadingSlash;
        }
      });
      function ensureLeadingSlash(path) {
        return path.startsWith("/") ? path : `/${path}`;
      }
    }
  });

  // node_modules/next/dist/shared/lib/router/utils/app-paths.js
  var require_app_paths = __commonJS({
    "node_modules/next/dist/shared/lib/router/utils/app-paths.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        compareAppPaths: function() {
          return compareAppPaths;
        },
        normalizeAppPath: function() {
          return normalizeAppPath;
        },
        normalizeRscURL: function() {
          return normalizeRscURL;
        }
      });
      var _ensureleadingslash = require_ensure_leading_slash();
      var _segment = require_segment();
      function normalizeAppPath(route) {
        return (0, _ensureleadingslash.ensureLeadingSlash)(route.split("/").reduce((pathname, segment, index, segments) => {
          if (!segment) {
            return pathname;
          }
          if ((0, _segment.isGroupSegment)(segment)) {
            return pathname;
          }
          if (segment[0] === "@") {
            return pathname;
          }
          if ((segment === "page" || segment === "route") && index === segments.length - 1) {
            return pathname;
          }
          return `${pathname}/${segment}`;
        }, ""));
      }
      function compareAppPaths(a, b) {
        const aHasSlot = a.includes("/@");
        const bHasSlot = b.includes("/@");
        if (aHasSlot && !bHasSlot) return -1;
        if (!aHasSlot && bHasSlot) return 1;
        return a.localeCompare(b);
      }
      function normalizeRscURL(url) {
        return url.replace(
          /\.rsc($|\?)/,
          // $1 ensures `?` is preserved
          "$1"
        );
      }
    }
  });

  // node_modules/next/dist/shared/lib/router/utils/interception-routes.js
  var require_interception_routes = __commonJS({
    "node_modules/next/dist/shared/lib/router/utils/interception-routes.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        INTERCEPTION_ROUTE_MARKERS: function() {
          return INTERCEPTION_ROUTE_MARKERS;
        },
        extractInterceptionRouteInformation: function() {
          return extractInterceptionRouteInformation;
        },
        isInterceptionRouteAppPath: function() {
          return isInterceptionRouteAppPath;
        }
      });
      var _apppaths = require_app_paths();
      var INTERCEPTION_ROUTE_MARKERS = [
        "(..)(..)",
        "(.)",
        "(..)",
        "(...)"
      ];
      function isInterceptionRouteAppPath(path) {
        return path.split("/").find((segment) => INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m))) !== void 0;
      }
      function extractInterceptionRouteInformation(path) {
        let interceptingRoute;
        let marker;
        let interceptedRoute;
        for (const segment of path.split("/")) {
          marker = INTERCEPTION_ROUTE_MARKERS.find((m) => segment.startsWith(m));
          if (marker) {
            ;
            [interceptingRoute, interceptedRoute] = path.split(marker, 2);
            break;
          }
        }
        if (!interceptingRoute || !marker || !interceptedRoute) {
          throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Must be in the format /<intercepting route>/(..|...|..)(..)/<intercepted route>`), "__NEXT_ERROR_CODE", {
            value: "E269",
            enumerable: false,
            configurable: true
          });
        }
        interceptingRoute = (0, _apppaths.normalizeAppPath)(interceptingRoute);
        switch (marker) {
          case "(.)":
            if (interceptingRoute === "/") {
              interceptedRoute = `/${interceptedRoute}`;
            } else {
              interceptedRoute = interceptingRoute + "/" + interceptedRoute;
            }
            break;
          case "(..)":
            if (interceptingRoute === "/") {
              throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..) marker at the root level, use (.) instead.`), "__NEXT_ERROR_CODE", {
                value: "E207",
                enumerable: false,
                configurable: true
              });
            }
            interceptedRoute = interceptingRoute.split("/").slice(0, -1).concat(interceptedRoute).join("/");
            break;
          case "(...)":
            interceptedRoute = "/" + interceptedRoute;
            break;
          case "(..)(..)":
            const splitInterceptingRoute = interceptingRoute.split("/");
            if (splitInterceptingRoute.length <= 2) {
              throw Object.defineProperty(new Error(`Invalid interception route: ${path}. Cannot use (..)(..) marker at the root level or one level up.`), "__NEXT_ERROR_CODE", {
                value: "E486",
                enumerable: false,
                configurable: true
              });
            }
            interceptedRoute = splitInterceptingRoute.slice(0, -2).concat(interceptedRoute).join("/");
            break;
          default:
            throw Object.defineProperty(new Error("Invariant: unexpected marker"), "__NEXT_ERROR_CODE", {
              value: "E112",
              enumerable: false,
              configurable: true
            });
        }
        return {
          interceptingRoute,
          interceptedRoute
        };
      }
    }
  });

  // node_modules/next/dist/shared/lib/router/utils/get-segment-param.js
  var require_get_segment_param = __commonJS({
    "node_modules/next/dist/shared/lib/router/utils/get-segment-param.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        getParamProperties: function() {
          return getParamProperties;
        },
        getSegmentParam: function() {
          return getSegmentParam;
        },
        isCatchAll: function() {
          return isCatchAll;
        }
      });
      var _interceptionroutes = require_interception_routes();
      function getSegmentParam(segment) {
        const interceptionMarker = _interceptionroutes.INTERCEPTION_ROUTE_MARKERS.find((marker) => segment.startsWith(marker));
        if (interceptionMarker) {
          segment = segment.slice(interceptionMarker.length);
        }
        if (segment.startsWith("[[...") && segment.endsWith("]]")) {
          return {
            // TODO-APP: Optional catchall does not currently work with parallel routes,
            // so for now aren't handling a potential interception marker.
            paramType: "optional-catchall",
            paramName: segment.slice(5, -2)
          };
        }
        if (segment.startsWith("[...") && segment.endsWith("]")) {
          return {
            paramType: interceptionMarker ? `catchall-intercepted-${interceptionMarker}` : "catchall",
            paramName: segment.slice(4, -1)
          };
        }
        if (segment.startsWith("[") && segment.endsWith("]")) {
          return {
            paramType: interceptionMarker ? `dynamic-intercepted-${interceptionMarker}` : "dynamic",
            paramName: segment.slice(1, -1)
          };
        }
        return null;
      }
      function isCatchAll(type) {
        return type === "catchall" || type === "catchall-intercepted-(..)(..)" || type === "catchall-intercepted-(.)" || type === "catchall-intercepted-(..)" || type === "catchall-intercepted-(...)" || type === "optional-catchall";
      }
      function getParamProperties(paramType) {
        let repeat = false;
        let optional = false;
        switch (paramType) {
          case "catchall":
          case "catchall-intercepted-(..)(..)":
          case "catchall-intercepted-(.)":
          case "catchall-intercepted-(..)":
          case "catchall-intercepted-(...)":
            repeat = true;
            break;
          case "optional-catchall":
            repeat = true;
            optional = true;
            break;
          case "dynamic":
          case "dynamic-intercepted-(..)(..)":
          case "dynamic-intercepted-(.)":
          case "dynamic-intercepted-(..)":
          case "dynamic-intercepted-(...)":
            break;
          default:
            paramType;
        }
        return {
          repeat,
          optional
        };
      }
    }
  });

  // node_modules/next/dist/shared/lib/utils.js
  var require_utils = __commonJS({
    "node_modules/next/dist/shared/lib/utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        DecodeError: function() {
          return DecodeError;
        },
        MiddlewareNotFoundError: function() {
          return MiddlewareNotFoundError;
        },
        MissingStaticPage: function() {
          return MissingStaticPage;
        },
        NormalizeError: function() {
          return NormalizeError;
        },
        PageNotFoundError: function() {
          return PageNotFoundError;
        },
        SP: function() {
          return SP;
        },
        ST: function() {
          return ST;
        },
        WEB_VITALS: function() {
          return WEB_VITALS;
        },
        execOnce: function() {
          return execOnce;
        },
        getDisplayName: function() {
          return getDisplayName;
        },
        getLocationOrigin: function() {
          return getLocationOrigin;
        },
        getURL: function() {
          return getURL;
        },
        isAbsoluteUrl: function() {
          return isAbsoluteUrl;
        },
        isResSent: function() {
          return isResSent;
        },
        loadGetInitialProps: function() {
          return loadGetInitialProps;
        },
        normalizeRepeatedSlashes: function() {
          return normalizeRepeatedSlashes;
        },
        stringifyError: function() {
          return stringifyError;
        }
      });
      var WEB_VITALS = [
        "CLS",
        "FCP",
        "FID",
        "INP",
        "LCP",
        "TTFB"
      ];
      function execOnce(fn) {
        let used = false;
        let result;
        return (...args) => {
          if (!used) {
            used = true;
            result = fn(...args);
          }
          return result;
        };
      }
      var ABSOLUTE_URL_REGEX = /^[a-zA-Z][a-zA-Z\d+\-.]*?:/;
      var isAbsoluteUrl = (url) => ABSOLUTE_URL_REGEX.test(url);
      function getLocationOrigin() {
        const { protocol, hostname, port } = window.location;
        return `${protocol}//${hostname}${port ? ":" + port : ""}`;
      }
      function getURL() {
        const { href } = window.location;
        const origin = getLocationOrigin();
        return href.substring(origin.length);
      }
      function getDisplayName(Component) {
        return typeof Component === "string" ? Component : Component.displayName || Component.name || "Unknown";
      }
      function isResSent(res) {
        return res.finished || res.headersSent;
      }
      function normalizeRepeatedSlashes(url) {
        const urlParts = url.split("?");
        const urlNoQuery = urlParts[0];
        return urlNoQuery.replace(/\\/g, "/").replace(/\/\/+/g, "/") + (urlParts[1] ? `?${urlParts.slice(1).join("?")}` : "");
      }
      async function loadGetInitialProps(App, ctx) {
        if (true) {
          if (App.prototype?.getInitialProps) {
            const message = `"${getDisplayName(App)}.getInitialProps()" is defined as an instance method - visit https://nextjs.org/docs/messages/get-initial-props-as-an-instance-method for more information.`;
            throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
              value: "E1035",
              enumerable: false,
              configurable: true
            });
          }
        }
        const res = ctx.res || ctx.ctx && ctx.ctx.res;
        if (!App.getInitialProps) {
          if (ctx.ctx && ctx.Component) {
            return {
              pageProps: await loadGetInitialProps(ctx.Component, ctx.ctx)
            };
          }
          return {};
        }
        const props = await App.getInitialProps(ctx);
        if (res && isResSent(res)) {
          return props;
        }
        if (!props) {
          const message = `"${getDisplayName(App)}.getInitialProps()" should resolve to an object. But found "${props}" instead.`;
          throw Object.defineProperty(new Error(message), "__NEXT_ERROR_CODE", {
            value: "E1025",
            enumerable: false,
            configurable: true
          });
        }
        if (true) {
          if (Object.keys(props).length === 0 && !ctx.ctx) {
            console.warn(`${getDisplayName(App)} returned an empty object from \`getInitialProps\`. This de-optimizes and prevents automatic static optimization. https://nextjs.org/docs/messages/empty-object-getInitialProps`);
          }
        }
        return props;
      }
      var SP = typeof performance !== "undefined";
      var ST = SP && [
        "mark",
        "measure",
        "getEntriesByName"
      ].every((method) => typeof performance[method] === "function");
      var DecodeError = class extends Error {
      };
      var NormalizeError = class extends Error {
      };
      var PageNotFoundError = class extends Error {
        constructor(page) {
          super();
          this.code = "ENOENT";
          this.name = "PageNotFoundError";
          this.message = `Cannot find module for page: ${page}`;
        }
      };
      var MissingStaticPage = class extends Error {
        constructor(page, message) {
          super();
          this.message = `Failed to load static file for page: ${page} ${message}`;
        }
      };
      var MiddlewareNotFoundError = class extends Error {
        constructor() {
          super();
          this.code = "ENOENT";
          this.message = `Cannot find the middleware module`;
        }
      };
      function stringifyError(error) {
        return JSON.stringify({
          message: error.message,
          stack: error.stack
        });
      }
    }
  });

  // node_modules/next/dist/shared/lib/router/utils/querystring.js
  var require_querystring = __commonJS({
    "node_modules/next/dist/shared/lib/router/utils/querystring.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        assign: function() {
          return assign;
        },
        searchParamsToUrlQuery: function() {
          return searchParamsToUrlQuery;
        },
        urlQueryToSearchParams: function() {
          return urlQueryToSearchParams;
        }
      });
      function searchParamsToUrlQuery(searchParams) {
        const query = {};
        for (const [key, value] of searchParams.entries()) {
          const existing = query[key];
          if (typeof existing === "undefined") {
            query[key] = value;
          } else if (Array.isArray(existing)) {
            existing.push(value);
          } else {
            query[key] = [
              existing,
              value
            ];
          }
        }
        return query;
      }
      function stringifyUrlQueryParam(param) {
        if (typeof param === "string") {
          return param;
        }
        if (typeof param === "number" && !isNaN(param) || typeof param === "boolean") {
          return String(param);
        } else {
          return "";
        }
      }
      function urlQueryToSearchParams(query) {
        const searchParams = new URLSearchParams();
        for (const [key, value] of Object.entries(query)) {
          if (Array.isArray(value)) {
            for (const item of value) {
              searchParams.append(key, stringifyUrlQueryParam(item));
            }
          } else {
            searchParams.set(key, stringifyUrlQueryParam(value));
          }
        }
        return searchParams;
      }
      function assign(target, ...searchParamsList) {
        for (const searchParams of searchParamsList) {
          for (const key of searchParams.keys()) {
            target.delete(key);
          }
          for (const [key, value] of searchParams.entries()) {
            target.append(key, value);
          }
        }
        return target;
      }
    }
  });

  // node_modules/next/dist/shared/lib/router/utils/parse-relative-url.js
  var require_parse_relative_url = __commonJS({
    "node_modules/next/dist/shared/lib/router/utils/parse-relative-url.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      Object.defineProperty(exports, "parseRelativeUrl", {
        enumerable: true,
        get: function() {
          return parseRelativeUrl;
        }
      });
      var _utils = require_utils();
      var _querystring = require_querystring();
      function parseRelativeUrl(url, base, parseQuery = true) {
        const globalBase = new URL(typeof window === "undefined" ? "http://n" : (0, _utils.getLocationOrigin)());
        const resolvedBase = base ? new URL(base, globalBase) : url.startsWith(".") ? new URL(typeof window === "undefined" ? "http://n" : window.location.href) : globalBase;
        const { pathname, searchParams, search, hash, href, origin } = url.startsWith("/") ? (
          // See https://nodejs.org/api/http.html#messageurl
          // Not using `origin` to support other protocols
          new URL(`${resolvedBase.protocol}//${resolvedBase.host}${url}`)
        ) : new URL(url, resolvedBase);
        if (origin !== globalBase.origin) {
          throw Object.defineProperty(new Error(`invariant: invalid relative URL, router received ${url}`), "__NEXT_ERROR_CODE", {
            value: "E159",
            enumerable: false,
            configurable: true
          });
        }
        return {
          auth: null,
          host: null,
          hostname: null,
          pathname,
          port: null,
          protocol: null,
          query: parseQuery ? (0, _querystring.searchParamsToUrlQuery)(searchParams) : void 0,
          search,
          hash,
          href: href.slice(origin.length),
          // We don't know for relative URLs at this point since we set a custom, internal
          // base that isn't surfaced to users.
          slashes: null
        };
      }
    }
  });

  // node_modules/next/dist/server/app-render/instant-validation/instant-validation-error.js
  var require_instant_validation_error = __commonJS({
    "node_modules/next/dist/server/app-render/instant-validation/instant-validation-error.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        InstantValidationError: function() {
          return InstantValidationError;
        },
        isInstantValidationError: function() {
          return isInstantValidationError;
        }
      });
      var INSTANT_VALIDATION_ERROR_DIGEST = "INSTANT_VALIDATION_ERROR";
      function isInstantValidationError(err) {
        return !!(err && typeof err === "object" && err instanceof Error && err.digest === INSTANT_VALIDATION_ERROR_DIGEST);
      }
      var InstantValidationError = class extends Error {
        constructor(...args) {
          super(...args), this.digest = INSTANT_VALIDATION_ERROR_DIGEST;
        }
      };
    }
  });

  // node_modules/next/dist/shared/lib/utils/reflect-utils.js
  var require_reflect_utils = __commonJS({
    "node_modules/next/dist/shared/lib/utils/reflect-utils.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        describeHasCheckingStringProperty: function() {
          return describeHasCheckingStringProperty;
        },
        describeStringPropertyAccess: function() {
          return describeStringPropertyAccess;
        },
        wellKnownProperties: function() {
          return wellKnownProperties;
        }
      });
      var isDefinitelyAValidIdentifier = /^[A-Za-z_$][A-Za-z0-9_$]*$/;
      function describeStringPropertyAccess(target, prop) {
        if (isDefinitelyAValidIdentifier.test(prop)) {
          return `\`${target}.${prop}\``;
        }
        return `\`${target}[${JSON.stringify(prop)}]\``;
      }
      function describeHasCheckingStringProperty(target, prop) {
        const stringifiedProp = JSON.stringify(prop);
        return `\`Reflect.has(${target}, ${stringifiedProp})\`, \`${stringifiedProp} in ${target}\`, or similar`;
      }
      var wellKnownProperties = /* @__PURE__ */ new Set([
        "hasOwnProperty",
        "isPrototypeOf",
        "propertyIsEnumerable",
        "toString",
        "valueOf",
        "toLocaleString",
        // Promise prototype
        "then",
        "catch",
        "finally",
        // React Promise extension
        "status",
        // 'value',
        // 'error',
        // React introspection
        "displayName",
        "_debugInfo",
        // Common tested properties
        "toJSON",
        "$$typeof",
        "__esModule",
        // Tested by flight when checking for iterables
        "@@iterator"
      ]);
    }
  });

  // node_modules/next/dist/server/app-render/instant-validation/instant-samples.js
  var require_instant_samples = __commonJS({
    "node_modules/next/dist/server/app-render/instant-validation/instant-samples.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        assertRootParamInSamples: function() {
          return assertRootParamInSamples;
        },
        createCookiesFromSample: function() {
          return createCookiesFromSample;
        },
        createDraftModeForValidation: function() {
          return createDraftModeForValidation;
        },
        createExhaustiveParamsProxy: function() {
          return createExhaustiveParamsProxy;
        },
        createExhaustiveSearchParamsProxy: function() {
          return createExhaustiveSearchParamsProxy;
        },
        createExhaustiveURLSearchParamsProxy: function() {
          return createExhaustiveURLSearchParamsProxy;
        },
        createHeadersFromSample: function() {
          return createHeadersFromSample;
        },
        createRelativeURLFromSamples: function() {
          return createRelativeURLFromSamples;
        },
        createValidationSampleTracking: function() {
          return createValidationSampleTracking;
        },
        trackMissingSampleError: function() {
          return trackMissingSampleError;
        },
        trackMissingSampleErrorAndThrow: function() {
          return trackMissingSampleErrorAndThrow;
        }
      });
      var _cookies = require_cookies2();
      var _requestcookies = require_request_cookies();
      var _headers = require_headers();
      var _getsegmentparam = require_get_segment_param();
      var _parserelativeurl = require_parse_relative_url();
      var _invarianterror = require_invariant_error();
      var _instantvalidationerror = require_instant_validation_error();
      var _workunitasyncstorageexternal = require_work_unit_async_storage_external();
      var _reflectutils = require_reflect_utils();
      function createValidationSampleTracking() {
        return {
          missingSampleErrors: []
        };
      }
      function getExpectedSampleTracking() {
        let validationSampleTracking = null;
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        if (workUnitStore) {
          switch (workUnitStore.type) {
            case "request":
            case "validation-client":
              validationSampleTracking = workUnitStore.validationSampleTracking ?? null;
              break;
            case "cache":
            case "private-cache":
            case "unstable-cache":
            case "prerender-legacy":
            case "prerender-ppr":
            case "prerender-client":
            case "prerender":
            case "prerender-runtime":
            case "generate-static-params":
              break;
            default:
              workUnitStore;
          }
        }
        if (!validationSampleTracking) {
          throw Object.defineProperty(new _invarianterror.InvariantError("Expected to have a workUnitStore that provides validationSampleTracking"), "__NEXT_ERROR_CODE", {
            value: "E1110",
            enumerable: false,
            configurable: true
          });
        }
        return validationSampleTracking;
      }
      function trackMissingSampleError(error) {
        const validationSampleTracking = getExpectedSampleTracking();
        validationSampleTracking.missingSampleErrors.push(error);
      }
      function trackMissingSampleErrorAndThrow(error) {
        trackMissingSampleError(error);
        throw error;
      }
      function createCookiesFromSample(sampleCookies, route) {
        const declaredNames = /* @__PURE__ */ new Set();
        const cookies = new _cookies.RequestCookies(new Headers());
        if (sampleCookies) {
          for (const cookie of sampleCookies) {
            declaredNames.add(cookie.name);
            if (cookie.value !== null) {
              cookies.set(cookie.name, cookie.value);
            }
          }
        }
        const sealed = _requestcookies.RequestCookiesAdapter.seal(cookies);
        return new Proxy(sealed, {
          get(target, prop, receiver) {
            if (prop === "has") {
              const originalMethod = Reflect.get(target, prop, receiver);
              const wrappedMethod = function(name) {
                if (!declaredNames.has(name)) {
                  trackMissingSampleErrorAndThrow(createMissingCookieSampleError(route, name));
                }
                return originalMethod.call(target, name);
              };
              return wrappedMethod;
            }
            if (prop === "get") {
              const originalMethod = Reflect.get(target, prop, receiver);
              const wrappedMethod = function(nameOrCookie) {
                let name;
                if (typeof nameOrCookie === "string") {
                  name = nameOrCookie;
                } else if (nameOrCookie && typeof nameOrCookie === "object" && typeof nameOrCookie.name === "string") {
                  name = nameOrCookie.name;
                } else {
                  return originalMethod.call(target, nameOrCookie);
                }
                if (!declaredNames.has(name)) {
                  trackMissingSampleErrorAndThrow(createMissingCookieSampleError(route, name));
                }
                return originalMethod.call(target, name);
              };
              return wrappedMethod;
            }
            return Reflect.get(target, prop, receiver);
          }
        });
      }
      function createMissingCookieSampleError(route, name) {
        return Object.defineProperty(new _instantvalidationerror.InstantValidationError(`Route "${route}" accessed cookie "${name}" which is not defined in the \`samples\` of \`unstable_instant\`. Add it to the sample's \`cookies\` array, or \`{ name: "${name}", value: null }\` if it should be absent.`), "__NEXT_ERROR_CODE", {
          value: "E1115",
          enumerable: false,
          configurable: true
        });
      }
      function createHeadersFromSample(rawSampleHeaders, sampleCookies, route) {
        const sampleHeaders = rawSampleHeaders ? [
          ...rawSampleHeaders
        ] : [];
        if (sampleHeaders.find(([name]) => name.toLowerCase() === "cookie")) {
          throw Object.defineProperty(new _instantvalidationerror.InstantValidationError('Invalid sample: Defining cookies via a "cookie" header is not supported. Use `cookies: [{ name: ..., value: ... }]` instead.'), "__NEXT_ERROR_CODE", {
            value: "E1111",
            enumerable: false,
            configurable: true
          });
        }
        if (sampleCookies) {
          const cookieHeaderValue = sampleCookies.toString();
          sampleHeaders.push([
            "cookie",
            // if the `cookies` samples were empty, or they were all `null`, then we have no cookies,
            // and the header isn't present, but should remains readable, so we set it to null.
            cookieHeaderValue !== "" ? cookieHeaderValue : null
          ]);
        }
        const declaredNames = /* @__PURE__ */ new Set();
        const headersInit = {};
        for (const [name, value] of sampleHeaders) {
          declaredNames.add(name.toLowerCase());
          if (value !== null) {
            headersInit[name.toLowerCase()] = value;
          }
        }
        const sealed = _headers.HeadersAdapter.seal(_headers.HeadersAdapter.from(headersInit));
        return new Proxy(sealed, {
          get(target, prop, receiver) {
            if (prop === "get" || prop === "has") {
              const originalMethod = Reflect.get(target, prop, receiver);
              const patchedMethod = function(rawName) {
                const name = rawName.toLowerCase();
                if (!declaredNames.has(name)) {
                  trackMissingSampleErrorAndThrow(Object.defineProperty(new _instantvalidationerror.InstantValidationError(`Route "${route}" accessed header "${name}" which is not defined in the \`samples\` of \`unstable_instant\`. Add it to the sample's \`headers\` array, or \`["${name}", null]\` if it should be absent.`), "__NEXT_ERROR_CODE", {
                    value: "E1116",
                    enumerable: false,
                    configurable: true
                  }));
                }
                return originalMethod.call(target, name);
              };
              return patchedMethod;
            }
            return Reflect.get(target, prop, receiver);
          }
        });
      }
      function createDraftModeForValidation() {
        return {
          get isEnabled() {
            return false;
          },
          enable() {
            throw Object.defineProperty(new Error("Draft mode cannot be enabled during build-time instant validation."), "__NEXT_ERROR_CODE", {
              value: "E1092",
              enumerable: false,
              configurable: true
            });
          },
          disable() {
            throw Object.defineProperty(new Error("Draft mode cannot be disabled during build-time instant validation."), "__NEXT_ERROR_CODE", {
              value: "E1094",
              enumerable: false,
              configurable: true
            });
          }
        };
      }
      function createExhaustiveParamsProxy(underlyingParams, declaredParamNames, route) {
        return new Proxy(underlyingParams, {
          get(target, prop, receiver) {
            if (typeof prop === "string" && !_reflectutils.wellKnownProperties.has(prop) && // Only error when accessing a param that is part of the route but wasn't provided.
            // accessing properties that aren't expected to be a valid param value is fine.
            prop in underlyingParams && !declaredParamNames.has(prop)) {
              trackMissingSampleErrorAndThrow(Object.defineProperty(new _instantvalidationerror.InstantValidationError(`Route "${route}" accessed param "${prop}" which is not defined in the \`samples\` of \`unstable_instant\`. Add it to the sample's \`params\` object.`), "__NEXT_ERROR_CODE", {
                value: "E1095",
                enumerable: false,
                configurable: true
              }));
            }
            return Reflect.get(target, prop, receiver);
          }
        });
      }
      function createExhaustiveSearchParamsProxy(searchParams, declaredSearchParamNames, route) {
        return new Proxy(searchParams, {
          get(target, prop, receiver) {
            if (typeof prop === "string" && !_reflectutils.wellKnownProperties.has(prop) && !declaredSearchParamNames.has(prop)) {
              trackMissingSampleErrorAndThrow(createMissingSearchParamSampleError(route, prop));
            }
            return Reflect.get(target, prop, receiver);
          },
          has(target, prop) {
            if (typeof prop === "string" && !_reflectutils.wellKnownProperties.has(prop) && !declaredSearchParamNames.has(prop)) {
              trackMissingSampleErrorAndThrow(createMissingSearchParamSampleError(route, prop));
            }
            return Reflect.has(target, prop);
          }
        });
      }
      function createExhaustiveURLSearchParamsProxy(searchParams, declaredSearchParamNames, route) {
        return new Proxy(searchParams, {
          get(target, prop, receiver) {
            if (prop === "get" || prop === "getAll" || prop === "has") {
              const originalMathod = Reflect.get(target, prop, receiver);
              return (name) => {
                if (typeof name === "string" && !declaredSearchParamNames.has(name)) {
                  trackMissingSampleErrorAndThrow(createMissingSearchParamSampleError(route, name));
                }
                return originalMathod.call(target, name);
              };
            }
            const value = Reflect.get(target, prop, receiver);
            if (typeof value === "function" && !Object.hasOwn(target, prop)) {
              return value.bind(target);
            }
            return value;
          }
        });
      }
      function createMissingSearchParamSampleError(route, name) {
        return Object.defineProperty(new _instantvalidationerror.InstantValidationError(`Route "${route}" accessed searchParam "${name}" which is not defined in the \`samples\` of \`unstable_instant\`. Add it to the sample's \`searchParams\` object, or \`{ "${name}": null }\` if it should be absent.`), "__NEXT_ERROR_CODE", {
          value: "E1098",
          enumerable: false,
          configurable: true
        });
      }
      function createRelativeURLFromSamples(route, sampleParams, sampleSearchParams) {
        const pathname = createPathnameFromRouteAndSampleParams(route, sampleParams ?? {});
        let search = "";
        if (sampleSearchParams) {
          const qs = createURLSearchParamsFromSample(sampleSearchParams).toString();
          if (qs) {
            search = "?" + qs;
          }
        }
        return (0, _parserelativeurl.parseRelativeUrl)(pathname + search, void 0, true);
      }
      function createURLSearchParamsFromSample(sampleSearchParams) {
        const result = new URLSearchParams();
        if (sampleSearchParams) {
          for (const [key, value] of Object.entries(sampleSearchParams)) {
            if (value === null || value === void 0) continue;
            if (Array.isArray(value)) {
              for (const v of value) {
                result.append(key, v);
              }
            } else {
              result.set(key, value);
            }
          }
        }
        return result;
      }
      function createPathnameFromRouteAndSampleParams(route, params) {
        let interpolatedSegments = [];
        const rawSegments = route.split("/");
        for (const rawSegment of rawSegments) {
          const param = (0, _getsegmentparam.getSegmentParam)(rawSegment);
          if (param) {
            switch (param.paramType) {
              case "catchall":
              case "optional-catchall": {
                let paramValue = params[param.paramName];
                if (paramValue === void 0) {
                  paramValue = [
                    rawSegment
                  ];
                } else if (!Array.isArray(paramValue)) {
                  throw Object.defineProperty(new _instantvalidationerror.InstantValidationError(`Expected sample param value for segment '${rawSegment}' to be an array of strings, got ${typeof paramValue}`), "__NEXT_ERROR_CODE", {
                    value: "E1104",
                    enumerable: false,
                    configurable: true
                  });
                }
                interpolatedSegments.push(...paramValue.map((v) => encodeURIComponent(v)));
                break;
              }
              case "dynamic": {
                let paramValue = params[param.paramName];
                if (paramValue === void 0) {
                  paramValue = rawSegment;
                } else if (typeof paramValue !== "string") {
                  throw Object.defineProperty(new _instantvalidationerror.InstantValidationError(`Expected sample param value for segment '${rawSegment}' to be a string, got ${typeof paramValue}`), "__NEXT_ERROR_CODE", {
                    value: "E1108",
                    enumerable: false,
                    configurable: true
                  });
                }
                interpolatedSegments.push(encodeURIComponent(paramValue));
                break;
              }
              case "catchall-intercepted-(..)(..)":
              case "catchall-intercepted-(.)":
              case "catchall-intercepted-(..)":
              case "catchall-intercepted-(...)":
              case "dynamic-intercepted-(..)(..)":
              case "dynamic-intercepted-(.)":
              case "dynamic-intercepted-(..)":
              case "dynamic-intercepted-(...)": {
                throw Object.defineProperty(new _invarianterror.InvariantError("Not implemented: Validation of interception routes"), "__NEXT_ERROR_CODE", {
                  value: "E1106",
                  enumerable: false,
                  configurable: true
                });
              }
              default: {
                param.paramType;
              }
            }
          } else {
            interpolatedSegments.push(rawSegment);
          }
        }
        return interpolatedSegments.join("/");
      }
      function assertRootParamInSamples(workStore, sampleParams, paramName) {
        if (sampleParams && paramName in sampleParams) {
        } else {
          const route = workStore.route;
          trackMissingSampleErrorAndThrow(Object.defineProperty(new _instantvalidationerror.InstantValidationError(`Route "${route}" accessed root param "${paramName}" which is not defined in the \`samples\` of \`unstable_instant\`. Add it to the sample's \`params\` object.`), "__NEXT_ERROR_CODE", {
            value: "E1114",
            enumerable: false,
            configurable: true
          }));
        }
      }
    }
  });

  // node_modules/next/dist/server/app-render/instant-validation/instant-samples-client.js
  var require_instant_samples_client = __commonJS({
    "node_modules/next/dist/server/app-render/instant-validation/instant-samples-client.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        expectCompleteParamsInClientValidation: function() {
          return expectCompleteParamsInClientValidation;
        },
        instrumentParamsForClientValidation: function() {
          return instrumentParamsForClientValidation;
        },
        instrumentSearchParamsForClientValidation: function() {
          return instrumentSearchParamsForClientValidation;
        }
      });
      var _workunitasyncstorageexternal = require_work_unit_async_storage_external();
      var _workasyncstorageexternal = require_work_async_storage_external();
      var _instantsamples = require_instant_samples();
      var _instantvalidationerror = require_instant_validation_error();
      function instrumentParamsForClientValidation(underlyingParams) {
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        if (workStore && workUnitStore) {
          switch (workUnitStore.type) {
            case "validation-client": {
              if (workUnitStore.validationSamples) {
                const declaredKeys = new Set(Object.keys(workUnitStore.validationSamples.params ?? {}));
                return (0, _instantsamples.createExhaustiveParamsProxy)(underlyingParams, declaredKeys, workStore.route);
              }
              break;
            }
            case "prerender-runtime":
            case "prerender-client":
            case "prerender-legacy":
            case "prerender-ppr":
            case "prerender":
            case "cache":
            case "request":
            case "private-cache":
            case "unstable-cache":
            case "generate-static-params":
              break;
            default:
              workUnitStore;
          }
        }
        return underlyingParams;
      }
      function expectCompleteParamsInClientValidation(expression) {
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        if (workStore && workUnitStore) {
          switch (workUnitStore.type) {
            case "validation-client": {
              if (workUnitStore.validationSamples) {
                const fallbackParams = workUnitStore.fallbackRouteParams;
                if (fallbackParams && fallbackParams.size > 0) {
                  const missingParams = Array.from(fallbackParams.keys());
                  (0, _instantsamples.trackMissingSampleErrorAndThrow)(Object.defineProperty(new _instantvalidationerror.InstantValidationError(`Route "${workStore.route}" called ${expression} but param${missingParams.length > 1 ? "s" : ""} ${missingParams.map((p) => `"${p}"`).join(", ")} ${missingParams.length > 1 ? "are" : "is"} not defined in the \`samples\` of \`unstable_instant\`. ${expression} requires all route params to be provided.`), "__NEXT_ERROR_CODE", {
                    value: "E1109",
                    enumerable: false,
                    configurable: true
                  }));
                }
              }
              break;
            }
            case "prerender-runtime":
            case "prerender-client":
            case "prerender-legacy":
            case "prerender-ppr":
            case "prerender":
            case "cache":
            case "request":
            case "private-cache":
            case "unstable-cache":
            case "generate-static-params":
              break;
            default:
              workUnitStore;
          }
        }
      }
      function instrumentSearchParamsForClientValidation(underlyingSearchParams) {
        const workStore = _workasyncstorageexternal.workAsyncStorage.getStore();
        const workUnitStore = _workunitasyncstorageexternal.workUnitAsyncStorage.getStore();
        if (workStore && workUnitStore) {
          switch (workUnitStore.type) {
            case "validation-client": {
              if (workUnitStore.validationSamples) {
                const declaredKeys = new Set(Object.keys(workUnitStore.validationSamples.searchParams ?? {}));
                return (0, _instantsamples.createExhaustiveURLSearchParamsProxy)(underlyingSearchParams, declaredKeys, workStore.route);
              }
              break;
            }
            case "prerender-runtime":
            case "prerender-client":
            case "prerender-legacy":
            case "prerender-ppr":
            case "prerender":
            case "cache":
            case "request":
            case "private-cache":
            case "unstable-cache":
            case "generate-static-params":
              break;
            default:
              workUnitStore;
          }
        }
        return underlyingSearchParams;
      }
    }
  });

  // node_modules/next/dist/client/components/navigation.js
  var require_navigation = __commonJS({
    "node_modules/next/dist/client/components/navigation.js"(exports, module) {
      "use strict";
      Object.defineProperty(exports, "__esModule", {
        value: true
      });
      function _export(target, all) {
        for (var name in all) Object.defineProperty(target, name, {
          enumerable: true,
          get: all[name]
        });
      }
      _export(exports, {
        // We need the same class that was used to instantiate the context value
        // Otherwise instanceof checks will fail in usercode
        ReadonlyURLSearchParams: function() {
          return _hooksclientcontextsharedruntime.ReadonlyURLSearchParams;
        },
        RedirectType: function() {
          return _navigationreactserver.RedirectType;
        },
        ServerInsertedHTMLContext: function() {
          return _serverinsertedhtmlsharedruntime.ServerInsertedHTMLContext;
        },
        forbidden: function() {
          return _navigationreactserver.forbidden;
        },
        notFound: function() {
          return _navigationreactserver.notFound;
        },
        permanentRedirect: function() {
          return _navigationreactserver.permanentRedirect;
        },
        redirect: function() {
          return _navigationreactserver.redirect;
        },
        unauthorized: function() {
          return _navigationreactserver.unauthorized;
        },
        unstable_isUnrecognizedActionError: function() {
          return _unrecognizedactionerror.unstable_isUnrecognizedActionError;
        },
        unstable_rethrow: function() {
          return _navigationreactserver.unstable_rethrow;
        },
        useParams: function() {
          return useParams;
        },
        usePathname: function() {
          return usePathname;
        },
        useRouter: function() {
          return useRouter2;
        },
        useSearchParams: function() {
          return useSearchParams;
        },
        useSelectedLayoutSegment: function() {
          return useSelectedLayoutSegment;
        },
        useSelectedLayoutSegments: function() {
          return useSelectedLayoutSegments;
        },
        useServerInsertedHTML: function() {
          return _serverinsertedhtmlsharedruntime.useServerInsertedHTML;
        }
      });
      var _interop_require_wildcard = require_interop_require_wildcard();
      var _react = /* @__PURE__ */ _interop_require_wildcard._(require_react());
      var _approutercontextsharedruntime = require_app_router_context_shared_runtime();
      var _hooksclientcontextsharedruntime = require_hooks_client_context_shared_runtime();
      var _segment = require_segment();
      var _serverinsertedhtmlsharedruntime = require_server_inserted_html_shared_runtime();
      var _unrecognizedactionerror = require_unrecognized_action_error();
      var _navigationreactserver = require_navigation_react_server();
      var useDynamicRouteParams = typeof window === "undefined" ? require_dynamic_rendering().useDynamicRouteParams : void 0;
      var useDynamicSearchParams = typeof window === "undefined" ? require_dynamic_rendering().useDynamicSearchParams : void 0;
      var { instrumentParamsForClientValidation, instrumentSearchParamsForClientValidation, expectCompleteParamsInClientValidation } = typeof window === "undefined" && process.env.__NEXT_CACHE_COMPONENTS ? require_instant_samples_client() : {};
      function useSearchParams() {
        useDynamicSearchParams?.("useSearchParams()");
        const searchParams = (0, _react.useContext)(_hooksclientcontextsharedruntime.SearchParamsContext);
        const readonlySearchParams = (0, _react.useMemo)(() => {
          if (!searchParams) {
            return null;
          }
          return new _hooksclientcontextsharedruntime.ReadonlyURLSearchParams(searchParams);
        }, [
          searchParams
        ]);
        if (typeof window === "undefined" && process.env.__NEXT_CACHE_COMPONENTS && readonlySearchParams) {
          return instrumentSearchParamsForClientValidation(readonlySearchParams);
        }
        if ("use" in _react.default) {
          const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
          if (navigationPromises) {
            return (0, _react.use)(navigationPromises.searchParams);
          }
        }
        return readonlySearchParams;
      }
      function usePathname() {
        useDynamicRouteParams?.("usePathname()");
        const pathname = (0, _react.useContext)(_hooksclientcontextsharedruntime.PathnameContext);
        if (typeof window === "undefined" && process.env.__NEXT_CACHE_COMPONENTS && pathname) {
          expectCompleteParamsInClientValidation("usePathname()");
          return pathname;
        }
        if ("use" in _react.default) {
          const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
          if (navigationPromises) {
            return (0, _react.use)(navigationPromises.pathname);
          }
        }
        return pathname;
      }
      function useRouter2() {
        const router = (0, _react.useContext)(_approutercontextsharedruntime.AppRouterContext);
        if (router === null) {
          throw Object.defineProperty(new Error("invariant expected app router to be mounted"), "__NEXT_ERROR_CODE", {
            value: "E238",
            enumerable: false,
            configurable: true
          });
        }
        return router;
      }
      function useParams() {
        useDynamicRouteParams?.("useParams()");
        const params = (0, _react.useContext)(_hooksclientcontextsharedruntime.PathParamsContext);
        if (typeof window === "undefined" && process.env.__NEXT_CACHE_COMPONENTS && params) {
          return instrumentParamsForClientValidation(params);
        }
        if ("use" in _react.default) {
          const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
          if (navigationPromises) {
            return (0, _react.use)(navigationPromises.params);
          }
        }
        return params;
      }
      function useSelectedLayoutSegments(parallelRouteKey = "children") {
        useDynamicRouteParams?.("useSelectedLayoutSegments()");
        const context = (0, _react.useContext)(_approutercontextsharedruntime.LayoutRouterContext);
        if (!context) return null;
        if (typeof window === "undefined" && process.env.__NEXT_CACHE_COMPONENTS && context) {
          expectCompleteParamsInClientValidation("useSelectedLayoutSegments()");
        }
        if ("use" in _react.default) {
          const navigationPromises = (0, _react.use)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
          if (navigationPromises) {
            const promise = navigationPromises.selectedLayoutSegmentsPromises?.get(parallelRouteKey);
            if (promise) {
              return (0, _react.use)(promise);
            }
          }
        }
        return (0, _segment.getSelectedLayoutSegmentPath)(context.parentTree, parallelRouteKey);
      }
      function useSelectedLayoutSegment(parallelRouteKey = "children") {
        useDynamicRouteParams?.("useSelectedLayoutSegment()");
        const navigationPromises = (0, _react.useContext)(_hooksclientcontextsharedruntime.NavigationPromisesContext);
        const selectedLayoutSegments = useSelectedLayoutSegments(parallelRouteKey);
        if (typeof window === "undefined" && process.env.__NEXT_CACHE_COMPONENTS) {
          expectCompleteParamsInClientValidation("useSelectedLayoutSegment()");
        }
        if (navigationPromises && "use" in _react.default) {
          const promise = navigationPromises.selectedLayoutSegmentPromises?.get(parallelRouteKey);
          if (promise) {
            return (0, _react.use)(promise);
          }
        }
        return (0, _segment.computeSelectedLayoutSegment)(selectedLayoutSegments, parallelRouteKey);
      }
      if ((typeof exports.default === "function" || typeof exports.default === "object" && exports.default !== null) && typeof exports.default.__esModule === "undefined") {
        Object.defineProperty(exports.default, "__esModule", { value: true });
        Object.assign(exports.default, exports);
        module.exports = exports.default;
      }
    }
  });

  // node_modules/next/navigation.js
  var require_navigation2 = __commonJS({
    "node_modules/next/navigation.js"(exports, module) {
      module.exports = require_navigation();
    }
  });

  // node_modules/react/cjs/react-jsx-runtime.development.js
  var require_react_jsx_runtime_development = __commonJS({
    "node_modules/react/cjs/react-jsx-runtime.development.js"(exports) {
      "use strict";
      (function() {
        function getComponentNameFromType(type) {
          if (null == type) return null;
          if ("function" === typeof type)
            return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
          if ("string" === typeof type) return type;
          switch (type) {
            case REACT_FRAGMENT_TYPE:
              return "Fragment";
            case REACT_PROFILER_TYPE:
              return "Profiler";
            case REACT_STRICT_MODE_TYPE:
              return "StrictMode";
            case REACT_SUSPENSE_TYPE:
              return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
              return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
              return "Activity";
          }
          if ("object" === typeof type)
            switch ("number" === typeof type.tag && console.error(
              "Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."
            ), type.$$typeof) {
              case REACT_PORTAL_TYPE:
                return "Portal";
              case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
              case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
              case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
              case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
              case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                  return getComponentNameFromType(type(innerType));
                } catch (x) {
                }
            }
          return null;
        }
        function testStringCoercion(value) {
          return "" + value;
        }
        function checkKeyStringCoercion(value) {
          try {
            testStringCoercion(value);
            var JSCompiler_inline_result = false;
          } catch (e) {
            JSCompiler_inline_result = true;
          }
          if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(
              JSCompiler_inline_result,
              "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.",
              JSCompiler_inline_result$jscomp$0
            );
            return testStringCoercion(value);
          }
        }
        function getTaskName(type) {
          if (type === REACT_FRAGMENT_TYPE) return "<>";
          if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE)
            return "<...>";
          try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
          } catch (x) {
            return "<...>";
          }
        }
        function getOwner() {
          var dispatcher = ReactSharedInternals.A;
          return null === dispatcher ? null : dispatcher.getOwner();
        }
        function UnknownOwner() {
          return Error("react-stack-top-frame");
        }
        function hasValidKey(config) {
          if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return false;
          }
          return void 0 !== config.key;
        }
        function defineKeyPropWarningGetter(props, displayName) {
          function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = true, console.error(
              "%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)",
              displayName
            ));
          }
          warnAboutAccessingKey.isReactWarning = true;
          Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: true
          });
        }
        function elementRefGetterWithDeprecationWarning() {
          var componentName = getComponentNameFromType(this.type);
          didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = true, console.error(
            "Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."
          ));
          componentName = this.props.ref;
          return void 0 !== componentName ? componentName : null;
        }
        function ReactElement(type, key, props, owner, debugStack, debugTask) {
          var refProp = props.ref;
          type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type,
            key,
            props,
            _owner: owner
          };
          null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: false,
            get: elementRefGetterWithDeprecationWarning
          }) : Object.defineProperty(type, "ref", { enumerable: false, value: null });
          type._store = {};
          Object.defineProperty(type._store, "validated", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: 0
          });
          Object.defineProperty(type, "_debugInfo", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: null
          });
          Object.defineProperty(type, "_debugStack", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugStack
          });
          Object.defineProperty(type, "_debugTask", {
            configurable: false,
            enumerable: false,
            writable: true,
            value: debugTask
          });
          Object.freeze && (Object.freeze(type.props), Object.freeze(type));
          return type;
        }
        function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
          var children = config.children;
          if (void 0 !== children)
            if (isStaticChildren)
              if (isArrayImpl(children)) {
                for (isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)
                  validateChildKeys(children[isStaticChildren]);
                Object.freeze && Object.freeze(children);
              } else
                console.error(
                  "React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead."
                );
            else validateChildKeys(children);
          if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
              return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error(
              'A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />',
              isStaticChildren,
              children,
              keys,
              children
            ), didWarnAboutKeySpread[children + isStaticChildren] = true);
          }
          children = null;
          void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
          hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
          if ("key" in config) {
            maybeKey = {};
            for (var propName in config)
              "key" !== propName && (maybeKey[propName] = config[propName]);
          } else maybeKey = config;
          children && defineKeyPropWarningGetter(
            maybeKey,
            "function" === typeof type ? type.displayName || type.name || "Unknown" : type
          );
          return ReactElement(
            type,
            children,
            maybeKey,
            getOwner(),
            debugStack,
            debugTask
          );
        }
        function validateChildKeys(node) {
          isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
        }
        function isValidElement(object) {
          return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
        }
        var React = require_react(), REACT_ELEMENT_TYPE = /* @__PURE__ */ Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = /* @__PURE__ */ Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = /* @__PURE__ */ Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = /* @__PURE__ */ Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = /* @__PURE__ */ Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = /* @__PURE__ */ Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = /* @__PURE__ */ Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = /* @__PURE__ */ Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = /* @__PURE__ */ Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = /* @__PURE__ */ Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = /* @__PURE__ */ Symbol.for("react.memo"), REACT_LAZY_TYPE = /* @__PURE__ */ Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = /* @__PURE__ */ Symbol.for("react.activity"), REACT_CLIENT_REFERENCE = /* @__PURE__ */ Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
          return null;
        };
        React = {
          react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
          }
        };
        var specialPropKeyWarningShown;
        var didWarnAboutElementRef = {};
        var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(
          React,
          UnknownOwner
        )();
        var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
        var didWarnAboutKeySpread = {};
        exports.Fragment = REACT_FRAGMENT_TYPE;
        exports.jsx = function(type, config, maybeKey) {
          var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return jsxDEVImpl(
            type,
            config,
            maybeKey,
            false,
            trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
        exports.jsxs = function(type, config, maybeKey) {
          var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
          return jsxDEVImpl(
            type,
            config,
            maybeKey,
            true,
            trackActualOwner ? Error("react-stack-top-frame") : unknownOwnerDebugStack,
            trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask
          );
        };
      })();
    }
  });

  // node_modules/react/jsx-runtime.js
  var require_jsx_runtime = __commonJS({
    "node_modules/react/jsx-runtime.js"(exports, module) {
      "use strict";
      if (false) {
        module.exports = null;
      } else {
        module.exports = require_react_jsx_runtime_development();
      }
    }
  });

  // app/admin/dashboard/page.tsx
  var import_react4 = __toESM(require_react());
  var import_navigation = __toESM(require_navigation2());

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var import_react3 = __toESM(require_react());

  // node_modules/lucide-react/dist/esm/shared/src/utils/mergeClasses.js
  var mergeClasses = (...classes) => classes.filter((className, index, array) => {
    return Boolean(className) && className.trim() !== "" && array.indexOf(className) === index;
  }).join(" ").trim();

  // node_modules/lucide-react/dist/esm/shared/src/utils/toKebabCase.js
  var toKebabCase = (string) => string.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();

  // node_modules/lucide-react/dist/esm/shared/src/utils/toCamelCase.js
  var toCamelCase = (string) => string.replace(
    /^([A-Z])|[\s-_]+(\w)/g,
    (match, p1, p2) => p2 ? p2.toUpperCase() : p1.toLowerCase()
  );

  // node_modules/lucide-react/dist/esm/shared/src/utils/toPascalCase.js
  var toPascalCase = (string) => {
    const camelCase = toCamelCase(string);
    return camelCase.charAt(0).toUpperCase() + camelCase.slice(1);
  };

  // node_modules/lucide-react/dist/esm/Icon.js
  var import_react2 = __toESM(require_react());

  // node_modules/lucide-react/dist/esm/defaultAttributes.js
  var defaultAttributes = {
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 2,
    strokeLinecap: "round",
    strokeLinejoin: "round"
  };

  // node_modules/lucide-react/dist/esm/shared/src/utils/hasA11yProp.js
  var hasA11yProp = (props) => {
    for (const prop in props) {
      if (prop.startsWith("aria-") || prop === "role" || prop === "title") {
        return true;
      }
    }
    return false;
  };

  // node_modules/lucide-react/dist/esm/context.js
  var import_react = __toESM(require_react());
  var LucideContext = (0, import_react.createContext)({});
  var useLucideContext = () => (0, import_react.useContext)(LucideContext);

  // node_modules/lucide-react/dist/esm/Icon.js
  var Icon = (0, import_react2.forwardRef)(
    ({ color, size, strokeWidth, absoluteStrokeWidth, className = "", children, iconNode, ...rest }, ref) => {
      const {
        size: contextSize = 24,
        strokeWidth: contextStrokeWidth = 2,
        absoluteStrokeWidth: contextAbsoluteStrokeWidth = false,
        color: contextColor = "currentColor",
        className: contextClass = ""
      } = useLucideContext() ?? {};
      const calculatedStrokeWidth = absoluteStrokeWidth ?? contextAbsoluteStrokeWidth ? Number(strokeWidth ?? contextStrokeWidth) * 24 / Number(size ?? contextSize) : strokeWidth ?? contextStrokeWidth;
      return (0, import_react2.createElement)(
        "svg",
        {
          ref,
          ...defaultAttributes,
          width: size ?? contextSize ?? defaultAttributes.width,
          height: size ?? contextSize ?? defaultAttributes.height,
          stroke: color ?? contextColor,
          strokeWidth: calculatedStrokeWidth,
          className: mergeClasses("lucide", contextClass, className),
          ...!children && !hasA11yProp(rest) && { "aria-hidden": "true" },
          ...rest
        },
        [
          ...iconNode.map(([tag, attrs]) => (0, import_react2.createElement)(tag, attrs)),
          ...Array.isArray(children) ? children : [children]
        ]
      );
    }
  );

  // node_modules/lucide-react/dist/esm/createLucideIcon.js
  var createLucideIcon = (iconName, iconNode) => {
    const Component = (0, import_react3.forwardRef)(
      ({ className, ...props }, ref) => (0, import_react3.createElement)(Icon, {
        ref,
        iconNode,
        className: mergeClasses(
          `lucide-${toKebabCase(toPascalCase(iconName))}`,
          `lucide-${iconName}`,
          className
        ),
        ...props
      })
    );
    Component.displayName = toPascalCase(iconName);
    return Component;
  };

  // node_modules/lucide-react/dist/esm/icons/building-2.js
  var __iconNode = [
    ["path", { d: "M10 12h4", key: "a56b0p" }],
    ["path", { d: "M10 8h4", key: "1sr2af" }],
    ["path", { d: "M14 21v-3a2 2 0 0 0-4 0v3", key: "1rgiei" }],
    [
      "path",
      {
        d: "M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2",
        key: "secmi2"
      }
    ],
    ["path", { d: "M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16", key: "16ra0t" }]
  ];
  var Building2 = createLucideIcon("building-2", __iconNode);

  // node_modules/lucide-react/dist/esm/icons/calendar.js
  var __iconNode2 = [
    ["path", { d: "M8 2v4", key: "1cmpym" }],
    ["path", { d: "M16 2v4", key: "4m81vk" }],
    ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
    ["path", { d: "M3 10h18", key: "8toen8" }]
  ];
  var Calendar = createLucideIcon("calendar", __iconNode2);

  // node_modules/lucide-react/dist/esm/icons/chart-column.js
  var __iconNode3 = [
    ["path", { d: "M3 3v16a2 2 0 0 0 2 2h16", key: "c24i48" }],
    ["path", { d: "M18 17V9", key: "2bz60n" }],
    ["path", { d: "M13 17V5", key: "1frdt8" }],
    ["path", { d: "M8 17v-3", key: "17ska0" }]
  ];
  var ChartColumn = createLucideIcon("chart-column", __iconNode3);

  // node_modules/lucide-react/dist/esm/icons/clock.js
  var __iconNode4 = [
    ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
    ["path", { d: "M12 6v6l4 2", key: "mmk7yg" }]
  ];
  var Clock = createLucideIcon("clock", __iconNode4);

  // node_modules/lucide-react/dist/esm/icons/credit-card.js
  var __iconNode5 = [
    ["rect", { width: "20", height: "14", x: "2", y: "5", rx: "2", key: "ynyp8z" }],
    ["line", { x1: "2", x2: "22", y1: "10", y2: "10", key: "1b3vmo" }]
  ];
  var CreditCard = createLucideIcon("credit-card", __iconNode5);

  // node_modules/lucide-react/dist/esm/icons/dollar-sign.js
  var __iconNode6 = [
    ["line", { x1: "12", x2: "12", y1: "2", y2: "22", key: "7eqyqh" }],
    ["path", { d: "M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6", key: "1b0p4s" }]
  ];
  var DollarSign = createLucideIcon("dollar-sign", __iconNode6);

  // node_modules/lucide-react/dist/esm/icons/external-link.js
  var __iconNode7 = [
    ["path", { d: "M15 3h6v6", key: "1q9fwt" }],
    ["path", { d: "M10 14 21 3", key: "gplh6r" }],
    ["path", { d: "M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6", key: "a6xqqp" }]
  ];
  var ExternalLink = createLucideIcon("external-link", __iconNode7);

  // node_modules/lucide-react/dist/esm/icons/file-text.js
  var __iconNode8 = [
    [
      "path",
      {
        d: "M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z",
        key: "1oefj6"
      }
    ],
    ["path", { d: "M14 2v5a1 1 0 0 0 1 1h5", key: "wfsgrz" }],
    ["path", { d: "M10 9H8", key: "b1mrlr" }],
    ["path", { d: "M16 13H8", key: "t4e002" }],
    ["path", { d: "M16 17H8", key: "z1uh3a" }]
  ];
  var FileText = createLucideIcon("file-text", __iconNode8);

  // node_modules/lucide-react/dist/esm/icons/graduation-cap.js
  var __iconNode9 = [
    [
      "path",
      {
        d: "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z",
        key: "j76jl0"
      }
    ],
    ["path", { d: "M22 10v6", key: "1lu8f3" }],
    ["path", { d: "M6 12.5V16a6 3 0 0 0 12 0v-3.5", key: "1r8lef" }]
  ];
  var GraduationCap = createLucideIcon("graduation-cap", __iconNode9);

  // node_modules/lucide-react/dist/esm/icons/image.js
  var __iconNode10 = [
    ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", ry: "2", key: "1m3agn" }],
    ["circle", { cx: "9", cy: "9", r: "2", key: "af1f0g" }],
    ["path", { d: "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21", key: "1xmnt7" }]
  ];
  var Image = createLucideIcon("image", __iconNode10);

  // node_modules/lucide-react/dist/esm/icons/loader-circle.js
  var __iconNode11 = [["path", { d: "M21 12a9 9 0 1 1-6.219-8.56", key: "13zald" }]];
  var LoaderCircle = createLucideIcon("loader-circle", __iconNode11);

  // node_modules/lucide-react/dist/esm/icons/log-out.js
  var __iconNode12 = [
    ["path", { d: "m16 17 5-5-5-5", key: "1bji2h" }],
    ["path", { d: "M21 12H9", key: "dn1m92" }],
    ["path", { d: "M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4", key: "1uf3rs" }]
  ];
  var LogOut = createLucideIcon("log-out", __iconNode12);

  // node_modules/lucide-react/dist/esm/icons/map-pin.js
  var __iconNode13 = [
    [
      "path",
      {
        d: "M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0",
        key: "1r0f0z"
      }
    ],
    ["circle", { cx: "12", cy: "10", r: "3", key: "ilqhr7" }]
  ];
  var MapPin = createLucideIcon("map-pin", __iconNode13);

  // node_modules/lucide-react/dist/esm/icons/megaphone.js
  var __iconNode14 = [
    [
      "path",
      {
        d: "M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z",
        key: "q8bfy3"
      }
    ],
    ["path", { d: "M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14", key: "1853fq" }],
    ["path", { d: "M8 6v8", key: "15ugcq" }]
  ];
  var Megaphone = createLucideIcon("megaphone", __iconNode14);

  // node_modules/lucide-react/dist/esm/icons/menu.js
  var __iconNode15 = [
    ["path", { d: "M4 5h16", key: "1tepv9" }],
    ["path", { d: "M4 12h16", key: "1lakjw" }],
    ["path", { d: "M4 19h16", key: "1djgab" }]
  ];
  var Menu = createLucideIcon("menu", __iconNode15);

  // node_modules/lucide-react/dist/esm/icons/plus.js
  var __iconNode16 = [
    ["path", { d: "M5 12h14", key: "1ays0h" }],
    ["path", { d: "M12 5v14", key: "s699le" }]
  ];
  var Plus = createLucideIcon("plus", __iconNode16);

  // node_modules/lucide-react/dist/esm/icons/shield.js
  var __iconNode17 = [
    [
      "path",
      {
        d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
        key: "oel41y"
      }
    ]
  ];
  var Shield = createLucideIcon("shield", __iconNode17);

  // node_modules/lucide-react/dist/esm/icons/trash-2.js
  var __iconNode18 = [
    ["path", { d: "M10 11v6", key: "nco0om" }],
    ["path", { d: "M14 11v6", key: "outv1u" }],
    ["path", { d: "M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6", key: "miytrc" }],
    ["path", { d: "M3 6h18", key: "d0wm0j" }],
    ["path", { d: "M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2", key: "e791ji" }]
  ];
  var Trash2 = createLucideIcon("trash-2", __iconNode18);

  // node_modules/lucide-react/dist/esm/icons/user-plus.js
  var __iconNode19 = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }],
    ["line", { x1: "19", x2: "19", y1: "8", y2: "14", key: "1bvyxn" }],
    ["line", { x1: "22", x2: "16", y1: "11", y2: "11", key: "1shjgl" }]
  ];
  var UserPlus = createLucideIcon("user-plus", __iconNode19);

  // node_modules/lucide-react/dist/esm/icons/users.js
  var __iconNode20 = [
    ["path", { d: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2", key: "1yyitq" }],
    ["path", { d: "M16 3.128a4 4 0 0 1 0 7.744", key: "16gr8j" }],
    ["path", { d: "M22 21v-2a4 4 0 0 0-3-3.87", key: "kshegd" }],
    ["circle", { cx: "9", cy: "7", r: "4", key: "nufk8" }]
  ];
  var Users = createLucideIcon("users", __iconNode20);

  // node_modules/lucide-react/dist/esm/icons/x.js
  var __iconNode21 = [
    ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
    ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
  ];
  var X = createLucideIcon("x", __iconNode21);

  // components/Toast.tsx
  var import_jsx_runtime = __toESM(require_jsx_runtime());
  function Toast({ show, message, type = "success" }) {
    if (!show) return null;
    const tone = type === "error" ? "error" : type === "warning" ? "warning" : "success";
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { id: "toast", className: `show ${tone}`, children: message });
  }

  // app/admin/dashboard/page.tsx
  var import_jsx_runtime2 = __toESM(require_jsx_runtime());
  var apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  var DonutChart = ({ data, size = 180, strokeWidth = 16 }) => {
    const total = data.reduce((sum, item) => sum + Math.max(item.value, 0), 0) || 1;
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    let offset = 0;
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("svg", { width: size, height: size, viewBox: `0 0 ${size} ${size}`, style: { display: "block", overflow: "visible" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("circle", { cx: size / 2, cy: size / 2, r: radius, fill: "none", stroke: "rgba(148, 163, 184, 0.18)", strokeWidth }),
      data.map((item) => {
        const pct = item.value / total * 100;
        const dash = pct / 100 * circumference;
        const circle = /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "circle",
          {
            cx: size / 2,
            cy: size / 2,
            r: radius,
            fill: "none",
            stroke: item.color,
            strokeWidth,
            strokeDasharray: `${dash} ${circumference - dash}`,
            strokeDashoffset: -offset,
            strokeLinecap: "round",
            transform: `rotate(-90 ${size / 2} ${size / 2})`
          },
          item.label
        );
        offset += dash;
        return circle;
      }),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("text", { x: "50%", y: "50%", textAnchor: "middle", dominantBaseline: "middle", style: { fill: "#f8fafc", fontWeight: 800, fontSize: "18px" }, children: total })
    ] });
  };
  function AdminDashboard() {
    const router = (0, import_navigation.useRouter)();
    const [activeSection, setActiveSection] = (0, import_react4.useState)("overview");
    const [sidebarOpen, setSidebarOpen] = (0, import_react4.useState)(false);
    const [events, setEvents] = (0, import_react4.useState)([]);
    const [announcements, setAnnouncements] = (0, import_react4.useState)([]);
    const [registrations, setRegistrations] = (0, import_react4.useState)([]);
    const [documents, setDocuments] = (0, import_react4.useState)([]);
    const [branches, setBranches] = (0, import_react4.useState)([]);
    const [users, setUsers] = (0, import_react4.useState)([]);
    const [photos, setPhotos] = (0, import_react4.useState)([]);
    const [batches, setBatches] = (0, import_react4.useState)([]);
    const [stats, setStats] = (0, import_react4.useState)(null);
    const [adminToken] = (0, import_react4.useState)(() => {
      if (typeof window === "undefined") return "";
      return localStorage.getItem("jopesa_admin_token") || "";
    });
    const [uploading, setUploading] = (0, import_react4.useState)(false);
    const [isSavingEvent, setIsSavingEvent] = (0, import_react4.useState)(false);
    const [isSavingAnnouncement, setIsSavingAnnouncement] = (0, import_react4.useState)(false);
    const [isCreatingDocument, setIsCreatingDocument] = (0, import_react4.useState)(false);
    const [isSavingBranch, setIsSavingBranch] = (0, import_react4.useState)(false);
    const [isSavingBatch, setIsSavingBatch] = (0, import_react4.useState)(false);
    const [isSavingContribution, setIsSavingContribution] = (0, import_react4.useState)(false);
    const [toast, setToast] = (0, import_react4.useState)({ show: false, message: "", type: "success" });
    const [deleteModal, setDeleteModal] = (0, import_react4.useState)({ open: false, title: "", message: "", type: null, id: null, loading: false });
    const [branchStatsModal, setBranchStatsModal] = (0, import_react4.useState)(false);
    const [batchStatsModal, setBatchStatsModal] = (0, import_react4.useState)(false);
    const [contributions, setContributions] = (0, import_react4.useState)([]);
    const [showContributionForm, setShowContributionForm] = (0, import_react4.useState)(false);
    const [editingContributionId, setEditingContributionId] = (0, import_react4.useState)(null);
    const [contributionData, setContributionData] = (0, import_react4.useState)({
      title: "",
      type: "EVENT_REGISTRATION",
      description: "",
      installments: [],
      status: "ACTIVE"
    });
    const [paymentModal, setPaymentModal] = (0, import_react4.useState)({ open: false, contributionId: null, contributionTitle: "" });
    const [contributionPayments, setContributionPayments] = (0, import_react4.useState)([]);
    (0, import_react4.useEffect)(() => {
      const loadPayments = async () => {
        if (!paymentModal.open || !paymentModal.contributionId) return;
        try {
          const res = await fetch(`${apiBaseUrl}/admin/contributions/${paymentModal.contributionId}/payments`, {
            headers: getAuthHeaders(adminToken)
          });
          if (!res.ok) throw new Error("Unable to load payments");
          const json = await res.json();
          setContributionPayments(Array.isArray(json) ? json : json?.data ?? []);
        } catch (err) {
          console.error("Load payments failed", err);
          showToastMessage("Could not load payments for this contribution.", "error");
        }
      };
      loadPayments();
    }, [paymentModal.open, paymentModal.contributionId]);
    const [showEventForm, setShowEventForm] = (0, import_react4.useState)(false);
    const [editingEventId, setEditingEventId] = (0, import_react4.useState)(null);
    const [eventData, setEventData] = (0, import_react4.useState)({
      title: "",
      description: "",
      startDate: "",
      endDate: "",
      location: "",
      batchIds: [],
      isVirtual: false,
      meetLink: "",
      images: [],
      status: "upcoming",
      registrationForm: [],
      eventType: "reunion"
    });
    const [eventImageFiles, setEventImageFiles] = (0, import_react4.useState)([]);
    const [showRegistrationFormModal, setShowRegistrationFormModal] = (0, import_react4.useState)(false);
    const [showAnnouncementForm, setShowAnnouncementForm] = (0, import_react4.useState)(false);
    const [editingAnnouncementId, setEditingAnnouncementId] = (0, import_react4.useState)(null);
    const [announcementData, setAnnouncementData] = (0, import_react4.useState)({
      title: "",
      content: "",
      type: "NEWS",
      isPinned: false,
      imageUrl: ""
    });
    const [showDocumentForm, setShowDocumentForm] = (0, import_react4.useState)(false);
    const [documentFile, setDocumentFile] = (0, import_react4.useState)(null);
    const [documentData, setDocumentData] = (0, import_react4.useState)({
      title: "",
      description: "",
      category: "General",
      fileType: "OTHER",
      tags: ""
    });
    const [showBranchForm, setShowBranchForm] = (0, import_react4.useState)(false);
    const [editingBranchId, setEditingBranchId] = (0, import_react4.useState)(null);
    const [branchData, setBranchData] = (0, import_react4.useState)({
      name: "",
      code: "",
      region: "",
      leaderId: ""
    });
    const [showBatchForm, setShowBatchForm] = (0, import_react4.useState)(false);
    const [editingBatchId, setEditingBatchId] = (0, import_react4.useState)(null);
    const [batchData, setBatchData] = (0, import_react4.useState)({
      year: "",
      name: "",
      season: ""
    });
    const [showPhotoForm, setShowPhotoForm] = (0, import_react4.useState)(false);
    const [photoFiles, setPhotoFiles] = (0, import_react4.useState)([]);
    const [selectedEventId, setSelectedEventId] = (0, import_react4.useState)("");
    const [photoPreviewUrls, setPhotoPreviewUrls] = (0, import_react4.useState)([]);
    const [statisticsFilters, setStatisticsFilters] = (0, import_react4.useState)({
      search: "",
      branchId: "all",
      batchId: "all",
      role: "all"
    });
    const [dateRange, setDateRange] = (0, import_react4.useState)({ start: "", end: "" });
    const getAuthHeaders = (token) => ({
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json"
    });
    const normalizeList = (json) => {
      if (typeof json !== "object" || json === null) return [];
      const value = json;
      if (Array.isArray(value.data)) return value.data;
      if (Array.isArray(value)) return value;
      return Array.isArray(value.items) ? value.items : [];
    };
    const isVideoMediaUrl = (value) => {
      if (!value) return false;
      return /\.(mp4|mov|webm|m4v|avi|mkv|ogg|3gp)(\?.*)?$/i.test(value) || value.includes("/video/");
    };
    const branchStats = branches.map((branch) => {
      const members = users.filter((user) => user.branchId === branch.id);
      return {
        ...branch,
        usersCount: members.length || Number(branch.memberCount || 0),
        alumniCount: members.filter((user) => user.role === "member").length,
        leaderCount: members.filter((user) => user.role === "branch_leader").length
      };
    });
    const batchStats = batches.map((batch) => ({
      ...batch,
      eventCount: events.filter((event) => Array.isArray(event.batches) && event.batches.some((eventBatch) => eventBatch.id === batch.id) || event.batchId === batch.id).length
    }));
    const filteredUsers = users.filter((user) => {
      const matchesSearch = !statisticsFilters.search || `${user.name} ${user.email}`.toLowerCase().includes(statisticsFilters.search.toLowerCase());
      const matchesBranch = statisticsFilters.branchId === "all" || user.branchId === statisticsFilters.branchId;
      const matchesRole = statisticsFilters.role === "all" || user.role === statisticsFilters.role;
      const matchesBatch = statisticsFilters.batchId === "all" || (() => {
        const batchMatch = batches.find((batch) => batch.id === statisticsFilters.batchId);
        if (!batchMatch) return true;
        const relatedEvents = events.filter((event) => Array.isArray(event.batches) && event.batches.some((eventBatch) => eventBatch.id === batchMatch.id) || event.batchId === batchMatch.id);
        return relatedEvents.some((event) => Array.isArray(event.batches) && event.batches.some((eventBatch) => eventBatch.id === batchMatch.id) || event.batchId === batchMatch.id);
      })();
      return matchesSearch && matchesBranch && matchesRole && matchesBatch;
    });
    const statsSummary = {
      totalUsers: users.length,
      totalAlumni: users.filter((user) => user.role === "member").length,
      totalAdmins: users.filter((user) => user.role === "admin").length,
      totalLeaders: users.filter((user) => user.role === "branch_leader").length,
      totalBranches: branches.length,
      totalBatches: batches.length,
      totalEvents: events.length,
      totalContributions: contributions.length
    };
    const isWithinDateRange = (value, start, end) => {
      if (!value) return true;
      const time = new Date(value).getTime();
      if (Number.isNaN(time)) return true;
      if (start && time < new Date(start).getTime()) return false;
      if (end) {
        const endDate = new Date(end);
        endDate.setHours(23, 59, 59, 999);
        if (time > endDate.getTime()) return false;
      }
      return true;
    };
    const filteredEventsByDate = events.filter((event) => isWithinDateRange(event.startDate, dateRange.start, dateRange.end));
    const roleDistribution = [
      { label: "Alumni", value: statsSummary.totalAlumni, color: "#f9c74f" },
      { label: "Leaders", value: statsSummary.totalLeaders, color: "#7dd3fc" },
      { label: "Admins", value: statsSummary.totalAdmins, color: "#34d399" }
    ];
    const branchRanking = [...branchStats].sort((a, b) => b.usersCount - a.usersCount).slice(0, 3);
    const batchRanking = [...batchStats].sort((a, b) => b.eventCount - a.eventCount).slice(0, 3);
    const engagementTrend = Array.from({ length: 6 }, (_, index) => {
      const date = /* @__PURE__ */ new Date();
      date.setMonth(date.getMonth() - (5 - index));
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
      const count = filteredEventsByDate.filter((event) => {
        if (!event.startDate) return false;
        const eventDate = new Date(event.startDate);
        return `${eventDate.getFullYear()}-${String(eventDate.getMonth() + 1).padStart(2, "0")}` === monthKey;
      }).length;
      return {
        label: date.toLocaleString("en-US", { month: "short" }),
        value: count
      };
    });
    const exportData = (format) => {
      const payload = {
        generatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        summary: statsSummary,
        filters: { ...statisticsFilters, dateRange },
        branches: branchStats,
        batches: batchStats,
        alumni: filteredUsers
      };
      if (format === "json") {
        const blob2 = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8;" });
        const url2 = URL.createObjectURL(blob2);
        const link2 = document.createElement("a");
        link2.href = url2;
        link2.download = "jopesa-statistics.json";
        document.body.appendChild(link2);
        link2.click();
        document.body.removeChild(link2);
        URL.revokeObjectURL(url2);
        return;
      }
      const rows = [
        ["Metric", "Value"],
        ["Total users", String(statsSummary.totalUsers)],
        ["Total alumni", String(statsSummary.totalAlumni)],
        ["Total leaders", String(statsSummary.totalLeaders)],
        ["Total admins", String(statsSummary.totalAdmins)],
        ["Total branches", String(statsSummary.totalBranches)],
        ["Total batches", String(statsSummary.totalBatches)],
        ["Total events", String(filteredEventsByDate.length)],
        ["Total contributions", String(statsSummary.totalContributions)],
        ["Date range start", dateRange.start || "All"],
        ["Date range end", dateRange.end || "All"]
      ];
      const html = `
      <html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40">
        <body>
          <table>${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`).join("")}</table>
        </body>
      </html>
    `;
      const blob = new Blob([html], { type: "application/vnd.ms-excel;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "jopesa-statistics.xls";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    };
    const uploadDocumentFile = async (file) => {
      const formData = new FormData();
      formData.append("file", file);
      const response = await fetch(`${apiBaseUrl}/upload/document?folder=documents`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error("Document upload failed");
      }
      return response.json();
    };
    const uploadPhotoFiles = async (files) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const response = await fetch(`${apiBaseUrl}/upload/images?folder=event-photos`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error("Photo upload failed");
      }
      return response.json();
    };
    const uploadEventImages = async (files) => {
      const formData = new FormData();
      files.forEach((file) => formData.append("files", file));
      const response = await fetch(`${apiBaseUrl}/upload/images?folder=events`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${adminToken}`
        },
        body: formData
      });
      if (!response.ok) {
        throw new Error("Images upload failed");
      }
      return response.json();
    };
    (0, import_react4.useEffect)(() => {
      const token = localStorage.getItem("jopesa_admin_token");
      if (!token) {
        router.push("/admin");
        return;
      }
      const fetchAdminData = async () => {
        try {
          const headers = getAuthHeaders(token);
          const [usersRes, branchesRes, eventsRes, announcementsRes, documentsRes, batchesRes, statsRes, photosRes, contributionsRes] = await Promise.all([
            fetch(`${apiBaseUrl}/admin/users?skip=0&take=50`, { headers }),
            fetch(`${apiBaseUrl}/branch?skip=0&take=100`, { headers }),
            fetch(`${apiBaseUrl}/events?skip=0&take=100`, { headers }),
            fetch(`${apiBaseUrl}/announcements?skip=0&take=100`, { headers }),
            fetch(`${apiBaseUrl}/documents?skip=0&take=100`, { headers }),
            fetch(`${apiBaseUrl}/batch?skip=0&take=100`, { headers }),
            fetch(`${apiBaseUrl}/admin/stats`, { headers }),
            fetch(`${apiBaseUrl}/photos?skip=0&take=500`, { headers }),
            fetch(`${apiBaseUrl}/contributions?skip=0&take=200`, { headers })
          ]);
          if (!usersRes.ok || !branchesRes.ok || !eventsRes.ok || !announcementsRes.ok || !documentsRes.ok || !batchesRes.ok) {
            throw new Error("Dashboard fetch failed");
          }
          const usersJson = await usersRes.json();
          setUsers(normalizeList(usersJson));
          const branchesJson = await branchesRes.json();
          setBranches(normalizeList(branchesJson).map((branch) => ({
            ...branch,
            id: String(branch.id ?? ""),
            name: String(branch.name ?? ""),
            region: String(branch.description ?? ""),
            memberCount: Number(branch.memberCount ?? 0),
            createdAt: branch.createdAt ? new Date(branch.createdAt).toLocaleDateString() : ""
          })));
          const eventsJson = await eventsRes.json();
          const normalizedEvents = normalizeList(eventsJson).map((event) => {
            const imageList = Array.isArray(event.images) ? event.images.filter(Boolean) : [];
            const primaryImage = String(event.image ?? "");
            const images = imageList.length > 0 ? imageList : primaryImage ? [primaryImage] : [];
            return {
              ...event,
              id: String(event.id ?? ""),
              title: String(event.title ?? ""),
              description: String(event.description ?? ""),
              startDate: String(event.startDate ?? ""),
              endDate: String(event.endDate ?? ""),
              location: String(event.location ?? ""),
              image: primaryImage || images[0] || void 0,
              images,
              status: event.status === "COMPLETED" || event.status === "CANCELLED" ? "past" : "upcoming",
              createdAt: event.createdAt ? new Date(event.createdAt).toLocaleDateString() : ""
            };
          });
          setEvents(normalizedEvents);
          if (photosRes.ok) {
            const photosJson = await photosRes.json();
            const normalizedPhotos = normalizeList(photosJson).map((photo) => ({
              id: String(photo.id ?? ""),
              eventId: String(photo.eventId ?? ""),
              url: String(photo.url ?? ""),
              uploadedAt: photo.createdAt ? new Date(photo.createdAt).toLocaleDateString() : ""
            }));
            setPhotos(normalizedPhotos);
            try {
              const contribJson = await contributionsRes.json();
              setContributions(normalizeList(contribJson));
            } catch (e) {
              setContributions([]);
            }
            try {
              const regsRes = await fetch(`${apiBaseUrl}/admin/registrations?skip=0&take=200`, { headers });
              if (regsRes.ok) {
                const regsJson = await regsRes.json();
                const list = Array.isArray(regsJson?.data) ? regsJson.data : Array.isArray(regsJson) ? regsJson : [];
                setRegistrations(list);
              } else {
                setRegistrations([]);
              }
            } catch (e) {
              setRegistrations([]);
            }
          } else {
            setPhotos([]);
          }
          const announcementsJson = await announcementsRes.json();
          setAnnouncements(normalizeList(announcementsJson).map((announcement) => ({
            ...announcement,
            id: String(announcement.id ?? ""),
            title: String(announcement.title ?? ""),
            content: String(announcement.content ?? ""),
            type: announcement.type || "NEWS",
            createdAt: announcement.createdAt ? new Date(announcement.createdAt).toLocaleDateString() : "",
            createdBy: String(announcement.createdBy || "Admin")
          })));
          const documentsJson = await documentsRes.json();
          setDocuments(normalizeList(documentsJson).map((doc) => ({
            id: String(doc.id ?? ""),
            title: String(doc.title ?? ""),
            type: String(doc.fileType || "OTHER").toLowerCase(),
            fileUrl: String(doc.fileUrl ?? ""),
            uploadedAt: doc.createdAt ? new Date(doc.createdAt).toLocaleDateString() : "",
            uploadedBy: String(doc.category || "Admin"),
            category: String(doc.category || ""),
            fileType: String(doc.fileType || "OTHER"),
            fileSize: Number(doc.fileSize ?? 0),
            tags: Array.isArray(doc.tags) ? doc.tags : []
          })));
          const batchesJson = await batchesRes.json();
          const normalizedBatches = normalizeList(batchesJson).map((batch) => ({
            id: String(batch.id ?? ""),
            year: Number(batch.year ?? 0),
            name: String(batch.name ?? ""),
            season: batch.season || "",
            createdAt: batch.createdAt ? new Date(batch.createdAt).toLocaleDateString() : ""
          }));
          setBatches(normalizedBatches);
          if (statsRes.ok) {
            const statsJson = await statsRes.json();
            setStats(statsJson);
          }
        } catch (error) {
          console.error("Admin dashboard fetch failed:", error);
          localStorage.removeItem("jopesa_admin_token");
          router.push("/admin");
        }
      };
      fetchAdminData();
    }, [router]);
    (0, import_react4.useEffect)(() => {
      if (!toast.show) return;
      const timer = window.setTimeout(() => {
        setToast((prev) => ({ ...prev, show: false }));
      }, 3500);
      return () => window.clearTimeout(timer);
    }, [toast.show]);
    (0, import_react4.useEffect)(() => {
      localStorage.setItem("jopesa_events", JSON.stringify(events));
    }, [events]);
    (0, import_react4.useEffect)(() => {
      localStorage.setItem("jopesa_announcements", JSON.stringify(announcements));
    }, [announcements]);
    (0, import_react4.useEffect)(() => {
      localStorage.setItem("jopesa_documents", JSON.stringify(documents));
    }, [documents]);
    (0, import_react4.useEffect)(() => {
      localStorage.setItem("jopesa_branches", JSON.stringify(branches));
    }, [branches]);
    (0, import_react4.useEffect)(() => {
      localStorage.setItem("jopesa_photos", JSON.stringify(photos));
    }, [photos]);
    const handleLogout = () => {
      localStorage.removeItem("jopesa_admin_token");
      router.push("/admin");
    };
    const showToastMessage = (message, type = "success") => {
      setToast({ show: true, message, type });
    };
    const openDeleteModal = (type, id, title, message) => {
      setDeleteModal({ open: true, title, message, type, id, loading: false });
    };
    const closeDeleteModal = () => {
      setDeleteModal({ open: false, title: "", message: "", type: null, id: null, loading: false });
    };
    const handleEditEvent = (event) => {
      setEditingEventId(event.id);
      setEventData({
        title: event.title,
        description: event.description,
        startDate: event.startDate,
        endDate: event.endDate,
        location: event.location,
        batchIds: event.batches?.map((b) => b.id) || (event.batchId ? [event.batchId] : []),
        isVirtual: event.isVirtual || false,
        meetLink: event.meetLink || "",
        images: event.images || [],
        status: event.status === "past" ? "past" : "upcoming",
        registrationForm: Array.isArray(event.registrationForm) ? event.registrationForm : [],
        eventType: event.eventType || "reunion"
      });
      setShowEventForm(true);
    };
    const handleCreateEvent = async () => {
      if (!eventData.title || !eventData.startDate || !eventData.endDate || !eventData.location || eventData.batchIds.length === 0) {
        showToastMessage("Please complete the required event fields before saving.", "warning");
        return;
      }
      setIsSavingEvent(true);
      let images = [...eventData.images];
      if (eventImageFiles.length > 0) {
        try {
          const uploadResult = await uploadEventImages(eventImageFiles);
          const newUrls = Array.isArray(uploadResult) ? uploadResult.map((item) => item.url || item.secure_url || "") : [uploadResult.url || uploadResult.secure_url];
          images = [...images, ...newUrls];
        } catch (error) {
          console.error("Images upload failed:", error);
          showToastMessage("The event images could not be uploaded. Please try again.", "error");
          setIsSavingEvent(false);
          return;
        }
      }
      const payload = {
        title: eventData.title,
        description: eventData.description,
        startDate: new Date(eventData.startDate).toISOString(),
        endDate: new Date(eventData.endDate).toISOString(),
        location: eventData.location,
        batchIds: eventData.batchIds,
        isVirtual: eventData.isVirtual,
        meetLink: eventData.meetLink || void 0,
        image: images.length > 0 ? images[0] : void 0,
        images: images.length > 0 ? images : void 0,
        eventType: eventData.eventType,
        registrationForm: eventData.registrationForm.length > 0 ? eventData.registrationForm : void 0,
        status: eventData.status === "past" ? "COMPLETED" : "PUBLISHED"
      };
      try {
        if (editingEventId) {
          const response = await fetch(`${apiBaseUrl}/events/${editingEventId}`, {
            method: "PUT",
            headers: getAuthHeaders(adminToken),
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            throw new Error("Unable to update event");
          }
          const updatedEvent = await response.json();
          setEvents(events.map((event) => event.id === editingEventId ? {
            ...event,
            ...updatedEvent,
            status: updatedEvent.status === "COMPLETED" || updatedEvent.status === "CANCELLED" ? "past" : "upcoming",
            createdAt: updatedEvent.createdAt ? new Date(updatedEvent.createdAt).toLocaleDateString() : event.createdAt
          } : event));
          showToastMessage("Event updated successfully.", "success");
          setEditingEventId(null);
        } else {
          const response = await fetch(`${apiBaseUrl}/events`, {
            method: "POST",
            headers: getAuthHeaders(adminToken),
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            throw new Error("Unable to create event");
          }
          const createdEvent = await response.json();
          setEvents([{
            ...createdEvent,
            status: createdEvent.status === "COMPLETED" || createdEvent.status === "CANCELLED" ? "past" : "upcoming",
            createdAt: createdEvent.createdAt ? new Date(createdEvent.createdAt).toLocaleDateString() : (/* @__PURE__ */ new Date()).toLocaleDateString()
          }, ...events]);
          showToastMessage("Event created successfully.", "success");
        }
      } catch (error) {
        console.error("Event save failed:", error);
        showToastMessage("The event could not be saved. Please try again.", "error");
      } finally {
        setIsSavingEvent(false);
      }
      setEventData({ title: "", description: "", startDate: "", endDate: "", location: "", batchIds: [], isVirtual: false, meetLink: "", images: [], status: "upcoming", registrationForm: [], eventType: "reunion" });
      setEventImageFiles([]);
      setShowEventForm(false);
    };
    const handleConfirmDelete = async () => {
      if (!deleteModal.type || !deleteModal.id) return;
      setDeleteModal((prev) => ({ ...prev, loading: true }));
      try {
        switch (deleteModal.type) {
          case "event": {
            const response = await fetch(`${apiBaseUrl}/events/${deleteModal.id}`, {
              method: "DELETE",
              headers: getAuthHeaders(adminToken)
            });
            if (!response.ok) throw new Error("Unable to delete event");
            setEvents((prev) => prev.filter((event) => event.id !== deleteModal.id));
            break;
          }
          case "announcement": {
            const response = await fetch(`${apiBaseUrl}/announcements/${deleteModal.id}`, {
              method: "DELETE",
              headers: getAuthHeaders(adminToken)
            });
            if (!response.ok) throw new Error("Unable to delete announcement");
            setAnnouncements((prev) => prev.filter((announcement) => announcement.id !== deleteModal.id));
            break;
          }
          case "branch": {
            const response = await fetch(`${apiBaseUrl}/branch/${deleteModal.id}`, {
              method: "DELETE",
              headers: getAuthHeaders(adminToken)
            });
            if (!response.ok) throw new Error("Unable to delete branch");
            setBranches((prev) => prev.filter((branch) => branch.id !== deleteModal.id));
            break;
          }
          case "document": {
            const response = await fetch(`${apiBaseUrl}/documents/${deleteModal.id}`, {
              method: "DELETE",
              headers: getAuthHeaders(adminToken)
            });
            if (!response.ok) throw new Error("Unable to delete document");
            setDocuments((prev) => prev.filter((doc) => doc.id !== deleteModal.id));
            break;
          }
          case "photo": {
            const response = await fetch(`${apiBaseUrl}/photos/${deleteModal.id}`, {
              method: "DELETE",
              headers: getAuthHeaders(adminToken)
            });
            if (!response.ok && response.status !== 204) throw new Error("Unable to delete photo");
            setPhotos((prev) => prev.filter((photo) => photo.id !== deleteModal.id));
            break;
          }
          case "batch": {
            const response = await fetch(`${apiBaseUrl}/batch/${deleteModal.id}`, {
              method: "DELETE",
              headers: getAuthHeaders(adminToken)
            });
            if (!response.ok) throw new Error("Unable to delete batch");
            setBatches((prev) => prev.filter((batch) => batch.id !== deleteModal.id));
            break;
          }
          case "registration": {
            const response = await fetch(`${apiBaseUrl}/admin/registrations/${deleteModal.id}`, {
              method: "DELETE",
              headers: getAuthHeaders(adminToken)
            });
            if (!response.ok && response.status !== 204) throw new Error("Unable to delete registration");
            setRegistrations((prev) => prev.filter((reg) => reg.id !== deleteModal.id));
            break;
          }
        }
        closeDeleteModal();
      } catch (error) {
        console.error("Delete failed:", error);
        showToastMessage("The selected item could not be deleted. Please try again.", "error");
      } finally {
        setDeleteModal((prev) => ({ ...prev, loading: false }));
      }
    };
    const handleUpdateRegistrationStatus = async (registrationId, status) => {
      try {
        const response = await fetch(`${apiBaseUrl}/admin/registrations/${registrationId}/status`, {
          method: "PUT",
          headers: getAuthHeaders(adminToken),
          body: JSON.stringify({ status })
        });
        if (!response.ok) {
          throw new Error("Unable to update registration status");
        }
        const updatedRegistration = await response.json();
        setRegistrations((prev) => prev.map((reg) => reg.id === registrationId ? updatedRegistration : reg));
        showToastMessage(`Registration status updated to ${status.toLowerCase()}.`, "success");
      } catch (error) {
        console.error("Registration status update failed:", error);
        showToastMessage("Could not update registration status. Please try again.", "error");
      }
    };
    const handleUploadPhotos = async () => {
      if (!selectedEventId) {
        alert("Please select an event");
        return;
      }
      if (photoFiles.length === 0) {
        alert("Please select at least one photo");
        return;
      }
      try {
        setUploading(true);
        const uploadResult = await uploadPhotoFiles(photoFiles);
        const uploadedItems = Array.isArray(uploadResult) ? uploadResult : [uploadResult];
        const urls = uploadedItems.map((item) => item.url || item.secure_url || "").filter(Boolean);
        const publicIds = uploadedItems.map((item) => item.publicId || item.public_id || "").filter(Boolean);
        if (urls.length === 0) {
          throw new Error("No media URLs returned from Cloudinary");
        }
        const response = await fetch(`${apiBaseUrl}/photos/bulk`, {
          method: "POST",
          headers: getAuthHeaders(adminToken),
          body: JSON.stringify({
            eventId: selectedEventId,
            urls,
            publicIds: publicIds.length === urls.length ? publicIds : void 0
          })
        });
        if (!response.ok) {
          const payload = await response.json().catch(() => ({}));
          throw new Error(payload.message || "Unable to save photos");
        }
        const createdPhotos = await response.json();
        const photoList = Array.isArray(createdPhotos) ? createdPhotos : normalizeList(createdPhotos);
        const mapped = photoList.map((photo) => ({
          id: String(photo.id ?? ""),
          eventId: String(photo.eventId ?? selectedEventId),
          url: String(photo.url ?? ""),
          uploadedAt: photo.createdAt ? new Date(String(photo.createdAt)).toLocaleDateString() : (/* @__PURE__ */ new Date()).toLocaleDateString()
        }));
        setPhotos([...mapped, ...photos]);
        setPhotoFiles([]);
        setPhotoPreviewUrls([]);
        setSelectedEventId("");
        setShowPhotoForm(false);
        showToastMessage("Photos uploaded successfully.", "success");
      } catch (error) {
        console.error("Photo upload failed:", error);
        showToastMessage(
          error instanceof Error ? error.message : "Failed to upload photos.",
          "error"
        );
      } finally {
        setUploading(false);
      }
    };
    const removePhotoSelection = (index) => {
      setPhotoFiles((prev) => prev.filter((_, idx) => idx !== index));
      setPhotoPreviewUrls((prev) => prev.filter((_, idx) => idx !== index));
    };
    const handlePhotoSelection = (files) => {
      const maxPhotoSizeBytes = 5 * 1024 * 1024 * 1024;
      const nextFiles = Array.from(files || []);
      const validFiles = nextFiles.filter((file) => file.size <= maxPhotoSizeBytes);
      const oversizedFiles = nextFiles.filter((file) => file.size > maxPhotoSizeBytes);
      if (oversizedFiles.length > 0) {
        showToastMessage(`Some selected files are larger than 5 GB and were not added.`, "warning");
      }
      setPhotoFiles(validFiles);
      const urls = validFiles.map((file) => URL.createObjectURL(file));
      setPhotoPreviewUrls(urls);
    };
    const handleEventImageSelection = (files) => {
      const maxEventImageSizeBytes = 5 * 1024 * 1024 * 1024;
      const nextFiles = Array.from(files || []);
      const validFiles = nextFiles.filter((file) => file.size <= maxEventImageSizeBytes);
      if (validFiles.length !== nextFiles.length) {
        showToastMessage("Some event images are larger than 5 GB and were not added.", "warning");
      }
      setEventImageFiles(validFiles);
    };
    const handleEditAnnouncement = (announcement) => {
      setEditingAnnouncementId(announcement.id);
      setAnnouncementData({
        title: announcement.title,
        content: announcement.content,
        type: announcement.type || "NEWS",
        isPinned: !!announcement.isPinned,
        imageUrl: announcement.imageUrl || ""
      });
      setShowAnnouncementForm(true);
    };
    const handleSaveAnnouncement = async () => {
      if (!announcementData.title || !announcementData.content) {
        showToastMessage("Please fill in the announcement title and content before saving.", "warning");
        return;
      }
      setIsSavingAnnouncement(true);
      try {
        if (editingAnnouncementId) {
          const response = await fetch(`${apiBaseUrl}/announcements/${editingAnnouncementId}`, {
            method: "PUT",
            headers: getAuthHeaders(adminToken),
            body: JSON.stringify({
              title: announcementData.title,
              content: announcementData.content,
              type: announcementData.type,
              isPinned: announcementData.isPinned,
              image: announcementData.imageUrl || void 0
            })
          });
          if (!response.ok) {
            throw new Error("Unable to update announcement");
          }
          const updatedAnnouncement = await response.json();
          setAnnouncements(announcements.map((a) => a.id === editingAnnouncementId ? {
            ...a,
            ...updatedAnnouncement,
            createdAt: updatedAnnouncement.createdAt ? new Date(updatedAnnouncement.createdAt).toLocaleDateString() : a.createdAt
          } : a));
          setEditingAnnouncementId(null);
        } else {
          const response = await fetch(`${apiBaseUrl}/announcements`, {
            method: "POST",
            headers: getAuthHeaders(adminToken),
            body: JSON.stringify({
              title: announcementData.title,
              content: announcementData.content,
              type: announcementData.type,
              isPinned: announcementData.isPinned,
              image: announcementData.imageUrl || void 0
            })
          });
          if (!response.ok) {
            throw new Error("Unable to create announcement");
          }
          const newAnnouncement = await response.json();
          setAnnouncements([{
            ...newAnnouncement,
            createdAt: newAnnouncement.createdAt ? new Date(newAnnouncement.createdAt).toLocaleDateString() : (/* @__PURE__ */ new Date()).toLocaleDateString()
          }, ...announcements]);
        }
      } catch (error) {
        console.error("Announcement save failed:", error);
        showToastMessage("The announcement could not be saved. Please try again.", "error");
      } finally {
        setIsSavingAnnouncement(false);
      }
      setAnnouncementData({ title: "", content: "", type: "NEWS", isPinned: false, imageUrl: "" });
      setShowAnnouncementForm(false);
    };
    const handleCreateDocument = async () => {
      if (!documentData.title || !documentFile) {
        showToastMessage("Please provide a document title and file before uploading.", "warning");
        return;
      }
      setIsCreatingDocument(true);
      try {
        const uploadResponse = await uploadDocumentFile(documentFile);
        const fileUrl = uploadResponse.url || uploadResponse.secure_url;
        const fileType = documentData.fileType;
        const fileSize = documentFile.size;
        const response = await fetch(`${apiBaseUrl}/documents`, {
          method: "POST",
          headers: getAuthHeaders(adminToken),
          body: JSON.stringify({
            title: documentData.title,
            description: documentData.description || void 0,
            fileUrl,
            fileType,
            fileSize,
            category: documentData.category,
            tags: documentData.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
          })
        });
        if (!response.ok) {
          throw new Error("Unable to create document");
        }
        const createdDoc = await response.json();
        setDocuments([{
          id: createdDoc.id,
          title: createdDoc.title,
          type: createdDoc.fileType.toLowerCase(),
          fileUrl: createdDoc.fileUrl,
          uploadedAt: createdDoc.createdAt ? new Date(createdDoc.createdAt).toLocaleDateString() : (/* @__PURE__ */ new Date()).toLocaleDateString(),
          uploadedBy: createdDoc.category,
          category: createdDoc.category,
          fileType: createdDoc.fileType,
          fileSize: createdDoc.fileSize,
          tags: createdDoc.tags || []
        }, ...documents]);
        setDocumentData({ title: "", description: "", category: "General", fileType: "OTHER", tags: "" });
        setDocumentFile(null);
        setShowDocumentForm(false);
      } catch (error) {
        console.error("Document upload failed:", error);
        showToastMessage("The document could not be uploaded. Please try again.", "error");
      } finally {
        setIsCreatingDocument(false);
      }
    };
    const handleEditBranch = (branch) => {
      setEditingBranchId(branch.id);
      setBranchData({
        name: branch.name,
        code: branch.code || "",
        region: branch.region,
        leaderId: branch.leaderId || ""
      });
      setShowBranchForm(true);
    };
    const handleCreateBranch = async () => {
      if (!branchData.name || !branchData.region || !branchData.code) {
        showToastMessage("Please complete all branch fields before saving.", "warning");
        return;
      }
      setIsSavingBranch(true);
      if (editingBranchId) {
        const response = await fetch(`${apiBaseUrl}/branch/${editingBranchId}`, {
          method: "PUT",
          headers: getAuthHeaders(adminToken),
          body: JSON.stringify({
            name: branchData.name,
            code: branchData.code,
            description: branchData.region
          })
        });
        if (response.ok) {
          const updatedBranch = await response.json();
          setBranches(branches.map((b) => b.id === editingBranchId ? { ...b, ...updatedBranch, region: updatedBranch.description || branchData.region } : b));
        } else {
          showToastMessage("The branch could not be updated. Please try again.", "error");
        }
        setEditingBranchId(null);
      } else {
        const response = await fetch(`${apiBaseUrl}/branch`, {
          method: "POST",
          headers: getAuthHeaders(adminToken),
          body: JSON.stringify({
            name: branchData.name,
            code: branchData.code,
            description: branchData.region
          })
        });
        if (response.ok) {
          const createdBranch = await response.json();
          setBranches([{ ...createdBranch, region: createdBranch.description || branchData.region, memberCount: 0, createdAt: createdBranch.createdAt ? new Date(createdBranch.createdAt).toLocaleDateString() : "" }, ...branches]);
        } else {
          showToastMessage("The branch could not be created. Please try again.", "error");
        }
      }
      setBranchData({ name: "", code: "", region: "", leaderId: "" });
      setShowBranchForm(false);
      setIsSavingBranch(false);
    };
    const handleEditBatch = (batch) => {
      setEditingBatchId(batch.id);
      setBatchData({
        year: String(batch.year),
        name: batch.name,
        season: batch.season || ""
      });
      setShowBatchForm(true);
    };
    const handleCreateBatch = async () => {
      if (!batchData.year || !batchData.name) {
        showToastMessage("Please provide a batch year and name before saving.", "warning");
        return;
      }
      setIsSavingBatch(true);
      try {
        const payload = {
          year: Number(batchData.year),
          name: batchData.name,
          season: batchData.season || void 0
        };
        if (editingBatchId) {
          const response = await fetch(`${apiBaseUrl}/batch/${editingBatchId}`, {
            method: "PUT",
            headers: getAuthHeaders(adminToken),
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            throw new Error("Unable to update batch");
          }
          const updatedBatch = await response.json();
          setBatches(batches.map((batch) => batch.id === editingBatchId ? { ...batch, ...updatedBatch } : batch));
          showToastMessage("Batch updated successfully.", "success");
          setEditingBatchId(null);
        } else {
          const response = await fetch(`${apiBaseUrl}/batch`, {
            method: "POST",
            headers: getAuthHeaders(adminToken),
            body: JSON.stringify(payload)
          });
          if (!response.ok) {
            throw new Error("Unable to create batch");
          }
          const createdBatch = await response.json();
          setBatches([{ ...createdBatch, createdAt: createdBatch.createdAt ? new Date(createdBatch.createdAt).toLocaleDateString() : "" }, ...batches]);
          showToastMessage("Batch created successfully.", "success");
        }
      } catch (error) {
        console.error("Batch save failed:", error);
        showToastMessage("The batch could not be saved. Please try again.", "error");
      } finally {
        setIsSavingBatch(false);
        setBatchData({ year: "", name: "", season: "" });
        setShowBatchForm(false);
      }
    };
    const handleDeleteBatch = (id) => {
      openDeleteModal("batch", id, "Delete batch?", "This action will remove the batch from the system and may affect alumni and events that currently use it.");
    };
    return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "animate-float-in", style: { minHeight: "100vh", display: "flex", background: "var(--off)" }, children: [
      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Toast, { show: toast.show, message: toast.message, type: toast.type }),
      deleteModal.open && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { onClick: closeDeleteModal, style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1100, padding: "20px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { onClick: (e) => e.stopPropagation(), style: { width: "100%", maxWidth: "480px", background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 18px 60px rgba(0,0,0,0.25)" }, children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 18, color: "var(--navy)", marginBottom: "8px" }, children: deleteModal.title }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "14px", color: "var(--gray)", lineHeight: 1.6 }, children: deleteModal.message }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "18px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: closeDeleteModal, disabled: deleteModal.loading, style: { padding: "10px 16px", background: "var(--off)", color: "var(--navy)", border: "1px solid var(--lgray)", borderRadius: "8px", cursor: "pointer", fontWeight: 600 }, children: "Cancel" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: handleConfirmDelete, disabled: deleteModal.loading, style: { padding: "10px 16px", background: "#dc2626", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }, children: deleteModal.loading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoaderCircle, { size: 16, className: "loading-spinner" }),
            " Deleting..."
          ] }) : "Delete" })
        ] })
      ] }) }),
      sidebarOpen && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
        "div",
        {
          onClick: () => setSidebarOpen(false),
          style: {
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            zIndex: 40
          },
          className: "md:hidden"
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
        "aside",
        {
          style: {
            width: "260px",
            background: "linear-gradient(180deg, var(--navy), var(--navy2))",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            position: "fixed",
            left: 0,
            top: 0,
            bottom: 0,
            zIndex: 50,
            transition: "transform 0.3s ease"
          },
          className: `admin-sidebar ${sidebarOpen ? "open" : ""}`,
          children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "12px", marginBottom: "32px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "img",
                {
                  src: "/logo.png",
                  alt: "JOPESA Logo",
                  style: { width: "56px", height: "56px", borderRadius: "50%", border: "2px solid var(--gold)", objectFit: "cover" }
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { style: { fontSize: "16px", fontWeight: "800", color: "var(--gold2)", letterSpacing: "0.8px", margin: 0 }, children: "JOPESA" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "10px", color: "rgba(255,255,255,0.5)", letterSpacing: "0.6px", textTransform: "uppercase" }, children: "Admin Panel" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("nav", { style: { display: "flex", flexDirection: "column", gap: "8px", flex: 1 }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => {
                    setActiveSection("overview");
                    setSidebarOpen(false);
                  },
                  style: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", background: activeSection === "overview" ? "rgba(200,150,12,0.2)" : "transparent", color: activeSection === "overview" ? "var(--gold2)" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", textAlign: "left" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Shield, { size: 18 }),
                    " Overview"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => {
                    setActiveSection("events");
                    setSidebarOpen(false);
                  },
                  style: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", background: activeSection === "events" ? "rgba(200,150,12,0.2)" : "transparent", color: activeSection === "events" ? "var(--gold2)" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", textAlign: "left" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Calendar, { size: 18 }),
                    " Events"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => {
                    setActiveSection("announcements");
                    setSidebarOpen(false);
                  },
                  style: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", background: activeSection === "announcements" ? "rgba(200,150,12,0.2)" : "transparent", color: activeSection === "announcements" ? "var(--gold2)" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", textAlign: "left" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Megaphone, { size: 18 }),
                    " Announcements"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => {
                    setActiveSection("documents");
                    setSidebarOpen(false);
                  },
                  style: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", background: activeSection === "documents" ? "rgba(200,150,12,0.2)" : "transparent", color: activeSection === "documents" ? "var(--gold2)" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", textAlign: "left" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FileText, { size: 18 }),
                    " Documents"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => {
                    setActiveSection("branches");
                    setSidebarOpen(false);
                  },
                  style: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", background: activeSection === "branches" ? "rgba(200,150,12,0.2)" : "transparent", color: activeSection === "branches" ? "var(--gold2)" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", textAlign: "left" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Users, { size: 18 }),
                    " Branches"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => {
                    setActiveSection("batches");
                    setSidebarOpen(false);
                  },
                  style: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", background: activeSection === "batches" ? "rgba(200,150,12,0.2)" : "transparent", color: activeSection === "batches" ? "var(--gold2)" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", textAlign: "left" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GraduationCap, { size: 18 }),
                    " Batches"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => {
                    setActiveSection("photos");
                    setSidebarOpen(false);
                  },
                  style: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", background: activeSection === "photos" ? "rgba(200,150,12,0.2)" : "transparent", color: activeSection === "photos" ? "var(--gold2)" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", textAlign: "left" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Image, { size: 18 }),
                    " Photos"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => {
                    setActiveSection("registrations");
                    setSidebarOpen(false);
                  },
                  style: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", background: activeSection === "registrations" ? "rgba(200,150,12,0.2)" : "transparent", color: activeSection === "registrations" ? "var(--gold2)" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", textAlign: "left" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(UserPlus, { size: 18 }),
                    " Registrations"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => {
                    setActiveSection("contributions");
                    setSidebarOpen(false);
                  },
                  style: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", background: activeSection === "contributions" ? "rgba(200,150,12,0.2)" : "transparent", color: activeSection === "contributions" ? "var(--gold2)" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", textAlign: "left" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DollarSign, { size: 18 }),
                    " Contributions"
                  ]
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "button",
                {
                  onClick: () => {
                    setActiveSection("statistics");
                    setSidebarOpen(false);
                  },
                  style: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "none", background: activeSection === "statistics" ? "rgba(200,150,12,0.2)" : "transparent", color: activeSection === "statistics" ? "var(--gold2)" : "rgba(255,255,255,0.6)", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", textAlign: "left" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ChartColumn, { size: 18 }),
                    " Statistics"
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "button",
              {
                onClick: handleLogout,
                style: { display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px", border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.05)", color: "rgba(255,255,255,0.7)", fontSize: "14px", fontWeight: "600", cursor: "pointer", transition: "all 0.15s", marginTop: "auto" },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LogOut, { size: 18 }),
                  " Logout"
                ]
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("main", { style: { flex: 1, marginLeft: "260px", padding: "32px 32px 32px 32px", maxWidth: "1200px", boxSizing: "border-box" }, className: "admin-main", children: [
        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
          "button",
          {
            onClick: () => setSidebarOpen(!sidebarOpen),
            className: "admin-hamburger",
            style: {
              display: "none",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              background: "var(--navy)",
              color: "var(--gold2)",
              border: "none",
              cursor: "pointer",
              marginBottom: "16px"
            },
            children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Menu, { size: 24 })
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginBottom: "24px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h2", { style: { fontSize: "32px", fontWeight: "800", color: "var(--navy)", marginBottom: "8px", margin: 0 }, children: activeSection.charAt(0).toUpperCase() + activeSection.slice(1) }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { style: { fontSize: "15px", color: "var(--gray)", margin: 0 }, children: [
            "Manage your ",
            activeSection,
            " content"
          ] })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "stats-row", style: { marginBottom: "32px", gridTemplateColumns: "repeat(auto-fit, minmax(80px, 1fr))" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "stat-cell", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-num", children: users.length }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-lbl", children: "Users" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "stat-cell", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-num", children: branches.length }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-lbl", children: "Branches" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "stat-cell", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-num", children: events.length }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-lbl", children: "Events" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "stat-cell", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-num", children: announcements.length }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-lbl", children: "Posts" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "stat-cell", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-num", children: documents.length }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-lbl", children: "Docs" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "stat-cell", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-num", children: stats?.batches ?? batches.length }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-lbl", children: "Batches" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "stat-cell", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-num", children: contributions.length }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "stat-lbl", children: "Contributions" })
          ] })
        ] }),
        activeSection === "statistics" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-statistics-page", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-stats-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h1", { className: "admin-stats-title", children: "Member Statistics" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "admin-stats-subtitle", children: "Track alumni, branches, batches and overall participation" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-stats-actions", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => exportData("xls"), className: "admin-stats-btn admin-stats-btn-secondary", children: "Export Excel" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => exportData("json"), className: "admin-stats-btn admin-stats-btn-primary", children: "Export JSON" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-stats-filters", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-filter-group", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
              "input",
              {
                type: "text",
                value: statisticsFilters.search,
                onChange: (e) => setStatisticsFilters((prev) => ({ ...prev, search: e.target.value })),
                placeholder: "Search alumni by name or email",
                className: "admin-filter-input"
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-filter-group", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "select",
              {
                value: statisticsFilters.branchId,
                onChange: (e) => setStatisticsFilters((prev) => ({ ...prev, branchId: e.target.value })),
                className: "admin-filter-select",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "all", children: "All branches" }),
                  branches.map((branch) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: branch.id, children: branch.name }, branch.id))
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-filter-group", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "select",
              {
                value: statisticsFilters.batchId,
                onChange: (e) => setStatisticsFilters((prev) => ({ ...prev, batchId: e.target.value })),
                className: "admin-filter-select",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "all", children: "All batches" }),
                  batches.map((batch) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: batch.id, children: batch.name || `Batch ${batch.year}` }, batch.id))
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-filter-group", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "select",
              {
                value: statisticsFilters.role,
                onChange: (e) => setStatisticsFilters((prev) => ({ ...prev, role: e.target.value })),
                className: "admin-filter-select",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "all", children: "All roles" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "member", children: "Alumni" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "branch_leader", children: "Branch leaders" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "admin", children: "Admins" })
                ]
              }
            ) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-filter-group admin-filter-date", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "input",
                {
                  type: "date",
                  value: dateRange.start,
                  onChange: (e) => setDateRange((prev) => ({ ...prev, start: e.target.value })),
                  className: "admin-filter-input"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "input",
                {
                  type: "date",
                  value: dateRange.end,
                  onChange: (e) => setDateRange((prev) => ({ ...prev, end: e.target.value })),
                  className: "admin-filter-input"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-stats-metrics", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-card admin-metric-card-primary", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-icon", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Users, { size: 24 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-content", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-value", children: statsSummary.totalAlumni }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-label", children: "Alumni" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-card admin-metric-card-secondary", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-icon", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Shield, { size: 24 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-content", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-value", children: statsSummary.totalLeaders }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-label", children: "Leaders" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-card admin-metric-card-tertiary", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-icon", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Shield, { size: 24 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-content", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-value", children: statsSummary.totalAdmins }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-label", children: "Admins" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-card admin-metric-card-quaternary", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-icon", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Building2, { size: 24 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-content", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-value", children: statsSummary.totalBranches }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-label", children: "Branches" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-card admin-metric-card-quinary", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-icon", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GraduationCap, { size: 24 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-content", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-value", children: statsSummary.totalBatches }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-label", children: "Batches" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-card admin-metric-card-senary", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-icon", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Calendar, { size: 24 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-content", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-value", children: filteredEventsByDate.length }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-label", children: "Events" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-card admin-metric-card-primary admin-metric-card-contributions", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-icon", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DollarSign, { size: 24 }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-metric-content", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-value", children: statsSummary.totalContributions }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-metric-label", children: "Contributions" })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-stats-charts", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-chart-card", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-chart-header", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { children: "Engagement Trend" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-chart-badge", children: "Monthly" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-chart-content", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-bar-chart", children: engagementTrend.map((item) => {
                const maxValue = Math.max(...engagementTrend.map((entry) => entry.value), 1);
                const height = `${Math.max(item.value / maxValue * 100, 8)}%`;
                return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-bar-item", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-bar-container", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                    "div",
                    {
                      className: "admin-bar",
                      style: { height }
                    }
                  ) }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-bar-label", children: item.label })
                ] }, item.label);
              }) }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-chart-card", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-chart-header", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { children: "Role Distribution" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-chart-badge", children: "Users" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-chart-content admin-chart-content-centered", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-donut-chart", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DonutChart, { data: roleDistribution, size: 180, strokeWidth: 20 }) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-legend", children: roleDistribution.map((entry) => {
                  const pct = statsSummary.totalUsers ? entry.value / statsSummary.totalUsers * 100 : 0;
                  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-legend-item", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-legend-color", style: { background: entry.color } }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-legend-info", children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "admin-legend-label", children: entry.label }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "admin-legend-value", children: [
                        entry.value,
                        " (",
                        pct.toFixed(1),
                        "%)"
                      ] })
                    ] })
                  ] }, entry.label);
                }) })
              ] })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-stats-rankings", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-ranking-card", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-ranking-header", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { children: "Top Branches" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Building2, { size: 20 })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-ranking-list", children: branchRanking.map((branch, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-ranking-item", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-ranking-rank", children: index + 1 }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-ranking-info", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-ranking-name", children: branch.name }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-ranking-detail", children: branch.region || "Regional branch" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-ranking-count", children: branch.usersCount })
              ] }, branch.id)) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-ranking-card", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-ranking-header", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { children: "Top Batches" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GraduationCap, { size: 20 })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-ranking-list", children: batchRanking.map((batch, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-ranking-item", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-ranking-rank admin-ranking-rank-secondary", children: index + 1 }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-ranking-info", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-ranking-name", children: batch.name || `Batch ${batch.year}` }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-ranking-detail", children: batch.season || "Batch record" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-ranking-count", children: batch.eventCount })
              ] }, batch.id)) })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-stats-detailed-buttons", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "button",
              {
                onClick: () => setBranchStatsModal(true),
                className: "admin-stats-detail-btn",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Building2, { size: 20 }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { children: "Branch Statistics" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "View detailed branch metrics" })
                  ] })
                ]
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "button",
              {
                onClick: () => setBatchStatsModal(true),
                className: "admin-stats-detail-btn",
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GraduationCap, { size: 20 }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { children: "Batch Statistics" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { children: "View detailed batch metrics" })
                  ] })
                ]
              }
            )
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-stats-table-card", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-stats-table-header", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { children: "Filtered Alumni" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { className: "admin-stats-table-count", children: [
                filteredUsers.length,
                " records"
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-stats-table-wrapper", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("table", { className: "admin-stats-table", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: "Name" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: "Email" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: "Role" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { children: "Branch" })
              ] }) }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { children: filteredUsers.length > 0 ? filteredUsers.map((user) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { className: "admin-table-name", children: user.name }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { className: "admin-table-email", children: user.email }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { className: "admin-table-role", children: user.role }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { className: "admin-table-branch", children: branches.find((branch) => branch.id === user.branchId)?.name || "Unassigned" })
              ] }, user.id)) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tr", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { colSpan: 4, className: "admin-table-empty", children: "No alumni match the selected filters." }) }) })
            ] }) })
          ] }),
          branchStatsModal && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-modal-overlay", onClick: () => setBranchStatsModal(false), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-modal-content", onClick: (e) => e.stopPropagation(), children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-modal-header", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { children: "Branch Statistics" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setBranchStatsModal(false), className: "admin-modal-close", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 20 }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-modal-body", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-detailed-grid", children: branchStats.map((branch) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-detailed-item", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-detailed-item-header", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { children: branch.name }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: branch.region || "No region set" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-detailed-stats", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-detailed-stat", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "admin-detailed-stat-label", children: "Users" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "admin-detailed-stat-value", children: branch.usersCount })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-detailed-stat", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "admin-detailed-stat-label", children: "Alumni" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "admin-detailed-stat-value", children: branch.alumniCount })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-detailed-stat", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "admin-detailed-stat-label", children: "Leaders" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "admin-detailed-stat-value", children: branch.leaderCount })
                ] })
              ] })
            ] }, branch.id)) }) })
          ] }) }),
          batchStatsModal && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-modal-overlay", onClick: () => setBatchStatsModal(false), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-modal-content", onClick: (e) => e.stopPropagation(), children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-modal-header", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h3", { children: "Batch Statistics" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setBatchStatsModal(false), className: "admin-modal-close", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 20 }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-modal-body", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-detailed-grid", children: batchStats.map((batch) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-detailed-item", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-detailed-item-header", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("h4", { children: batch.name || `Batch ${batch.year}` }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: batch.season || "Batch record" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-detailed-stats admin-detailed-stats-pair", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-detailed-stat", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "admin-detailed-stat-label", children: "Events" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "admin-detailed-stat-value", children: batch.eventCount })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-detailed-stat", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "admin-detailed-stat-label", children: "Year" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: "admin-detailed-stat-value", children: batch.year || "\u2014" })
                ] })
              ] })
            ] }, batch.id)) }) })
          ] }) })
        ] }),
        activeSection === "overview" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "24px" }, className: "admin-grid-2", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 17, color: "var(--navy)", marginBottom: "16px" }, children: "Recent Activity" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
              events.slice(0, 3).map((event) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { padding: "12px", background: "var(--off)", borderRadius: "8px", border: "1px solid var(--lgray)" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, fontSize: 14, color: "var(--navy)", marginBottom: "4px" }, children: event.title }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: [
                  event.startDate,
                  " \xB7 ",
                  event.location
                ] })
              ] }, event.id)),
              events.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { padding: "24px", textAlign: "center", color: "var(--gray)", fontSize: 14 }, children: "No recent events" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 17, color: "var(--navy)", marginBottom: "16px" }, children: "Recent Announcements" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
              announcements.slice(0, 3).map((announcement) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { padding: "12px", background: "var(--off)", borderRadius: "8px", border: "1px solid var(--lgray)" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, fontSize: 14, color: "var(--navy)", marginBottom: "4px" }, children: announcement.title }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: [
                  announcement.createdAt,
                  " \xB7 ",
                  announcement.createdBy
                ] })
              ] }, announcement.id)),
              announcements.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { padding: "24px", textAlign: "center", color: "var(--gray)", fontSize: 14 }, children: "No recent announcements" })
            ] })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", style: { gridColumn: "1 / -1" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 17, color: "var(--navy)", marginBottom: "16px" }, children: "Quick Actions" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px" }, className: "admin-grid-4", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => setActiveSection("events"), style: { padding: "16px", background: "var(--navy)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Calendar, { size: 24 }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Create Event" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => setActiveSection("announcements"), style: { padding: "16px", background: "var(--gold)", color: "var(--navy)", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Megaphone, { size: 24 }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Post Update" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => setActiveSection("documents"), style: { padding: "16px", background: "var(--navy)", color: "#fff", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FileText, { size: 24 }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Upload Doc" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => setActiveSection("branches"), style: { padding: "16px", background: "var(--gold)", color: "var(--navy)", border: "none", borderRadius: "10px", fontWeight: "600", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Building2, { size: 24 }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { children: "Add Branch" })
              ] })
            ] })
          ] })
        ] }),
        activeSection === "events" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", style: { width: "100%", maxWidth: "100%", padding: "24px 24px 20px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 17, color: "var(--navy)" }, children: "Manage Events" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: "Create and edit events" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "btn btn-gold btn-sm", onClick: () => {
              setShowEventForm(!showEventForm);
              setEditingEventId(null);
            }, children: [
              showEventForm ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Plus, { size: 14 }),
              " ",
              showEventForm ? "Cancel" : "New Event"
            ] })
          ] }),
          showEventForm && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
            "div",
            {
              className: "reg-panel open event-form-panel",
              style: {
                width: "100%",
                paddingTop: "8px",
                maxHeight: "70vh",
                overflowY: "auto",
                overflowX: "hidden",
                paddingRight: "8px"
              },
              children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "divider" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px", width: "100%" }, className: "admin-grid-2", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Event Title *" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: eventData.title, onChange: (e) => setEventData({ ...eventData, title: e.target.value }), placeholder: "e.g. Annual Reunion" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Location *" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: eventData.location, onChange: (e) => setEventData({ ...eventData, location: e.target.value }), placeholder: "e.g. JOPACC Campus" })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Batch Numbers *" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "8px" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", gap: "8px", flexWrap: "wrap" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: () => {
                            const allBatchIds = batches.map((batch) => batch.id).filter(Boolean);
                            setEventData({ ...eventData, batchIds: allBatchIds });
                          },
                          style: { padding: "8px 12px", borderRadius: "8px", border: "1px solid var(--navy)", background: "var(--navy)", color: "#fff", cursor: "pointer", fontSize: "12px", fontWeight: 700 },
                          children: "All Batches"
                        }
                      ) }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                        "select",
                        {
                          value: "",
                          onChange: (e) => {
                            const selectedBatchId = e.target.value;
                            if (!selectedBatchId || eventData.batchIds.includes(selectedBatchId)) return;
                            setEventData({ ...eventData, batchIds: [...eventData.batchIds, selectedBatchId] });
                          },
                          style: { width: "100%", padding: "12px 14px", border: "2px solid var(--lgray)", borderRadius: "8px", fontSize: "14px" },
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "", children: "\u2014 Select a batch \u2014" }),
                            batches.map((batch) => {
                              const label = batch?.name || `Batch ${batch?.year ?? ""}`;
                              return /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: batch.id, children: label }, batch.id);
                            })
                          ]
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", flexWrap: "wrap", gap: "8px" }, children: eventData.batchIds.map((batchId) => {
                        const batch = batches.find((item) => item.id === batchId);
                        const label = batch?.name || `Batch ${batch?.year ?? ""}`;
                        return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { style: { display: "inline-flex", alignItems: "center", gap: "6px", padding: "6px 10px", background: "var(--off)", border: "1px solid var(--lgray)", borderRadius: "999px", fontSize: "12px", color: "var(--navy)" }, children: [
                          label,
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", onClick: () => setEventData({ ...eventData, batchIds: eventData.batchIds.filter((id) => id !== batchId) }), style: { background: "transparent", border: "none", cursor: "pointer", padding: 0, color: "var(--navy)" }, "aria-label": `Remove ${label}`, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 12 }) })
                        ] }, batchId);
                      }) })
                    ] })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Start Date *" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "date", value: eventData.startDate, onChange: (e) => setEventData({ ...eventData, startDate: e.target.value }) })
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "End Date *" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "date", value: eventData.endDate, onChange: (e) => setEventData({ ...eventData, endDate: e.target.value }) })
                  ] })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Description" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("textarea", { value: eventData.description, onChange: (e) => setEventData({ ...eventData, description: e.target.value }), placeholder: "Event details...", style: { width: "100%", padding: "15px 16px", border: "2px solid var(--lgray)", borderRadius: "10px", fontSize: "15px", fontFamily: "inherit", minHeight: "80px", resize: "vertical" } })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Event Images" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "file", multiple: true, accept: "image/*", onChange: (e) => handleEventImageSelection(e.target.files), style: { width: "100%", padding: "15px 16px", border: "2px solid var(--lgray)", borderRadius: "10px", fontSize: "15px", fontFamily: "inherit" } }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 11, color: "var(--gray)", marginTop: 4 }, children: "Upload one or more event images" })
                ] }),
                (eventImageFiles.length > 0 || eventData.images?.length) && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: "10px", marginTop: "8px" }, children: [
                  eventImageFiles.map((file, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { border: "1px solid var(--lgray)", borderRadius: "8px", overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: URL.createObjectURL(file), alt: `Preview ${index + 1}`, style: { width: "100%", height: "120px", objectFit: "cover" } }) }, `new-${index}`)),
                  eventData.images?.map((image, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { border: "1px solid var(--lgray)", borderRadius: "8px", overflow: "hidden" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: image, alt: `Existing preview ${index + 1}`, style: { width: "100%", height: "120px", objectFit: "cover" } }) }, `existing-${index}`))
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", gap: "8px", marginTop: "8px", padding: "12px 14px", background: "var(--off)", borderRadius: "10px", border: "1px solid var(--lgray)" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "13px", color: "var(--gray)" }, children: eventData.registrationForm.length > 0 ? `${eventData.registrationForm.length} registration field${eventData.registrationForm.length > 1 ? "s" : ""} configured` : "No registration form yet" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                    "button",
                    {
                      type: "button",
                      onClick: () => setShowRegistrationFormModal(true),
                      style: { padding: "8px 12px", background: "var(--gold)", color: "var(--navy)", border: "none", borderRadius: "8px", fontWeight: "600", cursor: "pointer", display: "flex", alignItems: "center", gap: "6px" },
                      children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Plus, { size: 14 }),
                        " ",
                        eventData.registrationForm.length > 0 ? "Edit Form" : "Add Form"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Status" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "sel-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value: eventData.status, onChange: (e) => setEventData({ ...eventData, status: e.target.value }), children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "upcoming", children: "Upcoming" }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "past", children: "Past" })
                  ] }) })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-navy", onClick: handleCreateEvent, disabled: isSavingEvent, style: { marginTop: "8px", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }, children: isSavingEvent ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoaderCircle, { size: 16, className: "loading-spinner" }),
                  " ",
                  editingEventId ? "Updating Event..." : "Creating Event..."
                ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: editingEventId ? "Update Event \u2192" : "Create Event \u2192" }) })
              ]
            }
          ),
          showRegistrationFormModal && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
            "div",
            {
              onClick: () => setShowRegistrationFormModal(false),
              style: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1e3, padding: "20px" },
              children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "div",
                {
                  onClick: (e) => e.stopPropagation(),
                  style: { width: "100%", maxWidth: "680px", maxHeight: "85vh", overflowY: "auto", background: "#fff", borderRadius: "16px", padding: "24px", boxShadow: "0 18px 60px rgba(0,0,0,0.25)" },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }, children: [
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 18, color: "var(--navy)" }, children: "Registration Form Builder" }),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 13, color: "var(--gray)", marginTop: "4px" }, children: "Create the fields for event registration" })
                      ] }),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", onClick: () => setShowRegistrationFormModal(false), style: { background: "transparent", border: "none", cursor: "pointer", color: "var(--gray)", padding: "4px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 18 }) })
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "12px" }, children: [
                      eventData.registrationForm.map((field, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { padding: "12px", background: "var(--off)", borderRadius: "10px", border: "1px solid var(--lgray)" }, children: [
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                            "input",
                            {
                              type: "text",
                              value: field.label,
                              onChange: (e) => {
                                const updated = [...eventData.registrationForm];
                                updated[index].label = e.target.value;
                                setEventData({ ...eventData, registrationForm: updated });
                              },
                              placeholder: "Field Label (e.g., Full Name)",
                              style: { flex: 1, padding: "8px 12px", border: "1px solid var(--lgray)", borderRadius: "6px", fontSize: "13px" }
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                            "button",
                            {
                              type: "button",
                              onClick: () => {
                                const updated = eventData.registrationForm.filter((_, i) => i !== index);
                                setEventData({ ...eventData, registrationForm: updated });
                              },
                              style: { marginLeft: "8px", padding: "6px 10px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer", fontSize: "12px", fontWeight: 600 },
                              children: "Remove"
                            }
                          )
                        ] }),
                        /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "8px" }, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                            "select",
                            {
                              value: field.type,
                              onChange: (e) => {
                                const updated = [...eventData.registrationForm];
                                updated[index].type = e.target.value;
                                setEventData({ ...eventData, registrationForm: updated });
                              },
                              style: { padding: "8px 12px", border: "1px solid var(--lgray)", borderRadius: "6px", fontSize: "13px" },
                              children: [
                                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "text", children: "Text" }),
                                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "number", children: "Number" }),
                                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "email", children: "Email" }),
                                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "textarea", children: "Text Area" }),
                                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "radio", children: "Radio" }),
                                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "checkbox", children: "Checkbox" }),
                                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "select", children: "Select" }),
                                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "file", children: "File Upload" }),
                                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "date", children: "Date" })
                              ]
                            }
                          ),
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { style: { display: "flex", alignItems: "center", gap: "6px", fontSize: "13px" }, children: [
                            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                              "input",
                              {
                                type: "checkbox",
                                checked: field.required,
                                onChange: (e) => {
                                  const updated = [...eventData.registrationForm];
                                  updated[index].required = e.target.checked;
                                  setEventData({ ...eventData, registrationForm: updated });
                                }
                              }
                            ),
                            "Required"
                          ] })
                        ] }),
                        (field.type === "radio" || field.type === "checkbox" || field.type === "select") && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginTop: "8px" }, children: [
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 12, color: "var(--gray)", marginBottom: "4px" }, children: "Options (comma-separated):" }),
                          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                            "input",
                            {
                              type: "text",
                              value: field.options?.map((o) => o.label).join(", ") || "",
                              onChange: (e) => {
                                const updated = [...eventData.registrationForm];
                                updated[index].options = e.target.value.split(",").map((s) => ({ label: s.trim(), value: s.trim().toLowerCase().replace(/\s+/g, "_") })).filter((o) => o.label);
                                setEventData({ ...eventData, registrationForm: updated });
                              },
                              placeholder: "Option 1, Option 2, Option 3",
                              style: { width: "100%", padding: "8px 12px", border: "1px solid var(--lgray)", borderRadius: "6px", fontSize: "13px" }
                            }
                          )
                        ] })
                      ] }, index)),
                      /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                        "button",
                        {
                          type: "button",
                          onClick: () => setEventData({ ...eventData, registrationForm: [...eventData.registrationForm, { id: `field_${Date.now()}`, label: "", type: "text", required: false, options: [] }] }),
                          style: { padding: "10px 16px", background: "var(--navy)", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 },
                          children: "+ Add Field"
                        }
                      )
                    ] }),
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { marginTop: "16px", display: "flex", justifyContent: "flex-end" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", onClick: () => setShowRegistrationFormModal(false), style: { padding: "10px 16px", background: "var(--gold)", color: "var(--navy)", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }, children: "Done" }) })
                  ]
                }
              )
            }
          ),
          events.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "empty-state", style: { textAlign: "center", padding: "48px 24px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Calendar, { size: 48, style: { color: "var(--navy)" } }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "16px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }, children: "No events yet" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "14px", color: "var(--gray)" }, children: "Create your first event to get started" })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginTop: "16px" }, children: events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", style: { position: "relative" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { position: "absolute", top: 12, right: 12, display: "flex", gap: "8px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "button",
                {
                  onClick: () => handleEditEvent(event),
                  style: { background: "var(--off)", color: "var(--navy)", border: "1px solid var(--lgray)", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", fontSize: "11px", fontWeight: 600 },
                  children: "Edit"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "del-btn", onClick: () => openDeleteModal("event", event.id, "Delete event?", "This action will remove the event from the dashboard and cannot be undone."), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Trash2, { size: 14 }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 700, fontSize: 16, color: "var(--navy)", marginBottom: 5 }, children: event.title }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 13, color: "var(--gray)", marginBottom: 8 }, children: event.description }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", gap: 15, fontSize: 12, color: "var(--gray)", alignItems: "center" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Calendar, { size: 12 }),
                " ",
                event.startDate,
                " - ",
                event.endDate
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(MapPin, { size: 12 }),
                " ",
                event.location
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { marginTop: 10 }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `status-badge ${event.status}`, children: event.status }) }),
            event.meetLink && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
              "a",
              {
                href: event.meetLink,
                target: "_blank",
                rel: "noopener noreferrer",
                style: {
                  marginTop: 8,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "4px",
                  fontSize: "11px",
                  color: "var(--navy)",
                  textDecoration: "none",
                  fontWeight: 500
                },
                children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(ExternalLink, { size: 10 }),
                  " Meeting Link"
                ]
              }
            )
          ] }, event.id)) })
        ] }),
        activeSection === "announcements" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 17, color: "var(--navy)" }, children: "Manage Announcements" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: "Create and edit announcements" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "btn btn-gold btn-sm", onClick: () => {
              setShowAnnouncementForm(!showAnnouncementForm);
              setEditingAnnouncementId(null);
            }, children: [
              showAnnouncementForm ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Plus, { size: 14 }),
              " ",
              showAnnouncementForm ? "Cancel" : "New Post"
            ] })
          ] }),
          showAnnouncementForm && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-panel open", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "divider" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }, className: "admin-grid-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Title *" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: announcementData.title, onChange: (e) => setAnnouncementData({ ...announcementData, title: e.target.value }), placeholder: "e.g. Annual Meeting Schedule" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Type" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "sel-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value: announcementData.type, onChange: (e) => setAnnouncementData({ ...announcementData, type: e.target.value }), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "NEWS", children: "News" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "UPDATE", children: "Update" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "EVENT", children: "Event" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "OPPORTUNITY", children: "Opportunity" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "WARNING", children: "Warning" })
                ] }) })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }, className: "admin-grid-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Image URL (optional)" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "url", value: announcementData.imageUrl, onChange: (e) => setAnnouncementData({ ...announcementData, imageUrl: e.target.value }), placeholder: "https://example.com/image.jpg" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", style: { display: "flex", alignItems: "flex-end" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { style: { width: "100%", marginBottom: 8 }, children: "Pin announcement" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "12px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "checkbox", checked: announcementData.isPinned, onChange: (e) => setAnnouncementData({ ...announcementData, isPinned: e.target.checked }) }),
                  " ",
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { style: { color: "var(--gray)", fontSize: 13 }, children: "Pinned" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Content *" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("textarea", { value: announcementData.content, onChange: (e) => setAnnouncementData({ ...announcementData, content: e.target.value }), placeholder: "Announcement details...", style: { width: "100%", padding: "15px 16px", border: "2px solid var(--lgray)", borderRadius: "10px", fontSize: "15px", fontFamily: "inherit", minHeight: "100px", resize: "vertical" } })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-navy", onClick: handleSaveAnnouncement, disabled: isSavingAnnouncement, style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }, children: isSavingAnnouncement ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoaderCircle, { size: 16, className: "loading-spinner" }),
              " ",
              editingAnnouncementId ? "Updating Announcement..." : "Posting Announcement..."
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: editingAnnouncementId ? "Update Announcement \u2192" : "Post Announcement \u2192" }) })
          ] }),
          announcements.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "empty-state", style: { textAlign: "center", padding: "48px 24px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Megaphone, { size: 48, style: { color: "var(--navy)" } }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "16px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }, children: "No announcements yet" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "14px", color: "var(--gray)" }, children: "Create your first announcement to get started" })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "16px", marginTop: "16px" }, children: announcements.map((announcement) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", style: { borderLeft: announcement.isPinned ? "4px solid var(--gold)" : "4px solid var(--lgray)", position: "relative", marginTop: 10 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { position: "absolute", top: 12, right: 12, display: "flex", gap: "8px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "button",
                {
                  onClick: () => handleEditAnnouncement(announcement),
                  style: { background: "var(--off)", color: "var(--navy)", border: "1px solid var(--lgray)", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", fontSize: "11px", fontWeight: 600 },
                  children: "Edit"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "del-btn", onClick: () => openDeleteModal("announcement", announcement.id, "Delete announcement?", "This action will remove the announcement from the dashboard."), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Trash2, { size: 14 }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 700, fontSize: 16, color: "var(--navy)", marginBottom: 5 }, children: announcement.title }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 14, color: "var(--dark)", lineHeight: 1.5, marginBottom: 8 }, children: announcement.content }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: [
              announcement.createdAt,
              " \xB7 ",
              announcement.type,
              " \xB7 by ",
              announcement.createdBy
            ] })
          ] }, announcement.id)) })
        ] }),
        activeSection === "documents" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 17, color: "var(--navy)" }, children: "Manage Documents" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: "Upload and manage files" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "btn btn-gold btn-sm", onClick: () => setShowDocumentForm(!showDocumentForm), children: [
              showDocumentForm ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Plus, { size: 14 }),
              " ",
              showDocumentForm ? "Cancel" : "Upload"
            ] })
          ] }),
          showDocumentForm && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-panel open", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "divider" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }, className: "admin-grid-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Document Title *" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: documentData.title, onChange: (e) => setDocumentData({ ...documentData, title: e.target.value }), placeholder: "e.g. Annual Meeting Minutes" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Category *" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: documentData.category, onChange: (e) => setDocumentData({ ...documentData, category: e.target.value }), placeholder: "e.g. Reports" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }, className: "admin-grid-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "File Type" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "sel-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value: documentData.fileType, onChange: (e) => setDocumentData({ ...documentData, fileType: e.target.value }), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "PDF", children: "PDF" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "IMAGE", children: "Image" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "PRESENTATION", children: "Presentation" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "SPREADSHEET", children: "Spreadsheet" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "VIDEO", children: "Video" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "OTHER", children: "Other" })
                ] }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Tags" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: documentData.tags, onChange: (e) => setDocumentData({ ...documentData, tags: e.target.value }), placeholder: "e.g. alumni,meeting,minutes" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Description (optional)" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("textarea", { value: documentData.description, onChange: (e) => setDocumentData({ ...documentData, description: e.target.value }), placeholder: "Short summary of the document", style: { width: "100%", padding: "15px 16px", border: "2px solid var(--lgray)", borderRadius: "10px", fontSize: "15px", fontFamily: "inherit", minHeight: "90px", resize: "vertical" } })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "File *" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "file", onChange: (e) => setDocumentFile(e.target.files?.[0] || null), accept: ".pdf,.doc,.docx,.txt,.ppt,.pptx,.xlsx,.csv", style: { width: "100%", padding: "15px 16px", border: "2px solid var(--lgray)", borderRadius: "10px", fontSize: "15px", fontFamily: "inherit" } }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 11, color: "var(--gray)", marginTop: 4 }, children: "Accepted: PDF, DOC, DOCX, TXT, PPT, PPTX, XLSX, CSV" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-navy", onClick: handleCreateDocument, disabled: isCreatingDocument, style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }, children: isCreatingDocument ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoaderCircle, { size: 16, className: "loading-spinner" }),
              " Uploading Document..."
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: "Upload Document \u2192" }) })
          ] }),
          documents.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "empty-state", style: { textAlign: "center", padding: "48px 24px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(FileText, { size: 48, style: { color: "var(--navy)" } }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "16px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }, children: "No documents yet" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "14px", color: "var(--gray)" }, children: "Upload your first document to get started" })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginTop: "16px" }, children: documents.map((doc) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", style: { display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", minHeight: "80px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "del-btn", style: { position: "absolute", top: 12, right: 12 }, onClick: () => openDeleteModal("document", doc.id, "Delete document?", "This action will remove the document from the list and storage."), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Trash2, { size: 14 }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 700, fontSize: 15, color: "var(--navy)", marginBottom: 3 }, children: doc.title }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: [
                doc.type,
                " \xB7 ",
                doc.uploadedAt
              ] })
            ] })
          ] }, doc.id)) })
        ] }),
        activeSection === "branches" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 17, color: "var(--navy)" }, children: "Manage Branches" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: "Create and manage regional chapters" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "btn btn-gold btn-sm", onClick: () => {
              setShowBranchForm(!showBranchForm);
              setEditingBranchId(null);
            }, children: [
              showBranchForm ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Plus, { size: 14 }),
              " ",
              showBranchForm ? "Cancel" : "New Branch"
            ] })
          ] }),
          showBranchForm && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-panel open", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "divider" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }, className: "admin-grid-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Branch Name *" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: branchData.name, onChange: (e) => setBranchData({ ...branchData, name: e.target.value }), placeholder: "e.g. Douala Chapter" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Branch Code *" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: branchData.code, onChange: (e) => setBranchData({ ...branchData, code: e.target.value }), placeholder: "e.g. DOU" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }, className: "admin-grid-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Region *" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: branchData.region, onChange: (e) => setBranchData({ ...branchData, region: e.target.value }), placeholder: "e.g. Littoral Region" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Leader ID (optional)" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: branchData.leaderId, onChange: (e) => setBranchData({ ...branchData, leaderId: e.target.value }), placeholder: "Enter user ID" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-navy", onClick: handleCreateBranch, disabled: isSavingBranch, style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }, children: isSavingBranch ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoaderCircle, { size: 16, className: "loading-spinner" }),
              " ",
              editingBranchId ? "Updating Branch..." : "Creating Branch..."
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: editingBranchId ? "Update Branch \u2192" : "Create Branch \u2192" }) })
          ] }),
          branches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "empty-state", style: { textAlign: "center", padding: "48px 24px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Building2, { size: 48, style: { color: "var(--navy)" } }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "16px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }, children: "No branches yet" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "14px", color: "var(--gray)" }, children: "Create your first branch to get started" })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px", marginTop: "16px" }, children: branches.map((branch) => {
            const memberCount = users.filter((user) => user.branchId === branch.id).length;
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", style: { position: "relative" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { position: "absolute", top: 12, right: 12, display: "flex", gap: "8px" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "button",
                  {
                    onClick: () => handleEditBranch(branch),
                    style: { background: "var(--off)", color: "var(--navy)", border: "1px solid var(--lgray)", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", fontSize: "11px", fontWeight: 600 },
                    children: "Edit"
                  }
                ),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "del-btn", onClick: () => openDeleteModal("branch", branch.id, "Delete branch?", "This action will remove the branch from the system."), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Trash2, { size: 14 }) })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 700, fontSize: 16, color: "var(--navy)", marginBottom: 5 }, children: branch.name }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 13, color: "var(--gray)", marginBottom: 8 }, children: branch.region }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", gap: 15, fontSize: 12, color: "var(--gray)", alignItems: "center" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(UserPlus, { size: 12 }),
                  " ",
                  memberCount,
                  " member",
                  memberCount !== 1 ? "s" : ""
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("span", { style: { display: "flex", alignItems: "center", gap: "4px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Clock, { size: 12 }),
                  " Created ",
                  branch.createdAt
                ] })
              ] })
            ] }, branch.id);
          }) })
        ] }),
        activeSection === "batches" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 17, color: "var(--navy)" }, children: "Manage Batches" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: "Create and manage alumni cohort records" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "btn btn-gold btn-sm", onClick: () => {
              setShowBatchForm(!showBatchForm);
              setEditingBatchId(null);
            }, children: [
              showBatchForm ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Plus, { size: 14 }),
              " ",
              showBatchForm ? "Cancel" : "New Batch"
            ] })
          ] }),
          showBatchForm && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-panel open", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "divider" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }, className: "admin-grid-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Batch Year *" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "number", value: batchData.year, onChange: (e) => setBatchData({ ...batchData, year: e.target.value }), placeholder: "e.g. 2024" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Batch Name *" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: batchData.name, onChange: (e) => setBatchData({ ...batchData, name: e.target.value }), placeholder: "e.g. Batch 2024" })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Season (optional)" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: batchData.season, onChange: (e) => setBatchData({ ...batchData, season: e.target.value }), placeholder: "e.g. Spring" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-navy", onClick: handleCreateBatch, disabled: isSavingBatch, style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }, children: isSavingBatch ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoaderCircle, { size: 16, className: "loading-spinner" }),
              " ",
              editingBatchId ? "Updating Batch..." : "Creating Batch..."
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: editingBatchId ? "Update Batch \u2192" : "Create Batch \u2192" }) })
          ] }),
          batches.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "empty-state", style: { textAlign: "center", padding: "48px 24px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(GraduationCap, { size: 48, style: { color: "var(--navy)" } }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "16px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }, children: "No batches yet" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "14px", color: "var(--gray)" }, children: "Create your first alumni batch to get started" })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "16px", marginTop: "16px" }, children: batches.map((batch) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", style: { position: "relative" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { position: "absolute", top: 12, right: 12, display: "flex", gap: "8px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                "button",
                {
                  onClick: () => handleEditBatch(batch),
                  style: { background: "var(--off)", color: "var(--navy)", border: "1px solid var(--lgray)", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center", fontSize: "11px", fontWeight: 600 },
                  children: "Edit"
                }
              ),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "del-btn", onClick: () => handleDeleteBatch(batch.id), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Trash2, { size: 14 }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 700, fontSize: 16, color: "var(--navy)", marginBottom: 5 }, children: batch.name }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { fontSize: 13, color: "var(--gray)", marginBottom: 8 }, children: [
              "Year ",
              batch.year,
              batch.season ? ` \xB7 ${batch.season}` : ""
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: batch.createdAt || "Recently added" })
          ] }, batch.id)) })
        ] }),
        activeSection === "photos" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 17, color: "var(--navy)" }, children: "Manage Event Photos" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: "Upload photos for events" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "btn btn-gold btn-sm", onClick: () => setShowPhotoForm(!showPhotoForm), children: [
              showPhotoForm ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Plus, { size: 14 }),
              " ",
              showPhotoForm ? "Cancel" : "Upload Photos"
            ] })
          ] }),
          showPhotoForm && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-panel open", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "divider" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Select Event *" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "sel-wrap", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value: selectedEventId, onChange: (e) => setSelectedEventId(e.target.value), children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "", children: "\u2014 Select an event \u2014" }),
                events.map((event) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: event.id, children: event.title }, event.id))
              ] }) })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Photos & Videos *" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "file", multiple: true, accept: "image/*,video/*", onChange: (e) => handlePhotoSelection(e.target.files), style: { width: "100%", padding: "15px 16px", border: "2px solid var(--lgray)", borderRadius: "10px", fontSize: "15px", fontFamily: "inherit" } }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 11, color: "var(--gray)", marginTop: 4 }, children: "Accepted: JPG, PNG, GIF, WebP, MP4, MOV, AVI, up to 5 GB per file" })
            ] }),
            photoPreviewUrls.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: "10px", marginBottom: "12px" }, children: photoPreviewUrls.map((url, index) => {
              const file = photoFiles[index];
              const isVideo = file?.type?.startsWith("video/");
              return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { position: "relative", border: "1px solid var(--lgray)", borderRadius: "8px", overflow: "hidden", background: "#fff" }, children: [
                isVideo ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("video", { src: url, controls: true, style: { width: "100%", height: "110px", objectFit: "cover", display: "block", background: "#000" } }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: url, alt: `Media preview ${index + 1}`, style: { width: "100%", height: "110px", objectFit: "cover", display: "block" } }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "button",
                  {
                    type: "button",
                    onClick: () => removePhotoSelection(index),
                    "aria-label": `Remove selected media ${index + 1}`,
                    style: { position: "absolute", top: "6px", right: "6px", width: "22px", height: "22px", borderRadius: "50%", border: "none", background: "rgba(15, 23, 42, 0.78)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 700, cursor: "pointer" },
                    children: "\xD7"
                  }
                )
              ] }, `${file?.name || "media"}-${index}`);
            }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-navy", onClick: handleUploadPhotos, disabled: uploading, style: { display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }, children: uploading ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(LoaderCircle, { size: 16, className: "loading-spinner" }),
              " Uploading Photos..."
            ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(import_jsx_runtime2.Fragment, { children: "Upload Photos \u2192" }) })
          ] }),
          photos.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "empty-state", style: { textAlign: "center", padding: "48px 24px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Image, { size: 48, style: { color: "var(--navy)" } }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "16px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }, children: "No photos yet" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "14px", color: "var(--gray)" }, children: "Upload photos for events to get started" })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { marginTop: "16px" }, children: events.map((event) => {
            const eventPhotos = photos.filter((p) => p.eventId === event.id);
            if (eventPhotos.length === 0) return null;
            return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { marginBottom: "24px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { fontWeight: 700, fontSize: 16, color: "var(--navy)", marginBottom: "12px" }, children: [
                event.title,
                " (",
                eventPhotos.length,
                " photos)"
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))", gap: "12px" }, children: eventPhotos.map((photo) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { position: "relative" }, children: [
                isVideoMediaUrl(photo.url) ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("video", { src: photo.url, controls: true, style: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px", display: "block", background: "#000" } }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("img", { src: photo.url, alt: "Event photo", style: { width: "100%", height: "150px", objectFit: "cover", borderRadius: "8px" } }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(
                  "button",
                  {
                    onClick: () => openDeleteModal("photo", photo.id, "Delete photo?", "This action will remove the photo from the event gallery."),
                    style: { position: "absolute", top: "8px", right: "8px", background: "rgba(0,0,0,0.7)", color: "#fff", border: "none", borderRadius: "6px", padding: "4px 8px", cursor: "pointer", display: "flex", alignItems: "center" },
                    children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Trash2, { size: 12 })
                  }
                )
              ] }, photo.id)) })
            ] }, event.id);
          }) })
        ] }),
        activeSection === "registrations" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "reg-header", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 17, color: "var(--navy)" }, children: "Manage Event Registrations" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: "Review alumni registrations and payment proofs" })
          ] }) }),
          registrations.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "empty-state", style: { textAlign: "center", padding: "48px 24px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(UserPlus, { size: 48, style: { color: "var(--navy)" } }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "16px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }, children: "No registrations yet" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "14px", color: "var(--gray)" }, children: "Alumni registrations will appear here once submitted." })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { overflowX: "auto", width: "100%", maxWidth: "100%" }, className: "admin-table-responsive", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("table", { style: { width: "100%", borderCollapse: "collapse", minWidth: 700 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { style: { textAlign: "left", borderBottom: "2px solid var(--lgray)" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 10px", fontSize: 13, color: "var(--gray)" }, children: "Registrant" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 10px", fontSize: 13, color: "var(--gray)" }, children: "Event" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 10px", fontSize: 13, color: "var(--gray)" }, children: "Batch / Branch" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 10px", fontSize: 13, color: "var(--gray)" }, children: "Paid" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 10px", fontSize: 13, color: "var(--gray)" }, children: "Status" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 10px", fontSize: 13, color: "var(--gray)" }, children: "Actions" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { children: registrations.map((registration) => {
              const alumnus = registration.alumni?.user;
              const batch = registration.alumni?.batch;
              const branch = registration.alumni?.branch;
              return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { style: { borderBottom: "1px solid var(--lgray)" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: { padding: "12px 10px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { fontWeight: 700, color: "var(--navy)", fontSize: 13 }, children: [
                    alumnus?.firstName || "Alumnus",
                    " ",
                    alumnus?.lastName || ""
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 11, color: "var(--gray)" }, children: alumnus?.email || "No email" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: { padding: "12px 10px", fontSize: 12 }, children: registration.event?.title || "Unknown event" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: { padding: "12px 10px", fontSize: 12 }, children: [
                  batch?.name || (batch?.year ? `Batch ${batch.year}` : "No batch"),
                  branch?.name ? ` \xB7 ${branch.name}` : ""
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: { padding: "12px 10px", fontSize: 12 }, children: [
                  "$",
                  Number(registration.paidAmount ?? 0).toFixed(2)
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: { padding: "12px 10px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `status-badge ${String(registration.status || "PENDING").toLowerCase()}`, style: { textTransform: "capitalize", fontSize: 11, padding: "2px 8px" }, children: String(registration.status || "PENDING").toLowerCase() }) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: { padding: "12px 10px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", flexWrap: "wrap", gap: "6px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-sm btn-navy", onClick: () => handleUpdateRegistrationStatus(registration.id, "APPROVED"), style: { padding: "4px 8px", fontSize: 11 }, children: "Approve" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-sm btn-gold", onClick: () => handleUpdateRegistrationStatus(registration.id, "FLAGGED"), style: { padding: "4px 8px", fontSize: 11 }, children: "Flag" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-sm", onClick: () => handleUpdateRegistrationStatus(registration.id, "DECLINED"), style: { padding: "4px 8px", fontSize: 11, background: "#f8d7da", color: "#842029", border: "1px solid #f5c2c7" }, children: "Decline" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-sm btn-danger", onClick: () => openDeleteModal("registration", registration.id, "Delete registration?", "This action will remove this registration permanently."), style: { padding: "4px 8px", fontSize: 11 }, children: "Delete" })
                ] }) })
              ] }, registration.id);
            }) })
          ] }) })
        ] }),
        activeSection === "contributions" && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "card", style: { width: "100%", maxWidth: "100%", padding: "24px 24px 20px" }, children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 800, fontSize: 17, color: "var(--navy)" }, children: "Manage Contributions" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 12, color: "var(--gray)" }, children: "Create and edit contribution collections" })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "btn btn-gold btn-sm", onClick: () => {
              setShowContributionForm(!showContributionForm);
              setEditingContributionId(null);
              setContributionData({ title: "", type: "EVENT_REGISTRATION", description: "", installments: [], status: "ACTIVE" });
            }, children: [
              showContributionForm ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 14 }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Plus, { size: 14 }),
              " ",
              showContributionForm ? "Cancel" : "New Contribution"
            ] })
          ] }),
          showContributionForm && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "reg-panel open", style: { width: "100%", paddingTop: "8px", maxHeight: "70vh", overflowY: "auto", overflowX: "hidden", paddingRight: "8px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "divider" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))", gap: "16px", width: "100%" }, className: "admin-grid-2", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Title *" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: contributionData.title, onChange: (e) => setContributionData({ ...contributionData, title: e.target.value }), placeholder: "e.g., Annual Membership Fee 2026" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Type *" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value: contributionData.type, onChange: (e) => setContributionData({ ...contributionData, type: e.target.value }), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "EVENT_REGISTRATION", children: "Event Registration Fee" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "ANNUAL_FEE", children: "Annual Fee" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "GENERAL", children: "General" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "PROJECTS", children: "Projects" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "OTHER", children: "Other" })
                ] })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Status *" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("select", { value: contributionData.status, onChange: (e) => setContributionData({ ...contributionData, status: e.target.value }), children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "ACTIVE", children: "Active" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "INACTIVE", children: "Inactive" })
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Description" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("textarea", { value: contributionData.description, onChange: (e) => setContributionData({ ...contributionData, description: e.target.value }), placeholder: "Describe this contribution...", style: { width: "100%", padding: "15px 16px", border: "2px solid var(--lgray)", borderRadius: "10px", fontSize: "15px", fontFamily: "inherit", minHeight: "80px", resize: "vertical" } })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "fg", children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("label", { children: "Payment Installments" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", flexDirection: "column", gap: "10px" }, children: [
                contributionData.installments.map((installment, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", gap: "8px", alignItems: "center", padding: "12px", background: "var(--off)", borderRadius: "8px", border: "1px solid var(--lgray)" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "text", value: installment.label, onChange: (e) => {
                    const updated = [...contributionData.installments];
                    updated[index].label = e.target.value;
                    setContributionData({ ...contributionData, installments: updated });
                  }, placeholder: "Label (e.g., First Installment)", style: { flex: 1, padding: "12px 14px", border: "2px solid var(--lgray)", borderRadius: "8px", fontSize: "14px" } }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "number", value: installment.amount, onChange: (e) => {
                    const updated = [...contributionData.installments];
                    updated[index].amount = parseFloat(e.target.value) || 0;
                    setContributionData({ ...contributionData, installments: updated });
                  }, placeholder: "Amount", style: { width: "120px", padding: "12px 14px", border: "2px solid var(--lgray)", borderRadius: "8px", fontSize: "14px" } }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { type: "date", value: installment.dueDate, onChange: (e) => {
                    const updated = [...contributionData.installments];
                    updated[index].dueDate = e.target.value;
                    setContributionData({ ...contributionData, installments: updated });
                  }, style: { padding: "12px 14px", border: "2px solid var(--lgray)", borderRadius: "8px", fontSize: "14px" } }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => {
                    const updated = contributionData.installments.filter((_, i) => i !== index);
                    setContributionData({ ...contributionData, installments: updated });
                  }, style: { padding: "8px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: "6px", cursor: "pointer" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Trash2, { size: 14 }) })
                ] }, installment.id)),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { onClick: () => setContributionData({ ...contributionData, installments: [...contributionData.installments, { id: Date.now().toString(), label: "", amount: 0, dueDate: "" }] }), style: { padding: "10px 14px", background: "var(--navy)", color: "#fff", border: "none", borderRadius: "8px", cursor: "pointer", fontSize: "14px", display: "flex", alignItems: "center", gap: "6px", justifyContent: "center", width: "fit-content" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(Plus, { size: 14 }),
                  " Add Installment"
                ] })
              ] })
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", gap: "8px", marginTop: "16px" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-navy", onClick: async () => {
                try {
                  setIsSavingContribution(true);
                  const payload = {
                    title: contributionData.title,
                    type: contributionData.type,
                    description: contributionData.description,
                    installments: contributionData.installments.map((it) => ({ id: it.id, label: it.label, amount: Number(it.amount), dueDate: it.dueDate })),
                    status: contributionData.status
                  };
                  let res;
                  if (editingContributionId) {
                    res = await fetch(`${apiBaseUrl}/contributions/${editingContributionId}`, { method: "PUT", headers: getAuthHeaders(adminToken), body: JSON.stringify(payload) });
                  } else {
                    res = await fetch(`${apiBaseUrl}/contributions`, { method: "POST", headers: getAuthHeaders(adminToken), body: JSON.stringify(payload) });
                  }
                  if (!res.ok) {
                    const err = await res.json().catch(() => ({}));
                    throw new Error(err.message || "Failed to save contribution");
                  }
                  const saved = await res.json();
                  setContributions((prev) => editingContributionId ? prev.map((c) => c.id === saved.id ? saved : c) : [saved, ...prev]);
                  setShowContributionForm(false);
                  setEditingContributionId(null);
                  showToastMessage(editingContributionId ? "Contribution updated." : "Contribution created.", "success");
                } catch (err) {
                  console.error("Save contribution failed", err);
                  showToastMessage("Could not save contribution. Please try again.", "error");
                } finally {
                  setIsSavingContribution(false);
                }
              }, children: editingContributionId ? "Update Contribution" : "Create Contribution" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn", onClick: () => setShowContributionForm(false), style: { background: "var(--lgray)" }, children: "Cancel" })
            ] })
          ] }),
          contributions.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "empty-state", style: { textAlign: "center", padding: "48px 24px" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "16px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(DollarSign, { size: 48, style: { color: "var(--navy)" } }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "16px", fontWeight: "600", color: "var(--navy)", marginBottom: "8px" }, children: "No contributions yet" }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "14px", color: "var(--gray)" }, children: "Create your first contribution to start collecting payments." })
          ] }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { overflowX: "auto", width: "100%" }, className: "admin-table-responsive", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("table", { style: { width: "100%", borderCollapse: "collapse", minWidth: 700 }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { style: { textAlign: "left", borderBottom: "2px solid var(--lgray)" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 8px", fontSize: 12, color: "var(--gray)" }, children: "Title" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 8px", fontSize: 12, color: "var(--gray)" }, children: "Type" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 8px", fontSize: 12, color: "var(--gray)" }, children: "Installments" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 8px", fontSize: 12, color: "var(--gray)" }, children: "Total" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 8px", fontSize: 12, color: "var(--gray)" }, children: "Status" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px 8px", fontSize: 12, color: "var(--gray)" }, children: "Actions" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { children: contributions.map((contribution) => {
              const totalAmount = contribution.installments?.reduce((sum, inst) => sum + (inst.amount || 0), 0) || 0;
              return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { style: { borderBottom: "1px solid var(--lgray)" }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: { padding: "12px 8px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, color: "var(--navy)", fontSize: "13" }, children: contribution.title }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: "11px", color: "var(--gray)" }, children: contribution.description || "No description" })
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: { padding: "12px 8px", fontSize: "12" }, children: contribution.type?.replace(/_/g, " ") || "General" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: { padding: "12px 8px", fontSize: "12" }, children: [
                  contribution.installments?.length || 0,
                  " installment(s)"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: { padding: "12px 8px", fontSize: "12", fontWeight: 600 }, children: [
                  "$",
                  totalAmount.toFixed(2)
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: { padding: "12px 8px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `status-badge ${String(contribution.status || "ACTIVE").toLowerCase()}`, style: { textTransform: "capitalize", fontSize: "10px", padding: "2px 6px" }, children: String(contribution.status || "ACTIVE").toLowerCase() }) }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: { padding: "12px 8px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { style: { display: "flex", gap: "4px" }, children: [
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("button", { className: "btn btn-sm btn-navy", onClick: () => setPaymentModal({ open: true, contributionId: contribution.id, contributionTitle: contribution.title }), style: { padding: "4px 8px", fontSize: "11" }, children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(CreditCard, { size: 10 }),
                    " Payments"
                  ] }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-sm", onClick: () => {
                    setEditingContributionId(contribution.id);
                    setShowContributionForm(true);
                    setContributionData({ title: contribution.title || "", type: contribution.type || "EVENT_REGISTRATION", description: contribution.description || "", installments: Array.isArray(contribution.installments) ? contribution.installments.map((it) => ({ id: it.id ?? String(Date.now()), label: it.label ?? "", amount: Number(it.amount ?? 0), dueDate: it.dueDate ?? "" })) : [], status: contribution.status || "ACTIVE" });
                  }, style: { padding: "4px 8px", fontSize: "11", background: "var(--lgray)" }, children: "Edit" }),
                  /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { className: "btn btn-sm btn-danger", onClick: () => openDeleteModal("contribution", contribution.id, "Delete contribution?", "This action will remove this contribution permanently."), style: { padding: "4px 8px", fontSize: "11" }, children: "Delete" })
                ] }) })
              ] }, contribution.id);
            }) })
          ] }) })
        ] }),
        paymentModal.open && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-modal-overlay", onClick: () => setPaymentModal({ open: false, contributionId: null, contributionTitle: "" }), children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-modal-content", onClick: (e) => e.stopPropagation(), children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "admin-modal-header", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("h3", { children: [
              "Payment Details - ",
              paymentModal.contributionTitle
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { onClick: () => setPaymentModal({ open: false, contributionId: null, contributionTitle: "" }), className: "admin-modal-close", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)(X, { size: 20 }) })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { className: "admin-modal-body", children: contributionPayments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { textAlign: "center", padding: "32px", color: "var(--gray)" }, children: "No payments recorded yet for this contribution." }) : /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { overflowX: "auto" }, className: "admin-table-responsive", children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("table", { style: { width: "100%", borderCollapse: "collapse" }, children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { style: { borderBottom: "2px solid var(--lgray)" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px", textAlign: "left", fontSize: 13, color: "var(--gray)" }, children: "Payer" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px", textAlign: "left", fontSize: 13, color: "var(--gray)" }, children: "Amount" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px", textAlign: "left", fontSize: 13, color: "var(--gray)" }, children: "Installment" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px", textAlign: "left", fontSize: 13, color: "var(--gray)" }, children: "Date" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("th", { style: { padding: "12px", textAlign: "left", fontSize: 13, color: "var(--gray)" }, children: "Status" })
            ] }) }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("tbody", { children: contributionPayments.map((payment) => /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("tr", { style: { borderBottom: "1px solid var(--lgray)" }, children: [
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: { padding: "12px", fontSize: 13 }, children: [
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontWeight: 600, color: "var(--navy)" }, children: payment.payerName || "Unknown" }),
                /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("div", { style: { fontSize: 11, color: "var(--gray)" }, children: payment.payerEmail || "" })
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("td", { style: { padding: "12px", fontSize: 13, fontWeight: 600 }, children: [
                "$",
                Number(payment.amount || 0).toFixed(2)
              ] }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: { padding: "12px", fontSize: 12 }, children: payment.installmentLabel || "N/A" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: { padding: "12px", fontSize: 12 }, children: payment.paymentDate || "N/A" }),
              /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("td", { style: { padding: "12px" }, children: /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("span", { className: `status-badge ${String(payment.status || "COMPLETED").toLowerCase()}`, style: { textTransform: "capitalize", fontSize: 11, padding: "2px 8px" }, children: String(payment.status || "COMPLETED").toLowerCase() }) })
            ] }, payment.id)) })
          ] }) }) })
        ] }) })
      ] })
    ] });
  }
})();
/*! Bundled license information:

react/cjs/react.development.js:
  (**
   * @license React
   * react.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

react/cjs/react-jsx-runtime.development.js:
  (**
   * @license React
   * react-jsx-runtime.development.js
   *
   * Copyright (c) Meta Platforms, Inc. and affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   *)

lucide-react/dist/esm/shared/src/utils/mergeClasses.js:
lucide-react/dist/esm/shared/src/utils/toKebabCase.js:
lucide-react/dist/esm/shared/src/utils/toCamelCase.js:
lucide-react/dist/esm/shared/src/utils/toPascalCase.js:
lucide-react/dist/esm/defaultAttributes.js:
lucide-react/dist/esm/shared/src/utils/hasA11yProp.js:
lucide-react/dist/esm/context.js:
lucide-react/dist/esm/Icon.js:
lucide-react/dist/esm/createLucideIcon.js:
lucide-react/dist/esm/icons/building-2.js:
lucide-react/dist/esm/icons/calendar.js:
lucide-react/dist/esm/icons/chart-column.js:
lucide-react/dist/esm/icons/clock.js:
lucide-react/dist/esm/icons/credit-card.js:
lucide-react/dist/esm/icons/dollar-sign.js:
lucide-react/dist/esm/icons/external-link.js:
lucide-react/dist/esm/icons/file-text.js:
lucide-react/dist/esm/icons/graduation-cap.js:
lucide-react/dist/esm/icons/image.js:
lucide-react/dist/esm/icons/loader-circle.js:
lucide-react/dist/esm/icons/log-out.js:
lucide-react/dist/esm/icons/map-pin.js:
lucide-react/dist/esm/icons/megaphone.js:
lucide-react/dist/esm/icons/menu.js:
lucide-react/dist/esm/icons/plus.js:
lucide-react/dist/esm/icons/shield.js:
lucide-react/dist/esm/icons/trash-2.js:
lucide-react/dist/esm/icons/user-plus.js:
lucide-react/dist/esm/icons/users.js:
lucide-react/dist/esm/icons/x.js:
lucide-react/dist/esm/lucide-react.js:
  (**
   * @license lucide-react v1.8.0 - ISC
   *
   * This source code is licensed under the ISC license.
   * See the LICENSE file in the root directory of this source tree.
   *)
*/
