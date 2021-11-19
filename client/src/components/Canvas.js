import React, { useEffect, useRef, useState } from 'react'
import imageService from '../services/images'

const start_background_color = "white"
const undo_array = []

const Canvas =()=>{

    const canvasRef = useRef(null)
    const contextRef = useRef(null)
    const [isDrawing, setIsDrawing] = useState(false)
    const [isReset, setIsReset] = useState()
    const [savedImages, setSavedImages] = useState([])


    useEffect(() => {
        setIsReset(false)
        const canvas = canvasRef.current;
        canvas.width = 600;
        canvas.height = 400;
        canvas.style.width = `${canvas.width}px`
        canvas.style.height = `${canvas.height}px`
        
        const context = canvas.getContext("2d")

        context.fillStyle = start_background_color;
        context.fillRect(0, 0, canvas.width, canvas.height);

        imageService
            .getAllImages()
            .then(data => {
                // console.log(data)
                setSavedImages(data.images)
        })
        
        

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
        setSavedImages([...savedImages, {drawing_src: newSavedImage}])
        imageService.addImage({
            drawing_src: `${newSavedImage}`,
            userid: 1
        })
    }

    const loadImage = (evt)=>{
        evt.preventDefault()
        contextRef.current.putImageData(savedImages[0], 0, 0);
    }

    const handleAddImage = (userId, newImageData) => {
        imageService
          .addImage({
            user: userId,
            imageArr: newImageData
          })
      }

    return (
        <div className="canvas-holder">
            <h1>Pictionary with Friends!!</h1>
            <canvas
                onMouseDown={startDrawing}
                onMouseUp={finishDrawing}
                onMouseMove={draw}
                onMouseLeave={leaveCanvas}
                ref={canvasRef}
            />
            <div className="saved-images">
                <h3>saved images</h3>
                {savedImages ? 
                    savedImages.map((image, key)=>(
                        <img key={key} className="drawing" alt='saved drawing' src={image.drawing_src}></img>
                    ))
                    :null
                }
                    
                
            </div>
            <input onInput={(evt)=>colorPicker(evt)} type="color" class="color-picker"></input>
            <input onChange={(evt)=>penSize(evt)} type="range" min="1" max="100" class="pen-range" step="1" ></input>
            <button onClick={(evt)=>setEraser(evt)} type="button" className="eraser">Erase</button>
            
            <button onClick={(e)=>clearDrawing(e)} type="button" className="button">Clear</button>
            <button onClick={(e)=>undoLast(e)} type="button" className="button">Undo</button>
            <button onClick={(e)=>saveImages(e)} type="button" className="button">Save</button>
            <button onClick={(e)=>loadImage(e)} type="button" className="button">Load</button>
        </div> 
    )
}

export default Canvas