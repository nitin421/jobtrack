
import { useEffect, useState } from "react";
import { X } from "lucide-react";

const emptyForm = {
  company: "",
  role: "",
  location: "",
  appliedDate: new Date().toISOString().slice(0, 10),
  status: "Applied",
  jobLink: "",
  notes: "",
};

function ApplicationForm({ initialData, onSave, onClose }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (initialData) {
      setForm({ ...emptyForm, ...initialData });
    } else {
      setForm({
        ...emptyForm,
        appliedDate: new Date().toISOString().slice(0, 10),
      });
    }
  }, [initialData]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    onSave({
      ...form,
      company: form.company.trim(),
      role: form.role.trim(),
      location: form.location.trim(),
      jobLink: form.jobLink.trim(),
      notes: form.notes.trim(),
    });
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
        className="application-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="form-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="modal-heading">
          <div>
            <p className="eyebrow">JOBTRACK WORKSPACE</p>
            <h2 id="form-title">
              {initialData ? "Edit application" : "Add application"}
            </h2>
          </div>

          <button
            type="button"
            className="icon-button"
            onClick={onClose}
            aria-label="Close form"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <label>
              Company name *
              <input
                name="company"
                value={form.company}
                onChange={handleChange}
                placeholder="e.g. Infosys"
                required
                maxLength={100}
              />
            </label>

            <label>
              Job title *
              <input
                name="role"
                value={form.role}
                onChange={handleChange}
                placeholder="e.g. React Developer"
                required
                maxLength={100}
              />
            </label>

            <label>
              Location
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="e.g. Noida / Remote"
                maxLength={100}
              />
            </label>

            <label>
              Applied date *
              <input
                type="date"
                name="appliedDate"
                value={form.appliedDate}
                onChange={handleChange}
                required
              />
            </label>

            <label>
              Application status
              <select
                name="status"
                value={form.status}
                onChange={handleChange}
              >
                <option>Applied</option>
                <option>Interview</option>
                <option>Offer</option>
                <option>Rejected</option>
              </select>
            </label>

            <label>
              Job posting URL
              <input
                type="url"
                name="jobLink"
                value={form.jobLink}
                onChange={handleChange}
                placeholder="https://..."
                maxLength={2048}
              />
            </label>
          </div>

          <label className="notes-field">
            Notes
            <textarea
              name="notes"
              value={form.notes}
              onChange={handleChange}
              placeholder="Recruiter details, interview date, follow-up..."
              rows={3}
              maxLength={2000}
            />
          </label>

          <div className="form-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={onClose}
            >
              Cancel
            </button>

            <button type="submit" className="primary-button">
              {initialData ? "Save changes" : "Save application"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default ApplicationForm;
