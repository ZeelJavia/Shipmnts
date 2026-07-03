const express = require("express");

const userService = require("../services/index")
const router = express.Router();
// requests

router.post("/users" , userService.createUser());
router.get("/users" , userService.getAllUsers());
router.post("/connect" , userService.connect());
router.patch("/connect/respond" , userService.connectRespond())
router.post("/rates" , userService.createRates())
module.exports = router;