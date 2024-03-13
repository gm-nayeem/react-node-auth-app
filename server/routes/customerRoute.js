const router = require("express").Router();
const {
    loginCustomer, createCustomer, deleteCustomer, getAllCustomer
} = require("../controllers/customerController");

router.post("/login", loginCustomer);
router.post("/", createCustomer);
router.delete("/:id", deleteCustomer);
router.get("/", getAllCustomer);

module.exports = router;