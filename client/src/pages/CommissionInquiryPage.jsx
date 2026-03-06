import { useState } from 'react';
import { Link } from 'react-router-dom';
import { submitInquiry } from '../api';

const initialForm = {
  fullName: '',
  organization: '',
  email: '',
  phone: '',
  projectType: '',
  intendedUse: '',
  timeline: '',
  budgetRange: '',
  creativeBrief: '',
  referenceTracks: '',
};

export function CommissionInquiryPage() {
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
        inquiryType: 'composition-commission',
        formTitle: 'Music Commission Inquiry',
        subject: 'Music Commission Inquiry',
        fields: [
          { label: 'Full Name', value: form.fullName },
          { label: 'Organization/Client', value: form.organization },
          { label: 'Email', value: form.email },
          { label: 'Phone', value: form.phone },
          { label: 'Project Type', value: form.projectType },
          { label: 'Intended Use', value: form.intendedUse },
          { label: 'Timeline', value: form.timeline },
          { label: 'Budget Range', value: form.budgetRange },
          { label: 'Creative Brief', value: form.creativeBrief },
          { label: 'Reference Tracks', value: form.referenceTracks },
        ],
      });
      setSubmitted(true);
      setForm(initialForm);
    } catch (_error) {
      setSubmitError('We could not submit your inquiry right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="container section private-lessons-page">
      <p className="eyebrow">Music Composition</p>
      <h1>Commission Original Music</h1>
      <p className="lede">
        Share your project details to request custom composition for film, media, live performance,
        or branded content.
      </p>

      <div className="private-lessons-layout">
        <article className="panel private-lessons-info">
          <h3>Commission Workflow</h3>
          <ul>
            <li>Creative scope and reference review</li>
            <li>Timeline and budget alignment</li>
            <li>Draft, revisions, and final delivery</li>
          </ul>
          <div className="card-actions">
            <Link to="/music/composition" className="btn ghost">
              Back to Composition
            </Link>
          </div>
        </article>

        <article className="panel">
          <h3>Commission Inquiry Form</h3>
          {submitted ? (
            <div className="status">
              <p>Inquiry submitted. You will receive a follow-up to discuss scope and next steps.</p>
            </div>
          ) : (
            <form className="lessons-form" onSubmit={onSubmit}>
              <label htmlFor="fullName">Full name</label>
              <input id="fullName" name="fullName" value={form.fullName} onChange={onChange} required />

              <label htmlFor="organization">Organization or client (optional)</label>
              <input id="organization" name="organization" value={form.organization} onChange={onChange} />

              <label htmlFor="email">Email</label>
              <input id="email" name="email" type="email" value={form.email} onChange={onChange} required />

              <label htmlFor="phone">Phone (optional)</label>
              <input id="phone" name="phone" type="tel" value={form.phone} onChange={onChange} />

              <label htmlFor="projectType">Project type</label>
              <input id="projectType" name="projectType" value={form.projectType} onChange={onChange} required />

              <label htmlFor="intendedUse">Intended use</label>
              <input id="intendedUse" name="intendedUse" value={form.intendedUse} onChange={onChange} required />

              <label htmlFor="timeline">Timeline</label>
              <textarea id="timeline" name="timeline" value={form.timeline} onChange={onChange} rows={2} required />

              <label htmlFor="budgetRange">Budget range</label>
              <input id="budgetRange" name="budgetRange" value={form.budgetRange} onChange={onChange} required />

              <label htmlFor="creativeBrief">Creative brief</label>
              <textarea
                id="creativeBrief"
                name="creativeBrief"
                value={form.creativeBrief}
                onChange={onChange}
                rows={4}
                required
              />

              <label htmlFor="referenceTracks">Reference tracks / links (optional)</label>
              <textarea
                id="referenceTracks"
                name="referenceTracks"
                value={form.referenceTracks}
                onChange={onChange}
                rows={3}
              />

              {submitError ? (
                <div className="status error">
                  <p>{submitError}</p>
                </div>
              ) : null}

              <button type="submit" className="btn solid" disabled={isSubmitting}>
                {isSubmitting ? 'Submitting...' : 'Submit Commission Inquiry'}
              </button>
            </form>
          )}
        </article>
      </div>
    </section>
  );
}
