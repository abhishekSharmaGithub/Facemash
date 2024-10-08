import EloImage from "./EloImage"

const Home = () => {
  return (
    <div>
        <div className="justify-center text-center">
          <div className="bg-darkRed border-b-6 `border-red-500 p-3">
          <span className="text-white font-bold">FACEMASH</span>
          </div>
        </div>
        <div>
        <span className="text-black text-sm p-3 font-bold flex justify-center text-center">Were we let in for our looks? No. Will we be judged on them? Yes.
        </span>
        <span className="text-black font-bold flex justify-center text-center">Who's Hotter? Click to Choose.
        </span>
        </div>
        <div className="flex p-3 justify-center text-center">
            <EloImage />
        </div>

    </div>
  )
}

export default Home