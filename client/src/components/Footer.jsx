export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-inner">
        <p>Scott Fairdosi | Full Stack Software Developer</p>
        <p>{year}</p>
      </div>
    </footer>
  );
}
