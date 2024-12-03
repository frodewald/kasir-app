import Col from 'react-bootstrap/Col'
import Card from 'react-bootstrap/Card';
import {numberWithCommas} from '../utils/utils';

const Menus = ({ menu, masukKeranjang }) => {
  return (
    <Col md={4} xs={6} className='mb-4'>
      <Card className='shadow' style={{ height: '100%'}} onClick={() => masukKeranjang(menu)}>
        <div className="image-wrapper">
          <Card.Img 
            variant="top" 
            src={`assets/images/${menu.category.nama.toLowerCase()}/${menu.gambar}`} 
            className="card-image"
          />
        </div>
        <Card.Body className='text-center'>
          <Card.Title>{menu.nama}</Card.Title>
          <Card.Title><strong>({menu.kode})</strong></Card.Title>
          <Card.Text>
            Rp.{numberWithCommas(menu.harga)}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}

export default Menus