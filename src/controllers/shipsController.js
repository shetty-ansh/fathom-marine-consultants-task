import { asyncHandler } from "../utils/asyncHandler.js";
import { apiError } from "../utils/apiError.js";
import Ship from "../models/shipModel.js";

const getShips = asyncHandler(async (req, res) => {
  const ships = await Ship.find().sort({ createdAt: -1 });

  if (!ships) throw new apiError(404, "No ships available");

  return res.status(200).json({
    success: true,
    count: ships.length,
    data: ships,
  });
});

const createShip = asyncHandler(async (req, res) => {
  const { shipUID, name, source, destination, email, isTraveling, isArchived, crew } = req.body;

  if (!name || typeof name !== "string") {
    throw new apiError(400, "Ship name is required and must be a string");
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    throw new apiError(400, "Please enter a valid email");
  }

  if (!shipUID) {
    throw new apiError(400, "Ship UID is required");
  }

  const shipExists = await Ship.findOne({ shipUID });
  if (shipExists) {
    throw new apiError(409, "Ship with this UID already exists");
  }

  const newShip = await Ship.create({
    shipUID,
    name,
    source,
    destination,
    email,
    isTraveling: isTraveling || false,
    isArchived: isArchived || false,
    crew: crew || [],
  });

  return res.status(201).json({ success: true, message: "Ship created", ship: newShip });
});

const getShipById = asyncHandler(async (req, res) => {
  const ship = await Ship.findById(req.params.id);

  if (!ship) throw new apiError(404, "Ship not found");

  return res.status(200).json({ success: true, shipData: ship });
});

const updateShip = asyncHandler(async (req, res) => {
  const { name, source, destination, email, isTraveling, isArchived, crew } = req.body;

  
  if (name && typeof name !== "string") {
      return next(new apiError(400, "Name must be a string"));
    }
    
    if (email && !/^\S+@\S+\.\S+$/.test(email)) {
        throw new apiError(400, "Invalid email format");
    }
    
    const ship = await Ship.findById(req.params.id);

    if (!ship) throw new apiError(404, "Ship not found");

  ship.name = name ?? ship.name;
  ship.source = source ?? ship.source;
  ship.destination = destination ?? ship.destination;
  ship.email = email ?? ship.email;
  ship.isTraveling = isTraveling ?? ship.isTraveling;
  ship.isArchived = isArchived ?? ship.isArchived;
  ship.crew = crew ?? ship.crew;

  await ship.save();

  const updatedShip = await Ship.findById(req.params.id);

  res.status(200).json({
    success: true,
    message: "Ship updated successfully",
    data: updatedShip,
  });
});

const deleteShip = asyncHandler(async (req, res) => {
  const ship = await Ship.findById(req.params.id);

  if (!ship) throw new apiError(404, "Ship not found");

  await ship.deleteOne();
  return res.status(200).json({ success: true, message: "Ship deleted" });
});

export { getShips, createShip, getShipById, updateShip, deleteShip };
