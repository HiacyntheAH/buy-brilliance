
import React, { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';
import DashboardTabs from '@/components/dashboard/DashboardTabs';

const Dashboard: React.FC = () => {
  useEffect(() => {
    document.title = "Tableau de bord - EnterpriseFlow";
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-20 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6">
        <DashboardHeader />
        <DashboardTabs />
      </main>
    </div>
  );
};

export default Dashboard;
