const catchAsync = (fn) => (req, res, next) => {
  fn(req, res, next).catch(next);
};

// utility to wrap async functions with catchAsync and transfer all errors in error middleware
export function autoCatch(instance) {
  const prototype = Object.getPrototypeOf(instance);
  const methods = Object.getOwnPropertyNames(prototype);

  for (const method of methods) {
    if (method !== "constructor" && typeof instance[method] === "function") {
      instance[method] = catchAsync(instance[method].bind(instance));
    }
  }
  return instance;
}
