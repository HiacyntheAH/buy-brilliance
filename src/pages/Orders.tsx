
import React from 'react';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardOrders from '@/components/dashboard/DashboardOrders';

const Orders: React.FC = () => {
  return (
    <div className="min-h-screen bg-muted/30">
      <Navbar />
      <div className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <DashboardHeader />
        <div className="mt-6">
          <DashboardOrders />
        </div>
      </div>
    </div>
  );
};

export default Orders;
