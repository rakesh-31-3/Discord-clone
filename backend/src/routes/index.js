import express from "express";

import authRoute from "./auth.route.js";

// eslint-disable-next-line new-cap
const router = express.Router();

router.use("/auth", authRoute);

export default router;
