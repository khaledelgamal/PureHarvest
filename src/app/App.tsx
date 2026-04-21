import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/router';
import { useAuthListener } from '@/services/supabase/auth';

function App() {
  useAuthListener();
  return <RouterProvider router={router} />;
}

export default App;
