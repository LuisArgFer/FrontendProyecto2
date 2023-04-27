import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Alerta from "../components/Alerta";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";
import "./CSS/Login.css";

const FA2 = () => {
  const [verificationCode, setVerificationCode] = useState("");
  const [alerta, setAlerta] = useState({});
  const { setAuth, auth, userID } = useAuth();
  const navigate = useNavigate();

  const handle2FASubmit = async (e) => {
    e.preventDefault();

    if (verificationCode === "") {
      setAlerta({
        msg: "El campo del código de verificación es obligatorio",
        error: true,
      });
      return;
    }
    try {
      const { data } = await clienteAxios.post(
        `/usuarios/2fa-verify/${userID}`,
        {
          verificationCode,
        }
      );

      setAlerta({});
      localStorage.setItem("token", data.token);
      setAuth(data);

      if (!auth) return;
      if (auth.role_id !== "641233bc0c629befbd6fe78b") navigate("/dashboard");
      else navigate("/admin");
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };
  return (
    <div className="section text-center">
      <h5 className="mb-4 pb-3">Autenticación de dos factores</h5>
      <form onSubmit={handle2FASubmit}>
        <div className="form-group">
          <input
            type="text"
            name="verificationCode"
            className="form-style"
            placeholder="Código de verificación"
            id="verificationCode"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
          />
          <i className="input-icon uil uil-lock"></i>
        </div>
        <input type="submit" value="Verificar" className="btn mt-4"></input>

      </form>
    </div>
  );
};

export default FA2;
