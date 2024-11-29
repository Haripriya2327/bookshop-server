const { Schema, model } = require("mongoose");

// TODO: Please make sure you edit the User model to whatever makes sense in this case
const appoinmentSchema = new Schema(
    {
        apartmentId: {
            type: Schema.Types.ObjectId,
            ref: 'Apartment'
        },
        time: { type: Date },//Add time with date
        userBooked: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        // this second object adds extra properties: `createdAt` and `updatedAt`
        timestamps: true,
    }
);

const Appoinment = model("Appoinment", appoinmentSchema);

module.exports = Appoinment;
