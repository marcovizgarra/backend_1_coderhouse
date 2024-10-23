export const addToCart = async (cartId, itemId, quantity) => { 
    try {
      const cart = await cartModel.findOne({ _id: cartId, 'items.item' : itemId });
  
      if (cart) {
        const updatedCart = await cartModel.updateOne(
          { _id: cartId, 'items.item': productId},
          {
            $inc: { 'items.$.quant': quantity}
          }
        );
  
        console.log('Cart updated');
        return updatedCart;
      } else {
        const updatedCart = await cartModel.findByIdAndUpdate(
          cartId, {
            $push: { items: {item: productId, quant: quantity } }
          },
          { new: true }
        );
  
        console.log('Item created');
        return updatedCart;
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };