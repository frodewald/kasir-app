import React from 'react'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { numberWithCommas } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const ModalKeranjang = ({ show, handleClose, cartDetail, jumlah, keterangan, tambah, kurang, totalHarga, handlerSubmit, handlerKeteranganChange, hapusPesanan }) => {
  if(cartDetail) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cartDetail.products.nama} {" "}
            <strong>
              (Rp. {numberWithCommas(cartDetail.products.harga)})
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handlerSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Total Harga:</Form.Label>
              <p> 
                <strong>
                  Rp. {numberWithCommas(totalHarga)}
                </strong>
              </p>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Jumlah: </Form.Label>
              <br />
              <Button variant='primary' size='sm' className='me-2' onClick={() => kurang()}>
                <FontAwesomeIcon icon={faMinus}/>
              </Button>
              <strong>
                {jumlah}
              </strong>
              <Button variant='primary' size='sm' className='ms-2' onClick={() => tambah()}>
                <FontAwesomeIcon icon={faPlus}/>
              </Button>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Keterangan</Form.Label>
              <Form.Control as="textarea" rows={3} 
                name='keterangan' 
                placeholder='Contoh: Pedas, Asin, Porsi Banyakan' 
                value={keterangan} 
                onChange={(event) => handlerKeteranganChange(event)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => hapusPesanan(cartDetail.products.id)}>
            <FontAwesomeIcon icon={faTrash}/> Hapus Pesanan
          </Button>
        </Modal.Footer>
      </Modal>
    )
  } else {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Kosong</Modal.Title>
        </Modal.Header>
        <Modal.Body>Kosong</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    )
  }
}

export default ModalKeranjang