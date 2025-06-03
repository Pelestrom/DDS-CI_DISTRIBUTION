import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, Truck, Plus, Minus, ArrowLeft } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { toast } from "@/components/ui/use-toast";
import { formatPrice } from '@/lib/supabase';

const Cart: React.FC = () => {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useShoppingCart();
  const navigate = useNavigate();
  const [deliveryOption, setDeliveryOption] = useState<'pickup' | 'delivery'>('pickup');
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    phone: '',
    address: '',
    note: ''
  });

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCustomerInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckout = () => {
    if (!customerInfo.name || !customerInfo.phone) {
      toast({
        title: "Information requise",
        description: "Veuillez fournir votre nom et numéro de téléphone.",
        variant: "destructive"
      });
      return;
    }

    if (deliveryOption === 'delivery' && !customerInfo.address) {
      toast({
        title: "Adresse requise",
        description: "Veuillez fournir votre adresse de livraison.",
        variant: "destructive"
      });
      return;
    }

    // Préparer le message WhatsApp
    let message = `Nouvelle commande de: ${customerInfo.name}\n`;
    message += `Téléphone: ${customerInfo.phone}\n`;
    message += `Mode de récupération: ${deliveryOption === 'pickup' ? 'Retrait en magasin' : 'Livraison'}\n`;
    
    if (deliveryOption === 'delivery') {
      message += `Adresse: ${customerInfo.address}\n`;
    }
    
    message += `\n*Produits commandés:*\n`;
    cartItems.forEach(item => {
      message += `- ${item.name} x${item.quantity} (${formatPrice(item.price)})\n`;
    });
    
    message += `\nTotal: ${formatPrice(totalPrice)} pour ${totalItems} article(s)\n`;
    
    if (customerInfo.note) {
      message += `\nNote: ${customerInfo.note}`;
    }
    
    // Encoder le message pour URL WhatsApp
    const encodedMessage = encodeURIComponent(message);
    
    // Numéro WhatsApp avec l'indicatif de la Côte d'Ivoire
    const phoneNumber = "2250501025232";
    
    // Créer le lien WhatsApp et l'ouvrir dans un nouvel onglet
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.location.href = whatsappUrl;
    
    // Vider le panier après la commande
    clearCart();
    
    toast({
      title: "Commande envoyée",
      description: "Votre commande a été transmise via WhatsApp. Le gérant vous contactera prochainement."
    });
    
    // Rediriger vers l'accueil
    navigate('/');
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-6 text-gray-800">Votre panier est vide</h1>
          <p className="text-gray-600 mb-8">Vous n'avez pas encore ajouté de produits à votre panier.</p>
          <Button onClick={() => navigate('/catalog')} className="bg-orange-600 hover:bg-orange-700">
            Découvrir nos produits
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

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Votre panier</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Liste des produits */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4">Articles ({totalItems})</h2>
            
            <div className="divide-y divide-gray-200">
              {cartItems.map(item => (
                <div key={item.id} className="py-4 flex items-center">
                  <div className="w-24 h-24 rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="ml-4 flex-1">
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-orange-600 font-bold mt-1">{formatPrice(item.price)}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1 border border-gray-300 rounded"
                      disabled={item.quantity <= 1}
                    >
                      <Minus size={14} />
                    </button>
                    
                    <span className="w-8 text-center">{item.quantity}</span>
                    
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1 border border-gray-300 rounded"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  
                  <div className="ml-4 text-right">
                    <p className="font-bold text-gray-800">{formatPrice(item.price * item.quantity)}</p>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-red-500 mt-1 flex items-center text-sm"
                    >
                      <Trash2 size={14} className="mr-1" /> Supprimer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Informations client */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Vos informations</h2>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nom et prénom *</Label>
                  <Input
                    id="name"
                    name="name"
                    value={customerInfo.name}
                    onChange={handleInputChange}
                    placeholder="Votre nom complet"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Téléphone *</Label>
                  <Input
                    id="phone"
                    name="phone"
                    value={customerInfo.phone}
                    onChange={handleInputChange}
                    placeholder="Votre numéro de téléphone"
                    required
                  />
                </div>
              </div>
              
              {/* Options de livraison */}
              <div>
                <Label className="mb-2 block">Mode de récupération *</Label>
                <RadioGroup 
                  value={deliveryOption} 
                  onValueChange={(value) => setDeliveryOption(value as 'pickup' | 'delivery')}
                  className="flex flex-col space-y-2"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex items-center cursor-pointer">
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Retrait en magasin
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex items-center cursor-pointer">
                      <Truck className="mr-2 h-4 w-4" />
                      Livraison à domicile
                    </Label>
                  </div>
                </RadioGroup>
              </div>
              
              {/* Adresse si livraison */}
              {deliveryOption === 'delivery' && (
                <div>
                  <Label htmlFor="address">Adresse de livraison *</Label>
                  <Input
                    id="address"
                    name="address"
                    value={customerInfo.address}
                    onChange={handleInputChange}
                    placeholder="Votre adresse complète"
                    required
                  />
                </div>
              )}
              
              <div>
                <Label htmlFor="note">Note (facultatif)</Label>
                <Input
                  id="note"
                  name="note"
                  value={customerInfo.note}
                  onChange={handleInputChange}
                  placeholder="Instructions spéciales pour votre commande"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Résumé */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-28">
            <h2 className="text-xl font-semibold mb-4">Résumé de la commande</h2>
            
            <div className="space-y-2 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Sous-total ({totalItems} articles)</span>
                <span className="font-medium">{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Frais de livraison</span>
                <span className="font-medium">
                  {deliveryOption === 'delivery' ? 'À déterminer' : 'Gratuit'}
                </span>
              </div>
              <div className="border-t border-gray-200 pt-2 mt-2">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-orange-600">{formatPrice(totalPrice)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {deliveryOption === 'delivery' 
                    ? 'Hors frais de livraison. Le gérant vous contactera pour confirmer le montant final.' 
                    : 'À régler lors du retrait en magasin.'}
                </p>
              </div>
            </div>
            
            <Button 
              onClick={handleCheckout}
              className="w-full py-6 bg-[#25D366] hover:bg-[#128C7E] text-lg font-medium flex items-center justify-center"
            >
              <svg viewBox="0 0 24 24" className="mr-2 h-5 w-5" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Commander via WhatsApp
            </Button>
            
            <p className="text-xs text-gray-500 mt-4 text-center">
              En cliquant sur "Commander via WhatsApp", vous serez redirigé vers WhatsApp pour finaliser votre commande directement avec le gérant.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;