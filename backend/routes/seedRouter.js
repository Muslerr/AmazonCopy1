import express from "express";
import seedData from "../controllers/seedControllers.js";

const seedRouter=express.Router();
seedRouter.get('/',seedData);

export default seedRouter;