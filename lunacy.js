{
  const _ = Symbol("_");

  const ℮ = (x, precision = 1) => Math.round(x / precision) * precision;

  const ṛ = Math.floor;

  const ṙ = Math.ceil;

  const ċ = (...fs) => x => fs.reduceRight((x, f) => f(x), x);

  const isEmpty = x => !x || x.length < 1;

  const merge = (xss, yss) => {
    if (isEmpty(xss)) { return yss; }
    if (isEmpty(yss)) { return xss.filter(x => x !== _); }
    const [x, ...xs] = xss;
    const [y, ...ys] = yss;
    return x === _
      ? [y, ...merge(xs, ys)]
      : [x, ...merge(xs, yss)];
  };

  const β = (...args) =>
    args.some(x => x === _) ? (...rest) => β(...merge(args, rest || [])) :
    args.length > 0         ? args[0](...args.slice(1)) :
    ǃ("β takes at least 1 argument");

  const numericDistance = (x, y) => Math.abs(x - y);

  const levenshteinDistance = (x, y) => {
    if (x === "") return y.length;
    if (y === "") return x.length;
    const _x = x[x.length - 1];
    const _y = y[y.length - 1];
    const x_ = x.slice(0, x.length - 1);
    const y_ = y.slice(0, y.length - 1);
    return Math.min(
      levenshteinDistance(x_, y)  + 1,
      levenshteinDistance(x,  y_) + 1,
      levenshteinDistance(x_, y_) + (_x === _y ? 0 : 1));
  };

  const Δ = (x, y) =>
    (ℝ(x) && (ℝ(y) || ಠ_ಠ(y))) ? numericDistance(x, y || 0) :
    (𝕊(x) && (𝕊(y) || ಠ_ಠ(y))) ? levenshteinDistance(x, y || "") :
    ǃ(`Δ cannot compare types: ${typeof x}, ${typeof y}`);

  const extract = (object, property) => {
    const x = object[property];
    return typeof x === "function" ? x.bind(object) : x;
  };

  const extend = select => new Proxy(select, {
    get: (f, property, _2) =>
      property === "β" ? (...args) => extend(arg => f(arg)(...args)) :
      property === "ñ" ? extend(ċ(ñ, f)) :
      extend(arg => extract(f(arg), property)),
    apply: (f, _1, args) =>
      args.some(x => x === _)
        ? (...[arg, ...rest]) => f(arg)(...merge(args, rest || []))
        : f(...args)
  });

  const η = extend(x => x);

  const ι = n => [...Array(n).keys()];

  const ñ = f => (...args) => !f(...args);

  const ξ = (x, y) =>
    ಠ_ಠ(x) ? Math.random() :
    ಠ_ಠ(y) ? ṛ(Math.random() * ṛ(x)) :
    ṛ(Math.random() * (ṛ(y) - ṙ(x))) + ṙ(x);

  const ρ = (renames, source) =>
    Object.keys(source).reduce((dest, key) => {
      dest[renames[key] || key] = source[key];
      return dest;
    }, {});

  const Γ =
    typeof global !== "undefined" ? global :
    typeof window !== "undefined" ? window :
    this;

  const walkReduce = (f, acc, xs) =>
    𝔸(xs)
      ? xs.reduce(β(walkReduce, f, _, _), acc)
      : f(acc, xs);

  const Π = (...xs) => walkReduce((x, y) => x * y, 1, xs);

  const Σ = (...xs) => walkReduce((x, y) => x + y, 0, xs);

  const ℝ = x => typeof x === "number" && isFinite(x);

  const ℤ = x => ℝ(x) && Number.isInteger(x);

  const ℕ = x => ℤ(x) && x >= 0;

  const 𝔸 = Array.isArray;

  const 𝔽 = x => typeof x === "function";

  const 𝕊 = x => typeof x === "string";

  const ಠ_ಠ = x => typeof x === "undefined";

  const ǃ = x => { throw new Error(x); };

  const exported = { _, ℮, ṛ, ṙ, ċ, β, Δ, η, ι, ñ, ξ, ρ, Γ, Π, Σ, ℝ, ℤ, ℕ, 𝔸, 𝔽, 𝕊, ಠ_ಠ, ǃ };

  Object.assign(typeof exports !== "undefined" ? exports : Γ, exported);
}
