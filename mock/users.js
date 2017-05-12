const qs = require('qs');

const apiPrefix = '/api';

const adminUsers = [
  {
    id: 0,
    username: 'admin',
    password: 'admin',
  }, {
    id: 1,
    username: 'guest',
    password: 'guest',
  }, {
    id: 2,
    username: 'psd123',
    password: '123456',
  },
];

module.exports = {
  [`POST ${apiPrefix}/user/login`]: (req, res) => {
    const { username, password } = req.body;
    const user = adminUsers.filter(item => item.username === username);
    if (user[0] && user[0].password === password) {
      const now = new Date();
      now.setDate(now.getDate() + 1);
      res.cookie('token', JSON.stringify({ id: user[0].id, deadline: now.getTime() }), {
        maxAge: 900000,
        httpOnly: true,
      });
      res.json({ success: true, message: 'OK', user: user[0] });
    } else {
      res.status(400).send({ message: 'Bad Request' });
    }
  },
  [`GET ${apiPrefix}/user/logout`]: (req, res) => {
    res.clearCookie('token');
    res.status(200).send({ message: 'OK' });
  },
  [`GET ${apiPrefix}/userInfo`](req, res) {
    const cookie = qs.parse(req.headers.cookie, { delimiter: ';' });
    const response = {};
    const user = {};

    if (!cookie.token) {
      res.status(200).send({ message: 'Not Login' });
      return;
    }
    const token = JSON.parse(cookie.token);
    if (token) {
      response.success = token.deadline > new Date().getTime();
    }
    if (response.success) {
      const userItem = adminUsers.filter(item => item.id === token.id);
      if (userItem.length > 0) {
        user.id = userItem[0].id;
        user.username = userItem[0].username;
      }
    }
    response.user = user;
    res.json(response);
  },
  [`POST ${apiPrefix}/user/signup`]: (req, res) => {
    console.log('=====');
    setTimeout(() => {
      console.log(req.body);
      const { username, password } = req.body;
      if (username && password) {
        adminUsers.push({
          id: adminUsers.length,
          username,
          password,
        });
        res.status(200).json({ message: 'Ok', success: true });
      }
    }, 300);
  },
};
