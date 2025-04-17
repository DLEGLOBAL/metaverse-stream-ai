
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { initiateCheckout } from '@/services/paymentService';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan');
  const cycle = searchParams.get('cycle');
  const [isProcessing, setIsProcessing] = useState(false);
  
  // Get price based on plan and cycle
  const getPrice = () => {
    if (!plan || !cycle) return 0;
    
    if (plan === 'Starter') {
      return cycle === 'monthly' ? 9.99 : 99.99;
    } else if (plan === 'Professional') {
      return cycle === 'monthly' ? 19.99 : 199.99;
    } else if (plan === 'Enterprise') {
      return cycle === 'monthly' ? 29.99 : 299.99;
    } else if (plan === 'MetaStars Annual') {
      return 1500;
    } else if (plan === 'MetaStars Bi-Annual') {
      return 750;
    } else if (plan === 'MetaStars Monthly') {
      return 125;
    }
    return 0;
  };
  
  const price = getPrice();
  
  const handleCompletePurchase = async () => {
    if (!plan || !cycle) {
      toast({
        title: "Error",
        description: "Invalid plan or billing cycle",
        variant: "destructive"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const success = await initiateCheckout(plan, cycle, price);
      
      if (success) {
        // In a real implementation, this would redirect to Square
        // For now, we'll simulate a successful payment
        setTimeout(() => {
          toast({
            title: "Payment Successful",
            description: `Thank you for subscribing to the ${plan} plan!`,
          });
          navigate('/dashboard');
        }, 2000);
      }
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Payment Failed",
        description: "An error occurred during checkout. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto py-8">
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard/pricing')}
          className="mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Plans
        </Button>

        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle>Checkout</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="p-4 bg-meta-dark-blue/50 rounded-lg">
                <h3 className="text-lg font-semibold mb-2">Order Summary</h3>
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-meta-teal">{plan} Plan</p>
                    <p className="text-sm text-gray-400">Billing {cycle}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-semibold">
                      ${price.toFixed(2)}
                    </p>
                    {cycle === 'yearly' && (
                      <span className="text-sm text-meta-teal">Save 16%</span>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-meta-teal hover:bg-meta-teal/90 text-meta-dark-blue"
                disabled={isProcessing}
                onClick={handleCompletePurchase}
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>
                    Complete Purchase
                    {!process.env.SQUARE_ACCESS_TOKEN && (
                      <small className="ml-2 text-meta-dark-blue/70">(Demo Mode)</small>
                    )}
                  </>
                )}
              </Button>
              
              {!process.env.SQUARE_ACCESS_TOKEN && (
                <p className="text-sm text-center text-gray-400 mt-2">
                  Note: This is a demo checkout. Add your Square API key for full functionality.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Checkout;
