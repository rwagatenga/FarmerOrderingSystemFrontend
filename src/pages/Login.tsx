import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import BackroundImage from "../assets/images/farm_bg.jpeg";
import { useLogin, useSignup } from "@/api/authApi";
import { toast } from "react-toastify";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { useEffect, useState } from "react";
import { Select } from "@radix-ui/react-select";
import { SelectOptions } from "@/components/SelectOptions";
import { UserEnum } from "@/interfaces/User";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [state, setState] = useState({
    email: "",
    password: "",
  });
  const [signup, setSignup] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    category: "" as UserEnum,
    password: "",
  });
  const [selectedCategory, setSelectedCategory] = useState<any[]>([]);

  const categories = [
    {
      name: "Farmer",
      _id: UserEnum.FARMER,
    },
    {
      name: "Agro Store",
      _id: UserEnum.AGRO_STORE,
    },
  ];

  const handleCategoryChange = (category: any) => {
    setSelectedCategory(category);
    setSignup({ ...signup, category: category.value });
  };
  const { mutate: loginMutation } = useLogin();
  const {
    mutate: signupMutation,
    isSuccess: signupSuccess,
    error: signupError,
  } = useSignup();

  useEffect(() => {
    if (signupSuccess) {
      setSignup({
        ...signup,
        name: "",
        phone: "",
        email: "",
        address: "",
        category: "" as UserEnum,
        password: "",
      });

      navigate("/login");
    }
    if (signupError) {
      setError(signupError.message);
    }
  }, [signupSuccess, navigate, signupError]);

  const handleLogin = async (
    e: any,
    data: { email: string; password: string },
  ) => {
    e.preventDefault();
    loginMutation(data, {
      onSuccess({ passwordExpiryMessage }) {
        passwordExpiryMessage &&
          setTimeout(
            () => toast.warn(passwordExpiryMessage, { autoClose: 60000 }),
            3000,
          );
      },
      onError(error: any) {
        toast.error(error.message);
      },
    });
  };

  const handleSignup = (e: any) => {
    e.preventDefault();
    if (
      !signup.name ||
      !signup.phone ||
      !signup.address ||
      !signup.email ||
      !signup.password ||
      signup.category
    ) {
      toast.error("Some Field are empty");
    }
    signupMutation(signup, {
      onError(error: any) {
        setError(error.message);
      },
    });
  };

  return (
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${BackroundImage})` }}
    >
      <div className="bg-black/70 min-h-screen pt-24">
        <div className="container">
          <div className="flex flex-wrap justify-between">
            <div className="flex-1 pt-48">
              <p className="relative w-2/3 text-transparent bg-gradient-to-b from-[#0FF542] to-[#00D1FF] bg-clip-text font-semibold text-[47px] leading-[53px] font-inter">
                Farmers Ordering System
              </p>
              <p className="relative w-2/3 pt-10 text-white font-normal text-[20px] leading-[24px] font-inter">
                Effortlessly manage resources and purchases. Optimize fertilizer
                and seed usage based on land size. Simplify order processing for
                seamless transactions. Experience clarity and organization with
                intuitive features.
              </p>
            </div>
            <div className="max-w-[450px] w-full pt-28">
              <Tabs defaultValue="signin" className="w-[400px]">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">SignIn</TabsTrigger>
                  <TabsTrigger value="signup">SignUp</TabsTrigger>
                </TabsList>
                <TabsContent value="signin">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-center">SignIn</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">E-Mail</Label>
                            <Input
                              id="name"
                              placeholder="E-Mail"
                              onChange={(e) =>
                                setState({ ...state, email: e.target.value })
                              }
                              value={state.email}
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="name"
                              placeholder="Password"
                              type="password"
                              onChange={(e) =>
                                setState({ ...state, password: e.target.value })
                              }
                              value={state.password}
                            />
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button
                        variant="primary"
                        className="text-end"
                        onClick={(e) => handleLogin(e, state)}
                      >
                        SignIn
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="signup">
                  <Card className="rounded-b-lg">
                    <CardHeader>
                      <CardTitle className="text-center">SignUp</CardTitle>
                      {error ?? <CardDescription>{error}</CardDescription>}
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="name">Full Names</Label>
                            <Input
                              id="name"
                              placeholder="John Doe"
                              onChange={(e) =>
                                setSignup({ ...signup, name: e.target.value })
                              }
                              value={signup.name}
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              placeholder="07XX-XXX-XXX"
                              onChange={(e) =>
                                setSignup({ ...signup, phone: e.target.value })
                              }
                              value={signup.phone}
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="email">E-mail</Label>
                            <Input
                              id="email"
                              placeholder="johndoe@domain"
                              onChange={(e) =>
                                setSignup({ ...signup, email: e.target.value })
                              }
                              value={signup.email}
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="address">Address</Label>
                            <Input
                              id="address"
                              placeholder="District, Sector"
                              onChange={(e) =>
                                setSignup({
                                  ...signup,
                                  address: e.target.value,
                                })
                              }
                              value={signup.address}
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="category">Category</Label>
                            <SelectOptions
                              options={categories}
                              onChange={handleCategoryChange}
                              value={selectedCategory}
                              name="category"
                            />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input
                              id="password"
                              placeholder="Password"
                              type="password"
                              onChange={(e) =>
                                setSignup({
                                  ...signup,
                                  password: e.target.value,
                                })
                              }
                              value={signup.password}
                            />
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button
                        variant="primary"
                        className="text-end"
                        onClick={handleSignup}
                      >
                        SignUp
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
