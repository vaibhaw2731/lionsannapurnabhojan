import { Card, CardContent } from "@/components/ui/card";

export default function MissionSection() {
  return (
    <section id="mission" className="scroll-mt-16">
      <h2 className="text-3xl font-bold text-center mb-12">Our Mission</h2>
      
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <img
          src="https://images.unsplash.com/photo-1473093295043-cdd812d0e601"
          alt="Food distribution"
          className="rounded-lg shadow-lg"
        />
        
        <Card>
          <CardContent className="p-6">
            <p className="text-lg leading-relaxed">
              At Lions Dhandhania Annapurna Bhojan, we believe that no one should go hungry. 
              Our mission is to provide nutritious meals to those in need at a nominal cost 
              of just ₹5, making food accessible to everyone while maintaining their dignity.
            </p>
            <p className="mt-4 text-lg leading-relaxed">
              Through our network of dedicated volunteers and supporters, we serve hundreds 
              of meals daily, bringing hope and nourishment to our community.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
