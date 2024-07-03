
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { appName } from "@/constants";
import toast, { Toaster } from "react-hot-toast";
import { auth } from "@/helpers/auth";
import Cookies from "js-cookie";

const SignInPage = () => {
  const router = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Function to handle login button click
  async function onLoginClick() {
    try {
      if (email.length > 0 && password.length > 0) {
        toast.loading("Loading...");

        const response = await auth("/api/method/pharm_ehr_tenant.api.login", {
          usr: email,
          pwd: password,
        });

        if (response!.data.message.success_key == 1) {
          const csrfToken = response!.data.message.csrf_token;
          Cookies.set("X-Frappe-CSRF-Token", csrfToken, { expires: 30 });

          const authToken = `token ${response!.data.message.api_key}:${
            response!.data.message.api_secret
          }`;
          Cookies.set("Authorization", authToken, { expires: 30 });
          Cookies.set("full_name", response!.data.full_name, { expires: 30 });
          Cookies.set("email", response!.data.message.email, { expires: 30 });
          router("/patients");
          toast.dismiss();
        } else {
          toast.dismiss();
          toast("Enter valid credentials");
        }
      } else {
        toast.dismiss();
        toast("Enter credentials");
      }
    } catch (error: any) {
    }
  }

  // Handle input changes
  const handleInputChange = (e: any) => {
    const { id, value } = e.target;
    if (id === "email") {
      setEmail(value);
    } else if (id === "password") {
      setPassword(value);
    }
  };

  return (
    <div className="h-screen flex">
      <div className="w-1/2 bg-[#306BD1] p-20">
        <h3 className="text-white text-5xl">Login To</h3>
        <h2 className="mt-8 text-white text-7xl">{appName}</h2>
      </div>

      <div className="w-1/2 bg-[#D9D9D9] flex items-center justify-center">
        <div className="w-1/2">
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="jane@example.com"
              onChange={handleInputChange}
              onKeyDown={(e:any)=>{
                if(e.keyCode===13){
                  onLoginClick()
                }
              }}  
            />
          </div>

          <div className="mt-5 grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Password</Label>
            <Input
              type="password"
              id="password"
              placeholder="****"
              onChange={handleInputChange}
              onKeyDown={(e:any)=>{
                if(e.keyCode===13){
                  onLoginClick()
                }
              }}
            />
          </div>

          <Button className="mt-5 bg-[#306BD1] text-2xl" onClick={onLoginClick}>
            Login
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
