
import { useEffect, useMemo, useState } from "react";
import {
  LayoutDashboard,
  BriefcaseBusiness,
  Settings,
  Bell,
  Search,
  Plus,
  Pencil,
  Trash2,
  ExternalLink,
  X,
} from "lucide-react";
import ApplicationForm from "./ApplicationForm";
import "./App.css";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const STORAGE_KEY = "jobtrack-applications";

function loadApplications() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : [];
  } catch {
    return [];
  }
}

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [applications, setApplications] = useState(loadApplications);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [showForm, setShowForm] = useState(false);
  const [editingApplication, setEditingApplication] = useState(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(applications));
  }, [applications]);

  const filteredApplications = useMemo(() => {
    return applications.filter((app) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        app.company.toLowerCase().includes(search) ||
        app.role.toLowerCase().includes(search) ||
        app.location.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || app.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, searchTerm, statusFilter]);

  const stats = [
    {
      label: "Total applications",
      value: applications.length,
      color: "purple",
    },
    {
      label: "Interviews",
      value: applications.filter((a) => a.status === "Interview").length,
      color: "blue",
    },
    {
      label: "Offers",
      value: applications.filter((a) => a.status === "Offer").length,
      color: "green",
    },
    {
      label: "Rejected",
      value: applications.filter((a) => a.status === "Rejected").length,
      color: "red",
    },
  ];

  
const statusColors = {
  Applied: "#9b8afb",
  Interview: "#63a8ff",
  Offer: "#5bd6a0",
  Rejected: "#ff8194",
};

const statusData = ["Applied", "Interview", "Offer", "Rejected"].map(
  (status) => ({
    name: status,
    value: applications.filter((app) => app.status === status).length,
  })
);

const totalApplications = applications.length;

const interviewRate = totalApplications
  ? Math.round(
      (applications.filter((app) => app.status === "Interview").length /
        totalApplications) *
        100
    )
  : 0;

const offerRate = totalApplications
  ? Math.round(
      (applications.filter((app) => app.status === "Offer").length /
        totalApplications) *
        100
    )
  : 0;

  function openAddForm() {
    setEditingApplication(null);
    setShowForm(true);
  }

  function openEditForm(application) {
    setEditingApplication(application);
    setShowForm(true);
  }

  function closeForm() {
    setShowForm(false);
    setEditingApplication(null);
  }

  function saveApplication(formData) {
    if (editingApplication) {
      setApplications((previous) =>
        previous.map((app) =>
          app.id === editingApplication.id
            ? { ...app, ...formData }
            : app
        )
      );
    } else {
      setApplications((previous) => [
        {
          ...formData,
          id: crypto.randomUUID(),
          createdAt: new Date().toISOString(),
        },
        ...previous,
      ]);
    }

    closeForm();
  }

  function deleteApplication(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this application?"
    );

    if (confirmed) {
      setApplications((previous) =>
        previous.filter((app) => app.id !== id)
      );
    }
  }

  
