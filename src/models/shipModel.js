import mongoose from "mongoose";


const crewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Crew member name is required"],
      trim: true,
    },
    role: {
      type: String,
      required: [true, "Crew member role is required"],
      trim: true,
    },
  },
  { _id: false }
);

const shipSchema = new mongoose.Schema(
  {
    shipUID: {
      type: String,
      required: [true, "Ship UID is required"],
      unique: true,
      trim: true,
    },

    name: {
      type: String, 
      minlength: [2, "Ship name must be at least 2 characters long"],
      trim: true,
      required: [true, "Ship Name is required"]
    },

    source: {
      type: String,
      required: [true, "Source port is required"],
      trim: true,
    },

    destination: {
      type: String,
      required: [true, "Destination port is required"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Contact email is required"],
      lowercase: true,
      validate: {
        validator: function (v) {
          return /^\S+@\S+\.\S+$/.test(v);
        },
        message: "Invalid email format",
      },
    },

    crew: {
      type: [crewSchema], 
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Ship", shipSchema);
