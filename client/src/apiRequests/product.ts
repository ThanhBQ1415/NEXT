import http from '@/lib/http'
import { MessageResType } from '@/schemaValidations/common.schema'
import {
  CreateProductBodyType,
  ProductListResType,
  ProductResType,
  UpdateProductBodyType
} from '@/schemaValidations/product.schema'
import axios from 'axios'
const productApiRequest = {

  
  getList: async () => {
    try {
      const response = await axios.get<ProductListResType>('/products');
      return response.data;
    } catch (error) {
      throw error;
    }
  },




  getDetail: (id: number) => http.get<ProductResType>(`/products/${id}`),
  create: (body: CreateProductBodyType) =>
    http.post<ProductResType>('/products', body),
  update: (id: number, body: UpdateProductBodyType) =>
    http.put<ProductResType>(`/products/${id}`, body),
  uploadImage: (body: FormData) =>
    http.post<{
      message: string
      data: string
    }>('/media/upload', body),
  delete: (id: number) => http.delete<MessageResType>(`/products/${id}`)
}

export default productApiRequest
