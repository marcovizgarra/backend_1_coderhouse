import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const cartCollection = 'cart';

const cartSchema = mongoose.Schema({
    items: {
        type: Array,
        default: []
    }
});

cartSchema.plugin(mongoosePaginate);
const cartModel = mongoose.model(cartCollection, cartSchema);

export default cartModel;