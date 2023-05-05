const router = require('express').Router();
const asyncHandler = require('express-async-handler');
const cloudinary = require('../configs/cloudinary');
const upload = require('../middlewares/multer');
const Avatar = require('../models/avatar.model');

// POST UPLOAD FILES
router.post('/add', upload.single('avatar'), asyncHandler(async(req, res) => {
    try {
        const result = await cloudinary.uploader.upload(req.file.path);

        console.log(result);

        // Create Uploads
        // let imageUploads = new Avatar({
        //     name: req.body.name,
        //     avatar: result.secure_url,
        //     cloudinary_id: result.public_id
        // });

        let imageUploads = new Avatar({
            name: req.body.name,
            avatar: result.secure_url,
            cloudinary_id: result.public_id,
            width: result.width,
            height: result.height,
            format: result.format,
            bytes: result.bytes,
            resource_type: result.resource_type
        });

        // Save Uploads to MongoDB Atlas
        const createdImages = await imageUploads.save();
        res.status(201).json(createdImages);
    } catch (err) {
        console.log(err);
    }
}));

// get all avatars
router.get('/', asyncHandler(async(req, res) => {

    try{
        let avatars = await Avatar.find().lean();
        res.send(avatars);
    } catch(err){
        console.log(err);
    }
}));

// get a avatar by id
router.get('/:id', asyncHandler(async(req, res) => {
    try{
        let createdImage = await Avatar.findById(req.params.id);
        res.send(createdImage);
    } catch(err){
        console.log(err);
    }
}));

// update avatar by id
router.put('/update/:id', upload.single('avatar'), asyncHandler(async (req, res) => {

    try {
  
      let imageUploads = await Avatar.findById(req.params.id);
      await cloudinary.uploader.destroy(imageUploads.cloudinary_id)
  
      const result = await cloudinary.uploader.upload(req.file.path)
  
      const { name } = req.body;
  
      dataUpdate = {
        name: name || imageUploads.name,
        avatar: result.secure_url || imageUploads.avatar,
        cloudinary_id: result.public_id || user.cloudinary_id
      }
      imageUploads = await Avatar.findByIdAndUpdate(req.params.id, dataUpdate, { new: true })
      res.status(201).json(imageUploads);
  
  
    } catch (err) {
      console.log(err)
      throw new Error('Upload Cannot Be Found')
    }
  
  }));

  // delete avatar by id
  router.delete('/delete/:id', asyncHandler(async(req, res) => {
    try {
        const imageUploadsId = await Avatar.findById(req.params.id);

        await cloudinary.uploader.destroy(imageUploadsId.cloudinary_id);

        await imageUploadsId.deleteOne();
        res.json({
            Message: 'Avatar deleted'
        })
    } catch(err) {
        console.log(err);
    }
  }));

  router.delete('/delete', asyncHandler(async(req, res) => {
    await Avatar.deleteMany();
    res.send('Deleted all avatar ok');
  }));

  router.get('/images/jpg', asyncHandler(async(req, res) => {
    try {
        const result = await Avatar.find({
            format: 'jpg'
        });
        res.status(200).json(result);
    } catch(err) {
     console.log(err);   
    }
  }));

router.get('/images/png', asyncHandler(async(req, res) => {
    try {
        const result = await Avatar.find({
            format: 'png'
        });
        res.status(200).json(result);
    } catch(err) {
     console.log(err);   
    }
  }));

module.exports = router;
