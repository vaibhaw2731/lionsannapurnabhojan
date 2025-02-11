
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid credentials");
      return res.json();
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      toast({ title: "Logged in successfully" });
    },
    onError: () => {
      toast({ 
        title: "Invalid credentials",
        variant: "destructive"
      });
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file) throw new Error("No file selected");

      const formData = new FormData();
      formData.append("title", title);
      formData.append("photo", file);
      formData.append("date", new Date().toISOString());

      const res = await fetch("/api/photos", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) throw new Error("Failed to upload photo");
      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Photo uploaded successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
      setTitle("");
      setFile(null);
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    },
    onError: () => {
      toast({ 
        title: "Failed to upload photo",
        variant: "destructive"
      });
    },
  });

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Card className="w-full max-w-md mx-4">
          <CardContent className="pt-6">
            <h1 className="text-2xl font-bold mb-6">Admin Login</h1>
            <form onSubmit={(e) => {
              e.preventDefault();
              loginMutation.mutate();
            }} className="space-y-4">
              <div>
                <label className="block text-sm mb-1">Username</label>
                <Input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm mb-1">Password</label>
                <Input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <Button 
                type="submit" 
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Logging in..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Photo Upload</h1>
      <div className="max-w-md bg-card p-6 rounded-lg shadow-sm">
        <form onSubmit={(e) => {
          e.preventDefault();
          uploadMutation.mutate();
        }} className="space-y-4">
          <div>
            <label className="block text-sm mb-1">Photo Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">Photo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              required
            />
          </div>
          <Button 
            type="submit" 
            className="w-full"
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? "Uploading..." : "Upload Photo"}
          </Button>
        </form>
      </div>
    </div>
  );
}
