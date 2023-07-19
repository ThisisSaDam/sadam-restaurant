import Form from "../components/Form";
import Login from "../components/Login";
import Layout from "./Layout";


const SignIn = () => {



  return (
    <Layout>
      <div className="sign-in-container">
        <div className="sign-in">
          <h2>Đăng nhập</h2>
          <Login />
          <h2>Đăng ký</h2>
          <Form />
        </div>  
      </div>
    </Layout>

      
  )
};

export default SignIn;


