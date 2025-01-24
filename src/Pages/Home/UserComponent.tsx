import { Button } from '@/components/ui/button'
import { TableCell, TableRow } from '@/components/ui/table'
import { Loader } from 'lucide-react'
import React from 'react';
import { IUpdateResponse, IUser } from './IUser';
import axios, { AxiosRequestConfig } from 'axios';
import { useToast } from '@/hooks/use-toast';

const nexus = sessionStorage.getItem("nexus") as string;

interface IUserComponent {
  item: IUser;
  sn: number;
  getUsers: () => void;
}

const UserComponent = ({ item, getUsers, sn }: IUserComponent) => {
  const { toast } = useToast();

  const [pending, setPending] = React.useState<boolean>(false);

  const checkInUser = async () => {
    setPending(true);
    const config: AxiosRequestConfig = {
      url: "user/checkin?Id=" + item.id.toString(),
      method: "POST",
      headers: {
        "Authorization": `Bearer ${nexus}`
      }
    }
    try {
      const res = await axios.request(config);
      const response: IUpdateResponse = res.data;
      if (response.success) {
        setPending(false);
        getUsers();
        toast({
          className: 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
          title: "Success!",
          description: response.message
        });
        return;
      }
      setPending(false);
    } catch (err) {
      console.log(err);
      setPending(false);
      toast({
        className: 'top-0 right-0 flex fixed md:max-w-[420px] md:top-4 md:right-4',
        title: "Error!",
        description: "Unable to perform actionat this time"
      });
    }
  }

  return (
    <TableRow>
      <TableCell className="text-xs py-0">{sn}</TableCell>
      <TableCell className="text-xs py-0">{item.fullName}</TableCell>
      <TableCell className="text-xs py-0">{item.position}</TableCell>
      <TableCell className="text-xs py-0">{item.company}</TableCell>
      <TableCell className="text-xs py-2">
        {
          item.checkedIn ?
            <Button disabled={item.checkedIn} className="w-24 text-xs uppercase">CHecked In</Button> :
            <Button className="w-24 text-xs uppercase" onClick={checkInUser}>{pending ? <Loader /> : "Check in"}</Button>
        }
      </TableCell>
    </TableRow>
  )
}

export default UserComponent