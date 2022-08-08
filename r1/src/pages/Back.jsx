import { useEffect, useState } from 'react';
// import './App.scss'
import '../bootstrap.css';
import '../crud.scss';
import Create from '../Components/Create';
import List from '../Components/List';
import Edit from '../Components/Edit';
import TreeContext from '../Components/TreeContext';
import axios from 'axios';
import Message from '../Components/Message';
import GoodContext from '../Components/Goods/GoodContext';
import CreateGoods from '../Components/Goods/Create';
import ListGoods from '../Components/Goods/List';

function Back() {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  //USESTATE////////////TREES///////////////
  const [trees, setTrees] = useState(null);
  const [createData, setCreateData] = useState(null);
  const [deleteData, setDeleteData] = useState(null);
  const [modalData, setModalData] = useState(null);
  const [editData, setEditData] = useState(null);

  //USESTATE/////////////GOODS//////////////
  const [goods, setGoods] = useState(null);
  const [createDataGoods, setCreateDataGoods] = useState(null);
  const [deleteDataGoods, setDeleteDataGoods] = useState(null);

  const [message, setMessage] = useState(null);
  const [disableCreate, setDisableCreate] = useState(false);

  useEffect(() => {
    // setInterval(() => setLastUpdate(Date.now()), 3000);
  }, []);

  //AXIOS///////////////TREES//////////////
  // Read
  useEffect(() => {
    axios.get('http://localhost:3003/medziai').then((res) => {
      setTrees(res.data);
    });
  }, [lastUpdate]);

  //Create
  useEffect(() => {
    if (null === createData) return;
    axios
      .post('http://localhost:3003/medziai', createData)
      .then((res) => {
        showMessge(res.data.msg);
        console.log('res data', res.data);
        setLastUpdate(Date.now());
      })
      .catch((error) => {
        showMessge({ text: error.message, type: 'danger' });
      })
      .then(() => {
        setDisableCreate(false);
      });
  }, [createData]);

  // Delete
  useEffect(() => {
    if (null === deleteData) return;
    axios
      .delete('http://localhost:3003/medziai/' + deleteData.id)
      .then((res) => {
        showMessge(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteData]);

  // Edit
  useEffect(() => {
    if (null === editData) return;
    axios
      .put('http://localhost:3003/medziai/' + editData.id, editData)
      .then((res) => {
        showMessge(res.data.msg);
        setLastUpdate(Date.now());
      });
    setLastUpdate(Date.now());
  }, [editData]);

  //AXIOS/////////////GOODS//////////////
  // Create
  useEffect(() => {
    if (null === createDataGoods) return;
    axios.post('http://localhost:3003/gerybes', createDataGoods).then((res) => {
      console.log('res data', res.data);
      setLastUpdate(Date.now());
    });
  }, [createDataGoods]);

  // Read
  useEffect(() => {
    axios.get('http://localhost:3003/gerybes').then((res) => {
      console.log('data', res.data);
      setGoods(res.data);
    });
  }, [lastUpdate]);

  // Delete
  useEffect(() => {
    if (null === deleteDataGoods) return;
    axios
      .delete('http://localhost:3003/gerybes/' + deleteDataGoods.id)
      .then((res) => {
        showMessge(res.data.msg);
        setLastUpdate(Date.now());
      });
  }, [deleteDataGoods]);

  const showMessge = (msg) => {
    setMessage(msg);
    setTimeout(() => setMessage(null), 5000);
  };

  // DELETE COMMENT
  const handleDeleteComment = (id) => {
    axios.delete('http://localhost:3003/komentarai/' + id).then((res) => {
      console.log('res data', res.data);
      setLastUpdate(Date.now());
    });
  };

  return (
    <TreeContext.Provider
      value={{
        trees,
        setCreateData,
        setDeleteData,
        setModalData,
        modalData,
        setEditData,
        message,
        disableCreate,
        setDisableCreate,
        goods,
        handleDeleteComment,
      }}
    >
      <GoodContext.Provider
        value={{
          setCreateData: setCreateDataGoods,
          setDeleteData: setDeleteDataGoods,
          goods,
        }}
      >
        <div className='container'>
          <div className='row'>
            <div className='col-4'>
              <Create />
              <CreateGoods />
              <ListGoods />
            </div>
            <div className='col-8'>
              <List />
            </div>
          </div>
        </div>
        <Edit />
        <Message />
      </GoodContext.Provider>
    </TreeContext.Provider>
  );
}
export default Back;
