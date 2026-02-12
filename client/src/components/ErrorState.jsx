export function ErrorState({ message }) {
  return (
    <section className="container section">
      <p className="status error">{message || 'Something went wrong.'}</p>
    </section>
  );
}
