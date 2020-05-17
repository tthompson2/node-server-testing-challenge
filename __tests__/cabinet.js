const supertest = require("supertest")
const server = require("../index")
const db = require("../data/config")

beforeEach(async () => {
    await db.seed.run()
})

afterAll(async () => {
    await db.destroy()
})

describe("cabinet integration tests", () => {
    it("GET /cabinets", async () => {
        const res = await supertest(server).get("/cabinets");
        expect(res.statusCode).toBe(200);
    })

    it("GET /cabinets/:id", async () => {
        const res = await supertest(server).get("/cabinets/2")
        expect(res.statusCode).toBe(200);
        expect(res.type).toBe("application/json");
    })

    it ("GET /cabinets/:id (not found", async () => {
        const res = await supertest(server).get("/hobbits/50");
        expect(res.statusCode).toBe(404)
    })
    it("POST /cabinets", async () => {
        const data = { name: "space invaders"}
        const res = await supertest(server).post("/cabinets").send(data)
        expect(res.statusCode).toBe(201);
        expect(res.type).toBe("application/json")
        expect(res.body.name).toBe("space invaders")
    })
})