import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/features/auth/pages/LoginPage';
import { SignUpPage } from '@/features/auth/pages/SignUpPage';
import { Home } from '@/features/study/pages/Home';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StudyMatch } from './features/study/pages/StudyMatch';
import { StudyCreate } from './features/study/pages/StudyCreate';
import { StudyUpdate } from './features/study/pages/StudyUpdate';
import { StudyRead } from './features/study/pages/StudyRead';
import { MyStudyList } from './features/study/pages/MyStudyList';
import { MyStudyLog } from './features/study/pages/StudyLog';
import { MyStudySession } from './features/study/pages/StudySession';
import { MyPage } from './features/auth/pages/MyPage';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<Home />} />
          <Route path="/study/match" element={<StudyMatch />} />
          <Route path="/study/create" element={<StudyCreate />} />
          <Route path="/study/update/:studyId" element={<StudyUpdate />} />
          <Route path="/study/detail/:studyId" element={<StudyRead />} />
          <Route path="/study/my" element={<MyStudyList />} />
          <Route path="/study/my/:studyId" element={<MyStudySession />} />
          <Route path="/study/my/:studyId/:sessionId" element={<MyStudyLog />} />
          <Route path="/my-page" element={<MyPage />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
