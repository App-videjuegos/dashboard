import axios from "axios";
import { getAllComments,getCommentsByName,updateCommentInState} from './commentsSlice.js'

let estado=0


export const getComments = () => {
    return async (dispatch) => {
      try {
        //console.log("Obteniendo todas las reviews");
  
        // dispatch(setLoading(true));
  
        const response = await axios.get(
          "https://pfvideojuegos-back-production.up.railway.app/reviews"
        );
  
        const allComments = response.data;
        
        if(allComments){
            dispatch(getAllComments(allComments))
        }else{
            console.log("Error, no comments")
        }
        //console.log("Todas las reviews recibidas desde el servidor:", allReviews);

      } catch (error) {
        console.log("Error al obtener todas las comments:", error.message);
      }
    };
  };

  export const updateComment = (commentId) => {
    console.log("DESDE ACTION",commentId)
    return async (dispatch) => {
      try {
        const response = await axios.put(
          `https://pfvideojuegos-back-production.up.railway.app/reviews/${commentId.id}`,
          { deleted: commentId.deleted }
        );
  
        const updatedComment = response.data;
        console.log("response data",response.data)
  
        if (updatedComment) {
          const response = await axios.get(
            "https://pfvideojuegos-back-production.up.railway.app/reviews"
          );
    
          
          if(response.data){
            dispatch(updateCommentInState(updatedComment))
          }else{
              console.log("Error, no comments")
          }
        } else {
          console.log("Error updating comment");
        }
      } catch (error) {
        console.log("Error updating comment:", error.message);
      }
    };
  };
  

  export const getCommentsbyName =(query)=> (dispatch=>{
    console.log("esto me llega de query",query)
    fetch(`https://pfvideojuegos-back-production.up.railway.app/reviews?user=${query}`)
            .then(response =>{
                estado= response.status
                return response.json()
            })
            .then(json =>{
                if(estado ===200)
                // {
                   if(json.includes('No se encontraron comentarios con el nombre') ) 
                        //  alert('No se encontraron videojuegos con ese Nombre')
                        console.log("Error")
                    else 
                        dispatch(getCommentsByName(json))
              
            }).catch(error =>{
                alert("error", error)
                dispatch(setErrorMsg(error))
            })
   
  })