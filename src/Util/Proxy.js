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
            console.log({status:error?.response?.status||null, data:error?.response?.data||null, error})
            return {status:error?.response?.status||null, data:error?.response?.data||null, error};
          }
        };
      } else {
        return Reflect.get(target, property);
      }
    },
  };

export function AxiosProxy(target) { return new Proxy(target, handler) };