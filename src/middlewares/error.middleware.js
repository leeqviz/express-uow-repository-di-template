/** @type {import("express").ErrorRequestHandler} */
export function errorMiddleware(err, req, res, next) {
  console.error("Error:", err.message);

  if (err.name === "ZodError") {
    return res.status(400).json({
      success: false,
      message: "Validation error",
      errors: err.errors.map((e) => ({
        path: e.path.join("."),
        message: e.message,
      })),
    });
  }

  if (err.statusCode) {
    return res
      .status(err.statusCode)
      .json({ success: false, message: err.message });
  }

  return res
    .status(500)
    .json({ success: false, message: "Internal Server Error" });
}
