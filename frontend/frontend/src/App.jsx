import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import CreateNew from "./pages/CreateNew";
import EditPost from "./pages/EditPost";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

// Simple auth check — if token exists in localStorage, user is logged in
function ProtectedRoute({ children }) {
    const token = localStorage.getItem("token");
    if (!token) {
        return <Navigate to="/login" replace />;
    }
    return children;
}

// Redirect logged-in users away from login/signup
function GuestRoute({ children }) {
    const token = localStorage.getItem("token");
    if (token) {
        return <Navigate to="/" replace />;
    }
    return children;
}

function App() {
    return (
        <Routes>
            {/* Guest routes (login/signup) */}
            <Route
                path="/login"
                element={
                    <GuestRoute>
                        <Login />
                    </GuestRoute>
                }
            />
            <Route
                path="/signup"
                element={
                    <GuestRoute>
                        <Signup />
                    </GuestRoute>
                }
            />

            {/* Protected routes */}
            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/create"
                element={
                    <ProtectedRoute>
                        <CreateNew />
                    </ProtectedRoute>
                }
            />
            <Route
                path="/edit/:id"
                element={
                    <ProtectedRoute>
                        <EditPost />
                    </ProtectedRoute>
                }
            />

            {/* Catch all */}
            <Route path="*" element={<NotFound />} />
        </Routes>
    );
}

export default App;
