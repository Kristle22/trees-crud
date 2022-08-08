import { useContext } from 'react';
import GoodContext from './GoodContext';

function Good({ good }) {
  const { setDeleteData } = useContext(GoodContext);

  const handleDelete = () => {
    setDeleteData(good);
  };

  return (
    <li className='list-group-item'>
      <div className='item'>
        <div className='content'>
          <b>{good.title}</b>
        </div>
        <div className='buttons'>
          {good.trees_count ? (
            '(' + good.trees_count + ')'
          ) : (
            <button
              type='button'
              className='btn btn-outline-danger ml-2'
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </li>
  );
}

export default Good;
