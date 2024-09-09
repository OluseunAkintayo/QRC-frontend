import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { ILoginResponse } from '@/lib/types';
import axios, { AxiosRequestConfig } from 'axios';
import { Loader } from 'lucide-react';
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = React.useState<{ username: string; password: string; }>({ username: "", password: "" });
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setLogin({ ...login, [name]: value });
  }

  const { toast } = useToast();
  const showMessage = () => {
    toast({
      className: 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
      title: "Coming soon!",
      description: "This feature will be available soon 😊",
    });
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "auth/user/login",
      data: {
        email: login.username,
        password: login.password
      }
    }
    try {
      const res = await axios.request(config);
      if (res.status !== 200) {
        console.log("response not 200");
        console.log(res);
        return;
      }
      const data: ILoginResponse = res.data;
      if (!data.success) {
        return;
      }
      sessionStorage.setItem("user", data.data.email);
      sessionStorage.setItem("token", data.data.token);
      sessionStorage.setItem("exp", data.data.exp);
      sessionStorage.setItem("role", data.data.role.toString());
      setLoading(false);
      navigate("/dashboard");
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  }

  return (
    <div className='h-[100dvh] grid place-items-center'>
      <Card className='w-full min-w-[400px] max-w-[400px] shadow-lg'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Please enter username and password to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor="email">Username</Label>
              <Input placeholder='Enter username' name="username" required value={login.username} onChange={handleChange} />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor="email">Password</Label>
              <Input placeholder='Enter password' type="password" name="password" required value={login.password} onChange={handleChange} />
            </div>
            <div>
              <Button className='w-full' disabled={loading}>
                {loading ? <Loader className='animate-spin w-4 h-4' /> : "Login"}
              </Button>
            </div>
          </form>
          <div className="relative mt-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>
          <div className="mt-6">
            <Button
              variant="outline"
              className="w-full"
              onClick={showMessage}
            >
              <img src="/public/google.svg" className='w-5 mr-1' />
              Sign in with Google
            </Button>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/auth/signup" className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
              Sign up
            </Link>
          </p>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </div>
  )
}

export default Login;