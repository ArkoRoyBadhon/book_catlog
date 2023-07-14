import MainLayout from "./layouts/MainLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <ToastContainer />
      <MainLayout />
    </>
  );
}

export default App;
