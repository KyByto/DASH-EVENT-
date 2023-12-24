import { Link } from "react-router-dom"

export default function BackButton({path}) {

    return (  <Link to={`/${path}`}  className="back-button">
    
    <svg xmlns="http://www.w3.org/2000/svg" width="37" height="16" viewBox="0 0 37 16" fill="none">
    <path d="M0.292893 7.29289C-0.0976295 7.68341 -0.0976296 8.31658 0.292892 8.7071L6.65685 15.0711C7.04738 15.4616 7.68054 15.4616 8.07107 15.0711C8.46159 14.6805 8.46159 14.0474 8.07107 13.6569L2.41422 8L8.07107 2.34314C8.46159 1.95262 8.46159 1.31945 8.07107 0.92893C7.68054 0.538405 7.04738 0.538405 6.65686 0.92893L0.292893 7.29289ZM37 7L1 7L1 9L37 9L37 7Z" fill="black"/>
  </svg>
      
      Back</Link>)
}