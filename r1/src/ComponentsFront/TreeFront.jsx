import { useContext } from 'react';
import { useState } from 'react';
import FrontContext from './Goods/FrontContext';

function Tree({ tree }) {
  const { setCreateComments, setRating } = useContext(FrontContext);
  const [comment, setComment] = useState('');

  const [rate, setRate] = useState('5');

  const handleComment = () => {
    setCreateComments({ comment, treeId: tree.id });
    setComment('');
  };

  const rateIt = (e) => {
    setRate(e.target.value);
    setRating({ rate: parseInt(e.target.value), id: tree.id });
  };
  console.log(rate);
  return (
    <li className='list-group-item'>
      <div className='item-front'>
        <div className='content'>
          <b style={{ margin: '7px' }}>{tree.title}</b>
          <span>{['Leaf', 'Spike', 'Palm'][tree.type - 1]}</span>
          <i style={{ margin: '7px' }}>{tree.height.toFixed(2)}</i>
          <u style={{ margin: '10px', color: 'yellowGreen' }}>{tree.good}</u>
          <b className='ml-4'>
            {tree.rate_sum
              ? 'rate: ' + (tree.rate_sum / tree.rates).toFixed(2)
              : 'no rates yet'}
          </b>
        </div>
        <div className='form-group mt-3'>
          <label className='mr-2'>Rate it!</label>
          <select value={rate} onChange={rateIt}>
            {[...Array(10)].map((_, i) => (
              <option key={i} value={10 - i}>
                {10 - i}
              </option>
            ))}
          </select>
        </div>
        <ul className='list-group mt-2'>
          {tree.coms
            ? tree.coms
                .slice(0, -5)
                .split('-^o^-,')
                .map((c, i) => (
                  <li className='list-group-item' key={i}>
                    {c}
                  </li>
                ))
            : null}
        </ul>
        <div className='form-group mt-3' style={{ width: '100%' }}>
          <textarea
            className='form-control'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows='3'
            placeholder='Add your comment here...'
          ></textarea>
        </div>
        <div className='buttons'>
          <button
            type='button'
            className='btn btn-outline-success ml-2'
            onClick={handleComment}
          >
            Send
          </button>
        </div>
      </div>
    </li>
  );
}

export default Tree;
