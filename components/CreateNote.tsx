'use client';

import { Dispatch, SetStateAction, useState } from 'react';
import axios from 'axios';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useAppStore } from '@/store/store';
import { FormData } from '@/app/page';

// interface FormData {
//   title: string;
//   content?: string;
// }

interface CreateNoteProps {
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

const CreateNote: React.FC<CreateNoteProps> = ({ formData, setFormData }) => {
  const toggleRefetch = useAppStore((state) => state.toggleRefetch);

  const createNote = async (noteData: FormData) => {
    try {
      await axios.post('http://localhost:3000/api/posts', noteData);

      setFormData({
        title: '',
        content: '',
      });

      toggleRefetch();
    } catch (err: any) {
      console.log(`Error: ${err}`);
    }
  };

  const updateNote = async (noteData: FormData) => {
    try {
      await axios.patch(
        `http://localhost:3000/api/posts/${noteData.id}`,
        noteData
      );

      setFormData({
        title: '',
        content: '',
      });

      toggleRefetch();
    } catch (err: any) {
      console.log(`Error: ${err}`);
    }
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    formData.id ? await updateNote(formData) : await createNote(formData);
  };

  return (
    <div>
      <h4 className='text-3xl text-blue-500 my-5'>
        {formData.id ? 'Edit Note' : 'Add Note'}
      </h4>
      <form onSubmit={handleSubmit}>
        <Input
          placeholder='Title'
          name='title'
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className='mb-3'
        />
        <Textarea
          placeholder='content'
          name='content'
          value={formData.content}
          onChange={(e) =>
            setFormData({ ...formData, content: e.target.value })
          }
          className='mb-3'
        />
        <Button type='submit' className='mt-3'>
          {formData.id ? 'Edit' : 'Add'}
        </Button>
        {formData.id && (
          <Button
            onClick={() => setFormData({ title: '', content: '' })}
            type='button'
            variant='secondary'
            className='ml-2 mt-3'
          >
            Cancel
          </Button>
        )}
      </form>
    </div>
  );
};

export default CreateNote;
