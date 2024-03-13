const router = require("express").Router();
const {
    createProduct, updateProduct, deleteProduct,
    getSingleProduct, getAllProduct
} = require("../controllers/productController");

router.post("/", createProduct);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);
router.get("/:id", getSingleProduct);
router.get("/", getAllProduct);

module.exports = router;