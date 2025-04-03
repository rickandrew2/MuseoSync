import { Book, Menu, Sunset, Trees, Zap } from "lucide-react";
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
          {item.title}
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
        className={`group inline-flex h-10 w-max items-center justify-center rounded-md px-6 py-2 text-sm font-medium transition-all duration-300 ${
          isActive 
            ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30' 
            : 'text-foreground hover:bg-primary/10 hover:text-primary hover:shadow-lg hover:shadow-primary/20'
        }`}
      >
        {item.title}
      </Link>
    </NavigationMenuItem>
  );
};

const renderMobileMenuItem = (item) => {
  if (item.items) {
    return (
      <AccordionItem key={item.title} value={item.title} className="border-b border-border">
        <AccordionTrigger className="text-md py-4 font-medium hover:no-underline text-foreground hover:text-primary transition-colors duration-300">
          {item.title}
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
      to={item.url} 
      className="py-4 text-md font-medium text-foreground hover:text-primary transition-colors duration-300 block"
    >
      {item.title}
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
    { title: "Home", url: "/" },
    { title: "About", url: "/about" },
    {
      title: "Collections",
      url: "/collections",
    },
    {
      title: "Contact",
      url: "/contact",
    },
    {
      title: "VISIT",
      url: "/visit",
    },
  ],
}) => {
  return (
    <section className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diamond-eyes.png')] opacity-5"></div>
      <div className="container py-4 relative">
        {/* Desktop Navbar */}
        <nav className="hidden lg:flex items-center justify-between">
          {/* Logo */}
          <Link to={logo.url} className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-primary rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
              <img src={logo.src} className="relative w-12 h-12 object-contain" alt={logo.alt} />
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
            <Link to={logo.url} className="flex items-center gap-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                <img src={logo.src} className="relative w-10 h-10 object-contain" alt={logo.alt} />
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
                  className="border-primary text-primary hover:bg-primary/10 transition-colors duration-300"
                >
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent className="w-80 sm:w-96 bg-background border-l border-border">
                <SheetHeader className="mb-6">
                  <SheetTitle asChild>
                    <Link to={logo.url} className="flex items-center gap-2 group">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary rounded-full blur-sm group-hover:blur-md transition-all duration-300"></div>
                        <img src={logo.src} className="relative w-10 h-10 object-contain" alt={logo.alt} />
                      </div>
                      <span className="text-lg font-serif font-medium text-foreground group-hover:text-primary transition-colors duration-300">
                        {logo.title}
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>
                <div className="flex flex-col">
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                  >
                    {menu.map(renderMobileMenuItem)}
                  </Accordion>
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
