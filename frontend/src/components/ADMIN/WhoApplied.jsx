import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {viewPost } from '../../redux/actions/postAction';
import {useParams} from "react-router-dom"; 
import { WhoAppliedUtils } from './WhoAppliedUtils';
export function WhoApplied() {
    const dispatch = useDispatch();
    const {postId} = useParams();
    useEffect(() => {
        dispatch(viewPost(postId));
    }, [dispatch,postId]);
    const {post} = useSelector(s => s.adminPost);
     const {userId} = post
    console.log(userId);

    return (
        <>
        <section className="w-full section_content">
                {post && <div>
                    <h1 className="text-center mt-8 text-4xl font-bold tracking-wider">
                        {post.companyName.toUpperCase()}</h1>
                    <h3 className="text-center mt-8 text-4xl font-bold tracking-wider"
                    >{post.name} Stats Details</h3>
                    <p className="text-center">
                        {post.skills}
                    </p>
                </div>}

             {userId && userId.map((el)=> <WhoAppliedUtils data={el} appliedPostDetail={{
                "companyId" :post.adminId,
                "pid":post._id
            }} key={el._id  }/>)}
             {
                userId && !userId.length &&  <h1 style={{
                    marginTop:"50px",
                    fontSize:"2.25rem",
                    textAlign:"center"
                }}>No User Applied Yet 🥲</h1>
             }
        </section>
        </>
    );
}
