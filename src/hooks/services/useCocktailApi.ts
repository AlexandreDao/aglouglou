import axios from 'axios'

const instance = axios.create({
  baseURL: `${process.env.EXPO_PUBLIC_COCKTAILDB_API_URL}/${process.env.EXPO_PUBLIC_COCKTAILDB_API_KEY}`,
  timeout: 7000,
})

const cocktailApiSingleton = () => instance

export default cocktailApiSingleton
