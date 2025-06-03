
import { useShoppingCart } from '../../contexts/ShoppingCartContext';
import { Button } from '../ui/button';

const CartDropdown = ({ onClose }: { onClose: () => void }) => {
  const { cartItems, removeFromCart, updateQuantity } = useShoppingCart();

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="absolute right-0 mt-2 w-96 bg-white rounded-lg shadow-xl z-50">
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-4">Panier</h3>
        {cartItems.length === 0 ? (
          <p className="text-gray-500">Votre panier est vide</p>
        ) : (
          <>
            <div className="space-y-4 max-h-96 overflow-auto">
              {cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 object-cover rounded" />
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.price} €</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        -
                      </Button>
                      <span>{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Supprimer
                  </Button>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between mb-4">
                <span className="font-medium">Total:</span>
                <span className="font-bold">{total} €</span>
              </div>
              <Button className="w-full" onClick={onClose}>
                Valider la commande
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartDropdown;
