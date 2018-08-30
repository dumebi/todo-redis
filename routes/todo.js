const express = require('express');
const router = express.Router();
const redis = require('redis');
client = redis.createClient();

/**
 * Post Route: Create a todo
 */
router.post('/todo/create', async (req, res) => {
    const id = req.body.id,
    title = req.body.title,
    description = req.body.description;
    try {
        client.hmset(id, ["title", title, "description", description], (err, result) => {
            if (err) {
                return res.status(500).json({ status: 'failed', data: 'Error creating todo' });
            } else {
                return res.status(200).json({ status: 'success', data: 'Todo created successfully' });
            }
        });
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
        client.hgetall(id, (err, result) => {
            if (err) {
                return res.status(500).json({ status: 'failed', data: 'Error getting todo' });
            } else {
                return res.status(200).json({ status: 'success', data: result });
            }
          });
    } catch (err) {
        return res.status(500).json({ status: 'failed', data: 'Error getting todo' });
    }
});

/**
 * PUT Route: update a todo
 */
router.put('/todo/:id', async (req, res) => {
    const id = req.params.id;
    update = [];
    for (const i in req.body) {
      update.push(i, req.body[i]);
    }

    try {
        client.hmset(id, update, (err, result) => {
            if (err) {
                return res.status(500).json({ status: 'failed', data: 'Error updating todo' });
            } else {
                return res.status(200).json({ status: 'success', data: 'Todo updated successfully' });
            }
        });
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
        client.del(id, (err, result) => {
            if (err) {
                return res.status(500).json({ status: 'failed', data: 'Error deleting todo' });
            } else {
                return res.status(200).json({ status: 'success', data: 'Todo deleted successfully' });
            }
        });
      } catch (err) {
        return res.status(500).json({ status: 'failed', data: 'Error deleting todo' });
      }
});



module.exports = router;