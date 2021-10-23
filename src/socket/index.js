const mockUserJSON = {_id:"617134a2a444fbf3d67b29b7",name:"test",surname:"testsurname",avatar:"https://ui-avatars.com/api/?name=test",email:"test@mail.com",password:"$2b$12$NCcXPycwm3w3P6.6ro3VBeXMHBwr.CP96597Gr0djzOk6P4ED3YS2",birth_date:{$date:"1995-03-25T00:00:00.000Z"},age:{age_years:"2017",age_months:"4"},phone_primary:"44 5566984223",health_data:{healthcarePlan:[],need_carer:false,take_regular_medicine:false,medicine_list:[],health_condition:[]},medical_tests_requested:[{_id:"617136e49f4013a3dcea56b0"}],medical_tests_result:[],createdAt:{date:"2021-10-21T09:36:34.785Z"},updatedAt:{date:"2021-10-21T17:47:12.129Z"},__v:0,refreshToken:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTcxMzRhMmE0NDRmYmYzZDY3YjI5YjciLCJpYXQiOjE2MzQ4Mzg0MzIsImV4cCI6MTYzNzQzMDQzMn0.b2QOvdo467BurFBUm_E7kH0FV54jtVGgNcyRA0-v7r0"}

useEffect(() => {
    
    socket.on('connect', () => {
        console.log('Socket Connection established!')
    })

    socket.emit('newUser', {user:mockUserJSON})
    socket.on('onChat', (payload)=> console.log(payload, 'from onCHAT'))
    socket.on('recipientMessage', (payload)=> console.log(payload, 'from onNewMessage'))
  }, [])

useEffect(()=> {
  socket.on('newUserOn', (payload)=> console.log(payload))
})

const sendMessage = () =>{
  const message = {
    text: 'hello',
    attachment: `A file here`,
    roomID: mockUserJSON._id
  }
  socket.emit('newMessage',message )
}