import Cart from "../models/Cart.js";

// Get cart
export const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = await Cart.create({ userId: req.user.id, items: [] });
    }

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add item
export const addItemToCart = async (req, res) => {
  const { isbn, title, author, image, price, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) {
      cart = new Cart({ userId: req.user.id, items: [] });
    }

    const existingItem = cart.items.find(item => item.isbn === isbn);

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ isbn, title, author, image, price, quantity });
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Remove item
export const removeItemFromCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      item => item.isbn !== req.params.isbn
    );

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Update quantity
export const updateItemQuantity = async (req, res) => {
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ userId: req.user.id });

    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      item => item.isbn === req.params.isbn
    );

    if (item) {
      item.quantity = quantity;
    }

    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};