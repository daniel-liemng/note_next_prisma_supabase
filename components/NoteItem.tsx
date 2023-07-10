import { Note } from '@/types/Note';
import { Button } from './ui/button';
import axios from 'axios';
import { useAppStore } from '@/store/store';
import { Dispatch, SetStateAction } from 'react';
import { FormData } from '@/app/page';

interface NoteItemProps {
  note: Note;
  formData: FormData;
  setFormData: Dispatch<SetStateAction<FormData>>;
}

const NoteItem: React.FC<NoteItemProps> = ({ note, formData, setFormData }) => {
  const toggleRefetch = useAppStore((state) => state.toggleRefetch);

  const handleUpdate = (note: Note) => {
    setFormData({
      id: note.id,
      title: note.title,
      content: note.content,
    });
  };

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:3000/api/posts/${id}`);

      toggleRefetch();
    } catch (err: any) {
      console.log(`Error: ${err}`);
    }
  };
  return (
    <div className='flex justify-between items-center w-full'>
      <div className='flex-1'>
        <h4 className='text-xl text-blue-500 my-3'>{note.title}</h4>
        <p className='text-base text-gray-500 mb-2'>{note.content}</p>
      </div>

      <div>
        <Button
          type='button'
          variant='secondary'
          onClick={() => handleUpdate(note as Note)}
        >
          Update
        </Button>
        <Button
          type='button'
          variant='destructive'
          onClick={() => handleDelete(note.id)}
        >
          Delete
        </Button>
      </div>
      <hr />
    </div>
  );
};

export default NoteItem;
