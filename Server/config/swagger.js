const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'TitanAx Labs API',
      version: '1.0.0',
      description: 'API documentation for TitanAx Labs - AI Code Generator Platform',
      contact: {
        name: 'TitanAx Labs Support',
        email: 'support@titanaxlabs.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server'
      },
      {
        url: 'https://titanax-labs-render.onrender.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter JWT token'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'role', 'password'],
          properties: {
            name: {
              type: 'string',
              minLength: 2,
              maxLength: 100,
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            role: {
              type: 'string',
              example: 'Software Developer'
            },
            password: {
              type: 'string',
              minLength: 8,
              example: 'Password123'
            }
          }
        },
        Login: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            password: {
              type: 'string',
              example: 'Password123'
            }
          }
        },
        Contact: {
          type: 'object',
          required: ['name', 'email', 'message'],
          properties: {
            name: {
              type: 'string',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              example: 'john@example.com'
            },
            message: {
              type: 'string',
              minLength: 10,
              maxLength: 1000,
              example: 'I would like to know more about your services.'
            }
          }
        },
        FrontendGeneration: {
          type: 'object',
          required: ['prompt', 'framework'],
          properties: {
            prompt: {
              type: 'string',
              minLength: 10,
              maxLength: 2000,
              example: 'Create a responsive navigation bar with logo and menu items'
            },
            framework: {
              type: 'string',
              enum: ['html-css', 'html-tailwind', 'html-bootstrap', 'html-css-js', 'html-tailwind-bootstrap', 'react', 'angular', 'vue', 'svelte', 'nextjs', 'nuxtjs'],
              example: 'react'
            }
          }
        },
        BackendGeneration: {
          type: 'object',
          required: ['frontendCode', 'framework'],
          properties: {
            frontendCode: {
              type: 'string',
              minLength: 10,
              example: '<div>Frontend code here</div>'
            },
            framework: {
              type: 'string',
              enum: ['node-express', 'django', 'flask', 'spring-boot', 'fastapi'],
              example: 'node-express'
            }
          }
        },
        DatabaseGeneration: {
          type: 'object',
          required: ['schemaDescription', 'databaseType'],
          properties: {
            schemaDescription: {
              type: 'string',
              minLength: 10,
              maxLength: 2000,
              example: 'Users table with name, email, password fields'
            },
            databaseType: {
              type: 'string',
              enum: ['mysql', 'postgresql', 'mongodb', 'sqlite'],
              example: 'mysql'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message here'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string'
                  },
                  message: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operation successful'
            }
          }
        }
      }
    },
    security: [
      {
        bearerAuth: []
      }
    ]
  },
  apis: ['./routes/*.js', './controllers/*.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;

