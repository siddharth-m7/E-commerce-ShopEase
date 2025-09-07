const mongooose = require('mongoose');

const userSchema = new mongooose.Schema({
    name: { 
        type: String, 
        required: true, 
        trim: true
    },
    email: { type: String, 
        required: true, 
        unique: true, 
        trim: true, 
        lowercase: true
    },
    password: { type: String, 
        required: true, 
        minlength: 6,
        trim: true
    },
    role: { 
        type: String, 
        enum: ['user', 'admin'], 
        default: 'user' 
    },
    cart : [{
        productId: { type: mongooose.Schema.Types.ObjectId, ref: 'Product'},
        quantity: { type: Number, default: 1, min: 1}
    }]
}, { 
    timestamps: true 
});

module.exports = mongooose.model('User', userSchema);
