"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
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
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrders, useUpdateOrder } from "@/api/orderApi";
import { OrderStatus, PaymentStatus } from "@/interfaces/Order";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/ui/pagination";
import { getUserFromToken } from "@/api/authApi";
import { UserEnum } from "@/interfaces/User";
import { Badge } from "@/components/ui/badge";

const ViewOrders = () => {
  const user = getUserFromToken()?.user;

  const [currentPage, setCurrentPage] = React.useState(1);
  const [state, setState] = React.useState({
    status: "",
    paymentStatus: "",
  });
  const itemsPerPage = 5;

  const {
    data: orders,
    isLoading: ordersLoading,
    refetch: refetchOrders,
  } = useOrders({
    paginationReq: { page: currentPage, perPage: itemsPerPage },
    farmerID: user.category === UserEnum.FARMER ? user._id : null,
  });

  const {
    mutate: updateOrderMutation,
    isSuccess,
    isLoading,
  } = useUpdateOrder();

  const totalPages = orders ? Math.ceil(orders.totalPages / itemsPerPage) : 0;

  React.useEffect(() => {
    if (isSuccess) {
      refetchOrders();
    }
  }, [isSuccess]);

  const handlePreviousClick = () => {
    setCurrentPage((old) => Math.max(old - 1, 1)); // Don't go below page 1
  };

  const handleNextClick = () => {
    setCurrentPage((old) => old + 1); // Go to the next page
  };

  const handleApprove = (id: string) => {
    const payload = {
      id,
      status: OrderStatus.APPROVED,
      paymentStatus: PaymentStatus.PAID,
    };

    // Call the mutation function with the payload
    updateOrderMutation(payload);
  };
  const handleReject = (id: string) => {
    const payload = {
      id,
      status: OrderStatus.REJECTED,
      paymentStatus: PaymentStatus.UNPAID,
    };

    // Call the mutation function with the payload
    updateOrderMutation(payload);
  };
  return (
    <div className="container backdrop-blur-sm ml-0 left-0 -mt-20 w-[100%]">
      <div className="flex flex-row justify-between">
        <div className="max-w-full pt-36 ">
          <Card className="dark:bg-slate-800 h-auto w-full ml-0">
            <CardHeader>
              <CardTitle className="text-center">List of the Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="w-full ml-0 mt-4 bg-white/70 text-gray-700 dark:bg-slate-800 dark:text-white">
                <Table>
                  <TableCaption>A list of your Orders.</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-auto font-bold">#</TableHead>
                      <TableHead className="w-auto font-bold">
                        Land Owner
                      </TableHead>
                      <TableHead className="font-bold">Land UPI</TableHead>
                      <TableHead className="font-bold">Land Address</TableHead>
                      <TableHead className="font-bold">Seed Name</TableHead>
                      <TableHead className="font-bold">
                        Seed Quantity Ordered
                      </TableHead>
                      {user.category !== UserEnum.FARMER && (
                        <TableHead className="font-bold">
                          Seeds Available
                        </TableHead>
                      )}

                      <TableHead className="font-bold">
                        Seed Total Price
                      </TableHead>
                      <TableHead className="font-bold">
                        Fertilizer Name
                      </TableHead>
                      <TableHead className="font-bold">
                        Fertilizer Quantity Ordered
                      </TableHead>
                      {user.category !== UserEnum.FARMER && (
                        <TableHead className="font-bold">
                          Fertilizers Available
                        </TableHead>
                      )}

                      <TableHead className="font-bold">
                        Fertilizer Total Price
                      </TableHead>
                      <TableHead className="font-bold">Status</TableHead>
                      <TableHead className="font-bold">
                        Payment Status
                      </TableHead>
                      <TableHead
                        className="font-bold text-center"
                        colSpan={user.category === UserEnum.FARMER ? 1 : 2}
                      >
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders && orders.length > 0 ? (
                      orders.map((order: any, index: number) => (
                        <TableRow
                          key={index}
                          className="dark:hover:bg-slate-900"
                        >
                          <TableCell className="font-medium">
                            {index + 1}
                          </TableCell>
                          <TableCell className="font-medium">
                            {order.farmerID.name}
                          </TableCell>
                          <TableCell>{order.landID.landUPI}</TableCell>
                          <TableCell>{order.landID.landAddress}</TableCell>
                          <TableCell>{order.seedID.name}</TableCell>
                          <TableCell>{order.seedQuantityOrdered}Kg</TableCell>
                          {user.category !== UserEnum.FARMER && (
                            <TableCell>
                              {order.seedID.quantityAvailable}Kg
                              <Badge
                                variant="default"
                                className="bg-orange-400 hover:bg-orange-400 dark:bg-orange-400 dark:hover:bg-orange-400 text-white"
                              >
                                {order.seedID.quantityAvailable -
                                  order.seedQuantityOrdered}
                                Kg
                              </Badge>
                            </TableCell>
                          )}

                          <TableCell>{order.seedTotalPrice}Frw</TableCell>
                          <TableCell>{order.fertilizerID.name}</TableCell>
                          <TableCell>
                            {order.fertilizerQuantityOrdered}Kg
                          </TableCell>
                          {user.category !== UserEnum.FARMER && (
                            <TableCell>
                              {order.fertilizerID.quantityAvailable}Kg
                              <Badge
                                variant="default"
                                className="bg-orange-400 hover:bg-orange-400 dark:bg-orange-400 dark:hover:bg-orange-400 text-white"
                              >
                                {order.fertilizerID.quantityAvailable -
                                  order.fertilizerQuantityOrdered}
                                Kg
                              </Badge>
                            </TableCell>
                          )}

                          <TableCell>{order.fertilizerTotalPrice}Frw</TableCell>
                          <TableCell>
                            <Badge
                              variant="default"
                              className={`${
                                order.status === OrderStatus.APPROVED
                                  ? "bg-green-500 text-white font-bold dark:bg-green-500 dark:hover:bg-green-500 dark:text-white dark:font-bold"
                                  : order.status === OrderStatus.PENDING
                                  ? "bg-gray-300 hover:bg-gray-300 text-black dark:bg-gray-300 dark:hover:bg-gray-300 dark:text-blue font-bold"
                                  : "bg-red-500 dark:bg-red-500 dark:hover:bg-red-500 text-white dark:text-white font-bold"
                              }`}
                            >
                              {order.status.toUpperCase()}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="default"
                              className={`${
                                order.paymentStatus === PaymentStatus.PAID
                                  ? "bg-blue-500 hover:bg-blue-500 dark:bg-blue-500 dark:hover:bg-blue-500 text-white dark:text-white font-bold"
                                  : "bg-red-500 hover:bg-red-500 dark:bg-red-500 dark:hover:bg-red-500 text-white dark:text-white font-bold"
                              }`}
                            >
                              {order.paymentStatus.toUpperCase()}
                            </Badge>
                          </TableCell>
                          {user && user?.category === UserEnum.AGRO_STORE ? (
                            <>
                              <TableCell className="text-left">
                                <Button
                                  className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                                  disabled={
                                    order.status === OrderStatus.APPROVED
                                  }
                                  onClick={() => handleApprove(order._id)}
                                >
                                  {order.status === OrderStatus.APPROVED
                                    ? "Approved"
                                    : "Approve"}
                                </Button>
                              </TableCell>
                              <TableCell className="text-right">
                                <Button
                                  className="bg-red-600 hover:bg-red-700 text-white dark:bg-red-600 dark:hover:bg-red-700 dark:text-white"
                                  disabled={
                                    order.status === OrderStatus.REJECTED ||
                                    order.status === OrderStatus.APPROVED
                                  }
                                  onClick={() => handleReject(order._id)}
                                >
                                  {order.status === OrderStatus.REJECTED
                                    ? "Rejected"
                                    : "Reject"}
                                </Button>
                              </TableCell>
                            </>
                          ) : (
                            <TableCell className="text-right">
                              <Button
                                className="bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-600 dark:hover:bg-blue-700 dark:text-white"
                                disabled={true}
                              >
                                Edit
                              </Button>
                            </TableCell>
                          )}
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={4}>No Orders available.</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter>
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      href="#"
                      onClick={handlePreviousClick}
                    />
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
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ViewOrders;
