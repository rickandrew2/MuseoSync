import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter } from "react-icons/fa";

const sections = [
  {
    title: "Visit",
    links: [
      { name: "Plan Your Visit", href: "/visit" },
      { name: "Exhibitions", href: "#" },
      { name: "Collections", href: "#" },
      { name: "Tours", href: "#" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "Our History", href: "/about" },
      { name: "Mission & Vision", href: "#" },
      { name: "Staff", href: "#" },
      { name: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Donate", href: "#" },
      { name: "Membership", href: "#" },
      { name: "Volunteer", href: "#" },
      { name: "Shop", href: "#" },
    ],
  },
];

const Footer7 = ({
  logo = {
    url: "/",
    src: "https://raw.githubusercontent.com/shadcn-ui/ui/main/apps/www/public/logo.png",
    alt: "Museum Logo",
    title: "Museo de Malaquing Tubig",
  },
}) => {
  return (
    <section className="relative bg-background border-t border-border">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-5"></div>
      <div className="container px-5 py-24 relative">
        <footer>
          <div className="flex flex-col items-start justify-between gap-10 text-center lg:flex-row lg:text-left">
            <div className="flex w-full max-w-96 shrink flex-col items-center justify-between gap-6 lg:items-start">
              {/* Logo */}
              <div className="flex items-center gap-3 lg:justify-start group">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                  <img src={logo.src} alt={logo.alt} title={logo.title} className="relative h-12 w-12 object-contain" />
                </div>
                <h2 className="text-xl font-serif font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                  {logo.title}
                </h2>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                Preserving History, Inspiring Future Generations Through Art and Culture
              </p>
              <ul className="flex items-center space-x-6">
                <li>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-300 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <FaInstagram className="size-6 relative" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href="https://www.facebook.com/MuseoSanJoseDMT" className="text-primary hover:text-primary/80 transition-colors duration-300 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <FaFacebook className="size-6 relative" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-300 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <FaTwitter className="size-6 relative" />
                    </div>
                  </a>
                </li>
                <li>
                  <a href="#" className="text-primary hover:text-primary/80 transition-colors duration-300 group">
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary rounded-full blur opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                      <FaLinkedin className="size-6 relative" />
                    </div>
                  </a>
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-3 gap-6 lg:gap-20">
              {sections.map((section, sectionIdx) => (
                <div key={sectionIdx} className="group">
                  <h3 className="mb-6 font-serif font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                    {section.title}
                  </h3>
                  <ul className="space-y-4 text-sm">
                    {section.links.map((link, linkIdx) => (
                      <li key={linkIdx}>
                        <a 
                          href={link.href} 
                          className="font-medium text-muted-foreground hover:text-primary transition-colors duration-300 block"
                        >
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-20 flex flex-col justify-between gap-4 border-t border-border pt-8 text-center text-sm font-medium text-muted-foreground lg:flex-row lg:items-center lg:text-left">
            <p>© 2024 Museo de Malaquing Tubig. All rights reserved.</p>
            <ul className="flex justify-center gap-4 lg:justify-start">
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  Terms and Conditions
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors duration-300">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { Footer7 };
