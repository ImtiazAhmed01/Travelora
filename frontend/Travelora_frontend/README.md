![Travelora Screenshot]()
# Travelora  

## Project overview 
**Travelora** is an online **tourist guide** platform designed to help travelers explore **Bangladesh**. It provides in-depth information about **destinations, local culture, cuisine, and activities** to ensure a memorable travel experience. Users can discover **landmarks, hidden gems, and plan trips efficiently**.  



## Features  

### 🔹 Layouts  
✅ **Basic Layout**: Navbar, footer, dynamic page rendering.  
✅ **Dashboard Layout**: Sidebar, footer, and dynamic page rendering.  

### 🔹 Authentication  
✅ **User Registration** with name, email, image, and password.  
✅ **Login via email/password or Google**.  
✅ **Forgot Password** functionality.  
✅ **JWT-based authentication** with role-based access (**default: Tourist**).  
✅ **Logout** removes token from local storage.  

### 🔹 Homepage  
✅ **Banner/Slider** with a custom theme-based design.  
✅ **Overview section** featuring videos showcasing site features.  
✅ **Random packages and tour guides** displayed dynamically.  
✅ **User stories** with sharing options (via `react-share`).  
✅ **Protected Booking Form** (logged-in users only) with a "Confirm Your Booking" modal.  

### 🔹 Community  
✅ **All user stories** displayed with options to **share** and **add new stories**.  

### 🔹 Dashboards  

#### **🌍 Tourist Dashboard**  
✅ Manage **profile, bookings, and stories**.  
✅ **Join as a Tour Guide** form submission.  

#### **🗺️ Tour Guide Dashboard**  
✅ Manage **profile, assigned tours, and stories**.  
✅ Accept/Reject assigned tours with **status updates**.  

#### **🛠️ Admin Dashboard**  
✅ View **site stats** (total payments, guides, packages, clients, stories).  
✅ Manage **users, packages, and tour guide applications**.  

### ⚙️ Technologies used  - 
✅**Frontend:** React, Vite, Tailwind CSS, daisyUI
✅ **Backend & Database:** Firebase (Authentication, Firestore, Hosting), Nodejs, Mongodb
✅ **State Management:** Mongodb
✅ **UI Enhancements:** react-toastify, sweetalert2, react-tabs, Framer Motion, React-Spring.
✅ **JWT for authentication** (stored in local storage).  

live URL.

- Click here to watch [live site]()


### Prerequisites  
Ensure you have the following installed:  
- [Node.js](https://nodejs.org/) (v16 or later)  
- [Vite](https://vitejs.dev/)  

## 🛠 To run locally 
1. Clone the repository:  
   ```bash
   git clone https://github.com/your-username/
   cd yourfile
   ```  
2. Install dependencies:  
  ```sh
   npm i react-router-dom
   ```
   ```sh
   npm i react-toastify
   ```
   ```sh
   npm i react-spring
   ```
   ```sh
   npm install sweetalert2
   ```
   ```sh
   npm i react-share
   ```
   ```sh
   npm install
   ```   
3. Create a `.env` file in the project root and add the required environment variables
   ```env
   VITE_apiKey=your-api-key
   VITE_authDomain=your-auth-domain
   VITE_projectId=your-project-id
   VITE_storageBucket=your-storage-bucket
   VITE_messagingSenderId=your-messaging-sender-id
   VITE_appId=your-app-id
   ``` 
4. Running Locally
```sh
npm run dev
```

5. Building for Production
```sh
npm run build
```
 


##📦 Dependencies
- @stripe/react-stripe-js: ^3.1.1,
- @stripe/stripe-js: ^5.5.0,
- axios: ^1.7.9,
- firebase: ^11.1.0,
- framer-motion: ^11.18.1,
- jsonwebtoken: ^9.0.2,
- react: ^18.3.1,
- react-datepicker: ^7.6.0,
- react-dom: ^18.3.1,
- react-hot-toast: ^2.5.1,
- react-router-dom: ^7.1.1,
- react-select: ^5.9.0,
- react-share: ^5.1.2,
- react-tabs: ^6.1.0,
- react-toastify: ^11.0.3,
- sweetalert2: ^11.15.10

 ## 📦 Dev Dependencies
- @eslint/js: ^9.17.0,
- @types/react: ^18.3.18,
- @types/react-dom: ^18.3.5,
- @vitejs/plugin-react: ^4.3.4,
- autoprefixer: ^10.4.20,
- daisyui: ^4.12.23,
- eslint: ^9.17.0,
- eslint-plugin-react: ^7.37.2,
- eslint-plugin-react-hooks: ^5.0.0,
- eslint-plugin-react-refresh: ^0.4.16,
- globals: ^15.14.0,
- postcss: ^8.5.1,
- tailwindcss: ^3.4.17,
- vite: ^6.0.5


### 🔹 Main Packages  
- **`firebase`**: Authentication and database management.  
- **`jsonwebtoken`**: JWT authentication.  
- **`axios`**: API requests.  
- **`framer-motion`**: Smooth animations.  
- **`react-router-dom`**: Client-side navigation.  
- **`react-share`**: Social sharing functionality.  
- **`react-toastify`**: Toast notifications.  
- **`sweetalert2`**: Interactive alert popups.  
- **`@stripe/react-stripe-js` & `@stripe/stripe-js`**: Payment processing integration.  

### 🔹 Development Packages  
- **`eslint`**: Code quality enforcement.  
- **`tailwindcss`** & **`daisyUI`**: Styling framework.  
- **`vite`**: Frontend build tool for fast development.  



