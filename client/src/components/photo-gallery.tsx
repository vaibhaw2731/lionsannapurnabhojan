import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { type Photo } from "@shared/schema";

export default function PhotoGallery() {
  const { data: photos } = useQuery<Photo[]>({
    queryKey: ["/api/photos"]
  });

  if (!photos?.length) return null;

  return (
    <section id="gallery" className="scroll-mt-16">
      <h2 className="text-3xl font-bold text-center mb-12">Photo Gallery</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Card key={photo.id}>
            <CardContent className="p-4">
              <img
                src={`data:image/jpeg;base64,${photo.imageData}`}
                alt={photo.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="mt-2 font-medium text-center">{photo.title}</h3>
              <p className="text-sm text-muted-foreground text-center">
                {new Date(photo.date).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
