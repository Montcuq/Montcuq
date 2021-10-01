const request = require('supertest')
const app = require('../app')
const User = require('../../models/User');
jest.spyOn(User.prototype, 'save')
    .mockImplementation(() => Promise.resolve('success'))

jest.spyOn(User, 'findOne')
    .mockImplementation(() => {
        const user = new User();
        user.pseudo = 'hubert';
        user.email = 'hubert@delabath.fr';
        user.password = '$2b$10$VPdArdIumkiswQgS4CyxSO7gks7GNyFMdcxdRDlpjsn4XFN5YtUbi';
        return Promise.resolve(user);
    })

describe('UserController', () => {
    it('should create a new post', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                pseudo: 'hubert',
                email: 'hubert@delabath.fr',
                password: 'delabath',
            })
        expect(res.statusCode).toEqual(201)
    })

    it('should not create a new user (email fail)', async () => {
        const res = await request(app)
            .post('/api/auth/signup')
            .send({
                pseudo: 'hubert',
                email: 'hubertisnotanemail',
                password: 'delabath',
            })
        expect(res.statusCode).toEqual(400)
    })

    it('should login', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                pseudo: 'hubert',
                password: 'delabath',
            })
        expect(res.statusCode).toEqual(201)
    })

    it('should not login (password fail)', async () => {
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                pseudo: 'hubert',
                password: 'fail',
            })
        expect(res.statusCode).toEqual(401)
    })

    it('should get weather of montcuq', async () => {
        const res = await request(app)
            .get('/api/auth/weather/Montcuq')
        expect(res.statusCode).toEqual(201)
    })

    it('should get weather of anus', async () => {
        const res = await request(app)
            .get('/api/auth/weather/Fouronnes')
        expect(res.statusCode).toEqual(201)
    })

    it('should get weather of le fion', async () => {
        const res = await request(app)
            .get('/api/auth/weather/Chevenoz')
        expect(res.statusCode).toEqual(201)
    })

    it('should get weather of duranus', async () => {
        const res = await request(app)
            .get('/api/auth/weather/Duranus')
        expect(res.statusCode).toEqual(201)
    })

    it('should get weather of froiscul', async () => {
        const res = await request(app)
            .get('/api/auth/weather/Moyeuvre-Grande')
        expect(res.statusCode).toEqual(201)
    })

    it('should post translate', async () => {
        const res = await request(app)
            .post('/api/auth/translate')
            .send({
                source: 'en',
                target: 'fr',
                message: 'hi'
            })
        expect(res.statusCode).toEqual(201)
    })
})
