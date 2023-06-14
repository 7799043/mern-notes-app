import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function ShareNote() {
  const [note, setNote] = useState({
    title: '',
    content: '',
    date: '',
    id: ''
  });

  const [targetUser, setTargetUser] = useState('');

  const history = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getNote = async () => {
      const token = localStorage.getItem('tokenStore');
      if (id) {
        const res = await axios.get(`/api/notes/${id}`, {
          headers: { Authorization: token }
        });
        setNote({
          title: res.data.title,
          content: res.data.content,
          date: new Date(res.data.date).toLocaleDateString(),
          id: res.data._id
        });
      }
    };
    getNote();
  }, [id]);

  const handleShare = (e) => {
    e.preventDefault();
    // Implement your share logic here, e.g., send the targetUser and note.id to the server
    console.log('Share note with user:', targetUser);
    setTargetUser(''); // Clear the targetUser input field after sharing
  };

  return (
    <div className="create-note">
      <h2>Share Note</h2>
      <div>
        <h3>{note.title}</h3>
        <p>{note.content}</p>
        <p>Date: {note.date}</p>
      </div>
      <form autoComplete="off" onSubmit={handleShare}>
        <div className="row">
          <label htmlFor="targetUser">Target User</label>
          <input
            type="text"
            value={targetUser}
            id="targetUser"
            name="targetUser"
            onChange={(e) => setTargetUser(e.target.value)}
          />
        </div>
        <button type="submit">Share</button>
      </form>
    </div>
  );
}
