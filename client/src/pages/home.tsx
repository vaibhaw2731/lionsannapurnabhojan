import MissionSection from "@/components/mission-section";
import TrusteesSection from "@/components/trustees-section";
import PhotoGallery from "@/components/photo-gallery";
import DonationForm from "@/components/donation-form";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-primary h-[500px] flex items-center justify-center text-white">
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Lions Dhandhania Annapurna Bhojan
          </h1>
          <p className="text-xl md:text-2xl">
            Serving meals to those in need for just ₹5
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 space-y-32">
        <MissionSection />
        <TrusteesSection />
        <PhotoGallery />
        <DonationForm />
      </div>
    </div>
  );
}
