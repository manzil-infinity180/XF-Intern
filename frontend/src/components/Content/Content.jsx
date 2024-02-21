import './Content.css'
import toast from 'react-hot-toast';
function Content({data}) {
    return (
        <>
       {data &&  <div className='w-3/5 p-9 rounded-lg my-8' style={{
            backgroundColor:"#0a101f"
        }}>
       <div className='flex justify-center'>
        <div>
           <h1 className='text-3xl tracking-wider'> {data.companyname}</h1>
        </div>
        </div>
        <div className='flex justify-center'>
        <div>
            {data.roleName}
        </div>
        </div>
        <div className="flex justify-between mt-10">
        {/* <div className='tracking-wider'>Experience</div>
        <div>Stipend</div>
        <div>Type</div> */}
        <span className='font-bold tracking-wider mx-2'>Stipend/Salary</span>
        <span className='font-bold tracking-wider mx-2'>Type</span>
        <span className='font-bold tracking-wider mx-2'>Experience</span>

</div>
<div className="flex justify-between mt-1">
        <span className='mx-2'>{data.salary}/month</span>
        <span className='mx-2' >Internship</span>
        {
            data.experience ===0 ? (<span className='mx-2'>Fresher</span>) :(<span className='mx-2'>{data.experience} years</span>) }
</div>
    <div className='flex justify-center mt-5 '>
        <button className='btn_applied' onClick={()=> toast.success(data.roleName)}>Applied</button>
    </div>

        </div>}
        </>
    );
}

export default Content;