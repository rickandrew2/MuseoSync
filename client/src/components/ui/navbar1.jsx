import { Book, Menu, Sunset, Trees, Zap, Home, Info, Phone, MapPin, Clock, ArrowUpRight } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import logoImage from "../../assets/pictures/logo3.png";

const renderMenuItem = (item) => {
  const location = useLocation();
  const isActive = location.pathname === item.url;

  if (item.items) {
    return (
      <NavigationMenuItem key={item.title}>
        <NavigationMenuTrigger className="bg-background text-foreground hover:bg-primary/10 hover:text-primary transition-colors duration-300">
          <span className="flex items-center gap-2">
            {item.icon}
            {item.title}
          </span>
        </NavigationMenuTrigger>
        <NavigationMenuContent className="bg-background border border-border">
          <div className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
            {item.items.map((subItem) => (
              <NavigationMenuLink
                asChild
                key={subItem.title}
              >
                <SubMenuLink item={subItem} />
              </NavigationMenuLink>
            ))}
          </div>
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem key={item.title}>
      <Link
        to={item.url}
        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-300 ${
          isActive 
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
            : 'text-foreground hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/20'
        }`}
      >
        <span className="flex items-center gap-2">
          {item.icon}
          {item.title}
        </span>
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item) => {
  const location = useLocation();
  const isActive = location.pathname === item.url;

  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b border-border">
        <AccordionTrigger className="text-md py-4 font-medium hover:no-underline text-foreground hover:text-primary transition-colors duration-300">
          <span className="flex items-center gap-2">
            {item.icon}
            {item.title}
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-4 pt-1">
          <div className="flex flex-col gap-3">
            {item.items.map((subItem) => (
              <SubMenuLink key={subItem.title} item={subItem} />
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    );
  }

  return (
    <Link 
      key={item.title}
      to={item.url} 
      className={`group py-3 px-4 text-md font-medium transition-all duration-300 rounded-xl flex items-center justify-between
        ${isActive 
          ? 'bg-primary/10 text-primary shadow-inner shadow-primary/10' 
          : 'text-foreground hover:text-primary hover:bg-primary/5'
        }`}
    >
      <span className="flex items-center gap-3">
        <span className={`p-2 rounded-lg ${isActive ? 'bg-primary/20' : 'bg-background/80'} group-hover:bg-primary/10 transition-colors duration-300`}>
          {item.icon}
        </span>
        {item.title}
      </span>
      <ArrowUpRight className={`w-4 h-4 transition-all duration-300 ${isActive ? 'rotate-45' : 'group-hover:translate-x-1 group-hover:-translate-y-1'}`} />
    </Link>
  );
};

const SubMenuLink = ({ item }) => {
  return (
    <Link
      to={item.url}
      className="flex items-start gap-4 rounded-lg p-3 transition-colors duration-300 hover:bg-primary/10 group"
    >
      <div className="text-primary mt-1 transition-transform duration-300 group-hover:scale-110">
        {item.icon}
      </div>
      <div className="space-y-1">
        <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors duration-300">
          {item.title}
        </div>
        {item.description && (
          <p className="text-xs text-muted-foreground line-clamp-2">
            {item.description}
          </p>
        )}
      </div>
    </Link>
  );
};

const Navbar1 = ({
  logo = {
    url: "/",
    src: logoImage,
    alt: "logo",
    title: "Museo De Malaquing Tubig",
  },
  menu = [
    { 
      title: "Home", 
      url: "/",
      icon: <Home className="w-4 h-4" />
    },
    { 
      title: "About", 
      url: "/about",
      icon: <Info className="w-4 h-4" />
    },
    {
      title: "Collections",
      url: "/collections",
      icon: <Book className="w-4 h-4" />
    },
    {
      title: "Contact",
      url: "/contact",
      icon: <Phone className="w-4 h-4" />
    },
    {
      title: "VISIT",
      url: "/visit",
      icon: <MapPin className="w-4 h-4" />
    },
  ],
}) => {
  return (
    <section className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border shadow-lg">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-5"></div>
      <div className="container py-3 relative">
        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <Link to={logo.url} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/80 rounded-full blur-sm group-hover:blur-md group-hover:scale-110 transition-all duration-300"></div>
              <img src={logo.src} className="relative w-12 h-12 object-contain transform group-hover:scale-105 transition-transform duration-300" alt={logo.alt} />
            </div>
            <span className="text-xl font-serif font-medium tracking-wide text-foreground group-hover:text-primary transition-colors duration-300">
              {logo.title}
            </span>
          </Link>

          {/* Navigation Menu */}
          <NavigationMenu>
            <NavigationMenuList className="flex gap-6">
              {menu.map(renderMenuItem)}
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Mobile Menu */}
        <div className="block lg:hidden">
          <div className="flex items-center justify-between">
            <Link to={logo.url} className="flex items-center gap-2.5 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/80 rounded-full blur-sm group-hover:blur-md group-hover:scale-110 transition-all duration-300"></div>
                <img src={logo.src} className="relative w-10 h-10 object-contain transform group-hover:scale-105 transition-transform duration-300" alt={logo.alt} />
              </div>
              <span className="text-lg font-serif font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                {logo.title}
              </span>
            </Link>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-colors duration-300"
                >
                  <Menu className="size-5" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-[85%] sm:w-[400px] bg-background/95 backdrop-blur-xl border-l border-border">
                <SheetHeader className="mb-8">
                  <SheetTitle asChild>
                    <Link to={logo.url} className="flex items-center gap-3 group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/80 rounded-full blur-sm group-hover:blur-md group-hover:scale-110 transition-all duration-300"></div>
                        <img src={logo.src} className="relative w-12 h-12 object-contain transform group-hover:scale-105 transition-transform duration-300" alt={logo.alt} />
                      </div>
                      <span className="text-xl font-serif font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col">
                  <div className="space-y-2 px-1">
                    {menu.map(renderMobileMenuItem)}
                  </div>
                  <div className="mt-auto pt-8 pb-4 space-y-4">
                    <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4" />
                      <span>Open today: 9:00–17:00</span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      <span>San Jose, Malaquing Tubig</span>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Navbar1 };
