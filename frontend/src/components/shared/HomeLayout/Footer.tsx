const Footer = () => {
  return (
    <footer className="border-t bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left */}
          <p className="text-sm text-gray-500">
            © {new Date().getFullYear()} Car Management System. All rights
            reserved.
          </p>

          {/* Links */}
          <div className="flex gap-4 text-sm">
            <a href="#" className="text-gray-500 hover:text-indigo-600">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">
              Terms
            </a>
            <a href="#" className="text-gray-500 hover:text-indigo-600">
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
