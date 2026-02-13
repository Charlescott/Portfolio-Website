export function ErrorState({ message, onRetry }) {
  return (
    <section className="container section status-wrap">
      <div className="status error" role="alert">
        <p>{message || 'Something went wrong.'}</p>
        {onRetry && (
          <button type="button" className="btn ghost retry-btn" onClick={onRetry}>
            Try Again
          </button>
        )}
      </div>
    </section>
  );
}
