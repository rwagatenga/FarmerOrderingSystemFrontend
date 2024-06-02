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
import { useCreateSeed, useGetSeeds, useSeeds } from "@/api/seedApi";
import getAuthenticatedUser from "@/hooks/auth";
import { SelectOptions, SelectLand } from "@/components/SelectOptions";
import { useFarmersLand, useGetLands, useLands } from "@/api/landApi";
import {
  calculatePrice,
  calculateQuantityRequired,
  formatNumberWithCommas,
} from "@/lib/utils";
import { Fertilizer } from "@/interfaces/Fertilizer";
import { useCreateOrder } from "@/api/orderApi";
import { OrderStatus, PaymentStatus } from "@/interfaces/Order";
import { getUserFromToken } from "@/api/authApi";

interface NamesInterface {
  landUPI: any[];
  seedName: any[];
  fertilizerName: any[];
  landOwner: any[];
  fertilizers: any[];
}
const Order = () => {
  const user = getUserFromToken().user;
  const {
    data: farmersLand,
    isLoading: farmersLandLoading,
    refetch: farmersLandRefetch,
  } = useFarmersLand(user._id);

  const {
    data: seeds,
    isLoading: seedLoading,
    refetch: seedRefetch,
  } = useGetSeeds();

  const [names, setNames] = useState<NamesInterface>({
    landUPI: [],
    seedName: [],
    fertilizerName: [],
    landOwner: [],
    fertilizers: [],
  });
  const [state, setState] = useState({
    farmerID: user._id,
    landID: "",
    fertilizerID: "",
    seedID: "",
    fertilizerQuantityOrdered: 0,
    seedQuantityOrdered: 0,
    status: OrderStatus.PENDING,
    paymentStatus: PaymentStatus.UNPAID,
    seedPricePerUnit: 0,
    seedTotalPrice: 0,
    fertilizerPricePerUnit: 0,
    fertilizerTotalPrice: 0,
  });
  const { mutate: createOrder, isSuccess: orderSuccess } = useCreateOrder();
  const [error, setError] = useState("");
  const handleFarmerLandChange = (selectedLand: any) => {
    setNames({
      ...names,
      landUPI: selectedLand,
    });
    setState({ ...state, landID: selectedLand.value });
  };
  const handleSeedChange = (selectedSeed: any) => {
    if (farmersLand && selectedSeed) {
      const landSize = farmersLand.find((item) => item._id === state.landID);
      if (landSize && seeds) {
        const fertilizers =
          seeds.find((item) => item._id === selectedSeed.value)
            ?.compatibleFertilizers || [];
        setNames({
          ...names,
          seedName: selectedSeed,
          fertilizers: fertilizers,
        });
        const maxQuantityPerAcre = seeds.find(
          (item) => item._id === selectedSeed.value,
        )?.maxQuantityPerAcre;
        const pricePerKg = seeds.find(
          (item) => item._id === selectedSeed.value,
        )?.pricePerKg;
        if (maxQuantityPerAcre && pricePerKg) {
          const seedRequired = calculateQuantityRequired(
            landSize.sizeInAcres,
            maxQuantityPerAcre,
          );
          const seedPrice = calculatePrice(seedRequired, pricePerKg);
          setState({
            ...state,
            seedID: selectedSeed.value,
            seedQuantityOrdered: seedRequired,
            seedPricePerUnit: pricePerKg,
            seedTotalPrice: seedPrice,
          });
        }
      }
    }
  };
  const handleFertilizerChange = (selectedFertilizer: any) => {
    if (farmersLand && selectedFertilizer) {
      const landSize = farmersLand.find((item) => item._id === state.landID);
      if (landSize && names.fertilizers) {
        const fertilizers = names.fertilizers.find(
          (item) => item._id === selectedFertilizer.value,
        );

        if (fertilizers) {
          const maxQuantityPerAcre = fertilizers.maxQuantityPerAcre;
          const pricePerKg = fertilizers.pricePerKg;
          if (maxQuantityPerAcre && pricePerKg) {
            const fertilizerRequired = calculateQuantityRequired(
              landSize.sizeInAcres,
              maxQuantityPerAcre,
            );
            const fertilizerPrice = calculatePrice(
              fertilizerRequired,
              pricePerKg,
            );
            setNames({ ...names, fertilizerName: selectedFertilizer });
            setState({
              ...state,
              fertilizerID: selectedFertilizer.value,
              fertilizerQuantityOrdered: fertilizerRequired,
              fertilizerPricePerUnit: pricePerKg,
              fertilizerTotalPrice: fertilizerPrice,
            });
          }
        }
      }
    }
  };

  const handleOrderSubmit = (e: any) => {
    e.preventDefault();
    if (
      !state.farmerID ||
      !state.fertilizerID ||
      !state.seedID ||
      !state.landID
    ) {
      setError("Some Fields are empty");
    }
    createOrder(state);
  };
  return (
    <div className="container backdrop-blur-sm -mt-20">
      <div className="flex flex-row justify-between gap 6">
        <div className="max-w-[650px] w-full pt-36 ">
          <Card className="dark:bg-slate-800 h-auto">
            <CardHeader>
              <CardTitle className="text-center">
                Order Seeds and Fertilizers
              </CardTitle>
              {error && (
                <CardDescription className="text-red">{error}</CardDescription>
              )}
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-row justify-between w-full gap-8">
                    <div className="w-[50%]">
                      <div className="flex flex-col space-y-1.5 my-4">
                        <Label htmlFor="landOwner">Land Owner</Label>
                        <Input
                          id="name"
                          placeholder={user.name}
                          value={user.name}
                          disabled
                          className="ring-1"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5 my-4">
                        <Label htmlFor="landID">Land UPI</Label>
                        {farmersLand && farmersLand.length > 0 && (
                          <SelectLand
                            options={farmersLand}
                            onChange={handleFarmerLandChange}
                            value={names.landUPI}
                            onFocus={farmersLandRefetch}
                            isLoading={farmersLandLoading}
                            name="landID"
                          />
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5 my-4">
                        <Label htmlFor="seedID">Seed</Label>
                        {seeds && seeds.length > 0 && (
                          <SelectOptions
                            options={seeds}
                            onChange={handleSeedChange}
                            value={names.seedName}
                            onFocus={seedRefetch}
                            isLoading={seedLoading}
                            name="seedID"
                          />
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5 my-4">
                        <Label htmlFor="fartilizerID">Fertilizers</Label>
                        {seeds && seeds.length > 0 && (
                          <SelectOptions
                            options={names.fertilizers}
                            onChange={handleFertilizerChange}
                            value={names.fertilizerName}
                            onFocus={seedRefetch}
                            isLoading={seedLoading}
                            name="fartilizerID"
                          />
                        )}
                      </div>
                      <div className="flex flex-col space-y-1.5 my-4">
                        <Label htmlFor="seedPricePerUnit">Seeds Price/Kg</Label>
                        <Input
                          id="seedPricePerUnit"
                          placeholder={`${state.seedPricePerUnit.toString()} frw`}
                          value={`${formatNumberWithCommas(
                            state.seedPricePerUnit,
                          )} Frw/Kg`}
                          disabled
                          className="ring-1"
                        />
                      </div>
                    </div>
                    <div className="w-[50%]">
                      <div className="flex flex-col space-y-1.5 my-4">
                        <Label htmlFor="seedQuantityOrdered">
                          Seeds Required
                        </Label>
                        <Input
                          id="seedQuantityOrdered"
                          placeholder={`${state.seedQuantityOrdered.toString()} Kg `}
                          value={`${formatNumberWithCommas(
                            state.seedQuantityOrdered,
                          )} Kg`}
                          disabled
                          className="ring-1"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5 my-4">
                        <Label htmlFor="seedTotalPrice">
                          Seeds Total Price
                        </Label>
                        <Input
                          id="seedTotalPrice"
                          placeholder={`${state.seedTotalPrice.toString()} Frw `}
                          value={`${formatNumberWithCommas(
                            state.seedTotalPrice,
                          )} Frw`}
                          disabled
                          className="ring-1"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5 my-4">
                        <Label htmlFor="fertilizerPricePerUnit">
                          Fertilizer Price/Kg
                        </Label>
                        <Input
                          id="fertilizerPricePerUnit"
                          placeholder={`${state.fertilizerPricePerUnit.toString()} Frw/Kg `}
                          value={`${formatNumberWithCommas(
                            state.fertilizerPricePerUnit,
                          )} Frw/Kg`}
                          disabled
                          className="ring-1"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5 my-4">
                        <Label htmlFor="fertilizerPricePerUnit">
                          Fertilizer Required
                        </Label>
                        <Input
                          id="fertilizerQuantityOrdered"
                          placeholder={`${state.fertilizerQuantityOrdered.toString()} Frw/Kg `}
                          value={`${formatNumberWithCommas(
                            state.fertilizerQuantityOrdered,
                          )} Kg`}
                          disabled
                          className="ring-1"
                        />
                      </div>
                      <div className="flex flex-col space-y-1.5 my-4">
                        <Label htmlFor="fertilizerTotalPrice">
                          Fertilizer Total Price
                        </Label>
                        <Input
                          id="fertilizerQuantityOrdered"
                          placeholder={`${state.fertilizerTotalPrice.toString()} Frw`}
                          value={`${formatNumberWithCommas(
                            state.fertilizerTotalPrice,
                          )} Frw`}
                          disabled
                          className="ring-1"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button
                variant="primary"
                className="text-end"
                onClick={(e) => handleOrderSubmit(e)}
              >
                Order Now
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Order;
