import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import CreateNew from "./pages/CreateNew";
import NotFound from "./pages/NotFound";
import EditPost from "./pages/EditPost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
    return (
        <Routes>
            <Route path='/' element={<Login />}></Route>
            <Route path='/signup' element={<Signup />}></Route>
            <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>}/>
            <Route path='/createpost' element={<ProtectedRoute><CreateNew /></ProtectedRoute>} />
            <Route path='/editpost/:id' element={<ProtectedRoute><EditPost /></ProtectedRoute>} />
            <Route path='*' element={<NotFound />} />
        </Routes>
    );
}

export default App;
