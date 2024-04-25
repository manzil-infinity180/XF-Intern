import { Link } from 'react-router-dom';
// import { useNavigation } from 'react-router-dom';
export function GoBack() {
  // const navigate = useNavigation();
  return (
    <>
      <header className='header_login'>
        <Link to={'/'}
          className='goBack_button'
        >
          <svg stroke="currentColor"
            fill="currentColor" strokeWidth="0"
            viewBox="0 0 24 24" aria-hidden="true"
            height="1em" width="1em"
            xmlns="http://www.w3.org/2000/svg">
            <path d="M11.03 3.97a.75.75 0 010 1.06l-6.22 6.22H21a.75.75 0 010 1.5H4.81l6.22 6.22a.75.75 0 11-1.06 1.06l-7.5-7.5a.75.75 0 010-1.06l7.5-7.5a.75.75 0 011.06 0z"></path>
          </svg>
          Go Back
        </Link>
      </header>
    </>
  );
}
