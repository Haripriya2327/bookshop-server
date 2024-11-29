const express = require("express");
const router = express.Router();
const Apartment = require("../models/Apartment.model");
const { isAuthenticated } = require("../middleware/jwt.middleware")

const fileUploader = require("../config/cloudinary.config");

router.get("/apartments", (req, res, next) => {
  Apartment.find({})
    .then(apartments => { res.json(apartments) })
    .catch(err => next(err))
});

router.get("/apartments/:apartmentId", (req, res, next) => {
  Apartment.findById(req.params.apartmentId)
    .then(apartment => { res.json(apartment) })
    .catch(err => next(err))
});

router.post("/apartments", (req, res, next) => {
  const { apartmentType, floor, price, area, isFurnished, isPetFriendly, country, city, availableDates, address, images, description } = req.body
  Apartment.create({ apartmentType, floor, price, area, isFurnished, isPetFriendly, country, city, availableDates, address, description, images })
    .then(apartment => { res.json(apartment) })
    .catch(err => next(err))
});

// for agent => add middleware fun

router.put("/apartments/:apartmentId", isAuthenticated, (req, res, next) => {
  const { apartmentType, floor, price, area, isFurnished, isPetFriendly, country, city, availableDates, address, isAvailable, images, description } = req.body
  Apartment.findByIdAndUpdate(req.params.apartmentId, { apartmentType, floor, price, area, isFurnished, isPetFriendly, address, description, country, city, availableDates, isAvailable, images }, { new: true })
    .then(apartment => { res.json(apartment) })
    .catch(err => next(err))
});

router.delete("/apartments/:apartmentId", isAuthenticated, (req, res, next) => {
  Apartment.findByIdAndDelete(req.params.apartmentId)
    .then(res.status(204).send())
    .catch(err => next(err))
});


// for user => finish editing logic for booking rha apartment

router.put("/apartments/:apartmentId", isAuthenticated, (req, res, next) => {
  const { datesBooked, usersBooked, availableDates } = req.body
  Apartment.findByIdAndUpdate(req.params.apartmentId, { datesBooked, usersBooked }, { new: true })
    .then(apartment => { res.json(apartment) })
    .catch(err => next(err))
});

// apartments in a specific city

router.get("/search", (req, res, next) => {
  console.log("Request", req.query)
  Apartment.find(req.query)
    .then(apartments => { res.json(apartments) })
    .catch(err => next(err))
}
);
router.get("/apartments/:userId", isAuthenticated, (req, res, next) => {
  Apartment.find({ usersBooked: req.params.userId }) // check an array
    .then(apartments => { res.json(apartments) })
    .catch(err => next(err))
});


router.post("/upload", fileUploader.array("images", 5), (req, res, next) => {

  if (!req.files || req.files.length === 0) {
    next(new Error("No files uploaded!"));
    return;
  }

  const fileUrls = req.files.map(file => file.path);
  res.json({ fileUrls });
});


module.exports = router;



// get /apartments X
// get /apartments/:apartmentId X
// post /apartments X
// put /apartments/:apartmentId  --
// delete /apartments/:apartmentId X


// get appartments/location/ X
//

// get /appartments/user/ --
