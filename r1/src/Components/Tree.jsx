import { useContext } from 'react';
import TreeContext from './TreeContext';

function Tree({ tree }) {
  const { setDeleteData, setModalData, handleDeleteComment } =
    useContext(TreeContext);

  const handleDelete = () => {
    setDeleteData(tree);
  };

  const handleModal = () => {
    setModalData(tree);
  };
  console.log(tree.good);

  return (
    <li className='list-group-item'>
      <div className='item'>
        <div className='content'>
          <b>{tree.title}</b>
          <span>{['Leaf', 'Spike', 'Palm'][tree.type - 1]}</span>
          <i>{tree.height.toFixed(2)}</i>
          <u style={{ marginLeft: '10px', color: 'yellowGreen' }}>
            {tree.good}
          </u>
        </div>
        <div className='buttons'>
          <button
            type='button'
            className='btn btn-outline-success'
            onClick={handleModal}
          >
            Edit
          </button>
          <button
            type='button'
            className='btn btn-outline-danger ml-2'
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
      <ul className='list-group mt-2'>
        {tree.coms
          ? tree.coms
              .slice(0, -5)
              .split('-^o^-,')
              .map((c, i) => (
                <li className='list-group-item' key={i}>
                  <div>{c}</div>
                  <button
                    type='button'
                    className='btn btn-outline-danger mt-3'
                    onClick={() =>
                      handleDeleteComment(tree.coms_id.split(',')[i])
                    }
                  >
                    Delete
                  </button>
                </li>
              ))
          : null}
      </ul>
    </li>
  );
}

export default Tree;
