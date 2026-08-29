import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/router';
import { useAuthListener } from '@/services/supabase/auth';
import { Toaster } from 'sonner';
import { SpeedInsights } from '@vercel/speed-insights/react';

function App() {
  useAuthListener();
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
      <SpeedInsights />
    </>
  );
}

export default App;
