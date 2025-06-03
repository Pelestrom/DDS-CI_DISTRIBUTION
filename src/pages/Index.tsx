import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useShoppingCart } from '../contexts/ShoppingCartContext';
import { Search } from 'lucide-react';
import { products, categories, formatPrice } from '@/lib/products';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showNewsletterSuccess, setShowNewsletterSuccess] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [featuredProducts, setFeaturedProducts] = useState(products.filter(p => p.is_new).slice(0, 4));
  const navigate = useNavigate();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setShowNewsletterSuccess(true);
      setNewsletterEmail('');
      setTimeout(() => setShowNewsletterSuccess(false), 3000);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/catalog?search=${searchQuery}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-cover bg-center h-[500px]" style={{ backgroundImage: `url('https://readdy.ai/api/search-image?query=Elegant%20wine%20cellar%20with%20wooden%20barrels%20and%20bottles%20of%20premium%20wines%20and%20spirits%20with%20warm%20ambient%20lighting%20creating%20luxurious%20atmosphere%20professional%20photography%20with%20space%20for%20text%20on%20left%20side&width=1440&height=500&seq=9&orientation=landscape')` }}>
        <div className="absolute inset-0 bg-gradient-to-r from-orange-800/90 to-transparent">
          <div className="container mx-auto px-4 h-full flex items-center">
            <div className="max-w-lg text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Découvrez Notre Collection Exclusive</h1>
              <p className="text-lg mb-6">Vins de prestige, liqueurs raffinées, boissons sélectionnées, bières premium et sucreries délicates pour vos moments spéciaux.</p>
              <Link to="/catalog">
                <button className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg font-semibold transition !rounded-button whitespace-nowrap cursor-pointer">
                  Explorer le Catalogue
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="container mx-auto px-4 -mt-7 relative z-10">
        <div className="bg-white rounded-xl shadow-lg p-4 flex items-center">
          <form onSubmit={handleSearch} className="flex-1 flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <input
              type="text"
              placeholder="Rechercher des produits..."
              className="w-full px-4 py-3 text-gray-700 focus:outline-none border-none text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button type="submit" className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 transition !rounded-button whitespace-nowrap cursor-pointer">
              <Search className="h-5 w-5 mr-2 inline" />
              Rechercher
            </button>
          </form>
        </div>
      </div>
      
      {/* Categories */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Catégories Populaires</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map(category => (
            <Link key={category.id} to={`/catalog?category=${category.name}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden group hover:shadow-lg transition cursor-pointer">
                <div className="h-48 overflow-hidden">
                  <img
                    src={category.image_url}
                    alt={category.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{category.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Featured Products */}
      <section className="container mx-auto px-4 py-12 bg-gray-50">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">Produits en Vedette</h2>
          <Link to="/catalog" className="text-orange-600 hover:text-orange-700 font-medium flex items-center cursor-pointer">
            Voir tout 
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map(product => (
            <Link key={product.id} to={`/product/${product.id}`}>
              <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition cursor-pointer">
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover object-top"
                  />
                  {product.is_new && (
                    <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
                      NOUVEAU
                    </div>
                  )}
                  {product.is_promo && (
                    <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      PROMO
                    </div>
                  )}
                  {product.is_limited && (
                    <div className="absolute bottom-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      Stock limité: {product.stock}
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <div className="text-xs text-gray-500 mb-1">{product.category}</div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{product.name}</h3>
                  <div className="flex justify-between items-end">
                    <div>
                      {product.is_promo && product.original_price && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(product.original_price)}
                        </div>
                      )}
                      <div className="text-orange-600 font-bold">
                        {formatPrice(product.price)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* Delivery Options */}
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Nos Options de Livraison</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="1" y="3" width="15" height="13"></rect>
                <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                <circle cx="5.5" cy="18.5" r="2.5"></circle>
                <circle cx="18.5" cy="18.5" r="2.5"></circle>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Livraison à Domicile</h3>
            <p className="text-gray-600">Faites-vous livrer directement chez vous. Partagez simplement votre adresse et coordonnées GPS.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Retrait en Magasin</h3>
            <p className="text-gray-600">Commandez en ligne et récupérez vos produits directement dans notre boutique.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-md text-center">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-orange-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Livraison Express</h3>
            <p className="text-gray-600">Besoin urgent? Optez pour notre service de livraison express en moins de 2 heures.</p>
          </div>
        </div>
      </section>
      
      {/* Payment Methods */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold mb-8 text-center text-gray-800">Méthodes de Paiement Acceptées</h2>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="5" width="20" height="14" rx="2"></rect>
                <line x1="2" y1="10" x2="22" y2="10"></line>
              </svg>
              <span className="mt-2 text-gray-700">Cash</span>
            </div>
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-orange-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2"></rect>
                <line x1="12" y1="18" x2="12.01" y2="18"></line>
              </svg>
              <span className="mt-2 text-gray-700">Orange Money</span>
            </div>
            <div className="flex flex-col items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path>
              </svg>
              <span className="mt-2 text-gray-700">Wave</span>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter */}
      <section className="container mx-auto px-4 py-12">
        <div className="bg-gradient-to-r from-orange-600 to-amber-500 rounded-xl p-8 md:p-12">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">Abonnez-vous à Notre Newsletter</h2>
            <p className="text-orange-100 mb-6">Recevez nos offres exclusives, nouveautés et conseils directement dans votre boîte mail.</p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Votre adresse email"
                className="flex-1 px-4 py-3 rounded-lg border-none focus:outline-none text-gray-700 text-sm"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-white text-orange-600 hover:bg-orange-50 px-6 py-3 rounded-lg font-semibold transition !rounded-button whitespace-nowrap cursor-pointer"
              >
                S'abonner
              </button>
            </form>
            {showNewsletterSuccess && (
              <div className="mt-4 text-white bg-green-600 rounded py-2 px-4 inline-block">
                Merci pour votre inscription à notre newsletter !
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;