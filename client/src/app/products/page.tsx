// Cấu hình để Next.js luôn tạo mới trang khi có request
export const dynamic = 'force-dynamic'

// Import các module cần thiết
import productApiRequest from '@/apiRequests/product'
import Image from 'next/image'
import Link from 'next/link'
import { Metadata } from 'next'
import ProductEditButton from '@/app/products/_components/product-edit-button'
import ProductAddButton from '@/app/products/_components/product-add-button'

// Cấu hình metadata cho SEO
export const metadata: Metadata = {
  title: 'Danh sách sản phẩm',
  description: 'Danh sách sản phẩm của Productic, được tạo bởi Được dev'
}

// Component chính hiển thị danh sách sản phẩm
export default async function ProductListPage() {
  // Khởi tạo biến lưu danh sách sản phẩm
  const { payload } = await productApiRequest.getList()
  let productList = payload.data

  // Thử lấy danh sách sản phẩm từ API
  try {
    const { payload } = await productApiRequest.getList()
    productList = payload?.data || []
  } catch (error) {
    console.error('Lỗi tải danh sách sản phẩm:', error)
  }

  return (
    // Container chính với khoảng cách giữa các phần tử
    <div className="space-y-4">
      {/* Tiêu đề trang */}
      <h1 className="text-2xl font-bold">Danh sách sản phẩm</h1>
      {/* Nút thêm sản phẩm mới */}
      <ProductAddButton />

      {/* Hiển thị bảng nếu có sản phẩm, ngược lại hiển thị thông báo */}
      {productList.length > 0 ? (
        // Container cho bảng có thể cuộn ngang
        <div className="overflow-x-auto">
          {/* Bảng hiển thị danh sách sản phẩm */}
          <table className="min-w-full border border-gray-300">
            {/* Phần đầu bảng */}
            <thead className="bg-gray-100">
              <tr className="border-b">
                <th className="p-3 text-left">Hình ảnh</th>
                <th className="p-3 text-left">Tên sản phẩm</th>
                <th className="p-3 text-left">Giá</th>
                <th className="p-3 text-left">Hành động</th>
              </tr>
            </thead>
            {/* Phần thân bảng */}
            <tbody>
              {/* Lặp qua từng sản phẩm để hiển thị */}
              {productList.map((product) => (
                <tr key={product.id} className="border-b">
                  {/* Ô hiển thị hình ảnh sản phẩm */}
                  <td className="p-3">
                    <Link href={`/products/${product.id}`}>
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={80}
                        height={80}
                        className="w-20 h-20 object-cover rounded-md"
                      />
                    </Link>
                  </td>
                  {/* Ô hiển thị tên sản phẩm */}
                  <td className="p-3">{product.name}</td>
                  {/* Ô hiển thị giá sản phẩm đã được format */}
                  <td className="p-3 text-red-500 font-bold">
                    {new Intl.NumberFormat('vi-VN', {
                      style: 'currency',
                      currency: 'VND'
                    }).format(product.price)}
                  </td>
                  {/* Ô chứa nút chỉnh sửa sản phẩm */}
                  <td className="p-3 text-left">
                    <ProductEditButton product={product} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        // Hiển thị khi không có sản phẩm nào
        <p className="text-gray-500">Không có sản phẩm nào.</p>
      )}
    </div>
  )
}