const Listing=require("../models/listing")

module.exports.index=async(req,res)=>{
    const allListings=await Listing.find({});
    res.render("./listings/index.ejs",{allListings})
}

module.exports.renderNewForm=(req,res)=>{
  res.render("./listings/new.ejs");
}

module.exports.showListing=async (req,res)=>{
  let {id}=req.params;
  const listing=await Listing.findById(id)
  .populate({
    path:"reviews",
    populate:{
      path:"author",
    },
  })
  .populate("owner");
  if(!listing){
    req.flash("error","Listing you requested for does not exist!");
    res.redirect("/listings");
  }
  console.log(listing)
  res.render("./listings/show.ejs",{listing});
}

module.exports.createListing=async (req, res, next) => {
  let url=req.file.path;
  let filename=req.file.filename;
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image={url,filename}
    await newListing.save();
    req.flash("success", "New Listing Created");
    res.redirect("/listings");
  }

  




module.exports.categoryListings = async (req, res) => {
  const { category } = req.query;

  const foundListings = await Listing.find({
    category: { $regex: new RegExp(`^${category}$`, "i") }  // Case-insensitive match
  });

  res.render("listings/mountInfo", {
    foundListings,
    category  // 🔥 Pass the category to the EJS view
  });
};

module.exports.searchListings = async (req, res) => {
  const { q } = req.query;

  if (!q) {
    req.flash("error", "Please enter a search term.");
    return res.redirect("/listings");
  }

  const regex = new RegExp(q, "i"); // case-insensitive regex

  const foundListings = await Listing.find({
    $or: [
      { title: regex },
      { location: regex },
      { description: regex }
    ]
  });

  res.render("listings/search", { foundListings, q });
};



  module.exports.renderEditForm=async(req,res)=>{
      let {id}=req.params;
      const listing=await Listing.findById(id);
       if(!listing){
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
      }
      res.render("./listings/edit.ejs",{listing});
    }

  module.exports.updateListing=async(req,res)=>{
      let{id}=req.params;
     let listing= await Listing.findByIdAndUpdate(id,{...req.body.listing})
      if(typeof req.file!=="undefined"){
        let url=req.file.path;
        let filename=req.file.filename
        listing.image={url,filename}
       await listing.save()
      }
      req.flash("success"," Listing Updated!")
      res.redirect(`/listings/${id}`)
    }

  module.exports.destroyListing=async(req,res)=>{
  let{id}=req.params;
  let deletedListing=await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success","listing Deleted")
  res.redirect("/listings")
  }

