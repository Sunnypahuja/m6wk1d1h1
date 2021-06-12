const mongoose = require('mongoose')
mongoose.set('useFindAndModify', false)
const Inventory = mongoose.model('Inventory')

const createInventory = async (req, res) => {
    const {prodname, qty, price, status} = req.body
    const inventory = new Inventory({prodname, qty, price, status})
    // Save Inventory in the MongoDB
    inventory.save()
        .then((data) => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json({
                message: 'Fail!!!',
                err: err.mesage
            })
        })
}
const getInventory = async (req, res) => {
    const {id} = req.params
    Inventory.findById(id)
        .select('-__v')
        .then((inventory) => {
            res.status(200).json(inventory)
        })
        .catch((err) => {
            if (err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: 'Inventory not found with id ' + id,
                    error: err
                })
            }
            return res.status(500).send({
                message: 'Error retrieving Inventory with id ' + id,
                error: err
            })
        })
}
const inventories = async (req, res) => {
    Inventory.find()
        .select('-__v')
        .then((inventories) => {
            return res.status(200).json(inventories)
        })
        .catch((err) => {
            console.log({error})

            return res.status(500).json({
                message: 'Error!!!',
                error: err
            })
        })

}
const deleteInventory = async (req, res) => {
    const {id} = req.params
    Inventory.findByIdAndDelete(id)
        .select('-__v-_id')
        .then((invetory) => {
            if (!invetory) {
                return res.status(404).json({
                    message: 'No Inventory found with id = ' + id,
                    error: "404"
                })
            }
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Error -> Can\'t delete inventory with id =' + id,
                error: err
            })
        })
}

const updateInventory = async (req, res) => {
    const {prodname, qty, price, status, id} = req.body
    // Find Inventory and update it
    Inventory.findByIdAndUpdate(id, {prodname, qty, price, status}, {new: false})
        .select('-__v')
        .then((inventory) => {
            if (!inventory) {
                return res.status(404).json({
                    message: 'Can\'t update inventory with id =' + id,
                    error: "Not Found"
                })
            }
            res.status(200).json(inventory)
        })
        .catch((err) => {
            return res.status(500).json({
                message: 'Error -> Can\'t update inventory with id =' + id,
                error: err
            })
        })

}

module.exports = {
    createInventory,
    getInventory,
    inventories,
    updateInventory,
    deleteInventory
}