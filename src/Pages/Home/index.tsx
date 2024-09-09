import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Smartphone, DollarSign, BarChart } from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-[100dvh] flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl mx-auto shadow-none border-none">
        <CardHeader>
          <CardTitle className="text-4xl font-bold text-center">QR Code Generator</CardTitle>
          <CardDescription className="text-xl text-center mt-2">
            Create powerful QR codes for your business or personal use
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <p className="text-lg text-center mb-6">
            Generate QR codes quickly and easily with our feature-rich platform
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <FeatureCard
              icon={<DollarSign className="h-8 w-8 text-green-500" />}
              title="Budget-Friendly"
              description="Affordable plans for businesses of all sizes"
            />
            <FeatureCard
              icon={<Smartphone className="h-8 w-8 text-blue-500" />}
              title="Device Compatible"
              description="Works seamlessly across all devices and platforms"
            />
            <FeatureCard
              icon={<BarChart className="h-8 w-8 text-purple-500" />}
              title="High Scan Frequency"
              description="Optimized for frequent scans and high traffic"
            />
          </div>
          <Link to="/auth/login">
            <Button size="lg" className="text-lg px-8 py-6 relative">
              Create Your QR Code Now
              <span className='absolute -top-1 -right-1'>
                <span className="relative flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gray-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-gray-800"></span>
                </span>
              </span>
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center shadow-sm px-4 py-8 rounded-md transition-all duration-300 border border-gray-100/75 hover:shadow-md">
    {icon}
    <h3 className="text-xl font-semibold mt-2">{title}</h3>
    <p className="mt-1">{description}</p>
  </div>
);

export default HomePage;