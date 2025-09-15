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
      required: [true, "Ship Name is required"],
    },

    source: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (this.traveling) {
            return typeof v === "string" && v.trim().length > 0;
          }
          return true;
        },
        message: "Source port is required when the ship is traveling",
      },
    },

    destination: {
      type: String,
      trim: true,
      validate: {
        validator: function (v) {
          if (this.traveling) {
            return typeof v === "string" && v.trim().length > 0;
          }
          return true;
        },
        message: "Destination port is required when the ship is traveling",
      },
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

    isTraveling: {
      type: Boolean,
      default: false,
    },

    isArchived: {
      type: Boolean,
      default: false,
    },

    crew: {
      type: [crewSchema], 
      default: [],
    },
  },
  { timestamps: true }
);

const Ship = new mongoose.model("Ship", shipSchema);

export default Ship