const port = process.env.PORT || 5000

if (!module.parent) {
	server.listen(port, () => {
		console.log(`Running at http://localhost:${port}`)
	})
}

module.exports = server
