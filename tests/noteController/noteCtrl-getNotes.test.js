const request = require('supertest');
const app = require('../../server');
const Notes = require('../../models/noteModel');
const jwt = require('jsonwebtoken');

describe('GET /api/notes', () => {

    beforeAll(async () => {
        const note1 = new Notes({
            title: 'Note 1',
            content: 'Lorem ipsum dolor sit amet',
            date: Date.now(),
            user_id: 'user1',
            name: 'User 1',
        });
        await note1.save();
    });

    afterAll(async () => {

        await Notes.deleteMany({});
    });

    it('should return all notes for a user', async () => {
        const userToken = jwt.sign({ id: 'user1' }, 'smacznejkawusi007');

        const response = await request(app)
            .get('/api/notes')
            .set('Authorization', `Bearer ${userToken}`);


            expect(response.body).toBeDefined();
    })
})
