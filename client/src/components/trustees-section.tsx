import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { type Trustee } from "@shared/schema";

export default function TrusteesSection() {
  const { data: trustees } = useQuery<Trustee[]>({ 
    queryKey: ["/api/trustees"]
  });

  if (!trustees) return null;

  return (
    <section id="trustees" className="scroll-mt-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Trustees</h2>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {trustees.map((trustee) => (
          <Card key={trustee.id}>
            <CardContent className="p-6">
              <img
                src={trustee.imageUrl}
                alt={trustee.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold text-center mb-1">
                {trustee.name}
              </h3>
              <p className="text-muted-foreground text-center mb-4">
                {trustee.role}
              </p>
              <p className="text-gray-600 text-center">
                {trustee.bio}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
