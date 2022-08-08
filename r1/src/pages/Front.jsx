import { useState, useEffect } from 'react';
import axios from 'axios';
// import GoodFrontContext from '../ComponentsFront/GoodFrontContext';
import FrontContext from '../ComponentsFront/Goods/FrontContext';
// import ListFront from '../ComponentsFront/ListFront';
import GoodList from '../ComponentsFront/Goods/FrontList';
import TreeList from '../ComponentsFront/TreeList';

function Front() {
  const [lastUpdate, setLastUpdate] = useState(new Date());

  const [trees, setTrees] = useState(null);
  const [goods, setGoods] = useState(null);
  const [createComments, setCreateComments] = useState(null);
  const [rating, setRating] = useState(null);

  // // READ TREES
  // useEffect(() => {
  //   axios.get('http://localhost:3003/medziai').then((res) => {
  //     setTrees(res.data);
  //   });
  // }, [lastUpdate]);

  // // READ GOODS
  // useEffect(() => {
  //   axios.get('http://localhost:3003/gerybes').then((res) => {
  //     setGoods(res.data);
  //   });
  // }, [lastUpdate]);

  // READ GOODS with tree titles
  useEffect(() => {
    axios.get('http://localhost:3003/front/gerybes').then((res) => {
      console.log(res.data);
      setGoods(res.data);
    });
  }, [lastUpdate]);

  // READ TREES
  useEffect(() => {
    axios.get('http://localhost:3003/front/medziai').then((res) => {
      setTrees(res.data);
    });
  }, [lastUpdate]);

  // CREATE comments
  useEffect(() => {
    if (null === createComments) return;
    axios
      .post('http://localhost:3003/front/komentarai', createComments)
      .then((res) => {
        console.log('res data', res.data);
        setLastUpdate(Date.now());
      });
  }, [createComments]);
  useEffect(() => {
    if (null === rating) return;
    axios
      .put('http://localhost:3003/front/balsuok/' + rating.id, rating)
      .then((res) => {
        console.log('rating', res.data);
        setLastUpdate(Date.now());
      });
  }, [rating]);

  return (
    <FrontContext.Provider
      value={{ goods, trees, setCreateComments, setRating }}
    >
      {/* <ListFront /> */}
      <div className='container'>
        <div className='row'>
          <div className='col-5'>
            <GoodList />
          </div>
          <div className='col-7'>
            <TreeList />
          </div>
        </div>
      </div>
    </FrontContext.Provider>
  );
}

export default Front;
