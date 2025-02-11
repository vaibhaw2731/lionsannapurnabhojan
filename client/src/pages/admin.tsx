import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

export default function Admin() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const uploadMutation = useMutation({
    mutationFn: async () => {
      if (!file) return;
      
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
    },
    onError: () => {
      toast({ 
        title: "Failed to upload photo",
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

      <div className="max-w-md">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Photo Title</label>
            <Input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter photo title"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Photo</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
          </div>

          <Button 
            type="submit" 
            disabled={uploadMutation.isPending}
          >
            {uploadMutation.isPending ? "Uploading..." : "Upload Photo"}
          </Button>
        </form>
      </div>
    </div>
  );
}
