import React from 'react'
import { Row, Col, Button } from 'react-bootstrap'
import { numberWithCommas } from '../utils/utils'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'
import { API_URL } from '../utils/constants'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

const TotalBayar = ({ carts }) => {
  const navigate = useNavigate();
  function submitTotalBayar (totalBayar) {
    if(carts.length === 0) {
      return Swal.fire({
        title: "keranjang tidak boleh kosong",
        text: `Minimal harus beli satu menu lah sebelum checkout`,
        icon: "error"
      });
    }
    const order = {
      total_bayar: totalBayar,
      menus: carts
    }

    axios.post(`${API_URL}/api/orders/create`, order)
      .then((res) => {
        console.log(res.data);
        navigate('/success')
      }).catch((err) => {
        console.log(err);
      })
  }

  const totalBayar = carts.reduce((totalHarga, totalHargaPerKeranjang) => {
    return totalHarga + totalHargaPerKeranjang.total_harga
  }, 0);

  return (
    <>
      {/* Web */}
      <div className='fixed-bottom d-none d-md-block'>
        <Row>
          <Col md={{ span: 3, offset: 9 }} className='px-4'>
            <h6 className='mb-3'>Total Harga: <strong className='float-end me-2'>Rp. {numberWithCommas(totalBayar)} </strong></h6>
            <div className='d-grid gap-2 mb-2'>
              <Button variant='primary' onClick={ () => submitTotalBayar(totalBayar)}>
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
      
      {/* Mobile */}
      <div className='d-md-none d-sm-block'>
        <Row>
          <Col md={{ span: 3, offset: 9 }} className='px-4'>
            <h6 className='mb-3'>Total Harga: <strong className='float-end me-2'>Rp. {numberWithCommas(totalBayar)} </strong></h6>
            <div className='d-grid gap-2 mb-2'>
              <Button variant='primary' onClick={ () => submitTotalBayar(totalBayar)}>
              <FontAwesomeIcon icon={faShoppingCart} /> <strong>BAYAR</strong>
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default TotalBayar