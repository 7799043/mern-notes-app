import React from 'react'
import Header from './notes/Nav'
import Home from './notes/Home'
import CreateNote from './notes/CreateNote'
import EditNote from './notes/EditNote'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ShareNote from './notes/ShareNote'

export default function Notes({ setIsLogin }) {
  return (
    <Router>
      <div className="notes-page">
        <Header setIsLogin={setIsLogin} />
        <section>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<CreateNote />} />
            <Route path="/edit/:id" element={<EditNote />} />
            <Route path="/share/:id" element={<ShareNote />} />
          </Routes>
        </section>
      </div>
    </Router>
  );
}