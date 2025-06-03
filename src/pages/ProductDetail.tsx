import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Minus, Plus, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { toast } from "@/components/ui/use-toast";
import { getProductById, formatPrice } from '@/lib/products';

const ProductDetail: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useShoppingCart();
  const [product, setProduct] = useState(productId ? getProductById(productId) : null);

  const handleQuantityChange = (amount: number) => {
    if (!product) return;
    
    setQuantity(prev => {
      const newQuantity = prev + amount;
      return newQuantity > 0 && newQuantity <= product.stock ? newQuantity : prev;
    });
  };

  const handleAddToCart = () => {
    if (!product) return;

    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0]
    });
    
    toast({
      title: "Produit ajouté",
      description: `${product.name} a été ajouté au panier`,
    });
  };

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Produit non trouvé</h2>
          <p className="mb-6">Le produit que vous recherchez n'existe pas.</p>
          <Button onClick={() => navigate('/catalog')}>
            Retour au catalogue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      {/* Back Button */}
      <Button
        variant="ghost"
        className="mb-6 text-gray-600 hover:text-gray-800"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Image du produit */}
        <div className="rounded-xl overflow-hidden shadow-md">
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover"
          />
        </div>

        {/* Informations du produit */}
        <div>
          <div className="mb-2 text-sm text-orange-600 font-medium">{product.category}</div>
          <h1 className="text-3xl font-bold mb-4 text-gray-800">{product.name}</h1>
          
          {/* Badges */}
          <div className="flex space-x-2 mb-6">
            {product.is_new && (
              <span className="bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                NOUVEAU
              </span>
            )}
            {product.is_promo && (
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                -{product.discount_percentage}%
              </span>
            )}
            {product.is_limited && (
              <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                Stock limité: {product.stock}
              </span>
            )}
          </div>

          {/* Prix */}
          <div className="text-2xl font-bold text-orange-600 mb-4">
            {product.is_promo && product.original_price && (
              <span className="line-through text-gray-400 mr-2 text-lg">
                {formatPrice(product.original_price)}
              </span>
            )}
            {formatPrice(product.price)}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-8">
            {product.description || "Aucune description disponible pour ce produit."}
          </p>

          {/* Quantité et ajout au panier */}
          <div className="mb-8">
            <label className="block text-gray-700 font-medium mb-2">Quantité</label>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => handleQuantityChange(-1)}
                className="p-2 border border-gray-300 rounded"
                disabled={quantity <= 1}
              >
                <Minus size={16} />
              </button>
              
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              
              <button 
                onClick={() => handleQuantityChange(1)}
                className="p-2 border border-gray-300 rounded"
                disabled={quantity >= product.stock}
              >
                <Plus size={16} />
              </button>
            </div>
          </div>

          {/* Bouton d'ajout au panier */}
          <Button 
            onClick={handleAddToCart}
            className="w-full py-3 bg-orange-600 hover:bg-orange-700"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-5 w-5" />
            {product.stock > 0 ? 'Ajouter au panier' : 'Produit en rupture de stock'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;