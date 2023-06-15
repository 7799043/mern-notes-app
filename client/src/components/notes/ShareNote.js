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

  const handleShare = async (e) => {
    e.preventDefault();
    try {
      
      const token = localStorage.getItem('tokenStore');
      const shareData = {
        targetUser: targetUser,
        noteId: note.id
      };

      const res = await axios.post('/api/note/share', shareData, {
        headers: { Authorization: token }
      });

      console.log('Note shared successfully:', res.data);
      setTargetUser(''); 
    } catch (error) {
      console.error('Error sharing note:', error.message);
    }
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
