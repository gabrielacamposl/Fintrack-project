import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import AppConfig from '@/layout/AppConfig';;
import { Divider } from 'primereact/divider';
import React, { useRef, useState } from 'react';
import axios from 'axios';
import { Button } from 'primereact/button';
import { Message } from 'primereact/message';
import { Password } from 'primereact/password';
import { InputText } from 'primereact/inputtext';
import * as components from './comp';
import Image from 'next/image';
import logo2 from '/imagenes/login/FT.jpg';
import logo from '/imagenes/login/FTl.jpg';
import logoN from '/imagenes/login/FT.jpg';
import styles from '/styles/styles.module.css';
import { login, resetearPassword } from '@/components/mensajesNotificaciones/links';
import {
    campoVacio, camposVacios, emailInvalido, passwordInvalido, resetearExitoso
} from '@/components/mensajesNotificaciones/mensajes';




const newPassword = () => {


    //----------------| Lista de variables |----------------
    const [signIn, toggle] = useState(true);
    // --> Campos de entrada
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const [emailrecuperar, setEmailrecuperar] = useState('')
    //--> Estilos
    const [estiloEmail, setEstiloEmail] = useState('')
    const [estiloPassword, setEstiloPassword] = useState('')
    const [estiloEmailRec, setEstiloEmailRec] = useState('')
    const [estiloRespuesta, setEstiloRespuesta] = useState('')
    //--> Mensaje de respuesta
    const [mensajeRespuesta, setMensajeRespuesta] = useState('')
    const [isVisible, setIsVisible] = useState(true);

    const router = useRouter();

    const validarEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/

    //--> Envio de datos
    const validarEnvio = async () => {
        if ([email, password].includes('')) {
            setEstiloEmail('p-invalid')
            setEstiloPassword('p-invalid')
            setEstiloRespuesta('error')
            setMensajeRespuesta(camposVacios)
            setTimeout(() => { setMensajeRespuesta('') }, 3000)
            return
        } else {
            setEstiloEmail('')
            setEstiloPassword('')
        }
        if (!validarEmail.test(email)) {
            setEstiloEmail('p-invalid')
            setMensajeRespuesta(emailInvalido)
            setEstiloRespuesta('error')
            setTimeout(() => { setMensajeRespuesta('') }, 3000)
            return
        } else { setEstiloEmail('') }
        if (password.length < 6) {
            setEstiloPassword('p-invalid')
            setMensajeRespuesta(passwordInvalido)
            setEstiloRespuesta('error')
            setTimeout(() => { setMensajeRespuesta('') }, 3000)
            return
        } else { setEstiloPassword('') }
        setMensajeRespuesta('')
        //--> Validar envio a back-end
        console.log(login)
        try {
            const respuesta = await axios.post(login, { email: email, password: password })
            if (respuesta.status === 200) {

                localStorage.setItem('token', respuesta.data.token)
                setTimeout(() => { router.push('/pages/Citas/gestionCitas') }, 1000)
            }
        } catch (error) {
            //   setMensajeRespuesta(error.response.data.msg)
            setEstiloRespuesta('error')
            setEstiloEmail('p-invalid')
            setEstiloPassword('p-invalid')
            setTimeout(() => { setMensajeRespuesta('') }, 3000);
        }
    }

    const recuperarPassword = async () => {
        console.log("recuperar password")
        if ([emailrecuperar].includes('')) {
            setEstiloEmailRec('p-invalid')
            setMensajeRespuesta(campoVacio)
            setEstiloRespuesta('error')
            setTimeout(() => { setMensajeRespuesta('') }, 3000)
            return
        } else { setEstiloEmailRec('') }

        if (!validarEmail.test(emailrecuperar)) {
            setEstiloEmailRec('p-invalid')
            setMensajeRespuesta(emailInvalido)
            setTimeout(() => { setMensajeRespuesta('') }, 3000)
            return
        } else { setEstiloEmailRec('') }

        try {
            const respuesta = await axios.post(resetearPassword, { email: emailrecuperar })
            if (respuesta.status === 200) {
                // --> Limpiar variables
                setEmailrecuperar('')

                //--> Mostrar estado de la peticion
                setEstiloRespuesta('success')
                setMensajeRespuesta(resetearExitoso)

                //--> Redireccionar
                setTimeout(() => { router.push('/pages/pantallainicio/tokenresetear') }, 1000)
            }
        } catch (error) {
            setEstiloEmailRec('p-invalid')
            setMensajeRespuesta(error.response.data.msg)
            setEstiloRespuesta('error')

            setTimeout(() => { setMensajeRespuesta('') }, 3000)
        }
    }
    // Manejar el clic del botón

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
                            label="Crear Cuenta"
                            style={{
                                color: '#CFAC2B', // Color del texto
                                border: '1px solid #CFAC2B', // Contorno del mismo color que el texto
                                backgroundColor: 'transparent', // Sin relleno
                                borderRadius: '50px', // Bordes redondeados (opcional)
                            }}

                            className="mx-3"
                            onClick={"/pages/pantallainicio/createAccount"}
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
                        <Image src={logo} className={styles['logo']} alt="Mi imagen" priority={true} style={{ width: '40px', height: '40px' }} />
                        <span className='text-900 block mt-4 mr-3'>Una aplicación dedicada al análisis de movimientos bancarios. </span>
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
        backgroundImage: 'url("https://i.pinimg.com/736x/c9/72/0c/c9720cc5e394d6d5a2571a2c20035f3d.jpg")', // Cambia la ruta por la de tu imagen
        backgroundSize: 'cover', // Puedes ajustar esto según tus preferencias
        backgroundPosition: 'center', // Puedes ajustar esto según tus preferencias
        // Otros estilos que desees agregar
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

    //---------------------------| Valor que regresara |---------------------------
    return (
        <>
            <Head>
                <title>{`FinTrack - Iniciar Sesión`}</title>
                <meta charSet="UTF-8" />
                <link rel="icon" href={`/FT.ico`} type="image/x-icon"></link>
            </Head>

            <Topbar />


            <div className='px-4 py-8 md:px-6 lg:px-10' style={estiloDelFondo}>
                <components.Container className={`card m-auto mt-8 ${styles.card}`} >
                    <components.SignUpContainer className={`card ${styles.card}`} signinIn={signIn}>
                        <components.Form >

                           
                        </components.Form  >
                    </components.SignUpContainer>


                    <components.SignInContainer className={`card ${styles.card}`} signinIn={signIn}>


                        <components.Form >

                            <h1 className={`font-bold text-center`}>Recuperar contraseña</h1>
                            <components.Parrafo>Ingresa el correo asociado a tu cuenta</components.Parrafo>
                            <label htmlFor="email1" className="block text-900 ">Email</label>
                            <InputText
                                inputid="email1" value={emailrecuperar} onChange={(e) => setEmailrecuperar(e.target.value)}
                                type="text" placeholder="Correo electrónico" className={`block text-900  mb-2 w-full p-3  ${estiloEmailRec}`}
                            />
                            {mensajeRespuesta &&
                                (
                                    <div className='my-2'>
                                        <Message severity={estiloRespuesta} text={mensajeRespuesta} />
                                    </div>
                                )}
                                <br/>
                            <Button label="Enviar" 
                                          style={{ background: 'linear-gradient(to right, #bf9000, #bf9000, #bf9000, #bf9000, #bf9000, #b8a143, #b8a143, #b8a143, #b7993b, #b7993b, #b7993b, #e9c550, #e9c550, #e9c550, #e4bf4d, #e4bf4d, #e4bf4d, #f2d054, #f2d054, #f2d054)', 
                                            color: 'black', // Texto negro
                                            borderRadius: '50px' // Bordes redondeados
                                          }} 
                                          className="mb-2 w-8 p-3 text-xl" 
                                          onClick={recuperarPassword} />
                           
                           <components.Parrafo onClick={() => router.push('/')} className="font-medium no-underline ml-2 text-right cursor-pointer" style={{ color: 'black', fontStyle: 'italic' }}>Iniciar Sesión</components.Parrafo>


                        </components.Form  >
                    </components.SignInContainer>
                    <components.OverlayContainer signinIn={signIn} visible>
                        <components.Overlay signinIn={signIn}>

                            <components.RightOverLayPanel signinIn={signIn}>
                                <Image src={logo2} className={styles['my-image']} alt="Mi imagen"
                                    priority={true} style={{
                                        height: '70px', width: '70px',
                                        marginTop: '120px',
                                    }}
                                />
                                <Divider />

                                <components.Title>FINTRACK</components.Title>
                                <Divider layout="horizontal" style={{
                                    borderColor: '#7F6000', borderWidth: '2px',
                                    borderStyle: 'solid',
                                    marginTop: '1px',
                                    marginLeft: '0px',
                                }}></Divider>
                                <Divider />
                                <br />
                                <components.Title2>Sigue cada movimiento, toma el control.</components.Title2>

                            </components.RightOverLayPanel >
                          
                        </components.Overlay>
                    </components.OverlayContainer>


                </components.Container>
                <AppConfig />
                <br style={{ margin: '5pt' }} />
                <br style={{ margin: '5pt' }} />
                <br style={{ margin: '5pt' }} />

            </div>
            <Footer />



        </>
    )
}

export default newPassword;
