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
    console.error("Error updating listing:", error);
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
    console.log(" Error fetching single listing:", error);
    next(error);
  }
};

export const getListings = async (req,res,next)=>{
try {
    const limit =parseInt(req.query.limit) || 9;
   const startIndex = parseInt(req.query.startIndex) || 0;
   let offer = req.query.offer;
   if(offer === undefined || offer === false){
    offer ={$in: [false,true]}
   }
    let furnished = req.query.furnished;
   if(furnished === undefined || furnished === false){
    furnished ={$in: [false,true]}
   }
     let parking = req.query.parking;
   if(parking === undefined || parking === false){
    parking ={$in: [false,true]}
   }
       let type = req.query.type;
   if(type === undefined || type === 'all'){
    type ={$in: ['sale','rent']}
   }
const searchTerm = req.query.searchTerm || ''
const sort=req.query.sort || 'createdAt'
const order = req.query.order || 'desc';

const Listings= await Listing.find({
    name:{$regex:searchTerm,$options: 'i'},
    offer,
    furnished,
    parking,
    type,
}).sort({
    [sort]:order
}).limit(limit).skip(startIndex);
return res.status(200).json(Listings)
} catch (error) {
    next(error)
}
}
