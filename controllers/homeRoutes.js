const router = require('express').Router();
const {User} = require('../models');
router.get('/', (req, res) => {
  console.log(req.yelpinfo)
    res.render('home'); // Adjust the path to your HTML file
  });
   
  router.get('/login',(req,res) =>{
    res.render('login')
  })

  //CREATE NEW USER
  router.post('/create-account', async (req, res) => {
    try {
      const { email, password, phoneNumber } = req.body;
     User.create({
        email: email,
        password: password,
        phoneNumber: phoneNumber
      });
      
      return res.status(200).json('Ahuevo');
  
  
    } catch (error) {
      console.error('Account creation failed:', error);
      res.status(500).send('Account creation failed. Please try again.');
    }
  });

//   router.post('/login', async (req, res) => {
//   try {
//     const dbUserData = await User.findOne({
//       where: {
//         email: req.body.email,
//       },
//     });
    
//     if (!dbUserData) {
//       console.log(res.status(400).json({ message: 'Incorrect email or password. Please try again!' }));
//     }
    
//     const validPassword = await dbUserData.checkPassword(req.body.password);

//     if (!validPassword) {
//       return res.status(400).json({ message: 'Incorrect email or password. Please try again!' });
//     }

//     req.session.save(() => {
//       req.session.logged_in = true;
//       res.status(200).json({ user: dbUserData, message: 'You are now logged in!' });
//     });
//   } catch (error) {
//     console.error('Login failed:', error);
//     res.status(500).json(error);
//   }
// });

  router.get('/create-account',(req,res) =>{
    res.render('create-account')
  })

  module.exports = router;
