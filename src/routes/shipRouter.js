import { Router } from "express";
import { getShips, createShip, getShipById, updateShip, deleteShip} from "../controllers/shipsController.js";
import verifyJWT from "../middlewares/auth.js";

const shipRouter = Router();

shipRouter.route("/")
.get(getShips)
.post(verifyJWT, createShip);  

shipRouter.route("/:id").get(getShipById).put(verifyJWT, updateShip).delete(verifyJWT, deleteShip); 

export default shipRouter;
