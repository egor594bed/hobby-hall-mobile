import React, {FC} from 'react'
import { FlatList, RefreshControl, Text, View } from 'react-native'
import { IProduct } from '../../types/ICatalog'

interface IProductItem {
  data: IProduct
}

export const CatalogProductItem: FC<IProductItem> = ({data}) => {
  return (
    <Text>{data.name}</Text>
  )
}
