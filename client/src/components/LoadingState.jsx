export function LoadingState({ message = 'Loading portfolio content...' }) {
  return (
    <section className="container section status-wrap">
      <div className="status loading" role="status" aria-live="polite">
        <span className="spinner" aria-hidden="true" />
        <p>{message}</p>
      </div>
    </section>
  );
}
