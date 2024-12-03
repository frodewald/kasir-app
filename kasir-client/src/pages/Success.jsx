import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Image } from 'react-bootstrap'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from '../utils/constants'

const Success = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const deleteCartData = async () => {
      try {
        setLoading(true);
        await axios.delete(`${API_URL}/api/carts/deleteAll`)
        setError(null);
      } catch (err) {
        setError('Failed to fetch data', err);
      } finally {
        setLoading(false); 
      }
    }
    deleteCartData();
  })

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className='mt-4 text-center'>
      <Image src='assets/images/success.png' width="500"></Image>
      <h2>Pesanan Sukses!</h2>
      <p>Terima kasih sudah meemsan!</p>
      <Button variant="primary" as={Link} to="/">
        Kembali
      </Button>
    </div>
  )
}

export default Success