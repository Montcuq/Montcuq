const request = require("supertest");
const app = require("../app");

describe('ServiceController', () => {

    it('should get weather of montcuq', async () => {
        const res = await request(app)
            .get('/api/service/weather/Montcuq')
        expect(res.statusCode).toEqual(201)
    })

    it('should get weather of anus', async () => {
        const res = await request(app)
            .get('/api/service/weather/Fouronnes')
        expect(res.statusCode).toEqual(201)
    })

    it('should get weather of le fion', async () => {
        const res = await request(app)
            .get('/api/service/weather/Chevenoz')
        expect(res.statusCode).toEqual(201)
    })

    it('should get weather of duranus', async () => {
        const res = await request(app)
            .get('/api/service/weather/Duranus')
        expect(res.statusCode).toEqual(201)
    })

    it('should get weather of froiscul', async () => {
        const res = await request(app)
            .get('/api/service/weather/Moyeuvre-Grande')
        expect(res.statusCode).toEqual(201)
    })

    it('should post translate', async () => {
        const res = await request(app)
            .post('/api/service/translate')
            .send({
                source: 'en',
                target: 'fr',
                message: 'hi'
            })
        expect(res.statusCode).toEqual(201)
    })
})
