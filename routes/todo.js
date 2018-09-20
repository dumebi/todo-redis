const express = require('express');
const router = express.Router();
const redis = require('redis');
client = redis.createClient();
const {promisify} = require('util');
const getAsync = promisify(client.get).bind(client);

/**
 * Post Route: Create a todo
 */
router.post('/todo/create', async (req, res) => {
    const id = req.body.id,
    title = req.body.title,
    description = req.body.description;
    try {
        let result = await client.set(id, JSON.stringify({"title": title, "description": description}));
        if(result){
            return res.status(200).json({ status: 'success', data: 'Todo created successfully' });
        } else {
            return res.status(500).json({ status: 'failed', data: 'Error creating todo' });
        }
    } catch (err) {
        return res.status(500).json({ status: 'failed', data: 'Error creating todo' });
    }
});

/**
 * GET Route: Get todo
 */
router.get('/todo/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const details = await getAsync(id);
        console.log(details)
        if (details != null) {
            return res.status(200).json({ status: 'success', data: JSON.parse(details) });
        } else {
            return res.status(200).json({ status: 'success', data: JSON.parse(details) });
        }
        // getAsyncid, (err, result) => {
        //     if (err) {
        //         return res.status(500).json({ status: 'failed', data: 'Error getting todo' });
        //     } else {
        //         return res.status(200).json({ status: 'success', data: JSON.parse(result) });
        //     }
        //   });
    } catch (err) {
        return res.status(500).json({ status: 'failed', data: 'Error getting todo' });
    }
});

/**
 * PUT Route: update a todo
 */
router.put('/todo/:id', async (req, res) => {
    const id = req.params.id;
    title = req.body.title,
    description = req.body.description;
    try {
        let result = await client.set(id, JSON.stringify({"title": title, "description": description}));
        if(result){
            return res.status(200).json({ status: 'success', data: 'Todo updated successfully' });
        } else {
            return res.status(500).json({ status: 'failed', data: 'Error updating todo' });
        }
    } catch (err) {
        return res.status(500).json({ status: 'failed', data: 'Error updating todo' });
    }
});

/**
 * DELETE Route: delete a todo
 */
router.delete('/todo/:id', async (req, res) => {
    const id = req.params.id;
    try {
        let result = await client.del(id);
        if(result){
            return res.status(200).json({ status: 'success', data: 'Todo deleted successfully' });
        } else {
            return res.status(500).json({ status: 'failed', data: 'Error deleting todo' });
        }
      } catch (err) {
        return res.status(500).json({ status: 'failed', data: 'Error deleting todo' });
      }
});



module.exports = router;