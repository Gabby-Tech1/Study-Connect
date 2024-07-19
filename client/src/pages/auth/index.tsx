import React, { useState } from 'react'
import background from '@/assets/login2.jpeg'
import victory from '@/assets/victory.png'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { LOGIN_ROUTE, SIGNUP_ROUTE } from '@/utils/constants'
import { apiClient } from '@/lib/api-client'

const Auth: React.FC = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const validateLogin = () => {
        if(!email.length){
            toast.error("Email is required")
            return false
        }
        if(!password.length){
            toast.error("Password is required")
            return false
        }
        return true
    }

    const validateSignup = () => {
        if(!email.length){
            toast.error("Email is required")
            return false
        }
        if(!password.length){
            toast.error("Password is required")
            return false
        }
        if(password !== confirmPassword){
            toast.error("Confirm password should be the same as password")
            return false
        }
        return true
    }
    const handleLogin = async () => {
        if(validateLogin()){
            const response = await apiClient.post(LOGIN_ROUTE, {email, password},{withCredentials: true})
            console.log({ response })
        }
    }

    const handleRegister = async () => {
        if(validateSignup()){
            const response = await apiClient.post(SIGNUP_ROUTE, {email, password}, {withCredentials: true})
            console.log({ response })
        }
    }

  return (
    <div className='h-[100vh] w-[100vw] flex items-center justify-center overflow-hidden px-2'>
        <div className='h-[80vh] bg-blue-200 border-2 border-blue-200 text-opacity-90 shadow-2xl w-[80vw] md:w-[90vw] lg:w-[70vw] xl:w-[60vw] rounded-3xl grid lg:grid-cols-2'>
            <div className='flex flex-col gap-10 items-center justify-center'>
                <div className='flex items-center justify-center flex-col'>
                    <div className='flex items-center justify-center gap-2'>
                        <img className='h-[120px]' src={victory} alt='Victory' />
                        <h1 className='text-3xl font-bold md:text-4xl'>Study Connect</h1>
                    </div>
                    <p className='font-medium text-center px-10 md:px-2'>Please fill in the form to get access to Study Connect</p>
                </div>
                <div className='flex items-center justify-center w-full '>
                    <Tabs className='w-3/4'>
                        <TabsList className='bg-transparent rounded-none w-full'>
                            <TabsTrigger value='login' className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-blue-500 p-3 transition-all duration-300'>Log In</TabsTrigger>
                            <TabsTrigger value='register' className='data-[state=active]:bg-transparent text-black text-opacity-90 border-b-2 rounded-none w-full data-[state=active]:text-black data-[state=active]:font-semibold data-[state=active]:border-b-blue-500 p-3 transition-all duration-300'>Register</TabsTrigger>
                        </TabsList>
                        <TabsContent value='login' className='flex flex-col gap-5 mt-5'>
                            <Input placeholder='Email' type='email' value={email} className='rounded-full p-4 outline-none' onChange={(e) => setEmail(e.target.value)}/>
                            <Input placeholder='Password' type='password' value={password} className='rounded-full p-4 outline-none' onChange={(e) => setPassword(e.target.value)}/>
                            <Button className='rounded-full p-4'onClick={handleLogin}>Login</Button>
                        </TabsContent>
                        <TabsContent value='register' className='flex flex-col gap-5'>
                            <Input placeholder='Email' type='email' value={email} className='rounded-full p-4 outline-none' onChange={(e) => setEmail(e.target.value)}/>
                            <Input placeholder='Password' type='password' value={password} className='rounded-full p-4 outline-none' onChange={(e) => setPassword(e.target.value)}/>
                            <Input placeholder='Confirm Password' type='password' value={confirmPassword} className='rounded-full p-4 outline-none' onChange={(e) => setConfirmPassword(e.target.value)}/>
                            <Button className='rounded-full p-4'onClick={handleRegister}>Register</Button>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
            <div className=' hidden lg:flex items-center justify-center'>
                <img src={background} alt="background" className='h-full rounded-tr-3xl rounded-br-3xl' />
            </div>
        </div>
    </div>
  )
}

export default Auth