function loadDemoData() {
  if (
    applications.length > 0 &&
    !window.confirm("Replace your existing applications with demo data?")
  ) {
    return;
  }

  const demoJobs = [
    {
      company: "Infosys",
      role: "React Developer",
      location: "Noida",
      appliedDate: "2026-10-08",
      status: "Interview",
      jobLink: "",
      notes: "Technical interview preparation",
    },
    {
      company: "Accenture",
      role: "Frontend Developer",
      location: "Gurugram",
      appliedDate: "2026-10-07",
      status: "Applied",
      jobLink: "",
      notes: "Follow up with recruiter",
    },
    {
      company: "TCS",
      role: "Web Developer",
      location: "Delhi NCR",
      appliedDate: "2026-10-06",
      status: "Offer",
      jobLink: "",
      notes: "Review offer details",
    },
    {
      company: "Wipro",
      role: "UI Developer",
      location: "Noida",
      appliedDate: "2026-10-05",
      status: "Rejected",
      jobLink: "",
      notes: "Consider other openings",
    },
    {
      company: "Cognizant",
      role: "Junior React Developer",
      location: "Gurugram",
      appliedDate: "2026-10-09",
      status: "Applied",
      jobLink: "",
      notes: "Prepare React interview questions",
    },
  ];

  setApplications(
    demoJobs.map((job, index) => ({
      ...job,
      id: crypto.randomUUID(),
      createdAt: new Date(
        Date.now() - index * 60 * 60 * 1000
      ).toISOString(),
    }))
  );

  setSearchTerm("");
  setStatusFilter("All");
  setActivePage("Dashboard");
}


  return (
    <div className="app">
      <aside className="sidebar">
        <h2 className="logo">
          Job<span>Track</span>
        </h2>

        <p className="menu-label">WORKSPACE</p>

        <button
          className={`nav-item ${activePage === "Dashboard" ? "active" : ""
            }`}
          onClick={() => setActivePage("Dashboard")}
        >
          <LayoutDashboard size={19} />
          Dashboard
        </button>

        <button
          className={`nav-item ${activePage === "Applications" ? "active" : ""
            }`}
          onClick={() => setActivePage("Applications")}
        >
          <BriefcaseBusiness size={19} />
          Applications
        </button>

        <div className="sidebar-bottom">
          <button
            className="nav-item"
            onClick={() =>
              alert("Settings will be available in a future version.")
            }
          >
            <Settings size={19} />
            Settings
          </button>

          <p className="profile">NB &nbsp; Nitin Baghel</p>
        </div>
      </aside>

      <main className="main-content">
        <header className="topbar">
          <div className="search-box">
            <Search size={18} />

            <input
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search companies or roles..."
              aria-label="Search applications"
            />

            {searchTerm && (
              <button
                className="clear-search"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <button
            className="icon-button"
            aria-label="Notifications"
            title="Notifications"
          >
            <Bell size={19} />
          </button>
        </header>

        <section className="page-content">
          <div className="welcome-row">
            <div>
              <p className="eyebrow">YOUR CAREER WORKSPACE</p>

              <h1>{activePage}</h1>

              <p className="subtitle">
                Keep your job search organized and moving forward.
              </p>
            </div>

            
<div className="empty-actions">
  <button className="primary-button" onClick={openAddForm}>
    <Plus size={18} />
    Add application
  </button>

  <button className="secondary-button" onClick={loadDemoData}>
    Load demo data
  </button>
</div>

          </div>

          <div className="stats-grid">
            {stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <div className={`stat-icon ${stat.color}`}>
                  <BriefcaseBusiness size={20} />
                </div>

                <p>{stat.label}</p>
                <h2>{stat.value}</h2>
              </div>
            ))}
          </div>

          <div className="applications-section">

            {activePage === "Dashboard" ? (
              <div className="applications-section">
                
<div className="analytics-grid">
  <div className="analytics-card">
    <div className="analytics-heading">
      <div>
        <h2>Application pipeline</h2>
        <p className="subtitle">Your current application statuses</p>
      </div>
    </div>

    {totalApplications === 0 ? (
      <div className="chart-empty">
        <p>Add applications to see your analytics.</p>
      </div>
    ) : (
      <div className="chart-content">
        <div className="pie-chart">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={statusData.filter((item) => item.value > 0)}
                dataKey="value"
                nameKey="name"
                innerRadius="62%"
                outerRadius="88%"
                paddingAngle={4}
                stroke="none"
              >
                {statusData
                  .filter((item) => item.value > 0)
                  .map((item) => (
                    <Cell
                      key={item.name}
                      fill={statusColors[item.name]}
                    />
                  ))}
              </Pie>

              <Tooltip
                contentStyle={{
                  background: "#1a1d28",
                  border: "1px solid #343848",
                  borderRadius: "8px",
                  color: "#ffffff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="chart-center">
            <strong>{totalApplications}</strong>
            <span>Total jobs</span>
          </div>
        </div>

        <div className="chart-legend">
          {statusData.map((item) => (
            <div className="legend-item" key={item.name}>
              <span
                className="legend-dot"
                style={{ background: statusColors[item.name] }}
              />
              <span>{item.name}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>
    )}
  </div>

  <div className="analytics-card">
    <div className="analytics-heading">
      <div>
        <h2>Application insights</h2>
        <p className="subtitle">A snapshot of your job search</p>
      </div>
    </div>

    <div className="insight-item">
      <div className="insight-top">
        <span>Interview rate</span>
        <strong>{interviewRate}%</strong>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill interview-fill"
          style={{ width: `${interviewRate}%` }}
        />
      </div>
      <p>Applications currently marked Interview</p>
    </div>

    <div className="insight-item">
      <div className="insight-top">
        <span>Offer rate</span>
        <strong>{offerRate}%</strong>
      </div>
      <div className="progress-track">
        <div
          className="progress-fill offer-fill"
          style={{ width: `${offerRate}%` }}
        />
      </div>
      <p>Applications currently marked Offer</p>
    </div>

    <div className="career-tip">
      <BriefcaseBusiness size={20} />
      <div>
        <strong>Keep moving forward</strong>
        <p>
          Follow up on pending applications and keep your statuses updated.
        </p>
      </div>
    </div>
  </div>
</div>

                <div className="section-heading">
                  <div>
                    <h2>Recent applications</h2>
                    <p className="subtitle">
                      Your latest job search activity.
                    </p>
                  </div>

                  <button
                    className="secondary-button"
                    onClick={() => setActivePage("Applications")}
                  >
                    View all applications
                  </button>
                </div>

                {applications.length === 0 ? (
                  <div className="empty-state">
                    <BriefcaseBusiness size={36} />
                    <h3>No applications yet</h3>
                    <p>Add your first application to start tracking your job search.</p>
                    <button className="primary-button" onClick={openAddForm}>
                      <Plus size={18} />
                      Add application
                    </button>
                  </div>
                ) : (
                  <div className="table-wrapper">
                    <table className="applications-table">
                      <thead>
                        <tr>
                          <th>Company / Role</th>
                          <th>Applied date</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>

                      <tbody>
                        {[...applications]
                          .sort((a, b) =>
                            (b.createdAt || b.appliedDate || "").localeCompare(
                              a.createdAt || a.appliedDate || ""
                            )
                          )
                          .slice(0, 5)
                          .map((app) => (
                            <tr key={app.id}>
                              <td>
                                <div className="company-name">{app.company}</div>
                                <div className="role-name">{app.role}</div>
                              </td>

                              <td>
                                {app.appliedDate
                                  ? new Date(
                                    `${app.appliedDate}T00:00:00`
                                  ).toLocaleDateString("en-IN")
                                  : "—"}
                              </td>

                              <td>
                                <span
                                  className={`status-badge ${app.status.toLowerCase()}`}
                                >
                                  {app.status}
                                </span>
                              </td>

                              <td>
                                <button
                                  className="table-action"
                                  onClick={() => openEditForm(app)}
                                  title="Edit application"
                                  aria-label={`Edit ${app.company}`}
                                >
                                  <Pencil size={16} />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            ) : (
              <div className="applications-section">
                <div className="section-heading">
                  <div>
                    <h2>All applications</h2>
                    <p className="subtitle">
                      Search, filter, edit, and manage your job applications.
                    </p>
                  </div>

                  <select
                    className="filter-select"
                    value={statusFilter}
                    onChange={(event) => setStatusFilter(event.target.value)}
                    aria-label="Filter by application status"
                  >
                    <option value="All">All statuses</option>
                    <option value="Applied">Applied</option>
                    <option value="Interview">Interview</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                  </select>
                </div>

                {filteredApplications.length === 0 ? (
                  <div className="empty-state">
                    <BriefcaseBusiness size={36} />
                    <h3>
                      {applications.length === 0
                        ? "No applications yet"
                        : "No matching applications"}
                    </h3>
                    <p>
                      {applications.length === 0
                        ? "Add your first job application to get started."
                        : "Try a different search or status filter."}
                    </p>
                    {applications.length === 0 && (
                      <button className="primary-button" onClick={openAddForm}>
                        <Plus size={18} />
                        Add application
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="table-wrapper">
                    <table className="applications-table">
                      <thead>
                        <tr>
                          <th>Company / Role</th>
                          <th>Location</th>
                          <th>Applied date</th>
                          <th>Status</th>
                          <th>Job link</th>
                          <th>Actions</th>
                        </tr>
                      </thead>

                      <tbody>
                        {filteredApplications.map((app) => (
                          <tr key={app.id}>
                            <td>
                              <div className="company-name">{app.company}</div>
                              <div className="role-name">{app.role}</div>
                            </td>

                            <td>{app.location || "—"}</td>

                            <td>
                              {app.appliedDate
                                ? new Date(
                                  `${app.appliedDate}T00:00:00`
                                ).toLocaleDateString("en-IN")
                                : "—"}
                            </td>

                            <td>
                              <span
                                className={`status-badge ${app.status.toLowerCase()}`}
                              >
                                {app.status}
                              </span>
                            </td>

                            <td>
                              {app.jobLink ? (
                                <a
                                  className="job-link"
                                  href={app.jobLink}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Open job posting for ${app.role}`}
                                >
                                  <ExternalLink size={16} />
                                </a>
                              ) : (
                                "—"
                              )}
                            </td>

                            <td>
                              <div className="action-buttons">
                                <button
                                  className="table-action"
                                  onClick={() => openEditForm(app)}
                                  aria-label={`Edit ${app.company}`}
                                  title="Edit"
                                >
                                  <Pencil size={16} />
                                </button>

                                <button
                                  className="table-action delete-action"
                                  onClick={() => deleteApplication(app.id)}
                                  aria-label={`Delete ${app.company}`}
                                  title="Delete"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

                <p className="result-count">
                  Showing {filteredApplications.length} of {applications.length} applications
                </p>
              </div>
            )}

          </div>
        </section>
      </main>

      {showForm && (
        <ApplicationForm
          initialData={editingApplication}
          onSave={saveApplication}
          onClose={closeForm}
        />
      )}
    </div>
  );
}

export default App;
