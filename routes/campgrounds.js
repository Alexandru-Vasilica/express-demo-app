const express = require('express');
const router = express.Router();
const catchAsync = require('../utils/catchAsync');
const { isLoggedIn, isAuthor, validateCampground } = require('../middleware');
const campgroundController = require('../controllers/campgrounds');
const multer = require('multer');
const { storage } = require('../cloudinary');
const upload = multer({ storage });


router.route('/')
    .get(catchAsync(campgroundController.index))
    .post(isLoggedIn, upload.array('image'), validateCampground, catchAsync(campgroundController.createCampground));


router.get('/new', isLoggedIn, campgroundController.renderNewForm);

router.route('/:id')
    .get(catchAsync(campgroundController.showCampground))
    .put(isLoggedIn, catchAsync(isAuthor), upload.array('image'), validateCampground, catchAsync(campgroundController.updatedCampground))
    .delete(isLoggedIn, catchAsync(isAuthor), catchAsync(campgroundController.deleteCampground));

router.get('/:id/edit', isLoggedIn, catchAsync(isAuthor), catchAsync(campgroundController.renderEditForm))


module.exports = router;