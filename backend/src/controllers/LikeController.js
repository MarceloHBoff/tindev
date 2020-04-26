import Dev from '../models/Dev';

export default {
  async store(req, res) {
    const { user } = req.headers;
    const { id } = req.params;

    const loggedDev = await Dev.findById(user);
    const likedDev = await Dev.findById(id);

    if (!likedDev) return res.status(400).json({ error: 'Dev not exists' });

    if (likedDev.likes.includes(user)) {
      const loggedSocket = req.connectedUsers[user];
      const likedSocket = req.connectedUsers[id];

      if (loggedSocket) {
        req.io.to(loggedSocket).emit('match', likedDev);
      }

      if (likedSocket) {
        req.io.to(likedSocket).emit('match', loggedDev);
      }
    }

    loggedDev.likes.push(id);

    loggedDev.save();

    return res.json(loggedDev);
  },
};
