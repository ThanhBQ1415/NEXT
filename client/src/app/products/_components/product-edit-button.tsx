'use client'
import DeleteProduct from '@/app/products/_components/delete-product'
import { Button } from '@/components/ui/button'
import { ProductListResType } from '@/schemaValidations/product.schema'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ProductEditButton({
  product
}: {
  product: ProductListResType['data'][0]
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  
  // Check authentication status using axios
  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('sessionToken')
      setIsAuthenticated(Boolean(token))
    } catch (error) {
      console.error('Error checking authentication:', error)
      setIsAuthenticated(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  if (!isAuthenticated) return null

  return (
    <div className='flex space-x-2 items-start'>
      <Link href={`/products/${product.id}/edit`}>
        <Button variant={'outline'}>Edit</Button>
      </Link>
      <DeleteProduct product={product} />
    </div>
  )
}


