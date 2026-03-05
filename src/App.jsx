import Header from "./components/layout/Header";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <div className="font-sans bg-uw-bg min-h-screen text-gray-900">
      <Header />
      <Dashboard />
    </div>
  );
}
