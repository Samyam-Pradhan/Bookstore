const axios = require('axios');

const getNYTBooks = async (req, res) => {
  try {
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?api-key=${process.env.NYT_API_KEY}`;
    const response = await axios.get(url);

    res.status(200).json(response.data);
  } catch (error) {
    console.error('Error fetching NYT books:', error.message);
    res.status(500).json({ message: 'Failed to fetch NYT books' });
  }
};

module.exports = { getNYTBooks };
