
import React from 'react';
import { ShoppingCart, Percent } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';

const Promotions = () => {
  const navigate = useNavigate();
  
  const promotions = [
    {
      id: 1,
      name: "Château Margaux 2018",
      category: "Vins",
      originalPrice: 150,
      discountedPrice: 95,
      image: "/lovable-uploads/3112be4c-c1f6-41f4-8eea-ea9ebc741373.png",
      discount: 20,
      endDate: "2025-05-01",
      stock: 15
    },
    {
      id: 2,
      name: "Hennessy XO",
      category: "Liqueurs",
      originalPrice: 220,
      discountedPrice: 150,
      image: "/lovable-uploads/3112be4c-c1f6-41f4-8eea-ea9ebc741373.png",
      discount: 18,
      endDate: "2025-05-01",
      stock: 8
    },
    {
      id: 3,
      name: "Corona Extra Pack",
      category: "Bières",
      originalPrice: 45,
      discountedPrice: 35,
      image: "/lovable-uploads/3112be4c-c1f6-41f4-8eea-ea9ebc741373.png",
      discount: 22,
      endDate: "2025-05-15",
      stock: 25
    },
    {
      id: 4,
      name: "Chocolats Assortis",
      category: "Sucreries",
      originalPrice: 40,
      discountedPrice: 30,
      image: "/lovable-uploads/3112be4c-c1f6-41f4-8eea-ea9ebc741373.png",
      discount: 25,
      endDate: "2025-04-30",
      stock: 10
    }
  ];

  const calculateDaysLeft = (endDate: string) => {
    const end = new Date(endDate);
    const today = new Date();
    const diffTime = end.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const handleProductClick = (productId: number) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-orange-600 to-red-500 rounded-xl p-8 mb-8 text-white">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold mb-4">Promotions Spéciales</h1>
            <p className="text-lg opacity-90 mb-6">
              Découvrez nos offres exclusives sur une sélection de produits premium.
              Ne manquez pas ces opportunités limitées dans le temps !
            </p>
            <div className="inline-flex items-center bg-white text-orange-600 px-6 py-3 rounded-lg font-semibold">
              <Percent className="mr-2 h-5 w-5" />
              Économisez jusqu'à 25%
            </div>
          </div>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {promotions.map((promo) => (
            <div 
              key={promo.id} 
              className="bg-white rounded-xl shadow-sm overflow-hidden group cursor-pointer"
              onClick={() => handleProductClick(promo.id)}
            >
              <div className="relative h-48">
                <img
                  src={promo.image}
                  alt={promo.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute top-2 right-2 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                  -{promo.discount}%
                </div>
              </div>
              <div className="p-4">
                <div className="text-sm text-gray-500 mb-1">{promo.category}</div>
                <h3 className="font-semibold text-gray-800 mb-2">{promo.name}</h3>
                <div className="mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-orange-600">
                      {promo.discountedPrice} €
                    </span>
                    <span className="text-gray-500 line-through">
                      {promo.originalPrice} €
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-gray-600">
                    <span className="font-medium text-orange-600">
                      {calculateDaysLeft(promo.endDate)}
                    </span> jours restants
                  </div>
                  <div className="text-sm text-gray-600">
                    Stock: {promo.stock} unités
                  </div>
                </div>
                <Button 
                  className="w-full bg-orange-600 hover:bg-orange-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleProductClick(promo.id);
                  }}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Voir le produit
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Promotions;
