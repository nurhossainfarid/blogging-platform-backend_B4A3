# Blogging Platform Backend B4A3

This project is an Express.js application developed with TypeScript that integrates MongoDB using Mongoose to manage a comprehensive Blogging Platform. The application enables users to create, read, update, and delete blog posts while ensuring data integrity with robust schema validation.

#### Live Deployment Link: https://blogging-platform-backend-b4-a3.vercel.app
#### Video Explanation (Public Link): https://www.loom.com/share/e7a5637eb6a14f0bb1136667c435cd06?sid=962bfa8e-416e-456b-9129-cfa9060228ad

---

## **Features**

### **1. Blog Management**
- Create, read, update, and delete blog posts.
- Store detailed information such as:
  - Title, content, author, tags, and timestamps.
- Validate blog data using Mongoose schema rules (e.g., required fields, minimum length constraints).

### **2. User Management**
- Register and authenticate users using JWT-based authentication.
- Manage user roles (admin, author, reader) with access control.
- Secure passwords using bcrypt hashing.

### **3. Error Handling**
- Provide descriptive error messages for validation failures and operational issues.
- Handle errors consistently with centralized middleware.

### **4. Data Integrity & Security**
- Enforce validation rules through Mongoose schemas.
- Protect sensitive API endpoints with authentication and authorization middleware.

---

## **Technology Stack**

### **Backend:**
- **Framework:** [Express.js](https://expressjs.com/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database:** [MongoDB](https://www.mongodb.com/) with [Mongoose](https://mongoosejs.com/)

### **Development Tools:**
- **Authentication:** [JWT](https://jwt.io/)
- **Password Hashing:** [bcrypt](https://www.npmjs.com/package/bcrypt)
- **API Testing:** [Postman](https://www.postman.com/)
- **Code Linting:** [ESLint](https://eslint.org/)
- **Code Formatting:** [Prettier](https://prettier.io/)

---

## **Developer Guide**

* Clone the project to your local machine:
    ```bash
    git clone https://github.com/nurhossainfarid/blogging-platform-backend_B4A3.git
    ```
* Install all dependencies:
    ```bash
    yarn install
    ```
* Run the project:
    ```bash
    yarn start:dev
    ```

---

## **API Endpoints**

### **User Authentication**
#### **Register a User**
- Endpoint: `/api/auth/register`
- Method: `POST`
#### **Login a User**
- Endpoint: `/api/auth/login`
- Method: `POST`

### **Blog Management**
#### **Create a Blog**
- Endpoint: `/api/blogs`
- Method: `POST`
#### **Get All Blog**
- Endpoint: `/api/blogs`
- Method: `GET`
#### **Get a Specific Blog**
- Endpoint: `/api/blogs/:blogId`
- Method: `GET`
#### **Update a Blog**
- Endpoint: `/api/blogs/:blogId`
- Method: `PUT`
#### **Delete a Blog**
- Endpoint: `/api/blogs/:blogId`
- Method: `DELETE`
---

## **License**
This project is licensed under the MIT License. See the LICENSE file for details.

## **Contributions**
Feel free to fork this repository, raise issues, and submit pull requests to contribute to this project.

## **Contact**
For queries, suggestions, or feedback, please contact:
Nur Hossain Farid  
Email: faahsan1516@gmail.com  
GitHub: [github.com/nurhossainfarid](https://github.com/nurhossainfarid)