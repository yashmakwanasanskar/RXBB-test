import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ChevronRight } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";

export function CustomDrawer({
  contentChilder,
  open,
  setOpen,
  classNameDrawer,
  title
}: any) {
  return (
    <Drawer direction="right" open={open} onOpenChange={setOpen}>
      <DrawerContent
        className={`h-screen top-0 right-0 left-auto mt-0  rounded-none rounded-l-xl ${classNameDrawer} `}
        aria-modal
      >
        <div className="pl-5 ">
          <div className="flex gap-2 items-center">
            <Button
              variant="outline"
              type="submit"
              size="icon"
              className="rounded-full  xl:text-sm text-xs  border-[#6a6a6a]  xl:border-[2px] border-[1px]"
              onClick={() => setOpen(false)}
            >
              <ChevronRight
                color="#6a6a6a"
                className="xl:w-[1.5rem] xl:h-[1.5rem] w-[1rem] h-[1rem] "
              />
            </Button>
            <h3 className="text-2xl font-medium text-[#303348] font-semibold">
              {title}
            </h3>
          </div>
          <ScrollArea className="h-screen">
            {contentChilder}
          </ScrollArea>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
