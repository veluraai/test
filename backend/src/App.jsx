import { useEffect, useState } from 'react'
import supabase from './supabase'

function App() {
  const [data, setData] = useState([])

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from('test')
        .select('*')

      if (error) {
        console.error(error)
      } else {
        console.log(data)
        setData(data)
      }
    }

    fetchData()
  }, [])

  return (
    <div>
      <h1>Supabase Data:</h1>

      {data.map((item, index) => (
        <p key={index}>{item.name || "No name"}</p>
      ))}
    </div>
  )
}

export default App