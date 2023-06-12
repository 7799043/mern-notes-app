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

  const [sharedUsers, setSharedUsers] = useState([]);
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
        setSharedUsers(res.data.sharedUsers); // Setting up a list of shared users
      }
    };
    getNote();
  }, [id]);

  const onChangeInput = e => {
    const { name, value } = e.target;
    if (name === 'targetUser') {
      setTargetUser(value);
    } else {
      setNote({ ...note, [name]: value });
    }
  };

  const shareNote = async e => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('tokenStore');
      if (token) {
        const { title, content, date, id } = note;
        const newNote = {
          title,
          content,
          date,
          sharedUsers,
          targetUser
        };
  
        const response = await axios.post(`/api/notes/:id`, newNote, {
          headers: { Authorization: token }
        });
  
        if (response.status === 200) {
          window.alert('Note shared. User exists in the database.');
        } else if (response.status === 404) {
          window.alert('Note was not shared. User does not exist in the database.');
        } else {
          window.alert('Note was not shared. An error occurred.');
        }
  
        return history('/');
      }
    } catch (err) {
      window.alert('Note was not shared. An error occurred.');
      window.location.href = '/';
    }
  };

  return (
    <div className="create-note">
      <h2>Share Note</h2>
      <form onSubmit={shareNote} autoComplete="off">
        <div className="row">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            value={note.title}
            id="title"
            name="title"
            required
            onChange={onChangeInput}
            readOnly
          />
        </div>

        <div className="row">
          <label htmlFor="content">Content</label>
          <textarea
            type="text"
            value={note.content}
            id="content"
            name="content"
            required
            rows="10"
            onChange={onChangeInput}
            readOnly
          />
        </div>

        <label >Date: {note.date} </label>
        
        <div className="row">
          <label htmlFor="targetUser">Target User</label>
          <input
            type="text"
            value={targetUser}
            id="targetUser"
            name="targetUser"
            onChange={onChangeInput}
          />
        </div>

        <button type="submit">Share</button>
      </form>
    </div>
  );
}
