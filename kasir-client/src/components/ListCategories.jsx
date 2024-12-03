import Col from 'react-bootstrap/Col';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constants';
import ListGroup from 'react-bootstrap/ListGroup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUtensils, faCoffee, faCheese} from '@fortawesome/free-solid-svg-icons';

const Icon = ({nama}) => {
  if(nama === "Makanan") return <FontAwesomeIcon icon={faUtensils} className='p-2'/>
  if(nama === "Minuman") return <FontAwesomeIcon icon={faCoffee} className='p-2'/>
  if(nama === "Cemilan") return <FontAwesomeIcon icon={faCheese} className='p-2'/>

  return <FontAwesomeIcon icon={faUtensils} className='p-2'/> 
}

const ListCategories = ({ changeCategory, choosenCategory }) => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/categories/`);
        setCategories(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch data');
      } 
    }
    fetchCategoriesData();
  }, [])

  return (
    <Col md={2} className='mt-3'>
      <h4><strong>Daftar Kategori</strong></h4>
      <hr />
      <ListGroup>
        {categories && categories.map((category) => (
          <ListGroup.Item 
            key={category.id} 
            className={`d-flex align-items-center ${choosenCategory === category.nama ? 'active-category' : ''}`}
            onClick={() => changeCategory(category.nama)}
            style={{cursor: "pointer"}}
          >
            <Icon nama={category.nama} />
            <h6 className='mb-0 ml-2'>{category.nama}</h6>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Col>
  )
}

export default ListCategories