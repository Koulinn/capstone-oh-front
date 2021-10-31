export const BASE_URL = process.env.REACT_APP_API_URL


export const appendImgs =(form, images)=>{
    images.forEach(i=> form.append('medicalRequestsImgs', i ) )
    return form
} 
export const previewUrls =(images)=>{
    const previewList = images.map(i=> URL.createObjectURL(i) )
    return previewList
} 

export const removeTag = (tag, array, setArray)=>{
    const newTags = array.filter( t=> t !== tag)
    setArray(newTags)
}
