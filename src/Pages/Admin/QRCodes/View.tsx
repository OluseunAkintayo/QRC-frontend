import { useParams } from 'react-router-dom';
import Header from '../Header';

const ViewQRCode = () => {
  const params = useParams();
  console.log({ params });
  return (
    <>
      <Header />
      <div>ViewQRCode</div>
    </>
  )
}

export default ViewQRCode;