import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitInquiry } from '../api';

const initialForm = {
  directorName: '',
  schoolOrOrganization: '',
  email: '',
  phone: '',
  ensembleType: '',
  studentLevel: '',
  preferredDates: '',
  goals: '',
  notes: '',
};

export function MasterclassInquiryPage() {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const onChange = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setSubmitError('');
    setIsSubmitting(true);

    try {
      await submitInquiry({
        inquiryType: 'masterclass',
        formTitle: 'Director Masterclass Request',
        subject: 'Director Masterclass Request',
        fields: [
          { label: 'Director Name', value: form.directorName },
          { label: 'School/Organization', value: form.schoolOrOrganization },
          { label: 'Email', value: form.email },
          { label: 'Phone', value: form.phone },
          { label: 'Ensemble Type', value: form.ensembleType },
          { label: 'Student Level', value: form.studentLevel },
          { label: 'Preferred Dates', value: form.preferredDates },
          { label: 'Masterclass Goals', value: form.goals },
          { label: 'Additional Notes', value: form.notes },
        ],
      });
      setSubmitted(true);
      setForm(initialForm);
    } catch (_error) {
      setSubmitError('We could not submit your request right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container section private-lessons-page">
      <p className="eyebrow">Percussion Education</p>
      <h1>Director Masterclass Request</h1>
      <p className="lede">
        Use this form to request a percussion masterclass for your program. Include goals and
        preferred timing so the session can be tailored to your students.
      </p>

      <div className="private-lessons-layout">
        <article className="panel private-lessons-info">
          <h3>Masterclass Focus Areas</h3>
          <ul>
            <li>Technique and timing fundamentals</li>
            <li>Drumline and section cohesion</li>
            <li>Audition preparation and musical confidence</li>
          </ul>
          <div className="card-actions">
            <Link to="/music" className="btn ghost">
              Back to Music Background
            </Link>
          </div>
        </article>

        <article className="panel">
          <h3>Request Form</h3>
          {submitted ? (
            <div className="status">
              <p>Request submitted. You will receive a follow-up about scheduling and details.</p>
            </div>
          ) : (
            <form className="lessons-form" onSubmit={onSubmit}>
              <label htmlFor="directorName">Director name</label>
              <input id="directorName" name="directorName" value={form.directorName} onChange={onChange} required />

              <label htmlFor="schoolOrOrganization">School or organization</label>
              <input
                id="schoolOrOrganization"
                name="schoolOrOrganization"
                value={form.schoolOrOrganization}
                onChange={onChange}
                required
              />

              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />

              <label htmlFor="phone">Phone</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} required />

              <label htmlFor="ensembleType">Ensemble type</label>
              <input id="ensembleType" name="ensembleType" value={form.ensembleType} onChange={onChange} required />

              <label htmlFor="studentLevel">Student level</label>
              <input id="studentLevel" name="studentLevel" value={form.studentLevel} onChange={onChange} required />

              <label htmlFor="preferredDates">Preferred dates / windows</label>
              <textarea
                id="preferredDates"
                name="preferredDates"
                value={form.preferredDates}
                onChange={onChange}
                rows={2}
                required
              />

              <label htmlFor="goals">Masterclass goals</label>
              <textarea id="goals" name="goals" value={form.goals} onChange={onChange} rows={4} required />

              <label htmlFor="notes">Additional notes</label>
              <textarea id="notes" name="notes" value={form.notes} onChange={onChange} rows={3} />

              {submitError ? (
                <div className="status error">
                  <p>{submitError}</p>
                </div>
              ) : null}

              <button type="submit" className="btn solid" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          )}
        </article>
      </div>
    </section>
  );
}
