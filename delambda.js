function getBound(object, property) {
  const value = object[property];
  return typeof value === "function" ? value.bind(object) : value;
}

const root = {};

function extend(select) {
  return new Proxy(select, {
    get(f, property, _2) {
      return extend(arg => getBound(f(arg), property));
    },
    apply(f, _1, args) {
      // TODO: if any args are the root delambda proxy, make new
      //       selector that partially applies inner function
      const wildcardIndices = args
        .map((x, i) => x === root ? i : undefined)
        .filter(x => x !== undefined);
      if (wildcardIndices.length > 0) {
        // TODO: take arg(s) here and put in place of wildcard
        //       values in args from outer scope
        console.log("partial application time: " + wildcardIndices);
        return extend(arg => "composed proxy goes here");
      } else {
        return f(...args);
      }
    }
  });
}

if (module) {
  module.exports = extend(x => x);
}