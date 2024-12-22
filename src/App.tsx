import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import { WebSocketProvider } from "./contexts/WebSocketContext";
import Sidebar from "./components/Sidebar";
import EventsPage from "./pages/EventsPage";
import AttendeesPage from "./pages/AttendeesPage";
import TasksPage from "./pages/TasksPage";
import LoginPage from "./pages/LoginPage";
import CalendarView from "./pages/CalendarView";

function App() {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <WebSocketProvider>
      <Router>
        <div className="flex h-screen bg-gray-100">
          <Sidebar />
          <div className="flex-1 overflow-auto">
            <div className="p-8">
              <Routes>
                <Route
                  index
                  path="/"
                  element={<Navigate replace to="events" />}
                />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/calendar" element={<CalendarView />} />
                <Route path="/attendees" element={<AttendeesPage />} />
                <Route path="/tasks" element={<TasksPage />} />
                {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
              </Routes>
            </div>
          </div>
        </div>
      </Router>
    </WebSocketProvider>
  );
}

export default App;
