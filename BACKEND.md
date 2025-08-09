# Mboga Pap Backend Documentation

## Overview

The Mboga Pap backend is built using **Next.js API routes** and **Supabase**, providing a modern, scalable, and serverless architecture without requiring Docker or external workflow engines.

## Architecture

### Core Components

1. **Supabase Database** - PostgreSQL with real-time subscriptions
2. **Next.js API Routes** - Serverless functions for business logic
3. **Real-time Updates** - Live notifications and data synchronization
4. **Authentication** - Supabase Auth with role-based access
5. **Cron Jobs** - Scheduled tasks for maintenance and statistics

### Technology Stack

- **Database**: Supabase (PostgreSQL)
- **API**: Next.js API Routes (serverless)
- **Authentication**: Supabase Auth
- **Real-time**: Supabase Realtime
- **Validation**: Zod
- **TypeScript**: Full type safety

## API Endpoints

### Authentication

#### `POST /api/auth/register`
Register a new user with role-based profile creation.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "full_name": "John Doe",
  "phone": "+254700000000",
  "role": "customer|vendor|rider",
  "address": "Nairobi, Kenya"
}
```

**Response:**
```json
{
  "success": true,
  "message": "User registered successfully",
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "full_name": "John Doe",
    "role": "customer"
  }
}
```

### Orders

#### `POST /api/orders/create`
Create a new order with items and payment record.

**Request Body:**
```json
{
  "vendor_id": "uuid",
  "customer_id": "uuid",
  "items": [
    {
      "product_id": "uuid",
      "quantity": 2,
      "unit_price": 150.00
    }
  ],
  "delivery_address": "Nairobi, Kenya",
  "delivery_instructions": "Call before delivery",
  "payment_method": "mpesa"
}
```

#### `GET /api/orders/[id]`
Get detailed order information with related data.

#### `PATCH /api/orders/[id]`
Update order status and assign riders.

**Request Body:**
```json
{
  "status": "confirmed|preparing|ready|assigned|picked_up|delivered|cancelled",
  "rider_id": "uuid"
}
```

### Vendors

#### `GET /api/vendors`
Get vendors with filtering, search, and pagination.

**Query Parameters:**
- `category` - Filter by category ID
- `search` - Search in business name and description
- `sortBy` - Sort by name, rating, or orders
- `sortOrder` - asc or desc
- `limit` - Number of results (default: 20)
- `offset` - Pagination offset (default: 0)

### Products

#### `GET /api/products`
Get products with filtering and search.

**Query Parameters:**
- `vendor_id` - Filter by vendor
- `category_id` - Filter by category
- `search` - Search in name and description
- `available` - Filter by availability
- `limit` - Number of results
- `offset` - Pagination offset

#### `POST /api/products`
Create a new product.

**Request Body:**
```json
{
  "name": "Fresh Tomatoes",
  "description": "Organic tomatoes from local farms",
  "price": 200.00,
  "category_id": "uuid",
  "vendor_id": "uuid",
  "image": "https://example.com/image.jpg",
  "is_available": true,
  "stock_quantity": 50
}
```

### Notifications

#### `GET /api/notifications`
Get user notifications.

**Query Parameters:**
- `user_id` - User ID (required)
- `unread` - true to get only unread notifications
- `limit` - Number of results
- `offset` - Pagination offset

#### `PATCH /api/notifications`
Mark notifications as read.

**Request Body:**
```json
{
  "notification_id": "uuid" // Mark specific notification
}
```

OR

```json
{
  "user_id": "uuid",
  "mark_all_read": true // Mark all notifications
}
```

### Webhooks

#### `POST /api/webhooks/order-update`
Process order status updates and send notifications.

**Request Body:**
```json
{
  "order_id": "uuid",
  "status": "confirmed|preparing|ready|assigned|picked_up|delivered|cancelled",
  "user_id": "uuid",
  "notification_type": "order_update"
}
```

### Cron Jobs

#### `POST /api/cron/daily-stats`
Process daily statistics and maintenance tasks.

**Headers:**
```
Authorization: Bearer mboga-pap-cron-2025
```

## Database Schema

### Core Tables

1. **users** - User profiles and authentication
2. **vendors** - Vendor business information
3. **categories** - Product categories
4. **products** - Product catalog
5. **orders** - Order management
6. **order_items** - Order line items
7. **deliveries** - Delivery tracking
8. **payments** - Payment records
9. **reviews** - Customer reviews
10. **rider_profiles** - Rider information
11. **cart_items** - Shopping cart
12. **notifications** - Real-time notifications

### Key Features

- **Row Level Security (RLS)** - Data access control
- **Real-time subscriptions** - Live updates
- **Automatic timestamps** - Created/updated tracking
- **Foreign key constraints** - Data integrity
- **Indexes** - Performance optimization

## Real-time Features

### Custom Hooks

```typescript
import { useOrders, useNotifications, useCartItems } from '@/hooks/use-realtime'

// Real-time orders
const { data: orders, loading, error } = useOrders(userId)

// Real-time notifications
const { data: notifications } = useNotifications(userId)

// Real-time cart items
const { data: cartItems } = useCartItems(userId)
```

### Subscription Events

- **INSERT** - New records added
- **UPDATE** - Records modified
- **DELETE** - Records removed

## Security

### Authentication
- Supabase Auth with email/password
- Role-based access control
- JWT tokens for API access

### Authorization
- Row Level Security (RLS) policies
- User-specific data access
- Role-based permissions

### Data Validation
- Zod schema validation
- Input sanitization
- Type safety with TypeScript

## Deployment

### Environment Variables

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Application
NEXT_PUBLIC_APP_URL=http://localhost:3000
CRON_SECRET=your_cron_secret

# Optional Services
MPESA_API_KEY=your_mpesa_key
GOOGLE_MAPS_API_KEY=your_maps_key
```

### Cron Jobs Setup

For production, set up cron jobs to call the daily stats endpoint:

```bash
# Daily at 1 AM
0 1 * * * curl -X POST https://your-domain.com/api/cron/daily-stats \
  -H "Authorization: Bearer your_cron_secret"
```

## Development

### Local Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp env.example .env.local
   # Edit .env.local with your Supabase credentials
   ```

3. **Run database migrations:**
   ```sql
   -- Execute database/schema.sql in your Supabase SQL editor
   ```

4. **Seed the database:**
   ```sql
   -- Execute database/seed.sql in your Supabase SQL editor
   ```

5. **Start development server:**
   ```bash
   npm run dev
   ```

### Testing API Endpoints

```bash
# Test database connection
curl http://localhost:3000/api/test-db

# Test order creation
curl -X POST http://localhost:3000/api/orders/create \
  -H "Content-Type: application/json" \
  -d '{"vendor_id":"uuid","customer_id":"uuid","items":[]}'
```

## Monitoring and Logging

### Error Handling
- Structured error responses
- Console logging for debugging
- Error tracking in production

### Performance
- Database query optimization
- Indexed fields for fast lookups
- Pagination for large datasets

### Analytics
- Daily statistics collection
- Order tracking and metrics
- User activity monitoring

## Future Enhancements

1. **Payment Integration** - M-Pesa, card payments
2. **Push Notifications** - Mobile app notifications
3. **Analytics Dashboard** - Business insights
4. **Multi-language Support** - Internationalization
5. **Advanced Search** - Elasticsearch integration
6. **File Upload** - Image storage and CDN
7. **SMS Integration** - Text message notifications
8. **Maps Integration** - Location services

## Support

For backend issues or questions:
1. Check the API documentation
2. Review error logs
3. Test with Postman or curl
4. Check Supabase dashboard for database issues 