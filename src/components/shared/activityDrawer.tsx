import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger
} from "@/components/ui/drawer";
import { ChevronRight } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export function DrawerDemo({ triggerChilder, contentChilder }: any) {
  const [open, setOpen] = useState<boolean>(false)
  return (
    <Drawer direction="right"  open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{triggerChilder}</DrawerTrigger>
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0  rounded-none">
        <div className="pl-5">

        <Button
          variant="outline"
          type="submit"
          size="icon"
          className="rounded-full  xl:text-sm text-xs  border-[#6a6a6a]  xl:border-[2px] border-[1px]"
          onClick={()=>setOpen(false)}
          >
          <ChevronRight
            color="#6a6a6a"
            className="xl:w-[1.5rem] xl:h-[1.5rem] w-[1rem] h-[1rem] "
          />
        </Button>
        <ScrollArea className="h-screen w-[50vw]">{contentChilder}</ScrollArea>
        </div>

      </DrawerContent>
    </Drawer>
  );
}
