import mongoose, {Schema } from 'mongoose';

const restuarantSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    
    description: {
        type: String,
        required: true
    },
    
    cuisines: {
        type: [String],
        required: true
    },

    priceTier: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    rating: {
        type: Number,
        required: true,
        min: 1,
        max: 5
    },

    deliveryTime: {
        type: Number,
        required: true
    },

    dietaryTags: {
        type: [String]
    },

    images: {
        type: [String],
        required: true
    },
} , {
    timestamps: true
})


restuarantSchema.index({ name: 'text', description: 'text' });
restuarantSchema.index({ cuisines: 1 });
restuarantSchema.index({ rating: 1 });

export const Restaurant = mongoose.model('Restaurant', restuarantSchema);