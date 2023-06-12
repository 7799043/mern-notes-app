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
    setNote({ ...note, [name]: value });
  };

  const addSharedUser = () => {
    const user = prompt('Enter user name');
    if (user) {
      if (Array.isArray(sharedUsers)) {
        setSharedUsers([...sharedUsers, user]);
      } else {
        setSharedUsers([user]);
      }
    }
  };  

  const removeSharedUser = user => {
    const updatedUsers = sharedUsers.filter(u => u !== user);
    setSharedUsers(updatedUsers);
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
          sharedUsers
        };

        await axios.put(`/api/notes/${id}`, newNote, {
          headers: { Authorization: token }
        });

        return history('/');
      }
    } catch (err) {
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
          />
        </div>

        <label htmlFor="date">Date: {note.date} </label>
        <div className="row">
          <input type="date" id="date" name="date" onChange={onChangeInput} />
        </div>

        <div className="shared-users">
          <label htmlFor="shared-users">Shared Users:</label>
          <ul>
            {sharedUsers && sharedUsers.map(user => (
              <li key={user}>
                {user}
                <button onClick={() => removeSharedUser(user)}>Remove</button>
              </li>
            ))}
          </ul>
          <button type="button" onClick={addSharedUser}>Add User</button>
        </div>

        <button type="submit">Save</button>
      </form>
    </div>
  );
}
