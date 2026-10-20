# JobTrack — Job Application Tracker

A modern, responsive job application tracking dashboard built with React. Organize your job search, monitor application statuses, and track your progress from one place.

## ✨ Features

- **Dashboard Overview** — View total applications, interviews, offers, and rejections at a glance.
- **Application Management** — Add, edit, and delete job applications.
- **Search & Filter** — Quickly find applications by company, role, or location and filter them by status.
- **Visual Analytics** — Explore application status distribution with interactive charts.
- **Progress Tracking** — View interview and offer rates to understand your job-search progress.
- **Persistent Storage** — Application data is saved in browser local storage and remains available after refreshing the page in the same browser.
- **Responsive Design** — A dashboard layout designed for desktop and smaller screens.
- **Reusable Components** — Organized React components for maintainability.

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| React | Component-based user interface |
| JavaScript (ES6+) | Application logic |
| Vite | Development server and build tool |
| CSS3 | Styling and responsive layout |
| Recharts | Interactive charts and analytics |
| Lucide React | Interface icons |
| Browser Local Storage | Local data persistence |

## 📸 Screenshots

Add screenshots of your running application in the `screenshots` folder and update the image paths below.

### Dashboard
![JobTrack Dashboard](./screenshots/dashboard.png)

### Application Management
![JobTrack Applications](./screenshots/applications.png)

> If you have not added screenshots yet, you can temporarily remove this section until the images are available.

## 🚀 Getting Started

Follow these steps to run JobTrack locally.

### Prerequisites

- [Node.js](https://nodejs.org/) — preferably an active LTS version
- npm, which is included with Node.js
- Git

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/nitin421/jobtrack.git
```

**2. Navigate to the project folder**

```bash
cd jobtrack
```

**3. Install dependencies**

```bash
npm install
```

**4. Start the development server**

```bash
npm run dev
```

**5. Open the local URL**

Open the URL displayed in your terminal, usually:

```text
http://localhost:5173
```

### Build for Production

To create a production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

## 📂 Project Structure

```text
jobtrack/
├── public/
├── src/
│   ├── App.jsx
│   ├── ApplicationForm.jsx
│   ├── App.css
│   └── main.jsx
├── index.html
├── package.json
├── package-lock.json
└── README.md
```

> The structure above is illustrative. Update it if your actual project contains additional files or folders.

## 💡 How to Use

1. Open the dashboard.
2. Add a job application using the application form.
3. Enter the company, job title, location, application date, status, job link, and notes.
4. Search for applications or filter them by status.
5. Edit or delete an application whenever its details change.
6. Review the analytics section to monitor your job-search progress.

## 🔒 Data & Privacy

JobTrack stores application records in your browser's local storage. The data is local to that browser and device profile; it is not automatically synchronized across devices or browsers. Clearing browser storage may remove saved records.

## 🗺️ Future Improvements

- Backend API and database integration
- User authentication and individual accounts
- Cloud synchronization across devices
- Application reminders and interview scheduling
- Export applications to CSV or Excel
- Dark and light theme preferences
- Advanced analytics and application history

## 🎯 Project Objective

JobTrack was built as a practical frontend project to demonstrate React development, component reuse, state management, CRUD operations, data filtering, browser storage, data visualization, and responsive UI design.

## 👨‍💻 Author

**Nitin Baghel**

- GitHub: [@nitin421](https://github.com/nitin421)
- Project Repository: [JobTrack](https://github.com/nitin421/jobtrack)

---

If you find this project useful, consider giving the repository a ⭐ on GitHub.
