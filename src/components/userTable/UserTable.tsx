import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
  PaginationState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserTablePagination } from "./UserTablePagination";
import { RefreshCw, Settings } from "lucide-react";
import { Switch } from "../ui/switch";

//note: do not add total page size here, as it will be automatically added based on row count
const PAGE_SIZES = [5];

const defaultPagination = {
  pageIndex: 0, //initial page index
  pageSize: PAGE_SIZES[0], //default page size
};

interface UserTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  refetch: () => void;
}

export function UserTable<TData, TValue>({
  data,
  columns,
  refetch,
}: UserTableProps<TData, TValue>) {
  // table state for manual mutation
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [pagination, setPagination] =
    useState<PaginationState>(defaultPagination);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (showAll) {
      setPagination({ pageIndex: 0, pageSize: table.getRowCount() });
      return;
    }
    setPagination(defaultPagination);
    return;
  }, [showAll]);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination,
    },
  });

  return (
    <div className="pt-1">
      <div className="flex items-center justify-between mb-3 gap-x-2">
        <Input
          placeholder="Filter Name ..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <div className="flex w-auto gap-2">
          <Button variant="outline" className="ml-auto" onClick={refetch}>
            <RefreshCw className="h-4 w-4 mr-1" />
            Refetch
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="ml-auto">
                <Settings className="h-4 w-4 mr-1" />
                Settings
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-testid="user-table-row"
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="grid w-full grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-3 my-4">
        <div className="flex items-center justify-center w-full md:justify-start">
          {!showAll && (
            <UserTablePagination
              table={table}
              pageSizes={[...PAGE_SIZES, table.getRowCount()]}
            />
          )}
        </div>

        <div className="flex items-center justify-center w-auto gap-2 md:justify-end">
          <Switch
            checked={showAll}
            onCheckedChange={(val) => setShowAll(val)}
          />
          <p className="text-sm">Show all results</p>
        </div>
      </div>
    </div>
  );
}
