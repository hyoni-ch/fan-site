import { create } from "zustand";

interface CartItem {
  id: number;
  goodsName: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartState {
  items: CartItem[];
  addItemToCart: (item: CartItem) => void;
  removeItemFromCart: (id: number) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>((set) => ({
  items:
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems") || "[]")
      : [],
  addItemToCart: (item: CartItem) =>
    set((state) => {
      const existingItemIndex = state.items.findIndex(
        (cartItem) => cartItem.id === item.id
      );
      let updatedItems;

      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((cartItem, index) =>
          index === existingItemIndex
            ? { ...cartItem, quantity: cartItem.quantity + item.quantity }
            : cartItem
        );
      } else {
        updatedItems = [...state.items, item];
      }

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return { items: updatedItems };
    }),
  removeItemFromCart: (id: number) =>
    set((state) => {
      const updatedItems = state.items.filter((item) => item.id !== id);
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),
  clearCart: () =>
    set(() => {
      localStorage.removeItem("cartItems");
      return { items: [] };
    }),
  updateItemQuantity: (id: number, quantity: number) =>
    set((state) => {
      const updatedItems = state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
      return { items: updatedItems };
    }),
}));

export default useCartStore;
