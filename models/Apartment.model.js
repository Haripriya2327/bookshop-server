const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const apartmentSchema = new Schema(
    {
        apartmentType: {
            type: String,
            required: [true],
            enum: ["Studio", "Loft", "Duplex", "Apartment", "House"]
        },
        floor: {
            type: String,
        },
        price: {
            type: Number,
            required: [true],
        },
        area: {
            type: Number,
            required: [true],
        },
        country: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        isFurnished: {
            type: Boolean,
            required: true
        },
        isPetFriendly: {
            type: Boolean,
            required: true
        },
        images: {
            type: [String],
            default: "https://i0.wp.com/lockettnhomes.com/wp-content/uploads/2018/12/Coming-Soon.jpg?ssl=1"
        },
        isAvailable: {
            type: Boolean,
            default: true
        },
        availableDates: { type: [Date], min: Date.now },
        address: { type: String },
        description: String
    },

    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Apartment = model("Apartment", apartmentSchema);

module.exports = Apartment;
