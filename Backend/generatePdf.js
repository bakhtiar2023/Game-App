const pdf = require('pdf-creator-node')
const historyModel = require('./histories/histories.models')
const fs = require('fs')
const moment = require('moment')
// const {ref,getDownloadURL,uploadBytes} = require('firebase/firebase-storage')
// const {storage} = require('./firebase/firebase.config')
const generatePdf = async (userId) => {
  const html = fs.readFileSync('template.html', 'utf8')
  const options = {
    format: 'Legal',
    orientation: 'portrait',
    border: '10mm'
  }
  const gameHistory = await historyModel.getHistory(userId)
  const data = JSON.stringify(gameHistory)
  const data2 = JSON.parse(data)
  const gameHistoryUser = data2.map((data) => {
    return {
      username: data.player?.playerName,
      status: data.status,
      roomName: data.roomId === null ? 'player vs com' : data.gameRoom?.roomName,
      date: moment(data.createdAt).format('DD-MM-YYYY,h:mm A').split(',')[0],
      time: moment(data.createdAt).format('DD-MM-YYYY,h:mm A').split(',')[1]
    }
  })
  const document = {
    html,
    data: {
      games: gameHistoryUser
    },
    path: `./pdf-generated/game-history-${userId}.pdf`,
    type: ''
  }
  try {
    const pdfGenerated = await pdf.create(document, options)
    return pdfGenerated
    // const path = `./pdf-generated/game-history-${userId}.pdf`
    // const pdfRef = ref(storage,document.path)
    // const path = await uploadBytes(pdfRef,pdfGenerated).then(()=>{
    //     return getDownloadURL(pdfRef)
    // })
  } catch (error) {
    console.log(error)
    return { message: 'error' }
  }
}
module.exports = {
  generatePdf
}
