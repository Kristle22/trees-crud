import GoodFront from './GoodFront';
import { useContext } from 'react';
import FrontContext from './FrontContext';

function ListFront() {
  const { trees, goods } = useContext(FrontContext);

  return (
    <div className='card mt-4 mb-4'>
      <div className='card-header'>
        <h2>List of Goods</h2>
      </div>
      <div className='card-body'>
        <ul className='list-group'>
          {goods
            ? goods.map((good) => (
                <GoodFront key={good.id} good={good} trees={trees} />
              ))
            : null}
        </ul>
      </div>
    </div>
  );
}

export default ListFront;
