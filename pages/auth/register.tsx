import EmailVerificationForm from "@/components/forms/EmailVerificationForm/EmailVerificationForm";
import RegisterForm1 from "@/components/forms/RegisterForm/RegisterForm1/RegisterForm1";
import { useState } from "react";
import { useRouter } from 'next/router'; // Importer useRouter
import ValidationForm from "@/components/forms/ValidationForm/ValidationForm1/ValidationForm1";

export default function Register(){
    const [component,setComponent]= useState<string>("email verification");
    const router = useRouter();

    
    function validation(){
        // setComponent("validation form");
        console.log("yolo");
    }

    function registerForm(){
        setComponent("register");
    }
    
    return(
        <>

            {/* <RegisterForm1/> */}
            {
                component === "email verification"?
                (
                    <EmailVerificationForm handleEmailVerification={validation}/>
                ): component === "validation form"?
                (
                    <ValidationForm handleValidation={registerForm}/>
                ): component === "register"?
                (
                   <RegisterForm1/> 
                ):
                (null)
            }
        </>
    )
}