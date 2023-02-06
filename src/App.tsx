import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";



//Toast
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import Orders from "./pages/Orders";
import EditOrder from "./pages/EditOrder";



import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()



function App() {
  return (
    <div> <QueryClientProvider client={queryClient}>
          <Router>
            <Routes>
              <Route path="/" element={ <Orders />} />
              <Route
                path="/orders/:id"
                element={<EditOrder />}
              />
            </Routes>
          </Router>
          </QueryClientProvider >
      <ToastContainer />
    </div>
  );
}

export default App;
