import "./index.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "@/features/auth/pages/LoginPage";
import { SignUpPage } from "@/features/auth/pages/SignUpPage";
import { Home } from "@/features/study/pages/Home";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StudyMatch } from "./features/study/pages/StudyMatch";
import { StudyCreate } from "./features/study/pages/StudyCreate";
import { StudyUpdate } from "./features/study/pages/StudyUpdate";
import { StudyRead } from "./features/study/pages/StudyRead";
import { MyStudyList } from "./features/study/pages/MyStudyList";
import { MyStudyLog } from "./features/study/pages/StudyLog";
import { MyStudySession } from "./features/study/pages/StudySession";
import { MyPage } from "./features/auth/pages/MyPage";
import { StudyPreferenceTest } from "./features/study/pages/StudyPreferenceTest";
import { StudyPreferenceQuestion } from "./features/study/pages/StudyPreferenceQuestion";
import { StudyPreferenceResult } from "./features/study/pages/StudyPreferenceResult";
import { MyStamp } from "./features/auth/pages/MyStamp";
import { MyApplications } from "./features/study/pages/MyApplications";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/study/match" element={<StudyMatch />} />
          <Route path="/study/create" element={<StudyCreate />} />
          <Route path="/study/update/:studyId" element={<StudyUpdate />} />
          <Route path="/study/detail/:studyId" element={<StudyRead />} />
          <Route path="/study/my" element={<MyStudyList />} />
          <Route path="/study/my/:studyId" element={<MyStudySession />} />
          <Route
            path="/study/my/:studyId/:sessionId"
            element={<MyStudyLog />}
          />
          <Route path="/my-page" element={<MyPage />} />
          <Route
            path="/study/preference-test"
            element={<StudyPreferenceTest />}
          />
          <Route path="/my-applications" element={<MyApplications />} />
          <Route
            path="/study/preference-test/question/:questionId"
            element={<StudyPreferenceQuestion />}
          />
          <Route
            path="/study/preference-test/result"
            element={<StudyPreferenceResult />}
          />
          <Route path="/my-page/stamp" element={<MyStamp />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
