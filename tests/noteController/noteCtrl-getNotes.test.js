const request = require('supertest');
const app = require('../../server');
const Notes = require('../../models/noteModel');

describe('Note API', () => {
  let createdNoteId;

  // Przed testami: utwórz notatkę testową
  // beforeAll(async () => {
  //   const noteData = {
  //     title: 'Test Note',
  //     content: 'This is a test note.',
  //     date: '2023-06-21',
  //   };
  beforeAll(async () => {
    const note1 = new Notes({
      title: 'Note 1',
      content: 'Lorem ipsum dolor sit amet',
      date: Date.now(),
      user_id: 'user1',
      name: 'User 1',
    });
    await note1.save();
    const createdNote = await Notes.findOne({ title: note1.title });
    createdNoteId = createdNote._id;
    // const response = await request(app).post('/api/notes').send(note1);
    // console.log(response.body); 
    console.log(createdNoteId);
    createdNoteId = createdNote._id;
  });

  // Po testach: usuń notatkę testową
  afterAll(async () => {
    await request(app).delete(`/api/notes/${createdNoteId}`);
  });

  describe('POST /api/notes', () => {
    it('should create a new note', async () => {
      const noteData = {
        title: 'Test Note',
        content: 'This is a test note.',
        date: '2023-06-21',
      };

      const response = await request(app).post('/api/notes').send(noteData);

      expect([200, 201]).toContain(response.status);
      expect(response.body).toHaveProperty('msg', 'Created a Note');

      createdNoteId = response.body.note._id;
    });

//     it('should return an error if required fields are missing', async () => {
//       const noteData = {
//         content: 'This is a test note.',
//         date: '2023-06-21',
//       };

//       const response = await request(app).post('/api/notes').send(noteData);

//       expect(response.status).toBe(500);
//       expect(response.body).toHaveProperty('msg');
//     });
//   });

//   describe('GET /api/notes/:id', () => {
//     it('should return a specific note', async () => {
//       const response = await request(app).get(`/api/notes/${createdNoteId}`);

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('title', 'Test Note');
//       expect(response.body).toHaveProperty('content', 'This is a test note.');
//       expect(response.body).toHaveProperty('date', '2023-06-21');
//       // Dodaj inne oczekiwane właściwości notatki
//     });

//     it('should return an error for an invalid note ID', async () => {
//       const invalidNoteId = 'invalid_note_id';

//       const response = await request(app).get(`/api/notes/${invalidNoteId}`);

//       expect(response.status).toBe(500);
//       expect(response.body).toHaveProperty('msg');
//     });
//   });

//   describe('PUT /api/notes/:id', () => {
//     it('should update a specific note', async () => {
//       const updatedNoteData = {
//         title: 'Updated Note',
//         content: 'This is an updated note.',
//         date: '2023-06-22',
//       };

//       const response = await request(app)
//         .put(`/api/notes/${createdNoteId}`)
//         .send(updatedNoteData);

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('msg', 'Updated a Note');
//     });

//     it('should return an error for an invalid note ID', async () => {
//       const invalidNoteId = 'invalid_note_id';
//       const updatedNoteData = {
//         title: 'Updated Note',
//         content: 'This is an updated note.',
//         date: '2023-06-22',
//       };

//       const response = await request(app)
//         .put(`/api/notes/${invalidNoteId}`)
//         .send(updatedNoteData);

//       expect(response.status).toBe(500);
//       expect(response.body).toHaveProperty('msg');
//     });
//   });

//   describe('DELETE /api/notes/:id', () => {
//     it('should delete a specific note', async () => {
//       const response = await request(app).delete(`/api/notes/${createdNoteId}`);

//       expect(response.status).toBe(200);
//       expect(response.body).toHaveProperty('msg', 'Deleted a Note');
//     });

//     it('should return an error for an invalid note ID', async () => {
//       const invalidNoteId = 'invalid_note_id';

//       const response = await request(app).delete(`/api/notes/${invalidNoteId}`);

//       expect(response.status).toBe(500);
//       expect(response.body).toHaveProperty('msg');
//     });
//   });

//   describe('POST /api/notes/share', () => {
//     it('should share a note with another user', async () => {
//       // Przygotuj dane notatki i docelowego użytkownika
//       const noteData = {
//         title: 'Shared Note',
//         content: 'This is a shared note.',
//         date: '2023-06-23',
//       };
//       const targetUser = 'target_user_id';

//       // Utwórz notatkę
//       const createNoteResponse = await request(app).post('/api/notes').send(noteData);
//       const createdNoteId = createNoteResponse.body.note._id;

//       // Podziel notatkę
//       const shareNoteResponse = await request(app)
//         .post('/api/notes/share')
//         .send({ targetUser, noteId: createdNoteId });

//       expect(shareNoteResponse.status).toBe(200);
//       expect(shareNoteResponse.body).toHaveProperty('msg', 'Note shared successfully');
//     });

//     it('should return an error for an invalid note ID', async () => {
//       const invalidNoteId = 'invalid_note_id';
//       const targetUser = 'target_user_id';

//       const response = await request(app)
//         .post('/api/notes/share')
//         .send({ targetUser, noteId: invalidNoteId });

//       expect(response.status).toBe(404);
//       expect(response.body).toHaveProperty('msg', 'Note not found');
//     });
//   });
// });
