/** @type {import("express").RequestHandler} */
export const validate = (schema) => (req, res, next) => {
  try {
    const target = {};
    if (schema.body) target.body = req.body;
    if (schema.query) target.query = req.query;
    if (schema.params) target.params = req.params;

    const parsed = schema.parse(target);

    if (schema.body) req.body = parsed.body;
    if (schema.query) req.query = parsed.query;
    if (schema.params) req.params = parsed.params;

    next();
  } catch (error) {
    next(error);
  }
};
