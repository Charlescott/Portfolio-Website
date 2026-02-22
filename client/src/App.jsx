import { Navigate, Route, Routes } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PathwayPage } from './pages/PathwayPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { PrivateLessonsPage } from './pages/PrivateLessonsPage';
import { MusicLandingPage } from './pages/MusicLandingPage';
import { MusicEducationPage } from './pages/MusicEducationPage';
import { MusicCompositionPage } from './pages/MusicCompositionPage';

function App() {
  return (
    <div className="site-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/music" element={<MusicLandingPage />} />
          <Route path="/music/education" element={<MusicEducationPage />} />
          <Route path="/music/composition" element={<MusicCompositionPage />} />
          <Route path="/music/private-lessons" element={<PrivateLessonsPage />} />
          <Route path="/engineering" element={<PathwayPage slug="engineering" accent="engineering" />} />
          <Route path="/software" element={<Navigate to="/engineering" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
