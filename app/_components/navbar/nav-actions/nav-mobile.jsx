"use client"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import MainNav from "../nav-main";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

const NavMobile = ({
    categories,
    zodiacs
}) => {

  return (
    <Sheet>
      <SheetTrigger asChild className="md:hidden">
        <Button 
        variant="outline" 
        size="icon" 
        className="relative"
        >
          <HamburgerMenuIcon className='h-5 w-5' />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <div className="flex flex-col p-4">
          <MainNav 
          categories={categories} 
          zodiacs={zodiacs} 
          />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default NavMobile;
