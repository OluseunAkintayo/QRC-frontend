import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ILoginResponse } from '@/lib/types';
import axios, { AxiosRequestConfig } from 'axios';
import { Loader } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = React.useState<{ username: string; password: string; }>({ username: "", password: "" });
  const [loading, setLoading] = React.useState<boolean>(false);
  const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    const name = evt.target.name;
    const value = evt.target.value;
    setLogin({ ...login, [name]: value });
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const config: AxiosRequestConfig = {
      method: "POST",
      url: "http://localhost:5237/auth/user/login",
      data: {
        email: login.username,
        password: login.password
      }
    }
    try {
      const res = await axios.request(config);
      if(res.status !== 200) {
        console.log("response not 200");
        return;
      }
      const data: ILoginResponse = res.data;
      if(!data.success) {
        return;
      }
      sessionStorage.setItem("user", data.data.email);
      sessionStorage.setItem("token", data.data.token);
      sessionStorage.setItem("exp", data.data.exp);
      sessionStorage.setItem("role", data.data.role.toString());
      setLoading(false);
      navigate("/admin");
    } catch (error) {
      console.log({ error });
      setLoading(false);
    }
  }
  return (
    <div className='h-[100dvh] grid place-items-center'>
      <Card className='w-full max-w-[400px] shadow-lg'>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter username and password to continue</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className='grid gap-4'>
            <div className='grid gap-2'>
              <Label htmlFor="email">Username</Label>
              <Input placeholder='Enter username' name="username" value={login.username} onChange={handleChange} />
            </div>
            <div className='grid gap-2'>
              <Label htmlFor="email">Password</Label>
              <Input placeholder='Enter password' type="password" name="password" value={login.password} onChange={handleChange} />
            </div>
            <div>
              <Button className='w-full' disabled={loading}>
                {loading ? <Loader className='animate-spin w-4 h-4' /> : "Login"}
              </Button>
            </div>
          </form>
        </CardContent>
        <CardFooter></CardFooter>
      </Card>

    </div>
  )
}

export default Login;