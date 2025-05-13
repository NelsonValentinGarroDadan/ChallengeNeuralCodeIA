export const validateSchema = (schema) => (req, res, next) => {
  try {
    req.body = schema.parse(req.body); // lanza si no es válido
    next();
  } catch (err) {
    return res.status(400).json({
      errors: err.errors.map(e => ({ field: e.path[0], message: e.message }))
    });
  }
};