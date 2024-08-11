import InputField from "../utils/InputField";
import { Header } from "../utils/Header"
import { useNavigate } from "react-router-dom"
import { Logo } from "../utils/Logo";
import { useDispatch } from "react-redux"
import { createPost } from "../../redux/actions/postAction";
export function AdminPost() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    dispatch(createPost(data, navigate));

    setTimeout(() => {
      e.target.reset();
    }, 2000);
  }

  return (

    <>
      <Header navigate={navigate} />
      <main>
        <section className='section_container_login section_signin'>
          <Logo />
          <div className='signin_content'>
            <p>Create New Job/Itern Post</p>
            <p className='signin_description'>
              If you have the account please click on login
            </p>
          </div>
          <div className='main_login_box'>

            <p className='login_text'>Register as Job Seeker / Recuriter</p>


            <p className='login_description'>
              You have to register either as job seeker or recuriter. You can simply enter your email to that box...
            </p>
            <form className='form_login' onSubmit={handleSubmit}>
              <div className='form_label'>
                <select name="type" className="select_post" data-testid="job-post-type">
                  <option value="internship-remote">internship-remote</option>
                  <option value="internship-onsite">internship-onsite</option>
                  <option value="job-onsite">job-onsite</option>
                  <option value="job-remote">job-remote</option>
                </select>
              </div>
              <InputField name="name" placeholder="Enter Job/Iternship Opening Name"
                type="text" >Post Name</InputField>
              <div className='form_label'>
                <label>Description</label>
              </div>
              <textarea rows="3" cols="33" placeholder="Enter Job/Iternship Description" name="description" className="textAreaField" 
              data-testid="input-box-description"/>
              {/* <InputField name="description" placeholder="Enter Job/Iternship Description" 
                    type="text" style="width:'30%'" >Description</InputField> */}
              <InputField name="skills" placeholder="Enter required skills like java,springboot,nodejs"
                type="text" >Required Skills (Separated by Commas)</InputField>
              <InputField name="salary" placeholder="Enter Salary/Stipend per Month"
                type="number">Salary/Stipend</InputField>
              <InputField name="duration" placeholder="Enter duration of Job/Iternship"
                type="text">Duration</InputField>
              <InputField name="start" placeholder="Starting Date"
                type="date" >Expected Starting date</InputField>
              <InputField name="deadline" placeholder="Deadline to apply"
                type="date" >Deadline Date (For Apply) </InputField>


              <button type='submit' data-testid="new-post-btn">New Post</button>
            </form>

          </div>
        </section>
      </main>
    </>
  );
}
