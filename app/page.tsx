'use client';

import CreateNote from '@/components/CreateNote';
import NoteList from '@/components/NoteList';
import { useState } from 'react';

export interface FormData {
  id?: number;
  title: string;
  content?: string;
}

const HomePage = () => {
  const [formData, setFormData] = useState<FormData>({
    title: '',
    content: '',
  });

  return (
    <div className='container'>
      <h1 className='text-4xl text-blue-500 my-4 text-center'>Note</h1>
      <CreateNote formData={formData} setFormData={setFormData} />
      <NoteList formData={formData} setFormData={setFormData} />
    </div>
  );
};

export default HomePage;
