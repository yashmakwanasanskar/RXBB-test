import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Dispatch, SetStateAction } from "react";

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  getPageSize: number;
  setPageSize: Dispatch<SetStateAction<number>>;
  getAllDataCount: number;
  getLimitStart: number;
  setLimitStart: Dispatch<SetStateAction<number>>;
  className?:string | undefined;
}

export function DataTablePagination<TData>({
  table,
  getPageSize,
  setPageSize,
  getAllDataCount,
  getLimitStart,
  setLimitStart,
  className = undefined
}: DataTablePaginationProps<TData>) {
  return (
    <div className={`flex items-center justify-between px-2 ${className}`}>
      <div className="flex-1 text-sm text-muted-foreground"></div>
      <div className="flex items-center space-x-6 lg:space-x-8">
        <div className="flex items-center space-x-2">
          <p className="text-[#8A8A96] font-medium sm:text-xs lg:text-sm">
            Rows per page
          </p>
          <Select
            value={`${getPageSize}`}
            onValueChange={(value) => {
              setPageSize(Number(value));
              setLimitStart(0);
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={getPageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={`${pageSize}`}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center justify-center text-[#8A8A96] font-medium lg:text-sm">
          Page {getLimitStart/getPageSize+1} of{" "}
          {Math.ceil(getAllDataCount/getPageSize)}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setLimitStart(0)}
            // disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to first page</span>
            <DoubleArrowLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setLimitStart((getLimitStart - getPageSize) > 0?(getLimitStart - getPageSize):0)}
            // disabled={!table.getCanPreviousPage()}
          >
            <span className="sr-only">Go to previous page</span>
            <ChevronLeftIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="h-8 w-8 p-0"
            onClick={() => setLimitStart((getLimitStart + getPageSize) < getAllDataCount?(getLimitStart + getPageSize):Math.floor(getAllDataCount/getPageSize) * getPageSize)}
            // disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to next page</span>
            <ChevronRightIcon className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            className="hidden h-8 w-8 p-0 lg:flex"
            onClick={() => setLimitStart(Math.floor(getAllDataCount/getPageSize)*getPageSize)}
            // disabled={!table.getCanNextPage()}
          >
            <span className="sr-only">Go to last page</span>
            <DoubleArrowRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
