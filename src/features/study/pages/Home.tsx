import { AuthHeader } from '@/components/layout/AuthHeader';

export function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white p-4">
      <AuthHeader />
    </div>
  );
}
