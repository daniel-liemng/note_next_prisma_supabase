'use client';

import { Note } from '@/types/Note';
import axios from 'axios';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import NoteItem from './NoteItem';
import { useAppStore } from '@/store/store';
import { FormData } from '@/app/page';

interface NoteListProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

const NoteList: React.FC<NoteListProps> = ({ formData, setFormData }) => {
  const [notes, setNotes] = useState<Note[]>([]);

  const refetch = useAppStore((state) => state.refetch);

  useEffect(() => {
    const getAllNotes = async () => {
      try {
        const { data } = await axios.get('http://localhost:3000/api/posts');

        setNotes(data);
      } catch (err: any) {
        console.log(`Error: ${err}`);
      }
    };

    getAllNotes();
  }, [refetch]);

  return (
    <div className='w-full'>
      <h4 className='text-3xl text-blue-500 my-5'>Note List</h4>
      <div className='w-full'>
        {notes?.map((note) => (
          <NoteItem
            note={note}
            key={note?.id}
            formData={formData}
            setFormData={setFormData}
          />
        ))}
      </div>
    </div>
  );
};

export default NoteList;
