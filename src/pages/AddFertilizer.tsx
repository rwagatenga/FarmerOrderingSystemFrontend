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
import { useCreateFertilizer, useFertilizers } from "@/api/fertilizerApi";

const AddFertilizer = () => {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    name: "",
    quantityAvailable: 0,
    maxQuantityPerAcre: 0,
    pricePerKg: 0,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const { mutate: createFertilizer, isSuccess } = useCreateFertilizer();
  useEffect(() => {
    if (isSuccess) {
      // Refetch data after successful mutation
      refetchFertilizers(); // Assuming refetchFertilizers is a function to refetch fertilizers data
    }
  }, [isSuccess]);

  const { data: fertilizers, refetch: refetchFertilizers } = useFertilizers({
    paginationReq: { page: currentPage, perPage: itemsPerPage },
  });
  const totalPages = Math.ceil(fertilizers?.totalPages / itemsPerPage);

  const handlePreviousClick = () => {
    setCurrentPage((old) => Math.max(old - 1, 1)); // Don't go below page 1
  };

  const handleNextClick = () => {
    setCurrentPage((old) => old + 1); // Go to the next page
  };

  const handleRegisterFertilizer = (e: any) => {
    e.preventDefault();
    if (
      !state.name ||
      state.quantityAvailable <= 0 ||
      state.maxQuantityPerAcre <= 0 ||
      state.pricePerKg < 0
    ) {
      setError("Some Fields are Empty");
    }
    createFertilizer(state);
    if (isSuccess) {
      setError("");
      setState({
        ...state,
        name: "",
        quantityAvailable: 0,
        maxQuantityPerAcre: 0,
        pricePerKg: 0,
      });
    }
  };

  return (
    <div className="container backdrop-blur-sm -mt-20">
      <div className="flex flex-row justify-between gap 6">
        <div className="max-w-[450px] w-full pt-36 ">
          <Card className="dark:bg-slate-800">
            <CardHeader>
              <CardTitle className="text-center">Register Fertilizer</CardTitle>
              {error && (
                <CardDescription className="text-red">{error}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Fertilizer Name</Label>
                    <Input
                      id="name"
                      placeholder="Name"
                      onChange={(e) =>
                        setState({ ...state, name: e.target.value })
                      }
                      value={state.name}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="quantityAvailable">
                      Quantity Available
                    </Label>
                    <Input
                      id="quantityAvailable"
                      placeholder="Quantity Available"
                      type="number"
                      onChange={(e) =>
                        setState({
                          ...state,
                          quantityAvailable: Number(e.target.value),
                        })
                      }
                      value={state.quantityAvailable}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="maxQuantityPerAcre">
                      Max Quantity Per Acre
                    </Label>
                    <Input
                      id="maxQuantityPerAcre"
                      placeholder="Max Quantity Per Acre"
                      type="number"
                      onChange={(e) =>
                        setState({
                          ...state,
                          maxQuantityPerAcre: Number(e.target.value),
                        })
                      }
                      value={state.maxQuantityPerAcre}
                    />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="pricePerKg">Price Per Kg</Label>
                    <Input
                      id="pricePerKg"
                      placeholder="Price Per Kg"
                      type="number"
                      onChange={(e) =>
                        setState({
                          ...state,
                          pricePerKg: Number(e.target.value),
                        })
                      }
                      value={state.pricePerKg}
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                variant="primary"
                className="text-end"
                onClick={handleRegisterFertilizer}
              >
                Add Fertilizer
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="max-w-[700px] w-full mt-36 bg-white/70 text-gray-700 dark:bg-slate-800 dark:text-white">
          <Table>
            <TableCaption>A list of your Fertilizer.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto font-bold">#</TableHead>
                <TableHead className="w-auto font-bold">
                  Fertilizer Name
                </TableHead>
                <TableHead className="font-bold">Quantity Available</TableHead>
                <TableHead className="font-bold">
                  Max Quantity Per Acre
                </TableHead>
                <TableHead className="text-right font-bold">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fertilizers && fertilizers.length > 0 ? (
                fertilizers.map((fertilizer, index: number) => (
                  <TableRow key={index} className="dark:hover:bg-slate-900">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">
                      {fertilizer.name}
                    </TableCell>
                    <TableCell>{fertilizer.quantityAvailable}Kg</TableCell>
                    <TableCell>{fertilizer.maxQuantityPerAcre}Kg</TableCell>
                    <TableCell className="text-right">
                      {fertilizer.pricePerKg}frw/Kg
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4}>No fertilizers available.</TableCell>
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

export default AddFertilizer;
