const router = require("express").Router();
const {
    createCustomer, deleteCustomer, getAllCustomer
} = require("../controllers/customerController");

router.post("/", createCustomer);
router.delete("/:id", deleteCustomer);
router.get("/", getAllCustomer);

module.exports = router;