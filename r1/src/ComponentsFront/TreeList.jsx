import { useContext } from 'react';
import Tree from './TreeFront';
import FrontContext from './Goods/FrontContext';

function List() {
  const { trees } = useContext(FrontContext);
  console.log('trees', trees);

  return (
    <div className='card mt-4'>
      <div className='card-header'>
        <h2>List of Trees</h2>
      </div>
      <div className='card-body'>
        <ul className='list-group'>
          {trees
            ? trees.map((tree) => <Tree key={tree.id} tree={tree} />)
            : null}
        </ul>
      </div>
    </div>
  );
}

export default List;
