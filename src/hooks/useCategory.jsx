import { useContext } from 'react'
import CategoryContext from '../context/CategoriesProvider'

const useCategory = () => {
    return useContext(CategoryContext)
}

export default useCategory;