const contactService = require('../services/contactService');

/**
 * Submit contact message controller
 */
exports.submitMessage = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;
    
    const contact = await contactService.createContactMessage({ name, email, message });
    
    res.status(201).json({
      success: true,
      message: 'Message submitted successfully',
      data: contact
    });
  } catch (err) {
    next(err);
  }
};
