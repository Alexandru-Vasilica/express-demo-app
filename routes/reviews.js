const express = require('express');
const router = express.Router({ mergeParams: true });
const catchAsync = require('../utils/catchAsync');
const { validateReview, isLoggedIn, isReviewAuthor } = require('../middleware')
const reviewController = require('../controllers/reviews');

router.post('/', isLoggedIn, validateReview, catchAsync(reviewController.createReview))

router.delete('/:reviewId', isLoggedIn, catchAsync(isReviewAuthor), catchAsync(reviewController.deleteReview));

module.exports = router;