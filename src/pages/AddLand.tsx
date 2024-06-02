import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useEffect, useState } from "react";
import { useCreateLand, useLands } from "@/api/landApi";
import getAuthenticatedUser from "@/hooks/auth";
import { getUserFromToken } from "@/api/authApi";

const AddLand = () => {
  const user = getUserFromToken().user;

  const [error, setError] = useState("");
  const [state, setState] = useState({
    farmerID: user._id ?? "",
    landAddress: "",
    landUPI: "",
    sizeInAcres: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { mutate: createLand, isSuccess } = useCreateLand();
  useEffect(() => {
    if (isSuccess) {
      // Refetch data after successful mutation
      refetchLands(); // Assuming refetchLands is a function to refetch lands data
    }
  }, [isSuccess]);

  const { data: lands, refetch: refetchLands } = useLands({
    paginationReq: { page: currentPage, perPage: itemsPerPage },
  });
  const totalPages = Math.ceil(lands?.totalPages / itemsPerPage);

  const handlePreviousClick = () => {
    setCurrentPage((old) => Math.max(old - 1, 1)); // Don't go below page 1
  };

  const handleNextClick = () => {
    setCurrentPage((old) => old + 1); // Go to the next page
  };

  const handleRegisterLand = (e: any) => {
    e.preventDefault();
    if (
      !state.farmerID ||
      state.sizeInAcres <= 0 ||
      !state.landAddress ||
      !state.landUPI
    ) {
      setError("Some Fields are Empty");
    }
    createLand(state);
    if (isSuccess) {
      setError("");
      setState({
        ...state,
        farmerID: "",
        landAddress: "",
        landUPI: "",
        sizeInAcres: 0,
      });
    }
  };

  return (
    <div className="container backdrop-blur-sm -mt-20">
      <div className="flex flex-row justify-between gap 6">
        <div className="max-w-[450px] w-full pt-36 ">
          <Card className="dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-center">Register Land</CardTitle>
              {error && (
                <CardDescription className="text-red">{error}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Land Owner</Label>
                    <Input
                      id="name"
                      placeholder={user.name}
                      value={user.name}
                      disabled
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="landAddress">Land Address</Label>
                    <Input
                      id="landAddress"
                      placeholder="Land Address"
                      onChange={(e) =>
                        setState({ ...state, landAddress: e.target.value })
                      }
                      value={state.landAddress}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="landUPI">Land UPI</Label>
                    <Input
                      id="landUPI"
                      placeholder="Land UPI"
                      onChange={(e) =>
                        setState({
                          ...state,
                          landUPI: e.target.value,
                        })
                      }
                      value={state.landUPI}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="sizeInAcre">Size in Acre</Label>
                    <Input
                      id="maxQuantityPerAcre"
                      placeholder="Size in Acre"
                      type="number"
                      onChange={(e) =>
                        setState({
                          ...state,
                          sizeInAcres: Number(e.target.value),
                        })
                      }
                      value={state.sizeInAcres}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                variant="primary"
                className="text-end"
                onClick={handleRegisterLand}
              >
                Add Land
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="max-w-[700px] w-full mt-36 bg-white/70 text-gray-700 dark:bg-slate-800 dark:text-white">
          <Table>
            <TableCaption>A list of your Land.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto font-bold">#</TableHead>
                <TableHead className="w-auto font-bold">Land UPI</TableHead>
                <TableHead className="font-bold">Land Address</TableHead>
                <TableHead className="font-bold text-right">
                  Size in Acres
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lands && lands.length > 0 ? (
                lands.map((land, index: number) => (
                  <TableRow key={index} className="dark:hover:bg-slate-900">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell>{land.landAddress}</TableCell>
                    <TableCell>{land.landUPI}</TableCell>
                    <TableCell className="text-right">
                      {land.sizeInAcres} Acres
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No lands available.</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" onClick={handlePreviousClick} />
              </PaginationItem>
              {Array.from({ length: totalPages }, (_, index) => (
                <PaginationItem
                  key={index}
                  selected={index + 1 === currentPage}
                >
                  <PaginationLink
                    href="#"
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </PaginationLink>
                  <PaginationEllipsis />
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext href="#" onClick={handleNextClick} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default AddLand;
