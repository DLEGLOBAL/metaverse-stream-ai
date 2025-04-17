
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Loader2 } from 'lucide-react';

const Checkout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const plan = searchParams.get('plan');
  const cycle = searchParams.get('cycle');

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
                      {plan === 'Starter' && cycle === 'monthly' && '$9.99'}
                      {plan === 'Starter' && cycle === 'yearly' && '$99.99'}
                      {plan === 'Professional' && cycle === 'monthly' && '$19.99'}
                      {plan === 'Professional' && cycle === 'yearly' && '$199.99'}
                      {plan === 'Enterprise' && cycle === 'monthly' && '$29.99'}
                      {plan === 'Enterprise' && cycle === 'yearly' && '$299.99'}
                    </p>
                    {cycle === 'yearly' && (
                      <span className="text-sm text-meta-teal">Save 16%</span>
                    )}
                  </div>
                </div>
              </div>

              <Button 
                className="w-full bg-meta-teal hover:bg-meta-teal/90 text-meta-dark-blue"
                disabled={true}
              >
                Complete Purchase
                <small className="ml-2 text-meta-dark-blue/70">(Square integration coming soon)</small>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Checkout;
