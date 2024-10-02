import Card from '../components/Card'
import { useContext } from 'react'
import { Context } from '../context/Context'
import Controls from '../components/Controls'

const Page = () => {
  const { notes } = useContext(Context)

  return (
    <div>
      {notes.map((note) => (
        <Card note={note} key={note.$id} />
      ))}
      <Controls />
    </div>
  )
}

export default Page