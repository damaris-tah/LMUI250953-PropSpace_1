const Property = require("../models/Property");

// Create property
exports.createProperty = async (req, res) => {
  try {
    const property = new Property({ ...req.body, author: req.user.id });
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all properties (public feed)
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().populate("author", "username email");
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user’s own properties (private feed)
exports.getMyProperties = async (req, res) => {
  try {
    const properties = await Property.find({ author: req.user.id });
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update property
exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findOne({ _id: req.params.id, author: req.user.id });
    if (!property) return res.status(403).json({ error: "Not authorized" });

    Object.assign(property, req.body);
    await property.save();
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete property
exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findOneAndDelete({ _id: req.params.id, author: req.user.id });
    if (!property) return res.status(403).json({ error: "Not authorized" });

    res.json({ message: "Property deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
