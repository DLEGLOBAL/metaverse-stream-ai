
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, useLocation } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { initiateCheckout, validatePayment } from '@/services/paymentService';
import { toast } from '@/hooks/use-toast';

const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan');
  const cycle = searchParams.get('cycle');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  
  // Check if returning from payment
  useEffect(() => {
    const paymentId = searchParams.get('payment_id');
    if (paymentId) {
      // Validate the payment if returning from Square
      handlePaymentValidation(paymentId);
    }
  }, [location]);
  
  // Validate payment after returning from Square checkout
  const handlePaymentValidation = async (paymentId: string) => {
    setIsProcessing(true);
    try {
      const result = await validatePayment(paymentId);
      if (result.success) {
        setIsComplete(true);
        toast({
          title: "Payment Successful",
          description: `Thank you for subscribing to the ${plan} plan!`,
        });
        
        // Redirect to dashboard after short delay
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      } else {
        toast({
          title: "Payment Verification Failed",
          description: result.message || "Unable to verify your payment. Please contact support.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error("Payment validation error:", error);
      toast({
        title: "System Error",
        description: "An unexpected error occurred. Please try again or contact support.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
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
      
      if (!success) {
        setIsProcessing(false);
      }
      // If success is true, the user will be redirected to Square or 
      // a success message will be shown in demo mode
    } catch (error) {
      console.error("Checkout error:", error);
      toast({
        title: "Payment Failed",
        description: "An error occurred during checkout. Please try again.",
        variant: "destructive"
      });
      setIsProcessing(false);
    }
  };

  if (isComplete) {
    return (
      <DashboardLayout>
        <div className="container mx-auto py-8">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center">
              <CheckCircle className="w-16 h-16 text-meta-teal mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-4">Payment Complete!</h2>
              <p className="mb-6">
                Thank you for subscribing to the {plan} plan. Your account has been updated.
              </p>
              <Button 
                onClick={() => navigate('/dashboard')}
                className="bg-meta-teal hover:bg-meta-teal/90 text-meta-dark-blue"
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </DashboardLayout>
    );
  }

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
                    {!import.meta.env.VITE_SQUARE_ACCESS_TOKEN && (
                      <small className="ml-2 text-meta-dark-blue/70">(Demo Mode)</small>
                    )}
                  </>
                )}
              </Button>
              
              {!import.meta.env.VITE_SQUARE_ACCESS_TOKEN && (
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
