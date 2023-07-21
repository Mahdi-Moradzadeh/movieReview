const router = require('express').Router();
const { User, Watchlist, Movie } = require('../../models/');
// - /api/watchlist

// GET all watchlists
router.get('/', async (req, res) => {
  if (req.session.logged_in) {
    try {
      console.log('its working ');
      const watchlistData = Watchlist.findAll({
        include: [{ model: User }],
      });
      res.status(200).json(watchlistData);
    } catch (err) {
      res.status(422).json(err);
    }
  } else {
    res
      .status(401)
      .json({ message: 'You must be logged in to view this page.' });
  }
});

router.get('/:id', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const watchlistData = await Watchlist.findByPk(req.params.id, {
        include: [{ model: User }],
      });
      if (!watchlistData) {
        res.status(404).json({ message: 'No watchlist found with this id!' });
        return;
      } else {
        res.status(200).json(watchlistData);
      }
      res.status(200).json(watchlistData);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res
      .status(401)
      .json({ message: 'You must be logged in to view this page.' });
  }
});

// POST one watchlist
router.post('/:movie', async (req, res) => {
  if (req.session.logged_in) {
    try {
      const watchlistData = await Watchlist.create({
        imdb_id: req.params.movie,
        user_id: req.session.user_id,
      });
      res.status(200).json(watchlistData);
    } catch (err) {
      console.error(err);
      res.status(400).json(err);
    }
  } else {
    res
      .status(401)
      .json({ message: 'You must be logged in to view this page.' });
  }
});

module.exports = router;
