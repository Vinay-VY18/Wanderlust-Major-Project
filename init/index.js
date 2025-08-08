const mongoose=require("mongoose");
const initData=require("./data.js")
const Listing=require("../models/listing.js");
//const { init } = require("./models/Listing");
//const wrapAsync = require("../utils/wrapAsync.js");

const MONGO_URL="mongodb://127.0.0.1:27017/wonderlust";

main()
.then(()=>{
  console.log("coonected to DB");
}).catch(err =>{
    console.log(err);
})

 async function main() {
    await mongoose.connect(MONGO_URL)
    
}
 

const initDB=async()=>{
    await Listing.deleteMany({});
   initData.data= initData.data.map((obj)=>({
    ...obj,owner:'684a671a3dbd27ea9a7dde8f'}))
    await Listing.insertMany(initData.data);
    console.log("data was initialized")
}

initDB();