
const express= require("express")
const router=express.Router();
const wrapAsync=require("../utils/wrapAsync.js")
const Listing=require("../models/listing.js");
const{isLoggedIn,isOwner,validateListing}=require("../middleware.js")
const listingController=require("../controllers/listings.js");
 const multer  = require('multer')
 const{storage}=require("../cloudConfig.js");
const upload = multer({ storage})

//Index Route
router.get("/",wrapAsync (listingController.index))



//New Route
router.get("/new",isLoggedIn,listingController.renderNewForm)
router.get("/mountInfo", listingController.categoryListings);
router.get("/search", wrapAsync(listingController.searchListings));




//Show Route

router.get("/:id",wrapAsync( listingController.showListing)
)



//Create a route
router.post(
  "/",
  isLoggedIn,
  
  upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.createListing)
);



//router.post(
  //"/",
  //isLoggedIn,
  //validateListing,
  //wrapAsync(async(req,res,next)=>{
    //const newListing=new Listing(req.body.listing);
    //newListing.owner=req.user._id;
    //await newListing.save();
    //req.flash("success","New Listing Created");
    //res.redirect("/listings");
  //})
//)


//Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,
  wrapAsync (listingController.renderEditForm)
)
//Update Route
router.put("/:id",
  isLoggedIn,
  isOwner,
   upload.single("listing[image]"),
  validateListing,
  wrapAsync(listingController.updateListing)
)

//Delete Route
router.delete("/:id",isLoggedIn, isOwner,
  wrapAsync (listingController.destroyListing)
)


module.exports=router;