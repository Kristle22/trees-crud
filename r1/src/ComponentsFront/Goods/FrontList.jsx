import { useContext } from 'react';
import Good from './FrontGood';
import FrontContext from './FrontContext';

function List() {
  const { goods } = useContext(FrontContext);
  console.log('goods', goods);

  return (
    <div className='card mt-4 mb-4'>
      <div className='card-header'>
        <h2>List of Goods</h2>
      </div>
      <div className='card-body'>
        <ul className='list-group'>
          {goods
            ? goods.map((good) => <Good key={good.id} good={good} />)
            : null}
        </ul>
      </div>
    </div>
  );
}

export default List;
