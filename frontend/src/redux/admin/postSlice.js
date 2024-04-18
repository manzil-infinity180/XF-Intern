import { createSlice } from '@reduxjs/toolkit'

const initialAdminPostState = {
   allPost:'',
   aPost:'',
   appliedPost : '',
   isRedirect:false,
   loading:false,
   post:'',
   allPostExist:'',

};

const AdminPostSlice = createSlice({
    name:"AdminPost",
    initialState:initialAdminPostState,
    reducers:{
         getAllPostExist : (state,action) => {
          state.allPostExist = action.payload;
          
         },
        getPostSuccess: (state,action) =>{
           state.aPost = action.payload
        },
        getPostFailed: (state,action) =>{
            state.error = action.payload,
            state.isRedirect = true
        },
        getAllPostSuccess: (state,action) =>{
            state.aPost = action.payload
         },
         getAllPostFailed: (state,action) =>{
             state.error = action.payload,
             state.isRedirect = true
         },
         getallPostOtherAdminSuccess : (state,action) =>{
            state.otherPost = action.payload
         },
         getallPostOtherAdminFailed : (state,action) => {
            state.error = action.payload,
            state.isRedirect = true
         },
         getAppliedPostSuccess: (state,action) =>{
            state.aPost = action.payload
         },
         getAppliedPostFailed: (state,action) =>{
             state.error = action.payload,
             state.isRedirect = true
         },
         getchangeStatusSuccess: (state,action) =>{
            state.status = action.payload
         },
         getChangeStatusFailed : (state,action) =>{
            state.error = action.payload
         },
         // CRUD - Post
         createPostSuccess : (state,action) => {
            state.newPost = action.payload
         },
         updatePostSuccess : (state,action) =>{
            state.updatePost = action.payload
         },
         deletePostSuccess : (state,action) =>{
            state.message = action.payload
         },
         getError : (state,action) =>{
            state.error = action.payload
         },
         getPost : (state,action)=>{
            state.post = action.payload;
         },
         getBookmark : (state, action) => {
            state.bookmark = action.payload;
         }
    }

});

export const {
   getAllPostExist,
    getPostFailed,getPostSuccess,
    getAllPostFailed,getAllPostSuccess,
    getAppliedPostSuccess,getAppliedPostFailed,
    getallPostOtherAdminSuccess,getallPostOtherAdminFailed,
    getchangeStatusSuccess,getChangeStatusFailed,
    createPostSuccess,updatePostSuccess,deletePostSuccess,
    getError,getPost,getBookmark
} = AdminPostSlice.actions;
export default AdminPostSlice.reducer;


