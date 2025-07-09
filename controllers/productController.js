let products = [];
const VALID_STATUSES = ["in-stock", "low-stock", "out-of-stock"];

const getAllProducts = (req, res) => {
  res.send(products);
};

const addNewProduct = (req, res) => {
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
};

const getProduct = (req, res) => {
  const id = req.params.id;

  const product = products.find((product) => product.id == id);
  if (!product) {
    return res.status(404).send({ message: "Product not found" });
  }

  res.send({
    message: "Product found",
    product,
  });
};

const updateProduct = (req, res) => {
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
};

const deleteProduct = (req, res) => {
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
};

module.exports = {
  getAllProducts,
  getProduct,
  addNewProduct,
  updateProduct,
  deleteProduct,
};
