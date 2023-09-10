const mockAxiosRegister = {
  post: jest.fn(() => Promise.resolve({ data: {} } )),
  post : jest.fn(() => Promise.resolve({ message: 'regisration successful'}))
}
const mockAxiosCreateRoom = {
  post : jest.fn(() => Promise.resolve({data: {} })),
  post : jest.fn(() => Promise.resolve({message :'Room successfully created'}))

}

export  {mockAxiosCreateRoom,mockAxiosRegister}