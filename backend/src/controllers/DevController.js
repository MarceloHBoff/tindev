import api from '../services/api';
import Dev from '../models/Dev';

export default {
  async index(req, res) {
    const { user } = req.headers;

    const loggedDev = await Dev.findById(user);

    const users = await Dev.find({
      $and: [
        { _id: { $ne: user } },
        { _id: { $nin: loggedDev.likes } },
        { _id: { $nin: loggedDev.dislikes } },
      ],
    });

    return res.json(users);
  },

  async store(req, res) {
    const { username } = req.body;

    const user = await Dev.findOne({ user: username });

    if (user) return res.json(user);

    const response = await api.get(`https://api.github.com/users/${username}`);

    const { name, bio, avatar_url: avatar } = response.data;

    return res.json(
      await Dev.create({
        name,
        bio,
        user: username,
        avatar,
      })
    );
  },
};
