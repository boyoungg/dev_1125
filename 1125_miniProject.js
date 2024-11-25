const express = require('express')
const app = express()
app. listen(9999)
app.use(express.json())

let db = new Map()
var id = 1

app.post('/join', (req, res) => {

    if(req.body == {}) {
        res.status(400).json({
            message: `입력 확인 필요!!`
        })
    } else {
        db.set(id++, req.body)
        res.status(201).json({
            message: `${db.get(id-1).name} 님 환영합니다.`
        })
    }
})

app.post('/login', (req, res) => {
    res.send("로그인임")
})


app.get('/users/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)

    const userInfo = db.get(id)

    if(userInfo == undefined){
        res.status(404).json({
            message: "회원정보 없음."
        })
    }else{
        res.json({
            userId : userInfo.userId,
            name: userInfo.name
        })

    }
})

app.delete('/users/:id', (req, res) => {
    let {id} = req.params
    id = parseInt(id)

    const userInfo = db.get(id)

    if(userInfo == undefined){
        res.status(404).json({
            message: "회원정보 없음."
        })
    }else{
        db.delete(id)
        res.status(200).json({
            message: `다음에 또만나요 ${userInfo.name} 님!`
        })

    }
})