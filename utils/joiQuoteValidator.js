const validateQuote = (schema) => {
    return (req, res, next) => {
      const { error, value } = schema.validate(req.body);
  
      if (error) {
        return res.status(400).json({ error: error.details[0].message });
      }
  
      req.validatedBody = value; // Store the validated value in req for further processing
      next();
    };
  };
  
  module.exports = {
    validateQuote
  };
  