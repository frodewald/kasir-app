import '../App.css'
import { ListCategories, Hasil, Menus } from '../components';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import { useState, useEffect } from 'react';
import { API_URL } from '../utils/constants';
import axios from 'axios';
import Swal from 'sweetalert2'
import ReactLoading from 'react-loading';

function Home() {
  const [menus, setMenus] = useState([]);
  const [choosenCategory, setChoosenCategory] = useState('Makanan');
  const [carts, setCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_URL}/api/products/${choosenCategory}`);
        setMenus(response.data);
        setError(null);

        // mengambil data cart
        const getCartData = await axios.get(`${API_URL}/api/carts/`);
        setCarts(getCartData.data);
      } catch (err) {
        setError('Failed to fetch data');
      } finally {
        setLoading(false); 
      }
    }
    fetchProductData();
  }, [choosenCategory]);

  function changeCategory (value) {
    if(value !== choosenCategory) {
      setChoosenCategory(value);
      setMenus([]);
    }
  }

  function updateCartsFromHasil (value) {
    setCarts(value);
  }

  async function masukKeranjang (value) {   
    try {
      const getCartByIdProduct = await axios.get(`${API_URL}/api/carts/${value.id}`);
      const cartDataById = getCartByIdProduct.data;
      console.log(cartDataById)
      if(getCartByIdProduct.status === 200 && getCartByIdProduct.data.length !== 0) {
        await axios.put(`${API_URL}/api/carts/update/${value.id}`, {
          jumlah: cartDataById.jumlah + 1,
          total_harga: cartDataById.products.harga * (cartDataById.jumlah + 1),
          keterangan: ''
        });
        Swal.fire({
          title: "Sukses",
          text: `${value.nama} berhasil masuk keranjang`,
          icon: "success"
        });
      } else {
        await axios.post(`${API_URL}/api/carts/inserts`, {
          product: value,
          keterangan: ''
        });
        Swal.fire({
          title: "Sukses",
          text: `${value.nama} berhasil masuk keranjang`,
          icon: "success"
        });
      }
      const getCartData = await axios.get(`${API_URL}/api/carts/`);
      setCarts(getCartData.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
    } finally {
      setLoading(false); 
    }
  }

  // if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <>
    {loading && 
      <div className="position-absolute top-0 start-0 w-100 h-100 bg-dark bg-opacity-50" style={{ zIndex: 1050 }}>
        <ReactLoading type='spin' color='white' height={'5%'} width={'5%'} className='position-absolute top-50 start-50 translate-middle'/>
      </div>
    }
      <Container fluid>
        <div className="mt-3">
          <Row>
            <ListCategories changeCategory={changeCategory} choosenCategory={choosenCategory} />
            <Col>
              <h4 className='mt-3'><strong>Daftar Produk</strong></h4>
              <hr />
              <Row className='overflow-auto menu'>
                { menus && menus.map((menu) => (
                  <Menus
                    key={menu.id}
                    menu={menu}
                    masukKeranjang={masukKeranjang}
                  />
                ))}
              </Row>
            </Col>
            <Hasil carts={carts} updateCarts={updateCartsFromHasil} />
          </Row>
        </div>
      </Container>
    </>
  )
}

export default Home
