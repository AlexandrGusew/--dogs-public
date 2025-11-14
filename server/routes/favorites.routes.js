const express = require('express');
const router = express.Router();
const { Favorite } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const favorites = await Favorite.findAll({
      order: [['createdAt', 'DESC']],
      attributes: ['id', 'imageUrl', 'comment'],
    });
    res.json(favorites);
  } catch (error) {
    console.error('Error fetching favorites:', error);
    res.status(500).json({ error: 'Failed to fetch favorites' });
  }
});

router.post('/', async (req, res) => {
  const { imageUrl, comment } = req.body;

  if (!imageUrl || !comment) {
    return res.status(400).json({ error: 'imageUrl and comment are required' });
  }

  try {
    const newFavorite = await Favorite.create({
      imageUrl,
      comment,
    });

    res.status(201).json({
      id: newFavorite.id,
      imageUrl: newFavorite.imageUrl,
      comment: newFavorite.comment,
    });
  } catch (error) {
    console.error('Error saving favorite:', error);
    res.status(500).json({ error: 'Failed to save favorite' });
  }
});

module.exports = router;
