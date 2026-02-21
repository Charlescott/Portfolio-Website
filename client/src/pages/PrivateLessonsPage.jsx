import { useState } from 'react';
import { Link } from 'react-router-dom';

const initialForm = {
  fullName: '',
  email: '',
  phone: '',
  studentLevel: '',
  lessonFormat: 'in-person',
  lessonLength: '60',
  goals: '',
  availability: '',
};

export function PrivateLessonsPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="container section private-lessons-page">
      <p className="eyebrow">Private Percussion Lessons</p>
      <h1>Private Lessons Inquiry</h1>
      <p className="lede">
        Complete the form below to request private lesson information. Inquiries are reviewed for
        fit, availability, and training goals.
      </p>

      <div className="private-lessons-layout">
        <article className="panel private-lessons-info">
          <h3>Program Snapshot</h3>
          <ul>
            <li>In-person and Zoom options available</li>
            <li>Structured training for middle school, high school, and adult students</li>
            <li>Focus areas: technique, audition prep, rhythm literacy, and confidence</li>
          </ul>
          <h4>Starting Rate</h4>
          <p className="meta">$60/hour standard in-person lesson</p>
          <div className="card-actions">
            <Link to="/music" className="btn ghost">
              Back to Music Background
            </Link>
          </div>
        </article>

        <article className="panel">
          <h3>Inquiry Form</h3>
          {submitted ? (
            <div className="status">
              <p>Inquiry submitted. You will receive a follow-up about next steps and scheduling.</p>
            </div>
          ) : (
            <form className="lessons-form" onSubmit={onSubmit}>
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                name="fullName"
                type="text"
                value={form.fullName}
                onChange={onChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={onChange}
                required
              />

              <label htmlFor="phone">Phone</label>
              <input
                id="phone"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={onChange}
                required
              />

              <label htmlFor="studentLevel">Student level</label>
              <select
                id="studentLevel"
                name="studentLevel"
                value={form.studentLevel}
                onChange={onChange}
                required
              >
                <option value="">Select level</option>
                <option value="middle-school">Middle School</option>
                <option value="high-school">High School</option>
                <option value="adult">Adult Learner</option>
              </select>

              <label htmlFor="lessonFormat">Preferred format</label>
              <select
                id="lessonFormat"
                name="lessonFormat"
                value={form.lessonFormat}
                onChange={onChange}
                required
              >
                <option value="in-person">In-Person</option>
                <option value="zoom">Zoom</option>
                <option value="hybrid">Hybrid</option>
              </select>

              <label htmlFor="lessonLength">Preferred lesson length</label>
              <select
                id="lessonLength"
                name="lessonLength"
                value={form.lessonLength}
                onChange={onChange}
                required
              >
                <option value="60">60 minutes</option>
                <option value="45">45 minutes</option>
                <option value="30">30 minutes</option>
              </select>

              <label htmlFor="goals">Primary goals</label>
              <textarea
                id="goals"
                name="goals"
                value={form.goals}
                onChange={onChange}
                rows={4}
                required
              />

              <label htmlFor="availability">Weekly availability</label>
              <textarea
                id="availability"
                name="availability"
                value={form.availability}
                onChange={onChange}
                rows={3}
                required
              />

              <button type="submit" className="btn solid">
                Submit Inquiry
              </button>
            </form>
          )}
        </article>
      </div>
    </section>
  );
}
