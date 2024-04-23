
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllBookmark } from "../../redux/actions/postAction";
import Content from "../Content/Content";
import { ErrorPage } from "../utils/ErrorPage";
import { GoPrevPage } from "../utils/GoPrevPage";
import { Loader } from "../utils/Loader";
export function Bookmark() {
    const dispatch = useDispatch();
    useEffect(()=>{
       dispatch(getAllBookmark());
    },[dispatch]);
    const selector = useSelector(s => s.adminPost);
    console.log(selector);
    return (
      <>
        <GoPrevPage />
        <section className="w-full section_content">
        <div>
         <h1 className="text-center mt-8 text-5xl font-bold tracking-wider" style={{
            letterSpacing:"0.45rem"
         }}
         >{"InternShip / Jobs".toUpperCase()} </h1>
         <h6 className="text-center mt-8 text-2xl font-bold tracking-wider" style={{
            letterSpacing:"0.45rem"
         }}
         >{"Bookmark".toUpperCase()} </h6>
        </div>
        <div className="flex items-center my-10 flex-col justify-center ">
            {
                (selector && selector.bookmark) ? 
                selector.bookmark.bookmark.map((el) => <Content data={el} notBookmark={true}  key={el._id} />) :
               ( !selector.bookmark && selector.error) ? <ErrorPage message={"No Content 🥲"} selector={selector} /> : <Loader />
            }
 
               

          </div> 
          
        </section>
        </>
    );
}
