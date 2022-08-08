import { useContext } from 'react';
import { useState } from 'react';
import GoodContext from './GoodContext';

function Create() {
  const { setCreateData } = useContext(GoodContext);

  const [title, setTitle] = useState('');

  const handleCreate = () => {
    const data = { title };
    setCreateData(data);
    setTitle('');
  };

  return (
    <div className='card mt-4'>
      <div className='card-header'>
        <h2>Create new Good</h2>
      </div>
      <div className='card-body'>
        <div className='form-group'>
          <label>Title</label>
          <input
            type='text'
            className='form-control'
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <small className='form-text text-muted'>Enter Good title here.</small>
        </div>
        <button
          type='button'
          className='btn btn-outline-primary'
          onClick={handleCreate}
        >
          Create
        </button>
      </div>
    </div>
  );
}

export default Create;
