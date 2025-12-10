# API Documentation

## Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user

### Appointments
- `GET /api/appointments` - Get all appointments
- `POST /api/appointments` - Create appointment
- `GET /api/appointments/:id` - Get appointment by ID
- `PATCH /api/appointments/:id` - Update appointment
- `DELETE /api/appointments/:id` - Delete appointment

### Services
- `GET /api/services` - Get all services
- `POST /api/services` - Create service
- `GET /api/services/:id` - Get service by ID
- `PATCH /api/services/:id` - Update service
- `DELETE /api/services/:id` - Delete service

### Employees
- `GET /api/employees` - Get all employees
- `POST /api/employees` - Create employee
- `GET /api/employees/:id` - Get employee by ID
- `PATCH /api/employees/:id` - Update employee
- `DELETE /api/employees/:id` - Delete employee

### Products
- `GET /api/products` - Get all products
- `POST /api/products` - Create product
- `GET /api/products/:id` - Get product by ID
- `PATCH /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Orders
- `GET /api/orders` - Get all orders
- `POST /api/orders` - Create order
- `GET /api/orders/:id` - Get order by ID
- `PATCH /api/orders/:id` - Update order

### Payments
- `POST /api/payments/orange-money/initiate` - Initiate Orange Money payment
- `POST /api/payments/orange-money/callback` - Orange Money callback
- `POST /api/payments/momo/initiate` - Initiate Mobile Money payment
- `POST /api/payments/momo/callback` - Mobile Money callback
- `POST /api/payments/stripe/intent` - Create Stripe payment intent
- `POST /api/payments/stripe/webhook` - Stripe webhook

### Reviews
- `GET /api/reviews` - Get all reviews
- `POST /api/reviews` - Create review
- `PATCH /api/reviews/:id` - Update review
- `DELETE /api/reviews/:id` - Delete review

### Loyalty
- `GET /api/loyalty/points` - Get loyalty points
- `GET /api/loyalty/rewards` - Get rewards

### Chatbot
- `POST /api/chatbot` - Chat with AI assistant

### Notifications
- `POST /api/notifications/send` - Send notification
- `POST /api/notifications/mark-read` - Mark notification as read

### Upload
- `POST /api/upload` - Upload file

### Webhooks
- `POST /api/webhooks/n8n` - N8N webhook
- `POST /api/webhooks/analytics` - Analytics webhook
