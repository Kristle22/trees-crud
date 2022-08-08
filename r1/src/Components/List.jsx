import Tree from './Tree';
import { useContext } from 'react';
import TreeContext from './TreeContext';

function List() {
  const { trees } = useContext(TreeContext);

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
