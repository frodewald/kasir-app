import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/esm/Row';
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';
import ListGroup from 'react-bootstrap/ListGroup';
import { numberWithCommas } from '../utils/utils';
import TotalBayar from './TotalBayar';
import { useState } from 'react';
import ModalKeranjang from './ModalKeranjang';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../utils/constants';
import { Card } from 'react-bootstrap';

const Hasil = ({ carts, updateCarts }) => {
  const [show, setShow] = useState(false);
  const [cartDetail, setCartDetail] = useState(false);
  const [jumlah, setJumlah] = useState(0);
  const [keterangan, setKeterangan] = useState('');
  const [totalHarga, setTotalHarga] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = (cart) => {
    setShow(true);
    setCartDetail(cart);
    console.log(cartDetail);
    setJumlah(cart.jumlah);
    setKeterangan(cart.keterangan);
    setTotalHarga(cart.total_harga);
  }

  const tambahJumlahMakanan = () => {
    setJumlah(jumlah + 1);
    setTotalHarga(cartDetail.products.harga * (jumlah + 1))
  }
  const kurangJumlahMakanan = () => {
    if(jumlah !== 1) {
      setJumlah(jumlah - 1);
      setTotalHarga(cartDetail.products.harga * (jumlah - 1))
    }
  }

  const handlerKeteranganChange = (event) => {
    setKeterangan(event.target.value)
  }

  const handlerSubmit = async (event) => {
    event.preventDefault();

    handleClose();

    const getCartByIdProduct = await axios.get(`${API_URL}/api/carts/${cartDetail.products.id}`);

    if(getCartByIdProduct.status === 200 && getCartByIdProduct.data.length !== 0) {
      await axios.put(`${API_URL}/api/carts/update/${cartDetail.products.id}`, {
        jumlah: jumlah,
        total_harga: totalHarga,
        keterangan: keterangan
      });
      Swal.fire({
        title: "Update Pesanan Sukses!",
        text: `${cartDetail.products.nama} berhasil diupdate`,
        icon: "success"
      });
    }
    const getCartData = await axios.get(`${API_URL}/api/carts/`);
    updateCarts(getCartData.data);
  }

  const hapusPesanan = async (id) => {
    const hapusPesananDariKeranjang = await axios.delete(`${API_URL}/api/carts/delete/${id}`)

    if(hapusPesananDariKeranjang.status === 200) {
      handleClose();
      Swal.fire({
        title: "Berhasil Menghapus Pesanan!",
        text: `${cartDetail.products.nama} berhasil dihapus`,
        icon: "success"
      });
      const getCartData = await axios.get(`${API_URL}/api/carts/`);
      updateCarts(getCartData.data);
    } else {
      Swal.fire({
        title: "Gagal Menghapus Pesanan!",
        text: `${cartDetail.products.nama} gagal dihapus`,
        icon: "danger"
      });
    }
  }

  return (
    <Col md={3} className='mt-3'>
      <h4><strong>Hasil</strong></h4>
      <hr />
        {carts.length !== 0 && (
          <Card className='overflow-auto hasil'>
            <ListGroup variant="flush">
              {carts.map((cart, index) => (
                <ListGroup.Item key={index} onClick={() => handleShow(cart)}>
                  <Row>
                    <Col xs={3}>
                      <h4>
                      <Stack direction="horizontal" gap={2}>
                        <Badge pill bg="success">
                          {cart.jumlah}
                        </Badge>
                      </Stack>
                      </h4>
                    </Col>
                    <Col>
                      <h5>{cart.products.nama}</h5>
                      <p>Rp. {numberWithCommas(cart.products.harga)}</p>
                    </Col>
                    <Col>
                      <strong className='float-end'>Rp. {numberWithCommas(cart.total_harga)}</strong>
                    </Col>
                  </Row>
                  { cart.keterangan !== '' &&
                    <Row>
                      <Col>
                        <p className='mb-1'><strong>Keterangan:</strong></p>
                        <Card className='mx-auto'>
                        <p className='fs-6 text-muted mx-1'>{cart.keterangan}</p>
                        </Card>
                      </Col>
                    </Row>
                  }
                </ListGroup.Item>
              ))}
            <ModalKeranjang 
              handleClose={handleClose} 
              show={show} 
              cartDetail={cartDetail} 
              jumlah={jumlah} 
              keterangan={keterangan}
              totalHarga={totalHarga}
              tambah={tambahJumlahMakanan}
              kurang={kurangJumlahMakanan} 
              handlerKeteranganChange={handlerKeteranganChange}
              handlerSubmit={handlerSubmit}
              hapusPesanan={hapusPesanan}
            />
            </ListGroup>
          </Card>
        )}
      <TotalBayar carts={carts} />
    </Col>
  )
}

export default Hasil