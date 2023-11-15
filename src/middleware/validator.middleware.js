export const validateSchema = (schema) => (req, res, next) => {
  //zod
  try {
    schema.parse(req.body);
    next();
  } catch (error) {
    return res
      .status(400)
      .json({ error: error.errors.map((error) => error.message) });
  }
};
