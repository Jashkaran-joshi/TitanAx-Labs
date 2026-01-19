const Contact = require('../models/Contact');
const logger = require('../utils/logger');

/**
 * Service layer for contact-related business logic
 */
class ContactService {
  /**
   * Create a new contact message
   * @param {Object} contactData - Contact data (name, email, message)
   * @returns {Promise<Object>} Created contact message
   */
  async createContactMessage(contactData) {
    const { name, email, message } = contactData;

    const newContact = new Contact({
      name,
      email,
      message
    });

    await newContact.save();

    logger.info(`New contact message from: ${email}`);

    return {
      id: newContact._id,
      name: newContact.name,
      email: newContact.email,
      message: newContact.message,
      createdAt: newContact.createdAt
    };
  }
}

module.exports = new ContactService();

