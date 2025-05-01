
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="mb-6 flex justify-center">
          <div className="h-24 w-24 rounded-full bg-red-50 flex items-center justify-center">
            <AlertTriangle className="h-12 w-12 text-red-400" />
          </div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <p className="text-xl text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Button asChild className="bg-primary hover:bg-primary/90 px-6">
          <a href="/">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
