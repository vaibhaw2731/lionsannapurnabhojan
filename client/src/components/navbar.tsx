
import { Link } from "wouter";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-white shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <span className="text-xl font-bold text-primary cursor-pointer">
              Lions Dhandhania
            </span>
          </Link>

          <div className="flex space-x-8">
            <span 
              onClick={() => scrollToSection('mission')} 
              className="text-gray-600 hover:text-primary cursor-pointer"
            >
              Our Mission
            </span>
            <span 
              onClick={() => scrollToSection('trustees')} 
              className="text-gray-600 hover:text-primary cursor-pointer"
            >
              Trustees
            </span>
            <span 
              onClick={() => scrollToSection('gallery')} 
              className="text-gray-600 hover:text-primary cursor-pointer"
            >
              Gallery
            </span>
            <span 
              onClick={() => scrollToSection('donate')} 
              className="text-gray-600 hover:text-primary cursor-pointer"
            >
              Donate
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
