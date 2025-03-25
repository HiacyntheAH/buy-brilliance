
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const Index = () => {
  const navigate = useNavigate();

  const goToDashboard = () => {
    navigate('/dashboard');
  };

  const goToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-gradient-to-b from-background to-secondary/20">
      <div className="max-w-3xl mx-auto px-4 py-16 text-center animate-fade-in">
        <div className="inline-block p-2 bg-primary/10 rounded-xl mb-4">
          <span className="text-primary font-medium text-sm">Hackathon Project</span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">
          Réinventez la Gestion des Achats en Entreprise
        </h1>
        
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Une plateforme moderne et intuitive pour optimiser le processus d'achat, 
          améliorer la visibilité et réduire les coûts opérationnels.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button 
            onClick={goToDashboard} 
            size="lg" 
            className="rounded-full px-8"
          >
            Découvrir le tableau de bord
          </Button>
          
          <Button 
            onClick={goToLogin} 
            size="lg" 
            variant="outline" 
            className="rounded-full px-8"
          >
            Se connecter
          </Button>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-0 right-0 text-center text-sm text-muted-foreground">
        Développé pour le Hackathon | 2023
      </div>
    </div>
  );
};

export default Index;
