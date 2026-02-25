import api from "../api/api";


export default function LogoutButton() {

  const logout = () => {
    
    
      api.post("/logout").then(() => {
        localStorage.removeItem("token");
        window.location.href = "/";
      });

     
  };

  return (
    <button onClick={logout} className="btn btn-danger btn-sm" >
      Logout
    </button>
  );
}
