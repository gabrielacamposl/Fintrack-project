import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  position: relative;
  overflow: hidden;
  width: 1200px;
  height: 700px;
  max-width: 100%;
  min-height: 400px;
`;

export const SignUpContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  right: 70%;
  width: 70%;
  z-index: 1;
  opacity: 0;
 ${props => props.signinIn !== true ? `
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
  ` 
  : null}
 `;

export const SignInContainer = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  transition: all 0.6s ease-in-out;
  left: 0 ;
  width: 70%;
  z-index: 2;
  ${props => (props.signinIn !== true ? `transform: translateX(100%);` : null)}
`;

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 50px;
  height: 100%;
  text-align: center;
`;

export const Title = styled.h1`
  font-weight: bold;
  margin-top: 0px;
  font-family: 'Times New Roman', serif;
  font-size: 3em;
  background: linear-gradient(
    to right,
    #bf9000,
    #bf9000,
    #bf9000,
    #bf9000,
    #bf9000,
    #b8a143,
    #b8a143,
    #b8a143,
    #b7993b,
    #b7993b,
    #b7993b,
    #e9c550,
    #e9c550,
    #e9c550,
    #e4bf4d,
    #e4bf4d,
    #e4bf4d,
    #f2d054,
    #f2d054,
    #f2d054
  );
  -webkit-background-clip: text;
  color: transparent;
`;

export const Title2 = styled.h5`
  font-weight: normal;
  margin: 0;
  font-family: 'California FB', serif;
  font-size: 1.5em;
  -webkit-background-clip: text;
  color: #b8a143;
  font-style: italic;
  
`;

export const Title3 = styled.h1`
  font-weight: bold;
  margin: 0;
  color: black;
`;

export const Input = styled.input`
  background-color: #eee;
  border: none;
  padding: 12px 15px;
  margin: 8px 0;
  width: 100%;
`;

export const botonIni = styled.button`
  border-radius: 20px;
  background: linear-gradient(
    to right,
    #bf9000,
    #bf9000,
    #bf9000,
    #bf9000,
    #bf9000,
    #b8a143,
    #b8a143,
    #b8a143,
    #b7993b,
    #b7993b,
    #b7993b,
    #e9c550,
    #e9c550,
    #e9c550,
    #e4bf4d,
    #e4bf4d,
    #e4bf4d,
    #f2d054,
    #f2d054,
    #f2d054
  );
  color: rgb(0, 0, 0);  /* Aquí se asegura que el texto sea negro */
  font-size: 12px;
  font-weight: bold;
  padding: 12px 45px;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  &:active {
    transform: scale(0.95);
  }
  &:focus {
    outline: none;
  }
`;


export const GhostButton = styled.button`
  font-size: 15px;
  font-family: 'Times New Roman', serif;
  font-size: 1.5em;
  background: linear-gradient(
    to right,
    #bf9000,
    #bf9000,
    #bf9000,
    #bf9000,
    #bf9000,
    #b8a143,
    #b8a143,
    #b8a143,
    #b7993b,
    #b7993b,
    #b7993b,
    #e9c550,
    #e9c550,
    #e9c550,
    #e4bf4d,
    #e4bf4d,
    #e4bf4d,
    #f2d054,
    #f2d054,
    #f2d054
  );
  -webkit-background-clip: text;
  color: transparent;
`;

export const Anchor = styled.a`
  color: #333;
  font-size: 14px;
  margin: 15px 0;
`;


export const OverlayContainer = styled.div`
  position: absolute;
  top: 0;
  left: 70%;
  width: 30%;
  height: 100%;
  overflow: hidden;
  transition: transform 0.5s ease-in-out;
  z-index: 100;
  ${props => (props.signinIn !== true ? `transform: translateX(-100%);` : null)}
`;

export const Overlay = styled.div`
  background: rgb(27, 25, 25);
  background: -webkit-linear-gradient(to right, rgb(36, 34, 34), rgb(20, 20, 20));
  background: linear-gradient(to right, rgb(17, 17, 17), rgb(14, 14, 14));
  background-repeat: no-repeat;
  background-size: cover;
  background-position: 0 0;
  color: #ffffff;
  position: relative;
  left: -100%;
  height: 100%;
  width: 210%;
  transform: translateX(0);
  transition: transform 0.5s ease-in-out;
  ${props => (props.signinIn !== true ? `transform: translateX(50%);` : null)}
`;

export const OverlayPanel = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 40px;
  text-align: center;
  top: 0;
  height: 100%;
  width: 55%;
  transform: translateX(0);
  transition: transform 0.6s ease-in-out;
`;


export const leftOverLayPanel = styled(OverlayPanel)`
  transform: translateX(-20%);
  ${props => (props.signinIn !== true ? `transform: translateX(0);` : null)}
`;

export const RightOverLayPanel = styled(OverlayPanel)`
  right: 0;
  transform: translateX(0);
  ${props => (props.signinIn !== true ? `transform: translateX(20%);` : null)}
`;

export const Parrafo = styled.p`
  font-size: 13px;
  font-weight: 100;
  letter-spacing: 0.5px;
  font-style: bold, italic;
`;

