import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/home";
import Admin from "@/pages/admin";
import Navbar from "@/components/navbar";

function Router() {
  return (
    <div className="min-h-screen bg-background">
      <Switch>
        <Route path="/admin" component={Admin} />
        <Route path="/">
          <div className="pt-16">
            <Navbar />
            <Home />
          </div>
        </Route>
        <Route component={NotFound} />
      </Switch>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
