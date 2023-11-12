/**
 * @type {ProxyHandler}
 */
const handler = {
    get: function (target, property) {
      if (typeof target[property] === "function") {
        return async function (...args) {
          try {
            return await Reflect.apply(target[property], target, args);
          } catch (error) {
            console.error(`Error in method ${property}: ${error.message}`);
            return {status: null};
          }
        };
      } else {
        return Reflect.get(target, property);
      }
    },
  };

export function AxiosProxy(target) { return new Proxy(target, handler) };