Course Management Platform

This is a course management platform where admins can create and manage courses, and users can purchase courses to access the content. The platform includes essential features like authentication using JWT, secure password handling with bcrypt, role-based access control for admin and user functionalities, and schema validation using Zod and protection from attacks like Dos using rate-limiter.


Features:


1. JWT Authentication: Secure user sessions with JWT-based authentication for both users and admins.

2. Password Security: Passwords are hashed and salted using bcrypt before being stored in the database.

3. Admin Functionalities: Admins can create, update, and delete courses and their content.

4. User Functionalities: Users can browse available courses, purchase courses, and access content after purchase.

5. Zod Validation: Robust validation of request payloads using Zod for both admin and user operations.

6. Cookies-based Authentication: Token is securely stored in HTTP-only cookies to maintain session state.

7. Role-based Access: Separate access control for admins and users using middleware to protect routes.

8. Rate Limiting: Implemented rate limiting to prevent abuse and denial-of-service (DoS) attacks.

9. Environment Variables: Sensitive data like JWT secrets and database credentials are managed securely using dotenv.


Technologies Used :


1. Backend: Node.js, Express.js, MongoDB

2. Authentication: JWT, bcrypt

3. Validation: Zod

4. Cookies Handling: cookie-parser

5. Security: HTTP-only cookies, bcrypt hashing, rate limiting

6. Routing: Express Router for modular route structure

7. Environment Management: dotenv for handling environment variables


Installation : 


1. Clone the repository:
git clone https://github.com/yourusername/repository-name.git


2. Install dependencies:

   npm install

3. Create a .env file in the root directory and add the following environment variables:

   i) MONGO_URL=your_mongo_db_url

   ii) JWT_ADMIN_SECRET=your_admin_jwt_secret

   iii) JWT_USER_SECRET=your_user_jwt_secret


4. Start the development server:

   npm node index.js


API Endpoints :

Admin : 

1.  POST /api/v1/admin/signup: Sign up as an admin.

1. POST /api/v1/admin/signin: Sign in as an admin.

2. POST /api/v1/admin/create-course: Create a new course (authentication required).

3. PUT /api/v1/admin/update-course/
: Update an existing course (authentication required).


User : 

1. POST /api/v1/user/signup: Sign up as a user.

2. POST /api/v1/user/signin: Sign in as a user.

3. GET /api/v1/courses: Get a list of all available courses.

4. POST /api/v1/user/purchase/
: Purchase a course (authentication required).


Middleware : 

1. adminMiddleware: Protects admin routes and verifies JWT tokens from cookies.

2. userMiddleware: Protects user routes and verifies JWT tokens from cookies.

3. rateLimiter: Limits the number of requests to prevent DoS attacks.

Future Improvements :

1. Google/GitHub OAuth for authentication.

2. OTP verification for additional security.

3. Razorpay integration for payment handling.

4. Video progress tracking for user convenience.



