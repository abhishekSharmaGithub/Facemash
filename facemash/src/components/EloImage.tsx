import React, { useEffect, useState } from 'react'
import myModule from './services/modules'
import Ranking from './Ranking';

const imageDir = "../../public/images/"
const imageNaming = "anime"
const arrayLength = 24;

interface SessionStorageItem {
    key: string;
    value: string;
}

const EloImage:React.FC = () => {
    const [imageArray, setImageArray] = useState<string[]>([])
    const [SessionStorageArray, setSessionStorageArray] = useState<SessionStorageItem[]>([])
    const [leftImage, setLeftImage] = useState<string>('')
    const [rightImage, setRightImage] = useState<string>('')
    const baseRating = 1000;

    useEffect(()=>{
        const tempImageArray:string[] = [];
        for(let i=1; i<arrayLength; i++) {
            const img = `${imageNaming} ${i}.jpg`
            tempImageArray.push(img);
            sessionStorage.setItem(img, baseRating.toString());
        }
        setImageArray(tempImageArray);
        setRandomImages(tempImageArray);

    },[])

    const setRandomImages = (tempImageArray:string[]) => {
        let leftImg, rightImg;

        do {
            leftImg = myModule.getRandomItem(tempImageArray);
            rightImg = myModule.getRandomItem(tempImageArray);
        } while(leftImg==rightImg)
            setLeftImage(leftImg);
            setRightImage(rightImg)

    }

    const updateEloAndDisplayImage = (leftWin:boolean) => {
        const storedLeft = sessionStorage.getItem(leftImage)??baseRating.toString();
        const storedRight = sessionStorage.getItem(rightImage)??baseRating.toString();

        const leftRating = parseFloat(storedLeft);
        const rightRating = parseFloat(storedRight);

        const result = myModule.eloRating(leftRating,rightRating,leftWin)

        sessionStorage.setItem(leftImage, result.leftRating.toFixed(3));
        sessionStorage.setItem(rightImage,result.rightRating.toFixed(3));

        if(leftWin) {
            let newRightImage;
            do {
                newRightImage = myModule.getRandomItem(imageArray);
            } while(leftImage==newRightImage)
            setRightImage(newRightImage)

        } else {
            let newLeftImage;
            do {
                newLeftImage = myModule.getRandomItem(imageArray);
            } while(rightImage==newLeftImage)
                setLeftImage(newLeftImage)
        }

        updateSessionStorageArray();
    }

    const updateSessionStorageArray = () => {
        let tempArray:SessionStorageItem[] = [];

        for(let i=0; i<sessionStorage.length; i++) {
            const key = sessionStorage.key(i);
            const value = sessionStorage.getItem(key!);    
            const floatValue = parseFloat(value!);
            
            if(!isNaN(floatValue)) {
                tempArray.push({key: key!, value: floatValue.toFixed(3)});
        }
    }
    tempArray.sort((a,b)=>parseFloat(b.value)-parseFloat(a.value))
    setSessionStorageArray(tempArray);
}

    const clickLeft = () => {
        updateEloAndDisplayImage(true);
    }
    const clickRight = () => {
        updateEloAndDisplayImage(false);
    }

  return (
    <div>
            <div className='flex m-3 space-x-3'>
            <img src={`${imageDir}${leftImage}`} className ="border border-spacing-1 border-black" alt="Left" style={{ width: '7.5rem', height: '10rem' }} onClick={clickLeft} />
            <span className='m-10 pt-8'>OR</span>
            <img src={`${imageDir}${rightImage}`} alt="Right" style={{ width: '7.5rem', height: '10rem' }} onClick={clickRight} />

            </div>
            <div>
            <Ranking SessionStorageArray={SessionStorageArray} imageDir={imageDir} />

            {/* <Link to="/ranking">
            <button className="mt-4 p-2 text-bold text-xs text-black">View Ranking</button>
            </Link> */}
            </div>
    </div>
  )
}

export default EloImage;