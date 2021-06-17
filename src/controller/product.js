const Product = require("../models/product");

module.exports = {
  get: async (req, res) => {
    try {
      const product = await Product.findAll();
      res.status(200).json({
        status: "get data",
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        status: "Error",
        data: null,
      });
    }
  },
  getPagination: async (req, res) => {
    let page = parseInt(req.query.page);
    let limit = parseInt(req.query.limit);
    const offset = page ? page * limit : 0;
    try {
      const product = await Product.findAll({ limit: limit, offset: offset });
      if (product) {
        res.status(200).json({
          status:
            "Succes get pagination: page = " + page + ", limit = " + limit,
          data: product,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "Error",
        data: null,
      });
    }
  },
  create: async (req, res) => {
    try {
      const { name, price, description } = req.body;
      const newProduct = new Product({
        name,
        price,
        description,
      });
      await newProduct.save();
      res.json(newProduct);
    } catch (error) {
      res.status(500).json({
        status: "Error",
        data: null,
      });
    }
  },
  update: async (req, res) => {
    const id = req.params.id;
    const newProduct = {
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
    };
    try {
      const product = await Product.findOne({ where: { id: id } });
      if (product) {
        product.name = req.body.name;
        product.price = req.body.price;
        product.description = req.body.description;
        await product.save();
        res.status(200).json({
          status: "valid",
          data: newProduct,
          message: `update ${id}`,
        });
      } else {
        res.status(400).send("Not found");
      }
    } catch (error) {
      res.status(500).json({
        status: "Error",
        data: null,
      });
    }
  },
  delete: async (req, res) => {
    const id = req.params.id;
    try {
      const product = await Product.findOne({ where: { id: id } });
      if (product) {
        await product.destroy();
        res.status(200).json({
          status: `Success Deleted ${id}`,
          data: null,
        });
      } else {
        res.status(400).json({
          status: "Error",
          data: null,
        });
      }
    } catch (error) {
      res.status(500).json({
        status: "Error",
        data: null,
      });
    }
  },
};
