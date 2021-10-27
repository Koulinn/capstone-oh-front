export const BASE_URL = process.env.REACT_APP_API_URL



// setUserImagePath(URL.createObjectURL(e.target.files[0]))
//                                 newUserImage.append('image', e.target.files[0])

// images should be array of files
// form should be formData obj
export const appendImgs =(form, images)=>{
    images.forEach(i=> form.append('medicalRequestsImgs', i ) )
    return form
} 
// images should be array of files
export const previewUrls =(images)=>{
    const previewList = images.map(i=> URL.createObjectURL(i) )
    return previewList
} 

export const removeTag = (tag, array, setArray)=>{
    const newTags = array.filter( t=> t !== tag)
    setArray(newTags)
}
