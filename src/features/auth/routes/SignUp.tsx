import { useState } from 'react';
import { SignUpPage } from '@/features/auth/pages/SignUpPage';
import { SignUpPageEtc } from '@/features/auth/pages/SignUpPageEtc';

export function SignUp() {
  const [page, setPage] = useState('createAccount');

  const renderPage = () => {
    switch (page) {
      case 'createAccount':
        return <SignUpPage onNext={() => setPage('personalInfo')} />;
      case 'personalInfo':
        return <SignUpPageEtc onBack={() => setPage('createAccount')} />;
      default:
        return <SignUpPage onNext={() => setPage('personalInfo')} />;
    }
  };

  return <>{renderPage()}</>;
}
