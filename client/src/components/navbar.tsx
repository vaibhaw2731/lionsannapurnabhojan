import { Link } from "wouter";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/">
            <a className="text-xl font-bold text-primary">
              Lions Dhandhania
            </a>
          </Link>

          <div className="flex space-x-8">
            <Link href="/#mission">
              <a className="text-gray-600 hover:text-primary">Our Mission</a>
            </Link>
            <Link href="/#trustees">
              <a className="text-gray-600 hover:text-primary">Trustees</a>
            </Link>
            <Link href="/#gallery">
              <a className="text-gray-600 hover:text-primary">Gallery</a>
            </Link>
            <Link href="/#donate">
              <a className="text-gray-600 hover:text-primary">Donate</a>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
