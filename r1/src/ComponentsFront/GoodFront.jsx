import { useContext } from 'react';
import FrontContext from './FrontContext';

function GoodFront({ trees, good }) {
  console.log('trees', trees);
  console.log('good', good);
  const { setComments, setRating } = useContext(FrontContext);

  const handleComments = () => {
    setComments(good);
  };
  const handleRating = () => {
    setRating(good);
  };

  return (
    <li className='list-group-item'>
      <div className='item'>
        <div
          className='content'
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'start',
          }}
        >
          <b>{good.title}:</b>{' '}
          {trees.map((tree) => (
            <i key={tree.id}>{tree.good === good.title ? tree.title : ''}</i>
          ))}
        </div>
        <div className='buttons'>
          <button
            type='button'
            className='btn btn-outline-success ml-2'
            onClick={handleComments}
          >
            Comment
          </button>
          <button
            type='button'
            className='btn btn-outline-danger ml-2'
            onClick={handleRating}
          >
            Rating
          </button>
        </div>
      </div>
    </li>
  );
}

export default GoodFront;
