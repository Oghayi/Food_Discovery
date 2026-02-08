import { Restaurant } from '../models/restaurant.model.js';

const getRestaurants = async (req, res) => {
  try {
    const {
      search,
      cuisines,
      rating,
      priceTier,
      maxDeliveryTime,
      sort,
      cursor,
      limit = 10
    } = req.query

    let query = {}

    //  search
    if (search) {
      query.$text = { $search: search }
    }

    // cuisines
    if (cuisines) {
      query.cuisines = { $in: cuisines.split(",") }
    }

    //  rating
    if (rating) {
      query.rating = { $gte: Number(rating) }
    }

    // price
    if (priceTier) {
      query.priceTier = { $in: priceTier.split(",") }
    }

    // delivery time
    if (maxDeliveryTime) {
      query.deliveryTime = { $lte: Number(maxDeliveryTime) }
    }

    //cursor pagination
    if (cursor) {
      query._id = { $gt: cursor }
    }

    // sorting
    let sortOption = { createdAt: -1 }

    if (sort === "rating") sortOption = { rating: -1 }
    if (sort === "delivery") sortOption = { deliveryTime: 1 }
    if (sort === "price") sortOption = { priceTier: 1 }

    const restaurants = await Restaurant
      .find(query)
      .sort(sortOption)
      .limit(Number(limit))

    res.json(restaurants)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// Suggestion API for restaurant names based on a query
const getSuggestions = async (req, res) => {
  try {
    const { q } = req.query

    const restaurants = await Restaurant.find({
      name: { $regex: q, $options: "i" }
    }).limit(5)

    const names = restaurants.map(r => r.name)

    res.json(names)

  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

export { getRestaurants, getSuggestions }
