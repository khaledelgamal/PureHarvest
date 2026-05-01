import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/router';
import { useAuthListener } from '@/services/supabase/auth';
import { Toaster } from 'sonner';

function App() {
  useAuthListener();
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </>
  );
}

export default App;
