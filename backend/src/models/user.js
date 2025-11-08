import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false, 
    },

    role: {
      type: String,
      enum: ["customer", "provider", "admin"],
      default: "customer",
    },

    phone: {
      type: String,
      trim: true,
    },

    
    location: {
      address: { type: String },
      city: { type: String },
      state: { type: String },
      pincode: { type: String },
      coordinates: {
        lat: { type: Number },
        lng: { type: Number },
      },
    },

    // Only for service providers
    servicesOffered: [
      {
        serviceName: { type: String, trim: true },
        description: { type: String },
        priceRange: { type: String }, // e.g. "₹500–₹1500"
      },
    ],

    experience: {
      type: String,
      trim: true,
    },

    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },

    // Reviews given to a provider by customers
    reviews: [
      {
        customerId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        comment: { type: String },
        rating: { type: Number, min: 1, max: 5 },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Optional profile picture or ID proof
    profileImage: {
      type: String,
      default: "",
    },

    createdAt: {
      type: Date,
      default: Date.now,
    },

    
  },
  { timestamps: true }
);

// Index for searching nearby providers by location
userSchema.index({ "location.coordinates": "2dsphere" });

// Virtual property for full rating info (example)
userSchema.virtual("fullRating").get(function () {
  return `${this.rating.average} (${this.rating.count} reviews)`;
});

const User = mongoose.model("User", userSchema);

export default User;
