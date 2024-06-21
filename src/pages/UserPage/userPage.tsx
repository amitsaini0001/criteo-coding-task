import { getUserData } from "@/api/getUserData";
import { UserTable } from "@/components/userTable/UserTable";
import UserTableSkeleton from "@/components/userTable/UserTableSkeleton";
import { Address, Company, User } from "@/components/userTable/types";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex justify-start items-center cursor-pointer hover:text-black"
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex justify-start items-center cursor-pointer hover:text-black"
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <div
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex justify-start items-center cursor-pointer hover:text-black"
        >
          Username
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "company",
    header: "Company",
    cell: ({ row }) => {
      const company: Company = row.getValue("company");
      return company.name;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => {
      const address: Address = row.getValue("address");
      return (
        <ul>
          {/* although our data is fit, but just in case if text is too long, truncate! */}
          <li className="truncate elipses max-w-[12rem]">
            <span className="font-bold">Street:</span> {address.street}
          </li>
          <li className="truncate elipses max-w-[12rem]">
            <span className="font-bold">City:</span> {address.city}
          </li>
          <li className="truncate elipses max-w-[12rem]">
            <span className="font-bold">Postcode:</span> {address.zipcode}
          </li>
        </ul>
      );
    },
  },
];

export const UserPage = () => {
  const { data, isError, isLoading, isSuccess, refetch } = getUserData();

  return (
    <div className=" h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">
            Criteo User Database
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of all the users
          </p>
        </div>
      </div>
      {/* Ideally should have skeleton component for loading and error component for error */}
      {isLoading && <UserTableSkeleton/>}
      {isError && <div className="text-center"><p>Error fetching users.</p></div>}
      {isSuccess && data && <UserTable columns={columns} data={data} refetch={refetch} />}
    </div>
  );
};
