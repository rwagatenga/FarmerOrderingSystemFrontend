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
import { useGetFertilizers } from "@/api/fertilizerApi";
import MultiSelect from "@/components/MultiSelect";
import { useCreateSeed, useSeeds } from "@/api/seedApi";

const AddSeed = () => {
  const [error, setError] = useState("");
  const [state, setState] = useState({
    name: "",
    quantityAvailable: 0,
    maxQuantityPerAcre: 0,
    pricePerKg: 0,
  });
  const [selectedFertilizers, setSelectedFertilizers] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const {
    data: getFertilizers,
    isLoading,
    isError,
    refetch: refetchGetFertilizer,
  } = useGetFertilizers();
  const {
    mutate: createSeed,
    isSuccess,
    error: createSeedError,
  } = useCreateSeed();
  useEffect(() => {
    if (isSuccess) {
      refetchSeeds(); // Assuming refetchFertilizers is a function to refetch fertilizers data
    }
  }, [isSuccess]);

  const { data: seeds, refetch: refetchSeeds } = useSeeds({
    paginationReq: { page: currentPage, perPage: itemsPerPage },
  });

  const totalPages = seeds ? Math.ceil(seeds.totalPages / itemsPerPage) : 0;

  const handlePreviousClick = () => {
    setCurrentPage((old) => Math.max(old - 1, 1)); // Don't go below page 1
  };

  const handleNextClick = () => {
    setCurrentPage((old) => old + 1); // Go to the next page
  };

  const handleRegisterSeed = (e: any) => {
    e.preventDefault();
    if (
      !state.name ||
      state.quantityAvailable <= 0 ||
      state.maxQuantityPerAcre <= 0 ||
      state.pricePerKg < 0 ||
      selectedFertilizers.length > 0
    ) {
      setError("Some Fields are Empty");
    }

    const seedObj = {
      ...state,
      compatibleFertilizers: selectedFertilizers.map(
        (fertilizer) => fertilizer.value,
      ),
    };
    createSeed(seedObj);
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

  const handleChange = (selectedOptions: any) =>
    setSelectedFertilizers(selectedOptions);

  if (isLoading) {
    return <p>Loading fertilizers...</p>; // Display a loading state
  }
  if (createSeedError) {
    setError(createSeedError.message);
  }

  return (
    <div className="container backdrop-blur-sm -mt-20">
      <div className="flex flex-row justify-between gap 6">
        <div className="max-w-[450px] w-full pt-36 ">
          <Card className="dark:bg-slate-800 h-auto">
            <CardHeader>
              <CardTitle className="text-center">Register Seed</CardTitle>
              {error && (
                <CardDescription className="text-red">{error}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Seed Name</Label>
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
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="compatibleFertilizer">
                      Compatible Fertilizer
                    </Label>
                    {isError ?? <p>Error fetching fertilizers.</p>}
                    {getFertilizers && getFertilizers.length > 0 && (
                      <MultiSelect
                        options={getFertilizers}
                        value={selectedFertilizers}
                        onChange={handleChange}
                        refetch={refetchGetFertilizer}
                      />
                    )}
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                variant="primary"
                className="text-end"
                onClick={handleRegisterSeed}
              >
                Add Seed
              </Button>
            </CardFooter>
          </Card>
        </div>
        <div className="max-w-[700px] w-full mt-36 bg-white/70 text-gray-700 dark:bg-slate-800 dark:text-white">
          <Table>
            <TableCaption>A list of your Seeds.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-auto font-bold">#</TableHead>
                <TableHead className="w-auto font-bold">Seed Name</TableHead>
                <TableHead className="font-bold">Quantity Available</TableHead>
                <TableHead className="font-bold">
                  Max Quantity Per Acre
                </TableHead>
                <TableHead className="font-bold">
                  Compatible Fertilizers
                </TableHead>
                <TableHead className="text-right font-bold w-auto">
                  Price
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {seeds && seeds.length > 0 ? (
                seeds.map((seed: any, index: number) => (
                  <TableRow key={index} className="dark:hover:bg-slate-900">
                    <TableCell className="font-medium">{index + 1}</TableCell>
                    <TableCell className="font-medium">{seed.name}</TableCell>
                    <TableCell>{seed.quantityAvailable}Kg</TableCell>
                    <TableCell>{seed.maxQuantityPerAcre}Kg</TableCell>
                    <TableCell>
                      {seed.compatibleFertilizers &&
                      seed.compatibleFertilizers.length > 0
                        ? seed.compatibleFertilizers
                            .map((item) => item.name)
                            .join(", ")
                        : `No Compatible Fertilizer`}
                    </TableCell>
                    <TableCell className="text-right">
                      {seed.pricePerKg}frw/Kg
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

export default AddSeed;
