import express from "express";

import authRoute from "./auth.route.js";

const router = express.Router();

//Use the auth and tasks routes
router.use("/auth", authRoute);

export default router;