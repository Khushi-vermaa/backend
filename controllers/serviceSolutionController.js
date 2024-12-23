const ServiceAndSolution = require("../models/serviceSolutionModel");
const fs = require("fs");
exports.createServiceSolution = async (req, res) => {
  try {
    const { title1, title2, description, mediaType } = req.body;
    console.log(title1, title2, description, mediaType);
    const mediaUrls = req.files ? req.files.map((file) => file.path) : [];

    if (
      !title1 ||
      !title2 ||
      !description ||
      !mediaType ||
      mediaUrls.length === 0
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }
    // if (!Array.isArray(description)) {
    //   return res
    //     .status(400)
    //     .json({ message: "Description must be an array of strings" });
    // }

    const newEntry = new ServiceAndSolution({
      title1,
      title2,
      description,
      mediaType,
      mediaUrls,
    });
    await newEntry.save();

    res
      .status(201)
      .json({ message: "Service/Solution added successfully", data: newEntry });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to add service/solution", error: err.message });
  }
};

//getallserviceapi

exports.getallservicesolutionControllers = async (req, res) => {
  try {
    const services = await ServiceAndSolution.find();
    console.log(services);
    res.status(200).json({ message: "All services/solutions", data: services });
  } catch (err) {
    res.status(500).json({
      message: "Failed to get all services/solutions",
      error: err.message,
    });
  }
};

//getbyid
exports.getserviceSolutionByID = async (req, res) => {
  const { id } = req.params;
  const service = await ServiceAndSolution.findById(id);
  console.log(service);
  if (!service) {
    return res.status(404).json({ message: "Service/Solution not found" });
  }
  // res.status(200).json({ message: "Service/Solution found", data: service });
  res.render("service_showpage", { service: service });
};

//editservicesolution

exports.editServiceSolution = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedData = req.body;
    const newMediaFiles = req.files ? req.files.map((file) => file.path) : [];

    // Find the existing service by ID
    const service = await ServiceAndSolution.findById(id);

    if (!service) {
      return res.status(404).json({ message: "Service/Solution not found" });
    }

    if (newMediaFiles.length > 0) {
      service.mediaUrls.forEach((filePath) => {
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath); // Delete the old file
        }
      });

      // Replace old media URLs with new ones
      updatedData.mediaUrls = newMediaFiles;
    }

    // Update the service with new data
    const updatedService = await ServiceAndSolution.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      message: "Service/Solution updated successfully",
      data: updatedService,
    });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update service/solution",
      error: err.message,
    });
  }
};
