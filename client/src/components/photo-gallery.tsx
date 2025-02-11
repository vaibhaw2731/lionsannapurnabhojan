import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { type Photo } from "@shared/schema";
import { Skeleton } from "@/components/ui/skeleton";

export default function PhotoGallery() {
  const { data: photos, isLoading } = useQuery<Photo[]>({
    queryKey: ["/api/photos"]
  });

  if (isLoading) {
    return (
      <section id="gallery" className="scroll-mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">Photo Gallery</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <Skeleton className="w-full h-48 rounded-lg" />
                <Skeleton className="h-4 w-3/4 mt-4 mx-auto" />
                <Skeleton className="h-3 w-1/2 mt-2 mx-auto" />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    );
  }

  if (!photos?.length) {
    return (
      <section id="gallery" className="scroll-mt-16">
        <h2 className="text-3xl font-bold text-center mb-12">Photo Gallery</h2>
        <Card className="max-w-lg mx-auto">
          <CardContent className="p-6 text-center text-muted-foreground">
            No photos have been uploaded yet.
          </CardContent>
        </Card>
      </section>
    );
  }

  return (
    <section id="gallery" className="scroll-mt-16">
      <h2 className="text-3xl font-bold text-center mb-12">Photo Gallery</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {photos.map((photo) => (
          <Card key={photo.id} className="overflow-hidden transition-all hover:shadow-lg">
            <CardContent className="p-4">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img
                  src={`data:image/jpeg;base64,${photo.imageData}`}
                  alt={photo.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="mt-4 font-medium text-center">{photo.title}</h3>
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