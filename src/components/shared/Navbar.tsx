// src/components/Navbar.jsx
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { appName } from "@/constants";
import {
  RXBBShortLogoIcon,
  sideNavToggleCloseIcon,
  sideNavToggleOpenIcon,
} from "@/constants/images";
import { cn } from "@/lib/utils";
import { LayoutContext } from "@/components/shared/LayoutContext";
import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import UserProfile from "./UserProfile";
import { getStatusTagColor, getStatusTagColorImmuzation } from "@/utilities/utils";
import { breadCrumbDisableLink } from "@/setttings";
const components = [
  {
    title: "FAQs",
    href: "/docs/primitives/alert-dialog",
    description: "answers to commonly asked questions.",
  },
  {
    title: "Contact Us",
    href: "/docs/primitives/hover-card",
    description: "Send us an email at your@email.com",
  },
];

// Converts kebab-case to title case
function kebabCaseToTitleOrUpperCaseConverter(path: any) {
  const ShortForms = ["cmr"];
  return path
    .split("-")
    .map((word: any) =>
      ShortForms.includes(word)
        ? word.toUpperCase()
        : word.charAt(0).toUpperCase() + word.slice(1)
    )
    .join(" ");
}

// Breadcrumb component
export function BreadCrumbComponent() {
  const location = useLocation();
  const segments = location.pathname.substring(1).split("/").filter(Boolean);

  const breadcrumbs = segments.map((path, index) => ({
    label: kebabCaseToTitleOrUpperCaseConverter(path),
    href: "/" + segments.slice(0, index + 1).join("/"), // Generate href dynamically
  }));

  return (
    <Breadcrumb className="ml-10 mr-4 hidden sm:block">
      <BreadcrumbList>
        {breadcrumbs.map((path, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              {breadCrumbDisableLink.includes(path.label) ? (
                <span className="font-medium text-xs lg:text-base text-gray-500 cursor-not-allowed">
                  {path.label}
                </span>
              ) : (
                <Link
                  to={path.href}
                  className="font-medium text-xs lg:text-base"
                >
                  {path.label}
                </Link>
              )}
            </BreadcrumbItem>
            {index + 1 !== breadcrumbs.length && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

interface DoctypeStatusComponentProps {
  doctypeStatusFlag: string;
}
//status show for all pages
const DoctypeStatusComponent = () => {
  const { doctypeStatus } = useContext<any>(LayoutContext);
  if(doctypeStatus && doctypeStatus.status){
  switch (doctypeStatus.page) {
    case "cmr-service":
      return (
        <div
          className={`${getStatusTagColor(
            doctypeStatus.status
          )} h-fit w-fit p-1 px-2 border border-[#CCCCCC] rounded-xl font-medium xl:text-base sm:text-sm text-xs text-center sm:block hidden`}
        >
          {doctypeStatus.status}
        </div>
      );
    case "immunization-service":
      return (
        <div
          className={`${getStatusTagColorImmuzation(
            doctypeStatus.status
          )} h-fit w-fit p-1 px-2 border border-[#CCCCCC] rounded-xl font-medium xl:text-base sm:text-sm text-xs text-center sm:block hidden`}
        >
          {doctypeStatus.status}
        </div>
      );
    default:
      break
  }
}

};

const Navbar = ({ toggleState, handleToggle }: any) => {
  return (
    <header className="w-full z-10 border-[#CCCCCC] border-b-2">
      <nav className="mx-auto flex justify-between py-2 px-5">
        <div className="flex items-center ">
          <Link to="/" className="flex justify-center items-center">
            <img
              src={RXBBShortLogoIcon.path}
              alt={appName}
              width={35}
              height={35}
              className="object-contain"
            />
          </Link>

          {/* Toggle button */}
          <button onClick={handleToggle} className="ml-6">
            <img
              src={
                toggleState
                  ? sideNavToggleCloseIcon.path
                  : sideNavToggleOpenIcon.path
              }
              alt={
                toggleState
                  ? sideNavToggleCloseIcon.alt
                  : sideNavToggleOpenIcon.alt
              }
              width={25}
              height={25}
            />
          </button>
          <BreadCrumbComponent />
          <DoctypeStatusComponent />
        </div>

        <div className="flex gap-4">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger className="font-medium text-xs lg:text-base">
                  Help
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[160px] gap-3">
                    {components.map((component) => (
                      <ListItem
                        key={component.title}
                        title={component.title}
                        href={component.href}
                      >
                        {component.description}
                      </ListItem>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* User profile */}
          <div className="py-2 items-center">
            <UserProfile />
          </div>
        </div>
      </nav>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-xs leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export default Navbar;
