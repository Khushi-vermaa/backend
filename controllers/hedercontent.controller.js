// controllers/headerContentController.js
const HeaderContent = require("../models/hedercontent.mongoose.js");
const fs = require("fs");
// // Create new header content
// exports.createHeaderContent = async (req, res) => {
//   try {
//     const { heading, paragraph } = req.body;
//     const newContent = {
//       heading,
//       paragraph,
//     };

//     if (req.file) {
//       const mediaUrl = `/uploads/${req.file.filename}`;
//       if (req.file.mimetype.includes("video")) {
//         newContent.video = mediaUrl;
//       } else {
//         newContent.image = mediaUrl;
//       }
//     }

//     const headerContent = await HeaderContent.create(newContent);
//     res.status(201).json({
//       message: "Content created successfully",
//       content: headerContent,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Error creating header content" });
//   }
// };

// // Get the current header content
// exports.getHeaderContent = async (req, res) => {
//   try {
//     const headerContent = await HeaderContent.findOne()
//       .sort({ createdAt: -1 })
//       .limit(1); // Latest content
//     res.json(headerContent || {});
//   } catch (error) {
//     res.status(500).json({ error: "Error fetching header content" });
//   }
// };

// // Update header content
// exports.updateHeaderContent = async (req, res) => {
//   try {
//     const { heading, paragraph } = req.body;
//     const updatedContent = {};

//     if (heading) updatedContent.heading = heading;
//     if (paragraph) updatedContent.paragraph = paragraph;

//     if (req.file) {
//       const mediaUrl = `/uploads/${req.file.filename}`;
//       if (req.file.mimetype.includes("video")) {
//         updatedContent.video = mediaUrl;
//       } else {
//         updatedContent.image = mediaUrl;
//       }
//     }

//     const headerContent = await HeaderContent.findOneAndUpdate(
//       {},
//       updatedContent,
//       { new: true }
//     );
//     res.json({
//       message: "Content updated successfully",
//       content: headerContent,
//     });
//   } catch (error) {
//     res.status(500).json({ error: "Error updating header content" });
//   }
// };

// Create new header content
exports.createHeaderContent = async (req, res) => {
  try {
    const { heading, paragraph } = req.body;
    const newContent = {
      heading,
      paragraph,
    };

    // If a file is uploaded, process it
    if (req.file) {
      const mediaUrl = `/uploads/${req.file.filename}`; // Relative path for the file
      if (req.file.mimetype.includes("video")) {
        newContent.video = mediaUrl; // Storing the video path
      } else {
        newContent.image = mediaUrl; // Storing the image path
      }
    }

    const headerContent = await HeaderContent.create(newContent);
    res.status(201).json({
      message: "Content created successfully",
      content: headerContent,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error creating header content" });
  }
};
// Get the current header content
exports.getHeaderContent = async (req, res) => {
  try {
    const headerContent = await HeaderContent.findOne()
      .sort({ createdAt: -1 }) // Fetch the latest content
      .limit(1); // Limit to only one record
    res.json(headerContent || {}); // Return empty object if no content found
  } catch (error) {
    res.status(500).json({ error: "Error fetching header content" });
  }
};

exports.updateHeaderContent = async (req, res) => {
  try {
    const { heading, paragraph } = req.body;
    const updateData = { heading, paragraph };

    // Check if a file is uploaded
    if (req.file) {
      const mediaUrl = `/uploads/${req.file.filename}`;
      if (req.file.mimetype.includes("video")) {
        updateData.video = mediaUrl;
        updateData.image = undefined; // Remove image if a video is uploaded
      } else {
        updateData.image = mediaUrl;
        updateData.video = undefined; // Remove video if an image is uploaded
      }
    }

    // Update the latest document in the database
    const updatedContent = await HeaderContent.findOneAndUpdate(
      {}, // No filter, update the first document
      updateData,
      { new: true, upsert: true } // Upsert to create if it doesn't exist
    );

    res.status(200).json({
      message: "Header content updated successfully",
      content: updatedContent,
    });
  } catch (error) {
    console.error("Error updating header content:", error);
    res.status(500).json({ error: "Failed to update header content" });
  }
};
