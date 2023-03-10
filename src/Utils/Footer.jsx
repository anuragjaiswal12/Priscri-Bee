import { useNavigate } from "react-router-dom"

export function Footer(props) {
    const navigate = useNavigate()
    return (
        <div className="login__back__btn" onClick={()=>navigate(props.path)}>Go Back To Potal</div>
    )
}
Footer.defaultProps = {
    path: "/"
  }
