import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import imageService from '../services/images'
import Footer from './Footer'
import Navbar from './Navbar'

const start_background_color = "white"
const undo_array = []

const Canvas =()=>{

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const canvasContainer = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [isReset, setIsReset] = useState()
    const [savedImages, setSavedImages] = useState([])
    const [showSaved, setShowSaved] = useState(false)
    const userID = useSelector(state => state.user.userID)


    useEffect(() => {
        setIsReset(false)
        const canvas = canvasRef.current;
        canvas.width = canvasContainer.current.offsetWidth;
        canvas.height = 400;
        canvas.style.width = `${canvas.width}px`
        canvas.style.height = `${canvas.height}px`
        
        const context = canvas.getContext("2d")

        context.fillStyle = start_background_color;
        context.fillRect(0, 0, canvas.width, canvas.height);
        console.log(userID)
        
        // context.scale(2,2)
        context.lineCap = 'round'
        context.strokeStyle = 'black'
        context.lineWidth = 5
        contextRef.current = context
    }, [isReset])

    const startDrawing =({nativeEvent})=>{
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.beginPath()
        contextRef.current.moveTo(offsetX, offsetY)
        setIsDrawing(true)
    }

    const finishDrawing =()=>{
        
        setIsDrawing(false)
        contextRef.current.closePath()
        undo_array.push(contextRef.current.getImageData(0, 0, 600, 400));
        console.log(undo_array)
    }

    const leaveCanvas =()=>{
        setIsDrawing(false)
        contextRef.current.closePath()
    }

    const draw =({nativeEvent})=>{
        if (!isDrawing){
            return
        }
        const {offsetX, offsetY} = nativeEvent
        contextRef.current.lineTo(offsetX, offsetY)
        contextRef.current.stroke()
    }

    const colorPicker =(evt)=>{
        contextRef.current.strokeStyle = evt.target.value
    }
    
    const penSize=(evt) =>{
        contextRef.current.lineWidth = evt.target.value
    }

    const clearDrawing=(e)=>{
        e.preventDefault()
        setIsReset(true)
    }

    const undoLast = (evt) =>{
        evt.preventDefault()
        undo_array.pop();
        if(undo_array.length > 0){
            
            contextRef.current.putImageData(undo_array[undo_array.length-1], 0, 0);
            console.log(undo_array)
        }
        if(undo_array.length === 0){
            clearDrawing(evt)
        }
    }

    const setEraser = (evt) =>{
        evt.preventDefault()
        contextRef.current.strokeStyle = start_background_color
    }

    const saveImages =(evt)=>{
        console.log(savedImages)
        evt.preventDefault()     
        
        let canvas = canvasRef.current
        let newSavedImage = canvas.toDataURL()
        savedImages ? setSavedImages([...savedImages, {drawing_src: newSavedImage}]) : setSavedImages([{drawing_src: newSavedImage}])
        console.log(userID)
        imageService.addImage({
            drawing_src: `${newSavedImage}`,
            userid: userID
        })
    }

    const _handleGallery =(evt) =>{
        evt.preventDefault()
        showSaved ? setShowSaved(false) : setShowSaved(true)
        imageService
            .getAllImages({
              userId: userID
            })
            .then(data => {
                // console.log(data)
                setSavedImages(data.images)
        })
    }

    return (
        <>
            <div className="container px-4 mx-auto flex flex-wrap items-center justify-between"
            >
                <Navbar draw />
                <div className="canvas-holder rounded" ref={canvasContainer} >
                
                    <h1 class="text-6xl font-normal leading-normal mt-0 mb-2 text-black-800">
                        Let's Draw
                    </h1>
                    <canvas
                        onMouseDown={startDrawing}
                        onMouseUp={finishDrawing}
                        onMouseMove={draw}
                        onMouseLeave={leaveCanvas}
                        onTouchStart={startDrawing}
                        onTouchEnd={finishDrawing}
                        onTouchMove={draw}
                        ref={canvasRef}
                        className="canvas-screen"
                        
                    />
                    
                    <div className="button-bar">
                        <input onInput={(evt)=>colorPicker(evt)} type="color" className="rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" ></input>
                        <input onChange={(evt)=>penSize(evt)} type="range" min="1" max="100" class="pen-range" step="1" id="range"></input>
                        
                        <button onClick={(evt)=>setEraser(evt)} type="button" className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" ><i className="fas fa-eraser"/></button>
                        <button onClick={(e)=>undoLast(e)} type="button" className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"><i className="fas fa-undo"/></button>
                        <button onClick={(e)=>clearDrawing(e)} type="button" className="bg-red-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"><i className="fas fa-trash-alt"/></button>
                        
                        <button onClick={(e)=>saveImages(e)} type="button" className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"><i className="fas fa-save"/></button>
                        {/* <button onClick={(e)=>loadImage(e)} type="button" className="button"><i className="fas fa-load"/></button> */}
                    </div>
                    <div className="gallery">
                        <button 
                            className="bg-indigo-500 text-white active:bg-indigo-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" 
                            type="button"
                            onClick={(evt)=>_handleGallery(evt)}
                        >
                            <i className="fas fa-images"></i>
                            Gallery
                        </button>
                        {showSaved ? 
                            <div className="saved-images">
                                {savedImages ? 
                                    savedImages.map((image, key)=>(
                                        <a className="drawing" href={image.drawing_src} target="_blank" rel="noreferrer">
                                            <img key={key} alt='saved drawing' src={image.drawing_src}></img>
                                        </a>
                                    ))
                                    :null
                                }
                            </div>
                            : null
                        }
                    </div>
                </div> 
            </div>
            <Footer />
        </>
    )
}

export default Canvas