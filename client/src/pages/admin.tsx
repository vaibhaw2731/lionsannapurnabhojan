import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [title, setTitle] = useState("");

  useEffect(() => {
    const checkAuth = () => {
      const userId = window.$replit?.user?.id;
      setIsAuthenticated(!!userId);
    };

    checkAuth();
    window.addEventListener('auth', checkAuth);
    return () => window.removeEventListener('auth', checkAuth);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Admin Access Required</h1>
        <div className="bg-card p-6 rounded-lg shadow-sm">
          <p className="mb-4">Please log in to access the admin panel.</p>
          <script src="https://auth.util.repl.co/script.js"></script>
        </div>
      </div>
    );
  }
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

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

      if (!res.ok) {
        const error = await res.text();
        throw new Error(error || "Failed to upload photo");
      }

      return res.json();
    },
    onSuccess: () => {
      toast({ title: "Photo uploaded successfully" });
      queryClient.invalidateQueries({ queryKey: ["/api/photos"] });
      setTitle("");
      setFile(null);
      // Reset the file input
      const fileInput = document.querySelector('input[type="file"]') as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    },
    onError: (error: Error) => {
      toast({ 
        title: "Failed to upload photo",
        description: error.message,
        variant: "destructive"
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) {
      toast({
        title: "Please fill in all fields",
        variant: "destructive"
      });
      return;
    }
    uploadMutation.mutate();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="max-w-md bg-card p-6 rounded-lg shadow-sm">
        <h2 className="text-2xl font-semibold mb-6">Upload New Photo</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Photo Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter photo title"
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full"
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