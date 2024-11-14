import Header from "./Header"
import Todos from "./Todos"

const Home = () => {
  return (
    <div className="flex flex-col pb-8" >
        <Header/>
        <Todos/>
    </div>
  )
}

export default Home