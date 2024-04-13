import getConfig from 'next/config';
import mongoose from 'mongoose';


const { serverRuntimeConfig } = getConfig();
const Schema = mongoose.Schema;

mongoose.connect(process.env.MONGODB_URI || serverRuntimeConfig.connectionString);
mongoose.Promise = global.Promise;

export const db = {
    User: userModel(),
    Car: carModel()
};

// mongoose models with schema definitions

function userModel() {
    const schema = new Schema({
        username: { type: String, unique: true, required: true },
        hash: { type: String, required: true },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true }
    }, {
        // add createdAt and updatedAt timestamps
        timestamps: true
    });

    schema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
            delete ret._id;
            delete ret.hash;
        }
    });

    return mongoose.models.User || mongoose.model('User', schema);
}

function carModel(){
    const carSchema = new Schema({
        // Propiedades del carro
        marca: { type: String, required: true },
        modelo: { type: String, required: true },
        anio: { type: Number, required: true },
        precio: { type: Number, required: true },
        
    });

    carSchema.set('toJSON', {
        virtuals: true,
        versionKey: false,
        transform: function (doc, ret) {
        delete ret._id;
        }
    });

return  mongoose.models.Car || mongoose.model('Car', carSchema);
}