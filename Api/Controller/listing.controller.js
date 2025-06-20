import Listing from '../Models/listing.model.js'
import User from '../Models/user.model.js';
export const createListing = async (req,res,next)=>{
    try {
       const listing = await Listing.create(req.body);
       return res.status(201).json(listing)
    } catch (error) {
        next(error)
    }
}

export const getListing = async (req, res, next) => {
  try {
    console.log("✅ Reached getListing");
    console.log("req.user.id:", req.user?.id);
    console.log("req.params.id:", req.params.id);

    if (req.user?.id !== req.params.id) {
      return next(ErrorHandler(401, "You can only view your own Listing"));
    }

    const list = await Listing.find({ userRef: req.params.id });
    if (!list) {
      return next(ErrorHandler(404, "Listing not found"));
    }

    return res.status(200).json(list);
  } catch (error) {
    console.log("❌ Error in getListing:", error);
    next(error);
  }
};
// In listing.controller.js
export const deleteListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.userRef !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Listing.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Listing deleted" });
  } catch (err) {
    next(err);
  }
};
export const updateListing = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.userRef !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized to edit this listing" });
    }

    const updated = await Listing.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    return res.status(200).json(updated);
  } catch (error) {
    console.error("❌ Error updating listing:", error);
    next(error);
  }
};
export const getSingleListing  = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id);

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    if (listing.userRef !== req.user.id) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    return res.status(200).json(listing);
  } catch (error) {
    console.log("❌ Error fetching single listing:", error);
    next(error);
  }
};
