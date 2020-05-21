const express = require("express")
const Cabinets = require("./cabinets-model")

const router = express.Router()

router.get("/", async (req, res, next) => {
	try {
		res.json(await Cabinets.find())
	} catch(err) {
		next(err)
	}
})

router.get("/:id", async (req, res, next) => {
	try {
		const cabinet = await Cabinets.findById(req.params.id)
		if (!cabinet) {
			return res.status(404).json({
				message: "Hobbit was not found",
			})
		}

		res.json(cabinet)
	} catch(err) {
		next(err)
	}
})

router.post("/", async (req, res, next) => {
	try {
		const cabinet = await Cabinets.create(req.body)
		res.status(201).json(cabinet)
	} catch(err) {
		next(err)
	}
})

module.exports = router