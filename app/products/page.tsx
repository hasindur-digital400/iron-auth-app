import serverInstance from '@/lib/axios/serverInstance'

type Props = {}

interface ProductInterface {
  id?: number
  title?: string
  price?: number
  description?: string
  category?: {
    id?: number
    name?: string
    image?: string
  }
  images?: string[]
}

export default async function Products({}: Props) {
  const { data: products, status } = await serverInstance.get('/products')

  return (
    <div>
      <h1 className='text-3xl font-bold'>Products</h1>
      <p>This is a public page</p>
      <p className='text-xl font-semibold my-5'>
        Number of products: {products.length}
      </p>
      {status === 200 && (
        <ul>
          {products.map((product: ProductInterface) => (
            <li key={product.id} className='w-full py-2 shadow'>
              {product.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
