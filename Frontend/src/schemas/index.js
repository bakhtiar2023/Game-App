import * as yup from 'yup'

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/
const phoneRules = /^(^\+62|62|^08)(\d{3,4}-?){2}\d{3,4}$/

const dateRules = /^([0]?[1-9]|[1|2][0-9]|[3][0|1])[./-]([0]?[1-9]|[1][0-2])[./-]([0-9]{4}|[0-9]{2})$/

const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required('username should not empty')
    .min(3, 'username too short, min 3 character')
    .max(25, 'username too long, max 10 character'),
  password: yup
    .string()
    .required('password should not empty')
    .min(6, 'password too short, min 6 character')
})

const registrationSchema = yup.object().shape({
  username: yup
    .string()
    .required('username should not empty')
    .min(3, 'username too short, min 3 character')
    .max(25, 'username too long, max 10 character'),
  email: yup
    .string()
    .email('Invalid format email')
    .required('email should not empty'),
  password: yup
    .string()
    .matches(passwordRules, 'Please create stronger password')
    .min(6, 'password too short, min 6 character')
    .required('password should not empty')
})

const createRoomSchema = yup.object().shape({
  roomName: yup
    .string()
    .required('room name should not empty')
    .min(3, 'room name too short, min 3 character')
    .max(10, 'room name too long, max 10 character'),
  player1Choice: yup
    .string()
    .oneOf(['rock', 'paper', 'scissors'], 'Please choose rock, paper, or scissors')
    .required('Please choose rock, paper, or scissors')

})

const editBiodataSchema = yup.object().shape({
  fullname: yup
    .string()
    .required('fullname should not empty')
    .min(3, 'fullname to short, min 3 character')
    .max(30, 'fullname to long, max 30 character'),
  address: yup
    .string()
    .required('address should not empty')
    .min(4, 'address to short, min 4 character')
    .max(30, 'address to long, max 30 character'),
  phoneNumber: yup
    .string()
    .required('phone number should not empty')
    .matches(phoneRules, 'phone format not valid')
    .min(9, 'invalid phone number')
    .max(13, 'invalid phone number'),
  dateOfBirth: yup
    .string()
    .required('date of birth should not empty')
    .matches(dateRules, 'date format not valid')
    .min(10, 'invalid date format')
    .max(10, 'invalid date format')
})

export { loginSchema, registrationSchema, createRoomSchema, editBiodataSchema }
