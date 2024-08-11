import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updatePost, viewPost } from "../../redux/actions/postAction";
import { useParams, useNavigate } from "react-router-dom"
import { Header } from "../utils/Header";
import InputFieldUpdate from "../utils/InputFieldUpdate";
import { Loader } from "../utils/Loader";
import { TextArea } from "../utils/TextArea";
import { SelectField } from "../utils/SelectField";
import { Logo } from "../utils/Logo";
export function UpdatePost() {
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(viewPost(id));
  }, [dispatch, id]);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    dispatch(updatePost(data, id, navigate));
  }
  const selector = useSelector(s => s.adminPost);
  const { type, name, deadline, duration, start, salary, skills, description } = selector.post;
  return (
    <>
      <Header navigate={navigate} />
      <main>
        {!type ? <Loader /> : <section className='section_container_login section_signin'>
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
              <SelectField name="type" value={type} />

              <InputFieldUpdate name="name" placeholder="Enter Job/Iternship Opening Name"
                type="text" value={name}>Post Name</InputFieldUpdate>
              <TextArea name="description" placeholder="Enter Job/Iternship Description"
                value={description}>Description</TextArea>
              <InputFieldUpdate name="skills" placeholder="Enter required skills like java,springboot,nodejs"
                type="text" value={skills}>Required Skills (Separated by Commas)</InputFieldUpdate>
              <InputFieldUpdate name="salary" placeholder="Enter Salary/Stipend per Month"
                type="number" value={salary}>Salary/Stipend</InputFieldUpdate>
              <InputFieldUpdate name="duration" placeholder="Enter duration of Job/Iternship"
                type="text" value={duration}>Duration</InputFieldUpdate>
              <InputFieldUpdate name="start" placeholder="Starting Date"
                type="date" value={start}>Expected Starting date</InputFieldUpdate>
              <InputFieldUpdate name="deadline" placeholder="Deadline to apply"
                type="date" value={deadline}>Deadline Date (For Apply) </InputFieldUpdate>
              <button type='submit' data-testid="update-post-btn">Update Post</button>
            </form>

          </div>
        </section>}
      </main>
    </>
  );
}
