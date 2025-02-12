import { Link } from "wouter";

export default function Navbar() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="bg-yellow-300 shadow-sm fixed top-0 left-0 right-0 z-50"> {/* Changed background color to a light yellow */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center"> {/* Added flexbox for better logo placement */}
              <img src="/attached_assets/image_1739356131319.png" alt="Lions Logo" className="h-10 w-10 mr-2" /> {/* Added logo */}
              <span className="text-xl font-bold text-blue-700 cursor-pointer"> {/* Changed text color to blue */}
                Lions Dhandhania
              </span>
            </div>
          </Link>

          <div className="flex space-x-8">
            <span 
              onClick={() => scrollToSection('mission')} 
              className="text-blue-700 hover:text-yellow-500 cursor-pointer" {/* Changed text and hover colors */}
            >
              Our Mission
            </span>
            <span 
              onClick={() => scrollToSection('trustees')} 
              className="text-blue-700 hover:text-yellow-500 cursor-pointer" {/* Changed text and hover colors */}
            >
              Trustees
            </span>
            <span 
              onClick={() => scrollToSection('gallery')} 
              className="text-blue-700 hover:text-yellow-500 cursor-pointer" {/* Changed text and hover colors */}
            >
              Gallery
            </span>
            <span 
              onClick={() => scrollToSection('donate')} 
              className="text-blue-700 hover:text-yellow-500 cursor-pointer" {/* Changed text and hover colors */}
            >
              Donate
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}