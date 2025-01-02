import React, { useState } from 'react'
import Head from 'next/head';
import AppConfig from '@/layout/AppConfig';
import axios from 'axios';
//--> Componentes de primeReact
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { InputText } from "primereact/inputtext";
import { useRouter } from 'next/router';
import * as components from './comp';
import 'primeicons/primeicons.css';
import Image from 'next/image';
import logoN from '/imagenes/login/FT.jpg';
import styles from '/styles/styles.module.css';
import logo from '/imagenes/login/FTl.jpg';

//--> Componentes propios
import { camposVacios, emailInvalido, exitoCuenta, passwordInvalido, passwordsInValidas, formatoNombre } from '@/components/mensajesNotificaciones/mensajes';
import { nuevoUsuario } from '@/components/mensajesNotificaciones/links';


const createAccount = () => {
  //--> Variable de redireccinamiento
  const router = useRouter();

  //-----------------------| Lista de variables |-----------------------
  //--> Campos de entrada
  const [email, setEmail] = useState('')
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  //--> Validar envio
  const [estiloEmail, setEstiloEmail] = useState('')
  const [estiloNombre, setEstiloNombre] = useState('')
  const [estiloApellido, setEstiloApellido] = useState('')
  const [estiloPassword, setEstiloPassword] = useState('')
  const [estiloConfirmPass, setEstiloConfirmPass] = useState('')
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [estiloMensajeRespuesta, setEstiloMensajeRespuesta] = useState('')
  //--> Mensajes
  const [mensajeRespuesta, setMensajeRespuesta] = useState('')

  //-----------------------| Mensajes de advertencia |-----------------------



  //----------------| Función para cambiar visibilidad de contraseña |----------------
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  const togglePasswordVisibility2 = () => {
    setPasswordVisible2(!passwordVisible2);
  };


  //-----------------------| Expresion regular |-----------------------
  const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

  //-----------------------| Envio |-----------------------
  const crearUsuario = async () => {
    //--> Validar campos llenos
    if ([email, nombre, apellido, password, confirmPassword].includes('')) {
      if (!email) setEstiloEmail('p-invalid')
      if (!nombre) setEstiloNombre('p-invalid')
      if (!apellido) setEstiloNombre('p-invalid')
      if (!password) setEstiloPassword('p-invalid')
      if (!confirmPassword) setEstiloConfirmPass('p-invalid')
      setMensajeRespuesta(camposVacios)
      setEstiloMensajeRespuesta('error')

      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return
    } else {
      setEstiloEmail('')
      setEstiloNombre('')
      setEstiloApellido('')
      setEstiloPassword('')
      setEstiloConfirmPass('')
    }

    if (/^\d*$/.test(nombre, apellido)) {
      setEstiloNombre('p-invalid')
      setEstiloApellido('p-invalid')
      setMensajeRespuesta(formatoNombre)
      setEstiloMensajeRespuesta('error')
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return
    } else {
      setEstiloNombre('')
      setEstiloApellido('')
    }

    if (/^\d*$/.test(apellido)) {
      setEstiloApellido('p-invalid')
      setMensajeRespuesta(formatoNombre)
      setEstiloMensajeRespuesta('error')
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return
    } else {
      setEstiloApellido('')
    }


    //--> Validar email
    if (!validarEmail.test(email)) {
      setEstiloEmail('p-invalid')
      setEstiloMensajeRespuesta('error')
      setMensajeRespuesta(emailInvalido)
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return
    } else { setEstiloEmail('') }

    //--> Validar password
    if (password.length < 6) {
      setEstiloPassword('p-invalid')
      setEstiloMensajeRespuesta('error')
      setMensajeRespuesta(passwordInvalido)
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return
    } else { setEstiloPassword('') }

    //--> Comprobar passwords iguales
    if (password !== confirmPassword) {
      setEstiloPassword('p-invalid')
      setEstiloConfirmPass('p-invalid')
      setEstiloMensajeRespuesta('error')
      setMensajeRespuesta(passwordsInValidas)
      setTimeout(() => { setMensajeRespuesta('') }, 3000);
      return
    } else {
      setEstiloPassword('')
      setEstiloConfirmPass('')
    }


    try {
      const objetoCrearUsuario = {
        nameUser: nombre, surnameUser: apellido, emailUser: email, passwordUser: password
      }
      const respuesta = await axios.post(nuevoUsuario, objetoCrearUsuario)
      //--> Limpiar campos
      setEmail('')
      setNombre('')
      setApellido('')
      setPassword('')
      setEstiloConfirmPass('')
      //--> Redireccionar
      if (respuesta.status === 200) {
        //--> Notificar estatus después de validarlo con back-end
        setMensajeRespuesta(exitoCuenta)
        setEstiloMensajeRespuesta('success')
        setTimeout(() => { router.push('/pages/pantallainicio/token') }, 1000)
      }
    } catch (error) {
      console.log(error);
      setEstiloMensajeRespuesta('error')
      //setMensajeRespuesta(error.response.data.msg) ctrl+k
      setMensajeRespuesta("Este correo ya está en uso.")
      setTimeout(() => { setMensajeRespuesta('') }, 3000)
    }
  }


  const cancelarCreacion = () => {
    //--> Limpiar campos de entrada antes de salir
    setNombre('')
    setApellido('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')

    //--> Limpiar estilos de campos de entrada
    setEstiloEmail('')
    setEstiloNombre('')
    setEstiloApellido('')
    setEstiloPassword('')
    setEstiloConfirmPass('')

    //--> Redireccionar
    router.push('/')

  }



  const Topbar = () => {
    return (
      <div className="topbar" >
        <div className=' py-3 px-6 shadow-2 flex align-items-center justify-content-between relative lg:static' style={{ backgroundColor: '#13121A' }}>
        <Image src={logoN} className={styles['logo']} alt="Mi imagen" priority={true} style={{ width: '50px', height: '50px' }} />
          <components.Title4>FinTrack</components.Title4>
          <a className='p-ripple cursor-pointer block lg:hidden text-700'>
            <i className='pi pi-bars text-4x1'>
            </i>
          </a>
          <div className='align-items-center flex-grown-1 hidden lg:flex absolute lg:static w-full surface-overlay left-0 top-100 px-6 lg:px-0 z-2 shadow-2 lg:shadow-none'>
            <ul className='list-none p-0 m-0 flex lg:align-items-center text-900 select-none flex-column lg:flex-row cursor-pointer lg:w-4'></ul>
          </div>
          <div className='flex justify-content-end lg:text-right lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0 lg:w-4'>
            <Button
              label="Iniciar Sesión"
              style={{
                color: '#CFAC2B', // Color del texto
                border: '1px solid #CFAC2B', // Contorno del mismo color que el texto
                backgroundColor: 'transparent', // Sin relleno
                borderRadius: '50px', // Bordes redondeados (opcional)
              }}
            
              className="mx-2"
              link
              onClick={cancelarCreacion}
            />
          </div>
        </div>
      </div>
    );
  }

  const Footer = () => {
    return (
      <div className="footer" style={{ backgroundColor: 'rgb(38, 39, 41)' }}>
        <div className='grid grid-nogutter surface-section px-4 py-4 md:px-6 lg:px-8 border-top-1 surface-border'  >
          <div className='col-12 lg:col-6 lg:border-right-1 surface-border'>
          <Image src={logo} className={styles['logo']} alt="Mi imagen" priority={true} style={{ width: '40px', height: '40px' }}  />
            <span className='text-900 block mt-4 mr-3'>Una aplicación dedicada al análisis de movimientos bancarios, para que estés siempre al tanto de estos. </span>
            <span className='text-500 block mt-4'> © 2024 FinTrack, S.A. Todos los derechos reservados.</span>
          </div>
          <div className='col-12 md:col-6 lg:col-3 mt-4 lg:mt-0 lg:pl-4 flex flex-column'>
            <span className='text-900 text-xl font-medium block'>Compañía</span>
            <ul className='list-none p-0'>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>Sobre FinTrack</a>
              </li>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>¿Quiénes somos?</a>
              </li>
            </ul>
          </div>
          <div className='col-12 md:col-6 lg:col-3 mt-4 lg:mt-0 lg:pl-4 flex flex-column'>
            <span className='text-900 text-xl font-medium block'>Para Usuarios</span>
            <ul className='list-none p-0'>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>Análisis</a>
              </li>
              <li>
                <a tabIndex={0} className='text-600 hover:text-900 transition-duration-150 cursor-pointer mt-3 block'>Movimientos Bancarios</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="surface-900 py-6 lg:py-4 md:px-6 lg:px-8 flex flex-column lg:flex-row justify-content-between align-items-center">
          <ul class="list-none p-0 mb-0 flex flex-column md:flex-row flex-order-1 lg:flex-order-0 mt-4 lg:mt-0">
            <li class="mr-4 mt-3 lg:mt-0">
              <a tabindex="0" class="cursor-pointer text-0">Datos de Privacidad</a>
            </li>
            <li class="mr-4 mt-3 lg:mt-0">
              <a tabindex="0" class="cursor-pointer text-0">Términos y Condiciones</a>
            </li>
            <li class="mr-4 mt-3 lg:mt-0">
              <a tabindex="0" class="cursor-pointer text-0">Información Legal</a>
            </li>
          </ul>
          <div class="flex align-items-center flex-order-0 lg:flex-order-1">
            <a tabindex="0" class="cursor-pointer mr-3 lg:mt-0 block">
              <i class="pi pi-facebook surface-section p-1 text-sm border-circle text-900">
              </i>
            </a>
            <a tabindex="0" class="cursor-pointer mr-3 lg:mt-0 block">
              <i class="pi pi-twitter surface-section p-1 text-sm border-circle text-900"></i>
            </a>
            <a tabindex="0" class="cursor-pointer mr-3 lg:mt-0 block">
              <i class="pi pi-youtube surface-section p-1 text-sm border-circle text-900"></i>
            </a>
          </div>
        </div>

      </div>
    );
  }

  const estiloDelFondo = {
    backgroundImage: 'url("https://i.pinimg.com/736x/ed/19/1c/ed191c06de82a9962f24af5cf35be0d0.jpg") ', //  ruta imagen
    backgroundSize: 'cover',
    backgroundPosition: 'center',

  };


  const color = {
    backgroundColor: 'rgb(38,39,41,0.89)',
  };

  const estilo = {
    height: '38px',
    width: '38px',
    backgroundColor: '#262729',
    borderRadius: '10px',
  };

  return (

    <>
      <Topbar />
      <Head>
        <title>FinTrack - Create an Account</title>
        <meta charSet="UTF-8" />
        <link rel="icon" href={`/FT.ico`} type="image/x-icon"></link>
      </Head>

      <div>
        <div className='px-4 py-8 md:px-6 lg:px-8' style={estiloDelFondo}>
          <div className='flex flex-wrap'>
            <div className='w-full lg:w-6 p-4 lg:p7' style={color}>
            {/* <Image src={logo2} className={styles['my-image']} alt="Mi imagen"
                  priority={true} style={{
                    height: '70px', width: '70px',
                    marginTop: '120px',
                  }}
                /> */}
              <div className='text-xl text-black-alpha-90 font-500 mb-3'>
                <components.Title2>Bienvenido a FinTrack</components.Title2>
              </div>

              <ul className='list-none p-0 m-0'>
                <li className='flex align-items-start mb-4'>
                  <div>
                    <span className='flex align-items-center justify-content-center bg:purple-400' style={estilo}>
                      <i className='text-xl text-white pi pi-dollar'>
                      </i>
                    </span>
                  </div>
                  <div className='ml-3'>
                    <span className='font-medium text-black-alpha-90 text-white'>
                      <b>Análisis de Movimientos Bancarios</b>
                    </span>
                    <p className='mt-2 mb-0 text-black-aplha-60 line-height-3 text-white'>
                      Simplifica la gestión de tus finanzas con FinTrack, la app diseñada para analizar y
                      optimizar tus movimientos bancarios. Con nuestra plataforma, tendrás acceso a un desglose detallado de
                      tus ingresos y gastos, ayudándote a identificar tendencias, controlar tu presupuesto y tomar decisiones
                      financieras más inteligentes.
                    </p>
                  </div>
                </li>

              </ul>
            </div>

            <div className='w-full lg:w-6 p-4 lg:p7 ' style={color}>
              <div className="card-container mx-auto text-center " >
                <div className='field'>
                  {/* <label htmlFor="nombreCompleto" className="block text-900" >Nombre</label> */}
                  <InputText
                    id="nombreCompleto" placeholder="Nombre"
                    className={`${estiloNombre} w-full p-3 md:w-25rem text-white`}
                    style={{ backgroundColor: '#575C65', color: 'white' }}
                    value={nombre} onChange={(e) => { setNombre(e.target.value) }} />
                </div>
                <div className='field'>
                  {/* <label htmlFor="apellido" className="block text-900 text-white " >Apellidos</label> */}
                  <InputText
                    id="apellido" placeholder="Apellido(s)"
                    className={`${estiloApellido} w-full p-3 md:w-25rem text-white`}
                    style={{ backgroundColor: '#575C65', color: 'white' }}
                    value={apellido} onChange={(e) => { setApellido(e.target.value) }} />
                </div>
                <div className='field'>
                  {/* <label htmlFor="email" className="block text-900 text-white" >Correo electrónico</label> */}
                  <InputText
                    id="email" placeholder="Correo electrónico"
                    className={`${estiloEmail} w-full p-3 md:w-25rem placeholder-white`}
                    style={{ backgroundColor: '#575C65', color: 'white' }}
                    value={email} onChange={(e) => { setEmail(e.target.value) }} />
                </div>

                <div className='field' style={{ display: 'flex', justifyContent: 'center' }}> {/* Centrado del contenedor principal */}
                  <div className="p-inputgroup" style={{ backgroundColor: '#575C65', maxWidth: '25rem', display: 'flex', justifyContent: 'center' }}>
                    <InputText
                      id="password"
                      className={`${estiloPassword}  p-3`}
                      type={passwordVisible ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Contraseña"
                      style={{ color: 'white', backgroundColor: '#575C65', flex: 1 }}
                    />
                    <Button
                      icon={passwordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'}
                      className=" p-button-rounded p-button-text"
                      onClick={togglePasswordVisibility}
                      style={{ minWidth: '2rem', color: "white" }}
                    />
                  </div>
                </div>

                <div className='field' style={{ display: 'flex', justifyContent: 'center' }}>
                  <div className="p-inputgroup" style={{ backgroundColor: '#575C65', maxWidth: '25rem', display: 'flex', justifyContent: 'center' }}>
                    <InputText
                      id="password"
                      className={`${estiloConfirmPass}  p-3`}
                      type={passwordVisible2 ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirma contraseña"
                      style={{ color: 'white', backgroundColor: '#575C65', flex: 1 }}
                    />
                    <Button
                      icon={passwordVisible ? 'pi pi-eye-slash' : 'pi pi-eye'}
                      className=" p-button-rounded p-button-text"
                      onClick={togglePasswordVisibility2}
                      style={{ minWidth: '2rem', color: "white" }} // Ajustar tamaño del botón
                    />
                  </div>
                </div>

                {mensajeRespuesta && (
                  <div className='mx-auto my-3' style={{ width: "600px", textAlign: "center" }}>
                    <Message severity={estiloMensajeRespuesta} text={mensajeRespuesta} />
                  </div>
                )}

                <div className='flex justify-content-center mb-2'>
                  <Button
                    label="Crear cuenta"
                    className='mr-2 w-full p-3 md:w-13rem'
                    onClick={crearUsuario}
                    severity="success"
                    size="large"
                    style={{
                      backgroundColor: '#FFE1AE',
                      color: 'black',
                      textAlign: 'center',
                      borderRadius: '50px',
                      float: 'right' // Para alinear el botón a la derecha
                    }}
                  />
                </div>
              </div>

              <div className='flex justify-content-center'>
                <p className='mt-3' style={{ color: 'white' }} >¿Ya tienes una cuenta?</p>
                <Button label="Iniciar Sesión" style={{ color: 'white' }} className='mx-2' link onClick={cancelarCreacion}
                  icon="pi pi-angle-right" iconPos="right" />
              </div>


            </div>

          </div>
        </div>
      </div>

      <Footer />


    </>
  )

}

export default createAccount