# 📚 School Management System

A simple and efficient web application to manage school data with ease.  
Built using **Next.js** for the frontend & backend, powered by **MySQL** for persistent storage, and hosted on **Vercel** with a cloud database on **Railway**.  

---

## 🚀 Live Demo  
🔗 [School Management System](https://school-management-psi-lake.vercel.app/)

---

## 🛠️ Tech Stack  
- **Frontend & Backend:** Next.js  
- **Database:** MySQL  
- **Hosting:** Vercel  
- **Cloud DB Hosting:** Railway  

---

## ✨ Features  
- ➕ Add a new school with details like name, address, and city  
- 📄 View all schools stored in the database  
- 🖼️ Upload and manage school images  
- 📦 MySQL integration for persistent data storage  
- 📱 Responsive and clean UI  

---

## 📸 Screenshots  

##  <img width="1920" height="1080" alt="1" src="https://github.com/user-attachments/assets/94017df9-e123-4e23-b9a5-8f17ed7662a8" />
##  <img width="1920" height="1080" alt="2" src="https://github.com/user-attachments/assets/04c7ae40-6f58-4bd5-a262-28164b4dcbde" />
##  <img width="1920" height="1080" alt="3" src="https://github.com/user-attachments/assets/808e0d05-9740-4f6c-bd75-5dcb1f9fa323" />
##  <img width="1920" height="1080" alt="4" src="https://github.com/user-attachments/assets/33083fcd-b3b9-4570-8dd9-1e754c8c8bf5" />
##  <img width="1920" height="1080" alt="5" src="https://github.com/user-attachments/assets/0bcba3b4-5eef-426b-a229-e33a029a8b79" />




---

## 🗄️ Database Schema

    CREATE TABLE schools (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      city TEXT NOT NULL,
      image VARCHAR(255) NOT NULL
    );

## ⚙️ Installation & Setup  

Follow these steps to run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yogib01/school-management.git
   cd school-management

2. **Install dependencies**
    ```bash
    npm install

3. **Configure Environment Variables**
Create a .env.local file in the root directory and add:
    ```bash
   DB_HOST=your-database-host
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name


4. **Run the development server**
    ```bash
   npm run dev
  The app will be available at http://localhost:3000


## 📂 Project Structure

    /school-management-system
    │── /pages          # Next.js pages (API + UI)
    │── /public         # Static files (images, icons, etc.)
    │── /styles         # Global styles
    │── /components     # Reusable UI components
    │── /lib            # Database connection & helpers
    │── package.json    # Project metadata and dependencies


##  🤝 **Contributing**

Contributions, issues, and feature requests are welcome!
Feel free to fork this repo and submit a pull request.

##  📜 **License**

You are free to use, modify, and distribute this project.

## ⚠️ Instructions

If you are accessing website through mobile probably it will give you "File Upload Error". 

Because

    1.  On Vercel, your serverless functions cannot write to public or filesystem permanently.
        So formidable trying to save files to public/schoolImages works locally (your laptop), 
        but fails on mobile when hitting the hosted Vercel function because the runtime doesn’t 
        allow persistent disk storage.

    2.  That’s why your mobile (or any external device) sees “file upload error”. 
        It’s not the device — it’s the hosting environment.

##  

If you are accessing website through web(laptop) you can add deatils of school only the problem is in show Schools Image will not appear.
Again the reason is same !

This is happening because when you host your Next.js app on Vercel:


    -   Vercel is a serverless platform, which means the /public folder is bundled at build time.
    
    -   Any images you upload at runtime (like your schoolImages) won’t be saved on Vercel’s server. 
        That’s why you'll not get the images in Show Schools.

