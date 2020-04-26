import Dev from '../models/Dev';

export default {
  async store(req, res) {
    const { user } = req.headers;
    const { id } = req.params;

    const loggedDev = await Dev.findById(user);
    const likedDev = await Dev.findById(id);

    if (!likedDev) return res.status(400).json({ error: 'Dev not exists' });

    if (likedDev.likes.includes(user)) console.log('Deu match');

    loggedDev.dislikes.push(id);

    loggedDev.save();

    return res.json(loggedDev);
  },
};
