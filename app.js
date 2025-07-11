const express = require("express");

const app = express();

app.use(express.json());

let products = [];
const VALID_STATUSES = ["in-stock", "low-stock", "out-of-stock"];

//GET ALL PRODUCTS
app.get("/", (req, res) => {
  res.send(products);
});

//ADD A NEW PRODUCT
app.post("/product", (req, res) => {
  const id = Math.floor(Math.random() * 10000);
  const productName = req.body.productName;
  const cost = req.body.cost;
  const stockStatus = req.body.stockStatus;
  const createdAt = new Date();

  if (!VALID_STATUSES.includes(stockStatus)) {
    return res.status(400).json({
      message: `Invalid stock status. Must be one of: ${VALID_STATUSES.join(
        ", "
      )}`,
    });
  }

  products.push({
    id,
    productName,
    cost,
    stockStatus,
    createdAt,
  });

  res.send({
    message: "Product added successfully",
    product: {
      id,
      productName,
      cost,
      stockStatus,
      createdAt,
    },
  });
});

//GET PRODUCT BY ID
app.get("/product/:id", (req, res) => {
  const id = req.params.id;

  const product = products.find((product) => product.id == id);
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  res.send({
    message: "Product found",
    product,
  });
});

//UPDATING PRODUCT
app.put("/product/:id", (req, res) => {
  const id = parseFloat(req.params.id);

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  const fieldsToUpdate = ["productName", "cost"];

  for (let i = 0; i < fieldsToUpdate.length; i++) {
    const field = fieldsToUpdate[i];
    if (req.body[field] !== undefined) {
      product[field] = req.body[field];
    }
  }

  res.send({
    message: "Product updated successfully",
    product: product,
  });
});

//UPDATING STOCK STATUS
app.patch("/product/:id/:status", (req, res) => {
  const id = parseFloat(req.params.id);
  const newStatus = req.params.status;

  if (!VALID_STATUSES.includes(newStatus)) {
    return res.status(400).json({
      message: `Invalid stock status. Must be one of: ${VALID_STATUSES.join(
        ", "
      )}`,
    });
  }

  const product = products.find((item) => item.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  product.stockStatus = newStatus;

  res.status(200).json({
    message: "Stock status updated successfully",
    product,
  });
});

//DELETE PRODUCT BY ID
app.delete("/product/:id", (req, res) => {
  const id = parseFloat(req.params.id);

  const existingProduct = products.find((item) => item.id === id);
  if (!existingProduct) {
    return res.status(404).json({ message: "Product not found" });
  }

  products = products.filter((item) => item.id !== id);

  res.send({
    message: "Product deleted successfully",
    products,
  });
});

app.listen(3000, () => {
  console.log("Server has started on port 3000");
});
