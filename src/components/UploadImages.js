import {useEffect, useState} from "react";

export default function UploadImages({onImagesChanged}){
    const [images,setImages]=useState([]);
    const [imagesURLs , setImagesURLs]= useState([]);

    useEffect(()=>{
        if (images.length<1) return;
        const newImagesURLs = [];
        images.forEach(image=> newImagesURLs.push(URL.createObjectURL(image)));
        setImagesURLs(newImagesURLs);
    },[images]);

    function onImageChange(e){
        setImages([...e.target.files]);
        onImagesChanged(e.target.files);
    }

    return(
        <>
            <input type="file" multiple accept="image/*" onChange={onImageChange} />
            {imagesURLs.map((imageSrc, index)=> <img key={`download_image_${index}`} src={imageSrc} /> )}
        </>
    )
}